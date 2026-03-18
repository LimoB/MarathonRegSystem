import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import type { AppDispatch, RootState } from '../../../app/store';
import { fetchMyRegistrations } from '../../../app/slices/registrationSlice';
import { initiatePayment } from '../../../app/slices/paymentSlice';

const MyPayments: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { myRegistrations } = useSelector((state: RootState) => state.registrations);
  const { loading: payLoading } = useSelector((state: RootState) => state.payments);

  useEffect(() => {
    dispatch(fetchMyRegistrations());
  }, [dispatch]);

  const handlePayment = async (reg: any) => {
    // Determine amount based on category (mapping logic)
    const amountMap: Record<string, number> = {
      'Full Marathon (42km)': 50,
      'Half Marathon (21km)': 35,
      '10K Power Run': 20,
      'Fun Run (5km)': 10,
    };

    const amount = amountMap[reg.category] || 30;

    const payload = {
      registration_id: reg.id,
      amount: amount,
      marathon_name: reg.marathon?.name || "Marathon Entry"
    };

    const paymentPromise = dispatch(initiatePayment(payload)).unwrap();

    toast.promise(paymentPromise, {
      loading: 'Preparing secure checkout...',
      success: (url) => {
        window.location.href = url; // Redirect to Stripe
        return 'Redirecting to Stripe...';
      },
      error: (err) => `${err}`
    });
  };

  const pendingPayments = myRegistrations.filter(r => r.payment_status === 'pending');
  const completedPayments = myRegistrations.filter(r => r.payment_status === 'completed');

  return (
    <div className="p-6 md:p-8 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
          Payments & <span className="text-blue-600">Invoices</span>
        </h1>
        <p className="text-gray-500 font-medium">Securely settle your entry fees and view receipts.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Pending Actions */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Clock className="text-amber-500" size={20} />
            Pending Payments
          </h2>

          {pendingPayments.length === 0 ? (
            <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-[2rem] text-center">
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-500 shadow-sm">
                <CheckCircle2 size={24} />
              </div>
              <p className="text-emerald-800 font-bold">All caught up!</p>
              <p className="text-emerald-600 text-sm mt-1">You have no outstanding registration fees.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {pendingPayments.map((reg) => (
                <div key={reg.id} className="bg-white border border-gray-100 rounded-[2rem] p-6 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                      <CreditCard size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{reg.marathon?.name}</h4>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{reg.category}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                    <div className="text-right">
                      <p className="text-[10px] text-gray-400 font-black uppercase">Amount Due</p>
                      <p className="text-lg font-black text-gray-900">
                        ${reg.category.includes('42km') ? '50.00' : '35.00'}
                      </p>
                    </div>
                    <button 
                      onClick={() => handlePayment(reg)}
                      disabled={payLoading}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-100 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
                    >
                      Pay Now <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Completed History */}
          <div className="pt-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-6">
              <ShieldCheck className="text-emerald-500" size={20} />
              Payment History
            </h2>
            <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 text-[10px] uppercase font-black text-gray-400">
                  <tr>
                    <th className="px-6 py-4">Transaction</th>
                    <th className="px-6 py-4">Method</th>
                    <th className="px-6 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {completedPayments.length > 0 ? completedPayments.map((reg) => (
                    <tr key={reg.id} className="text-sm">
                      <td className="px-6 py-4">
                        <p className="font-bold text-gray-800">{reg.marathon?.name}</p>
                        <p className="text-xs text-gray-400">{new Date().toLocaleDateString()}</p>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-500">Stripe / Card</td>
                      <td className="px-6 py-4 text-right text-emerald-600 font-bold">COMPLETED</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={3} className="px-6 py-10 text-center text-gray-400 italic">No payment records found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Security & Summary */}
        <div className="space-y-6">
          <div className="bg-gray-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <CreditCard className="text-blue-400 mb-6" size={32} />
              <h3 className="text-xl font-bold mb-2">Secure Checkout</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                We use industry-standard Stripe encryption. Your card details are never stored on our servers.
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-widest">
                <ShieldCheck size={14} /> PCI-DSS Compliant
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl"></div>
          </div>

          <div className="bg-blue-50 p-6 rounded-[2rem] border border-blue-100">
            <div className="flex items-start gap-3 text-blue-800">
              <AlertCircle className="shrink-0 mt-0.5" size={18} />
              <p className="text-xs font-medium leading-relaxed">
                Refunds are subject to the specific marathon organizer's policy. Most registrations are non-refundable 30 days before the event.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MyPayments;