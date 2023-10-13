import { useEffect, useRef } from "react";
import { CVSectionHeader } from "./CVSectionHeader";
import { motion, useInView } from 'framer-motion';


export const CVSkillsComponent = ({
    skills
}) => {
    const getBackgroundColor = (index, level) => (index + 1) <= level
        ? 'bg-ternary-dark'
        : 'border'

        const scrollRef = useRef(null)
        const isInView = useInView(scrollRef)
        
    return (
        <section ref={scrollRef} className="mb-10">
            <CVSectionHeader title="SKILLS"/>
            <div className="grid" style={{gridTemplateColumns: '20% 1fr'}}>
                {skills.map(({name, level}, index) => (
                    <>
                        <p>{name}: </p>
                        <motion.div 
                            style={{
                                opacity: isInView ? 1 : 0,
                                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
                            }}
                            className="flex"
                        >
                            {Array.from({ length: 10 }).map((_, index) => (
                                <div className={`rounded-4xl h-5 w-5 mr-4 ${getBackgroundColor(index, level)}`}></div>
                            ))}
                        </motion.div>
                    </>
                ))}

            </div>
        </section>
    )
}