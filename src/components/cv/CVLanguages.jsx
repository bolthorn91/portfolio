import { useContext, useRef } from "react";
import { CVSectionHeader } from "./CVSectionHeader";
import { motion } from 'framer-motion';
import './CVLanguages.css'
import { CVPDFContext } from "pages/CV";


export const CVLanguagesComponent = ({
    languages
}) => {
    const { isPdf } = useContext(CVPDFContext)

    return (
        <section className={isPdf ? 'mb-4' : 'mb-10'}>
            <CVSectionHeader title="LANGUAGES"/>
            <div className="flex align-center">
                {languages.map(({name, level}, index) => (
                        <div key={index} className="flex relative items-center">
                            <svg id="progress" width={isPdf ? "75" : "150"} height={isPdf ? "75" : "150"} viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="30" pathLength="0" className="bg" style={{stroke: 'black', opacity: 0.1}} />
                                <motion.circle
                                    strokeDasharray="180 360"
                                    cx="50"
                                    cy="50"
                                    r="30"
                                    pathLength={`${((360 - 180) * 10) / level}`} 
                                    strokeDashoffset="0"
                                    className="indicator"
                                    transition={{
                                        default: { duration: 2, ease: "easeInOut" },
                                    }}
                                />
                            </svg>
                            <p>{name}</p>
                        </div>
                ))}
            </div>
        </section>
    )
}