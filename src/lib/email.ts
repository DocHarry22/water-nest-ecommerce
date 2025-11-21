import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const appUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
const appName = process.env.NEXT_PUBLIC_APP_NAME || 'Water Nest';

/**
 * Send email verification link to user
 */
export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${appUrl}/auth/verify-email?token=${token}`;

  try {
    const { data, error } = await resend.emails.send({
      from: `${appName} <noreply@waternest.com>`,
      to: email,
      subject: `Verify your ${appName} email address`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Verify Your Email</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Verify Your Email</h1>
            </div>
            
            <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
              <p style="font-size: 16px; margin-bottom: 20px;">Hi there!</p>
              
              <p style="font-size: 16px; margin-bottom: 20px;">
                Thank you for signing up with ${appName}. To complete your registration and start using your account, 
                please verify your email address by clicking the button below:
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${verificationUrl}" 
                   style="background: #0ea5e9; color: white; padding: 14px 30px; text-decoration: none; 
                          border-radius: 6px; font-weight: bold; display: inline-block; font-size: 16px;">
                  Verify Email Address
                </a>
              </div>
              
              <p style="font-size: 14px; color: #666; margin-top: 30px;">
                Or copy and paste this link into your browser:
              </p>
              <p style="font-size: 14px; color: #0ea5e9; word-break: break-all;">
                ${verificationUrl}
              </p>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <p style="font-size: 13px; color: #666; margin: 0;">
                  This verification link will expire in 24 hours.
                </p>
                <p style="font-size: 13px; color: #666; margin-top: 10px;">
                  If you didn't create an account with ${appName}, you can safely ignore this email.
                </p>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
              <p>&copy; ${new Date().getFullYear()} ${appName}. All rights reserved.</p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Failed to send verification email:', error);
      throw new Error('Failed to send verification email');
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email service error:', error);
    throw error;
  }
}

/**
 * Send password reset link to user
 */
export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${appUrl}/auth/reset-password?token=${token}`;

  try {
    const { data, error } = await resend.emails.send({
      from: `${appName} <noreply@waternest.com>`,
      to: email,
      subject: `Reset your ${appName} password`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reset Your Password</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Reset Your Password</h1>
            </div>
            
            <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
              <p style="font-size: 16px; margin-bottom: 20px;">Hi there!</p>
              
              <p style="font-size: 16px; margin-bottom: 20px;">
                We received a request to reset your password for your ${appName} account. 
                Click the button below to create a new password:
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" 
                   style="background: #0ea5e9; color: white; padding: 14px 30px; text-decoration: none; 
                          border-radius: 6px; font-weight: bold; display: inline-block; font-size: 16px;">
                  Reset Password
                </a>
              </div>
              
              <p style="font-size: 14px; color: #666; margin-top: 30px;">
                Or copy and paste this link into your browser:
              </p>
              <p style="font-size: 14px; color: #0ea5e9; word-break: break-all;">
                ${resetUrl}
              </p>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <p style="font-size: 13px; color: #666; margin: 0;">
                  This password reset link will expire in 1 hour.
                </p>
                <p style="font-size: 13px; color: #666; margin-top: 10px;">
                  If you didn't request a password reset, you can safely ignore this email. 
                  Your password will not be changed.
                </p>
              </div>
              
              <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin-top: 20px; border-radius: 4px;">
                <p style="font-size: 13px; color: #92400e; margin: 0;">
                  <strong>Security Tip:</strong> Never share this link with anyone. 
                  ${appName} staff will never ask for your password.
                </p>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
              <p>&copy; ${new Date().getFullYear()} ${appName}. All rights reserved.</p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Failed to send password reset email:', error);
      throw new Error('Failed to send password reset email');
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email service error:', error);
    throw error;
  }
}

/**
 * Send notification when password has been changed
 */
export async function sendPasswordChangedEmail(email: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: `${appName} <noreply@waternest.com>`,
      to: email,
      subject: `Your ${appName} password has been changed`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Changed</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Password Changed</h1>
            </div>
            
            <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
              <p style="font-size: 16px; margin-bottom: 20px;">Hi there!</p>
              
              <p style="font-size: 16px; margin-bottom: 20px;">
                This is to confirm that your ${appName} account password has been successfully changed.
              </p>
              
              <p style="font-size: 16px; margin-bottom: 20px;">
                <strong>Changed on:</strong> ${new Date().toLocaleString()}
              </p>
              
              <div style="background: #dcfce7; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0; border-radius: 4px;">
                <p style="font-size: 14px; color: #065f46; margin: 0;">
                  ✓ All active sessions have been logged out for security
                </p>
              </div>
              
              <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin-top: 20px; border-radius: 4px;">
                <p style="font-size: 13px; color: #92400e; margin: 0;">
                  <strong>Didn't make this change?</strong>
                </p>
                <p style="font-size: 13px; color: #92400e; margin-top: 8px;">
                  If you didn't change your password, please contact our support team immediately 
                  as your account may have been compromised.
                </p>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
              <p>&copy; ${new Date().getFullYear()} ${appName}. All rights reserved.</p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Failed to send password changed email:', error);
      throw new Error('Failed to send password changed notification');
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email service error:', error);
    throw error;
  }
}
