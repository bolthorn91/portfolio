import { useState, createContext } from 'react';
import { singleProjectData as singleProjectDataJson } from '../data/singleProjectData';
import { courtheroProjectData } from '../data/projectData/courthero';
import { buscorepuestosProjectData } from '../data/projectData/buscorepuestos';
import { inboxproProjectData } from '../data/projectData/inboxpro';
import { getRelatedProjects } from '../services/projects'
import { ikeataiwanProjectData } from '../data/projectData/ikeataiwan';

const SingleProjectContext = createContext();

export const SingleProjectProvider = ({ children }) => {
	const projectList = [courtheroProjectData, buscorepuestosProjectData, inboxproProjectData, ikeataiwanProjectData]
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
