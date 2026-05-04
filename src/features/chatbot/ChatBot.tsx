import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CHAT_SUGGESTIONS } from '@/constants/chatbot_suggestions.ts';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<
    { role: 'user' | 'bot'; text: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const SUPABASE_FUNCTION_URL =
    'https://jzbektkgebxurmpwwxor.supabase.co/functions/v1/chat';

  const handleSend = async (manualPrompt?: string, displayLabel?: string) => {
    const displayText = displayLabel || manualPrompt || input;
    const actualPrompt = manualPrompt || input;
    if (!actualPrompt.trim() || isLoading) return;

    setMessages((prev) => [...prev, { role: 'user', text: displayText }]);
    if (!manualPrompt) setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(SUPABASE_FUNCTION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: actualPrompt }),
      });

      const data = await response.json();

      // 에러 핸들링 포함
      if (data.error) {
        setMessages((prev) => [
          ...prev,
          { role: 'bot', text: data.reply, isError: true },
        ]);
      } else {
        setMessages((prev) => [...prev, { role: 'bot', text: data.reply }]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          text: '연결이 잠시 불안정해요. 다시 시도해 주세요! 📡',
          isError: true,
          error,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* 채팅창 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-80 sm:w-96 h-125 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* 헤더 */}
            <div className="p-4 bg-zinc-100 dark:bg-zinc-800 border-b dark:border-zinc-700 flex justify-between items-center">
              <span className="font-bold text-zinc-800 dark:text-zinc-100">
                민경빈의 ChatBot
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-500 hover:text-zinc-800"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && !isLoading && (
                <div className="flex flex-col items-center justify-center h-full space-y-4 py-4 text-center">
                  <p className="text-sm text-zinc-500">
                    궁금한 내용을 클릭해보세요!
                  </p>
                  <div className="flex flex-col gap-2 w-full px-4">
                    {CHAT_SUGGESTIONS.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => handleSend(s.prompt, s.label)}
                        className="text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 
                                   hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600
                                   py-2 px-3 rounded-xl transition-all active:scale-95 text-left"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`prose prose-sm max-w-none wrap-break-word p-3 rounded-2xl text-sm ${
                      msg.role === 'user'
                        ? 'prose-invert bg-blue-600 text-white rounded-tr-none'
                        : 'dark:prose-invert bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-tl-none'
                    }`}
                  >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-200 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400 p-3 rounded-2xl rounded-tl-none">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div
                          className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"
                          style={{ animationDelay: '0s' }}
                        ></div>
                        <div
                          className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"
                          style={{ animationDelay: '0.2s' }}
                        ></div>
                        <div
                          className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"
                          style={{ animationDelay: '0.4s' }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium">
                        AI가 생각 중입니다...
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t dark:border-zinc-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="질문을 입력하세요..."
                  className="flex-1 bg-zinc-100 dark:bg-zinc-800 border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-zinc-900 dark:text-zinc-100"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={isLoading}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </motion.button>
    </div>
  );
};

export default ChatBot;
