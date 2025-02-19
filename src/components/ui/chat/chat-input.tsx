import * as React from "react"; 
import { cn } from "@/lib/utils";
import { Textarea } from "../textarea";
const ChatInput = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <Textarea
      autoComplete="off"
      ref={ref}
      {...props}
      name="message"
      className={cn(
        "max-h-12 h-16 px-4 py-3 flex items-center bg-white ring-primary bg-background text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-3xl resize-none leading-[2rem]",
        className,
      )}
      {...props}
    />
  ),
);

ChatInput.displayName = "ChatInput";

export { ChatInput };
