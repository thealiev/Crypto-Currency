const SkeletonCryptoList = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 7 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse flex items-center justify-between p-4 mb-2 bg-gray-200 dark:bg-gray-600 rounded-lg"
        >
          <div className="h-6 w-24 bg-gray-300 dark:bg-gray-500 rounded"></div>
          <div className="h-6 w-12 bg-gray-300 dark:bg-gray-500 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonCryptoList;
