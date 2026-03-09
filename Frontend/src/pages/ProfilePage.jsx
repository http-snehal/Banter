import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Calendar, Shield } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePicture: base64Image });
    };
  };

  return (
    <div className="min-h-screen pt-20 pb-10 bg-base-200">
      <div className="max-w-2xl mx-auto p-4">
        <div className="glass-card rounded-2xl p-8 space-y-8 fade-in-up">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl font-bold gradient-text">Profile</h1>
            <p className="mt-2 text-base-content/40 text-sm">Your profile information</p>
          </div>

          {/* Avatar */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full opacity-30 blur group-hover:opacity-50 transition-opacity" />
              <img
                src={selectedImg || authUser.profilePicture || "/avatar.png"}
                alt="Profile"
                className="relative size-28 rounded-full object-cover ring-4 ring-base-100"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-1 right-1
                  w-8 h-8 rounded-full cursor-pointer
                  bg-gradient-to-r from-indigo-500 to-purple-600
                  flex items-center justify-center
                  shadow-lg shadow-indigo-500/30
                  hover:scale-110 transition-transform
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-4 h-4 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-xs text-base-content/30">
              {isUpdatingProfile ? "Uploading..." : "Click the camera to update your photo"}
            </p>
          </div>

          {/* Info Fields */}
          <div className="space-y-4">
            <div className="glass-card rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-base-content/40 mb-0.5">Full Name</p>
                  <p className="text-sm font-medium truncate">{authUser?.fullName}</p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-purple-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-base-content/40 mb-0.5">Email Address</p>
                  <p className="text-sm font-medium truncate">{authUser?.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Info */}
          <div className="glass-card rounded-xl p-5 space-y-3">
            <h2 className="text-sm font-semibold text-base-content/70 mb-3">Account Information</h2>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2 text-base-content/50">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Member Since</span>
              </div>
              <span className="text-sm font-medium">{authUser.createdAt?.split("T")[0]}</span>
            </div>

            <div className="h-px bg-base-content/5" />

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2 text-base-content/50">
                <Shield className="w-4 h-4" />
                <span className="text-sm">Account Status</span>
              </div>
              <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
