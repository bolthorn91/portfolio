import { useContext } from "react";
import { CVSectionHeader } from "./CVSectionHeader";
import { CVPDFContext } from "pages/CV";

export const CVAboutMeComponent = ({
    text
}) => {
    const { isPdf } = useContext(CVPDFContext)

    return (
        <section className={isPdf ? 'mb-4' : 'mb-10'}>
            <CVSectionHeader title="ABOUT ME"/>
            <p>{text}</p>        
        </section>
    )
}