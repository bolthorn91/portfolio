// Import images
import santanderImage1 from 'images/projects/santander/santander1.jpg';
import santanderImage2 from 'images/projects/santander/santander2.jpg';
import santanderImage3 from 'images/projects/santander/santander3.jpg';
import santanderImage4 from 'images/projects/santander/santander4.jpg';
import santanderImage5 from 'images/projects/santander/santander5.jpg';
import santanderImage6 from 'images/projects/santander/santander6.jpg';
import santanderImage7 from 'images/projects/santander/santander7.jpg';
// Import icons
import {
	FiFacebook,
	FiInstagram,
	FiLinkedin,
	FiTwitter,
} from 'react-icons/fi';

export const santanderProjectData = {
    id: 9,
    category: 'Mobile App',
	ProjectHeader: {
		title: 'Santander',
		publishDate: 'March, 2021',
		tags: ['Senior Backend engineer'],
	},
	ProjectImages: [
		{
			id: 1,
			title: 'Mail Configuration',
			img: santanderImage1,
		},
		{
			id: 2,
			title: 'Profile Configurations',
			img: santanderImage2,
		},
		{
			id: 3,
			title: 'Notifications Configuration',
			img: santanderImage3,
		},
		{
			id: 4,
			title: 'Investment Funds',
			img: santanderImage4,
		},
		{
			id: 5,
			title: 'Investment Funds Comparison 1',
			img: santanderImage5,
		},
		{
			id: 6,
			title: 'Investment Funds Comparison 2',
			img: santanderImage6,
		},
		{
			id: 7,
			title: 'Purchase Investment Fund',
			img: santanderImage7,
		},
	],
	ProjectInfo: {
		ClientHeading: 'About Client',
		CompanyInfo: [
			{
				id: 1,
				title: 'Name',
				details: 'Santander',
			},
			{
				id: 2,
				title: 'Services',
				details: 'Senior Backend engineer',
			},
			{
				id: 3,
				title: 'Website',
				details: 'https://www.santander.es',
			},
		],
		ObjectivesHeading: 'Objective',
		ObjectivesDetails:
			'Design and implement new fund recommendation feature system on the current ecosystem.',
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
				'Synchronize all third-party data collectors to get updated data in real time to allow user to have trusted comparison system.'				
			},
			{
				id: 2,
				details:
				'Integrate with the payment system to allow users to purchase investments funds.',
			},
			{
				id: 3,
				details:
				'Design all data analytis to show usefull information related to investment funds with tools, reports, dashboards and complexity filters.',
			},
		],
		SocialSharingHeading: 'Share This',
		SocialSharing: [
			{
				id: 1,
				name: 'Twitter',
				icon: <FiTwitter />,
				url: 'https://twitter.com/intent/tweet?text=https://bolthornmakers.io/projects/9',
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
				url: 'https://bolthornmakers.io/projects/9',
			},
			{
				id: 4,
				name: 'LinkedIn',
				icon: <FiLinkedin />,
				url: 'https://bolthornmakers.io/projects/9',
			},
		],
	},
}