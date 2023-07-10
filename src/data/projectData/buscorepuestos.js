// Import images
import buscorepuestosImage1 from 'images/projects/buscorepuestos/buscorepuestos1.png';
import buscorepuestosImage2 from 'images/projects/buscorepuestos/buscorepuestos2.png';
import buscorepuestosImage3 from 'images/projects/buscorepuestos/buscorepuestos3.png';
import buscorepuestosImage4 from 'images/projects/buscorepuestos/buscorepuestos4.png';
import buscorepuestosImage5 from 'images/projects/buscorepuestos/buscorepuestos5.png';
// Import icons
import {
	FiFacebook,
	FiInstagram,
	FiLinkedin,
	FiTwitter,
} from 'react-icons/fi';

export const buscorepuestosProjectData = {
    id: 2,
    category: 'Web Application',
	ProjectHeader: {
		title: 'Buscorepuestos',
		publishDate: 'June, 2020',
		tags: ['Fullstack', 'Frontend', 'Backend'],
	},
	ProjectImages: [
		{
			id: 1,
			title: 'List',
			img: buscorepuestosImage1,
		},
		{
			id: 2,
			title: 'Product Detail',
			img: buscorepuestosImage2,
		},
		{
			id: 3,
			title: 'Payment',
			img: buscorepuestosImage3,
		},
		{
			id: 4,
			title: 'Car Registration Plate Search',
			img: buscorepuestosImage4,
		},
		{
			id: 5,
			title: 'Mobile',
			img: buscorepuestosImage5,
		},
	],
	ProjectInfo: {
		ClientHeading: 'About Client',
		CompanyInfo: [
			{
				id: 1,
				title: 'Name',
				details: 'Buscorepuestos',
			},
			{
				id: 2,
				title: 'Services',
				details: 'Senior Fullstack Software engineer',
			},
			{
				id: 3,
				title: 'Website',
				details: 'https://www.buscorepuestos.com',
			},
		],
		ObjectivesHeading: 'Objective',
		ObjectivesDetails:
			'A platform that specializes in connecting users with suppliers of spare parts for various vehicles, including cars, motorcycles, trucks, and buses. Another main goal of the application is to supply another business of data and metrics.',
		Technologies: [
			{
				title: 'Tools & Technologies',
				techs: [
					'HTML',
					'CSS',
					'Typescript',
					'Angular',
					'TailwindCSS',
                    'Pupeteer',
                    'Nestjs',
                    'Stripe',
                    'Mongodb',
                    'Airtable',
                    'Zapier'
				],
			},
		],
		ProjectDetailsHeading: 'Challenge',
		ProjectDetails: [
			{
				id: 1,
				details:
				'Update the entire ecosystem Buscorepuestos used, where the entire system (integrations and data) were in airtable.',
			},
			{
				id: 2,
				details:
				'First, an entire ecosystem was developed to support the current system through serverless and web services and integrations with AWS, Azure and Zapier.',
			},
			{
				id: 3,
				details:
				'The implementation of a massive scrapping system for the main suppliers of spare parts, as well as the management of data and metrics, guaranteeing its high availability and integrity, as well as monitoring, and the measurement of all the processes that were developed to achieve this objective.',
			},
			{
				id: 4,
				details:
				'The development of a large number of new functionalities such as the integration of a new payment gateway with Stripe, integration of communication channels and bots, such as WhatsApp and its own bot within the web, and the improvement of performance and searches within the application with Algolia.',
			},
			{
				id: 5,
				details:
				'All this was happening while a whole new architecture was developed to support all these processes and a large amount of data where management from airtable was very limited in all aspects and it went to microservices with databases and third-party integrations.',
			},
		],
		SocialSharingHeading: 'Share This',
		SocialSharing: [
			{
				id: 1,
				name: 'Twitter',
				icon: <FiTwitter />,
				url: 'https://twitter.com/intent/tweet?text=https://bolthornmakers.io/projects/8',
			},
			{
				id: 2,
				name: 'Instagram',
				icon: <FiInstagram />,
				url: 'https://instagram.com/bolthornmakers',
			},
			{
				id: 3,
				name: 'Facebook',
				icon: <FiFacebook />,
				url: 'https://bolthornmakers.io/projects/8',
			},
			{
				id: 4,
				name: 'LinkedIn',
				icon: <FiLinkedin />,
				url: 'https://bolthornmakers.io/projects/8',
			},
		],
	}
};
