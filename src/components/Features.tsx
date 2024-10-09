import React from "react";
import {
	VStack,
	SimpleGrid,
	Box,
	Heading,
	Text,
	Icon as LucideIcon,
} from "@yamada-ui/react";
import { Feature, Msg } from "../types";

interface FeatureProps extends Feature {
	onClick: () => void;
}

const FeatureComponent: React.FC<FeatureProps> = ({
	title,
	description,
	onClick,
}) => {
	return (
		<Box
			bg="white"
			p={6}
			borderRadius="lg"
			shadow="md"
			onClick={onClick}
			cursor="pointer"
			transition="all 0.2s"
			_hover={{ transform: "translateY(-5px)", shadow: "lg" }}
		>
			<VStack align={"center"} padding={4}>
				<LucideIcon fontSize={48} color={"blue.500"} />
				<Heading as={"h3"} size={"md"}>
					{title}
				</Heading>
				<Text textAlign={"center"} color={"gray.600"}>
					{description}
				</Text>
			</VStack>
		</Box>
	);
};

interface FeaturesProps {
	features: Feature[];
	dispatch: React.Dispatch<Msg>;
}

export const Features: React.FC<FeaturesProps> = ({ features, dispatch }) => (
	<VStack padding={8}>
		<Heading as="h2" size="2xl">
			プロジェクトの特徴
		</Heading>
		<SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} padding={8} width="full">
			{features.map((feature, index) => (
				<FeatureComponent
					key={index}
					{...feature}
					onClick={() =>
						dispatch({ type: "FEATURE_CLICKED", payload: feature.title })
					}
				/>
			))}
		</SimpleGrid>
	</VStack>
);
