import { CVSectionHeader } from "./CVSectionHeader";

export const CVHobbiesComponent = ({
    hobbies
}) => (
    <section>
        <CVSectionHeader title="HOBBIES"/>
        {hobbies.map(({name, icon}, index) => (
            <div key={index}><p>{name}</p></div>
        ))}
    </section>
)