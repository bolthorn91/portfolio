import ProjectGallery from '../components/projects/ProjectGallery';
import ProjectHeader from '../components/projects/ProjectHeader';
import ProjectInfo from '../components/projects/ProjectInfo';
import ProjectRelatedProjects from '../components/projects/ProjectRelatedProjects';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import SingleProjectContext from '../context/SingleProjectContext';

const ProjectSingle = () => {
	const { id } = useParams();
	const { projectList, setSingleProjectData, singleProjectData} = useContext(SingleProjectContext);
	
	useEffect(() => {
		if (id) {
			const selectedProject = projectList.find(_project => _project.id === parseInt(id))
			if (selectedProject) {
				setSingleProjectData(selectedProject)
			}
		}
	}, [setSingleProjectData, id, projectList])
	
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
