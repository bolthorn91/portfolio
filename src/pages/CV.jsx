import { CVAboutMeComponent } from "components/cv/CVAboutMe";
import { CVContactComponent } from "components/cv/CVContact";
import { CVExperiencesComponent } from "components/cv/CVExperiences";
import { CVHobbiesComponent } from "components/cv/CVHobbies";
import { CVLanguagesComponent } from "components/cv/CVLanguages";
import { CVSkillsComponent } from "components/cv/CVSkills";
import { CVData } from "data/CVData";
import { motion } from 'framer-motion';


const CVPage = () => {
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
	const {name, position, contact, profiles, experiences, education, aboutMe, skills, languages, hobbies} = CVData

	return (
		<motion.div 
			initial={{ opacity: 0 }}
            animate={{ opacity: 1, delay: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto mb-10"
		>
			<section className="w-full text-center py-5 sm:py-10 mt-5 sm:mt-10">
				<p className="mb-2 text-xl">{name}</p>
				<p className="text-">{position}</p>
			</section>
			<CVContactComponent {...contact} profiles={profiles} />
			<CVExperiencesComponent section="EXPERIENCES" experiences={experiences} />
			<CVExperiencesComponent section="EDUCATION" experiences={education} />
			<CVAboutMeComponent text={aboutMe} />
			<CVSkillsComponent skills={skills} />
			<CVLanguagesComponent languages={languages} />
			<CVHobbiesComponent hobbies={hobbies} />
		</motion.div>
	);
};

export default CVPage;
