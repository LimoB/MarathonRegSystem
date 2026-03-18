import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { Bell, Search } from 'lucide-react';

const DashboardLayout: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Fixed Width */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10">
          {/* Search Bar */}
          <div className="relative w-96 hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search races, payments..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all outline-none text-sm"
            />
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-5">
            <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-colors relative">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="h-8 w-px bg-gray-100 mx-2"></div>

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900 leading-tight">
                  {user?.first_name} {user?.last_name}
                </p>
                <p className="text-xs text-blue-600 font-medium capitalize">{user?.role}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-xl flex items-center justify-center text-white font-bold shadow-md shadow-blue-100">
                {user?.first_name?.[0]}
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet /> {/* This is where AthleteDashboard, Marathons, etc. will render */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;