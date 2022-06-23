export interface Awards {
    awardsSummary: {
        highlighted: {
            awardName: string,
            count: number,
            eventId: string,
            isWinner: boolean
        },
        otherNominationsCount: number,
        otherWinsCount: number
    }
}