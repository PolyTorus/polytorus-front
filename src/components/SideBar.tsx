import { Box, Heading, Link, Text, VStack } from "@yamada-ui/react";
import type React from "react";
import { Model } from "../types";
import { NavLink, useLocation, Link as RouterLink} from "react-router-dom";

interface SideBarProps {
	model: Model;
}

interface NavItem {
	path: string;
	label: string;
}

const navItems: NavItem[] = [
	{ path: "/", label: "Home" },
	{ path: "/about", label: "About this project" },
	{ path: "/features", label: "Features" },
	{ path: "/team", label: "Team" }
]

export const SideBar: React.FC<SideBarProps> = ({ model }) => {
	const location = useLocation();

  return (
    <Box width="250px" bg="gray.800" color="white" p={4} height="100vh">
      <VStack align="stretch" padding={4}>
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
          >
            {item.label}
          </Link>
        ))}
      </VStack>
    </Box>
  );
};