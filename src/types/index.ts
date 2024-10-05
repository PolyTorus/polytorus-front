export interface Feature {
	icon: keyof typeof import("lucide-react");
	title: string;
	description: string;
}

export interface AppState {
	title: string;
	subtitle: string;
	features: Feature[];
	ctaText: string;
	ctaButtonText: string;
	copyright: string;
}

export type Action =
	| { type: "CTA_CLICKED" }
	| { type: "FEATURE_CLICKED"; payload: string };
