import * as LucideIcons from "lucide-react";

export type IconName = keyof typeof LucideIcons;

export type Route = "/" | "/about" | "/features" | "/team" | "/join" | "/nodes";

export interface TeamMember {
	name: string;
	role: string;
}

export interface Feature {
	icon: keyof typeof import("lucide-react");
	title: string;
	description: string;
}

export interface Model {
	title: string;
	subtitle: string;
	features: Feature[];
	ctaText: string;
	ctaButtonText: string;
	teamMembers: TeamMember[];
	copyright: string;
	route: Route;
}

export type Msg =
	| { type: "CTA_CLICKED" }
	| { type: "FEATURE_CLICKED"; payload: string }
	| { type: "NAVIGATE_TO"; route: Route }
	| { type: "LOAD_TEAM_MEMBERS" }
	| { type: "TOGGLE_FEATURE"; index: number };
