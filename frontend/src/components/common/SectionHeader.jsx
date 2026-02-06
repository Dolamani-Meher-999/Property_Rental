const SectionHeader = ({ title, count, right }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold text-gray-900">
        {title}
        {count !== undefined && (
          <span className="text-orange-600 ml-2">• {count}</span>
        )}
      </h2>
      {right}
    </div>
  );
};

export default SectionHeader;
