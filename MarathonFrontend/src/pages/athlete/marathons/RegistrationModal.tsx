import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { X, CheckCircle2, ChevronRight } from 'lucide-react';
import type { AppDispatch, RootState } from '../../../app/store';
import { createRegistration } from '../../../app/slices/registrationSlice';
import type { Marathon } from '../../../api/marathons';

interface Props {
  marathon: Marathon;
  onClose: () => void;
}

const RegistrationModal: React.FC<Props> = ({ marathon, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.registrations);
  
  // State for Gender and Age Group
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [selectedCategory, setSelectedCategory] = useState('male_18_25');

  // These "id" values MUST match your pgEnum in schema.ts exactly
  const ageGroups = [
    { id: 'under_18', name: 'Under 18' },
    { id: '18_25', name: '18 - 25 Years' },
    { id: '26_35', name: '26 - 35 Years' },
    { id: '36_50', name: '36 - 50 Years' },
    { id: '50_plus', name: '50+ Masters' },
  ];

  const handleConfirmRegistration = async () => {
    // We send the combined string, e.g., "male_18_25"
    const registrationPromise = dispatch(
      createRegistration({ 
        marathon_id: marathon.id, 
        category: selectedCategory 
      })
    ).unwrap();

    toast.promise(registrationPromise, {
      loading: 'Securing your spot...',
      success: () => {
        onClose();
        return `You're in! Welcome to the ${marathon.name}`;
      },
      error: (err) => `${err || 'Registration failed'}`,
    });
  };

  const handleSelectGroup = (groupId: string) => {
    const finalEnum = `${gender}_${groupId}`;
    setSelectedCategory(finalEnum);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose}
      />
      
      <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white relative">
          <div className="relative z-10">
            <h2 className="text-2xl font-black tracking-tight">Race Registration</h2>
            <p className="text-blue-100 text-sm mt-1 font-medium italic">{marathon.name} — {marathon.distance_km}KM</p>
          </div>
          <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-6">
          {/* Gender Selector Toggle */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Select Gender</label>
            <div className="flex p-1 bg-gray-100 rounded-2xl">
              <button 
                onClick={() => { setGender('male'); setSelectedCategory(`male_${selectedCategory.split('_').slice(1).join('_')}`); }}
                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${gender === 'male' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
              >
                Male
              </button>
              <button 
                onClick={() => { setGender('female'); setSelectedCategory(`female_${selectedCategory.split('_').slice(1).join('_')}`); }}
                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${gender === 'female' ? 'bg-white text-pink-600 shadow-sm' : 'text-gray-500'}`}
              >
                Female
              </button>
            </div>
          </div>

          {/* Age Group List */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Select Age Category</label>
            <div className="grid gap-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {ageGroups.map((group) => {
                const isSelected = selectedCategory === `${gender}_${group.id}`;
                return (
                  <button
                    key={group.id}
                    onClick={() => handleSelectGroup(group.id)}
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all group ${
                      isSelected 
                      ? 'border-blue-600 bg-blue-50/50' 
                      : 'border-gray-100 bg-white hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected ? 'border-blue-600 bg-blue-600' : 'border-gray-200'
                      }`}>
                        {isSelected && <CheckCircle2 className="text-white" size={12} />}
                      </div>
                      <span className={`font-bold text-sm ${isSelected ? 'text-blue-900' : 'text-gray-700'}`}>
                        {group.name}
                      </span>
                    </div>
                    <ChevronRight size={14} className={isSelected ? 'text-blue-600' : 'text-gray-300'} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4 border-t border-gray-50">
            <button
              onClick={onClose}
              className="flex-1 py-4 bg-gray-50 text-gray-500 font-bold rounded-2xl hover:bg-gray-100 transition-all text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmRegistration}
              disabled={loading}
              className="flex-[2] py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-50 text-sm flex items-center justify-center gap-2"
            >
              {loading ? 'Processing...' : 'Confirm Registration'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;