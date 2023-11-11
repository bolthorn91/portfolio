import { useContext, useRef } from "react";
import { CVSectionHeader } from "./CVSectionHeader";
import { motion, useInView } from 'framer-motion';
import { CVPDFContext } from "pages/CV";


export const CVSkillsComponent = ({
    skills,
    notAnimated
}) => {
    const { isPdf } = useContext(CVPDFContext)

    const getBackgroundColor = (index, level) => (index + 1) <= level
        ? 'bg-ternary-dark'
        : 'border'

        const scrollRef = useRef(null)
        const isInView = useInView(scrollRef)
        
    return (
        <section ref={scrollRef} className={isPdf ? 'mb-4' : 'mb-10'}>
            <CVSectionHeader title="SKILLS"/>
            <div className="grid" style={{gridTemplateColumns: isPdf ? '15% 1fr' : '20% 1fr'}}>
                {skills.map(({name, level}, index) => (
                    <>
                        <p key={index}>{name}: </p>
                        <motion.div 
                            style={notAnimated 
                                ? {} 
                                : {
                                    opacity: isInView ? 1 : 0,
                                    transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
                                }
                            }
                            className="flex"
                        >
                            {Array.from({ length: 10 }).map((_, _index) => (
                                <div 
                                    key={_index}
                                    className={`rounded-4xl h-5 w-5 mr-4 ${getBackgroundColor(_index, level)}`}
                                    style={{
                                        width: '12px',
                                        height: '12px'
                                    }}
                                >
                                </div>
                            ))}
                        </motion.div>
                    </>
                ))}

            </div>
        </section>
    )
}