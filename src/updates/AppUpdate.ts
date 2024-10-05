import { AppState, Action } from "../types";

export const appReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case "CTA_CLICKED":
            return state;
        case "FEATURE_CLICKED":
            return state;
        default:
            return state;
    }
}