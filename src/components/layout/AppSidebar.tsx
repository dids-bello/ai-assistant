import {
    History,
    LucideIcon,
    MessageSquareMore,
    Moon,
    Search,
    Sun,
    X,
} from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { FunctionComponent, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import Orb from '../Orb';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '../ui/sidebar';

interface MenuItem {
    title: string;
    location: string;
    icon: LucideIcon;
}

const menuItems: MenuItem[] = [
    {
        title: 'New Chat',
        location: '/',
        icon: MessageSquareMore,
    },
    {
        title: 'Search',
        location: '#',
        icon: Search,
    },
    {
        title: 'History',
        location: '#',
        icon: History,
    },
];

const styles = {
    sidebarHeader: 'flex flex-row items-center',
    sidebarName: (hide: boolean) =>
        cn(
            'transition-all duration-300 overflow-hidden whitespace-nowrap',
            hide ? 'w-0 opacity-0' : 'w-full opacity-100'
        ),
    icon: 'size-8',
    close: 'size-6',
    avatarContainer: 'flex flex-row items-center gap-2',
    sideBarFooterName: (hide: boolean) =>
        cn(
            'transition-all duration-300 overflow-hidden whitespace-nowrap text-sm',
            hide ? 'w-0 opacity-0' : 'w-full opacity-100'
        ),
};

const AppSidebar: FunctionComponent = () => {
    const [mounted, setMounted] = useState(false);

    const { state, isMobile, setOpenMobile } = useSidebar();
    const { setTheme, theme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <aside className="shrink-0">
            <Sidebar collapsible="icon">
                <SidebarHeader className={styles.sidebarHeader}>
                    <Orb />
                    <h1
                        className={styles.sidebarName(
                            !isMobile && state === 'collapsed'
                        )}
                    >
                        Aeon AI
                    </h1>
                    {isMobile && (
                        <X
                            className={styles.close}
                            onClick={() => setOpenMobile(false)}
                            aria-label="Close sidebar"
                        />
                    )}
                </SidebarHeader>
                <SidebarContent className="p-2">
                    <SidebarMenu>
                        <nav>
                            {menuItems.map((item) => {
                                const isActive = item.location === '/';

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                            variant="outline"
                                            aria-label={item.title}
                                        >
                                            <Link href={item.location}>
                                                <item.icon
                                                    className={styles.icon}
                                                />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </nav>
                    </SidebarMenu>
                </SidebarContent>
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                variant="outline"
                                onClick={() =>
                                    setTheme(
                                        theme === 'dark' ? 'light' : 'dark'
                                    )
                                }
                                aria-label="Toggle theme"
                            >
                                {theme === 'light' ? (
                                    <>
                                        <Sun className={styles.icon} />
                                        <span>Light</span>
                                    </>
                                ) : (
                                    <>
                                        <Moon className={styles.icon} />
                                        <span>Dark</span>
                                    </>
                                )}
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                    <div className={styles.avatarContainer}>
                        <Avatar className="rounded-md">
                            <AvatarImage
                                src="https://i.postimg.cc/K864V7Sg/Gemini-Generated-Image-wev0zwwev0zwwev0.png"
                                alt="Aeon AI"
                            />
                            <AvatarFallback>AE</AvatarFallback>
                        </Avatar>
                        <span
                            className={styles.sideBarFooterName(
                                !isMobile && state === 'collapsed'
                            )}
                        >
                            Aeon AI
                        </span>
                    </div>
                </SidebarFooter>
            </Sidebar>
        </aside>
    );
};

export default AppSidebar;
