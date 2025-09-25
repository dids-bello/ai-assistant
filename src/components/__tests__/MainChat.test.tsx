import {
    act,
    fireEvent,
    render,
    screen,
    waitFor,
} from '@testing-library/react';
import { ModelProvider } from '@/context/ModelContext';
import MainChat from '../layout/MainChat';

// Mock sendRequest
jest.mock('../../lib/openrouter');

describe('MainChat', () => {
    const sampleResponse = {
        text: 'Hello from mock LLM',
        emotion: 'neutral',
        reasoning: 'Just testing',
    };

    const mockResponse = {
        id: 'mock-id',
        provider: 'DeepInfra',
        model: 'deepseek/deepseek-chat-v3.1:free',
        object: 'chat.completion',
        created: Date.now(),
        choices: [
            {
                logprobs: null,
                finish_reason: 'stop',
                native_finish_reason: 'stop',
                index: 0,
                message: {
                    content: JSON.stringify(sampleResponse),
                },
            },
        ],
        usage: {
            prompt_tokens: 10,
            completion_tokens: 10,
            total_tokens: 20,
            prompt_tokens_details: null,
        },
    };

    const mockInput =
        'I am a k-pop fan but i want to explore other genre. i love le sserafim, can you suggest me songs that I will like?';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('submits a message and displays parsed JSON LLM response', async () => {
        const originalFetch = global.fetch;

        // Mock the fetch
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => mockResponse,
        });

        render(
            <ModelProvider>
                <MainChat />
            </ModelProvider>
        );

        // Type a message in the chat text area
        const input = screen.getByTestId('chat-input');
        fireEvent.change(input, { target: { value: mockInput } });

        const sendMessageButton = screen.getByTestId('send-button');
        fireEvent.click(sendMessageButton);

        // User message appears in the chat box/history
        expect(screen.getByText(mockInput)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText(sampleResponse.text)).toBeInTheDocument();
        });

        // typing indicator is not present
        expect(
            screen.queryByTestId('typing-indicator')
        ).not.toBeInTheDocument();

        // restore the original fetch
        global.fetch = originalFetch;
    });

    it('handles error response from OpenRouter', async () => {
        const mockInput = 'This is a test message';

        const originalFetch = global.fetch;

        // Mock the fetch
        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            json: async () => ({ error: 'Something went wrong' }),
        });

        render(
            <ModelProvider>
                <MainChat />
            </ModelProvider>
        );

        // Type a message in the chat text area
        const input = screen.getByTestId('chat-input');
        fireEvent.change(input, { target: { value: mockInput } });

        const sendMessageButton = screen.getByTestId('send-button');
        fireEvent.click(sendMessageButton);

        // User message appears in the chat box/history
        expect(screen.getByText(mockInput)).toBeInTheDocument();

        await waitFor(() => {
            expect(
                screen.getByText(
                    'Oops! I ran into an issue processing that. Could you try again?'
                )
            ).toBeInTheDocument();
        });

        // restore the original fetch
        global.fetch = originalFetch;
    });

    it('typing indicator shows up when waiting for LLM response', async () => {
        const originalFetch = global.fetch;

        // Mock the fetch with some delay to simulate waiting for LLM response
        global.fetch = jest.fn().mockImplementationOnce(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        ok: true,
                        json: async () => mockResponse,
                    });
                }, 50);
            });
        });

        render(
            <ModelProvider>
                <MainChat />
            </ModelProvider>
        );

        await act(async () => {
            // Type a message in the chat text area
            const input = screen.getByTestId('chat-input');
            fireEvent.change(input, { target: { value: mockInput } });

            const sendMessageButton = screen.getByTestId('send-button');
            fireEvent.click(sendMessageButton);
        });

        // User message appears in the chat box/history
        expect(screen.getByText(mockInput)).toBeInTheDocument();

        await waitFor(() => {
            // Typing indicator appears
            expect(
                screen.queryByTestId('typing-indicator')
            ).toBeInTheDocument();
        });

        // restore the original fetch
        global.fetch = originalFetch;
    });
});
