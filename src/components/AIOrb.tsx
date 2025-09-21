import * as motion from 'motion/react-client';

const styles = {
    container: 'relative w-40 h-40 flex items-center justify-center',
    orb: 'w-24 h-24 orb',
    ring1: 'absolute w-32 h-32 rounded-full border-2 border-ring/40',
    ring2: 'absolute w-36 h-36 rounded-full border-2 border-ring/30',
};

const AIOrb = () => {
    return (
        <motion.div
            className={styles.container}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
            <motion.div
                className={styles.orb}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
            <motion.div
                className={styles.ring1}
                animate={{ scale: [0.8, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.div
                className={styles.ring2}
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
