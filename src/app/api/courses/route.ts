import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { Resend } from 'resend';

// ✅ FIX: Use the variable NAME from your .env, not the actual key string.
// The || 're_123' prevents Next.js from crashing during the build process.
const resend = new Resend(process.env.RESEND_API_KEY || 're_123');

// Forces Next.js to treat this as a dynamic route (fixes the "page data collection" error)
export const dynamic = "force-dynamic"; 

/**
 * GET: Fetches all courses from Neon DB
 * Used for the landing page/course list.
 */
export async function GET() {
  try {
    const courses = await db.course.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(courses || []);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}

/**
 * POST: Handles the Enrollment Form submission
 * Sends an email notification via Resend.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, courseTitle } = body;

    // Validate the input
    if (!name || !email || !courseTitle) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Send the email notification
    const data = await resend.emails.send({
      from: 'Enrollment <onboarding@resend.dev>',
      to: 'fortunecapitalads@gmail.com', 
      subject: `New Lead: ${name} - ${courseTitle}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #4f46e5;">New Student Enrollment</h2>
          <hr />
          <p><strong>Course:</strong> ${courseTitle}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <hr />
          <p style="font-size: 12px; color: #666;">This lead was generated from your Next.js Course Platform.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Email/POST Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}