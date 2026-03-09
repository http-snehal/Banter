import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/30">
      <div className="max-w-md text-center space-y-6 fade-in-up">
        {/* Animated Icon */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center float">
              <MessageSquare className="w-9 h-9 text-indigo-400" />
            </div>
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-xl scale-150" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold gradient-text">Welcome to Banter!</h2>
          <p className="text-base-content/40 leading-relaxed">
            Select a conversation from the sidebar to start chatting
          </p>
        </div>

        {/* Decorative dots */}
        <div className="flex justify-center gap-1.5 pt-2">
          <div className="w-2 h-2 rounded-full bg-indigo-500/30 animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="w-2 h-2 rounded-full bg-purple-500/30 animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 rounded-full bg-pink-500/30 animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
