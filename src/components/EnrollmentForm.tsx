"use client";

import { useState } from "react";
import { User, Mail, Phone, ArrowRight, Loader2 } from "lucide-react";
import UPICheckout from "./UPICheckout";

interface Course {
  id: string;
  title: string;
  price: number;
}

export default function EnrollmentForm({ course }: { course: Course }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent double clicks
    
    setIsSubmitting(true);

    try {
      // Use the absolute path starting with /
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          courseTitle: course.title,
        }),
      });

      // If the server returns 404 or 500, this will stop the code here
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Server connection failed");
      }

      // ONLY if the email was sent successfully, we show the payment screen
      setShowPayment(true);

    } catch (error: any) {
      console.error("Enrollment Error:", error);
      alert(`Error: ${error.message}. Please check if /api/send/route.ts exists.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showPayment) {
    return <UPICheckout course={course} userData={formData} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-4">
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            required
            type="text"
            placeholder="Full Name"
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-slate-900"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            required
            type="email"
            placeholder="Email Address"
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-slate-900"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            required
            type="tel"
            placeholder="WhatsApp Number"
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-slate-900"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-slate-900 hover:bg-black text-white py-5 rounded-[2rem] font-bold text-lg flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-70 shadow-xl shadow-slate-200"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            <span className="animate-pulse">Sending Details...</span>
          </>
        ) : (
          <>
            Proceed to Payment <ArrowRight size={20} />
          </>
        )}
      </button>

      <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest mt-4">
        🔒 Data sent to admin before payment
      </p>
    </form>
  );
}