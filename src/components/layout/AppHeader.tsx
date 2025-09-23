import { Menu } from 'lucide-react';
import { FunctionComponent } from 'react';
import { Button } from '../ui/button';
import { SidebarTrigger, useSidebar } from '../ui/sidebar';
import ModelSelect from './ModelSelect';

const styles = {
    container:
        'w-full items-center flex flex-row justify-between bg-background pb-2 top-0 sticky',
    model: 'flex flex-row items-center gap-2',
    icon: 'size-8',
    dropdownIcon: 'ml-2 size-4',
};

const AppHeader: FunctionComponent = () => {
    const { isMobile, setOpenMobile } = useSidebar();

    return (
        <header id="header" className={styles.container}>
            <div className={styles.model}>
                {isMobile ? (
                    <Menu onClick={() => setOpenMobile(true)} />
                ) : (
                    <SidebarTrigger className={styles.icon} />
                )}
                <ModelSelect />
            </div>
            <Button aria-label="Upgrade">Upgrade</Button>
        </header>
    );
};

export default AppHeader;
