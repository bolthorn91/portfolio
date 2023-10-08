import { CVSectionHeader } from "./CVSectionHeader";

export const CVLanguagesComponent = ({
    languages
}) => (
    <section>
        <CVSectionHeader title="LANGUAGES"/>
        {languages.map(({name, level}, index) => (
            <div key={index}><p>{name}: {level}</p></div>
        ))}
    </section>
)