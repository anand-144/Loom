import { RiCustomerService2Line, RiExchangeLine, RiShieldCheckLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const OurPolicy = () => {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          {/* Quality */}
          <div className="flex flex-col items-center text-center group">
            <div className="mb-6 p-4 bg-white rounded-full shadow-md transform transition-transform duration-300 group-hover:scale-110">
              <RiShieldCheckLine className="w-8 h-8 text-gray-900" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Top Notch Quality</h3>
            <p className="text-gray-600 max-w-xs leading-relaxed">
              Experience unmatched quality, precision, and excellence in every product we offer.
            </p>
          </div>

          {/* Exchange Policy */}
          <div className="flex flex-col items-center text-center group">
            <div className="mb-6 p-4 bg-white rounded-full shadow-md transform transition-transform duration-300 group-hover:scale-110">
              <RiExchangeLine className="w-8 h-8 text-[#ffb187]" />
            </div>
            <Link 
              to='/exchange' 
              className="text-lg font-semibold text-[#ffb187] mb-2 hover:underline decoration-2 underline-offset-4"
            >
              Easy Exchange Policy
            </Link>
            <p className="text-gray-600 max-w-xs leading-relaxed">
              Shop with confidence knowing we offer a hassle-free exchange policy for your peace of mind.
            </p>
          </div>

          {/* Customer Support */}
          <div className="flex flex-col items-center text-center group">
            <div className="mb-6 p-4 bg-white rounded-full shadow-md transform transition-transform duration-300 group-hover:scale-110">
              <RiCustomerService2Line className="w-8 h-8 text-gray-900" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Best Customer Support</h3>
            <p className="text-gray-600 max-w-xs leading-relaxed">
              Our dedicated support team is here to ensure your complete satisfaction, every step of the way.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurPolicy;