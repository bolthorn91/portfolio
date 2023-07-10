// Import images
import ikeafamilyImage1 from 'images/projects/ikeafamily/ikeafamily1.png';
import ikeafamilyImage2 from 'images/projects/ikeafamily/ikeafamily2.png';
import ikeafamilyImage3 from 'images/projects/ikeafamily/ikeafamily3.png';
import ikeafamilyImage4 from 'images/projects/ikeafamily/ikeafamily4.png';
import ikeafamilyImage5 from 'images/projects/ikeafamily/ikeafamily5.png';
import ikeafamilyImage6 from 'images/projects/ikeafamily/ikeafamily6.png';
import ikeafamilyImage7 from 'images/projects/ikeafamily/ikeafamily7.png';
// Import icons
import {
	FiFacebook,
	FiInstagram,
	FiLinkedin,
	FiTwitter,
} from 'react-icons/fi';

export const ikeafamilyProjectData = {
    id: 5,
    category: 'Web Application',
	ProjectHeader: {
		title: 'Ikea Family',
		publishDate: 'January, 2018',
		tags: ['Fullstack engineer'],
	},
	ProjectImages: [
		{
			id: 1,
			title: 'Login',
			img: ikeafamilyImage1,
		},
		{
			id: 2,
			title: 'Register',
			img: ikeafamilyImage2,
		},
		{
			id: 3,
			title: 'Card',
			img: ikeafamilyImage3,
		},
		{
			id: 4,
			title: 'Services',
			img: ikeafamilyImage4,
		},
		{
			id: 5,
			title: 'Offers',
			img: ikeafamilyImage5,
		},
		{
			id: 6,
			title: 'Gastronomy',
			img: ikeafamilyImage6,
		},
		{
			id: 7,
			title: 'Featured',
			img: ikeafamilyImage7,
		},
	],
	ProjectInfo: {
		ClientHeading: 'About Client',
		CompanyInfo: [
			{
				id: 1,
				title: 'Name',
				details: 'Ikea Familt',
			},
			{
				id: 2,
				title: 'Services',
				details: 'Fullstack engineer',
			},
			{
				id: 3,
				title: 'Website',
				details: 'https://www.ikea.com/es/es/ikea-family/',
			},
		],
		ObjectivesHeading: 'Objective',
		ObjectivesDetails:
			'Create the new Ikea Family web centralizing everything on a new platform from segregated services.',
		Technologies: [
			{
				title: 'Tools & Technologies',
				techs: [
					'HTML',
					'CSS',
					'Typescript',
					'Vue',
                    'PHP',
                    'Symfony',
                    'PostgreSQL',
				],
			},
		],
		ProjectDetailsHeading: 'Challenge',
		ProjectDetails: [
			{
				id: 1,
				details:
				'Work in a very large team of more than 60 software engineers around the world with different time zones and work methodologies.',
			},
			{
				id: 2,
				details:
				'Being part of the core engineer team to orchestrate a platform core that was used by different teams to implement in different regions where Ikea provides its services.',
			},
			{
				id: 3,
				details:
				' Create a new frontend with Vue3 with Chinese localization support and high performance focus development to replace and old frontend created with javascript and Jquery.',
			},
			{
				id: 4,
				details:
				'Generate data synchronization scripts every day to feed all the content of the application from payments and shopping carts, to new offers, dynamic content of Ikea areas and spaces or price changes',
			},
		],
		SocialSharingHeading: 'Share This',
		SocialSharing: [
			{
				id: 1,
				name: 'Twitter',
				icon: <FiTwitter />,
				url: 'https://twitter.com/intent/tweet?text=https://bolthornmakers.io/projects/5',
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
				url: 'https://bolthornmakers.io/projects/5',
			},
			{
				id: 4,
				name: 'LinkedIn',
				icon: <FiLinkedin />,
				url: 'https://bolthornmakers.io/projects/5',
			},
		],
	},
}