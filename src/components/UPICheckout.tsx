"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  ChevronLeft, 
  Smartphone, 
  ShieldCheck 
} from "lucide-react";

interface UPICheckoutProps {
  course: {
    id: string;
    title: string;
    price: number;
  };
  userData?: {
    name: string;
    email: string;
    phone: string;
  };
}

export default function UPICheckout({ course, userData }: UPICheckoutProps) {
  const [step, setStep] = useState<"pay" | "verify">("pay");
  const [utr, setUtr] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- CONFIGURATION ---
  const UPI_ID = "fortunecapital0556@aubank"; // CHANGE THIS to your actual UPI ID
  const MERCHANT_NAME = "fortunecapita"; // CHANGE THIS to your business name

  // Standard UPI URI Scheme
  const upiLink = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${course.price}&cu=INR&tn=${encodeURIComponent(`Enroll: ${course.title}`)}`;

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(UPI_ID);
    alert("UPI ID copied to clipboard!");
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Here you would typically call an API to save the UTR and User Data to your DB
    console.log("Verifying Transaction:", { utr, userData, courseId: course.id });

    setTimeout(() => {
      setIsSubmitting(false);
      alert("Payment details submitted! We will verify and unlock your course shortly.");
    }, 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {step === "pay" ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
              <ShieldCheck size={12} /> Secure UPI Payment
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Scan & Pay</h3>
            <p className="text-slate-500 text-sm">Amount to pay: <span className="font-bold text-indigo-600">₹{course.price}</span></p>
          </div>

          {/* QR Code Section */}
          <div className="flex justify-center mb-8">
            <div className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-indigo-100 border border-slate-50">
              <QRCodeSVG value={upiLink} size={200} includeMargin={true} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <a 
              href={upiLink}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-3 py-4 rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-indigo-200"
            >
              <Smartphone size={20} /> Open in UPI App
            </a>
            
            <button 
              onClick={handleCopyUPI}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition"
            >
              <Copy size={14} /> Copy UPI ID: {UPI_ID}
            </button>
          </div>

          <button 
            onClick={() => setStep("verify")}
            className="w-full mt-8 py-4 bg-slate-50 border border-dashed border-slate-300 rounded-2xl text-slate-600 font-bold text-sm hover:bg-slate-100 transition flex items-center justify-center gap-2"
          >
            I have paid, enter Transaction ID <ExternalLink size={14} />
          </button>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
          <button 
            onClick={() => setStep("pay")}
            className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest mb-6 hover:text-indigo-600 transition"
          >
            <ChevronLeft size={16} /> Back to QR
          </button>

          <h3 className="text-2xl font-bold text-slate-900 mb-2">Verify Payment</h3>
          <p className="text-slate-500 text-sm mb-8 leading-relaxed">
            Please enter the 12-digit **UTR / Transaction ID** from your payment app (GPay, PhonePe, etc.) to unlock your course.
          </p>

          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Transaction ID (UTR)</label>
              <input 
                required
                type="text"
                placeholder="Ex: 412388..."
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-lg"
                value={utr}
                onChange={(e) => setUtr(e.target.value)}
              />
            </div>

            <button 
              type="submit"
              disabled={isSubmitting || utr.length < 6}
              className="w-full bg-slate-900 text-white py-5 rounded-[2rem] font-bold text-lg flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? "Verifying..." : "Submit for Approval"}
              {!isSubmitting && <CheckCircle2 size={20} />}
            </button>
          </form>
          
          <div className="mt-8 p-4 bg-amber-50 rounded-2xl border border-amber-100">
            <p className="text-[10px] text-amber-700 font-medium leading-normal">
              Note: Verification usually takes 30-60 minutes. Once confirmed, the course will be added to your dashboard.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}