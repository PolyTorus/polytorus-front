import type React from "react";
import { Box, Flex, Link, Text, VStack, Icon } from "@yamada-ui/react";
import { useLocation, Link as RouterLink } from "react-router-dom";
import {
	FaGithub,
	FaTwitter,
	FaLinkedin,
	FaDiscord,
	FaNeos,
} from "react-icons/fa";
import { FaHome, FaInfoCircle, FaCogs, FaUsers } from "react-icons/fa";
import type { Model } from "../types";

interface SideBarProps {
	model: Model;
	copyright: string;
}

interface NavItem {
	path: string;
	label: string;
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const navItems: NavItem[] = [
	{ path: "/", label: "Home", icon: FaHome },
	{ path: "/about", label: "About", icon: FaInfoCircle },
	{ path: "/features", label: "Features", icon: FaCogs },
	{ path: "/team", label: "Team", icon: FaUsers },
	{ path: "/nodes", label: "Nodes", icon: FaNeos },
];

interface SocialIcon {
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	href: string;
}

const socialIcons: SocialIcon[] = [
	{ icon: FaGithub, href: "https://github.com" },
	{ icon: FaTwitter, href: "https://twitter.com" },
	{ icon: FaLinkedin, href: "https://linkedin.com" },
	{ icon: FaDiscord, href: "https://discord.com" },
];

export const SideBar: React.FC<SideBarProps> = ({ model, copyright }) => {
	const location = useLocation();

	return (
		<Flex
			flexDirection="column"
			width="250px"
			bg="gray.800"
			color="white"
			height="100vh"
		>
			<VStack align="stretch" p={4} flex={1}>
				<Text fontSize="2xl" fontWeight="bold" mb={6} textAlign="center">
					{model.title}
				</Text>
				{navItems.map((item) => (
					<Link
						key={item.path}
						as={RouterLink}
						to={item.path}
						py={2}
						px={4}
						borderRadius="md"
						_hover={{
							bg: "gray.700",
							color: "yellow.400",
							textDecoration: "none",
						}}
						bg={location.pathname === item.path ? "gray.700" : "transparent"}
						color={location.pathname === item.path ? "yellow.400" : "white"}
						fontWeight={location.pathname === item.path ? "bold" : "normal"}
						transition="all 0.3s"
					>
						<Flex align="center">
							<Icon as={item.icon} boxSize={5} mr={3} />
							<Text>{item.label}</Text>
						</Flex>
					</Link>
				))}
			</VStack>
			<Box p={4} borderTop="1px solid" borderTopColor="gray.700">
				<Flex justify="center" mb={2}>
					{socialIcons.map((item, index) => (
						<Link
							key={`${item.href}-${index}`}
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
									transform: "scale(1.2)",
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
