import { CodeWarsIcon } from "components/icons/codewars";
import { CVSectionHeader } from "./CVSectionHeader";
import { FaLocationDot } from "react-icons/fa6"
import { FiGithub, FiLinkedin, FiMail, FiPhone} from "react-icons/fi"


export const CVContactComponent = ({
    ubication,
    email,
    phone,
    profiles
}) => {
	const getSVGSize = (viewportWidth) => {
		if (viewportWidth < 640) {
			return "20px";
		}
		if (viewportWidth < 768) {
			return "24px"
		}
		return "30px"
	}

    const getScialIcon = (key) => {
        switch (key) {
            case 'github':
                return <FiGithub />
            case 'linkedin':
                return <FiLinkedin />
            case 'codewars':
                return <CodeWarsIcon width={getSVGSize(window.innerWidth)} height={getSVGSize(window.innerWidth)}/>
            default:
                return <></>;
        }
    }
   
	const getSocialLinks = (_profiles) => {
        return Object.keys(_profiles).map(key => (
            {
                id: key,
                icon: getScialIcon(key),
                url: _profiles[key],
            }
        ))
    }

    return (
        <section className="mb-10">
            <CVSectionHeader title="CONTACT"/>
            <div className="flex items-center mb-2">
                <FaLocationDot className="mr-2"/>
                <p>{ubication}</p>
            </div>
            <div className="flex items-center mb-2">
                <FiMail className="mr-2"/>
                <p>{email}</p>
            </div>
            <div className="flex items-center mb-2">
                <FiPhone className="mr-2"/>
                <p>{phone}</p>
            </div>
            <ul className="flex gap-4 sm:gap-8">
                {getSocialLinks(profiles).map((link) => (
                    <a
                        href={link.url}
                        target="__blank"
                        key={link.id}
                        className="text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 cursor-pointer rounded-lg bg-gray-50 dark:bg-ternary-dark hover:bg-gray-100 shadow-sm p-2 duration-300"
                    >
                        <i className="text-xl sm:text-2xl md:text-3xl">
                            {link.icon}
                        </i>
                    </a>
                ))}
            </ul>
            
        </section>
    ) 
}