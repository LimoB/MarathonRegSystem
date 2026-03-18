import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { 
  Users, 
  Search, 
  CheckCircle2, 
  Clock, 
  Download,
  Mail,
  UserCheck,
  Hash
} from 'lucide-react';
import type { AppDispatch, RootState } from '../../../app/store';
import { fetchRegistrations } from '../../../app/slices/registrationSlice';

const Registrations: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { registrations, loading, error } = useSelector((state: RootState) => state.registrations);

  useEffect(() => {
    dispatch(fetchRegistrations());
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <div className="p-6 md:p-10 space-y-8 animate-in fade-in duration-700">
      
      {/* Header & Export */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Athlete <span className="text-indigo-600">Registrations</span>
          </h1>
          <p className="text-gray-500 font-medium">Review entries, bib assignments, and payment verification.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-white border-2 border-gray-100 hover:border-indigo-600 hover:text-indigo-600 px-6 py-3 rounded-2xl font-bold transition-all shadow-sm active:scale-95">
          <Download size={18} /> Export CSV
        </button>
      </div>

      {/* Stats Summary Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-600 p-6 rounded-[2rem] text-white shadow-xl shadow-indigo-100 flex items-center gap-5">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
            <Users size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-indigo-100 uppercase tracking-widest">Total Entries</p>
            <h3 className="text-2xl font-black">{registrations.length}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
            <UserCheck size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Confirmed</p>
            <h3 className="text-2xl font-black text-gray-900">
              {registrations.filter(r => r.payment_status === 'completed').length}
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pending Payment</p>
            <h3 className="text-2xl font-black text-gray-900">
              {registrations.filter(r => r.payment_status === 'pending').length}
            </h3>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Search by athlete name, email, or marathon..."
          className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-[1.5rem] text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
        />
      </div>

      {/* Registrations Table */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 text-[10px] uppercase font-black text-gray-400 tracking-[0.2em]">
              <tr>
                <th className="px-8 py-6">Athlete</th>
                <th className="px-8 py-6">Event & Category</th>
                <th className="px-8 py-6">Registration ID</th>
                <th className="px-8 py-6">Payment Status</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {registrations.map((reg) => (
                <tr key={reg.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold text-xs border border-gray-200">
                        {reg.user?.first_name?.[0]}{reg.user?.last_name?.[0]}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{reg.user?.first_name} {reg.user?.last_name}</p>
                        <p className="text-[10px] text-gray-400 font-medium flex items-center gap-1 uppercase">
                          <Mail size={10} /> {reg.user?.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-bold text-gray-800">{reg.marathon?.name}</p>
                    <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase mt-1 inline-block">
                      {reg.category}
                    </span>
                  </td>
                  <td className="px-8 py-6 font-mono text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Hash size={12} /> REG-{reg.id.toString().padStart(5, '0')}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className={`flex items-center gap-1.5 text-[10px] font-black uppercase px-3 py-1.5 rounded-full w-fit ${
                      reg.payment_status === 'completed' 
                      ? 'bg-emerald-50 text-emerald-600' 
                      : 'bg-amber-50 text-amber-500'
                    }`}>
                      {reg.payment_status === 'completed' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                      {reg.payment_status}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="text-xs font-black text-gray-400 hover:text-indigo-600 uppercase tracking-widest transition-colors">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {loading && (
            <div className="py-20 flex flex-col items-center justify-center space-y-4">
              <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Loading Entries...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Registrations;