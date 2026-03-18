import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { 
  ClipboardList, 
  MapPin, 
  Calendar, 
  Clock, 
  BadgeCheck, 
  ArrowRight,
  Receipt,
  Trophy,
  AlertCircle
} from 'lucide-react';
import type { AppDispatch, RootState } from '../../../app/store';
import { fetchMyRegistrations } from '../../../app/slices/registrationSlice';

const MyRegistrations: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { myRegistrations, loading, error } = useSelector((state: RootState) => state.registrations);

  useEffect(() => {
    dispatch(fetchMyRegistrations());
  }, [dispatch]);

  // Handle errors
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="p-6 md:p-8 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            My <span className="text-blue-600">Race Entries</span>
          </h1>
          <p className="text-gray-500 font-medium">Manage your registrations and race day preparation.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-2xl text-sm font-bold">
          <Trophy size={18} />
          {myRegistrations.length} Events Joined
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-gray-100 animate-pulse rounded-[2rem]" />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && myRegistrations.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-gray-100 rounded-[3rem] p-16 text-center max-w-2xl mx-auto">
          <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
            <ClipboardList size={48} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">No registrations found</h2>
          <p className="text-gray-500 mt-2 font-medium">
            You haven't signed up for any marathons yet. 
            Ready to set a new personal best?
          </p>
          <button 
            onClick={() => navigate('/athlete/marathons')}
            className="mt-8 px-8 py-3 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center gap-2 mx-auto"
          >
            Browse Marathons <ArrowRight size={18} />
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {myRegistrations.map((reg) => (
            <div 
              key={reg.id} 
              className="group bg-white p-2 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center p-4 gap-6">
                
                {/* Status Icon Column */}
                <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center shrink-0 transition-colors ${
                  reg.payment_status === 'completed' 
                  ? 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white' 
                  : 'bg-amber-50 text-amber-500 group-hover:bg-amber-500 group-hover:text-white'
                }`}>
                  {reg.payment_status === 'completed' ? <BadgeCheck size={36} strokeWidth={1.5} /> : <Clock size={36} strokeWidth={1.5} />}
                </div>

                {/* Event Details */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 bg-gray-100 text-gray-500 rounded-full">
                      {reg.category}
                    </span>
                    <span className="text-xs text-gray-400 font-bold">
                      ID: #REG-{reg.id.toString().padStart(4, '0')}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 group-hover:text-blue-600 transition-colors">
                    {reg.marathon?.name || "Global Marathon Event"}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-semibold">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={16} className="text-blue-500" />
                      {reg.marathon?.location}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={16} className="text-purple-500" />
                      {reg.marathon?.date ? new Date(reg.marathon.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'TBD'}
                    </div>
                  </div>
                </div>

                {/* Payment & Actions */}
                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4 lg:pr-6 border-t lg:border-t-0 pt-4 lg:pt-0">
                  <div className="text-left lg:text-right">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Entry Status</p>
                    <p className={`text-sm font-black mt-1 ${
                      reg.payment_status === 'completed' ? 'text-emerald-600' : 'text-amber-500'
                    }`}>
                      {reg.payment_status === 'completed' ? 'CONFIRMED' : 'WAITING PAYMENT'}
                    </p>
                  </div>

                  {reg.payment_status === 'pending' ? (
                    <button 
                      onClick={() => navigate('/athlete/payments')}
                      className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2.5 rounded-2xl text-xs font-black uppercase transition-all shadow-lg shadow-amber-100 flex items-center gap-2"
                    >
                      <Receipt size={14} /> Finish Payment
                    </button>
                  ) : (
                    <button className="bg-gray-900 hover:bg-blue-600 text-white px-6 py-2.5 rounded-2xl text-xs font-black uppercase transition-all shadow-lg shadow-gray-200 flex items-center gap-2">
                      View Bib <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* Warning for Pending */}
              {reg.payment_status === 'pending' && (
                <div className="mx-4 mb-4 mt-2 px-4 py-2 bg-amber-50/50 rounded-xl flex items-center gap-2 text-[11px] font-bold text-amber-700">
                  <AlertCircle size={14} />
                  Complete payment within 24 hours to secure your bib number.
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRegistrations;