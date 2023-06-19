import { motion } from "framer-motion";
import Button from './reusable/Button';
import { FiX } from 'react-icons/fi';


const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
};
  

const Modal = ({ handleClose }) => {

    return (

		<motion.div
			className="bg-filter bg-black bg-opacity-50 fixed inset-0 w-full h-full z-20"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			onClick={handleClose}
		>
			<motion.main
				onClick={(e) => e.stopPropagation()}  
				className="flex flex-col items-center justify-center h-full w-full"
				variants={dropIn}
				initial="hidden"
				animate="visible"
				exit="exit"
			>
				<div className="modal-wrapper flex items-center z-30">
					<div className="modal max-w-md mx-5 xl:max-w-xl lg:max-w-xl md:max-w-xl bg-secondary-light dark:bg-primary-dark max-h-screen shadow-lg flex-row rounded-lg relative">
						<div className="modal-header flex justify-between gap-10 p-5 border-b border-ternary-light dark:border-ternary-dark">
							<h5 className=" text-primary-dark dark:text-primary-light text-xl">
								Email sent correctly. We will contact you soon! &#128640;
							</h5>
							<button
								onClick={handleClose}
								className="px-4 font-bold text-primary-dark dark:text-primary-light"
							>
								<FiX className="text-3xl" />
							</button>
						</div>
						<div className="modal-footer mt-2 sm:mt-0 py-5 px-8 border0-t text-right">
							<span
								onClick={handleClose}
								type="button"
								className="px-4
									sm:px-6
									py-2 bg-gray-600 text-primary-light hover:bg-ternary-dark dark:bg-gray-200 dark:text-secondary-dark dark:hover:bg-primary-light
									rounded-md
									focus:ring-1 focus:ring-indigo-900 duration-500"
								aria-label="Close Modal"
							>
								<Button title="Close" />
							</span>
						</div>

					</div>
				</div>
			</motion.main>
	  </motion.div>
    );
};

export default Modal