import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { buildAutoReplyEmail, buildOwnerEmail } from './emailTemplates';

interface ContactRequestBody {
    name: string;
    email: string;
    service: string;
    message: string;
}

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const body: ContactRequestBody = await request.json();
        const { name, email, service, message } = body;

        if (!name || !email || !service || !message) {
            return NextResponse.json(
                { success: false, message: 'All fields are required.' },
                { status: 400 }
            );
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const ownerEmail = process.env.CONTACT_EMAIL || process.env.SMTP_USER;

        await Promise.all([
            transporter.sendMail({
                from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
                to: ownerEmail,
                replyTo: email,
                subject: `📩 ${name} — ${service} Inquiry via Portfolio`,
                html: buildOwnerEmail(body),
            }),
            transporter.sendMail({
                from: `"Abdulahad Hussain" <${process.env.SMTP_USER}>`,
                to: email,
                subject: `✅ Thank you for reaching out, ${name}!`,
                html: buildAutoReplyEmail(body),
            }),
        ]);

        return NextResponse.json({
            success: true,
            message: 'Message sent successfully!',
        });
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to send message. Please try again later.',
            },
            { status: 500 }
        );
    }
}
