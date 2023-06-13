import profileImage from '../../images/profile.png';
import { useContext } from 'react';
import AboutMeContext from '../../context/AboutMeContext';
import { motion } from 'framer-motion';
import Accordion from '../reusable/Accordion';

const AboutMeBio = () => {
	const { aboutMe } = useContext(AboutMeContext);

	const container = {
		hidden: {
		  opacity: 0
		},
		visible: (i = 1) => ({
		  opacity: 1,
		  transition: { staggerChildren: 0.01, delayChildren: i * 0 }
		})
	  };
	  
	  const child = {
		visible: {
		  opacity: 1,
		  y: 0,
		  transition: {
			type: "spring",
			damping: 12,
			stiffness: 200
		  }
		},
		hidden: {
		  opacity: 0,
		  y: 20,
		  transition: {
			type: "spring",
			damping: 12,
			stiffness: 200
		  }
		}
	  };


	return (
		<div className="block sm:flex sm:gap-10 mt-10 sm:mt-20">
			<div className="w-full sm:w-1/4 mb-7 sm:mb-0">
				<img src={profileImage} className="rounded-lg w-96 user-none" alt="" />
			</div>

			<div className="font-general-regular w-full sm:w-3/4 text-left">
				{aboutMe.map((bio) => (
					<Accordion 
						key={bio.id}
						title={bio.title} 
					>
						<motion.p
							className="mb-4 text-ternary-dark dark:text-ternary-light text-lg"
							initial="hidden"
							animate="visible"
							variants={container}
						>
							{bio.bio.split('').map((word, index) => (
								<motion.span
									key={index}
									variants={child}
								>
									{word}
								</motion.span>
							))}
						</motion.p>
					</Accordion>
				))}
			</div>
		</div>
	);
};

export default AboutMeBio;
