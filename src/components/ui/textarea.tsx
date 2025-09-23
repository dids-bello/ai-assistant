import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type TextAreaProps = React.ComponentProps<'textarea'> & {
    autoResize?: boolean;
};

function Textarea({ className, autoResize = false, ...props }: TextAreaProps) {
    const [value, setValue] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const resizeTextarea = () => {
        if (!textareaRef.current) return;

        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height =
            textareaRef.current?.scrollHeight + 'px';
    };

    useEffect(() => {
        if (autoResize) {
            resizeTextarea();
        }
    }, [value, autoResize]);

    return (
        <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={autoResize ? 1 : undefined}
            data-slot="textarea"
            className={cn(
                'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                autoResize && 'resize-none min-h-0',
                className
            )}
            {...props}
        />
    );
}

export { Textarea };
