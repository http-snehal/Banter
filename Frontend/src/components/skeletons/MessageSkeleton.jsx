const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`flex items-end gap-2 ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}
        >
          {idx % 2 === 0 && (
            <div className="skeleton size-7 rounded-full flex-shrink-0" />
          )}
          <div className={`flex flex-col ${idx % 2 === 0 ? "items-start" : "items-end"}`}>
            <div className="skeleton h-14 w-[180px] rounded-2xl" />
            <div className="skeleton h-2.5 w-12 rounded mt-1.5" />
          </div>
          {idx % 2 !== 0 && (
            <div className="skeleton size-7 rounded-full flex-shrink-0" />
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
