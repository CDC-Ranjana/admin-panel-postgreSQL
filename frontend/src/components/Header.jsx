import React, { useState, useEffect, useRef } from 'react';
import { FaBell, FaEnvelope, FaCog, FaUser, FaEnvelopeOpenText, FaSignOutAlt } from 'react-icons/fa';
import { GiHamburgerMenu } from "react-icons/gi";

const Header = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="flex items-center justify-between p-2 bg-white border-b">
      <div className="flex items-center space-x-3">
        <button onClick={toggleSidebar} className="text-xl">
          <GiHamburgerMenu className='text-2xl'/>
        </button>
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-lg px-3 py-1 border-gray-300 outline-none h-10 w-96"
        />
      </div>
      <div className="flex items-center relative pr-12" ref={dropdownRef}>
        <div className="flex items-center cursor-pointer" onClick={handleDropdownToggle}>
          <img src="https://colorlib.com/polygon/adminator/assets/static/images/logo.png" alt="User Avatar" className="w-14 h-14 rounded-full" />
          <div className='flex flex-col items-center'>
            <p className="text-[16px]">John Doe</p>
            <p className="text-[14px]">Super Admin</p>
          </div>
          
        </div>

        {isDropdownOpen && (
          <div className="absolute right-0 top-12 mt-2 w-48 bg-white border shadow-lg">
            <a href="#" className="flex items-center px-4 pl-12 py-2 hover:bg-gray-100">
              <FaCog className="mr-2 text-blue-300" /> Setting
            </a>
            <a href="#" className="flex items-center px-4 pl-12  py-2 hover:bg-gray-100">
              <FaUser className="mr-2 text-cyan-300" /> Profile
            </a>
            <a href="#" className="flex items-center px-4  pl-12 py-2 hover:bg-gray-100">
              <FaEnvelopeOpenText className="mr-2 text-purple-300" /> Messages
            </a>
            <a href="#" className="flex items-center px-4 pl-12  py-2 hover:bg-gray-100">
              <FaSignOutAlt className="mr-2 text-red-300" /> Logout
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
