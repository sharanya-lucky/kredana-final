import React from "react";
import { Download } from "lucide-react";

const PaymentOverview = () => {
  return (
   <div className="bg-white min-h-screen p-3 sm:p-5 md:p-6 lg:p-8">

      {/* Header */}
    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6 md:mb-8">
       <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Payment Overview</h1>

       <button className="bg-orange-500 hover:bg-orange-600 text-black font-semibold px-4 sm:px-5 py-2 rounded-md flex items-center justify-center gap-2 w-full sm:w-auto">
          <Download size={18} />
          Download Receipt
        </button>
      </div>

      {/* Cards Section */}
     <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">

        {/* Customer Card 1 */}
        <div className="bg-white border border-orange-400 rounded-lg">

          {/* Top Section */}
          <div className="p-5 border-b border-orange-300">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">
                  Customer 01 : Shashank Reddy
                </h3>
                <p className="text-xs text-gray-500">
                  Category - Sub Category
                </p>
              </div>
              <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
            </div>

            <div className="mt-6">
              <p className="text-sm text-gray-600">Due Amount</p>
           <p className="text-red-500 font-semibold text-base sm:text-lg">
                ₹50,000
              </p>
              <p className="text-xs text-gray-500 mt-1">
                To be paid : 05th Mar, 2026
              </p>
            </div>
          </div>

          {/* Payment History */}
          <div className="p-5 border-b border-orange-300">
            <h4 className="font-semibold mb-3">Payment History</h4>

           <div className="flex justify-between text-xs sm:text-sm">
              <div>
                <p className="font-medium">05th Feb</p>
                <p className="text-gray-500 text-xs">Fees Paid</p>
              </div>
              <p className="font-medium">₹50,000</p>
            </div>
          </div>

          {/* Bottom Summary */}
          <div className="p-5 text-sm font-medium">
            <div className="flex justify-between  mb-2">
              <p>Fees Paid</p>
              <p>₹50,000</p>
            </div>
            <div className="flex justify-between">
              <p>Pending Fees</p>
              <p>₹50,000</p>
            </div>
          </div>
        </div>


        {/* Customer Card 2 */}
        <div className="bg-white border border-orange-400 rounded-lg">

          {/* Top Section */}
          <div className="p-5 border-b border-orange-300">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">
                  Customer 02 : Name
                </h3>
                <p className="text-xs text-gray-500">
                  Category - Sub Category
                </p>
              </div>
              <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
            </div>

            <div className="mt-6">
              <p className="text-sm text-gray-600">Due Amount</p>
          <p className="text-red-500 font-semibold text-base sm:text-lg">
                ₹50,000
              </p>
              <p className="text-xs text-gray-500 mt-1">
                To be paid : 05th Mar, 2026
              </p>
            </div>
          </div>

          {/* Payment History */}
          <div className="p-5 border-b border-orange-300">
            <h4 className="font-semibold mb-3">Payment History</h4>

           <div className="flex justify-between text-xs sm:text-sm">
              <div>
                <p className="font-medium">05th Feb</p>
                <p className="text-gray-500 text-xs">Fees Paid</p>
              </div>
              <p className="font-medium">₹50,000</p>
            </div>
          </div>

          {/* Bottom Summary */}
          <div className="p-5 text-sm font-medium">
            <div className="flex justify-between mb-2">
              <p>Fees Paid</p>
              <p>₹50,000</p>
            </div>
            <div className="flex justify-between">
              <p>Pending Fees</p>
              <p>₹50,000</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default PaymentOverview;