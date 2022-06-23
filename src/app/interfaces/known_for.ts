import { RoleSummary } from "src/app/interfaces/actor";
import { Movie } from "src/app/interfaces/movie";

export interface KnownFor {
    title: Movie,
    imdbRating: number,
    summary: RoleSummary,
    categories: String[],
    whereToWatch: {
        releaseDate: string
    }
}