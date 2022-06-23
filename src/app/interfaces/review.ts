export interface Review {
    author: {
        displayName: string,
        userId: string
    },
    authorRating: number,
    helpfulnessScore: number,
    id: string,
    interestingVotes: {
        down: number,
        up: number
    },
    languageCode: string,
    reviewText: string,
    reviewTitle: string,
    spoiler: boolean,
    submissionDate: string,
    titleId: string
}