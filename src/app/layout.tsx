import './globals.css';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Source_Serif_4 } from 'next/font/google';
import { SidebarProvider } from '@/components/ui/sidebar';

const interSans = Inter({
    variable: '--font-inter-sans',
    subsets: ['latin'],
});

const sourceSerif = Source_Serif_4({
    variable: '--font-source-serif',
    subsets: ['latin'],
});

const jetBrainsMono = JetBrains_Mono({
    variable: '--font-jet-brains-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Aeon AI Assistant',
    description:
        'Meet Aeon, the AI designed to think, assist, and evolve with you. From managing tasks to answering questions, Aeon is your ever-present digital companion, blending cutting-edge technology with seamless, human-like interaction. Whether you’re exploring ideas, organizing your day, or diving into creative projects, Aeon adapts to your needs, learns from your patterns, and helps you stay ahead.',
};

const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <html lang="en">
            <body
                className={`${interSans.variable} ${sourceSerif.variable} ${jetBrainsMono.variable} antialiased`}
            >
                <SidebarProvider defaultOpen>{children}</SidebarProvider>
            </body>
        </html>
    );
};

export default RootLayout;
