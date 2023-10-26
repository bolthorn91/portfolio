import { useParams } from "react-router-dom";
import { CVComponent } from "components/cv/CV";
import { CVData as juanData } from "data/CVData";
import profileImage from '../images/profile.png';
import { useEffect, useState } from "react";



const CVPage = () => {
	const { id } = useParams()
	const [data, setData] = useState(undefined)
	const [image, setImage] = useState(undefined)

	useEffect(() => {
		switch (id) {
			case 'juan':
				setData(juanData)
				setImage(profileImage)
				break;
			case 'edgar':
				setData(juanData)
				setImage(profileImage)
				break;
			default:
				setData(juanData)
				setImage(profileImage)
		}
	}, [id])

	if (!data && !image) {
		return null
	}
	
	return (
		<>
			<CVComponent CVData={data} profileImage={image}/>
		</>
	);
};

export default CVPage;
