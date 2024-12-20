"use client"; // Ensure the component is client-side
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const pathname = usePathname(); // Get the current path

  return (
    <nav className={`fixed top-0 left-0 w-full flex justify-between items-center p-4 text-white z-10 ${pathname === "/buy" ? "bg-blue-500" : "bg-green-500"}`}>
      {/* Mobile View */}
      <div className="flex md:hidden justify-around text-2xl items-center w-full"
      >
        <Link
          href="/buy"
          className={`mr-4 ${pathname === "/buy" ? "underline" : ""}`}
        >
          Buy
        </Link>
        <Link
          href="/sell"
          className={`${pathname === "/sell" ? "underline" : ""}`}
        >
          Sell
        </Link>
      </div>

      {/* Web View */}
      <div className="hidden md:flex justify-between w-full">
        <div className="text-lg">Hello World</div>
        <div>
          <Link
            href="/buy"
            className={`mr-4 ${pathname === "/buy" ? "underline" : ""}`}
          >
            Buy
          </Link>
          <Link
            href="/sell"
            className={`${pathname === "/sell" ? "underline" : ""}`}
          >
            Sell
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
