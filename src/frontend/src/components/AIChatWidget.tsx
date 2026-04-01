import { Loader2, MessageCircle, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type ChatStep = "awaitService" | "awaitName" | "awaitPhone" | "done";

interface Message {
  id: string;
  role: "bot" | "user";
  text: string;
}

const BOT_GREETING =
  "Hello! How can I help you with your home or digital repair today?";

interface AIChatWidgetProps {
  initialOpen?: boolean;
  onExternalClose?: () => void;
}

export function AIChatWidget({
  initialOpen = false,
  onExternalClose,
}: AIChatWidgetProps) {
  const [open, setOpen] = useState(initialOpen);
  const [messages, setMessages] = useState<Message[]>([
    { id: "greeting", role: "bot", text: BOT_GREETING },
  ]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState<ChatStep>("awaitService");
  const [capturedName, setCapturedName] = useState("");
  const [capturedService, setCapturedService] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialOpen) setOpen(true);
  }, [initialOpen]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleClose = () => {
    setOpen(false);
    onExternalClose?.();
  };

  const addBotMessage = (text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: `bot-${Date.now()}`, role: "bot", text },
      ]);
    }, 700);
  };

  const sendLeadToEmail = async (
    name: string,
    phone: string,
    service: string,
  ) => {
    try {
      await fetch("https://formsubmit.co/ajax/roorkeefairservices@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          service,
          _subject: `AI Chat Lead: ${service} - Roorkee Fair Services`,
          _captcha: "false",
          _template: "table",
        }),
      });
    } catch {
      // silent fail — lead capture is best-effort
    }
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, role: "user", text: trimmed },
    ]);
    setInput("");

    if (step === "awaitService") {
      setCapturedService(trimmed);
      setStep("awaitName");
      addBotMessage(
        "Great! Please share your Name so our expert can reach you.",
      );
    } else if (step === "awaitName") {
      setCapturedName(trimmed);
      setStep("awaitPhone");
      addBotMessage("Thank you! Please share your Mobile Number.");
    } else if (step === "awaitPhone") {
      const phone = trimmed;
      setStep("done");
      addBotMessage(
        `Thank you, ${capturedName}! Our expert will call you shortly at ${phone} regarding ${capturedService || "your service request"}.`,
      );
      sendLeadToEmail(capturedName, phone, capturedService);
    } else {
      setStep("awaitService");
      addBotMessage(
        "Is there anything else I can help you with? Please describe the service you need.",
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gold rounded-full shadow-gold-lg flex items-center justify-center text-midnight hover:bg-gold-dark transition-colors"
        aria-label="Open AI Chat"
        data-ocid="chat.open_modal_button"
      >
        <MessageCircle size={26} />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-24 right-6 z-40 w-80 sm:w-96 rounded-2xl overflow-hidden shadow-gold-lg flex flex-col"
            style={{ maxHeight: "480px" }}
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            data-ocid="chat.dialog"
          >
            {/* Chat Header */}
            <div className="bg-midnight px-4 py-3 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2">
                <img
                  src="/assets/generated/logo-transparent.dim_200x200.png"
                  alt=""
                  className="w-7 h-7 rounded-full object-cover border border-gold"
                />
                <div>
                  <p className="text-gold font-bold text-sm">
                    Roorkee Fair Assistant
                  </p>
                  <p className="text-white/50 text-xs">Always here to help</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="text-white/60 hover:text-gold transition-colors"
                data-ocid="chat.close_button"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-3 bg-midnight-dark"
              style={{ minHeight: 0, height: "320px" }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "chat-bubble-user"
                        : "chat-bubble-bot"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="chat-bubble-bot px-4 py-2">
                    <Loader2 size={14} className="animate-spin text-gold" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="bg-midnight p-3 flex gap-2 flex-shrink-0">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 bg-midnight-light text-white placeholder:text-white/40 text-sm rounded-xl px-3 py-2 border border-white/10 focus:outline-none focus:border-gold"
                data-ocid="chat.input"
              />
              <button
                type="button"
                onClick={handleSend}
                className="w-9 h-9 bg-gold rounded-xl flex items-center justify-center text-midnight hover:bg-gold-dark transition-colors flex-shrink-0"
                data-ocid="chat.primary_button"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
