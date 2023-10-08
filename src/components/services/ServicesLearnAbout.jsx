import { FaTemperatureFull, FaPersonDotsFromLine } from "react-icons/fa6"
import { GiFamilyHouse, GiMaterialsScience, GiTestTubes} from "react-icons/gi"
import { BsBricks } from "react-icons/bs"
import { TbTestPipe } from "react-icons/tb"
import { MdDesignServices, MdArchitecture } from "react-icons/md"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"


const ServicesLearnAbout = () => {
    const paths = [
        {
            icon: <FaTemperatureFull/>,
            text: 'Fullstack Engineer',
            image: ""
        },
        {
            icon: <BsBricks/>,
            text: 'Backend Engineer',
            image: ""
        },
        {
            icon: <GiFamilyHouse/>,
            text: "Frontend Engineer",
            image: ""
        },
        {
            icon: <GiMaterialsScience/>,
            text: "Data Scientist",
            image: ""
        },
        {
            icon: <TbTestPipe/>,
            text: "Testing",
            image: ""
        },
        {
            icon: <GiTestTubes/>,
            text: "QA tester",
            image: ""
        },
        {
            icon: <MdDesignServices/>,
            text: "Software Design",
            image: ""
        },
        {
            icon: <MdArchitecture/>,
            text: "Software Architecture",
            image: ""
        },
        {
            icon: <FaPersonDotsFromLine/>,
            text: "Tech Lead",
            image: ""
        },
        {
            icon: <FaPersonDotsFromLine/>,
            text: "Leadership",
            image: "" 
        },
    ]
    const [text, setText] = useState('')
    const [icon, setIcon] = useState('')
    const [image, setImage] = useState('')
    const [wordIndex, setWordIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    let timer

    const initTypeInterval = () => {
        timer = setInterval(() => {
            let _nextCharIndex;
            setCharIndex(_charIndex => {
                _nextCharIndex = _charIndex + 1
                const currentText = paths[wordIndex].text.substring(0, _charIndex);
                setText(currentText)
                if (_charIndex >= paths[wordIndex].text.length) {
                    clearInterval(timer)
                    initDeleteInterval()
                }
                return _nextCharIndex
            })
        }, 150)
    }

    const initDeleteInterval = () => {
        timer = setInterval(() => {
            let _nextCharIndex;
            setCharIndex(_charIndex => {
                _nextCharIndex = _charIndex - 1
                const currentText = paths[wordIndex].text.substring(0, _charIndex);
                setText(currentText)
                if (_charIndex <= 0) {
                    setWordIndex(wordIndex => {
                        const nextWordIndex = wordIndex + 1
                        if (nextWordIndex >= paths[wordIndex].text.length) {
                            return 0
                        }
                        return nextWordIndex
                    })
                    clearInterval(timer)
                }
                return _nextCharIndex
            })
      }, 75)
    }

    const placeholderVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };
    
    const placeholderTransition = {
        duration: 0.4,
        repeat: Infinity,
        repeatType: "reverse",
    };

    useEffect(() => {
        if (timer) {
            clearInterval(timer)
        }
        initTypeInterval()
    }, [wordIndex])
    
    useEffect(() => {
        return () => clearInterval(timer)
    }, []);

    return (
        <section className="text-center py-5">
            <div className="w-full flex flex-col gap-10 sm:gap-8 items-center">
                <b className="flex items-center gap-10 font-general-medium text-2xl sm:text-4xl mb-1 text-ternary-dark dark:text-ternary-light">
                    <span>Learn about</span>
                    <div className="flex items-center">
                        <p className="flex items-center" style={{gap: '12px'}}>
                            <p style={{display: 'inline-block'}}>
                                {paths[wordIndex].icon}
                            </p>
                            <span>{text}</span>
                        </p>
                        <motion.span
                            style={{
                                display: 'inline-block',
                            }}
                            variants={placeholderVariants}
                            initial="hidden"
                            animate="visible"
                            transition={placeholderTransition}
                        >
                            |
                        </motion.span>

                    </div>
                </b>
            </div>
            <p className="text-lg mb-4 text-ternary-dark dark:text-ternary-light mt-4">
                The fastest way to learn is talking 1:1 with experts.
            </p>
        </section>

    )
}

export default ServicesLearnAbout