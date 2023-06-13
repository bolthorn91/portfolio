import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const Slideshow = ({ images }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const controls = useAnimation();
    const handleMouseEnterControls = () => {
        controls.start("hover");
    }
    const handleMouseLeaveControls = () => {
        controls.start("initial");
    };

    const debounce = (func) => {
        let timer;
        return function (...args) {
          const context = this;
          if (timer) clearTimeout(timer);
          timer = setTimeout(() => {
            timer = null;
            func.apply(context, args);
          }, 600);
        };
    };

    const callbackAnimation = debounce(async () => {
        controls.start('initial')
        controls.start('hover')
        return setTimeout(async () => {
            controls.start('initial');
        }, 800)
    })
  
    const nextImage = async () => {
        setCurrentImage((prevImage) => (prevImage === images.length - 1 ? 0 : prevImage + 1))
        return callbackAnimation();
    };
    const prevImage = () => {
        setCurrentImage((prevImage) => (prevImage === 0 ? images.length - 1 : prevImage - 1));
        return callbackAnimation();
    }

    const overlayAnimation = {
        initial: {
            opacity: 0
        },
        hover: {
            opacity: 1
        },
        transition: {
            duration: 0.3
        }
    }

    const imageAnimation = {
        initial: {
            scale: 1
        },
        hover: {
            scale: 1.05
        },
        transition: {
            duration: 0.3
        }
    }
  
    return (
        <div id="slideshow-container" className="relative w-screen h-screen" style={{overflow: 'hidden'}}>
            <motion.div
            className="slideshow-image-container relative flex overflow-hidden rounded-xl"
            style={{overflow: 'hidden'}}
            key={images[currentImage].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            whileHover='animate'
            onMouseEnter={handleMouseEnterControls}
            onMouseLeave={handleMouseLeaveControls}
            >
                <motion.img 
                    id="slideshow-image"
                    className='rounded-xl cursor-pointer shadow-lg sm:shadow-none mx-auto'
                    src={images[currentImage].img}
                    alt={images[currentImage].title}
                    variants={imageAnimation}
                    animate={controls}
                />
                <motion.div className="overlay absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center rounded-xl cursor-pointer"
                    initial={{opacity: 0}}
                    variants={overlayAnimation}
                    animate={controls}
                    style={{position: 'absolute'}}
                >
                    <h2 className="image-title text-white text-bold">{images[currentImage].title}</h2>
                </motion.div>
            </motion.div>
            <div className="navigation-icons flex mt-4 justify-center" style={{gap: '10%'}}>
                <FiChevronLeft 
                    size={40}
                    className="
                        prev-icon
                        cursor-pointer
                        bg-ternary-light
                        dark:bg-ternary-dark
                        text-gray-400
                        hover:text-primary-dark
                        dark:hover:text-primary-light
                        p-2 rounded-lg shadow-sm duration-500
                        scale-100
                        transform hover:scale-125
                        "
                    onClick={prevImage}
                />
                <FiChevronRight 
                    size={40}
                    className="
                        prev-icon
                        cursor-pointer
                        bg-ternary-light
                        dark:bg-ternary-dark
                        text-gray-400
                        hover:text-primary-dark
                        dark:hover:text-primary-light
                        p-2 rounded-lg shadow-sm duration-500
                        transform hover:scale-125
                        "
                    onClick={nextImage}

                />
            </div>
        </div>
    );
};

export default Slideshow;