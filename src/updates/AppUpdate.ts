import type { Model, Msg } from "../types";

export const appReducer = (msg: Msg, model: Model): Model => {
	switch (msg.type) {
		case "NAVIGATE_TO":
			return { ...model, route: msg.route };
		case "CTA_CLICKED":
			return model;
		case "FEATURE_CLICKED":
			return model;
		default:
			return model;
	}
};
