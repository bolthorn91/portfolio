import { CVData } from "data/CVData"
import profileImage from '../images/profile.png';
import profileImage2 from '../images/profile2.jpeg';
import { Link } from "react-router-dom";
import { CVPersonalInfoComponent } from "components/cv/CVPersonalInfo";


const CVSelectorPage = () => {
	const {name, position } = CVData

	const getProfileUrl = (_index) => {
		switch (_index) {
			case 1:
				return 'juan'
			case 2:
				return 'edgar'
			case 3:
				return 'vero'
			default:
				return 'juan'
		}
	}

	return (
		<>
			{[profileImage, profileImage2].map((image, index) => (
				<Link key={index} to={`${window.location.href}/${getProfileUrl(index + 1)}`}>
					<CVPersonalInfoComponent profileImage={image} name={name} position={position} isSelector={true}/>
				</Link>
			))}
		</>
	);
};

export default CVSelectorPage;
