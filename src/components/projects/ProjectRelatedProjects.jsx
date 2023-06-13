import { useContext } from 'react';
import { Link } from 'react-router-dom';
import SingleProjectContext from '../../context/SingleProjectContext';
import { motion, useAnimation } from 'framer-motion';


const ProjectRelatedProjects = () => {
	const { relatedProjects } = useContext(SingleProjectContext);
	const controls = useAnimation();

    const handleMouseEnterControls = () => {
        controls.start("hover");
    }
    const handleMouseLeaveControls = () => {
        controls.start("initial");
    };

	const overlayAnimation = {
        initial: {
            opacity: 0
        },
        hover: {
            opacity: 1
        },
        transition: {
            duration: 0.3
        }
    }

    const imageAnimation = {
        initial: {
            scale: 1
        },
        hover: {
            scale: 1.05
        },
        transition: {
            duration: 0.3
        }
    }

	return (
		<div className="mt-10 pt-10 sm:pt-14 sm:mt-20 border-t-2 border-primary-light dark:border-secondary-dark">
			<p className="font-general-regular text-primary-dark dark:text-primary-light text-3xl font-bold mb-10 sm:mb-14 text-left">
				Related Projects
			</p>

			<div className="grid grid-cols-1 sm:grid-cols-4 gap-10">
				{relatedProjects.map((project) => {
					return (
						<Link
							key={project.id}
							to={`/projects/single-project/${project.id}`}
						>
							<motion.div
								className="relative rounded-xl flex overflow-hidden shadow-lg hover:shadow-xl cursor-pointer mb-10 sm:mb-0 bg-secondary-light dark:bg-ternary-dark"
								style={{overflow: 'hidden'}}
								src={project.ProjectImages[0].img}
								alt={project.ProjectHeader.title}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.5 }}
								whileHover='animate'
								onMouseEnter={handleMouseEnterControls}
								onMouseLeave={handleMouseLeaveControls}
							>
								<motion.img 
									id="slideshow-image"
									className='rounded-xl cursor-pointer shadow-lg sm:shadow-none mx-auto'
									src={project.ProjectImages[0].img}
									alt={project.ProjectImages[0].title}
									variants={imageAnimation}
									animate={controls}
								/>
								<motion.div className="overlay absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center rounded-xl cursor-pointer"
									initial={{opacity: 0}}
									variants={overlayAnimation}
									animate={controls}
									style={{position: 'absolute'}}
								>
									<h2 className="image-title text-white text-bold">{project.ProjectHeader.title}</h2>
								</motion.div>
            				</motion.div>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default ProjectRelatedProjects;
