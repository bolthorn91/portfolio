import { CVSectionHeader } from "./CVSectionHeader";

export const CVSkillsComponent = ({
    skills
}) => (
    <section>
        <CVSectionHeader title="SKILLS"/>
        {skills.map(({name, level}, index) => (
            <div key={index}><p>{name}: {level}</p></div>
        ))}
    </section>
)