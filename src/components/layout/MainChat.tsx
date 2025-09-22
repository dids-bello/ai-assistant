import { Brain, Mic, Paperclip, Plus, Send } from 'lucide-react';
import { FunctionComponent } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import AIOrb from '../AIOrb';
import useChat from '../chat/chat';
import { ChatBox } from '../ChatBubble';
import Handwave from '../Handwave';
import { Button } from '../ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Form, FormControl, FormField, FormItem } from '../ui/form';

const styles = {
    root: (hasHistory: boolean) =>
        cn(
            'flex w-full flex-1 flex-col items-center space-y-6 justify-between md:max-w-[75%] md:mx-auto',
            !hasHistory && 'md:justify-center'
        ),
    orbContainer:
        'flex flex-col justify-center items-center space-y-2 flex-1 md:flex-none',
    greeting: 'flex flex-row items-center gap-2 w-full',
    greetingText: 'text-4xl',
    greetingText2: 'text-xl text-muted-foreground',
    textareaContainer:
        'p-4 flex flex-col gap-2 border border-border rounded-md w-full',
    textArea:
        'outline-0 border-0 shadow-none focus:outline-none focus-visible:ring-0',
    buttons: 'flex gap-2 justify-between',
    voiceAndSend: 'flex gap-2 items-center',
};

const MainChat: FunctionComponent = () => {
    const { chatHistory, form, onSubmit, isTyping } = useChat();

    const hasHistory = chatHistory.length >= 1;

    return (
        <main className={styles.root(hasHistory)}>
            {!hasHistory ? (
                <div className={styles.orbContainer}>
                    <AIOrb />

                    <div className={styles.greeting}>
                        <h1 className={styles.greetingText}>
                            Hi, I&apos;m Aeon
                        </h1>
                        <Handwave />
                    </div>

                    <h4 className={styles.greetingText2}>
                        How can I help you?
                    </h4>
                </div>
            ) : (
                <ChatBox messages={chatHistory} isTyping={isTyping} />
            )}

            <Form {...form}>
                <form
                    id="prompt"
                    className={styles.textareaContainer}
                    onSubmit={onSubmit}
                >
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea
                                        autoResize
                                        placeholder="Ask me anything"
                                        className={styles.textArea}
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <div className={styles.buttons}>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Plus />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                                <DropdownMenuItem>
                                    <Paperclip />
                                    <span>Upload a file</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Brain />
                                    <span>Deep Research</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <div className={styles.voiceAndSend}>
                            <Button variant="outline" size="icon">
                                <Mic />
                            </Button>
                            <Button
                                size="icon"
                                type="submit"
                                disabled={!form.formState.isDirty}
                            >
                                <Send />
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </main>
    );
};

export default MainChat;
