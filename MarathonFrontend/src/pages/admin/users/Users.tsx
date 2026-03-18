import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { 
  Users as UsersIcon, 
  Search, 
  UserPlus, 
  ShieldCheck, 
  User as UserIcon, 
  Mail, 
  Calendar,
  ShieldAlert,
  Edit2,
  Trash2
} from 'lucide-react';
import api from '../../../api/axios';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: 'admin' | 'athlete';
  created_at: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users'); // Assuming your backend has this admin-only route
      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to load users directory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(u => 
    `${u.first_name} ${u.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10 space-y-8 animate-in fade-in duration-700">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            User <span className="text-indigo-600">Directory</span>
          </h1>
          <p className="text-gray-500 font-medium">Manage access levels and monitor platform growth.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95">
          <UserPlus size={18} /> Invite Admin
        </button>
      </div>

      {/* Quick Access Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Users</p>
          <div className="flex items-end justify-between mt-2">
            <h3 className="text-3xl font-black text-gray-900">{users.length}</h3>
            <UsersIcon className="text-indigo-200" size={28} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Athletes</p>
          <div className="flex items-end justify-between mt-2">
            <h3 className="text-3xl font-black text-blue-600">
              {users.filter(u => u.role === 'athlete').length}
            </h3>
            <UserIcon className="text-blue-100" size={28} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Admins</p>
          <div className="flex items-end justify-between mt-2">
            <h3 className="text-3xl font-black text-indigo-600">
              {users.filter(u => u.role === 'admin').length}
            </h3>
            <ShieldCheck className="text-indigo-100" size={28} />
          </div>
        </div>
        <div className="bg-indigo-600 p-6 rounded-[2rem] text-white shadow-xl shadow-indigo-100">
          <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest">New Today</p>
          <h3 className="text-3xl font-black mt-2">+12</h3>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="relative">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, email, or role..."
          className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-[1.5rem] text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
        />
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 text-[10px] uppercase font-black text-gray-400 tracking-[0.2em]">
              <tr>
                <th className="px-8 py-6">User Profile</th>
                <th className="px-8 py-6">Role</th>
                <th className="px-8 py-6">Member Since</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg text-white shadow-inner ${
                        u.role === 'admin' ? 'bg-indigo-600' : 'bg-blue-500'
                      }`}>
                        {u.first_name[0]}{u.last_name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{u.first_name} {u.last_name}</p>
                        <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-0.5">
                          <Mail size={12} /> {u.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`flex items-center gap-1.5 w-fit px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                      u.role === 'admin' 
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' 
                      : 'bg-blue-50 text-blue-700 border border-blue-100'
                    }`}>
                      {u.role === 'admin' ? <ShieldAlert size={12} /> : <UserIcon size={12} />}
                      {u.role}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-sm font-semibold text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-gray-300" />
                      {new Date(u.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {loading && (
            <div className="py-20 flex flex-col items-center justify-center space-y-3">
              <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Loading Personnel...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;