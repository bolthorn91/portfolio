import ProjectGallery from '../components/projects/ProjectGallery';
import ProjectHeader from '../components/projects/ProjectHeader';
import ProjectInfo from '../components/projects/ProjectInfo';
import ProjectRelatedProjects from '../components/projects/ProjectRelatedProjects';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import SingleProjectContext from '../context/SingleProjectContext';
import { courtheroProjectData } from '../data/projectData/courthero';

const ProjectSingle = () => {
	const { id } = useParams();
	const { setSingleProjectData, singleProjectData} = useContext(SingleProjectContext);
	
	useEffect(() => {
		if (id) {
			if (id === '7') {
				setSingleProjectData(courtheroProjectData)
			}
		}
	}, [setSingleProjectData, id])
	
	return (
		singleProjectData && (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, delay: 1 }}
				transition={{
					ease: 'easeInOut',
					duration: 0.6,
					delay: 0.15,
				}}
				className="container mx-auto mt-5 sm:mt-10"
			>
				<ProjectHeader />
				<ProjectGallery />
				<ProjectInfo />
				<ProjectRelatedProjects />
			</motion.div>
		)
	);
};

export default ProjectSingle;
