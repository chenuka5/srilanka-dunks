
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return entities[char];
  });

export async function POST(request: Request) {
  try {
    const { fullName, email, whatsapp, dateOfBirth, school } =
      await request.json();

    const name = String(fullName || '').trim();
    const normalizedEmail = String(email || '').trim().toLowerCase();
    const phone = String(whatsapp || '').trim();
    const dob = String(dateOfBirth || '').trim();
    const schoolName = String(school || '').trim();

    if (!name || !normalizedEmail || !phone || !dob) {
      return NextResponse.json(
        { error: 'Please complete all required fields.' },
        { status: 400 }
      );
    }

    if (
      name.length > 100 ||
      normalizedEmail.length > 254 ||
      phone.length > 30 ||
      schoolName.length > 150
    ) {
      return NextResponse.json(
        { error: 'One or more fields are too long.' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
      return NextResponse.json(
        { error: 'Please enter a valid date of birth.' },
        { status: 400 }
      );
    }

    const parsedDob = new Date(`${dob}T00:00:00.000Z`);

    if (
      Number.isNaN(parsedDob.getTime()) ||
      parsedDob.toISOString().slice(0, 10) !== dob ||
      parsedDob > new Date()
    ) {
      return NextResponse.json(
        { error: 'Please enter a valid date of birth.' },
        { status: 400 }
      );
    }

    // Save the registration first.
    const { error: insertError } = await supabase
      .from('webinar_waitlist')
      .insert({
        full_name: name,
        email: normalizedEmail,
        whatsapp: phone,
        date_of_birth: dob,
        school: schoolName || null,
      });

    if (insertError) {
      if (insertError.code === '23505') {
        return NextResponse.json(
          { error: 'This email address is already registered.' },
          { status: 409 }
        );
      }

      console.error('Supabase error:', insertError);

      return NextResponse.json(
        { error: 'We could not save your registration. Please try again.' },
        { status: 500 }
      );
    }

    // Send the confirmation email after the registration is saved.
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error('RESEND_API_KEY is missing.');
      return NextResponse.json(
        { success: true, emailSent: false },
        { status: 200 }
      );
    }

    const safeName = escapeHtml(name);

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Sri Lanka Dunks Camps <camps@srilankadunks.com>',
        to: [normalizedEmail],
        subject: 'Your Sri Lanka Dunks 2026 Webinar Registration is Confirmed!',
        html: `
          <div style="background:#0B0B0B;padding:32px 16px;font-family:Arial,sans-serif;color:#ffffff;">
            <div style="max-width:560px;margin:0 auto;background:#151515;padding:32px;border-radius:12px;">
              <h1 style="font-size:25px;margin:0 0 20px;color:#ffffff;">You're registered!</h1>
              <p style="font-size:16px;line-height:1.6;">Hi ${safeName},</p>
              <p style="font-size:15px;line-height:1.7;color:#dddddd;">
                Your place for the <strong style="color:#ffffff;">Sri Lanka Dunks 2026 Free Online Webinar</strong> is confirmed.
              </p>
              <div style="border-left:4px solid #C8102E;padding:12px 16px;margin:24px 0;background:#202020;">
                <p style="margin:5px 0;"> <strong>Date:</strong> Saturday, 28 November 2026</p>
                <p style="margin:5px 0;"><strong>Time:</strong> 11:00 AM – 2:00 PM Sri Lanka time</p>
                <p style="margin:5px 0;"><strong>Format:</strong> Online webinar</p>
              </div>
              <h3 style="color:#ffffff;">What you'll receive</h3>
              <ul style="color:#dddddd;line-height:1.9;padding-left:20px;">
                <li>A free 6-week vertical jump training plan</li>
                <li>Webinar completion certificate</li>
                <li>Opportunity to win mystery gifts through our quiz</li>
              </ul>
              <p style="font-size:14px;line-height:1.7;color:#dddddd;">
                Your webinar joining instructions will be sent closer to the event.
              </p>
              <p style="font-size:14px;line-height:1.7;color:#dddddd;">
                <strong>Please check your Spam, Junk or Promotions folder</strong> if you cannot find our emails. You can also add camps@srilankadunks.com to your contacts to help ensure you receive our updates.
              </p>
              <div style="border-top:1px solid #333;margin-top:28px;padding-top:20px;">
                <p style="font-weight:bold;color:#ffffff;margin-bottom:5px;">SRI LANKA DUNKS</p>
                <p style="font-size:12px;color:#C8102E;font-weight:bold;letter-spacing:1px;">TRAIN HARD. JUMP HIGHER.</p>
                <a href="https://srilankadunks.com" style="color:#ffffff;">srilankadunks.com</a>
              </div>
            </div>
          </div>
        `,
        text: `Hi ${name},

Your registration for the Sri Lanka Dunks 2026 Free Online Webinar is confirmed!

Date: Saturday, 28 November 2026
Time: 11:00 AM – 2:00 PM Sri Lanka time
Format: Online webinar

You'll receive a free 6-week vertical jump training plan, a completion certificate, and the opportunity to win mystery gifts through our quiz.

Your joining instructions will be sent closer to the event.

Please check your Spam, Junk or Promotions folder if you cannot find our emails. Add camps@srilankadunks.com to your contacts to help receive our updates.

Sri Lanka Dunks
TRAIN HARD. JUMP HIGHER.
https://srilankadunks.com`,
      }),
    });

    if (!emailResponse.ok) {
      console.error('Resend email error:', await emailResponse.text());
      return NextResponse.json(
        { success: true, emailSent: false },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: true, emailSent: true },
      { status: 200 }
    );
  } catch (err) {
    console.error('API route error:', err);

    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
