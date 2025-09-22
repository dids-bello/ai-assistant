'use client';

import AppHeader from '@/components/layout/AppHeader';
import AppSidebar from '@/components/layout/AppSidebar';
import MainChat from '@/components/layout/MainChat';
import { ModelProvider } from '@/context/ModelContext';

const styles = {
    container: 'flex h-screen p-2 w-full overflow-hidden',
    content:
        'flex flex-col items-center sm:items-start w-full flex-1 overflow-hidden',
};

const Home = () => {
    return (
        <div className={styles.container}>
            <AppSidebar />
            <main className={styles.content}>
                <ModelProvider>
                    <AppHeader />
                    <MainChat />
                </ModelProvider>
            </main>
        </div>
    );
};

export default Home;
