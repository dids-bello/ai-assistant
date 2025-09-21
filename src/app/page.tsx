'use client';

import { Menu } from 'lucide-react';
import AppSidebar from '@/components/AppSidebar';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';

const Home = () => {
    const { isMobile, setOpenMobile } = useSidebar();

    return (
        <div className="flex min-h-screen p-2">
            <AppSidebar />
            <main className="flex flex-col items-center sm:items-start">
                {isMobile ? (
                    <Menu onClick={() => setOpenMobile(true)} />
                ) : (
                    <SidebarTrigger />
                )}
            </main>
        </div>
    );
};

export default Home;
