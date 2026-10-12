import nodemailer from 'nodemailer';

const BRAND_NAME = 'SeekhSetu';
const PUBLIC_SENDER_EMAIL = process.env.EMAIL_USER || 'seekhsetuteam@gmail.com';

// Singleton pooled Nodemailer transporter for instant delivery
let cachedTransporter = null;
let cachedPass = null;
let cachedAuthUser = null;

export function getTransporter() {
  const authUser = process.env.EMAIL_AUTH_USER || process.env.EMAIL_USER || 'seekhsetuteam@gmail.com';
  const rawPass = process.env.EMAIL_PASS || '';
  const cleanPass = rawPass.replace(/\s+/g, '');

  if (!cleanPass) {
    return null;
  }

  if (!cachedTransporter || cachedPass !== cleanPass || cachedAuthUser !== authUser) {
    cachedPass = cleanPass;
    cachedAuthUser = authUser;
    cachedTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: authUser,
        pass: cleanPass
      },
      connectionTimeout: 8000,
      greetingTimeout: 5000,
      socketTimeout: 10000
    });
  }

  return cachedTransporter;
}

/**
 * Send an email verification code
 * @param {string} toEmail - Recipient email
 * @param {string} code - 6-digit verification code
 * @param {'register' | 'login' | 'reset'} type - Purpose of the code
 */
export async function sendVerificationEmail(toEmail, code, type = 'register') {
  const titles = {
    register: 'Verify Your Email to Create Your Account',
    login: 'Your Sign-In Verification Code',
    reset: 'Password Reset Verification Code'
  };

  const actionText = {
    register: 'complete your account registration',
    login: 'sign in to your personal dashboard',
    reset: 'reset your account password'
  };

  const title = titles[type] || 'Verification Code';
  const action = actionText[type] || 'verify your account';
  const subject = `${BRAND_NAME}: ${code} is your verification code (valid for 3 minutes)`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${subject}</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f9fa; margin: 0; padding: 24px; color: #1e293b; }
        .container { max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .header { background: linear-gradient(135deg, #0f172a, #1e293b); padding: 32px 24px; text-align: center; }
        .brand { color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
        .brand span { color: #FA4616; }
        .content { padding: 32px 28px; }
        .title { font-size: 18px; font-weight: 700; color: #0f172a; margin-bottom: 12px; }
        .text { font-size: 14px; color: #475569; line-height: 1.6; margin-bottom: 24px; }
        .code-box { background: #fff7ed; border: 2px dashed #FA4616; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 24px; }
        .code { font-size: 34px; font-weight: 800; letter-spacing: 8px; color: #FA4616; font-family: monospace; }
        .warning { background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 6px; font-size: 13px; color: #991b1b; margin-bottom: 24px; }
        .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="brand">Seekh<span>Setu</span></div>
          <div style="color: #94a3b8; font-size: 12px; margin-top: 4px;">Placement Preparation OS</div>
        </div>
        <div class="content">
          <div class="title">${title}</div>
          <p class="text">
            Use the 6-digit verification code below to ${action} on SeekhSetu.
          </p>
          <div class="code-box">
            <div style="font-size: 11px; text-transform: uppercase; color: #ea580c; font-weight: 700; letter-spacing: 1px; margin-bottom: 6px;">Your 6-Digit Code</div>
            <div class="code">${code}</div>
          </div>
          <div class="warning">
            ⏳ <strong>Code expires in 3 minutes.</strong> If it expires, you will need to request a new code.
          </div>
          <p class="text" style="font-size: 12px; color: #64748b;">
            If you did not request this verification code, please ignore this email or contact support if you have concerns.
          </p>
        </div>
        <div class="footer">
          Sent with secure encryption by <strong>${BRAND_NAME}</strong> (${PUBLIC_SENDER_EMAIL})<br/>
          Empowering computer science engineers to ace top tier tech placements.
        </div>
      </div>
    </body>
    </html>
  `;

  const textContent = `
${BRAND_NAME} - Verification Code

Your 6-digit verification code is: ${code}

This code is valid for 3 minutes to ${action}.
If you did not request this, please ignore this email.

From: ${BRAND_NAME} <${PUBLIC_SENDER_EMAIL}>
  `.trim();

  // 1. Try Brevo HTTPS REST API (Port 443 - Bypasses Render cloud SMTP blocks!)
  if (process.env.BREVO_API_KEY) {
    try {
      const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': process.env.BREVO_API_KEY.trim(),
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          sender: { name: BRAND_NAME, email: PUBLIC_SENDER_EMAIL },
          to: [{ email: toEmail }],
          subject,
          htmlContent,
          textContent
        })
      });
      if (brevoRes.ok) {
        const data = await brevoRes.json();
        console.log(`✅ [SeekhSetu] Verification email delivered via Brevo HTTPS API to ${toEmail} (ID: ${data.messageId})`);
        return { success: true, mode: 'brevo', messageId: data.messageId };
      }
    } catch (brevoErr) {
      console.warn(`⚠️ [SeekhSetu] Brevo HTTPS delivery error:`, brevoErr.message);
    }
  }

  // 2. Try Resend HTTPS REST API (Port 443 - Bypasses Render cloud SMTP blocks!)
  if (process.env.RESEND_API_KEY) {
    try {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY.trim()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: `${BRAND_NAME} <onboarding@resend.dev>`,
          to: [toEmail],
          subject,
          html: htmlContent,
          text: textContent
        })
      });
      if (resendRes.ok) {
        const data = await resendRes.json();
        console.log(`✅ [SeekhSetu] Verification email delivered via Resend HTTPS API to ${toEmail} (ID: ${data.id})`);
        return { success: true, mode: 'resend', messageId: data.id };
      }
    } catch (resendErr) {
      console.warn(`⚠️ [SeekhSetu] Resend HTTPS delivery error:`, resendErr.message);
    }
  }

  // 3. Try sending via Nodemailer if SMTP configured
  const transporter = getTransporter();

  if (transporter) {
    try {
      const sendPromise = transporter.sendMail({
        from: `"${BRAND_NAME}" <${PUBLIC_SENDER_EMAIL}>`,
        replyTo: PUBLIC_SENDER_EMAIL,
        to: toEmail,
        subject,
        text: textContent,
        html: htmlContent
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Connection timeout (Render Free Tier blocks raw SMTP ports 465/587)')), 6000)
      );

      const info = await Promise.race([sendPromise, timeoutPromise]);
      console.log(`✅ [SeekhSetu] Verification email sent to ${toEmail} from ${PUBLIC_SENDER_EMAIL} (Message ID: ${info.messageId})`);
      return { success: true, mode: 'smtp', messageId: info.messageId };
    } catch (err) {
      console.error(`❌ [SeekhSetu] SMTP sending error (${err.message})`);
      console.log('================================================================');
      console.log(`📧 [SeekhSetu Verification Code]`);
      console.log(`Recipient: ${toEmail}`);
      console.log(`Code: ${code}`);
      console.log(`Expires in: 3 MINUTES`);
      if (err.message && (err.message.includes('535') || err.message.includes('BadCredentials'))) {
        console.log(`⚠️ ACTION REQUIRED: Google rejected credentials for ${PUBLIC_SENDER_EMAIL}.`);
        console.log(`   To send emails directly from ${PUBLIC_SENDER_EMAIL}:`);
        console.log(`   1. Log into ${PUBLIC_SENDER_EMAIL} on Google.`);
        console.log(`   2. Open: https://myaccount.google.com/apppasswords`);
        console.log(`   3. Generate an App Password and set EMAIL_PASS=<password> in server/.env`);
      }
      console.log('================================================================');
      return { success: false, error: err.message, code };
    }
  }

  // 2. Fallback / Console log (for development or when EMAIL_PASS not yet configured)
  console.log('================================================================');
  console.log(`📧 [SeekhSetu Verification Email]`);
  console.log(`From: "${BRAND_NAME}" <${PUBLIC_SENDER_EMAIL}>`);
  console.log(`To: ${toEmail}`);
  console.log(`Subject: ${subject}`);
  console.log(`VERIFICATION CODE: ${code}`);
  console.log(`Expires in: 3 MINUTES`);
  console.log('================================================================');

  return { success: true, mode: 'console', code };
}
