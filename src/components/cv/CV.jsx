import { CVHobbiesComponent } from "./CVHobbies"
import { CVLanguagesComponent } from "./CVLanguages"
import { CVSkillsComponent } from "./CVSkills"
import { CVAboutMeComponent } from "./CVAboutMe"
import { CVExperiencesComponent } from "./CVExperiences"
import { CVContactComponent } from "./CVContact"
import { CVPersonalInfoComponent } from "./CVPersonalInfo"
import { motion } from 'framer-motion';



export const CVComponent = ({
    CVData,
    profileImage,
    pdfComponent
}) => {
    const {name, position, contact, profiles, experiences, education, aboutMe, skills, languages, hobbies} = CVData
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, delay: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto mb-10"
        >
            {pdfComponent}
            <CVPersonalInfoComponent profileImage={profileImage} name={name} position={position} />
            <CVContactComponent {...contact} profiles={profiles} />
            <CVExperiencesComponent section="EXPERIENCES" experiences={experiences} />
            <CVExperiencesComponent section="EDUCATION" experiences={education} />
            <CVAboutMeComponent text={aboutMe} />
            <CVSkillsComponent skills={skills} />
            <CVLanguagesComponent languages={languages} />
            <CVHobbiesComponent hobbies={hobbies} />
        </motion.div>
    )
}