import { useState, createContext } from 'react';
import { singleProjectData as singleProjectDataJson } from '../data/singleProjectData';
import { getProjectList, getRelatedProjects } from '../services/projects'

const SingleProjectContext = createContext();

export const SingleProjectProvider = ({ children }) => {
	const projectList = getProjectList();
	const [singleProjectData, setSingleProjectData] = useState(
		singleProjectDataJson
	);

	const relatedProjects = getRelatedProjects(projectList);

	return (
		<SingleProjectContext.Provider
			value={{
				projectList,
				singleProjectData,
				setSingleProjectData,
				relatedProjects
			}}
		>
			{children}
		</SingleProjectContext.Provider>
	);
};

export default SingleProjectContext;
