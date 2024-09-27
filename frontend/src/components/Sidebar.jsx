import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaEnvelope, FaCalendar, FaChartBar, FaPen, FaTable, FaMap } from 'react-icons/fa';

const Sidebar = ({ isCollapsed }) => {
  return (
    <div className={`h-screen bg-white border transition-width duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className={`p-4 flex items-center space-x-2 ${isCollapsed ? 'justify-center' : ''}`}>
        <img
          src="https://colorlib.com/polygon/adminator/assets/static/images/logo.png"
          alt="Logo"
          className="w-12 h-12"
        />
        {!isCollapsed && <span className="text-xl font-bold">Adminator</span>}
      </div>
      <nav className="mt-10">
        <ul className="space-y-2">
          <li>
            <Link to="/" className="flex items-center p-2 text-gray-700 hover:bg-gray-100">
              <FaHome className="text-xl ml-4 text-red-300" />
              {!isCollapsed && <span className="ml-4">Admin</span>}
            </Link>
          </li>
          <li>
            <Link to="/recent-activities" className="flex items-center p-2 text-gray-700 hover:bg-gray-100">
              <FaPen className="text-xl text-blue-300 ml-4" />
              {!isCollapsed && <span className="ml-4">Stories</span>}
            </Link>
          </li>
          <li>
            <Link to="/all-activities" className="flex items-center p-2 text-gray-700 hover:bg-gray-100">
              <FaChartBar className="text-xl text-pink-300 ml-4" />
              {!isCollapsed && <span className="ml-4">All Activities</span>}
            </Link>
          </li>
          <li>
            <Link to="/bulletine" className="flex items-center p-2 text-gray-700 hover:bg-gray-100">
              <FaTable className="text-lg ml-4" />
              {!isCollapsed && <span className="ml-4">Bulletins</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
