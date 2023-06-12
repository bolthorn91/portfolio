// Import images
import inboxproImage1 from '../../images/projects/inboxpro/inboxpro1.png';
import inboxproImage2 from '../../images/projects/inboxpro/inboxpro2.png';
import inboxproImage3 from '../../images/projects/inboxpro/inboxpro3.png';
import inboxproImage4 from '../../images/projects/inboxpro/inboxpro4.png';
import inboxproImage5 from '../../images/projects/inboxpro/inboxpro5.png';
import inboxproImage6 from '../../images/projects/inboxpro/inboxpro6.png';
import inboxproImage7 from '../../images/projects/inboxpro/inboxpro7.png';
// Import icons
import {
	FiFacebook,
	FiInstagram,
	FiLinkedin,
	FiTwitter,
} from 'react-icons/fi';

export const inboxproProjectData = {
    id: 3,
    category: 'Chrome extension',
	ProjectHeader: {
		title: 'Inboxpro',
		publishDate: 'June, 2019',
		tags: ['Tech Lead', 'Chrome extensions'],
	},
	ProjectImages: [
		{
			id: 1,
			title: 'Extension Store',
			img: inboxproImage1,
		},
		{
			id: 2,
			title: 'AI Autocomplete',
			img: inboxproImage2,
		},
		{
			id: 3,
			title: 'Calendar Scheduling',
			img: inboxproImage3,
		},
		{
			id: 4,
			title: 'Automated Follow-up Emails',
			img: inboxproImage4,
		},
		{
			id: 5,
			title: 'Templates',
			img: inboxproImage5,
		},
		{
			id: 6,
			title: 'Signatures',
			img: inboxproImage6,
		},
		{
			id: 7,
			title: 'Analytics',
			img: inboxproImage7,
		},
	],
	ProjectInfo: {
		ClientHeading: 'About Client',
		CompanyInfo: [
			{
				id: 1,
				title: 'Name',
				details: 'Inboxpro',
			},
			{
				id: 2,
				title: 'Services',
				details: 'Tech Lead',
			},
			{
				id: 3,
				title: 'Website',
				details: 'https://inboxpro.io/es/',
			},
		],
		ObjectivesHeading: 'Objective',
		ObjectivesDetails:
			'A chrome extension designed to boost your productivity and turn Gmail into a powerful automated machine',
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
				'Club members can then make recurring reservations to play with other members or guest players. The calendar allows the club members to see all the bookings that can be made on any active field with different time slots with availability.',
			},
			{
				id: 3,
				details:
				'When creating a reservation on a free slots, the application automatically calculates and show the price per player and per season with the time resetvation.',
			},
			{
				id: 4,
				details:
				'The application allows club administrators collect all the pending information and send invoices to members. They can manage the invoices for each member who has make a reservations.',
			},
			{
				id: 5,
				details:
				'In courthero the level of customization is very high, from being able to choose the logos of the courts and the avatars of the club members to creating seasons for each schedule, court, type of member and price rules to decide a price/hour.',
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