// Chat Window Component
import type { Message } from "@/types/chat.types";

import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";

interface ChatWindowProps {
  messages: Message[];
  isTyping: boolean;
  onSendMessage: (message: string) => void;
  onQuickReply: (reply: string) => void;
  onMinimize: () => void;
  onClose: () => void;
  disabled?: boolean;
}

export const ChatWindow = ({
  messages,
  isTyping,
  onSendMessage,
  onQuickReply,
  onMinimize,
  onClose,
  disabled = false,
}: ChatWindowProps) => {
  return (
    <div
      className="fixed z-50 
                    top-20 bottom-4 
                    right-4 
                    w-[calc(100vw-2rem)] 
                    h-auto
                    max-w-[420px] 
                    max-h-[calc(100vh-6rem)]
                    sm:top-auto sm:bottom-6 sm:right-6 sm:h-[600px] sm:max-h-[600px]
                    bg-white dark:bg-gray-800 
                    rounded-2xl shadow-2xl 
                    flex flex-col 
                    animate-slide-up
                    border border-gray-200 dark:border-gray-700"
    >
      {/* Header */}
      <ChatHeader onClose={onClose} onMinimize={onMinimize} />

      {/* Messages */}
      <ChatMessages
        isTyping={isTyping}
        messages={messages}
        onQuickReply={onQuickReply}
      />

      {/* Input */}
      <ChatInput disabled={disabled || isTyping} onSend={onSendMessage} />
    </div>
  );
};
