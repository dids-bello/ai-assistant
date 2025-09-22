import { createContext, useState } from 'react';
import { ModelType } from '@/constants/models';

interface ModelContextProps {
    model: ModelType;
    changeModel: (model: ModelType) => void;
}

const ModelContext = createContext<ModelContextProps | null>(null);

const ModelProvider = ({ children }: { children: React.ReactNode }) => {
    const [model, setModel] = useState<ModelType>(
        'deepseek/deepseek-chat-v3.1:free'
    );

    const changeModel = (model: ModelType) => {
        setModel(model);
    };

    return (
        <ModelContext value={{ model, changeModel }}> {children} </ModelContext>
    );
};

export { ModelContext, ModelProvider };
