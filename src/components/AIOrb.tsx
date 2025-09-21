import * as motion from 'motion/react-client';

const AIOrb = () => {
    return (
        <motion.div
            className="relative w-40 h-40 flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
            <motion.div
                className="w-24 h-24 rounded-full bg-gradient-to-br from-background to-primary shadow-xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
            <motion.div
                className="absolute w-32 h-32 rounded-full border-2 border-ring/40"
                animate={{ scale: [0.8, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.div
                className="absolute w-36 h-36 rounded-full border-2 border-ring/30"
                animate={{ scale: [0.8, 1.8], opacity: [0.5, 0] }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeOut',
                }}
            />
        </motion.div>
    );
};

export default AIOrb;
