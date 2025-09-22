import { ModelType } from '@/constants/models';

export interface Message {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export interface OpenRouterRequest {
    model: ModelType;
    messages: Message[];
}

export interface ResponseContent {
    text: string;
    emotion: string;
    reasoning: string;
}

export const sendRequest = async (request: OpenRouterRequest) => {
    const response = await fetch(
        'https://openrouter.ai/api/v1/chat/completions',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            },
            body: JSON.stringify(request),
        }
    );

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }

    const data = await response.json();

    return data;
};
