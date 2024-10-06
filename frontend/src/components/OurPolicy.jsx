import { RiExchangeFundsLine, RiCheckDoubleLine , RiHeadphoneLine} from "react-icons/ri";
import { Link } from "react-router-dom";

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">

      <div>
      <RiCheckDoubleLine className="w-12 h-8 m-auto mb-5" />
        <p className="font-semibold text-gray-700 ">Top Notch Quality</p>
        <p className="text-gray-400">Unmatched quality, precision, and excellence</p>
      </div>

      <div>
        <RiExchangeFundsLine className="w-12 h-8  m-auto mb-5" />
        <Link to='/exchange' className="font-semibold text-[#ffb187] hover:underline">
          Easy Exchange Policy
        </Link>
        <p className=" text-gray-400">We offer a hassle-free exchange policy.</p>
      </div>

      <div>
        <RiHeadphoneLine className="w-12 h-8  m-auto mb-5" />
        <p className="font-semibold text-gray-700">Best Customer Support</p>
        <p className="text-gray-400">Dedicated support, ensuring your satisfaction.</p>
      </div>

    </div>
  );
};

export default OurPolicy;
