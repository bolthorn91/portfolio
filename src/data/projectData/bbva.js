// Import images
import bbvaImage1 from 'images/projects/bbva/bbva1.jpg';
import bbvaImage2 from 'images/projects/bbva/bbva2.jpg';
import bbvaImage3 from 'images/projects/bbva/bbva3.jpg';
import bbvaImage4 from 'images/projects/bbva/bbva4.jpg';
import bbvaImage5 from 'images/projects/bbva/bbva5.jpg';
// Import icons
import {
	FiFacebook,
	FiInstagram,
	FiLinkedin,
	FiTwitter,
} from 'react-icons/fi';

export const bbvaProjectData = {
    id: 8,
    category: 'Mobile app',
	ProjectHeader: {
		title: 'BBVA',
		publishDate: 'January, 2021',
		tags: ['Senior Backend engineer'],
	},
	ProjectImages: [
		{
			id: 1,
			title: 'Blue',
			img: bbvaImage1,
		},
		{
			id: 2,
			title: 'Blue Iteration',
			img: bbvaImage2,
		},
		{
			id: 3,
			title: 'Blue response',
			img: bbvaImage3,
		},
		{
			id: 4,
			title: 'Rate',
			img: bbvaImage4,
		},
		{
			id: 5,
			title: 'Q&A',
			img: bbvaImage5,
		},
	],
	ProjectInfo: {
		ClientHeading: 'About Client',
		CompanyInfo: [
			{
				id: 1,
				title: 'Name',
				details: 'BBVA',
			},
			{
				id: 2,
				title: 'Services',
				details: 'Senior Backend engineer',
			},
			{
				id: 3,
				title: 'Website',
				details: 'https://www.bbva.es',
			},
		],
		ObjectivesHeading: 'Objective',
		ObjectivesDetails:
			'Integrate user metrics and tracking to the BBVA mobile app and new chat support system',
		Technologies: [
			{
				title: 'Tools & Technologies',
				techs: [
					'Nestjs',
					'MySQL',
					'PostgreSQL',
					'Grafana',
					'RabbitMQ',
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
				'Add a new tracking system of user behaviors with Datadog and Google Analytics.'				
			},
			{
				id: 2,
				details:
				'Integrate and orchestate all microservices based un on a query bus strategy with RabbitMQ like Blue assistance 24h service.',
			},
			{
				id: 3,
				details:
				'Integrate and test all data synchronizations events and processes to allow users to get up to date data on each use of the app.',
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
	},
}