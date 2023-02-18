import BackgroundImage from "../../components/ui/BackgroundImage"
import SolidButton from "../../components/ui/Buttons/SolidButton"
import Paragraph from "./components/Paragraph"
import { ComponentElement } from "../../interface"
import AOS from "aos"
import { useEffect } from "react"
import Heading from "./components/Heading"
import CategoriesList from "./components/CategoriesList"
import Subtitle from "./components/Subtitle"
import List from "./components/List"

const More = () => {
	useEffect(() => {
		AOS.init({
			duration: 500,
		})
		AOS.refresh()
	}, [])
	
	return (
		<>
			<BackgroundImage url='/img/about-page-image.jpg' />
			<section className='pt-[260px] pb-32 min-h-screen bg-slate-900/50 shadow-md rounded-md'>
				<article
					data-aos='fade-up'
					className='max-w-2xl text-slate-100 mx-auto mb-16'>
					<Heading animation=''>MedExcel</Heading>
					<p className='text-slate-200 text-lg text-center mb-8'>
						Welcome to our website, the leading provider of medical
						student exam questions!
					</p>
					<div className='flex gap-5 justify-center items-center'>
						<SolidButton as={ComponentElement.A} href='#categories'>
							See Categories
						</SolidButton>
						<SolidButton as={ComponentElement.A} href='#about-us'>
							About Us
						</SolidButton>
						<SolidButton as={ComponentElement.A} href='#privacy-policy'>
							Privacy Policy
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
						And about more than 30 categories... Literally
						everything you might want to practice
					</p>
				</article>
				<article
					id='about-us'
					className='max-w-xl mx-auto text-slate-100 mb-16'>
					<Heading>Dive deep and know more about us</Heading>
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
				<article
					id='privacy-policy'
					className='max-w-2xl mx-auto text-slate-100 mb-16'>
					<Heading>Privacy Policy</Heading>
					<Paragraph>
						MedExcel website is owned by Company Name, which is a
						data controller of your personal data.
					</Paragraph>
					<Paragraph>
						We have adopted this Privacy Policy, which determines
						how we are processing the information collected by
						MedExcel, which also provides the reasons why we must
						collect certain personal data about you. Therefore, you
						must read this Privacy Policy before using MedExcel
						website.
					</Paragraph>
					<Paragraph>
						We take care of your personal data and undertake to
						guarantee its confidentiality and security.
					</Paragraph>
					<Subtitle>Personal information we collect:</Subtitle>
					<Paragraph>
						When you visit the MedExcel, we automatically collect
						certain information about your device, including
						information about your web browser, IP address, time
						zone, and some of the installed cookies on your device.
						Additionally, as you browse the Site, we collect
						information about the individual web pages or products
						you view, what websites or search terms referred you to
						the Site, and how you interact with the Site. We refer
						to this automatically-collected information as “Device
						Information.” Moreover, we might collect the personal
						data you provide to us (including but not limited to
						Name, Surname, Address, payment information, etc.)
						during registration to be able to fulfill the agreement.
					</Paragraph>
					<Subtitle>Why do we process your data?</Subtitle>
					<Paragraph>
						Our top priority is customer data security, and, as
						such, we may process only minimal user data, only as
						much as it is absolutely necessary to maintain the
						website. Information collected automatically is used
						only to identify potential cases of abuse and establish
						statistical information regarding website usage. This
						statistical information is not otherwise aggregated in
						such a way that it would identify any particular user of
						the system.
					</Paragraph>
					<Paragraph>
						You can visit the website without telling us who you are
						or revealing any information, by which someone could
						identify you as a specific, identifiable individual. If,
						however, you wish to use some of the website’s features,
						or you wish to receive our newsletter or provide other
						details by filling a form, you may provide personal data
						to us, such as your email, first name, last name, city
						of residence, organization, telephone number. You can
						choose not to provide us with your personal data, but
						then you may not be able to take advantage of some of
						the website’s features. For example, you won’t be able
						to receive our Newsletter or contact us directly from
						the website. Users who are uncertain about what
						information is mandatory are welcome to contact us via
						excelatmedicine@gmail.com.
					</Paragraph>
					<Subtitle>Your rights:</Subtitle>
					<Paragraph>
						If you are a European resident, you have the following
						rights related to your personal data:
					</Paragraph>
					<ul>
						<List>The right to be informed.</List>
						<List>The right of access.</List>
						<List>The right to rectification.</List>
						<List>The right to erasure.</List>
						<List>The right to restrict processing.</List>
						<List>The right to data portability.</List>
						<List>The right to object.</List>
						<List>
							Rights in relation to automated decision-making and
							profiling.
						</List>
					</ul>
					<Paragraph>
						If you would like to exercise this right, please contact
						us through the contact information below.
					</Paragraph>
					<Paragraph>
						Additionally, if you are a European resident, we note
						that we are processing your information in order to
						fulfill contracts we might have with you (for example,
						if you make an order through the Site), or otherwise to
						pursue our legitimate business interests listed above.
						Additionally, please note that your information might be
						transferred outside of Europe, including Canada and the
						United States.
					</Paragraph>
					<Subtitle>Links to other websites:</Subtitle>
					<Paragraph>
						Our website may contain links to other websites that are
						not owned or controlled by us. Please be aware that we
						are not responsible for such other websites or third
						parties' privacy practices. We encourage you to be aware
						when you leave our website and read the privacy
						statements of each website that may collect personal
						information.
					</Paragraph>
					<Subtitle>Information security:</Subtitle>
					<Paragraph>
						We secure information you provide on computer servers in
						a controlled, secure environment, protected from
						unauthorized access, use, or disclosure. We keep
						reasonable administrative, technical, and physical
						safeguards to protect against unauthorized access, use,
						modification, and personal data disclosure in its
						control and custody. However, no data transmission over
						the Internet or wireless network can be guaranteed.
					</Paragraph>
					<Subtitle>Legal disclosure:</Subtitle>
					<Paragraph>
						We will disclose any information we collect, use or
						receive if required or permitted by law, such as to
						comply with a subpoena or similar legal process, and
						when we believe in good faith that disclosure is
						necessary to protect our rights, protect your safety or
						the safety of others, investigate fraud, or respond to a
						government request.
					</Paragraph>
					<Subtitle>Contact information:</Subtitle>
					<Paragraph>
						If you would like to contact us to understand more about
						this Policy or wish to contact us concerning any matter
						relating to individual rights and your Personal
						Information, you may send an email to
						excelatmedicine@gmail.com.
					</Paragraph>
				</article>
				<article
					id='terms-conditions'
					className='max-w-2xl mx-auto text-slate-100'>
					<Heading>Terms & Conditions</Heading>
					<Paragraph>
						These terms and conditions outline the rules and
						regulations for the use of MedExcel's Website.
					</Paragraph>
					<Paragraph>
						By accessing this website we assume you accept these
						terms and conditions. Do not continue to use MedExcel if
						you do not agree to take all of the terms and conditions
						stated on this page.
					</Paragraph>
					<Paragraph>
						The following terminology applies to these Terms and
						Conditions, Privacy Statement and Disclaimer Notice and
						all Agreements: "Client", "You" and "Your" refers to
						you, the person log on this website and compliant to the
						Company’s terms and conditions. "The Company",
						"Ourselves", "We", "Our" and "Us", refers to our
						Company. "Party", "Parties", or "Us", refers to both the
						Client and ourselves. All terms refer to the offer,
						acceptance and consideration of payment necessary to
						undertake the process of our assistance to the Client in
						the most appropriate manner for the express purpose of
						meeting the Client’s needs in respect of provision of
						the Company’s stated services, in accordance with and
						subject to, prevailing law of Netherlands. Any use of
						the above terminology or other words in the singular,
						plural, capitalization and/or he/she or they, are taken
						as interchangeable and therefore as referring to same.
					</Paragraph>
					<Subtitle>Cookies</Subtitle>
					<Paragraph>
						We employ the use of cookies. By accessing MedExcel, you
						agreed to use cookies in agreement with the MedExcel's
						Privacy Policy. Most interactive websites use cookies to
						let us retrieve the user’s details for each visit.
						Cookies are used by our website to enable the
						functionality of certain areas to make it easier for
						people visiting our website. Some of our
						affiliate/advertising partners may also use cookies.
					</Paragraph>
					<Subtitle>License</Subtitle>
					<Paragraph>
						Unless otherwise stated, MedExcel and/or its licensors
						own the intellectual property rights for all material on
						MedExcel. All intellectual property rights are reserved.
						You may access this from MedExcel for your own personal
						use subjected to restrictions set in these terms and
						conditions.
					</Paragraph>
					<Paragraph>You must not:</Paragraph>
					<ul>
						<List>Republish material from MedExcel</List>
						<List>
							Sell, rent or sub-license material from MedExcel
						</List>
						<List>
							Reproduce, duplicate or copy material from MedExcel
						</List>
						<List>Redistribute content from MedExcel</List>
					</ul>
					<Paragraph>
						MedExcel reserves the right to monitor all Comments and
						to remove any Comments which can be considered
						inappropriate, offensive or causes breach of these Terms
						and Conditions.
					</Paragraph>
					<Paragraph>You warrant and represent that:</Paragraph>
					<ul>
						<List>
							You are entitled to post the Comments on our website
							and have all necessary licenses and consents to do
							so.
						</List>
						<List>
							The Comments do not invade any intellectual property
							right, including without limitation copyright,
							patent or trademark of any third party.
						</List>
						<List>
							The Comments do not contain any defamatory,
							libelous, offensive, indecent or otherwise unlawful
							material which is an invasion of privacy.
						</List>
						<List>
							The Comments will not be used to solicit or promote
							business or custom or present commercial activities
							or unlawful activity.
						</List>
					</ul>
					<Paragraph>
						You hereby grant MedExcel a non-exclusive license to
						use, reproduce, edit and authorize others to use,
						reproduce and edit any of your Comments in any and all
						forms, formats or media.
					</Paragraph>
					<Subtitle>Hyperlinking to our Content</Subtitle>
					<Paragraph>
						The following organizations may link to our Website
						without prior written approval:
					</Paragraph>
					<List>Government agencies</List>
					<List>Search engines</List>
					<List>News organizations</List>
					<List>
						Online directory distributors may link to our Website in
						the same manner as they hyperlink to the Websites of
						other listed businesses
					</List>
					<List>
						System wide Accredited Businesses except soliciting
						non-profit organizations, charity shopping malls, and
						charity fundraising groups which may not hyperlink to
						our Web site.
					</List>
					<Paragraph>
						These organizations may link to our home page, to
						publications or to other Website information so long as
						the link: (a) is not in any way deceptive; (b) does not
						falsely imply sponsorship, endorsement or approval of
						the linking party and its products and/or services; and
						(c) fits within the context of the linking party’s site.
					</Paragraph>
					<Paragraph>
						We may consider and approve other link requests from the
						following types of organizations:
					</Paragraph>
					<ul>
						<List>
							Commonly-known consumer and/or business information
							sources.
						</List>
						<List>dot.com community sites</List>
						<List>
							Associations or other groups representing charities
						</List>
						<List>Online directory distributors</List>
						<List>Internet portals</List>
						<List>Accounting, law and consulting firms</List>
						<List>
							Educational institutions and trade associations.
						</List>
					</ul>
					<Paragraph>
						We will approve link requests from these organizations
						if we decide that: (a) the link would not make us look
						unfavorably to ourselves or to our accredited
						businesses; (b) the organization does not have any
						negative records with us; (c) the benefit to us from the
						visibility of the hyperlink compensates the absence of
						MedExcel; and (d) the link is in the context of general
						resource information.
					</Paragraph>
					<Paragraph>
						These organizations may link to our home page so long as
						the link: (a) is not in any way deceptive; (b) does not
						falsely imply sponsorship, endorsement or approval of
						the linking party and its products or services; and (c)
						fits within the context of the linking party’s site.
					</Paragraph>
					<Paragraph>
						If you are one of the organizations listed in paragraph
						2 above and are interested in linking to our website,
						you must inform us by sending an e-mail to MedExcel.
						Please include your name, your organization name,
						contact information as well as the URL of your site, a
						list of any URLs from which you intend to link to our
						Website, and a list of the URLs on our site to which you
						would like to link. Wait 2-3 weeks for a response.
					</Paragraph>
					<Paragraph>
						Approved organizations may hyperlink to our Website as
						follows:
					</Paragraph>
					<ul>
						<List>By use of our corporate name; or</List>
						<List>
							By use of the uniform resource locator being linked
							to; or
						</List>
						<List>
							By use of any other description of our Website being
							linked to that makes sense within the context and
							format of content on the linking party’s site.
						</List>
					</ul>
					<Paragraph>
						No use of MedExcel's logo or other artwork will be
						allowed for linking absent a trademark license
						agreement.
					</Paragraph>
					<Subtitle>iFrames</Subtitle>
					<Paragraph>
						Without prior approval and written permission, you may
						not create frames around our Webpages that alter in any
						way the visual presentation or appearance of our Website
					</Paragraph>
					<Subtitle>Content Liability</Subtitle>
					<Paragraph>
						We shall not be hold responsible for any content that
						appears on your Website. You agree to protect and defend
						us against all claims that is rising on your Website. No
						link(s) should appear on any Website that may be
						interpreted as libelous, obscene or criminal, or which
						infringes, otherwise violates, or advocates the
						infringement or other violation of, any third party
						rights.
					</Paragraph>
					<Subtitle>Reservation of Rights</Subtitle>
					<Paragraph>
						We reserve the right to request that you remove all
						links or any particular link to our Website. You approve
						to immediately remove all links to our Website upon
						request. We also reserve the right to amen these terms
						and conditions and it’s linking policy at any time. By
						continuously linking to our Website, you agree to be
						bound to and follow these linking terms and conditions.
					</Paragraph>
					<Subtitle>Removal of links from our website</Subtitle>
					<Paragraph>
						If you find any link on our Website that is offensive
						for any reason, you are free to contact and inform us
						any moment. We will consider requests to remove links
						but we are not obligated to or so or to respond to you
						directly.
					</Paragraph>
					<Paragraph>
						We do not ensure that the information on this website is
						correct, we do not warrant its completeness or accuracy;
						nor do we promise to ensure that the website remains
						available or that the material on the website is kept up
						to date.
					</Paragraph>
					<Subtitle>Disclaimer</Subtitle>
					<Paragraph>
						To the maximum extent permitted by applicable law, we
						exclude all representations, warranties and conditions
						relating to our website and the use of this website.
						Nothing in this disclaimer will:
					</Paragraph>
					<ul>
						<List>
							Limit or exclude our or your liability for death or
							personal injury;
						</List>
						<List>
							Limit or exclude our or your liability for fraud or
							fraudulent misrepresentation;
						</List>
						<List>
							Limit any of our or your liabilities in any way that
							is not permitted under applicable law; or
						</List>
						<List>
							Exclude any of our or your liabilities that may not
							be excluded under applicable law.
						</List>
					</ul>
					<Paragraph>
						The limitations and prohibitions of liability set in
						this Section and elsewhere in this disclaimer: (a) are
						subject to the preceding paragraph; and (b) govern all
						liabilities arising under the disclaimer, including
						liabilities arising in contract, in tort and for breach
						of statutory duty.
					</Paragraph>
					<Paragraph>
						As long as the website and the information and services
						on the website are provided free of charge, we will not
						be liable for any loss or damage of any nature.
					</Paragraph>
				</article>
			</section>
		</>
	)
}

export default More
