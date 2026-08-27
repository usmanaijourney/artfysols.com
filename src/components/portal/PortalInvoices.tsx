import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { CustomerInvoice, InvoiceRecord } from '../../types';
import {
  Receipt,
  Download,
  CheckCircle2,
  Calendar,
  CreditCard,
  Building,
  Printer,
  X,
  FileText,
} from 'lucide-react';

export const PortalInvoices: React.FC<{ theme?: 'dark' | 'light' }> = ({ theme = 'dark' }) => {
  const isLight = theme === 'light';
  const { user } = useAuth();
  const [selectedInvoice, setSelectedInvoice] = useState<CustomerInvoice | InvoiceRecord | null>(null);

  if (!user) return null;

  const totalSpent = user.invoices.reduce((acc, inv) => acc + inv.amount, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={`text-2xl sm:text-3xl font-bold font-display tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Invoices & Billing History
          </h1>
          <p className={`text-xs sm:text-sm mt-1 ${
            isLight ? 'text-slate-600' : 'text-zinc-400'
          }`}>
            Download verified tax invoices, review itemized usage receipts, and reconcile corporate accounts.
          </p>
        </div>

        <div className={`px-4 py-2 rounded-xl border text-right self-start sm:self-auto ${
          isLight
            ? 'bg-white border-slate-200 shadow-sm'
            : 'bg-[#0c0c14] border-white/[0.08]'
        }`}>
          <div className={`text-[10px] uppercase font-mono-code ${
            isLight ? 'text-slate-500' : 'text-zinc-400'
          }`}>Total Account Billing</div>
          <div className={`text-lg font-bold font-mono-code ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            ${totalSpent.toLocaleString()} USD
          </div>
        </div>
      </div>

      {/* Invoices Table Card */}
      <div className={`rounded-2xl border overflow-hidden shadow-sm ${
        isLight
          ? 'bg-white border-slate-200'
          : 'bg-[#0c0c14] border-white/[0.08] shadow-xl'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className={`uppercase font-mono-code text-[11px] border-b ${
              isLight
                ? 'bg-slate-50 text-slate-600 border-slate-200'
                : 'bg-[#12121e] text-zinc-400 border-white/[0.06]'
            }`}>
              <tr>
                <th className="py-3.5 px-5">Invoice Reference</th>
                <th className="py-3.5 px-4">Billing Period</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Payment Method</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${
              isLight
                ? 'divide-slate-100 text-slate-700'
                : 'divide-white/[0.04] text-zinc-300'
            }`}>
              {user.invoices.map((inv) => (
                <tr key={inv.id} className={isLight ? 'hover:bg-slate-50/80 transition-colors' : 'hover:bg-white/[0.02] transition-colors'}>
                  <td className="py-4 px-5">
                    <div className={`font-bold font-mono-code ${isLight ? 'text-slate-900' : 'text-white'}`}>{inv.invoiceNumber}</div>
                    <div className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>{inv.description}</div>
                  </td>
                  <td className={`py-4 px-4 font-mono-code ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                    {inv.period || ('issueDate' in inv && 'dueDate' in inv ? `${inv.issueDate} - ${inv.dueDate}` : 'date' in inv ? inv.date : 'Current')}
                  </td>
                  <td className={`py-4 px-4 font-bold font-mono-code ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    ${inv.amount.toLocaleString()}.00
                  </td>
                  <td className={`py-4 px-4 ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>{inv.paymentMethod}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1 text-[10px] uppercase font-mono-code font-semibold px-2.5 py-0.5 rounded-full border ${
                      isLight
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                        : 'bg-emerald-950/60 border-emerald-500/30 text-emerald-400'
                    }`}>
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{inv.status}</span>
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                        isLight
                          ? 'bg-violet-50 hover:bg-violet-100 border-violet-200 text-violet-700'
                          : 'bg-violet-950/40 hover:bg-violet-900/60 border-violet-500/30 text-violet-300 hover:text-white'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Receipt</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Itemized Receipt Modal */}
      {selectedInvoice && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedInvoice(null);
          }}
        >
          <div className={`relative w-full max-w-2xl border rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto ${
            isLight
              ? 'bg-white border-slate-200 text-slate-900'
              : 'bg-[#0d0d16] border-violet-500/30 text-zinc-200'
          }`}>
            {/* Top Toolbar */}
            <div className={`flex items-center justify-between pb-4 border-b ${
              isLight ? 'border-slate-100' : 'border-white/[0.08]'
            }`}>
              <div className="flex items-center gap-2">
                <Receipt className={`w-5 h-5 ${isLight ? 'text-violet-600' : 'text-violet-400'}`} />
                <span className={`text-base font-bold font-display ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  Official Corporate Tax Receipt
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className={`p-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors border ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                      : 'bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white border-transparent'
                  }`}
                >
                  <Printer className="w-4 h-4" />
                  <span>Print</span>
                </button>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className={`p-2 rounded-xl transition-colors ${
                    isLight ? 'text-slate-500 hover:text-slate-800 bg-slate-100' : 'text-zinc-400 hover:text-white bg-white/[0.04]'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Content */}
            <div className={`p-6 rounded-xl border space-y-6 ${
              isLight
                ? 'bg-slate-50 border-slate-200 text-slate-800'
                : 'bg-black/50 border-white/[0.06] text-zinc-200'
            }`}>
              {/* Header Details */}
              <div className="flex justify-between items-start">
                <div>
                  <div className={`text-lg font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    ARTIFY SOLUTIONS INC.
                  </div>
                  <div className={`text-xs mt-0.5 ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                    AI Software Engineering & Autonomous Systems
                  </div>
                  <div className={`text-xs ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>535 Mission St, San Francisco, CA 94105</div>
                  <div className={`text-xs font-mono-code ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>EIN: 94-3829104</div>
                </div>

                <div className="text-right font-mono-code">
                  <div className={`text-xs font-bold ${isLight ? 'text-violet-700' : 'text-violet-400'}`}>{selectedInvoice.invoiceNumber}</div>
                  <div className={`text-xs ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                    {'date' in selectedInvoice && selectedInvoice.date ? selectedInvoice.date : 'issueDate' in selectedInvoice ? selectedInvoice.issueDate : 'Recent'}
                  </div>
                  <div className={`text-xs font-semibold uppercase mt-1 ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
                    PAID IN FULL
                  </div>
                </div>
              </div>

              {/* Billed To */}
              <div className={`pt-4 border-t grid grid-cols-2 gap-4 text-xs ${
                isLight ? 'border-slate-200' : 'border-white/[0.06]'
              }`}>
                <div>
                  <div className={`uppercase font-mono-code text-[10px] mb-1 ${
                    isLight ? 'text-slate-500' : 'text-zinc-500'
                  }`}>
                    Billed To:
                  </div>
                  <div className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{user.company}</div>
                  <div className={isLight ? 'text-slate-700' : 'text-zinc-300'}>{user.name} ({user.jobTitle || user.role})</div>
                  <div className={isLight ? 'text-slate-600' : 'text-zinc-400'}>{user.billingAddress.street}</div>
                  <div className={isLight ? 'text-slate-600' : 'text-zinc-400'}>
                    {user.billingAddress.city}, {user.billingAddress.state} {user.billingAddress.zip}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`uppercase font-mono-code text-[10px] mb-1 ${
                    isLight ? 'text-slate-500' : 'text-zinc-500'
                  }`}>
                    Payment Method:
                  </div>
                  <div className={`font-mono-code ${isLight ? 'text-slate-800' : 'text-zinc-300'}`}>{selectedInvoice.paymentMethod}</div>
                  <div className={`text-[11px] mt-1 ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>Auth Code: ART-AUTH-99201</div>
                </div>
              </div>

              {/* Line Items Table */}
              <div className={`pt-4 border-t ${isLight ? 'border-slate-200' : 'border-white/[0.06]'}`}>
                <table className="w-full text-left text-xs">
                  <thead className={`border-b font-mono-code text-[10px] uppercase ${
                    isLight ? 'text-slate-600 border-slate-200' : 'text-zinc-400 border-white/[0.08]'
                  }`}>
                    <tr>
                      <th className="py-2">Item Description</th>
                      <th className="py-2 text-center">Qty</th>
                      <th className="py-2 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isLight ? 'divide-slate-200' : 'divide-white/[0.04]'}`}>
                    {selectedInvoice.items.map((item, idx) => {
                      const qty = 'quantity' in item ? (item as any).quantity : (item as any).qty || 1;
                      return (
                        <tr key={idx}>
                          <td className={`py-3 font-medium ${isLight ? 'text-slate-900' : 'text-white'}`}>{item.description}</td>
                          <td className={`py-3 text-center font-mono-code ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>{qty}</td>
                          <td className={`py-3 text-right font-mono-code font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                            ${item.amount.toLocaleString()}.00
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Total Calculation */}
              <div className={`pt-4 border-t flex justify-end ${isLight ? 'border-slate-200' : 'border-white/[0.08]'}`}>
                <div className="w-64 space-y-1.5 text-xs text-right font-mono-code">
                  <div className={`flex justify-between ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                    <span>Subtotal:</span>
                    <span>${selectedInvoice.amount.toLocaleString()}.00</span>
                  </div>
                  <div className={`flex justify-between ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                    <span>Applicable VAT / Tax:</span>
                    <span>$0.00</span>
                  </div>
                  <div className={`flex justify-between text-base font-bold pt-2 border-t ${
                    isLight ? 'text-slate-900 border-slate-200' : 'text-white border-white/[0.08]'
                  }`}>
                    <span>Total Paid:</span>
                    <span className={isLight ? 'text-violet-700 font-bold' : 'text-violet-400'}>${selectedInvoice.amount.toLocaleString()}.00</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedInvoice(null)}
                className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold shadow-sm"
              >
                Close Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
