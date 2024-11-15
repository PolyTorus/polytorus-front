import type React from "react";
import { useState } from "react";
import {
	VStack,
	Heading,
	Text,
	Button,
	useColorModeValue,
	Box,
	Flex,
	Motion,
	Fade,
} from "@yamada-ui/react";
import type { IconName } from "../types";
import * as LucideIcons from "lucide-react";

const DynamicIcon: React.FC<{
	name: IconName;
	size?: number;
	color?: string;
}> = ({ name, size = 24, color }) => {
	const IconComponent = LucideIcons[name] as React.ComponentType<
		React.SVGProps<SVGSVGElement>
	>;
	return IconComponent ? (
		<IconComponent width={size} height={size} color={color} />
	) : null;
};

interface FeatureCardProps {
	icon: IconName;
	title: string;
	description: string;
	onClick: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
	icon,
	title,
	description,
	onClick,
}) => {
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

const KeyworkCard: React.FC<{
	title: string;
	description: string;
	color: string;
	icon: IconName;
}> = ({ title, description, color, icon }) => {
	return (
		<Flex align="center" p={4} bg={color} borderRadius="xl">
			<Box color="white" mr={4}>
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
