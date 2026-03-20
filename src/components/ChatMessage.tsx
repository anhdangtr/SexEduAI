import { useMode } from "@/contexts/ModeContext";
import { Shield, Sigma } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  index: number;
}

export const ChatMessage = ({ role, content, index }: ChatMessageProps) => {
  const { mode } = useMode();
  const isUser = role === "user";
  const isSafe = mode === "safe";

  if (isUser) {
    return (
      <div
        className="flex justify-end animate-fade-in-up"
        style={{ animationDelay: `${Math.min(index * 40, 200)}ms` }}
      >
        <div className="max-w-[80%] sm:max-w-[65%] rounded-2xl rounded-br-md bg-chat-user text-chat-user-foreground px-4 py-3 text-sm leading-relaxed mode-transition">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex gap-3 animate-fade-in-up"
      style={{ animationDelay: `${Math.min(index * 40, 200)}ms` }}
    >
      {/* AI Avatar */}
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 mt-0.5">
        {isSafe ? (
          <Shield className="h-3.5 w-3.5 text-primary" />
        ) : (
          <Sigma className="h-3.5 w-3.5 text-primary" />
        )}
      </div>

      {/* AI Content — card-less */}
      <div className="flex-1 min-w-0 text-sm leading-relaxed text-foreground">
        {content.split("\n").map((line, i) => {
          if (line.startsWith("### ")) {
            return (
              <h3
                key={i}
                className="font-semibold text-primary mt-4 first:mt-0 mb-1.5 text-[13px] uppercase tracking-wide"
              >
                {line.replace("### ", "")}
              </h3>
            );
          }
          if (line.startsWith("**") && line.endsWith("**")) {
            return (
              <p key={i} className="font-medium mt-1">
                {line.replace(/\*\*/g, "")}
              </p>
            );
          }
          if (line.startsWith("- ")) {
            return (
              <li key={i} className="ml-4 list-disc text-[13px] leading-relaxed">
                {line.replace("- ", "")}
              </li>
            );
          }
          if (line.trim() === "") return <div key={i} className="h-2" />;
          if (mode === "disguise" && line.includes("$")) {
            return (
              <p key={i} className="font-mono text-accent-foreground">
                {line}
              </p>
            );
          }
          return <p key={i}>{line}</p>;
        })}
      </div>
    </div>
  );
};
