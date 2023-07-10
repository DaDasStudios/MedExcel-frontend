import {
	IQuestion,
	SBA,
	CBQ,
	ECQ,
	IAnswer,
	AnswerSBA,
	AnswerCBQ,
	IAnswerResponse,
	AnswerResponseCBQ,
	AnswerResponseSBA,
	AnswerResponseECQ,
} from "../interface/exam"

export const markdownExampleText = `
# Title
some text to copy in a paragraph some text to copy in a paragraph some text to copy in a paragraph some text to copy in a paragraph.

## Lists
Some list styles 
* List 1
* List 2
* List 3

1. Number one
2. Number two
3. Number three

## Links
some text to copy in a paragraph
[Go to Apple website](https://www.ionos.es/digitalguide/paginas-web/desarrollo-web/tutorial-de-markdown/#:~:text=Al%20igual%20que%20los%20hiperv%C3%ADnculos,a%20la%20imagen%20entre%20par%C3%A9ntesis.)

## Blockquotes
Blockquotes are a different way to make clear some information.

> This is a text blockquote This is a text blockquote This is a text blockquote This is a text blockquote This is a text blockquote

# Tables
Tables are one of the most useful thing in markdown, it's just so easy to type.

| Name | Age | Email |
|-------|-----|-------|
|John  | 28 | johndoe@example.com|
|Gina  | 45 | gina@example.com|

# Images
You can also append images just using the syntax
![Some alternative text](https://i.blogs.es/ceda9c/dalle/450_1000.jpg)
`
export const parentCategories = ["None", "Medicine", "Musculoskeletal", "Surgery", "Womens's health"]

export const questionCategories = [
	/* Categories */
	"Dermatology",
	"Ear, nose and throat",
	"Ethics and law",
	/* Medicine: */
	"Cardiology",
	"Endocrinology",
	"Gastroenterology",
	"Geriatric medicine",
	"Haematology",
	"Immunology",
	"Infectious diseases",
	"Metabolic medicine",
	"Nephrology",
	"Neurology",
	"Oncology",
	"Palliative care",
	"Respiratory",
	/* Musculoskeletal: */
	"Orthopaedics",
	"Rheumatology",
	/* Categories */
	"Ophthalmology",
	"Paediatrics",
	"Pharmacology",
	"Psychiatry",
	/* Surgery: */
	"Anaesthetics and perioperative care",
	"Breast",
	"Colorectal",
	"General surgery",
	"Neurosurgery",
	"Paediatric surgery",
	"Upper GI and hepatobiliary",
	"Urology",
	"Vascular",
	/* Men health */
	"Contraception",
	"Gynaecology",
	"Obstetrics",
]

export function rateAnswer(question: IQuestion, answer: IAnswer): IAnswerResponse {
	switch (question.type) {
		case "SBA": {
			const _question: IQuestion<SBA> = question
			return _question.content.options[_question.content.answer - 1] === answer
		}
		case "CBQ": {
			const _question: IQuestion<CBQ> = question
			return _question.content.every((c, i) => c.options[c.answer - 1] === answer[i])
		}
		case "ECQ": {
			const _question: IQuestion<ECQ> = question
			return _question.content.question.every((c, i) => _question.content.options[c.answer - 1] === answer[i])
		}

		default:
			throw new Error("Unknown question type")
	}
}
