import type React from "react";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import * as THREE from "three";

interface Node {
	id: string;
	amount: number;
	position: [number, number, number];
}

interface Edge {
	source: string;
	target: string;
	amount: number;
}

interface NodeData {
	nodes: Node[];
	edges: Edge[];
}

// sample data
const sample: NodeData = {
	nodes: [
		{ id: "1", amount: 100, position: [0, 0, 0] },
		{ id: "2", amount: 50, position: [0, 0, 0] },
		{ id: "3", amount: 200, position: [0, 0, 0] },
	],
	edges: [
		{ source: "1", target: "2", amount: 10 },
		{ source: "2", target: "3", amount: 5 },
	],
};

const NodeMesh: React.FC<{ node: Node }> = ({ node }) => {
	const meshRef = useRef<THREE.Mesh>(null!);
	const size = Math.log(node.amount) * 0.2 + 0.5;

	useFrame(() => {
		meshRef.current.rotation.x += 0.01;
		meshRef.current.rotation.y += 0.01;
	});

	return (
		<mesh ref={meshRef} position={node.position}>
			<sphereGeometry args={[size, 32, 32]} />
			<meshStandardMaterial color="blue" wireframe />
		</mesh>
	);
};

interface EdgeLineProps {
	start: [number, number, number];
	end: [number, number, number];
	color: string;
}

const EdgeLine: React.FC<EdgeLineProps> = ({ start, end, color }) => {
	const points = useMemo(() => {
		return [start, end].map((point) => new THREE.Vector3(...point));
	}, [start, end]);

	return <Line points={points} color={color} lineWidth={1} />;
};

const Network: React.FC<{ data: NodeData }> = ({ data }) => {
	const nodes = useMemo(() => {
		return data.nodes.map((node) => {
			const phi = Math.acos(
				-1 + (2 * data.nodes.indexOf(node)) / data.nodes.length,
			);
			const theta = Math.sqrt(data.nodes.length * Math.PI) * phi;
			return {
				...node,
				position: [
					5 * Math.cos(theta) * Math.sin(phi),
					5 * Math.sin(theta) * Math.sin(phi),
					5 * Math.cos(phi),
				] as [number, number, number],
			};
		});
	}, [data.nodes]);

	return (
		<>
			{nodes.map((node) => (
				<NodeMesh key={node.id} node={node} />
			))}
			{data.edges.map((edge, index) => {
				const sourceNode = nodes.find((n) => n.id === edge.source);
				const targetNode = nodes.find((n) => n.id === edge.target);

				if (sourceNode && targetNode) {
					return (
						<EdgeLine
							key={index}
							start={sourceNode.position}
							end={targetNode.position}
							color={edge.amount > 0 ? "green" : "red"}
						/>
					);
				}
				return null;
			})}
		</>
	);
};

export const Nodes: React.FC = () => {
	return (
		<div style={{ width: "100vm", height: "100vh" }}>
			<Canvas camera={{ position: [0, 0, 20], fov: 75 }}>
				<ambientLight intensity={0.5} />
				<pointLight position={[10, 10, 10]} />
				<Network data={sample} />
				<OrbitControls />
			</Canvas>
		</div>
	);
};
