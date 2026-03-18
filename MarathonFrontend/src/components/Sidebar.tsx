import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  LayoutDashboard, 
  Trophy, 
  ClipboardList, 
  CreditCard, 
  LogOut,
  ChevronRight,
  Users,
  Settings,
  ShieldCheck,
  User
} from 'lucide-react';
import { logout } from '../app/slices/authSlice';
import type { AppDispatch, RootState } from '../app/store';

const Sidebar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  // Get user role from Redux
  const { user } = useSelector((state: RootState) => state.auth);
  const isAdmin = user?.role === 'admin';

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // Define navigation based on role
  const athleteItems = [
    { name: 'Dashboard', path: '/athlete/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Marathons', path: '/athlete/marathons', icon: <Trophy size={20} /> },
    { name: 'My Registrations', path: '/athlete/registrations', icon: <ClipboardList size={20} /> },
    { name: 'Payments', path: '/athlete/payments', icon: <CreditCard size={20} /> },
  ];

  const adminItems = [
    { name: 'Overview', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Manage Marathons', path: '/admin/marathons', icon: <Trophy size={20} /> },
    { name: 'Registrations', path: '/admin/registrations', icon: <Users size={20} /> },
    { name: 'Financials', path: '/admin/payments', icon: <CreditCard size={20} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  const navItems = isAdmin ? adminItems : athleteItems;
  const themeColor = isAdmin ? 'indigo' : 'blue';

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col sticky top-0 z-50">
      {/* Logo Section */}
      <div className="p-6 mb-2">
        <div className="flex items-center gap-3 px-2">
          <div className={`w-9 h-9 flex items-center justify-center text-white font-black rounded-xl shadow-lg shadow-${themeColor}-100 bg-${isAdmin ? 'indigo-600' : 'blue-600'}`}>
            {isAdmin ? 'A' : 'M'}
          </div>
          <span className="text-xl font-black text-gray-900 tracking-tight italic">
            RUN<span className={isAdmin ? 'text-indigo-600' : 'text-blue-600'}>SYS</span>
          </span>
        </div>
      </div>

      {/* Role Badge */}
      <div className="px-6 mb-6">
        <div className={`flex items-center gap-2 px-3 py-2 rounded-2xl border ${
          isAdmin ? 'bg-indigo-50 border-indigo-100 text-indigo-700' : 'bg-blue-50 border-blue-100 text-blue-700'
        }`}>
          {isAdmin ? <ShieldCheck size={14} /> : <User size={14} />}
          <span className="text-[10px] font-black uppercase tracking-widest leading-none">
            {user?.role} Portal
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200 group ${
                isActive 
                  ? isAdmin ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'bg-blue-50 text-blue-600 shadow-sm'
                  : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <div className="flex items-center gap-3">
              <span className="transition-transform duration-200 group-hover:scale-110">
                {item.icon}
              </span>
              <span className="font-bold text-sm tracking-tight">{item.name}</span>
            </div>
            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all translate-x-[-4px] group-hover:translate-x-0" />
          </NavLink>
        ))}
      </nav>

      {/* Bottom User Info & Logout */}
      <div className="p-4 border-t border-gray-50 bg-gray-50/30">
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${isAdmin ? 'bg-indigo-600' : 'bg-blue-600'}`}>
            {user?.first_name?.[0]}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-gray-900 truncate">{user?.first_name} {user?.last_name}</p>
            <p className="text-[10px] text-gray-400 font-medium truncate">{user?.email}</p>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all font-bold text-sm"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;