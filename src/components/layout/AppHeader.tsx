import { Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { SidebarTrigger, useSidebar } from '../ui/sidebar';
import ModelSelect from './ModelSelect';

const styles = {
    container: 'w-full items-center flex flex-row justify-between',
    model: 'flex flex-row items-center gap-2',
    icon: 'w-8 h-8',
    dropdownIcon: 'ml-2 h-4 w-4',
};

const AppHeader = () => {
    const { isMobile, setOpenMobile } = useSidebar();

    return (
        <div className={styles.container}>
            <div className={styles.model}>
                {isMobile ? (
                    <Menu onClick={() => setOpenMobile(true)} />
                ) : (
                    <SidebarTrigger className={styles.icon} />
                )}
                <ModelSelect />
            </div>
            <Button>Upgrade</Button>
        </div>
    );
};

export default AppHeader;
