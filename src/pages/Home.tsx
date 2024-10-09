import React, { useState } from "react";
import {
	VStack,
	Heading,
	Text,
	Button,
	useColorModeValue,
	Box,
	SimpleGrid,
	Flex,
	Fade,
	Motion,
} from "@yamada-ui/react";
import { Model, Msg } from "../types";
import * as LucideIcons from "lucide-react";

type IconName = keyof typeof LucideIcons;

interface HomeProps {
	model: Model;
	dispatch: React.Dispatch<Msg>;
}

interface DynamicIconProps {
	name: IconName;
	size?: number;
	color?: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({
	name,
	size = 24,
	color,
	...props
}) => {
	const IconComponent = LucideIcons[name] as React.ComponentType<
		React.SVGProps<SVGSVGElement>
	>;
	return IconComponent ? (
		<IconComponent width={size} height={size} color={color} {...props} />
	) : null;
};

const FeatureCard: React.FC<{
	icon: IconName;
	title: string;
	description: string;
	onClick: () => void;
}> = ({ icon, title, description, onClick }) => {
	const [isHovered, setIsHovered] = useState(false);
	return (
		<Motion
			initial={{ scale: 0.95 }}
			animate={{ scale: 1 }}
			whileHover={{ scale: 1.05, y: -10 }}
			transition={{ duration: 0.3 }}
		>
			<VStack
				align="center"
				p={6}
				bg={useColorModeValue("white", "gray.700")}
				borderRadius="xl"
				boxShadow="xl"
				onClick={onClick}
				cursor="pointer"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				height="100%"
			>
				<Box
					color={isHovered ? "purple.500" : "blue.500"}
					transition="all 0.3s"
				>
					<DynamicIcon name={icon} size={48} />
				</Box>
				<Heading size="lg" mb={2}>
					{title}
				</Heading>
				<Text textAlign="center">{description}</Text>
				<Fade isOpen={isHovered}>
					<Button
						size="sm"
						rightIcon={<DynamicIcon name="ChevronRight" />}
						variant="ghost"
						colorScheme="purple"
					>
						Learn more
					</Button>
				</Fade>
			</VStack>
		</Motion>
	);
};

const ProjectDetail: React.FC<{
	icon: IconName;
	title: string;
	description: string;
}> = ({ icon, title, description }) => {
	return (
		<Flex align="center" mb={4}>
			<Box color="blue.500" mr={4}>
				<DynamicIcon name={icon} size={32} />
			</Box>
			<Box>
				<Heading size="md" mb={2}>
					{title}
				</Heading>
				<Text>{description}</Text>
			</Box>
		</Flex>
	);
};

export const Home: React.FC<HomeProps> = ({ model, dispatch }) => {
	return (
		<Box maxWidth="1400px" margin="auto" p={{ base: 4, md: 8 }}>
			<VStack p={16} align="stretch">
				<Flex
					direction={{ base: "column", lg: "row" }}
					align="center"
					justify="space-between"
				>
					<VStack align="start" p={6} maxW="600px" mb={{ base: 10, lg: 0 }}>
						<Motion
							initial={{ x: -30, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ duration: 0.5 }}
						>
							<Heading
								as="h1"
								size="3xl"
								bgGradient="linear(to-r, blue.400, purple.500)"
								bgClip="text"
							>
								{model.title}
							</Heading>
						</Motion>
						<Text fontSize="xl" fontWeight="medium">
							{model.subtitle}
						</Text>
						<Button
							size="lg"
							colorScheme="purple"
							rightIcon={<DynamicIcon name="ChevronRight" />}
							onClick={() => dispatch({ type: "NAVIGATE_TO", route: "/about" })}
						>
							Discover Our Vision
						</Button>
					</VStack>
					<Box position="relative" width="500px" height="500px">
						<Motion
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ duration: 0.5 }}
						>
							<Box
								position="absolute"
								top="50%"
								left="50%"
								transform="translate(-50%, -50%)"
								color="blue.500"
							>
								<DynamicIcon name="Database" size={200} />
							</Box>
							<Box position="absolute" top="10%" left="10%" color="purple.500">
								<DynamicIcon name="Shield" size={100} />
							</Box>
							<Box
								position="absolute"
								bottom="10%"
								right="10%"
								color="green.500"
							>
								<DynamicIcon name="Lock" size={100} />
							</Box>
							<Box position="absolute" top="10%" right="10%" color="orange.500">
								<DynamicIcon name="Layers" size={100} />
							</Box>
							<Box position="absolute" bottom="10%" left="10%" color="red.500">
								<DynamicIcon name="Cpu" size={100} />
							</Box>
						</Motion>
					</Box>
				</Flex>

				<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} p={10} pt={10}>
					{model.features.map((feature, index) => (
						<FeatureCard
							key={index}
							icon={feature.icon as IconName}
							title={feature.title}
							description={feature.description}
							onClick={() => dispatch({ type: "TOGGLE_FEATURE", index })}
						/>
					))}
				</SimpleGrid>

				<VStack
					p={10}
					align="stretch"
					bg={useColorModeValue("gray.50", "gray.800")}
					borderRadius="xl"
				>
					<Heading size="xl" textAlign="center">
						Pioneering the Future of Blockchain
					</Heading>
					<SimpleGrid columns={{ base: 1, md: 2 }} p={8}>
						<ProjectDetail
							icon="Globe"
							title="Global Impact"
							description="Our quantum-resistant blockchain aims to secure digital assets worldwide, preparing for the post-quantum era."
						/>
						<ProjectDetail
							icon="Key"
							title="Advanced Cryptography"
							description="Implementing cutting-edge algorithms like Falcon to ensure long-term security against quantum threats."
						/>
						<ProjectDetail
							icon="Zap"
							title="Optimized Performance"
							description="Balancing security and efficiency to provide a blockchain solution that's both secure and practical for real-world applications."
						/>
						<ProjectDetail
							icon="Users"
							title="Community-Driven"
							description="Fostering an open-source community to collectively advance blockchain technology for the quantum age."
						/>
					</SimpleGrid>
					<Box textAlign="center" mt={6}>
						<Button
							size="lg"
							colorScheme="blue"
							rightIcon={<DynamicIcon name="ChevronRight" />}
							onClick={() =>
								dispatch({ type: "NAVIGATE_TO", route: "/features" })
							}
						>
							Explore Our Innovations
						</Button>
					</Box>
				</VStack>

				<VStack
					textAlign="center"
					p={10}
					bg={useColorModeValue("blue.50", "blue.900")}
					borderRadius="xl"
				>
					<Heading size="xl">Join the Quantum-Resistant Revolution</Heading>
					<Text fontSize="lg" maxW="2xl">
						Be part of the movement that's shaping the future of secure,
						decentralized systems. Whether you're a developer, researcher, or
						blockchain enthusiast, there's a place for you in our community.
					</Text>
					<Button
						size="lg"
						colorScheme="purple"
						rightIcon={<DynamicIcon name="ChevronRight" />}
						onClick={() => dispatch({ type: "NAVIGATE_TO", route: "/join" })}
					>
						Get Involved
					</Button>
				</VStack>
			</VStack>
		</Box>
	);
};
