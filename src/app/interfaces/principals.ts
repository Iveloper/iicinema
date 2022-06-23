import { Image } from "src/app/interfaces/image";

export interface Principals {
    akas?: String[],
    billing: number;
    category: string;
    characters: String[];
    disambiguation: string;
    id: string;
    image: Image
    legacyNameText: string;
    name: string;
    roles: Roles[];
    episodeCount: number;
}

export interface Roles {
    character: string;
    characterId?: string;
}