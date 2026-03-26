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
  const course = await db.course.findUnique({ where: { id: id } });

  if (!course) return notFound();

  return (
    <div className="min-h-screen bg-white text-black p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-black transition mb-12 font-bold uppercase text-[10px] tracking-[0.2em]">
          <ArrowLeft size={16} /> Back to Discover
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* LEFT: HIGHLIGHTED POINTS DESIGN */}
          <div className="lg:col-span-7">
            <span className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase italic tracking-widest mb-6 inline-block">
              {course.category}
            </span>
            <h1 className="text-6xl md:text-7xl font-black uppercase italic tracking-tighter leading-[0.85] mb-10">
              {course.title}
            </h1>

            {/* THE HIGHLIGHT GRID (Instead of Image) */}
            <div className="grid grid-cols-2 gap-4 mb-12">
              <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 group hover:bg-black hover:text-white transition-all duration-300">
                <Zap className="text-indigo-600 mb-4 group-hover:text-white" size={24} fill="currentColor" />
                <h4 className="font-black uppercase italic text-sm mb-1">Instant Access</h4>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Start learning immediately</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 group hover:bg-black hover:text-white transition-all duration-300">
                <Infinity className="text-indigo-600 mb-4 group-hover:text-white" size={24} />
                <h4 className="font-black uppercase italic text-sm mb-1">Lifetime Validity</h4>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">No monthly subscriptions</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 group hover:bg-black hover:text-white transition-all duration-300">
                <Trophy className="text-indigo-600 mb-4 group-hover:text-white" size={24} />
                <h4 className="font-black uppercase italic text-sm mb-1">Certification</h4>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Professional verification</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 group hover:bg-black hover:text-white transition-all duration-300">
                <Users className="text-indigo-600 mb-4 group-hover:text-white" size={24} />
                <h4 className="font-black uppercase italic text-sm mb-1">Expert Support</h4>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">1-on-1 Trainer guidance</p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-black uppercase italic border-b-2 border-black pb-2 w-fit">Course Blueprint</h3>
              <p className="text-gray-500 font-medium text-lg leading-relaxed italic">
                {course.description}
              </p>
            </div>
          </div>

          {/* RIGHT: SCAN & ENROLLMENT */}
          <div className="lg:col-span-5">
            <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-2xl shadow-gray-200/50 sticky top-12">
              <div className="mb-8">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Investment</p>
                <div className="text-6xl font-black italic tracking-tighter">₹{course.price}</div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-2 text-emerald-500 font-black text-[10px] uppercase bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100 w-full justify-center italic">
                  <ShieldCheck size={16} /> Secured Payment Gateway
                </div>

                {/* Enrollment Component */}
                <EnrollmentForm course={course} />
              </div>

              <div className="mt-10 pt-8 border-t border-gray-50 flex justify-between items-center text-gray-300">
                 <Globe size={20} />
                 <span className="text-[9px] font-black uppercase tracking-[0.3em]">Join 500+ Students</span>
                 <Zap size={20} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}