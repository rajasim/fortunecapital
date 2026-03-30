import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { Resend } from 'resend';

const resend = new Resend(process.env.re_4kagcoJ8_CP5UnFngwmBL1hUGVDD4ukK9);
export const dynamic = "force-dynamic"; 

// 1. GET: This provides the course data for your landing page
export async function GET() {
  try {
    const courses = await db.course.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(courses || []);
  } catch (error) {
    return NextResponse.json({ error: "DB Error" }, { status: 500 });
  }
}

// 2. POST: This sends the email when the user clicks the button
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, courseTitle } = body;

    const data = await resend.emails.send({
      from: 'Enrollment <onboarding@resend.dev>',
      to: 'fortunecapitalads@gmail.com', // Replace with your actual email
      subject: `New Lead: ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
          <h2>New Student</h2>
          <p><strong>Course:</strong> ${courseTitle}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}