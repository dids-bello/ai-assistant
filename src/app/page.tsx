'use client';

import AppHeader from '@/components/layout/AppHeader';
import AppSidebar from '@/components/layout/AppSidebar';
import MainChat from '@/components/layout/MainChat';

const styles = {
    container: 'flex min-h-screen p-2 w-full',
    content: 'flex flex-col items-center sm:items-start w-full',
};

const Home = () => {
    return (
        <div className={styles.container}>
            <AppSidebar />
            <div className={styles.content}>
                <AppHeader />
                <MainChat />
            </div>
        </div>
    );
};

export default Home;
