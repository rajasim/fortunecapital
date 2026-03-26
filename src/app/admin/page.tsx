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
        imageUrl: "",
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
    <div className="min-h-screen bg-[#FDFDFF] p-4 md:p-12 text-slate-900 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center md:items-end mb-8 md:mb-16">
          <div className="flex items-center gap-3 md:gap-5">
            <div className="bg-slate-900 text-white p-3 md:p-4 rounded-2xl md:rounded-[1.5rem] shadow-xl shadow-slate-200">
              <Layers size={22} className="md:w-7 md:h-7" />
            </div>
            <div>
              <h1 className="text-xl md:text-3xl font-black uppercase italic tracking-tighter leading-none">Console</h1>
              <p className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1 md:mt-2">Inventory System</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[9px] md:text-[10px] font-black text-slate-900 uppercase tracking-widest">{courses.length} MODULES</p>
            <div className="h-1 w-8 md:w-12 bg-indigo-600 ml-auto mt-1 rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          
          {/* ADD COURSE FORM */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-100/50 lg:sticky lg:top-10">
              <h2 className="text-[10px] md:text-[11px] font-black mb-6 md:mb-8 uppercase tracking-[0.4em] text-indigo-600">Register Course</h2>
              
              <form action={addCourse} className="space-y-4 md:space-y-6">
                <input name="title" placeholder="TITLE" className="w-full p-4 md:p-5 bg-slate-50 border-none rounded-xl md:rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600/10 font-bold uppercase text-[10px] tracking-widest" required />

                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <input name="price" type="number" placeholder="₹ PRICE" className="w-full p-4 md:p-5 bg-slate-50 border-none rounded-xl md:rounded-2xl outline-none font-bold text-[10px] uppercase" required />
                  <input name="duration" placeholder="DAYS" className="w-full p-4 md:p-5 bg-slate-50 border-none rounded-xl md:rounded-2xl outline-none font-bold text-[10px] uppercase" required />
                </div>
                
                <input name="trainer" placeholder="INSTRUCTOR" className="w-full p-4 md:p-5 bg-slate-50 border-none rounded-xl md:rounded-2xl outline-none font-bold text-[10px] uppercase tracking-widest" required />
                <input name="category" placeholder="CATEGORY" className="w-full p-4 md:p-5 bg-slate-50 border-none rounded-xl md:rounded-2xl outline-none font-bold text-[10px] uppercase tracking-widest" required />
                <textarea name="description" placeholder="SUMMARY" className="w-full p-4 md:p-5 bg-slate-50 border-none rounded-xl md:rounded-2xl outline-none font-bold text-[10px] uppercase tracking-widest resize-none" rows={3} required />

                <button type="submit" className="w-full bg-slate-900 text-white p-5 md:p-6 rounded-xl md:rounded-2xl font-black uppercase tracking-[0.4em] text-[10px] hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 group">
                  Confirm <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>

          {/* COURSE LIST */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <div className="bg-white rounded-[2rem] md:rounded-[3rem] border border-slate-100 overflow-hidden shadow-xl shadow-slate-100/50">
              
              {/* Desktop Table View */}
              <table className="w-full text-left border-collapse hidden md:table">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                  <tr>
                    <th className="p-8 text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Identity</th>
                    <th className="p-8 text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] text-center">Value</th>
                    <th className="p-8 text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] text-right">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {courses.map((c) => (
                    <tr key={c.id} className="group hover:bg-slate-50/30 transition-colors">
                      <td className="p-8 flex items-center gap-6">
                        <div className={`h-16 w-16 rounded-[1.5rem] flex items-center justify-center font-black text-2xl italic shadow-sm border-2 ${
                          c.title.length % 2 === 0 ? 'bg-indigo-50 text-indigo-500 border-indigo-100' : 'bg-rose-50 text-rose-500 border-rose-100'
                        }`}>
                          {c.title.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-black text-xs uppercase italic group-hover:text-indigo-600 transition-colors">{c.title}</p>
                          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">{c.category}</p>
                        </div>
                      </td>
                      <td className="p-8 text-center font-black text-base italic text-slate-900">₹{c.price}</td>
                      <td className="p-8 text-right">
                        <form action={deleteCourse}>
                          <input type="hidden" name="id" value={c.id} />
                          <button className="text-slate-200 hover:text-rose-500 p-4 transition-all"><Trash2 size={20} /></button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile Card View */}
              <div className="md:hidden divide-y divide-slate-50">
                {courses.map((c) => (
                  <div key={c.id} className="p-6 flex items-center justify-between bg-white">
                    <div className="flex items-center gap-4">
                      <div className={`h-12 w-12 rounded-xl flex items-center justify-center font-black text-lg italic border-2 ${
                        c.title.length % 2 === 0 ? 'bg-indigo-50 text-indigo-500 border-indigo-100' : 'bg-rose-50 text-rose-500 border-rose-100'
                      }`}>
                        {c.title.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-black text-[10px] uppercase italic leading-tight">{c.title}</p>
                        <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">₹{c.price} • {c.category}</p>
                      </div>
                    </div>
                    <form action={deleteCourse}>
                      <input type="hidden" name="id" value={c.id} />
                      <button className="text-slate-200 hover:text-rose-500 p-2"><Trash2 size={18} /></button>
                    </form>
                  </div>
                ))}
              </div>

              {courses.length === 0 && (
                <div className="p-20 md:p-32 text-center flex flex-col items-center gap-6">
                  <BookOpen size={40} className="text-slate-100" />
                  <p className="text-[9px] text-slate-300 font-black uppercase tracking-[0.4em]">Empty Inventory</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}