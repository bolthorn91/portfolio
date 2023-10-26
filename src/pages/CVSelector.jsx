import { CVData } from "data/CVData"
import profileImage from '../images/profile.png';
import { Link } from "react-router-dom";
import { CVPersonalInfoComponent } from "components/cv/CVPersonalInfo";


const CVSelectorPage = () => {
	const {name, position } = CVData

	return (
		<>
			{[profileImage, profileImage].map((_, index) => (
				<Link key={index} to={`${window.location.href}/juan`}>
					<CVPersonalInfoComponent profileImage={profileImage} name={name} position={position} />
				</Link>
			))}
		</>
	);
};

export default CVSelectorPage;
