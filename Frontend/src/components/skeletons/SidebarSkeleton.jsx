import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="h-full w-20 lg:w-80 border-r border-base-content/5 flex flex-col bg-base-100/50">
      {/* Header */}
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
            <Users className="size-4 text-indigo-400" />
          </div>
          <span className="font-semibold hidden lg:block text-sm">Contacts</span>
        </div>
        {/* Search skeleton */}
        <div className="hidden lg:block">
          <div className="skeleton h-9 w-full rounded-xl" />
        </div>
      </div>
      <div className="divider my-0 h-[1px] bg-base-content/5" />

      {/* Skeleton Contacts */}
      <div className="overflow-y-auto flex-1 py-2">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-full px-4 py-3 flex items-center gap-3">
            <div className="relative mx-auto lg:mx-0">
              <div className="skeleton size-11 rounded-full" />
            </div>
            <div className="hidden lg:block text-left min-w-0 flex-1 space-y-2">
              <div className="skeleton h-3.5 w-28 rounded" />
              <div className="skeleton h-3 w-16 rounded" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
