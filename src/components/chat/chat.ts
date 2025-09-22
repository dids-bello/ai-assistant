'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormEventHandler, use } from 'react';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { ModelContext } from '@/context/ModelContext';

const formSchema = z.object({
    content: z.string().min(1, {
        message: 'Message must be at least 1 character.',
    }),
});

type FormValueType = z.infer<typeof formSchema>;

interface ChatHook {
    form: UseFormReturn<FormValueType>;
    onSubmit: FormEventHandler<HTMLFormElement>;
}

const useChat = (): ChatHook => {
    const modelContext = use(ModelContext);

    if (!modelContext) {
        throw new Error('useChat hook must be used within a ModelProvider');
    }

    const form = useForm<FormValueType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: '',
        },
    });

    const onSubmitHandler: SubmitHandler<FormValueType> = async (data) => {
        // TODO: Send request to OpenRouter
        console.log(data, modelContext.model);
    };

    return {
        form,
        onSubmit: form.handleSubmit(onSubmitHandler),
    };
};

export default useChat;
