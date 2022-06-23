export interface Rating {
    bottomRank: number;
    canRate: boolean;
    id: string;
    rating: number;
    ratingCount: number;
    ratingsHistograms: any;
    title: string;
    titleType: string;
    topRank?: number;
    otherRanks: any[];
    year: number;
}