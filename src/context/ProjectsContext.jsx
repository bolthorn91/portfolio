import { useState, createContext } from 'react';
import { buscorepuestosProjectData } from '../data/projectData/buscorepuestos';
import { courtheroProjectData } from '../data/projectData/courthero';
import { projectsData } from '../data/projects';


// Create projects context
export const ProjectsContext = createContext();

// Create the projects context provider
export const ProjectsProvider = (props) => {

	const getProjectPreviews = (_projectList) => {
		const projectListPreviews = _projectList.map(_project => ({
			id: _project.id,
			title: _project.ProjectHeader.title,
			category: _project.category,
			img: _project.ProjectImages[0].img,
			ProjectHeader: {
				title: _project.ProjectHeader.title,
				publishDate: _project.ProjectHeader.publishDate,
				tags: _project.ProjectHeader.tags,
			}
		}))
		const projectPreviews = [...projectListPreviews, ...projectsData]
		return projectPreviews;
	}

	const projectList = [courtheroProjectData, buscorepuestosProjectData]
	const [projects, setProjects] = useState(getProjectPreviews(projectList));
	const [searchProject, setSearchProject] = useState('');
	const [selectProject, setSelectProject] = useState('');

	// Search projects by project title
	const searchProjectsByTitle = projects.filter((item) => {
		const result = item.title
			.toLowerCase()
			.includes(searchProject.toLowerCase())
			? item
			: searchProject === ''
			? item
			: '';
		return result;
	});

	// Select projects by project category
	const selectProjectsByCategory = projects.filter((item) => {
		let category =
			item.category.charAt(0).toUpperCase() + item.category.slice(1);
		return category.includes(selectProject);
	});

	return (
		<ProjectsContext.Provider
			value={{
				projectList,
				projects,
				setProjects,
				searchProject,
				setSearchProject,
				searchProjectsByTitle,
				selectProject,
				setSelectProject,
				selectProjectsByCategory,
			}}
		>
			{props.children}
		</ProjectsContext.Provider>
	);
};
