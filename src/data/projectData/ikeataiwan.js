// Import images
import ikeataiwanImage1 from '../../images/projects/ikeataiwan/ikeataiwan1.png';
import ikeataiwanImage2 from '../../images/projects/ikeataiwan/ikeataiwan2.png';
import ikeataiwanImage3 from '../../images/projects/ikeataiwan/ikeataiwan3.png';
import ikeataiwanImage4 from '../../images/projects/ikeataiwan/ikeataiwan4.png';
import ikeataiwanImage5 from '../../images/projects/ikeataiwan/ikeataiwan5.png';
import ikeataiwanImage6 from '../../images/projects/ikeataiwan/ikeataiwan6.png';
import ikeataiwanImage7 from '../../images/projects/ikeataiwan/ikeataiwan7.png';
import ikeataiwanImage8 from '../../images/projects/ikeataiwan/ikeataiwan8.png';
import ikeataiwanImage9 from '../../images/projects/ikeataiwan/ikeataiwan9.png';
// Import icons
import {
	FiFacebook,
	FiInstagram,
	FiLinkedin,
	FiTwitter,
} from 'react-icons/fi';

export const ikeataiwanProjectData = {
    id: 4,
    category: 'Web Application',
	ProjectHeader: {
		title: 'Ikea Taiwan',
		publishDate: 'June, 2018',
		tags: ['Senior Fullstack engineer'],
	},
	ProjectImages: [
		{
			id: 1,
			title: 'Home',
			img: ikeataiwanImage1,
		},
		{
			id: 2,
			title: 'Recomendations',
			img: ikeataiwanImage2,
		},
		{
			id: 3,
			title: 'Product detail',
			img: ikeataiwanImage3,
		},
		{
			id: 4,
			title: 'Cart1',
			img: ikeataiwanImage4,
		},
		{
			id: 5,
			title: 'Cart2',
			img: ikeataiwanImage5,
		},
		{
			id: 6,
			title: 'Payment Login',
			img: ikeataiwanImage6,
		},
		{
			id: 7,
			title: 'Payment Steps',
			img: ikeataiwanImage7,
		},
		{
			id: 8,
			title: 'Payment Methods',
			img: ikeataiwanImage8,
		},
		{
			id: 9,
			title: 'Service Planner',
			img: ikeataiwanImage9,
		},
	],
	ProjectInfo: {
		ClientHeading: 'About Client',
		CompanyInfo: [
			{
				id: 1,
				title: 'Name',
				details: 'Ikea Taiwan',
			},
			{
				id: 2,
				title: 'Services',
				details: 'Senior Fullstack engineer',
			},
			{
				id: 3,
				title: 'Website',
				details: 'https://www.ikea.com.tw/zh',
			},
		],
		ObjectivesHeading: 'Objective',
		ObjectivesDetails:
			'Design and implement the new Ikea marketplace with a CMS to manage its content and differente functionalities like service planner and virtual guides.',
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
				'The key features it has talk by itself about the callenges faced, AI-powered email assistant, Calendar scheduling, Tracking, Templates, Followups, Email analytics, Email signatures',
			},
			{
				id: 2,
				details:
				'Develop a tool that allows you to modify the UI of the gmail email manager. This interface adds extra functionality to the gmail UI as well as using to synchronize all the emails in the database with the emails from the gmail API.',
			},
			{
				id: 3,
				details:
				'Implement Chat-GPT to predict and autocomplete the emails that are being created in real time, taking into account high availability and synchronization with both systems',
			},
			{
				id: 4,
				details:
				'Orchestrate, provide compatibility and scalability to a complex system with a wide variety of external services, a chrome extension, a web app with different layouts and role management, a cms, a notification system and different backends based on a microservices architecture.',
			},
		],
		SocialSharingHeading: 'Share This',
		SocialSharing: [
			{
				id: 1,
				name: 'Twitter',
				icon: <FiTwitter />,
				url: 'https://twitter.com/intent/tweet?text=https://bolthornmakers.io/projects/4',
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
				url: 'https://bolthornmakers.io/projects/4',
			},
			{
				id: 4,
				name: 'LinkedIn',
				icon: <FiLinkedin />,
				url: 'https://bolthornmakers.io/projects/4',
			},
		],
	},
}