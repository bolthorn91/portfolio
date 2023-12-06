import { CVData as juanCVData } from "data/juanCVData"
import { CVData as veroCVData } from "data/veroCVData"
import profileImage from '../images/profile.png';
import veroProfileImage from '../images/vero_profile.png';
import { Link } from "react-router-dom";
import { CVPersonalInfoComponent } from "components/cv/CVPersonalInfo";


const CVSelectorPage = () => {
	const profileNames = ['juan', 'veronica']
	const profileData = [juanCVData, veroCVData]

	return (
		<>
			{[profileImage, veroProfileImage].map((image, index) => {
				const {name, position} = profileData[index]
				return (
					<Link key={index} to={`${window.location.href}/${profileNames[index]}`}>
						<CVPersonalInfoComponent profileImage={image} name={name} position={position} />
					</Link>
				)
			})}
		</>
	);
};

export default CVSelectorPage;
