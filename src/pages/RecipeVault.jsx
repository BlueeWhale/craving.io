import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Receipt, FileText, Download, Clock, Landmark, User, Calendar, ShieldCheck } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Simple & Clear Mock Data for Invoices
const mockReceipts = [
  {
    orderId: 'ORD-2026-8831',
    restaurantName: 'The Truffle Crust Pizza',
    date: '27 June 2026',
    paymentMethod: 'UPI (Google Pay)',
    customerName: 'Ankit Sharma',
    items: [
      { name: 'Spicy Paneer Pizza (Medium)', qty: 2, price: 290 },
      { name: 'Coke Zero (500ml)', qty: 1, price: 50 },
      { name: 'Garlic Breadstix', qty: 1, price: 99 }
    ],
    deliveryFee: 0,
    gstTax: 34,
    grandTotal: 763
  },
  {
    orderId: 'ORD-2026-7642',
    restaurantName: 'Lean Protein Lab',
    date: '24 June 2026',
    paymentMethod: 'Credit Card',
    customerName: 'Ankit Sharma',
    items: [
      { name: 'Keto Salad Bowl', qty: 1, price: 320 },
      { name: 'Fresh Watermelon Juice', qty: 1, price: 90 }
    ],
    deliveryFee: 40,
    gstTax: 21,
    grandTotal: 471
  }
];

const RecipeVault = () => {
  const [receipts] = useState(mockReceipts);
  const [activeReceipt, setActiveRecipe] = useState(mockReceipts[0]);

  // ==========================================
  // NORMAL CLEAN PDF RECEIPT GENERATOR
  // ==========================================
  const downloadReceiptPDF = (bill) => {
    const doc = new jsPDF();

    // Bill Header
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(15, 23, 42); // Slate 900
    doc.text('TAX INVOICE / RECEIPT', 14, 25);

    doc.setFontSize(10);
    doc.setFont('Helvetica', 'normal');
    doc.setTextColor(100, 116, 139); // Slate 500
    doc.text('Craving.io Food Delivery Platform', 14, 32);

    // Meta Info Grid (Two Columns layout)
    doc.setFont('Helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text('Order Details:', 14, 45);
    doc.text('Customer Details:', 120, 45);

    doc.setFont('Helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    doc.text(`Order ID: ${bill.orderId}`, 14, 52);
    doc.text(`Date: ${bill.date}`, 14, 58);
    doc.text(`Payment: ${bill.paymentMethod}`, 14, 64);

    doc.text(`Name: ${bill.customerName}`, 120, 52);
    doc.text(`Store: ${bill.restaurantName}`, 120, 58);

    // Table Mapping Array
    const tableRows = bill.items.map((item) => [
      item.name,
      item.qty,
      `Rs. ${item.price}`,
      `Rs. ${item.qty * item.price}`
    ]);

    // Standard Clean AutoTable
    doc.autoTable({
      startY: 75,
      head: [['Item Description', 'Quantity', 'Unit Price', 'Total']],
      body: tableRows,
      theme: 'striped',
      headStyles: { fillColor: [15, 23, 42], textColor: [255, 255, 255] },
      bodyStyles: { fontSize: 10 },
    });

    // Calculations Section below table
    let finalY = doc.lastAutoTable.finalY + 10;
    
    doc.setFont('Helvetica', 'normal');
    doc.text('Delivery Charges:', 130, finalY);
    doc.text(`Rs. ${bill.deliveryFee}`, 175, finalY);

    doc.text('GST & Restaurant Taxes:', 130, finalY + 7);
    doc.text(`Rs. ${bill.gstTax}`, 175, finalY + 7);

    // Final Grand Total Highlight Row
    doc.setDrawColor(226, 232, 240);
    doc.line(130, finalY + 11, 195, finalY + 11);

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Grand Total:', 130, finalY + 17);
    doc.text(`Rs. ${bill.grandTotal}/-`, 175, finalY + 17);

    // Footer Thank you message
    doc.setFontSize(10);
    doc.setFont('Helvetica', 'italic');
    doc.setTextColor(148, 163, 184);
    doc.text('Thank you for ordering with Craving.io! Hope to feed you again.', 14, finalY + 35);

    // Save File Trigger
    doc.save(`receipt-${bill.orderId}.pdf`);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 py-2">
      <div>
        <h1 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-2 tracking-tight">
          <Receipt className="h-7 w-7 text-brand-500" />
          <span>My Order Receipts</span>
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">Aapke saare purane orders ke bills aur download history yahan save hai.</p>
      </div>

      {/* Main Split UI Box */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        
        {/* Left Side: Receipt Invoice list selection */}
        <div className="space-y-3">
          <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider block pl-1">Select Invoice</span>
          {receipts.map((bill) => (
            <button
              key={bill.orderId}
              type="button"
              onClick={() => setActiveRecipe(bill)}
              className={`w-full p-4 rounded-2xl border transition-all text-left flex flex-col space-y-1.5 ${
                activeReceipt.orderId === bill.orderId
                  ? 'border-brand-500 bg-brand-50/30 dark:bg-brand-950/20 ring-2 ring-brand-500/5'
                  : 'bg-white dark:bg-darkcard border-slate-100 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <div className="flex justify-between items-center w-full">
                <h4 className="font-black text-xs text-slate-800 dark:text-white truncate max-w-[160px]">{bill.restaurantName}</h4>
                <span className="text-[10px] font-mono font-bold text-slate-400">{bill.date}</span>
              </div>
              <div className="flex justify-between items-center w-full text-[11px] font-bold text-slate-400">
                <span className="font-mono">{bill.orderId}</span>
                <span className="text-brand-500 font-black">₹{bill.grandTotal}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Right Side: Beautiful Clean Invoice Canvas Sheet Layout */}
        <div className="md:col-span-2">
          <AnimatePresence mode="wait">
            {activeReceipt && (
              <motion.div
                key={activeReceipt.orderId}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="bg-white dark:bg-darkcard border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 shadow-xs space-y-6"
              >
                {/* Invoice Top Strip Bar */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono font-black text-brand-500 bg-brand-50 dark:bg-brand-950/20 px-2 py-0.5 rounded border border-brand-100">INVOICE RETAIL</span>
                    <h3 className="text-base font-black text-slate-800 dark:text-white mt-1">{activeReceipt.restaurantName}</h3>
                  </div>

                  <button
                    onClick={() => downloadReceiptPDF(activeReceipt)}
                    className="bg-slate-900 hover:bg-slate-800 dark:bg-brand-500 dark:hover:bg-brand-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition self-start shadow-xs focus:outline-none"
                  >
                    <Download className="h-3.5 w-3.5 stroke-[2.5]" />
                    <span>Download Bill PDF</span>
                  </button>
                </div>

                {/* Metadata Details Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800/60">
                  <div className="space-y-1">
                    <p className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Order Specifications</p>
                    <p className="text-slate-700 dark:text-slate-300 font-mono font-bold">{activeReceipt.orderId}</p>
                    <p className="text-slate-500 flex items-center gap-1"><Calendar className="h-3.5 w-3.5"/> {activeReceipt.date}</p>
                    <p className="text-slate-500 flex items-center gap-1"><Landmark className="h-3.5 w-3.5"/> {activeReceipt.paymentMethod}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Delivery Coordinates</p>
                    <p className="text-slate-700 dark:text-slate-300 font-bold flex items-center gap-1"><User className="h-3.5 w-3.5"/> {activeReceipt.customerName}</p>
                    <p className="text-slate-500 font-medium">Saved Location Address Node</p>
                    <p className="text-emerald-500 font-bold flex items-center gap-1 text-[11px]"><ShieldCheck className="h-3.5 w-3.5"/> Payment Cleared</p>
                  </div>
                </div>

                {/* Items Summary Table Breakdown */}
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block pl-1">Items Charged</span>
                  <div className="border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-900 font-bold text-slate-500 border-b border-slate-100 dark:border-slate-800">
                          <th className="p-3">Dish Item</th>
                          <th className="p-3 text-center">Qty</th>
                          <th className="p-3 text-right">Total Price</th>
                        </tr>
                      </thead>
                      <tbody className="font-medium text-slate-700 dark:text-slate-300 divide-y divide-slate-100 dark:divide-slate-800">
                        {activeReceipt.items.map((item, i) => (
                          <tr key={i} className="hover:bg-slate-50/30 transition">
                            <td className="p-3 font-bold text-slate-800 dark:text-white">{item.name}</td>
                            <td className="p-3 text-center font-mono font-bold">x{item.qty}</td>
                            <td className="p-3 text-right font-black font-mono text-slate-800 dark:text-white">₹{item.qty * item.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Pricing Bifurcation List Stack */}
                <div className="pt-2 flex flex-col items-end text-xs font-bold space-y-1.5 pr-2">
                  <div className="w-full max-w-[240px] flex justify-between text-slate-400">
                    <span>Delivery Charges:</span>
                    <span className="font-mono text-slate-700 dark:text-slate-300">₹{activeReceipt.deliveryFee}</span>
                  </div>
                  <div className="w-full max-w-[240px] flex justify-between text-slate-400">
                    <span>GST & Platform Tax:</span>
                    <span className="font-mono text-slate-700 dark:text-slate-300">₹{activeReceipt.gstTax}</span>
                  </div>
                  <div className="w-full max-w-[240px] border-t border-slate-100 dark:border-slate-800 pt-2 flex justify-between text-sm">
                    <span className="text-slate-800 dark:text-white font-black">Grand Total:</span>
                    <span className="font-mono font-black text-brand-500 text-base">₹{activeReceipt.grandTotal}</span>
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default RecipeVault;