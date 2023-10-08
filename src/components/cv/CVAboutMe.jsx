import { CVSectionHeader } from "./CVSectionHeader";

export const CVAboutMeComponent = ({
    text
}) => (
    <section>
        <CVSectionHeader title="ABOUT ME"/>
        <p>{text}</p>        
    </section>
)