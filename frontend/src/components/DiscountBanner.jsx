import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { motion } from "framer-motion";
import { BsFillBagHeartFill } from "react-icons/bs";
import { LuPartyPopper } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const DiscountBanner = () => {
  const { discount } = useContext(ShopContext);

  if (!discount?.active) return null;

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-gray-700 via-black to-gray-700 text-slate-200 py-2 px-4">
      {/* Background shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-white opacity-10"
        animate={{ x: ["0%", "100%", "0%"] }}
        transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
      />  
      {/* Main content container */}
      <div className="relative flex items-center justify-center">
        {/* Left star (positioned absolutely) */}
        <div className="hidden sm:block absolute left-0 top-1/2 transform -translate-y-1/2 pl-2">
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 7, repeat: Infinity }}
          >
          </motion.div>
        </div>

        {/* Scrolling text container with horizontal padding */}
        <div className="w-full overflow-hidden px-12">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "-100%" }}
            transition={{
              duration: 30, // Slower animation
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="flex items-center whitespace-nowrap"
          >
            <span className="text-xs sm:text-sm md:text-base lg:text-md font-medium flex items-center gap-2">
              <LuPartyPopper className="inline-block w-4 h-4 md:w-5 md:h-5 text-gray-400" />
              <Link to="/collections" className="absolute inset-0 z-50" />Special Offer: Get {discount.discountPercentage}% off on all products! Shop Now!
              <BsFillBagHeartFill className="inline-block w-4 h-4 md:w-5 md:h-5 text-gray-400" />
            </span>
          </motion.div>
        </div>

        {/* Right star (positioned absolutely) */}
        <div className="hidden sm:block absolute right-0 top-1/2 transform -translate-y-1/2 pr-2">
          <motion.div
            animate={{ rotate: -360, scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
          </motion.div>
        </div>
      </div>

      {/* Mobile-only static version for very small screens */}
      <div className="sm:hidden text-center">
      </div>
    </div>
  );
};

export default DiscountBanner;
