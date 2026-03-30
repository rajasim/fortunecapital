"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { 
  Clock, 
  ArrowRight, 
  GraduationCap, 
  Sparkles, 
  Zap, 
  Lock, 
  Home, 
  X, 
  ChevronRight 
} from "lucide-react";

export default function UserDashboard() {
  const [courses, setCourses] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [adminAuth, setAdminAuth] = useState({ id: "", pass: "" });

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminAuth.id === "admin" && adminAuth.pass === "omka77") {
      window.location.href = "/admin";
    } else {
      alert("Invalid ID or Password");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] text-slate-900 selection:bg-indigo-100 overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[100%] md:w-[50%] h-[50%] bg-indigo-100/40 blur-[120px] rounded-full" />
        <div className="absolute bottom-[0%] right-[-5%] w-[80%] md:w-[40%] h-[40%] bg-purple-100/40 blur-[120px] rounded-full" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 px-4 md:px-8 py-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          <div className="flex items-center gap-3 md:gap-6">
            {/* Redirected Home Button */}
            <a 
              href="https://fortune-capital-navigator.vercel.app/" 
              className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition group"
            >
              <Home size={20} className="group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Home</span>
            </a>
            
            <div className="h-5 w-[1px] bg-slate-200" />

            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-tr from-indigo-600 to-purple-600 p-2 rounded-xl shadow-xl shadow-indigo-200">
                <GraduationCap className="text-white" size={24} />
              </div>
              <span className="text-xl font-black tracking-tighter text-slate-900 italic uppercase">Fortunecapital</span>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-8">
            <button 
              onClick={() => setShowLogin(true)}
              className="flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-slate-900 transition uppercase tracking-widest"
            >
              <Lock size={14} />  LOGIN
            </button>
            
          </div>
        </div>
      </nav>

      {/* Admin Login Modal */}
      <AnimatePresence>
        {showLogin && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowLogin(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-[3.5rem] p-12 shadow-2xl border border-slate-100"
            >
              <button onClick={() => setShowLogin(false)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition"><X size={24} /></button>
              <div className="text-center mb-10">
                <div className="bg-indigo-50 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4"><Lock className="text-indigo-600" size={28} /></div>
                <h2 className="text-3xl font-black uppercase italic tracking-tighter">Admin Portal</h2>
              </div>
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <input type="text" placeholder="ADMIN ID" className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-indigo-600 font-bold uppercase text-xs" onChange={(e) => setAdminAuth({...adminAuth, id: e.target.value})} required />
                <input type="password" placeholder="PASSWORD" className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-indigo-600 font-bold uppercase text-xs" onChange={(e) => setAdminAuth({...adminAuth, pass: e.target.value})} required />
                <button type="submit" className="w-full bg-indigo-600 text-white p-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-950 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-2">Verify & Access <ChevronRight size={16} /></button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="px-6 pt-12 md:pt-28 pb-16 md:pb-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          className="text-center lg:text-left lg:pr-10"
        >
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-full text-[10px] md:text-xs font-black text-indigo-600 mb-6 md:mb-8 uppercase tracking-widest">
            <Sparkles size={16} /> Premium Learning Experience
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight text-slate-900 mb-6 md:mb-8 leading-[1.1] md:leading-[0.9] uppercase italic max-w-xl mx-auto lg:mx-0">
            Master <br /> <span className="text-indigo-600">Everything.</span>
          </h1>
          
          <p className="text-base md:text-xl text-slate-500 max-w-md mb-8 md:mb-12 font-medium mx-auto lg:mx-0">
            High-end courses designed with a minimalist aesthetic. Pure focus, zero distractions.
          </p>
          
          <button className="bg-indigo-600 text-white px-10 py-5 rounded-[2rem] font-black text-lg hover:scale-105 transition shadow-2xl shadow-indigo-300 flex items-center gap-3 mx-auto lg:mx-0">
               Get Started <ArrowRight size={24} />
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="relative hidden sm:block">
           <div className="w-full aspect-square md:aspect-auto md:h-[500px] rounded-[4rem] bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 0)`, backgroundSize: '40px 40px' }}></div>
              <div className="relative z-10 p-12 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] text-center max-w-xs shadow-2xl">
                 <h2 className="text-3xl font-black text-white uppercase italic leading-none mb-4 tracking-tighter">The Future of Education</h2>
                 <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Minimalist Content</p>
              </div>
           </div>
        </motion.div>
      </header>

      {/* Catalog */}
      <main className="px-5 md:px-8 pb-32 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-16 uppercase italic underline decoration-indigo-500 decoration-8 underline-offset-8">Catalog</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {courses.map((course: any, idx) => (
            <motion.div key={course.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="group">
              <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] p-3 md:p-4 border border-slate-200/60 shadow-xl hover:shadow-2xl transition-all duration-700">
                <div className={`h-56 md:h-64 rounded-[2rem] overflow-hidden relative mb-8 flex items-center justify-center transition-all duration-500 ${
                  idx % 3 === 0 ? 'bg-indigo-600' : idx % 2 === 0 ? 'bg-purple-600' : 'bg-emerald-600'
                }`}>
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '15px 15px' }}></div>
                  
                  <div className="relative z-10 h-32 w-32 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] shadow-2xl rotate-12 group-hover:rotate-0 transition-transform duration-700 flex flex-col items-center justify-center gap-2">
                    <div className="w-8 h-1 bg-white/40 rounded-full" />
                    <div className="w-12 h-1 bg-white/40 rounded-full" />
                    <div className="w-6 h-1 bg-white/40 rounded-full" />
                  </div>

                  <div className="absolute top-6 right-6 bg-white/95 px-4 py-2 rounded-2xl text-[10px] font-black uppercase text-slate-900 shadow-sm">
                    {course.category}
                  </div>
                </div>

                <div className="px-4 pb-4">
                  <div className="flex items-center gap-4 mb-6 text-[10px] font-black uppercase text-slate-400">
                    <span className="flex items-center gap-1.5 text-indigo-500"><Zap size={14} fill="currentColor" /> Feature</span>
                    <span className="flex items-center gap-1.5"><Clock size={14} /> {course.duration}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 group-hover:text-indigo-600 transition-colors leading-[0.9] uppercase italic tracking-tighter">
                    {course.title}
                  </h3>
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
                    <div>
                      <span className="text-xl md:text-2xl font-black text-slate-900 block tracking-tighter">₹{course.price}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{course.trainer}</span>
                    </div>
                    <Link href={`/course/${course.id}`} className="bg-slate-900 text-white p-5 rounded-2xl hover:bg-indigo-600 transition-all shadow-lg hover:rotate-6">
                      <ArrowRight size={24} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}