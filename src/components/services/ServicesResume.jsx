import { FaMagnifyingGlassChart } from "react-icons/fa6"
import { GiProgression } from "react-icons/gi"
import { TbUserDollar } from "react-icons/tb"
import { RiArrowGoBackLine } from "react-icons/ri"


const ServicesResume = () => {
    const resumeSteps = [
        {
            icon: <FaMagnifyingGlassChart/>,
            text: 'Establishing clear goals and expectations. we are goint to emphasizes the importance of setting SMART (Specific, Measurable, Achievable, Relevant, Time-bound) goals and encourages you to define their desired outcomes and align goals with your career aspirations.'
        },
        {
            icon: <GiProgression/>,
            text: 'Time to work! Enhance practical skills. We are going to hands-on projects, code reviews, technical discussions, and exposure to real-world software development scenarios, so be ready to hard work.'
        },
        {
            icon: <TbUserDollar/>,
            text: "Now, let's expose your brand to the market. Participate in industry events, enhance your network profiles, work on your portfolio, collaborate on open-source projects, and leverage networking opportunities"
        },
        {
            icon: <RiArrowGoBackLine/>,
            text: "Finally we evaluate the progress. If your goals are being achieved we still working on it and reiterate. Remember this is a fast changing world, so your goals now could not be the same as on the next 6 months. Mentoring sessions could help you along all your career!"
        },
    ]
    return (
        <section className="flex flex-col justify-between gap-10 sm:gap-8 sm:flex-row text-center py-5">
            {resumeSteps.map(({icon, text}, index) => (
                <div key={index} className="flex flex-col justify-center items-center sm:justify-start">
                    <div className="flex justify-center text-xl w-24 sm:text-2xl md:text-3xl text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 cursor-pointer rounded-lg bg-gray-50 dark:bg-ternary-dark hover:bg-gray-100 shadow-sm p-4 duration-300">
                        {icon}
                    </div>
                    <p className="mt-4 text-lg mb-4 text-ternary-dark dark:text-ternary-light">{text}</p>
                </div>
            ))}
        </section>

    )
}

export default ServicesResume