import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen container mx-auto px-4 pt-24 pb-10 max-w-5xl">
      <div className="space-y-8 fade-in-up">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold gradient-text">Settings</h2>
          <p className="text-sm text-base-content/40 mt-1">Customize your chat experience</p>
        </div>

        {/* Theme Selector */}
        <div className="glass-card rounded-2xl p-6 space-y-4">
          <div>
            <h3 className="text-sm font-semibold">Theme</h3>
            <p className="text-xs text-base-content/40 mt-0.5">Choose a theme for your chat interface</p>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
            {THEMES.map((t) => (
              <button
                key={t}
                className={`
                  group flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all duration-200
                  ${theme === t
                    ? "bg-gradient-to-br from-indigo-500/10 to-purple-500/10 ring-1 ring-indigo-500/30 scale-105"
                    : "hover:bg-base-content/5"
                  }
                `}
                onClick={() => setTheme(t)}
              >
                <div className="relative h-8 w-full rounded-lg overflow-hidden shadow-sm" data-theme={t}>
                  <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                    <div className="rounded bg-primary"></div>
                    <div className="rounded bg-secondary"></div>
                    <div className="rounded bg-accent"></div>
                    <div className="rounded bg-neutral"></div>
                  </div>
                </div>
                <span className="text-[10px] font-medium truncate w-full text-center text-base-content/60">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-base-content/5">
            <h3 className="text-sm font-semibold">Preview</h3>
          </div>

          <div className="p-6">
            <div className="max-w-lg mx-auto">
              <div className="glass-card rounded-2xl overflow-hidden">
                {/* Chat Header */}
                <div className="px-4 py-3 border-b border-base-content/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                      J
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">John Doe</h4>
                      <p className="text-xs text-emerald-400">Online</p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="p-4 space-y-3 min-h-[200px] max-h-[200px] overflow-y-auto">
                  {PREVIEW_MESSAGES.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`
                          max-w-[80%] rounded-2xl px-4 py-2.5 text-sm
                          ${message.isSent
                            ? "msg-sent rounded-br-md"
                            : "msg-received rounded-bl-md"
                          }
                        `}
                      >
                        <p>{message.content}</p>
                        <p className={`text-[10px] mt-1.5 ${message.isSent ? "text-white/50" : "text-base-content/40"}`}>
                          12:00 PM
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-base-content/5">
                  <div className="flex gap-2 items-center">
                    <div className="flex-1 bg-base-200/50 rounded-xl px-4 py-2.5 text-sm text-base-content/40 border border-base-content/5">
                      This is a preview
                    </div>
                    <button className="btn btn-circle btn-sm bg-gradient-to-r from-indigo-500 to-purple-600 border-none text-white">
                      <Send size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;
