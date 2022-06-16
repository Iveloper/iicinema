import { Principals } from "src/app/interfaces/principals";
import { Image } from "src/app/interfaces/image";

export interface Movie {
    credits: String[];
    id: string;
    image: Image;
    principals: Principals[];
    runningTimeInMinutes: number;
    title: string;
    titleType: string;
    year: number;
}
