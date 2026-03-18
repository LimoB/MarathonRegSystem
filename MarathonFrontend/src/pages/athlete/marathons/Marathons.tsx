import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { 
  MapPin, 
  Calendar, 
  Search, 
  Filter,
  ArrowRight,
  Navigation,
  Trophy 
} from 'lucide-react';
import type { AppDispatch, RootState } from '../../../app/store';
import { fetchMarathons } from '../../../app/slices/marathonSlice';
import type { Marathon } from '../../../api/marathons';
import RegistrationModal from './RegistrationModal'; // Ensure this path is correct

const Marathons: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { marathons, loading, error } = useSelector((state: RootState) => state.marathons);
  
  // State to control modal visibility
  const [selectedMarathon, setSelectedMarathon] = useState<Marathon | null>(null);

  useEffect(() => {
    dispatch(fetchMarathons());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Registration Modal Overlay */}
      {selectedMarathon && (
        <RegistrationModal 
          marathon={selectedMarathon} 
          onClose={() => setSelectedMarathon(null)} 
        />
      )}

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Upcoming <span className="text-blue-600">Marathons</span>
          </h1>
          <p className="text-gray-500 font-medium">
            Find your next challenge and push your limits.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search cities..."
              className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all w-full md:w-64"
            />
          </div>
          <button className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
            <Filter size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Loading State Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-[400px] bg-gray-100 animate-pulse rounded-3xl border border-gray-200"></div>
          ))}
        </div>
      )}

      {/* Marathons Grid */}
      {!loading && marathons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {marathons.map((marathon) => (
            <div 
              key={marathon.id} 
              className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >
              <div className="h-44 bg-gradient-to-br from-blue-600 to-indigo-700 p-6 flex flex-col justify-between relative overflow-hidden">
                <div className="relative z-10 flex justify-between items-start">
                  <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/30 uppercase tracking-widest">
                    {marathon.distance_km} KM
                  </span>
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
                    <Navigation size={18} className="text-white" />
                  </div>
                </div>
                <div className="relative z-10 text-white">
                  <h3 className="text-xl font-bold truncate leading-tight group-hover:whitespace-normal">
                    {marathon.name}
                  </h3>
                </div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-blue-400 transition-colors"></div>
              </div>

              <div className="p-6 space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                      <MapPin size={16} />
                    </div>
                    <span className="text-sm font-semibold">{marathon.location}</span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                      <Calendar size={16} />
                    </div>
                    <span className="text-sm font-semibold">
                      {new Date(marathon.date).toLocaleDateString('en-US', { 
                        month: 'long', day: 'numeric', year: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>

                <div className="pt-5 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Organizer</span>
                    <span className="text-sm text-gray-800 font-bold truncate max-w-[120px]">
                      {marathon.organizer_name || 'Global Athletics'}
                    </span>
                  </div>
                  {/* Register Trigger */}
                  <button 
                    onClick={() => setSelectedMarathon(marathon)}
                    className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-600 active:scale-95 transition-all shadow-lg shadow-gray-200"
                  >
                    Register <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && (
          <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-3xl border border-dashed border-gray-200">
            <div className="bg-blue-50 p-6 rounded-full mb-6">
              <Trophy size={56} className="text-blue-500" />
            </div>
            <h3 className="text-2xl font-black text-gray-900">No Marathons Available</h3>
            <p className="text-gray-500 max-w-xs mx-auto mt-2 font-medium">
              We couldn't find any upcoming races. Check back soon for new events!
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default Marathons;