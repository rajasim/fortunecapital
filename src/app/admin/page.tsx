export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { PlusCircle, Trash2, BookOpen, Layers, ChevronRight } from "lucide-react";

export default async function AdminPage() {
  const courses = await db.course.findMany({
    orderBy: { createdAt: 'desc' }
  });

  async function addCourse(formData: FormData) {
    "use server";
    
    await db.course.create({
      data: {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        price: Number(formData.get("price")),
        duration: formData.get("duration") as string,
        trainer: formData.get("trainer") as string,
        category: formData.get("category") as string,
        imageUrl: "", // Always empty now
      },
    });

    revalidatePath("/admin");
    revalidatePath("/");
  }

  async function deleteCourse(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await db.course.delete({ where: { id } });
    revalidatePath("/admin");
    revalidatePath("/");
  }

  return (
    <div className="min-h-screen bg-[#FDFDFF] p-6 md:p-12 text-slate-900 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-16">
          <div className="flex items-center gap-5">
            <div className="bg-slate-900 text-white p-4 rounded-[1.5rem] shadow-2xl shadow-slate-200">
              <Layers size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-black uppercase italic tracking-tighter leading-none">Console</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-2">Manage Academic Inventory</p>
            </div>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{courses.length} ACTIVE MODULES</p>
            <div className="h-1 w-12 bg-indigo-600 ml-auto mt-1 rounded-full" />
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* ADD COURSE FORM (CLEAN VERSION) */}
          <div className="lg:col-span-4">
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-100/50 sticky top-10">
              <h2 className="text-[11px] font-black mb-8 uppercase tracking-[0.4em] text-indigo-600">Register Course</h2>
              
              <form action={addCourse} className="space-y-6">
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">General Info</label>
                  <input name="title" placeholder="TITLE" className="w-full p-5 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600/10 font-bold uppercase text-[10px] tracking-widest transition-all" required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Cost</label>
                    <input name="price" type="number" placeholder="₹" className="w-full p-5 bg-slate-50 border-none rounded-2xl outline-none font-bold text-[10px] uppercase" required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Period</label>
                    <input name="duration" placeholder="DAYS" className="w-full p-5 bg-slate-50 border-none rounded-2xl outline-none font-bold text-[10px] uppercase" required />
                  </div>
                </div>
                
                <input name="trainer" placeholder="INSTRUCTOR" className="w-full p-5 bg-slate-50 border-none rounded-2xl outline-none font-bold text-[10px] uppercase tracking-widest" required />
                <input name="category" placeholder="CATEGORY" className="w-full p-5 bg-slate-50 border-none rounded-2xl outline-none font-bold text-[10px] uppercase tracking-widest" required />
                <textarea name="description" placeholder="SYLLABUS SUMMARY" className="w-full p-5 bg-slate-50 border-none rounded-2xl outline-none font-bold text-[10px] uppercase tracking-widest resize-none" rows={3} required />

                <button type="submit" className="w-full bg-slate-900 text-white p-6 rounded-2xl font-black uppercase tracking-[0.4em] text-[10px] hover:bg-indigo-600 transition-all shadow-2xl shadow-slate-200 flex items-center justify-center gap-2 group">
                  Confirm & Save <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>

          {/* COURSE LIST */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-xl shadow-slate-100/50">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                  <tr>
                    <th className="p-8 text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Module Identity</th>
                    <th className="p-8 text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] text-center">Value</th>
                    <th className="p-8 text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] text-right">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {courses.map((c) => (
                    <tr key={c.id} className="group hover:bg-slate-50/30 transition-colors">
                      <td className="p-8 flex items-center gap-6">
                        {/* THE ICON DESIGN BOX */}
                        <div className={`h-16 w-16 rounded-[1.5rem] flex items-center justify-center font-black text-2xl italic shadow-sm border-2 ${
                          c.title.length % 2 === 0 ? 'bg-indigo-50 text-indigo-500 border-indigo-100' : 'bg-rose-50 text-rose-500 border-rose-100'
                        }`}>
                          {c.title.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-black text-xs uppercase italic tracking-tighter group-hover:text-indigo-600 transition-colors">{c.title}</p>
                          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">{c.category} • {c.trainer}</p>
                        </div>
                      </td>
                      <td className="p-8 text-center font-black text-base italic tracking-tighter text-slate-900">₹{c.price}</td>
                      <td className="p-8 text-right">
                        <form action={deleteCourse}>
                          <input type="hidden" name="id" value={c.id} />
                          <button className="bg-white text-slate-200 hover:text-rose-500 hover:shadow-lg p-4 rounded-2xl transition-all border border-transparent hover:border-rose-100">
                            <Trash2 size={20} />
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {courses.length === 0 && (
                <div className="p-32 text-center flex flex-col items-center gap-6">
                  <BookOpen size={48} className="text-slate-100" />
                  <p className="text-[10px] text-slate-300 font-black uppercase tracking-[0.5em]">Inventory Status: Empty</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}