import React from "react";
import { VStack, Heading, Text, Button } from "@yamada-ui/react";
import { Model, Msg } from '../types';

interface HomeProps {
    model: Model;
    dispatch: React.Dispatch<Msg>;
}

export const Home: React.FC<HomeProps> = ({ model, dispatch }) => {
    return (
        <VStack padding={4}>
            <Heading as="h1" size="2xl">{model.title}</Heading>
            <Text fontSize={"xl"}>{model.subtitle}</Text>
        </VStack>
    );
};