import React from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-center px-8  py-4 z-[9999] fixed top-0 left-0 right-0 w-full backdrop-blur-md bg-white/70 border-b border-gray-200/50" >
      <div className="flex items-center justify-between max-w-7xl w-full">

     
      {/* Logo */}
      <Image
        src="/logo2.svg"
        alt="Logo"
        width={40}
        height={40}
        className="h-10 w-auto"
      />
      
      {/* Navigation Links */}
      <div className="flex items-center space-x-8">
        <Link
          href="/"
          className="px-4 py-2 bg-orange-100 text-[#FB5711] rounded-md font-medium hover:bg-orange-200 transition-colors"
        >
          Home
        </Link>
        <Link
          href="/documentation"
          className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
        >
          Documentation
        </Link>
        <Link
          href="/pricing"
          className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
        >
          Pricing
        </Link>
      </div>
      <div>
        <Link
          href="/auth/login"
          className="px-6 py-2 bg-[#FB5711] text-white rounded-md font-medium hover:opacity-90 transition-colors"
        >
          Login
        </Link>
      </div>
       </div>
    </nav>
  );
};

export default Navbar;