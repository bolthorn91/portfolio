import { AnimatePresence } from 'framer-motion';
import Button from '../reusable/Button';
import FormInput from '../reusable/FormInput';
import Modal from '../Modal';
import { useState } from 'react';

const ServicesForm = () => {
	const selectOptions = [
		'Mentoring',
		'Web Application',
		'Mobile Application',
		'Desktop Application',
		'Consultancy',
	];

	const initialFormState = {
		name: '',
		email: '',
		subject: selectOptions[0],
		message: ''
	}

	const [formData, setFormData] = useState(initialFormState)
	const [showModal, setShowModal] = useState(false)

	const handleChange = (e) => {
		const { name: key, value } = e.target;
		setFormData((prev) => ({ ...prev, [key]: value}));
	}

	function showModalFunction() {
		if (!showModal) {
			document
				.getElementsByTagName('html')[0]
				.classList.add('overflow-y-hidden');
			setShowModal(true);
			setTimeout(() => {
				document
				.getElementsByTagName('html')[0]
				.classList.remove('overflow-y-hidden');
				setShowModal(false);
			}, 2000);
		} else {
			document
				.getElementsByTagName('html')[0]
				.classList.remove('overflow-y-hidden');
			setShowModal(false);
		}
	}

	const getUrl = () => {
		if (process.env.REACT_APP_PROD) {
			return '/api'
		}
		return process.env.REACT_APP_BACKEND_URL;
	}

	const onSubmit = async (e) => {
		e.preventDefault();
		if (Object.keys(formData).every(key => !!formData[key])) {
			try {
				const payload = Object
					.keys(formData)
					.reduce((acc, current) => {
						let key = current === 'email' ? 'from' : current
						const payload = {
							...acc, 
							[key]: formData[current]
						}
						return payload
					}, {})
				fetch(`${getUrl()}/contact`, {
					headers: {
						"accept": "*/*",
						'Content-Type': 'application/json',
					},
					mode: 'no-cors',
					method: 'POST',
					body: JSON.stringify(payload)
				})
				setFormData(initialFormState)
				showModalFunction()
			} catch (error) {
				console.log({error})
			}
		}
	}

	return (
		<div className="w-full lg:w-1/2">
			<div className="leading-loose">
				<form 
					encType="application/json"
					onSubmit={onSubmit}
					className="max-w-xl m-4 p-6 sm:p-10 bg-secondary-light dark:bg-secondary-dark rounded-xl shadow-xl text-left"
				>
					<p className="font-general-medium text-primary-dark dark:text-primary-light text-2xl mb-8">
						Service Form
					</p>
					<FormInput
						inputLabel="Full Name"
						labelFor="name"
						inputType="text"
						inputId="name"
						inputName="name"
						placeholderText="Your Name"
						ariaLabelName="Name"
						value={formData.name}
						onChange={handleChange}
					/>
					<FormInput
						inputLabel="Email"
						labelFor="email"
						inputType="email"
						inputId="email"
						inputName="email"
						placeholderText="Your email"
						ariaLabelName="Email"
						value={formData.email}
						onChange={handleChange}
					/>
					<select
						className="w-full px-5 py-2 border dark:border-secondary-dark rounded-md text-md bg-secondary-light dark:bg-ternary-dark text-primary-dark dark:text-ternary-light"
						id="subject"
						name="subject"
						type="text"
						required
						aria-label="Service type"
						value={formData.subject}
						onChange={handleChange}
					>
						{selectOptions.map((option) => (
							<option
								className="text-normal sm:text-md"
								key={option}
								value={option}
							>
								{option}
							</option>
						))}
					</select>
					<div className="mt-6">
						<label
							className="block text-lg text-primary-dark dark:text-primary-light mb-2"
							htmlFor="message"
						>
							Message
						</label>
						<textarea
							required
							className="w-full px-5 py-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm text-md"
							id="message"
							name="message"
							cols="14"
							rows="6"
							aria-label="Message"
							value={formData.message}
							onChange={handleChange}
						></textarea>
					</div>

					<div className="font-general-medium w-40 px-4 py-2.5 text-white text-center font-medium tracking-wider bg-indigo-500 hover:bg-indigo-600 focus:ring-1 focus:ring-indigo-900 rounded-lg mt-6 duration-500">
						<Button
							title="Send Message"
							type="submit"
							aria-label="Send Message"
						/>
					</div>
				</form>
			</div>
			<div>
				<AnimatePresence
					initial={false}
					mode='wait'
					onExitComplete={() => null}
				>
					{showModal && <Modal handleClose={showModalFunction} />}
				</AnimatePresence>
			</div>
		</div>
	);
};

export default ServicesForm;
