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
import { cn } from '@/lib/utils';
import Orb from './Orb';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from './ui/sidebar';

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
            'transition-all duration-300 overflow-hidden whitespace-nowrap text-xl font-bold',
            hide ? 'w-0 opacity-0' : 'w-full opacity-100'
        ),
    icon: 'w-8 h-8',
    close: 'w-6 h-6',
    avatarContainer: 'flex flex-row items-center gap-2',
    sideBarFooterName: (hide: boolean) =>
        cn(
            'transition-all duration-300 overflow-hidden whitespace-nowrap text-sm',
            hide ? 'w-0 opacity-0' : 'w-full opacity-100'
        ),
};

const AppSidebar = () => {
    const { state, isMobile, setOpenMobile } = useSidebar();
    const { setTheme, theme } = useTheme();

    return (
        <aside>
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
                        />
                    )}
                </SidebarHeader>
                <SidebarContent className="p-2">
                    <SidebarMenu>
                        {menuItems.map((item) => {
                            const isActive = item.location === '/';

                            return (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isActive}
                                        variant="outline"
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
                            <AvatarImage src="https://i.postimg.cc/K864V7Sg/Gemini-Generated-Image-wev0zwwev0zwwev0.png" />
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
