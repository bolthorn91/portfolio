import { FiPhone, FiMapPin, FiMail } from 'react-icons/fi';

const contacts = [
	{
		id: 1,
		htmlLink: (
			<a 
				className="text-lg mb-4 text-ternary-dark dark:text-ternary-light" 
				href='https://goo.gl/maps/L46AneiqZJiA3vR47'
				target='_blank'
				rel='noreferrer'
			>
					Las Palmas de Gran Canaria, Spain
			</a>
		) ,
		icon: <FiMapPin />,
	},
	{
		id: 2,
		htmlLink: (
			<a className="text-lg mb-4 text-ternary-dark dark:text-ternary-light" href='mailto:bolthorn91@gmail.com'>bolthornmakers@gmail.com</a>
		),
		icon: <FiMail />,
	},
	{
		id: 3,
		htmlLink: (
			<a className="text-lg mb-4 text-ternary-dark dark:text-ternary-light" href='tel:+34690213153'>+34 690 21 31 53</a>
		),
		icon: <FiPhone />,
	},
];

const ContactDetails = () => {
	return (
		<div className="w-full lg:w-1/2">
			<div className="text-left max-w-xl px-6">
				<h2 className="font-general-medium text-2xl text-primary-dark dark:text-primary-light mt-12 mb-8">
					Contact details
				</h2>
				<ul className="font-general-regular">
					{contacts.map((contact) => (
						<li className="flex " key={contact.id}>
							<i className="text-2xl text-gray-500 dark:text-gray-400 mr-4">
								{contact.icon}
							</i>
							{contact.htmlLink}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default ContactDetails;
