import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="fixed w-full top-0 z-40 glass border-b border-white/5"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-all group">
            <div className="size-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold gradient-text tracking-tight">Banter</h1>
          </Link>

          {/* Nav Actions */}
          <div className="flex items-center gap-1">
            <Link
              to="/settings"
              className="btn btn-ghost btn-sm gap-2 text-base-content/70 hover:text-base-content transition-colors rounded-xl"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link
                  to="/profile"
                  className="btn btn-ghost btn-sm gap-2 text-base-content/70 hover:text-base-content transition-colors rounded-xl"
                >
                  <User className="size-4" />
                  <span className="hidden sm:inline text-sm">Profile</span>
                </Link>

                <button
                  onClick={logout}
                  className="btn btn-ghost btn-sm gap-2 text-red-400/80 hover:text-red-400 hover:bg-red-500/10 transition-colors rounded-xl"
                >
                  <LogOut className="size-4" />
                  <span className="hidden sm:inline text-sm">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
