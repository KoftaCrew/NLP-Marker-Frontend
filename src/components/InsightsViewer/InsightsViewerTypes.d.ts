export type InsightsViewerProps = {
  studTokens: ListStudentTokens,
  modelTokens: ListModelTokens,
  adj: number[][],
  modelInsights?: string[],
  studentInsights?: string[],
  totalGrade?: number,
  modelGrade?: number[],
  answerGrade?: number[],
}

export type ListStudentTokens =string[]

export type ListModelTokens = string[]
