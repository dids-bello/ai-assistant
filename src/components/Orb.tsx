const styles = {
    container: 'relative flex items-center justify-center',
    orb: 'w-8 h-8 orb',
};

const Orb = () => {
    return (
        <div className={styles.container}>
            <div className={styles.orb} />
        </div>
    );
};

export default Orb;
