"use client"
import React, { useState } from "react";
import MenuItem from "./MenuItem";
import { FaHome, FaInfo, FaQuestionCircle, FaSearch } from "react-icons/fa";
import Link from "next/link";
import DarkMode from "./DarkMode";
import Filter from "./Filter";
import Combined from "./Combined";
import Search from "./Search";

const Header = ({ onFilterChange }) => {
  return (
    <div className="flex justify-between mx-2 max-w-5xl sm:mx-auto items-center py-6">
      <div className="flex">
        <MenuItem title={"HOME"} address={"/"} Icon={FaHome} />
        <MenuItem title={"About"} address={"/about"} Icon={FaInfo} />
        <MenuItem title={"Recommendation"} address={"/recommendation"} Icon={FaQuestionCircle} />
      </div>
      <div className="flex items-center space-x-5">
        
        <Search/>
        <DarkMode />
        <Link href="/">
          <h2 className="text-2xl">
            <span className="font-bold bg-amber-500 py-1 px-2 rounded-lg">
              IMDb
            </span>
            <span className="text-xl hidden sm:inline">Clone</span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Header;
