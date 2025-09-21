import { Menu, Sparkles } from 'lucide-react';
import { models } from '@/constants/models';
import { Button } from '../ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import { SidebarTrigger, useSidebar } from '../ui/sidebar';

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
                <Select defaultValue={models[0].id}>
                    <SelectTrigger size="sm">
                        <Sparkles className={styles.icon} />
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {models.map((model) => (
                            <SelectItem key={model.id} value={model.id}>
                                <span>{model.name}</span>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <Button>Upgrade</Button>
        </div>
    );
};

export default AppHeader;
