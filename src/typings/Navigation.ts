export interface NavItemType {
    path: string;
    name: string;
}

export enum ModeTypes {
    dark = 'dark',
    light = 'light'
};

export interface ModeSwitcherType {
    modeType: ModeTypes;
}

export interface SearchInputState {
    search: string;
}