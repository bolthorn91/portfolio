import { CVExperienceComponent } from "./CVExperience"
import { CVSectionHeader } from "./CVSectionHeader"

export const CVExperiencesComponent = ({section, experiences}) => {
    return (
        <section className="mb-10">
            <CVSectionHeader title={section} />
            {experiences.map((experience, index) => (
                <CVExperienceComponent key={index} {...experience} />
            ))}
        </section>
    )
}