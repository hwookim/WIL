export const ADDON_ID = 'my-addon';
export const PANEL_ID = `${ADDON_ID}/panel`;
export const PARAM_KEY = `testAddon`;

export const EVENTS = {
  CLEAR: `${ADDON_ID}/clear`,
  STORY_LOADED: `${ADDON_ID}/story-loaded`,
} as const;
