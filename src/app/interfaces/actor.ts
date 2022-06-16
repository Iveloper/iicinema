import { Image } from "src/app/interfaces/image";
import { Roles } from "src/app/interfaces/principals";

export interface Actor {
    id: string;
    image: Image;
    knownFor: ActorRoles[];
    legacyNameText: string;
    name: string;
}

export interface ActorRoles {
    cast: RoleInfo[];
    id: string;
    summary: RoleSummary[];
    title: string;
    titleType: string;
}

export interface RoleInfo {
    billing?: number;
    category: string;
    characters: String[];
    startYear?: number;
    endYear?: number;
    episodeCount?: number;
    roles: Roles[];
}

export interface RoleSummary {
    category: string;
    characters: String[];
    displayYear: string;
}