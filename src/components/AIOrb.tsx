import * as motion from 'motion/react-client';
import { FunctionComponent } from 'react';

const styles = {
    container: 'relative size-40 flex items-center justify-center',
    orb: 'size-16 orb',
    ring1: 'absolute size-24 rounded-full border-2 border-ring/40',
    ring2: 'absolute size-32 rounded-full border-2 border-ring/30',
};

const AIOrb: FunctionComponent = () => {
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
                animate={{ scale: [0.5, 1], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.div
                className={styles.ring2}
                animate={{ scale: [0.5, 1.5], opacity: [0.5, 0] }}
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
