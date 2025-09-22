import { Sparkles } from 'lucide-react';
import { use } from 'react';
import { models } from '@/constants/models';
import { ModelContext } from '@/context/ModelContext';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';

const styles = {
    icon: 'w-8 h-8',
};

const ModelSelect = () => {
    const modelContext = use(ModelContext);

    if (!modelContext) {
        throw new Error('ModelSelect must be used within a ModelProvider');
    }

    const { model: selectedModel, changeModel } = modelContext;

    return (
        <Select defaultValue={selectedModel} onValueChange={changeModel}>
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
    );
};

export default ModelSelect;
