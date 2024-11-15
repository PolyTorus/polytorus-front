import type React from "react";
import {
	Box,
	Flex,
	Heading,
	Text,
	Button,
	useColorModeValue,
	VStack,
	SimpleGrid,
} from "@yamada-ui/react";
import type { Model, Msg } from "../types";
import * as LucideIcons from "lucide-react";

type IconName = keyof typeof LucideIcons;

interface HomeProps {
	model: Model;
	dispatch: React.Dispatch<Msg>;
}

interface FeatureCardProps {
	icon: IconName;
	title: string;
	description: string;
	onClick: () => void;
}

const DynamicIcon: React.FC<{ name: IconName; size?: number; color?: string }> = ({
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

const FeatureCard: React.FC<FeatureCardProps> = ({
	icon,
	title,
	description,
	onClick,
}) => (
	<Flex
		direction="column"
		align="center"
		bg={useColorModeValue("white", "gray.700")}
		p={6}
		borderRadius="md"
		shadow="md"
		_hover={{ transform: "scale(1.05)" }}
		transition="all 0.3s"
		cursor="pointer"
		onClick={onClick}
	>
		<DynamicIcon name={icon} size={48} color={useColorModeValue("blue.500", "blue.300")} />
		<Heading size="md" mt={4} mb={2} textAlign="center">
			{title}
		</Heading>
		<Text fontSize="sm" textAlign="center">
			{description}
		</Text>
	</Flex>
);

const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
	<VStack gap={2} textAlign="center">
		<Heading size="lg">{title}</Heading>
		{subtitle && <Text fontSize="md" color={useColorModeValue("gray.600", "gray.300")}>{subtitle}</Text>}
	</VStack>
);

export const Home: React.FC<HomeProps> = ({ model, dispatch }) => {
	return (
		<Box maxW="1200px" mx="auto" p={4}>
			{/* Hero Section */}
			<Flex
				direction={{ base: "column", md: "row" }}
				align="center"
				justify="space-between"
				py={8}
				px={4}
			>
				<VStack align="start" gap={4} textAlign={{ base: "center", md: "left" }} flex="1">
					<Heading
						as="h1"
						size="xl"
						bgGradient="linear(to-r, blue.400, purple.500)"
						bgClip="text"
					>
						{model.title}
					</Heading>
					<Text fontSize="lg" color={useColorModeValue("gray.600", "gray.300")}>
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
				<Box flex="1" textAlign="center" mt={{ base: 8, md: 0 }}>
					<DynamicIcon name="Database" size={200} color="blue.500" />
				</Box>
			</Flex>

			{/* Features Section */}
			<Box py={8}>
				<SectionHeader title="Our Features" subtitle="What makes us stand out" />
				<SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={6} mt={8}>
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
			</Box>

			{/* Join Us Section */}
			<Box py={8} bg={useColorModeValue("gray.50", "gray.800")} borderRadius="md">
				<SectionHeader
					title="Join the Quantum-Resistant Revolution"
					subtitle="Be part of a community that's shaping the future of secure systems."
				/>
				<VStack mt={4} gap={4}>
					<Text fontSize="lg" maxW="800px" textAlign="center">
						Whether you're a developer, researcher, or blockchain enthusiast, there's a
						place for you in our community.
					</Text>
					<Button
						size="lg"
						colorScheme="blue"
						rightIcon={<DynamicIcon name="ChevronRight" />}
						onClick={() => dispatch({ type: "NAVIGATE_TO", route: "/join" })}
					>
						Get Involved
					</Button>
				</VStack>
			</Box>
		</Box>
	);
};
