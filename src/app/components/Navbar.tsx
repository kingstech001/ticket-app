"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react"; // Import the arrow icon

const Navbar = () => {
  return (
    <nav className=" p-4 font-[Jejumyeongjo] ">
      <div className="container mx-auto flex justify-between items-center max-w-[1200px] border-[1px] border-[#197686] px-[16px] py-[12px] rounded-[24px] bg-[#05252C]">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/image/logo.png"
              alt="Logo"
              width={120}
              height={40}
              priority
            />
          </Link>
        </div>

        {/* Nav List */}
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <li>
            <Link href="/events" className=" text-[#FFFFFF]">Events</Link>
          </li>
          <li>
            <Link href="/myTickets" className="text-[#B3B3B3]">My Tickets</Link>
          </li>
          <li>
            <Link href="/about" className=" text-[#B3B3B3]">About Project</Link>
          </li>
        </ul>

        <button className="group bg-white text-[#0A0C11] px-4 py-2 rounded-[12px] flex items-center gap-2 hover:bg-[#24A0B5] hover:text-[#D9D9D9]">
          My Tickets
          <span className="transition-transform duration-300 group-hover:-rotate-45">
            <ArrowRight size={18} />
          </span>
        </button>

      </div>
    </nav>
  );
};

export default Navbar;
