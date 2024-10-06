import React from 'react';
import { RiExchangeFundsLine, RiSecurePaymentLine, RiTimeLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Exchange = () => {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Exchange Policy</h1>
      <p className="text-gray-700 text-center mb-10">
        Our exchange policy is designed to offer you a smooth and hassle-free experience.
      </p>

      <div className="space-y-8">
        {/* Requirement 1 */}
        <div className="flex items-center gap-4">
          <RiTimeLine className="w-8 h-8 text-gray-700" />
          <div>
            <h2 className="text-lg font-semibold">30-Day Exchange Window</h2>
            <p className="text-gray-600">
              Items can be exchanged within 30 days of purchase, provided they are in original condition.
            </p>
          </div>
        </div>

        {/* Requirement 2 */}
        <div className="flex items-center gap-4">
          <RiSecurePaymentLine className="w-8 h-8 text-gray-700" />
          <div>
            <h2 className="text-lg font-semibold">Proof of Purchase Required</h2>
            <p className="text-gray-600">
              Please provide your receipt or order confirmation to process the exchange.
            </p>
          </div>
        </div>

        {/* Requirement 3 */}
        <div className="flex items-center gap-4">
          <RiExchangeFundsLine className="w-8 h-8 text-gray-700" />
          <div>
            <h2 className="text-lg font-semibold">Same Value Exchanges</h2>
            <p className="text-gray-600">
              Items can only be exchanged for products of equal or lesser value. Any price differences must be covered.
            </p>
          </div>
        </div>
      </div>

      {/* Redirect to Contact Page for Exchange Queries */}
      <div className="mt-10 text-center">
        <p className="text-gray-700">
          For any exchange requests or queries, please visit our <Link to="/contact" className="text-blue-500 underline">Contact Page</Link> to submit your request.
        </p>
      </div>
    </div>
  );
};

export default Exchange;
