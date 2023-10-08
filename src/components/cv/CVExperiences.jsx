import { CVExperienceComponent } from "./CVExperience"
import { CVSectionHeader } from "./CVSectionHeader"

export const CVExperiencesComponent = ({section, experiences}) => {
    return (
        <section>
            <CVSectionHeader title={section} />
            {experiences.map((experience, index) => (
                <CVExperienceComponent key={index} {...experience} />
            ))}
        </section>
    )
}