import Button from "../components/reusable/Button";
import ContactDetails from '../components/contact/ContactDetails';
import { motion } from "framer-motion";
import ServicesResume from "components/services/ServicesResume";
import ServicesForm from "components/contact/ServicesForm";
import { GiChemicalDrop } from "react-icons/gi"
import ServicesLearnAbout from "components/services/ServicesLearnAbout";

const Services = () => {
	const titleClass = 'font-general-medium text-2xl sm:text-4xl mb-1 text-ternary-dark dark:text-ternary-light'
	const subtitleClass = 'text-lg text-ternary-dark dark:text-ternary-light'
	const values = [
		{
			title: "Discipline",
			subtitle: "Discipline is the unwavering commitment to your goals, the relentless pursuit of excellence, and the bridge between dreams and accomplishments."
		},
		{
			title: 'Health',
			subtitle: "True health is a harmonious balance between physical and mental well-being, where you have the energy and vitality to pursue your passions, enjoy life's pleasures, and thrive in every aspect of your journey."
		},
		{
			title: 'Success',
			subtitle: "Success is the culmination of relentless effort, unyielding determination, and unwavering belief in your abilities. It's not merely a destination; it's a journey marked by resilience in the face of adversity and an insatiable thirst for personal growth."
		}
	];

	return (
		<div className="container mx-auto">
			<section className="py-5 sm:py-10 mt-5 sm:mt-10">
				<div className="text-center">
					<p className={titleClass}>
						<b>Go to the next level</b>
					</p>
					<br/>
					<p className={subtitleClass}>With the mentoring program, you will be able to reach your career goals and expectations faster. The program objective is to guide you to be the best version of yourself and reach all goals you have purposed to reach in your career.</p>
				</div>
			</section>
			<ServicesResume/>
			<ServicesLearnAbout />
			<section className="py-5">
				<div className="text-center">
					<p className={titleClass}>
						<b>Our philosophy, learn to learn</b>
					</p>
					<p className={`${subtitleClass} mt-4`}>Bolthorn Makers mentorship program is for people who invest in their development.</p>
					<p className={`${subtitleClass} mt-4`}>All our decisions are guided by the principles in the industry:</p>
				</div>
				<div className="flex flex-col sm:flex-row w-full justify-center gap-10 mt-8">
					{values.map(({title, subtitle}, index) => (
						<div key={index} className="w-full text-xl sm:text-2xl md:text-3xl text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 cursor-pointer rounded-lg bg-gray-50 dark:bg-ternary-dark hover:bg-gray-100 shadow-sm p-4 duration-300">
							<div className="flex justify-between">
								<GiChemicalDrop></GiChemicalDrop>
								<p className={`${titleClass} text-md`}>Principle {index + 1}</p>
							</div>
							<p className="mt-4">{title}</p>
							<p className={`${subtitleClass} mt-4`}>{subtitle}</p>
						</div>
					))}
				</div>
			</section>
			<div className="mt-8 sm:mt-10 flex justify-center sm:justify-normal">
				<div
					className=" font-general-medium flex items-center px-6 py-3 rounded-lg shadow-lg hover:shadow-xl bg-indigo-500 hover:bg-indigo-600 focus:ring-1 focus:ring-indigo-900 text-white text-lg sm:text-xl duration-300"
				>
					<Button title="Join now" />
				</div>
			</div>
			<div className="mt-20 border-t-2 border-primary-light dark:border-secondary-dark"></div>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{
					ease: 'easeInOut',
					duration: 0.5,
					delay: 0.1,
				}}
				className=" w-full mx-auto flex flex-col-reverse lg:flex-row py-5 lg:py-10 lg:mt-10"
			>
				<ServicesForm />
				<ContactDetails />
			</motion.div>
		</div>
	);
};

export default Services;
