import nodemailer from 'nodemailer';

const createTransporter = () => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: process.env.EMAIL_PORT || 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    return transporter;
};

export const sendEmail = async (options) => {
    const transporter = createTransporter();

    const mailOptions = {
        from: `${ process.env.EMAIL_FROM_NAME || 'ChirpX' } <${ process.env.EMAIL_FROM || process.env.EMAIL_USER }>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text
            
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Email sending error", error);
        throw error;
    }
};

export const sendPasswordResetEmail = async (email, resetToken) => {
    const resetURL = `${ process.env.FRONTEND_URL || 'http://localhost:5173' }/reset-password/${ resetToken }`;
    
    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .header {
                    background-color: #0d6efd;
                    color: white;
                    padding: 20px;
                    text-align: center;
                    border-radius: 5px 5px 0 0;
                }
                .content {
                    background-color: #f8f9fa;
                    padding: 30px;
                    border-radius: 0 0 5px 5px;
                }
                .button {
                    display: inline-block;
                    padding: 12px 30px;
                    background-color: #0d6efd;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                    margin: 20px 0;
                }
                .footer {
                    text-align: center;
                    margin-top: 20px;
                    color: #6c757d;
                    font-size: 12px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Password Reset Request</h1>
                </div>
                <div class="content">
                    <p>Hello,</p>
                    <p>You requested to reset your password for your ChirpX account.</p>
                    <p>Click the button below to reset your password:</p>
                    <div style="text-align: center;">
                        <a href="${ resetURL }" class="button">Reset Password</a>
                    </div>
                    <p>Or copy and paste this link into your browser:</p>
                    <p style="word-break: break-all; color: #0d6efd;">${ resetURL }</p>
                    <p><strong>This link will expire in 10 minutes.</strong></p>
                    <p>If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
                    <p>Best regards,<br>The ChirpX Team</p>
                </div>
                <div class="footer">
                    <p>This is an automated email. Please do not reply to this message.</p>
                </div>
            </div>
        </body>
        </html>
    `;

    const text = `
        Password reset Request

        You requested to reset your password for your LinkSharing account.

        Click the link below to reset your password:
        ${ resetURL }.

        This link will expire in 10 minutes.

        If you didnt request a password reset, please ignore this email.

        Best Regards
        LS Team
    `;

    return sendEmail({
        to: email,
        subject: "Password reset request",
        html,
        text
    });
};

export default { sendEmail, sendPasswordResetEmail };