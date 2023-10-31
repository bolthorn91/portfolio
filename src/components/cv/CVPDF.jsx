import { CVHobbiesComponent } from "./CVHobbies"
import { CVLanguagesComponent } from "./CVLanguages"
import { CVSkillsComponent } from "./CVSkills"
import { CVAboutMeComponent } from "./CVAboutMe"
import { CVExperiencesComponent } from "./CVExperiences"
import { CVContactComponent } from "./CVContact"
import { CVPersonalInfoComponent } from "./CVPersonalInfo"
import { motion } from 'framer-motion';
import { useScrollOffsets } from "hooks/useScrollOffsets"

export const CVPDFComponent = ({
    CVData,
    profileImage
}) => {
    const {name, position, contact, profiles, experiences, education, aboutMe, skills, languages, hobbies} = CVData
    const components = [
        <CVPersonalInfoComponent profileImage={profileImage} name={name} position={position}/>,
        <CVContactComponent {...contact} profiles={profiles} />,
        <CVExperiencesComponent section="EXPERIENCES" experiences={experiences} />,
        <CVExperiencesComponent section="EDUCATION" experiences={education} />,
        <CVAboutMeComponent text={aboutMe} />,
        <CVSkillsComponent skills={skills} notAnimated={true} />,
        <CVLanguagesComponent languages={languages} />,
        <CVHobbiesComponent hobbies={hobbies} />,
    ]
    const refs = useScrollOffsets(components.length);

    const setRef = (index) => (element) => {
        refs.current[index] = element;
      };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, delay: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto mb-10"
            style={{fontSize: '12px'}}
        >
            {components.map((Component, index) => (
                <section ref={setRef(index)} >{Component}</section>
            ))}
        </motion.div>
    )
}