import { useState, createContext } from 'react';
import { singleProjectData as singleProjectDataJson } from '../data/singleProjectData';
import { courtheroProjectData } from '../data/projectData/courthero';
import { buscorepuestosProjectData } from '../data/projectData/buscorepuestos';

const SingleProjectContext = createContext();

export const SingleProjectProvider = ({ children }) => {
	const projectList = [courtheroProjectData, buscorepuestosProjectData]
	const [singleProjectData, setSingleProjectData] = useState(
		singleProjectDataJson
	);

	return (
		<SingleProjectContext.Provider
			value={{
				projectList,
				singleProjectData,
				setSingleProjectData
			}}
		>
			{children}
		</SingleProjectContext.Provider>
	);
};

export default SingleProjectContext;
