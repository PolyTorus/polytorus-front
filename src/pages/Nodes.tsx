import { Canvas } from "@react-three/fiber";
import { useState, useMemo, useEffect } from "react";
import { useSpring, animated } from "@react-spring/three";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Define the type for a node in the network
interface Node {
	id: string;
	name: string;
}

interface PositionedNode extends Node {
	position: [number, number, number];
}

// Define the type for an edge connecting two nodes
interface Edge {
	id: string;
	from: string; // node id
	to: string; // node id
	length: number;
}

// Define the type for a transaction between nodes
interface Transaction {
	from: string; // node id
	to: string; // node id
	amount: number;
}

// Define the props for TransactionNetwork
interface TransactionNetworkProps {
	nodes: Node[];
	transactions: Transaction[];
}

const TransactionNetwork: React.FC<TransactionNetworkProps> = ({ nodes }) => {
	const [highlightedTransaction, setHighlightedTransaction] =
		useState<Transaction | null>(null);

	// Place nodes on a sphere of radius 10
	const positionedNodes: PositionedNode[] = useMemo(
		() => placeNodesOnSphere(nodes, 10),
		[nodes],
	);

	// Create edges between all nodes
	const edges = useMemo(
		() => createEdgesBetweenAllNodes(positionedNodes),
		[positionedNodes],
	);

	// Automatically trigger random transactions
	useEffect(() => {
		const interval = setInterval(() => {
			const randomTransaction = generateRandomTransaction(positionedNodes);
			setHighlightedTransaction(randomTransaction);

			// Clear highlight after a short delay
			setTimeout(() => setHighlightedTransaction(null), 1500);
		}, 2000); // Trigger a transaction every 2 seconds

		return () => clearInterval(interval);
	}, [positionedNodes]);

	return (
		<>
			<Canvas
				style={{ width: "100%", height: "100%" }}
				camera={{ position: [0, 0, 30] }}
			>
				<ambientLight intensity={0.4} />
				<pointLight position={[10, 10, 10]} intensity={1.5} />
				<OrbitControls /> {/* Enable rotation, zooming, etc. */}
				{/* Render Nodes */}
				{positionedNodes.map((node) => (
					<NodeComponent
						key={node.id}
						node={node}
						isSender={highlightedTransaction?.from === node.id}
						isReceiver={highlightedTransaction?.to === node.id}
					/>
				))}
				{/* Render all edges */}
				{edges.map((edge) => (
					<EdgeComponent
						key={edge.id}
						edge={edge}
						positionedNodes={positionedNodes}
						highlighted={
							(highlightedTransaction?.from === edge.from &&
								highlightedTransaction?.to === edge.to) ||
							(highlightedTransaction?.from === edge.to &&
								highlightedTransaction?.to === edge.from)
						}
					/>
				))}
			</Canvas>

			{/* Display transaction details outside of the canvas */}
			{highlightedTransaction && (
				<div className="transaction-details" style={transactionDetailsStyle}>
					<strong>Transaction:</strong> Node {highlightedTransaction.from} sent{" "}
					{highlightedTransaction.amount} to Node {highlightedTransaction.to}
				</div>
			)}
		</>
	);
};

// Inline style for transaction details (outside the canvas)
const transactionDetailsStyle = {
	position: "absolute" as const,
	bottom: "10px",
	left: "10px",
	backgroundColor: "#333",
	color: "#fff",
	padding: "10px",
	borderRadius: "5px",
	fontSize: "16px",
};

// Function to place nodes on the surface of a sphere
const placeNodesOnSphere = (
	nodes: Node[],
	radius: number,
): PositionedNode[] => {
	const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle in radians

	return nodes.map((node, i) => {
		const y = 1 - (i / (nodes.length - 1)) * 2; // y goes from 1 to -1
		const radiusAtY = Math.sqrt(1 - y * y); // radius at y
		const theta = phi * i; // golden angle increment

		const x = Math.cos(theta) * radiusAtY;
		const z = Math.sin(theta) * radiusAtY;

		return {
			...node,
			position: [x * radius, y * radius, z * radius],
		};
	});
};

// Function to create edges between all nodes
const createEdgesBetweenAllNodes = (nodes: PositionedNode[]): Edge[] => {
	const edges: Edge[] = [];
	for (let i = 0; i < nodes.length; i++) {
		for (let j = i + 1; j < nodes.length; j++) {
			edges.push({
				id: `${nodes[i].id}-${nodes[j].id}`,
				from: nodes[i].id,
				to: nodes[j].id,
				length: new THREE.Vector3(...nodes[i].position).distanceTo(
					new THREE.Vector3(...nodes[j].position),
				),
			});
		}
	}
	return edges;
};

// Function to generate random transactions between nodes
const generateRandomTransaction = (nodes: PositionedNode[]): Transaction => {
	const fromNode = nodes[Math.floor(Math.random() * nodes.length)];
	let toNode = nodes[Math.floor(Math.random() * nodes.length)];

	// Ensure fromNode and toNode are different
	while (fromNode.id === toNode.id) {
		toNode = nodes[Math.floor(Math.random() * nodes.length)];
	}

	return {
		from: fromNode.id,
		to: toNode.id,
		amount: Math.floor(Math.random() * 1000), // Random amount between 0 and 1000
	};
};

interface NodeProps {
	node: PositionedNode;
	isSender: boolean;
	isReceiver: boolean;
}

const NodeComponent: React.FC<NodeProps> = ({ node, isSender, isReceiver }) => {
	// Animate the node's color and scale based on whether it is a sender or receiver
	const { color, scale } = useSpring({
		color: isSender ? "#FF4136" : isReceiver ? "#2ECC40" : "#0074D9", // Bright Red for sender, Green for receiver
		scale: isSender || isReceiver ? 1.5 : 1, // Larger scale for better visibility
	});

	return (
		<animated.mesh position={node.position} scale={scale}>
			<sphereGeometry args={[0.6, 32, 32]} /> {/* Larger size */}
			<animated.meshStandardMaterial color={color} />
		</animated.mesh>
	);
};

interface EdgeProps {
	edge: Edge;
	positionedNodes: PositionedNode[];
	highlighted: boolean;
}

const EdgeComponent: React.FC<EdgeProps> = ({
	edge,
	positionedNodes,
	highlighted,
}) => {
	const fromNode = positionedNodes.find((node) => node.id === edge.from);
	const toNode = positionedNodes.find((node) => node.id === edge.to);

	if (!fromNode || !toNode) return null;

	const curve = useMemo(() => {
		const from = new THREE.Vector3(...fromNode.position);
		const to = new THREE.Vector3(...toNode.position);
		return new THREE.CatmullRomCurve3([from, to]);
	}, [fromNode.position, toNode.position]);

	const { color, opacity, radius } = useSpring({
		color: highlighted ? "#FFDC00" : "#AAAAAA", // Bright Yellow for highlighted edges
		opacity: highlighted ? 0.9 : 0.4, // Higher opacity for non-highlighted edges
		radius: highlighted ? 0.05 : 0.02, // Thicker for non-highlighted edges to improve visibility
		config: { duration: 1500 },
	});

	return (
		<animated.mesh>
			<tubeGeometry args={[curve, 64, radius.get(), 8, false]} />{" "}
			{/* Increased segments for smoothness */}
			<animated.meshStandardMaterial
				color={color}
				opacity={opacity}
				transparent
			/>
		</animated.mesh>
	);
};

export default TransactionNetwork;
