export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { PlusCircle, Trash2, Upload } from "lucide-react";
import fs from "fs/promises";
import path from "path";

export default async function AdminPage() {
  // Fetch courses from your database
  const courses = await db.course.findMany();

  // ACTION: Add Course
  async function addCourse(formData: FormData) {
    "use server";
    
    const file = formData.get("image") as File;
    let imageUrl = "";

    // Even if we use colored boxes, we keep this logic so the DB stays ready for real images
    if (file && file.size > 0) {
      const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadDir = path.join(process.cwd(), "public");
      
      await fs.mkdir(uploadDir, { recursive: true });
      await fs.writeFile(path.join(uploadDir, filename), buffer);
      // Fixed path: removed '/public' so it works in the browser
      imageUrl = `/${filename}`;
    }

    await db.course.create({
      data: {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        price: Number(formData.get("price")),
        duration: formData.get("duration") as string,
        trainer: formData.get("trainer") as string,
        category: formData.get("category") as string,
        imageUrl: imageUrl, 
      },
    });

    revalidatePath("/admin");
  }

  // ACTION: Delete Course
  async function deleteCourse(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await db.course.delete({ where: { id } });
    revalidatePath("/admin");
  }

  return (
    <div className="min-h-screen bg-white p-6 md:p-12 text-black font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-black uppercase mb-10 flex items-center gap-2">
          <PlusCircle /> Admin Dashboard
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT SIDE: ADD COURSE FORM */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold mb-4 uppercase tracking-tighter">Add New Course</h2>
              <form action={addCourse} className="flex flex-col gap-4">
                <input name="title" placeholder="Title" className="p-3 border rounded-xl outline-none focus:border-black font-semibold" required />
                
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-black uppercase text-gray-400">Course Image (Optional)</label>
                  <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-black transition-all text-center bg-white cursor-pointer group">
                    <input type="file" name="image" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <Upload className="mx-auto text-gray-300 group-hover:text-black mb-1" size={20} />
                    <p className="text-[10px] font-bold text-gray-400 group-hover:text-black uppercase">Click to upload from PC</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input name="price" type="number" placeholder="Price" className="p-3 border rounded-xl outline-none font-semibold" required />
                  <input name="duration" placeholder="Duration" className="p-3 border rounded-xl outline-none font-semibold" required />
                </div>
                
                <input name="trainer" placeholder="Trainer" className="p-3 border rounded-xl outline-none font-semibold" required />
                <input name="category" placeholder="Category" className="p-3 border rounded-xl outline-none font-semibold" required />
                <textarea name="description" placeholder="Description" className="p-3 border rounded-xl outline-none font-semibold" rows={3} required />

                <button type="submit" className="bg-black text-white p-4 rounded-xl font-bold hover:bg-gray-800 transition uppercase tracking-widest text-xs">
                  Save Course
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT SIDE: COURSE LIST */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b text-[10px] font-black uppercase text-gray-400 tracking-widest">
                  <tr>
                    <th className="p-4">Course Info</th>
                    <th className="p-4 text-center">Price</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {courses.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 flex items-center gap-4">
                        
                        {/* DYNAMIC COLORED DESIGN BOX */}
                        <div className={`h-12 w-12 rounded-xl shrink-0 flex items-center justify-center border-2 font-black text-lg uppercase shadow-sm ${
                          c.title.charAt(0).toLowerCase() <= 'e' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                          c.title.charAt(0).toLowerCase() <= 'j' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                          c.title.charAt(0).toLowerCase() <= 'o' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                          c.title.charAt(0).toLowerCase() <= 't' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                          'bg-emerald-50 text-emerald-600 border-emerald-100'
                        }`}>
                          {c.title.charAt(0)}
                        </div>

                        <div>
                          <p className="font-bold text-black">{c.title}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase">{c.category}</p>
                        </div>
                      </td>
                      <td className="p-4 text-center font-black text-black text-lg">₹{c.price}</td>
                      <td className="p-4 text-right">
                        <form action={deleteCourse}>
                          <input type="hidden" name="id" value={c.id} />
                          <button className="text-gray-200 hover:text-red-500 p-2 transition-colors">
                            <Trash2 size={20} />
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {courses.length === 0 && (
                <p className="p-10 text-center text-gray-300 font-bold italic">No courses found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}