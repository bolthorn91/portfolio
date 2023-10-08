import { CVSectionHeader } from "./CVSectionHeader";

export const CVContactComponent = ({
    ubication,
    email,
    phone,
    profiles
}) => (
    <section>
        <CVSectionHeader title="CONTACT"/>
        <p>Las Palmas de Gran Canaria</p>
        <p>bolthorn.dev@gmail.com</p>
        <p>+34 690 21 31 53</p>
        {Object.keys(profiles).map(key => (
            <a key={key} href={profiles[key]} target="_blank" rel="noreferrer">{key}</a>
        ))}
        
    </section>
)