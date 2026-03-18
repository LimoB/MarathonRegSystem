import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  MapPin, 
  Calendar, 
  Filter,
  X,
  Globe} from 'lucide-react';
import type { AppDispatch, RootState } from '../../../app/store';
import { 
  fetchMarathons, 
  removeMarathon, 
  addMarathon, 
  editMarathon 
} from '../../../app/slices/marathonSlice';
import type { Marathon } from '../../../api/marathons';

const AdminMarathons: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { marathons, loading } = useSelector((state: RootState) => state.marathons);
  
  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    date: '',
    distance_km: 42,
    organizer_name: '',
    sponsor_name: ''
  });

  useEffect(() => {
    dispatch(fetchMarathons());
  }, [dispatch]);

  const handleOpenModal = (marathon?: Marathon) => {
    if (marathon) {
      setEditingId(marathon.id);
      setFormData({
        name: marathon.name,
        location: marathon.location,
        date: marathon.date.split('T')[0], 
        distance_km: marathon.distance_km,
        organizer_name: marathon.organizer_name || '',
        sponsor_name: marathon.sponsor_name || ''
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', location: '', date: '', distance_km: 42, organizer_name: '', sponsor_name: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const action = editingId 
      ? dispatch(editMarathon({ id: editingId, data: formData }))
      : dispatch(addMarathon(formData));

    toast.promise(action.unwrap(), {
      loading: editingId ? 'Updating race details...' : 'Creating new marathon...',
      success: () => {
        setIsModalOpen(false);
        return editingId ? 'Marathon updated!' : 'Marathon live on platform!';
      },
      error: (err) => `${err}`
    });
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Delete this marathon? All associated registrations will be affected.')) {
      dispatch(removeMarathon(id));
      toast.success('Marathon removed from system');
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Top Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Event <span className="text-indigo-600">Management</span>
          </h1>
          <p className="text-gray-500 font-medium">Configure and oversee all active racing events.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-[1.5rem] font-bold transition-all shadow-xl shadow-indigo-100 active:scale-95 group"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform" /> 
          Create New Race
        </button>
      </div>

      {/* Search & Filter Strip */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by event title or city..."
            className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-gray-400"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-6 py-4 bg-gray-50 text-gray-600 rounded-2xl font-bold text-sm hover:bg-gray-100 transition-colors">
            <Filter size={18} /> Filters
          </button>
        </div>
      </div>

      {/* Main Content Table */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 text-[11px] uppercase font-black text-gray-400 tracking-[0.15em]">
              <tr>
                <th className="px-10 py-6">Marathon Detail</th>
                <th className="px-10 py-6">Distance</th>
                <th className="px-10 py-6">Race Date</th>
                <th className="px-10 py-6">Organizer</th>
                <th className="px-10 py-6 text-right">Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {marathons.map((marathon) => (
                <tr key={marathon.id} className="hover:bg-indigo-50/20 transition-colors group">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0 shadow-inner">
                        <Globe size={20} />
                      </div>
                      <div>
                        <p className="font-extrabold text-gray-900 group-hover:text-indigo-600 transition-colors">{marathon.name}</p>
                        <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-1 font-medium italic">
                          <MapPin size={12} className="text-indigo-400" /> {marathon.location}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className="px-4 py-1.5 bg-gray-900 text-white text-[10px] font-black rounded-lg shadow-lg shadow-gray-200">
                      {marathon.distance_km} KM
                    </span>
                  </td>
                  <td className="px-10 py-6 text-sm font-bold text-gray-700">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-gray-400" />
                      {new Date(marathon.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider bg-gray-50 px-3 py-1 rounded-md inline-block">
                      {marathon.organizer_name || 'Global Athletics'}
                    </p>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                      <button 
                        onClick={() => handleOpenModal(marathon)}
                        className="p-3 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all shadow-sm"
                        title="Edit Event"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(marathon.id)}
                        className="p-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all shadow-sm"
                        title="Delete Event"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading && (
            <div className="p-20 text-center text-gray-400 font-bold animate-pulse">
              Syncing Marathon Database...
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Slide-over Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsModalOpen(false)} />
          
          <form 
            onSubmit={handleSubmit}
            className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
          >
            <div className="bg-indigo-600 p-10 text-white relative">
              <h2 className="text-3xl font-black">{editingId ? 'Edit Race' : 'New Race'}</h2>
              <p className="text-indigo-100 font-medium mt-2">Set the parameters for this athletic event.</p>
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-10 right-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Event Name</label>
                <input 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl outline-none transition-all font-bold"
                  placeholder="e.g. Nairobi City Ultra"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Location City</label>
                <input 
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl outline-none transition-all font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Race Date</label>
                <input 
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-gray-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Distance (KM)</label>
                <input 
                  type="number"
                  required
                  value={formData.distance_km}
                  onChange={(e) => setFormData({...formData, distance_km: Number(e.target.value)})}
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl outline-none transition-all font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Lead Organizer</label>
                <input 
                  value={formData.organizer_name}
                  onChange={(e) => setFormData({...formData, organizer_name: e.target.value})}
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl outline-none transition-all font-bold"
                  placeholder="Official Body Name"
                />
              </div>
            </div>

            <div className="p-10 pt-0 flex gap-4">
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-5 bg-gray-100 text-gray-500 font-black rounded-2xl hover:bg-gray-200 transition-all uppercase tracking-widest text-xs"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="flex-[2] py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 shadow-2xl shadow-indigo-200 transition-all uppercase tracking-widest text-xs"
              >
                {editingId ? 'Save Changes' : 'Publish Marathon'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminMarathons;