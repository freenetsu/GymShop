import Link from "next/link";
import React from "react";

const BlackFridayBanner: React.FC = () => {
  return (
    <div className="relative w-full h-[400px] bg-gradient-to-br from-black to-gray-800 overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-50%] left-[-10%] w-[70%] h-[140%] bg-gray-700 rounded-full opacity-10 transform rotate-12"></div>
        <div className="absolute bottom-[-30%] right-[-5%] w-[60%] h-[120%] bg-gray-600 rounded-full opacity-10 transform -rotate-12"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-6xl font-bold mb-8 text-center">
          BLACK FRIDAY <span className="text-gray-300">IS HERE</span>
        </h1>

        <div className="flex space-x-4">
          <button className="px-8 py-3 bg-black text-white border-2 border-white font-semibold rounded-full hover:bg-white hover:text-black transition duration-300">
            <Link href="/Dress">Vêtements</Link>
          </button>
          <button className="px-8 py-3 bg-black text-white border-2 border-white font-semibold rounded-full hover:bg-white hover:text-black transition duration-300">
            <Link href="/Accessory">Accessoires</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlackFridayBanner;
