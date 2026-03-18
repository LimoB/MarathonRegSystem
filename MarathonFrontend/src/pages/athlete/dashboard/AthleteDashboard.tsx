import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import { 
  Trophy, 
  Calendar, 
  Activity, 
  CreditCard, 
  ArrowUpRight,
  MapPin
} from 'lucide-react';

const AthleteDashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="p-6 space-y-8">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.first_name || 'Runner'}! 🏃‍♂️
          </h1>
          <p className="text-gray-500">Ready for your next big race?</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-100">
          <Calendar size={18} />
          Explore Marathons
        </button>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<Trophy className="text-amber-500" />} 
          label="Total Races" 
          value="12" 
          trend="+2 this year"
        />
        <StatCard 
          icon={<Activity className="text-emerald-500" />} 
          label="KM Covered" 
          value="245.8" 
          trend="Top 5% of runners"
        />
        <StatCard 
          icon={<Calendar className="text-blue-500" />} 
          label="Upcoming" 
          value="2" 
          trend="Next: Oct 24"
        />
        <StatCard 
          icon={<CreditCard className="text-purple-500" />} 
          label="Pending Pymts" 
          value="0" 
          trend="All clear!"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Registrations Table/List */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-800">My Recent Registrations</h3>
            <button className="text-blue-600 text-sm font-semibold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-400 text-xs uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4">Marathon</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <RegistrationRow 
                  name="Nairobi City Marathon" 
                  location="Nairobi, KE"
                  date="Oct 24, 2026" 
                  status="Confirmed"
                />
                <RegistrationRow 
                  name="Boston Qualifier" 
                  location="Boston, MA"
                  date="Nov 12, 2026" 
                  status="Pending"
                />
              </tbody>
            </table>
          </div>
        </div>

        {/* Profile/Goal Card */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Training Goal</h3>
            <p className="text-blue-100 text-sm mb-6">You are 80% through your monthly target!</p>
            
            <div className="w-full bg-white/20 rounded-full h-3 mb-6">
              <div className="bg-white h-3 rounded-full" style={{ width: '80%' }}></div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg"><MapPin size={16}/></div>
                <span className="text-sm">Target: 300km / Month</span>
              </div>
            </div>
          </div>
          {/* Decorative circle */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

/* --- Sub-Components for Cleanliness --- */

const StatCard = ({ icon, label, value, trend }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 bg-gray-50 rounded-xl">{icon}</div>
      <span className="text-sm font-medium text-gray-500">{label}</span>
    </div>
    <div className="flex items-end justify-between">
      <h4 className="text-2xl font-bold text-gray-900">{value}</h4>
      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
        {trend}
      </span>
    </div>
  </div>
);

const RegistrationRow = ({ name, location, date, status }: any) => (
  <tr className="hover:bg-gray-50 transition-colors">
    <td className="px-6 py-4">
      <div className="font-semibold text-gray-900">{name}</div>
      <div className="text-xs text-gray-400">{location}</div>
    </td>
    <td className="px-6 py-4 text-sm text-gray-600">{date}</td>
    <td className="px-6 py-4">
      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
        status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
      }`}>
        {status}
      </span>
    </td>
    <td className="px-6 py-4">
      <button className="text-gray-400 hover:text-blue-600 transition-colors">
        <ArrowUpRight size={18} />
      </button>
    </td>
  </tr>
);

export default AthleteDashboard;