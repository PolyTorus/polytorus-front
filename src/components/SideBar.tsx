import React from "react";
import { Box, Flex, Link, Text, VStack, Icon } from "@yamada-ui/react";
import { NavLink, useLocation, Link as RouterLink } from "react-router-dom";
import { Github, Linkedin, Twitter } from '@yamada-ui/lucide';
import { Model } from "../types";

interface SideBarProps {
  model: Model;
  copyright: string;
}

interface NavItem {
  path: string;
  label: string;
}

const navItems: NavItem[] = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/features", label: "Features" },
  { path: "/team", label: "Team" }
]

const socialIcons = [
  { icon: Github, href: "https://github.com" },
  { icon: Twitter, href: "https://twitter.com" },
  { icon: Linkedin, href: "https://linkedin.com" }
]

export const SideBar: React.FC<SideBarProps> = ({ model, copyright }) => {
  const location = useLocation();

  return (
    <Flex flexDirection="column" width="250px" bg="gray.800" color="white" height="100vh">
      <VStack align="stretch" p={4} flex={1}>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          {model.title}
        </Text>
        {navItems.map((item) => (
          <Link
            key={item.path}
            as={RouterLink}
            to={item.path}
            color={location.pathname === item.path ? "yellow.400" : "white"}
            fontWeight={location.pathname === item.path ? "bold" : "normal"}
            _hover={{ textDecoration: "none", color: "yellow.200" }}
            py={2}
          >
            {item.label}
          </Link>
        ))}
      </VStack>
      <Box p={4} borderTop="1px solid" borderTopColor="gray.700">
        <Flex justify="center" mb={2}>
          {socialIcons.map((item, index) => (
            <Link 
              key={index}
              href={item.href} 
              isExternal 
              mx={2} 
              _hover={{ color: "yellow.400" }}
              transition="all 0.2s ease"
            >
              <Icon 
                as={item.icon} 
                boxSize={5} 
                color="gray.400"
                _hover={{ 
                  color: "yellow.400",
                  transform: "scale(1.2)"
                }}
                transition="all 0.2s ease"
              />
            </Link>
          ))}
        </Flex>
        <Text fontSize="xs" textAlign="center" color="gray.500">
          {copyright}
        </Text>
      </Box>
    </Flex>
  );
};