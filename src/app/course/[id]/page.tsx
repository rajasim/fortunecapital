/**
 * export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Zap, 
  ShieldCheck, 
  Trophy, 
  Users, 
  Globe, 
  Infinity 
} from "lucide-react";
import EnrollmentForm from "@/components/EnrollmentForm";

export default async function CourseDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  
  // Fetch from Neon DB
  const course = await db.course.findUnique({ where: { id: id } });

  if (!course) return notFound();

  return (
    <div className="min-h-screen bg-white text-black p-4 md:p-12 overflow-x-hidden">
      {/* BACKGROUND DECOR (Minimalist Design) }
      <div className="fixed top-0 right-0 -z-10 opacity-[0.03] pointer-events-none">
        <h1 className="text-[20rem] font-black uppercase italic leading-none rotate-90 translate-x-1/2">
          {course.title.charAt(0)}
        </h1>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* BACK BUTTON }
        <Link href="/" className="group inline-flex items-center gap-2 text-gray-400 hover:text-black transition-all mb-8 md:mb-16 font-black uppercase text-[10px] tracking-[0.3em]">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Discover
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
          
          {/* LEFT: CONTENT }
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
               <span className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase italic tracking-widest">
                {course.category}
              </span>
              <span className="text-[9px] font-black uppercase text-gray-300 tracking-widest">
                {course.duration} Module
              </span>
            </div>

            <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.85] mb-12">
              {course.title}
            </h1>

            {/* HIGHLIGHT GRID }
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
              {[
                { icon: <Zap size={24} fill="currentColor" />, label: "Instant Access", sub: "Start learning now" },
                { icon: <Infinity size={24} />, label: "Lifetime Access", sub: "Forever in your library" },
                { icon: <Trophy size={24} />, label: "Certification", sub: "Official verification" },
                { icon: <Users size={24} />, label: "Expert Support", sub: "1-on-1 Trainer guidance" }
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-[2.5rem] border border-gray-100 group hover:bg-black hover:text-white transition-all duration-500 cursor-default">
                  <div className="text-indigo-600 group-hover:text-white transition-colors mb-4">{item.icon}</div>
                  <h4 className="font-black uppercase italic text-sm mb-1">{item.label}</h4>
                  <p className="text-[9px] font-bold text-gray-400 group-hover:text-gray-500 uppercase tracking-widest transition-colors">{item.sub}</p>
                </div>
              ))}
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-black uppercase italic tracking-tighter">Course Blueprint</h3>
                <div className="h-[2px] flex-grow bg-gray-100" />
              </div>
              <p className="text-gray-500 font-medium text-lg md:text-xl leading-relaxed italic pr-4 md:pr-12">
                {course.description}
              </p>
              
              <div className="flex items-center gap-4 pt-6">
                <div className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center text-white text-[10px] font-black italic border-4 border-gray-50">
                  {course.trainer.charAt(0)}
                </div>
                <div>
                   <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Lead Instructor</p>
                   <p className="font-black uppercase italic text-sm">{course.trainer}</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: PAYMENT / ENROLLMENT }
          <div className="lg:col-span-5">
            <div className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-gray-100 shadow-2xl shadow-indigo-100/50 lg:sticky lg:top-12">
              <div className="mb-10 text-center lg:text-left">
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em] mb-3">Academic Investment</p>
                <div className="text-7xl font-black italic tracking-tighter flex items-start justify-center lg:justify-start">
                  <span className="text-2xl mt-2 tracking-normal">₹</span>
                  {course.price}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3 text-emerald-500 font-black text-[9px] uppercase bg-emerald-50/50 px-5 py-3 rounded-2xl border border-emerald-100 w-full justify-center italic tracking-widest">
                  <ShieldCheck size={16} /> 256-Bit Secured Checkout
                </div>

                <EnrollmentForm course={course} />
                
                <p className="text-[9px] text-center text-gray-400 font-bold uppercase tracking-widest">
                  Secure checkout powered by Razorpay
                </p>
              </div>

              <div className="mt-12 pt-10 border-t border-gray-50 flex justify-between items-center text-gray-300">
                 <Globe size={18} />
                 <span className="text-[9px] font-black uppercase tracking-[0.4em]">Global Learning Access</span>
                 <Zap size={18} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
*/