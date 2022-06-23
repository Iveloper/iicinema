import { Image } from "src/app/interfaces/image";

export interface Bio {
    akas: String[],
    id: string,
    image: Image,
    legacyNameText: string,
    name: string,
    birthDate: string,
    birthPlace: string,
    gender: string,
    heightCentimeters: number,
    nicknames: String[],
    realName: string,
    spouses: any[],
    trademarks: String[],
    miniBios: MiniBio[]
}

export interface MiniBio {
    author: string,
    id: string,
    language: string,
    text: string
}