import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";

const DiscountBanner = () => {
  const { discount } = useContext(ShopContext);

  // If discount is not active, do not render the banner.
  if (!discount?.active) return null;

  // Format the end date to remove the time portion.
  const formattedEndDate = discount?.endDate ? discount.endDate.split("T")[0] : "";

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-gray-700 via-black to-gray-700 text-slate-200 py-2 px-4">
      {/* Clickable overlay linking to /collections */}
      <Link to="/collections" className="absolute inset-0 z-50" />

      {/* Scrolling text container using react-fast-marquee */}
      <div className="w-full overflow-hidden px-4">
        <Marquee gradient={false} speed={30} pauseOnHover={true}>
          <span className="text-xs sm:text-sm md:text-base lg:text-md font-medium flex items-center gap-2">
            Special Offer: Get {discount.discountPercentage}% off on all products! Shop Now! Till {formattedEndDate}
          </span>
        </Marquee>
      </div>
    </div>
  );
};

export default DiscountBanner;
