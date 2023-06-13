import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const Accordion = ({ title, children }) => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div>
      <AnimatePresence>
        <motion.div
            key={title}
            className="rounded-tr-md flex items-center justify-between relative select-none shadow-sm px-2 py-3 cursor-pointer border-l-2 dark:hover:text-primary-light hover:text-primary-dark text-gray-500" 
            onClick={() => setIsOpen(!isOpen)}
        >
          <motion.div className="text-gray-500 font-bold ml-1 transition" style={{color: 'inherit'}}>
            {title}
          </motion.div>
          <motion.div
            className="ml-8 text-gray-500"
            style={{rotateZ: '0deg', color: 'inherit'}}
            animate={{
                rotateZ: isOpen ? '90deg' : '0',
                transition: {
                    duration: 0.5,
                }
            }}
          >
            <FiArrowRight></FiArrowRight>
          </motion.div>
        </motion.div>

        {isOpen && (
          <motion.div
            key={`${title}-children`}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.5,
              },
            }}
            exit={{ opacity: 0 }}
            className="p-2 text-lg text-gray-700 border-gray-300"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Accordion;