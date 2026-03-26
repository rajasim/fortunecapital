import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const courses = await db.course.findMany();
  return NextResponse.json(courses);
}