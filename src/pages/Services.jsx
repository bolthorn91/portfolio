import Button from "../components/reusable/Button";

const Services = () => {
	return (
		<div className="container mx-auto">
			<section className="py-5 sm:py-10 mt-5 sm:mt-10">
				<div className="text-center">
					<p className="font-general-medium text-2xl sm:text-4xl mb-1 text-ternary-dark dark:text-ternary-light">
						<b>Go to the next level</b>
					</p>
					<br/>
					<p>With the mentoring program, you will be able to reach your career goals and expectations faster. The program objective is to guide you to be the best version of yourself and reach all goals you have purposed to reach in your career.</p>
				</div>
				<div className="mt-8 sm:mt-10 flex justify-center">
					<div
						className=" font-general-medium flex items-center px-6 py-3 rounded-lg shadow-lg hover:shadow-xl bg-indigo-500 hover:bg-indigo-600 focus:ring-1 focus:ring-indigo-900 text-white text-lg sm:text-xl duration-300"
					>
						<Button title="Join now" />
					</div>
				</div>
			</section>
		</div>
	);
};

export default Services;
