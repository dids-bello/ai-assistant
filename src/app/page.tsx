'use client';

import AppHeader from '@/components/layout/AppHeader';
import AppSidebar from '@/components/layout/AppSidebar';

const styles = {
    container: 'flex min-h-screen p-2 w-full',
    content: 'flex flex-col items-center sm:items-start flex-1',
};

const Home = () => {
    return (
        <div className={styles.container}>
            <AppSidebar />
            <div className={styles.content}>
                <AppHeader />
            </div>
        </div>
    );
};

export default Home;
