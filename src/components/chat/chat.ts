'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormEventHandler, use, useState } from 'react';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { ModelContext } from '@/context/ModelContext';
import {
    Message,
    Message as OpenRouterMessage,
    OpenRouterRequest,
} from '@/lib/openrouter';

const MAX_MESSAGES = 10; // only keep the last 10 messages in the chat history

const formSchema = z.object({
    content: z.string().min(1, {
        message: 'Message must be at least 1 character.',
    }),
});

type FormValueType = z.infer<typeof formSchema>;

interface ChatHook {
    form: UseFormReturn<FormValueType>;
    onSubmit: FormEventHandler<HTMLFormElement>;
    chatHistory: OpenRouterMessage[];
    isTyping: boolean;
    handleTextAreaKeyDown: (
        event: React.KeyboardEvent<HTMLTextAreaElement>
    ) => void;
}

const useChat = (): ChatHook => {
    const modelContext = use(ModelContext);

    if (!modelContext) {
        throw new Error('useChat hook must be used within a ModelProvider');
    }

    const [isTyping, setIsTyping] = useState(false);
    // As demo, save the chat history in memory
    const [chatHistory, setChatHistory] = useState<OpenRouterMessage[]>([
        {
            role: 'system',
            content: `You are an NPC companion. Respond in JSON format with fields: 'text' (string), 'emotion' (string: 'happy', 'neutral', 'sad', 'confused', 'angry'), and 'reasoning' (string). Respond ONLY in JSON, do NOT include code fences or extra text.`,
        },
    ]);

    const form = useForm<FormValueType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: '',
        },
    });

    const appendToChatHistory = (message: OpenRouterMessage) => {
        setChatHistory((prevHistory) => [...prevHistory, message]);
    };

    /**
     * This extracts the text response from OpenRouter
     * @param res The response.choices.message.content object from OpenRouter
     * @returns The extracted assistant response ResponseContent
     */
    const extractAssistantResponse = (res: string) => {
        return JSON.parse(res);
    };

    const handleTextAreaKeyDown = (
        event: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            onSubmitHandler(form.getValues());
        }
    };

    const onSubmitHandler: SubmitHandler<FormValueType> = async (data) => {
        setIsTyping(true);
        form.reset();

        const message: OpenRouterMessage = {
            role: 'user',
            content: data.content,
        };

        const updatedChatHistory = [...chatHistory, message]; // keep a copy of the chat history for sending to OpenRouter. This prevents race condition
        appendToChatHistory(message); // Append the message to the chat history

        const request: OpenRouterRequest = {
            model: modelContext.model,
            messages: updatedChatHistory
                .filter((msg) => msg.role != 'error')
                .slice(-MAX_MESSAGES), // Only send the last MAX_MESSAGES
        };

        // send the request to OpenRouter
        try {
            const res = await fetch('/api/sendRequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });

            const response = await res.json();

            if (response.error) {
                throw new Error(response.error);
            }

            const textResponse = extractAssistantResponse(
                response.choices[0].message.content
            ).text;

            const assistantMessage: Message = {
                role: 'assistant',
                content: textResponse,
            };

            appendToChatHistory(assistantMessage); // Append the assistant message to the chat history
        } catch {
            const errorMessage: Message = {
                role: 'error',
                content:
                    'Oops! I ran into an issue processing that. Could you try again?',
            };

            appendToChatHistory(errorMessage); // Append the error message to the chat history
        }

        setIsTyping(false);
    };

    return {
        form,
        onSubmit: form.handleSubmit(onSubmitHandler),
        chatHistory: chatHistory.filter((message) => message.role != 'system'),
        isTyping,
        handleTextAreaKeyDown,
    };
};

export default useChat;
