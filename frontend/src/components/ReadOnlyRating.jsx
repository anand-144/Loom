import { FaStar, FaRegStar } from "react-icons/fa";

const ReadOnlyRating = ({ averageRating, reviewCount }) => {
  const roundedRating = Math.round(averageRating);
  return (
    <div className="flex items-center space-x-2">
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <span key={index}>
            {index < roundedRating ? (
              <FaStar className="w-5 h-5 text-yellow-400" />
            ) : (
              <FaRegStar className="w-5 h-5 text-yellow-400" />
            )}
          </span>
        ))}
      </div>
      <span className="text-sm text-gray-500">
        ({averageRating.toFixed(1)} out of 5, {reviewCount} reviews)
      </span>
    </div>
  );
};

export default ReadOnlyRating;
