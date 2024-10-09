import React from "react";
import { VStack, Heading, Text, Button } from "@yamada-ui/react";

interface CallToActionProps {
	ctaText: string;
	ctaButtonText: string;
	onCtaClick: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({
	ctaText,
	ctaButtonText,
	onCtaClick,
}) => (
	<VStack padding={8} textAlign="center">
		<Heading as="h2" size="2xl">
			Join this project
		</Heading>
		<Text fontSize="lg">{ctaText}</Text>
		<Button colorScheme="blue" size="lg" onClick={onCtaClick}>
			{ctaButtonText}
		</Button>
	</VStack>
);
