import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// This forces Next.js to always get fresh data instead of using a 
// cached (potentially empty) version on other devices.
export const dynamic = "force-dynamic"; 

export async function GET() {
  try {
    const courses = await db.course.findMany({
      orderBy: {
        createdAt: 'desc' // Shows newest courses first
      }
    });

    // If courses is null or undefined for some reason, send an empty array []
    return NextResponse.json(courses || []);

  } catch (error) {
    console.error("DATABASE_ERROR:", error);
    
    // CRITICAL: Even if the database fails, we send a valid JSON object 
    // so the frontend doesn't crash with "Unexpected end of input"
    return NextResponse.json(
      { error: "Internal Server Error", details: "Check Database Connection" }, 
      { status: 500 }
    );
  }
}