export interface Principals {
    billing: number;
    category: string;
    characters: String[];
    disambiguation: string;
    id: string;
    legacyNameText: string;
    name: string;
    roles: Roles[];
}

export interface Roles {
    character: string;
    characterId?: string;
}