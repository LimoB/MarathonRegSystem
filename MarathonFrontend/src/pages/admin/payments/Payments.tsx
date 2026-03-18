import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  ArrowUpRight, 
  Search, 
  Calendar,
  CreditCard,
  CheckCircle2,
  TrendingUp,
  DownloadCloud,
  FileText,
  Clock
} from 'lucide-react';
import type { AppDispatch, RootState } from '../../../app/store';
import { fetchPayments } from '../../../app/slices/paymentSlice';

const Payments: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { payments, loading } = useSelector((state: RootState) => state.payments);

  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch]);

  // Calculate Financial Metrics
  const totalRevenue = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingRevenue = payments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="p-6 md:p-10 space-y-8 animate-in fade-in duration-700">
      
      {/* Financial Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Financial <span className="text-indigo-600">Ledger</span>
          </h1>
          <p className="text-gray-500 font-medium">Tracking all marathon revenue and transaction statuses.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
            <DownloadCloud size={18} /> Statement
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
            <TrendingUp size={18} /> Revenue Report
          </button>
        </div>
      </div>

      {/* Revenue Snapshot Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Total Gross Revenue</p>
            <h2 className="text-4xl font-black text-white">${totalRevenue.toLocaleString()}</h2>
            <div className="mt-6 flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <ArrowUpRight size={16} /> 18.2% increase this month
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-600/20 rounded-full blur-3xl"></div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Awaiting Settlement</p>
          <h2 className="text-4xl font-black text-gray-900">${pendingRevenue.toLocaleString()}</h2>
          <div className="mt-6 flex items-center gap-2 text-amber-500 font-bold text-sm">
            <Clock size={16} /> From {payments.filter(p => p.status === 'pending').length} pending entries
          </div>
        </div>

        <div className="bg-indigo-50 p-8 rounded-[2.5rem] border border-indigo-100">
          <p className="text-xs font-black text-indigo-400 uppercase tracking-[0.2em] mb-2">Success Rate</p>
          <h2 className="text-4xl font-black text-indigo-900">94.2%</h2>
          <div className="mt-6 flex items-center gap-2 text-indigo-600 font-bold text-sm">
            <CheckCircle2 size={16} /> Optimized Stripe integration
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="text-xl font-black text-gray-900">All Transactions</h3>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by Stripe ID or Amount..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 text-[10px] uppercase font-black text-gray-400 tracking-widest">
              <tr>
                <th className="px-8 py-4">Transaction ID</th>
                <th className="px-8 py-4">Amount</th>
                <th className="px-8 py-4">Method</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${payment.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                        <FileText size={16} />
                      </div>
                      <span className="font-mono text-xs font-bold text-gray-500">
                        {payment.stripe_payment_id || `TXN-${payment.id.toString().padStart(6, '0')}`}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-black text-gray-900">${payment.amount.toFixed(2)}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase">
                      <CreditCard size={14} className="text-indigo-400" /> Card (Stripe)
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className={`flex items-center gap-1.5 text-[10px] font-black uppercase px-3 py-1.5 rounded-full w-fit ${
                      payment.status === 'completed' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : payment.status === 'failed' 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-amber-100 text-amber-700'
                    }`}>
                      {payment.status}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 text-xs font-bold text-gray-400">
                      <Calendar size={14} />
                      {payment.paid_at ? new Date(payment.paid_at).toLocaleDateString() : 'Pending'}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {loading && (
            <div className="p-12 text-center">
              <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Loading Ledger...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payments;