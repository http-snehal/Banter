import { MessageSquare, Heart, Zap } from "lucide-react";

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950">
      {/* Animated floating orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="orb w-96 h-96 bg-indigo-600/20 top-1/4 left-1/4 float" />
        <div className="orb w-72 h-72 bg-purple-600/20 bottom-1/4 right-1/4 float-delayed" />
        <div className="orb w-48 h-48 bg-pink-600/15 top-1/2 right-1/3 float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-md text-center px-8">
        {/* Floating icons grid */}
        <div className="flex justify-center gap-6 mb-10">
          <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center float shadow-lg shadow-indigo-500/10">
            <MessageSquare className="w-7 h-7 text-indigo-400" />
          </div>
          <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center float-delayed shadow-lg shadow-purple-500/10">
            <Heart className="w-7 h-7 text-purple-400" />
          </div>
          <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center float shadow-lg shadow-pink-500/10" style={{ animationDelay: '1s' }}>
            <Zap className="w-7 h-7 text-pink-400" />
          </div>
        </div>

        {/* Grid of glass tiles */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl glass shine ${i % 3 === 0
                  ? "bg-indigo-500/5"
                  : i % 3 === 1
                    ? "bg-purple-500/5"
                    : "bg-pink-500/5"
                }`}
              style={{
                animationDelay: `${i * 0.5}s`,
                opacity: 0.4 + (i % 3) * 0.2,
              }}
            />
          ))}
        </div>

        <h2 className="text-3xl font-bold mb-4 gradient-text">{title}</h2>
        <p className="text-white/40 leading-relaxed">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
