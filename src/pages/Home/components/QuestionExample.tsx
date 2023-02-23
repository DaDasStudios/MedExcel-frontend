import { useId, useState } from "react"
import { toast } from "react-hot-toast"
import MarkdownBody from "../../../components/ui/MarkdownBody"
import Separator from "../../../components/ui/Separator"
import { IQuestion, ISBAQuestion } from "../../../interface/exam"
import { Link } from "react-router-dom"

const QuestionExample = () => {
	const id = useId()
	const question: IQuestion<ISBAQuestion> = {
		type: "SBA",
		content: {
			question:
				"Given this presentation what is the most likely causative agent?",
			answer: 1,
			explanation: `
The child has most likely presented with Bronchiolitis - this is most commonly caused by Respiratory Syncytial Virus. 

In a child under 1-years-old with a wheeze, consider broncholitis. 

# Bronchiolitis

Pathologically described as inflammation of the bronchioles and smaller airways in the lungs usually caused by **Respiratory Syncytial Virus**

Usually diagnosed only in children under 2 but most commonly effects children under 6 months of age due to the older children having larger airways - so secretions due to the inflammation do not cause as much of an obstruction and gas exchange and transgfegr can still occur without issues. 

Presents with:

- ***Coryzal symptoms***.
- ***Signs of respiratory distress***
- ***Dyspnoea*** (heavy laboured breathing)
- ***Tachypnoea*** (fast breathing)
- Poor feeding
- Mild fever (under 39ºC)
- ***Apnoeas*** are episodes where the child stops breathing
- ***Wheeze*** and ***crackles*** on auscultation

Bronchiolitis is a self limiting condition with a usual peak of symptoms around 3/4 days. Admission isn’t required in most children. Factors to consider when deciding whether children should be admitted are:

- Aged ***under 3 months*** or any ***pre-existing condition*** such as ***prematurity***, ***Downs syndrome*** or ***cystic fibrosis***
- 50 – 75% or less of their normal intake of milk
- Clinical dehydration
- Respiratory rate above 70
- Oxygen saturations below 92%
- Moderate to severe respiratory distress, such as deep recessions or head bobbing
- Apnoeas
- Parents not confident in their ability to manage at home or difficulty accessing medical help from home

Management:

Largely supportive - with supplementary oxygen if saturations cannot be maintained above 92% and ensuring adequate oral intake.
			`,
			options: [
				"Respiratory Syncytial Virus",
				"Bordetella Pertussis",
				"Parainfluenza Virus",
				"Adenovirus",
				"Group B Streptococcus",
			],
		},
		category: "Paediatrics",
		parent: "All",
		_id: id,
		scenario: `
A 6-month-old boy attends paediatric emergency department with his mother. Over the past day his mother reports that he has been coughing and has a reduced oral intake. The boy is showing several signs of respiratory distress.

Physical examination reveals subcostal recessions, nasal flaring and wheezing. The patient has no other significant medical history. He has been achieving his development goals and has been fully vaccinated.
		`,
		createdAt: "",
		updatedAt: "",
	}

	const [hasAnswered, setHasAnswered] = useState(false)
	const [showModal, setShowModal] = useState(true)
	const [selectedOption, setSelectedOption] = useState("")

	function restartState() {
		setHasAnswered(false)
	}

	function startSimulation() {
		setShowModal(false)
	}

	function simulateSubmitting() {
		if (!selectedOption) return toast.error("Select an option before")

		if (
			selectedOption ===
			question.content.options[question.content.answer - 1]
		)
			toast.success("Correct answer")
		else toast.error("Incorrect answer... Try again")
		setHasAnswered(true)
	}

	return (
		<div
			className={`bg-slate-800 max-h-[600px] rounded-md relative shadow-md border border-gray-100/10 text-white ${
				showModal ? "overflow-y-hidden" : "overflow-y-auto"
			}`}
		>
			<div
				className={`absolute inset-x-0 duration-700 transition-all bg-opacity-100 bg-gradient-to-b from-slate-900/50 to-black/70 flex items-center justify-center -bottom-3 ${
					showModal
						? "top-0 opacity-100 pointer-events-auto"
						: "top-full opacity-0 pointer-events-none"
				}`}
			>
				<button
					onClick={startSimulation}
					className={`flex flex-col gap-4 items-center text-center text-5xl z-10 font-bold text-gray-300 p-5 relative after:absolute after:hover:bg-slate-900/80 after:transition-all after:duration-500 after:left-1/2 after:right-1/2 after:top-0 after:bottom-0 after:hover:left-0 after:hover:right-0 after:-z-10 after:rounded-md after:shadow-xl`}
				>
					<h3>Give it a try!</h3>
					<svg
						className='w-12'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
						aria-hidden='true'
					>
						<path d='M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z' />
					</svg>
				</button>
			</div>
			<div className='flex flex-col gap-3 text-gray-200 font-medium p-8'>
				<span className='text-sm text-gray-300'>
					Category - <b>{question.category}</b>
				</span>
				<span className='text-sm text-gray-400 flex items-baseline gap-3'>
					<svg
						className='w-6 self-center'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
						aria-hidden='true'
					>
						<path
							clipRule='evenodd'
							fillRule='evenodd'
							d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z'
						/>
					</svg>
					<p>
						Answer the question based on the scenario presented
						below, just select an option and click on "Submit
						answer".
					</p>
				</span>
				<Separator />
				<MarkdownBody content={question.scenario} />
				<p className='text-gray-300'>{question.content.question}</p>
				<div>
					<ol type='A' className='inline-flex flex-col mt-2 mb-1'>
						{question.content.options.map((option, index) => (
							<li
								className='list-[upper-latin] list-inside first:rounded-t-md last:rounded-b-md border border-gray-100/10 py-2 px-4'
								key={option + index}
							>
								<label
									className={`${
										hasAnswered
											? index ===
											  question.content.answer - 1
												? "text-emerald-500"
												: "text-red-500"
											: "text-gray-300"
									}`}
									htmlFor={option + index}
								>
									{option}
									<input
										className={`ml-4`}
										type='radio'
										onChange={e =>
											setSelectedOption(e.target.value)
										}
										value={option}
										id={option + index}
										name='optionSelected'
									/>
								</label>
							</li>
						))}
					</ol>
					{!hasAnswered && (
						<button
							onClick={simulateSubmitting}
							type='button'
							className='flex items-center gap-2 py-2 px-3 border border-blue-500/50 hover:bg-blue-700/50 bg-blue-800/50 rounded-md mt-6 mb-1'
						>
							<svg
								className='w-5'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
								aria-hidden='true'
							>
								<path d='M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z' />
							</svg>
							Submit answer
						</button>
					)}
				</div>
				{hasAnswered && (
					<>
						<MarkdownBody content={question.content.explanation} />
						<div className='flex justify-between'>
							<button
								onClick={restartState}
								type='button'
								className='self-end flex items-center gap-2 py-2 px-3 border border-amber-500/50 hover:bg-amber-700/50 bg-amber-800/50 rounded-md mt-6 mb-1'
							>
								<svg
									className='w-5'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
									aria-hidden='true'
								>
									<path
										clipRule='evenodd'
										fillRule='evenodd'
										d='M7.793 2.232a.75.75 0 01-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 010 10.75H10.75a.75.75 0 010-1.5h2.875a3.875 3.875 0 000-7.75H3.622l4.146 3.957a.75.75 0 01-1.036 1.085l-5.5-5.25a.75.75 0 010-1.085l5.5-5.25a.75.75 0 011.06.025z'
									/>
								</svg>
								Try Again
							</button>
							<Link to="/subscription"
								type='button'
								className='self-end flex items-center gap-2 py-2 px-3 border border-blue-500/50 hover:bg-blue-700/50 bg-blue-800/50 rounded-md mt-6 mb-1'
							>
								<svg
									className='w-5'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
									aria-hidden='true'
								>
									<path
										clipRule='evenodd'
										fillRule='evenodd'
										d='M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z'
									/>
								</svg>
								Keep Excel-ing
							</Link>
						</div>
					</>
				)}
			</div>
		</div>
	)
}
export default QuestionExample
