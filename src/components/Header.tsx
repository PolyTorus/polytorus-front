import { Box, Heading, Text } from "@yamada-ui/react";
import type React from "react";

interface HeaderProps {
	title: string;
	subtitle: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => (
	<Box bg="blue.600" color="white" py={16} textAlign="center">
		<Heading as="h1" size="3xl" mb={4}>
			{title}
		</Heading>
		<Text fontSize="xl">{subtitle}</Text>
	</Box>
);
