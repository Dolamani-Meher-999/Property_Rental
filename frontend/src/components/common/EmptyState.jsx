import { FaHome } from "react-icons/fa";

const EmptyState = ({ title, subtitle, action }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-xl py-16 text-center">
      <FaHome className="mx-auto text-gray-300 text-4xl mb-4" />
      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-4">{subtitle}</p>
      {action}
    </div>
  );
};

export default EmptyState;
