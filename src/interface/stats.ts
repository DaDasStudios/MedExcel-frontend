
/**
 * The response body for the requests that are looking for analytics and statistics
 */
export interface IStatisticResponse {
    count: number
    categoriesPerformance: Record<string, IExamPerfomance>
    bestCategory: string
    worstCategory: string
}

/**
 * Stores the user performance in a certain category which allows to calculate the statistics
 */
export interface IExamPerfomance {
    correctAnswers: string[];
    count: number
}