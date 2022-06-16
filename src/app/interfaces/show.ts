import { Image } from "src/app/interfaces/image";
import { Principals } from "src/app/interfaces/principals";

export interface Show {
    credits: String[];
    id: string;
    image: Image;
    nextEpisode?: string;
    numberOfEpisodes: number;
    principals: Principals[];
    runningTimeInMinutes: number;
    seriesEndYear?: number;
    seriesStartYear: number;
    title: string;
    titleType: string;
    year: number;
}