

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
        <section className="mb-6 flex row">
            <div className="flex flex-col items-center p-x-2 h-auto mr-4">
                 <div className="rounded-4xl bg-ternary-dark h-5 w-5"></div>
                 <div className="w-1 h-full bg-ternary-dark"></div>
            </div>
            <div>
                <h1 className="text-ternary-dark font-medium">{title}</h1>
                <p>{company}</p>
                <p><span>{from}</span> - <span>{to}</span></p>
                <p>{ubication}</p>
                <p>{type}</p>
                <p>{description}</p>
            </div>
        </section>
    )
}