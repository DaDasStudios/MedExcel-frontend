import BackgroundImage from "../../components/ui/BackgroundImage"
import SolidButton from "../../components/ui/Buttons/SolidButton"
import Paragraph from "./components/Paragraph"
import { ComponentElement } from "../../interface"
import AOS from "aos"
import { useEffect } from "react"
import Heading from "./components/Heading"
import CategoriesList from "./components/CategoriesList"

const More = () => {
	useEffect(() => {
		AOS.init({
			duration: 500,
		})
		AOS.refresh()
	})
	return (
		<>
			<BackgroundImage url='/img/about-page-image.jpg' />
			<section className='pt-[260px] pb-32 min-h-screen bg-slate-900/50 shadow-md rounded-md'>
				<article
					data-aos='fade-up'
					className='max-w-2xl text-slate-100 mx-auto mb-16'
				>
					<Heading animation=''>MedExcel</Heading>
					<p className='text-slate-200 text-lg text-center mb-8'>
						Welcome to our website, the leading provider of medical
						student exam questions!
					</p>
					<div className='flex gap-5 justify-center items-center'>
						<SolidButton
							as={ComponentElement.A}
							href='#categories'
						>
							See Categories
						</SolidButton>
						<SolidButton
							as={ComponentElement.A}
							href='#about-us'
						>
							About Us
						</SolidButton>
					</div>
				</article>
				<article className='max-w-4xl text-slate-100 mx-auto mb-16'>
					<Heading id='categories'>Categories</Heading>
					<p className='text-slate-200 text-lg text-center mb-8'>
						You can choose from a vast amount of categories which
						you want to study in the exams
					</p>
					<CategoriesList
						categories={[
							{
								name: "Dermatology",
								imageUrl: "/img/dermatology.jpg",
							},
							{
								name: "Cardiology",
								imageUrl: "/img/cardiology.jpg",
							},
							{
								name: "Pharmacology",
								imageUrl: "/img/pharmacology.jpg",
							},
							{
								name: "Neurology",
								imageUrl: "/img/neurology.jpg",
							},
							{
								name: "Orthopaedics",
								imageUrl: "/img/orthopaedics.jpg",
							},
							{
								name: "Urology",
								imageUrl: "/img/urology.jpg",
							},
						]}
					/>
					<p className='text-slate-200 text-lg text-center mt-8'>
						And about more than 30 categories... Literally everything you might want to practice
					</p>
				</article>
				<article className='max-w-xl mx-auto text-slate-100'>
					<Heading id='about-us'>
						Dive deep and know more about us
					</Heading>
					<Paragraph>
						We understand the importance of being well-prepared for
						medical exams, which is why we have created a
						comprehensive and user-friendly platform that offers a
						wide range of exam questions for medical students. Our
						goal is to help you excel in your studies by providing
						you with the tools you need to succeed.
					</Paragraph>
					<Paragraph>
						Our website features a vast selection of exam questions
						covering various medical disciplines, including anatomy,
						pharmacology, and pathology. All of our questions are
						written by experienced medical educators and are
						regularly updated to ensure they align with the latest
						medical curriculum.
					</Paragraph>
					<Paragraph>
						In addition to our exam questions, we also offer a
						variety of study aids and resources, including detailed
						explanations and references for each question. This
						allows you to fully understand the material and improve
						your knowledge retention.
					</Paragraph>
					<Paragraph>
						We believe that everyone should have access to quality
						educational resources at a an accessible price which is
						why our website is completely affordable. With our help,
						you can achieve your goals and excel in your medical
						studies.
					</Paragraph>
					<Paragraph>
						Thank you for choosing our website as your study
						resource. If you have any questions or feedback, please
						don't hesitate to contact us. We are dedicated to
						helping you succeed!
					</Paragraph>
				</article>
			</section>
		</>
	)
}

export default More
