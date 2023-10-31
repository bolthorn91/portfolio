import { useContext } from "react"
import { CVExperienceComponent } from "./CVExperience"
import { CVSectionHeader } from "./CVSectionHeader"
import { CVPDFContext } from "pages/CV"

export const CVExperiencesComponent = ({section, experiences}) => {
    const { isPdf } = useContext(CVPDFContext)

    return (
        <section className={isPdf ? 'mb-4' : 'mb-10'}>
            <CVSectionHeader title={section} />
            {experiences.map((experience, index) => (
                <section className="pdf-breakpoint" data-break={index}>
                    <CVExperienceComponent key={index} {...experience} />
                </section>
            ))}
        </section>
    )
}