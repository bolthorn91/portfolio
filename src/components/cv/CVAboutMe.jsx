import { CVSectionHeader } from "./CVSectionHeader";

export const CVAboutMeComponent = ({
    text
}) => (
    <section className="mb-10">
        <CVSectionHeader title="ABOUT ME"/>
        <p>{text}</p>        
    </section>
)