export type SBA = "SBA"
export type ECQ = "ECQ"
export type CBQ = "CBQ"

export type QuestionType = SBA | ECQ | CBQ 
export type MarkdownContent = string

export type SBAContent = {
	options: string[]
	question: string
	answer: number
	explanation: MarkdownContent
}
export type CBQContent = SBAContent[]

export type ECQContent = {
	options: string[]
	question: Array<{
		question: string
		answer: number
	}>
	explanation: MarkdownContent
}

export interface IQuestion<T extends QuestionType = any> {
	_id: string
	type: QuestionType
	scenario: MarkdownContent
	topic: string
	content: T extends SBA ? SBAContent : T extends CBQ ? CBQContent : T extends ECQ ? ECQContent : any
	category: string
	parent: string
	createdAt: string
	updatedAt: string
}

export type AnswerSBA = string
export type AnswerCBQ = string[]
export type AnswerECQ = string[]
export type IAnswer = AnswerSBA | AnswerCBQ | AnswerECQ

export type AnswerResponseSBA = boolean
export type AnswerResponseCBQ = boolean[]
export type AnswerResponseECQ = boolean[]
export type IAnswerResponse = AnswerResponseSBA | AnswerResponseCBQ | AnswerResponseECQ

export interface IExamContext {
	currQuestion?: IQuestion<any>
	amount: number
	page: number
	lastPage: number
	score: number
	answersRecords: IAnswer[]
	validatedAnswers: IAnswerResponse[]
	loading: boolean
	submitting: boolean
	canAnswer: boolean
	handleNavigation(step?: number, to?: number): void
	submitAnswer(answer: IAnswer): void
	cancelExam(): void
	terminateExam(): void
}

export type FilterSetExamType = "ALL" | "INCORRECT" | "NEW"

export type AnsweredQuestionStatus = "CORRECT" | "INCORRECT" | "NOT ALL CORRECT"

export interface IAnsweredQuestionResponse {
	score: number
	status: AnsweredQuestionStatus
	explanation: string | string[]
	question: IQuestion
	current: number
}