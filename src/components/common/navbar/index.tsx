"use client"; // Ensure the component is client-side
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const pathname = usePathname(); // Get the current path

  return (
    <nav className={`fixed top-0 left-0 w-full flex justify-between items-center p-4 text-white z-10 bg-white/30 backdrop-blur-md rounded-b-lg shadow-lg ${pathname === "/buy" ? "" : ""}`}>
      {/* Mobile View */}
      <div className="flex md:hidden justify-around text-2xl items-center w-full"
      >
        <Link
          href="/"
          className={`mr-4 ${pathname === "/" ? "underline" : ""}`}
        >
          Buy
        </Link>
        <Link
          href="/sale"
          className={`${pathname === "/sale" ? "underline" : ""}`}
        >
          Sale
        </Link>
      </div>

      {/* Web View */}
      <div className="hidden md:flex justify-between w-full">
        <div className="text-lg">Hello World</div>
        <div>
          <Link
            href="/"
            className={`mr-4 ${pathname === "/" ? "underline" : ""}`}
          >
            Buy
          </Link>
          <Link
            href="/sale"
            className={`${pathname === "/sale" ? "underline" : ""}`}
          >
            Sale
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
