import { Image } from "src/app/interfaces/image";

export interface Plot {
    base: PlotBase;
    id: string;
    plots: {
        author?: string;
        id: string;
        text: string;
    }[]
}

export interface PlotBase {
    id: string;
    image: Image;
    title: string;
    titleType: string;
    year: number;
}