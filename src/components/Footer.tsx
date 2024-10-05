import React from 'react'
import { Box, Text } from '@yamada-ui/react'

interface FooterProps {
    copyright: string
}

export const Footer: React.FC<FooterProps> = ({ copyright }) => (
    <Box bg="gray.800" color="white" py={8} textAlign="center">
        <Text>{copyright}</Text>
    </Box>
)
