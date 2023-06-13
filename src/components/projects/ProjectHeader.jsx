import { useContext } from 'react';
import { FiClock, FiTag } from 'react-icons/fi';
import SingleProjectContext from '../../context/SingleProjectContext';

const ProjectSingleHeader = () => {
	const { singleProjectData } = useContext(SingleProjectContext);
	const { publishDate, tags, title } = singleProjectData.ProjectHeader
	const getMargin = (index) => index !== tags.length ? 'mr-2' : ''

	return (
		<div>
			<p className="font-general-medium text-left text-3xl sm:text-4xl font-bold text-primary-dark dark:text-primary-light mt-14 sm:mt-20 mb-7">
				{title}
			</p>
			<div className="flex" style={{overflow: 'hidden'}}>
				<div className="flex items-center mr-10">
					<FiClock className="text-lg text-ternary-dark dark:text-ternary-light" />
					<span className="font-general-regular ml-2 leading-none text-primary-dark dark:text-primary-light">
						{publishDate}
					</span>
				</div>
				{tags.map((tag, index) => (
					<div className={`flex items-center ${getMargin(index + 1)}`} key={index}>
						<FiTag className="text-lg text-ternary-dark dark:text-ternary-light" />
						<span className="font-general-regular ml-2 leading-none text-primary-dark dark:text-primary-light">
							{tag}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default ProjectSingleHeader;
