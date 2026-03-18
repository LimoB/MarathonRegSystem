import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; // Import toast
import type { AppDispatch, RootState } from '../../app/store';
import { register } from '../../app/slices/authSlice';
import type { RegisterPayload } from '../../api/auth';

const Register: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState<RegisterPayload>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: 'athlete',
    phone: '',
    dob: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a promise-based toast
    const registrationPromise = dispatch(register(formData)).unwrap();

    toast.promise(registrationPromise, {
      loading: 'Creating your account...',
      success: () => {
        navigate('/login');
        return 'Account created! Please log in.';
      },
      error: (err) => `${err || 'Registration failed'}`,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Create account
          </h2>
          <p className="mt-2 text-sm text-gray-500 font-medium">
            Join the marathon community today
          </p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          {/* We removed the inline error div because toast handles it now! */}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600 uppercase ml-1">First Name</label>
              <input
                name="first_name"
                type="text"
                required
                className="block w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm"
                placeholder="John"
                onChange={handleChange}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600 uppercase ml-1">Last Name</label>
              <input
                name="last_name"
                type="text"
                required
                className="block w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm"
                placeholder="Doe"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600 uppercase ml-1">Email address</label>
            <input
              name="email"
              type="email"
              required
              className="block w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm"
              placeholder="runner@example.com"
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600 uppercase ml-1">Password</label>
            <input
              name="password"
              type="password"
              required
              className="block w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm"
              placeholder="••••••••"
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600 uppercase ml-1">Phone</label>
              <input
                name="phone"
                type="text"
                className="block w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm"
                placeholder="+254..."
                onChange={handleChange}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600 uppercase ml-1">Date of Birth</label>
              <input
                name="dob"
                type="date"
                className="block w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm"
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all transform active:scale-95 disabled:opacity-70"
          >
            {loading ? 'Processing...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 font-medium">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-500 font-bold underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;