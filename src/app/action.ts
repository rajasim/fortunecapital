"use server"; // This tells Next.js these functions run ONLY on the server

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addCourse(formData: FormData) {
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

export async function deleteCourse(formData: FormData) {
  const id = formData.get("id") as string;
  await db.course.delete({ where: { id } });
  revalidatePath("/admin");
  revalidatePath("/");
}