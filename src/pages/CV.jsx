import { useLocation, useParams, Link } from "react-router-dom";
import { CVComponent } from "components/cv/CV";
import { CVData as juanData } from "data/juanCVData";
import { CVData as veroData } from "data/veroCVData";
import { createContext, useEffect, useState } from "react";
import { CVPDFComponent } from "components/cv/CVPDF";
import Button from "components/reusable/Button";
import juanProfileImage from '../images/profile.png';
import veroProfileImage from '../images/vero_profile.png';


export const CVPDFContext = createContext();

const CVPage = () => {
	const { id } = useParams()
	const [data, setData] = useState(undefined)
	const [image, setImage] = useState(undefined)
	const { pathname } = useLocation()
    const [isPdf, setIsPdf] = useState(pathname.includes('/cv-generator'))

	useEffect(() => {
		switch (id) {
			case 'juan':
				setData(juanData)
				setImage(juanProfileImage)
				break;
			case 'edgar':
				setData(juanData)
				setImage(juanProfileImage)
				break;
			case 'veronica':
				setData(veroData)
				setImage(veroProfileImage)
				break;
			default:
				setData(juanData)
				setImage(juanProfileImage)
		}
	}, [id])

	const onClick = async () => {
		const response = await fetch(`http://localhost:5000/cv/${id}`)
		const blob = await response.blob()
		const link = window.URL.createObjectURL(blob);
    	window.location = link
	}

	if (!data && !image) {
		return null
	}
	
	if (isPdf) {
		return(
			<CVPDFContext.Provider value={{ isPdf, setIsPdf }}>
				<CVPDFComponent CVData={data} profileImage={image}/>
			</CVPDFContext.Provider>)
	}

	const pdfComponent = (
		<Link 
			className="font-general-medium fixed flex items-center px-6 py-3 rounded-lg shadow-lg hover:shadow-xl bg-indigo-500 hover:bg-indigo-600 focus:ring-1 focus:ring-indigo-900 text-white text-lg sm:text-xl duration-300"
			style={{bottom: '110px', right: '10px'}}
			aria-label="Print PDF"
			onClick={onClick}
		>
			<Button title={'Print PDF'} type={'button'}></Button>
		</Link>
	) 	
	
	return (
		<CVPDFContext.Provider value={{ isPdf, setIsPdf }}>
			<CVComponent CVData={data} profileImage={image} pdfComponent={pdfComponent}/>
		</CVPDFContext.Provider>
		
	)
};

export default CVPage;
