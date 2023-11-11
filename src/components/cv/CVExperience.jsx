import { CVPDFContext } from "pages/CV"
import { useContext } from "react"


export const CVExperienceComponent = ({
    title,
    company,
    from,
    to,
    ubication,
    type,
    description
}) => {
    const { isPdf } = useContext(CVPDFContext)

    return (
        <section className={`flex row ${isPdf ? 'mb-4' : 'mb-6'}`}>
            <div className="flex flex-col items-center p-x-2 h-auto mr-4">
                 <div 
                    className="rounded-4xl bg-ternary-dark h-5 w-5" 
                    style={{
                        height: isPdf ? '0.7rem' : '', 
                        width: isPdf ? '0.6rem' : ''
                    }}
                ></div>
                 <div className="w-1 h-full bg-ternary-dark" style={{width: isPdf ? '0.15rem' : ''}}></div>
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