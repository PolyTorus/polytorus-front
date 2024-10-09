import type React from "react";
import {
	Box,
	Container,
	Heading,
	Text,
	SimpleGrid,
	VStack,
	HStack,
	Image,
	Icon,
	useColorModeValue,
	Link,
	Tag,
	Wrap,
} from "@yamada-ui/react";
import { Motion } from "@yamada-ui/motion";
import { Code, User, Github, Linkedin, XIcon } from "lucide-react";

interface TeamMember {
	name: string;
	role: string;
	bio: string;
	githubUsername: string;
	linkedinUrl?: string;
	XUrl?: string;
	skills: string[];
}

interface TeamData {
	name: string;
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	description: string;
	members: TeamMember[];
}

const teamData: TeamData[] = [
	{
		name: "ブロックチェーン・暗号研究",
		icon: Code,
		description:
			"最先端の暗号技術とブロックチェーンプロトコルの研究開発を行うチームです。",
		members: [
			{
				name: "Hiro Nakanishi",
				role: "Owner",
				bio: "Owner",
				githubUsername: "quantumshiro",
				linkedinUrl: "",
				XUrl: "https://x.com/Curiosi46542428",
				skills: ["暗号理論", "Rust"],
			},
			// 他のメンバーも同様に追加
		],
	},
	// 他のチームデータも同様に追加
];

const MemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
	const bgColor = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.700");

	return (
		<Motion
			initial={{ y: 20, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<Box
				borderWidth="1px"
				borderRadius="lg"
				borderColor={borderColor}
				p={6}
				bg={bgColor}
				boxShadow="md"
				_hover={{ transform: "translateY(-5px)", transition: "all 0.3s ease" }}
			>
				<VStack align="start" p={4}>
					<HStack>
						<Image
							boxSize="60px"
							borderRadius="full"
							src={`https://github.com/${member.githubUsername}.png`}
							alt={member.name}
							fallback={<Icon as={User} boxSize={14} color="gray.400" />}
						/>
						<VStack align="start" p={0}>
							<Heading size="md">{member.name}</Heading>
							<Text color="gray.500">{member.role}</Text>
						</VStack>
					</HStack>
					<Text fontSize="sm">{member.bio}</Text>
					<Wrap>
						{member.skills.map((skill, index) => (
							<Tag key={index} size="sm" colorScheme="blue">
								{skill}
							</Tag>
						))}
					</Wrap>
					<HStack>
						<Link
							href={`https://github.com/${member.githubUsername}`}
							isExternal
						>
							<Icon as={Github} />
						</Link>
						{member.linkedinUrl && (
							<Link href={member.linkedinUrl} isExternal>
								<Icon as={Linkedin} />
							</Link>
						)}
						{member.XUrl && (
							<Link href={member.XUrl} isExternal>
								<Icon as={XIcon} />
							</Link>
						)}
					</HStack>
				</VStack>
			</Box>
		</Motion>
	);
};

const TeamSection: React.FC<{ team: TeamData }> = ({ team }) => {
	return (
		<Box as="section" py={16}>
			<Container maxW="6xl">
				<VStack align="start" p={8}>
					<HStack>
						<Icon as={team.icon} boxSize={10} color="blue.500" />
						<Heading as="h2" size="xl">
							{team.name}
						</Heading>
					</HStack>
					<Text fontSize="lg">{team.description}</Text>
					<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} p={8} width="full">
						{team.members.map((member) => (
							<MemberCard key={member.name} member={member} />
						))}
					</SimpleGrid>
				</VStack>
			</Container>
		</Box>
	);
};

export const TeamPage: React.FC = () => {
	return (
		<Box bg={useColorModeValue("gray.50", "gray.900")}>
			<Container maxW="6xl" py={20}>
				<VStack p={16}>
					<Heading as="h1" size="2xl" textAlign="center">
						Our Team
					</Heading>
					<Text fontSize="xl" textAlign="center" maxW="3xl">
						We are a diverse group of experts dedicated to building the future
						of quantum-resistant blockchain technology. Our team combines deep
						knowledge in cryptography, distributed systems, and user experience
						design.
					</Text>
					{teamData.map((team) => (
						<TeamSection key={team.name} team={team} />
					))}
				</VStack>
			</Container>
		</Box>
	);
};
