import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Users, 
  Trophy, 
  DollarSign, 
  Activity, 
  Plus, 
  ArrowUpRight, 
  MoreHorizontal,
  Calendar,
  UsersRound
} from 'lucide-react';
import type { AppDispatch, RootState } from '../../../app/store';
import { fetchMarathons } from '../../../app/slices/marathonSlice';
import { fetchRegistrations } from '../../../app/slices/registrationSlice';
import { fetchPayments } from '../../../app/slices/paymentSlice';

const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  // Pulling data from all slices for a bird's eye view
  const { marathons } = useSelector((state: RootState) => state.marathons);
  const { registrations } = useSelector((state: RootState) => state.registrations);
  const { payments } = useSelector((state: RootState) => state.payments);

  useEffect(() => {
    dispatch(fetchMarathons());
    dispatch(fetchRegistrations());
    dispatch(fetchPayments());
  }, [dispatch]);

  // Calculate some quick stats
  const totalRevenue = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="p-6 md:p-8 space-y-8 animate-in fade-in duration-700">
      {/* Header & Quick Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            System <span className="text-blue-600">Overview</span>
          </h1>
          <p className="text-gray-500 font-medium">Monitoring marathon performance and athlete engagement.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-xl shadow-gray-200 active:scale-95">
          <Plus size={20} />
          Create New Marathon
        </button>
      </div>

      {/* High-Level Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdminStatCard 
          label="Total Revenue" 
          value={`$${totalRevenue.toLocaleString()}`} 
          icon={<DollarSign size={24} />} 
          color="bg-emerald-500"
          trend="+12.5% from last month"
        />
        <AdminStatCard 
          label="Total Athletes" 
          value={registrations.length.toString()} 
          icon={<Users size={24} />} 
          color="bg-blue-500"
          trend="84 new signups"
        />
        <AdminStatCard 
          label="Active Races" 
          value={marathons.length.toString()} 
          icon={<Trophy size={24} />} 
          color="bg-amber-500"
          trend="3 closing soon"
        />
        <AdminStatCard 
          label="System Health" 
          value="99.9%" 
          icon={<Activity size={24} />} 
          color="bg-indigo-500"
          trend="All systems nominal"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Marathons Table */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center">
            <h3 className="text-xl font-black text-gray-900">Manage Marathons</h3>
            <button className="text-blue-600 font-bold text-sm hover:underline flex items-center gap-1">
              View All <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50 text-[10px] uppercase font-black text-gray-400 tracking-widest">
                <tr>
                  <th className="px-8 py-4">Event Name</th>
                  <th className="px-8 py-4">Participants</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {marathons.slice(0, 5).map((marathon) => (
                  <tr key={marathon.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{marathon.name}</p>
                      <p className="text-xs text-gray-400 font-medium">{marathon.location}</p>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <UsersRound size={16} className="text-gray-400" />
                        <span className="text-sm font-bold text-gray-700">245</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-full uppercase">
                        Active
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar: Recent Activity Feed */}
        <div className="space-y-6">
          <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
              <div className="space-y-6">
                <ActivityItem 
                  title="New Registration" 
                  desc="James K. joined Nairobi City Marathon" 
                  time="2 mins ago" 
                />
                <ActivityItem 
                  title="Payment Received" 
                  desc="$50.00 from Sarah W." 
                  time="15 mins ago" 
                />
                <ActivityItem 
                  title="Marathon Created" 
                  desc="Boston Qualifier added to system" 
                  time="1 hour ago" 
                />
              </div>
              <button className="w-full mt-8 py-3 bg-white/10 hover:bg-white/20 rounded-2xl text-sm font-bold transition-all border border-white/10">
                View Full Audit Log
              </button>
            </div>
            {/* Background Glow */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px]"></div>
          </div>

          {/* Quick Insights Card */}
          <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white shadow-xl">
            <Calendar className="mb-4 opacity-60" size={32} />
            <h4 className="text-lg font-bold">Upcoming Deadlines</h4>
            <p className="text-blue-100 text-sm mt-2 font-medium italic">
              "Registration for Nairobi City Marathon closes in 48 hours. Send reminder email?"
            </p>
            <button className="mt-6 text-xs font-black uppercase tracking-widest bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-all">
              Send Alert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- Sub-Components --- */

const AdminStatCard = ({ label, value, icon, color, trend }: any) => (
  <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
    <div className="flex items-start justify-between">
      <div className={`p-4 rounded-2xl text-white shadow-lg ${color}`}>
        {icon}
      </div>
      <div className="text-right">
        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{label}</p>
        <h4 className="text-2xl font-black text-gray-900 mt-1">{value}</h4>
      </div>
    </div>
    <div className="mt-6 pt-4 border-t border-gray-50">
      <p className="text-[11px] font-bold text-emerald-600 italic">{trend}</p>
    </div>
  </div>
);

const ActivityItem = ({ title, desc, time }: any) => (
  <div className="flex gap-4">
    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 shrink-0 shadow-[0_0_10px_rgba(96,165,250,0.8)]"></div>
    <div>
      <p className="text-sm font-bold text-white">{title}</p>
      <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
      <p className="text-[10px] text-gray-500 mt-1 uppercase font-black">{time}</p>
    </div>
  </div>
);

export default AdminDashboard;