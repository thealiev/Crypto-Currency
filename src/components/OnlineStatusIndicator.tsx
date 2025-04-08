import useOnlineStatus from "../hooks/useOnlineStatus";

const OnlineStatusIndicator = () => {
  const isOnline = useOnlineStatus();

  return (
    <div className="mb-4">
      {isOnline ? (
        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
          🟢 Online
        </span>
      ) : (
        <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-medium">
          🔴 Offline
        </span>
      )}
    </div>
  );
};

export default OnlineStatusIndicator;
