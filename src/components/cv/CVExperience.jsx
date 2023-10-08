

export const CVExperienceComponent = ({
    title,
    company,
    from,
    to,
    ubication,
    type,
    description
}) => {
    return (
        <section>
            <h1>{title}</h1>
            <p>{company}</p>
            <p><span>{from}</span> - <span>{to}</span></p>
            <p>{description}</p>
        </section>
    )
}