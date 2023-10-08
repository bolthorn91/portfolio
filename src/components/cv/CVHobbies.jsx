import { CVSectionHeader } from "./CVSectionHeader";

export const CVHobbiesComponent = ({
    hobbies
}) => (
    <section>
        <CVSectionHeader title="HOBBIES"/>
        {hobbies.map(({name, icon}) => (
            <div><p>{name}</p></div>
        ))}
    </section>
)