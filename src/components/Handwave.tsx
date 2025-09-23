import * as motion from 'motion/react-client';
import { FunctionComponent } from 'react';

const Handwave: FunctionComponent = () => {
    return (
        <motion.div
            className="text-4xl cursor-pointer select-none inline-block"
            animate={{
                rotate: [0, 20, -10, 20, -5, 15, 0],
                transition: {
                    duration: 1.2,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    repeatDelay: 0.5,
                },
            }}
            style={{ transformOrigin: '70% 70%' }}
        >
            👋
        </motion.div>
    );
};

export default Handwave;
