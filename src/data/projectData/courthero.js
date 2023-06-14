// Import images
import courtheroImage1 from 'images/projects/courthero/courthero1.png';
import courtheroImage2 from 'images/projects/courthero/courthero2.png';
import courtheroImage3 from 'images/projects/courthero/courthero3.png';
import courtheroImage4 from 'images/projects/courthero/courthero4.png';
import courtheroImage5 from 'images/projects/courthero/courthero5.png';
import courtheroImage6 from 'images/projects/courthero/courthero6.png';
import courtheroImage7 from 'images/projects/courthero/courthero7.png';
import courtheroImage8 from 'images/projects/courthero/courthero8.png';
import courtheroImage9 from 'images/projects/courthero/courthero9.png';
import courtheroImage10 from 'images/projects/courthero/courthero10.png';
import courtheroImage11 from 'images/projects/courthero/courthero11.png';
import courtheroImage12 from 'images/projects/courthero/courthero12.png';
import courtheroImage13 from 'images/projects/courthero/courthero13.png';
// Import icons
import {
	FiFacebook,
	FiInstagram,
	FiLinkedin,
	FiTwitter,
} from 'react-icons/fi';

export const courtheroProjectData = {
	id: 1,
	category: 'Web Application',
	ProjectHeader: {
		title: 'Court Hero',
		publishDate: 'June, 2022',
		tags: ['Fullstack', 'Frontend', 'Backend'],
	},
	ProjectImages: [
		{
			id: 1,
			title: 'Venues List',
			img: courtheroImage1,
		},
		{
			id: 2,
			title: 'Create Court',
			img: courtheroImage2,
		},
		{
			id: 3,
			title: 'Add Season',
			img: courtheroImage3,
		},
		{
			id: 4,
			title: 'Players List',
			img: courtheroImage4,
		},
		{
			id: 5,
			title: 'Add Price Rules',
			img: courtheroImage5,
		},
		{
			id: 6,
			title: 'Price Rules List',
			img: courtheroImage6,
		},
		{
			id: 7,
			title: 'Booking Calendar Day view',
			img: courtheroImage7,
		},
		{
			id: 8,
			title: 'Booking Calendar Week view',
			img: courtheroImage8,
		},
		{
			id: 9,
			title: 'Booking1',
			img: courtheroImage9,
		},
		{
			id: 10,
			title: 'Booking2',
			img: courtheroImage10,
		},
		{
			id: 11,
			title: 'Reservation1',
			img: courtheroImage11,
		},
		{
			id: 12,
			title: 'Settlement List',
			img: courtheroImage12,
		},
		{
			id: 13,
			title: 'Reservation2',
			img: courtheroImage13,
		},
	],
	ProjectInfo: {
		ClientHeading: 'About Client',
		CompanyInfo: [
			{
				id: 1,
				title: 'Name',
				details: 'Tennis Point',
			},
			{
				id: 2,
				title: 'Services',
				details: 'Senior Fullstack Software engineer',
			},
			{
				id: 3,
				title: 'Website',
				details: 'https://www.tennis-point.de',
			},
		],
		ObjectivesHeading: 'Objective',
		ObjectivesDetails:
			'Create an application to manage tennis clubs around the world allowing you to manage the facilities, club members, schedules and prices and being able to manage invoices and payments in the most comfortable and simple way for the user',
		Technologies: [
			{
				title: 'Tools & Technologies',
				techs: [
					'HTML',
					'CSS',
					'Typescript',
					'Next.js',
                    'React',
                    'Redux',
					'TailwindCSS',
                    'Storybook',
				],
			},
		],
		ProjectDetailsHeading: 'Challenge',
		ProjectDetails: [
			{
				id: 1,
				details:
				'Courthero is an application designed to manage tennis clubs from all over the world. In it, the administrators of the clubs have the possibility to manage their fields with their schedules and details.',
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
				url: 'https://twitter.com/intent/tweet?text=https://bolthornmakers.io/projects/7',
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
				url: 'https://bolthornmakers.io/projects/7',
			},
			{
				id: 4,
				name: 'LinkedIn',
				icon: <FiLinkedin />,
				url: 'https://bolthornmakers.io/projects/7',
			},
		],
	},
};
