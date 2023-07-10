// Import images
import vodafoneImage1 from 'images/projects/vodafone/vodafone1.png';
import vodafoneImage2 from 'images/projects/vodafone/vodafone2.png';
import vodafoneImage3 from 'images/projects/vodafone/vodafone3.png';
import vodafoneImage4 from 'images/projects/vodafone/vodafone4.png';
import vodafoneImage5 from 'images/projects/vodafone/vodafone5.png';
import vodafoneImage6 from 'images/projects/vodafone/vodafone6.png';
import vodafoneImage7 from 'images/projects/vodafone/vodafone7.png';
import vodafoneImage8 from 'images/projects/vodafone/vodafone8.png';
// Import icons
import {
	FiFacebook,
	FiInstagram,
	FiLinkedin,
	FiTwitter,
} from 'react-icons/fi';

export const vodafoneProjectData = {
    id: 6,
    category: 'Web Application',
	ProjectHeader: {
		title: 'Vodafone',
		publishDate: 'March, 2020',
		tags: ['Senior Backend engineer'],
	},
	ProjectImages: [
		{
			id: 1,
			title: 'Home',
			img: vodafoneImage1,
		},
		{
			id: 2,
			title: 'Bot',
			img: vodafoneImage2,
		},
		{
			id: 3,
			title: 'Fee recommendation step 1',
			img: vodafoneImage3,
		},
		{
			id: 4,
			title: 'Fee recommendation step 2',
			img: vodafoneImage4,
		},
		{
			id: 5,
			title: 'Fee recommendation step 3',
			img: vodafoneImage5,
		},
		{
			id: 6,
			title: 'Loading fee recommendation',
			img: vodafoneImage6,
		},
		{
			id: 7,
			title: 'Recomendation List',
			img: vodafoneImage7,
		},
		{
			id: 8,
			title: 'Marketplace',
			img: vodafoneImage8,
		},
	],
	ProjectInfo: {
		ClientHeading: 'About Client',
		CompanyInfo: [
			{
				id: 1,
				title: 'Name',
				details: 'Vodafone',
			},
			{
				id: 2,
				title: 'Services',
				details: 'Senior Backend engineer',
			},
			{
				id: 3,
				title: 'Website',
				details: 'https://www.vodafone.es',
			},
		],
		ObjectivesHeading: 'Objective',
		ObjectivesDetails:
			'Integrate and test all use cases for Vodafone Marketplace and Vodafone custom recommendation service',
		Technologies: [
			{
				title: 'Tools & Technologies',
				techs: [
					'Nestjs',
					'MySQL',
					'PostgreSQL',
					'SSO',
					'Sequelize',
					'Docker',
                    'Jest',
                    'Supertest',
                    'Cypress',
                    'AWS',
				],
			},
		],
		ProjectDetailsHeading: 'Challenge',
		ProjectDetails: [
			{
				id: 1,
				details:
				'Test all the use cases of vodafone user tracking in your marketplace with unit tests, integration, e2e and performance.'				
			},
			{
				id: 2,
				details:
				'Implement the new marketplace for registered Vodafone users with new functionalities.',
			},
			{
				id: 3,
				details:
				'Implement and test the new rate and product recommendation system for users through various forms that trace their preferences with a system of preference weights based on historical data analytics.',
			},
		],
		SocialSharingHeading: 'Share This',
		SocialSharing: [
			{
				id: 1,
				name: 'Twitter',
				icon: <FiTwitter />,
				url: 'https://twitter.com/intent/tweet?text=https://bolthornmakers.io/projects/6',
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
				url: 'https://bolthornmakers.io/projects/6',
			},
			{
				id: 4,
				name: 'LinkedIn',
				icon: <FiLinkedin />,
				url: 'https://bolthornmakers.io/projects/6',
			},
		],
	},
}