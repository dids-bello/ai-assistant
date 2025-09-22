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
}

const useChat = (): ChatHook => {
    const modelContext = use(ModelContext);

    if (!modelContext) {
        throw new Error('useChat hook must be used within a ModelProvider');
    }

    // As demo, save the chat history in memory
    const [chatHistory, setChatHistory] = useState<OpenRouterMessage[]>([
        {
            role: 'system',
            content:
                "You are an NPC companion. Respond in JSON format with fields: 'text' (string), 'emotion' (string: 'happy', 'neutral', 'sad', 'confused', 'angry'), and 'reasoning' (string). Respond ONLY in JSON, do NOT include code fences or extra text.",
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

    const onSubmitHandler: SubmitHandler<FormValueType> = async (data) => {
        const message: OpenRouterMessage = {
            role: 'user',
            content: data.content,
        };

        appendToChatHistory(message); // Append the message to the chat history

        // reset the form right after sending the request
        form.reset();

        const request: OpenRouterRequest = {
            model: modelContext.model,
            messages: chatHistory.slice(-MAX_MESSAGES), // Only send the last MAX_MESSAGES
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

            const textResponse = extractAssistantResponse(
                response.choices[0].message.content
            ).text;

            const assistantMessage: Message = {
                role: 'assistant',
                content: textResponse,
            };

            appendToChatHistory(assistantMessage); // Append the assistant message to the chat history
        } catch (error) {
            console.error('Error sending request to OpenRouter:', error);
            return;
        }
    };

    return {
        form,
        onSubmit: form.handleSubmit(onSubmitHandler),
    };
};

export default useChat;
