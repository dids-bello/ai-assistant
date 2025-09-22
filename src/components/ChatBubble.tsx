import * as motion from 'motion/react-client';
import { FunctionComponent } from 'react';
import { Message } from '@/lib/openrouter';
import { cn } from '@/lib/utils';

const styles = {
    // chat bubble styles
    chatBubble: (isUser: boolean) =>
        cn(
            'flex flex-col max-w-[75%] gap-2 rounded-md p-4 text-sm text-justify',
            isUser ? 'bg-primary text-primary-foreground ml-auto' : 'bg-muted'
        ),
    chatBubbleWrapper: 'flex flex-col gap-0.5',
    aeon: 'text-xs font-bold ml-1',

    // chat box styles
    chatBox: 'flex flex-col gap-4 w-full flex-1',

    // typing indicator styles
    typingIndicator: 'flex gap-1 items-center h-6',
    typingIndicatorText: 'text-sm text-muted-foreground',
    typingIndicatorSpan: 'size-1 bg-muted-foreground rounded-full',
};

interface ChatBubbleProps {
    message: Message;
}

const ChatBubble: FunctionComponent<ChatBubbleProps> = ({ message }) => {
    return (
        <div className={styles.chatBubbleWrapper}>
            {message.role === 'assistant' && (
                <div className={styles.aeon}>Aeon</div>
            )}
            <div className={styles.chatBubble(message.role === 'user')}>
                {message.content}
            </div>
        </div>
    );
};

const TypingIndicator: FunctionComponent = () => {
    return (
        <div className={styles.typingIndicator}>
            <span className={styles.typingIndicatorText}>Aeon is thinking</span>
            {Array.from({ length: 3 }).map((_, index) => (
                <motion.span
                    key={index}
                    className={styles.typingIndicatorSpan}
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: 'loop',
                        delay: index * 0.2,
                    }}
                />
            ))}
        </div>
    );
};

interface ChatBoxProps {
    messages: Message[];
    isTyping?: boolean;
}

const ChatBox: FunctionComponent<ChatBoxProps> = ({
    messages,
    isTyping = false,
}) => {
    return (
        <div id="chatbox" className={styles.chatBox}>
            {messages.map((message, index) => (
                <ChatBubble key={index} message={message} />
            ))}

            {isTyping && <TypingIndicator />}
        </div>
    );
};

export { ChatBox, ChatBubble };
