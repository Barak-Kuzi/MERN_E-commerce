import nodemailer from 'nodemailer';
export const sendEmail = async (options) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 587,
            auth: {
                user: "9262a18c0cc18c",
                pass: "89a4a04ffa86ed",
            },
        });
        const mailOptions = {
            from: 'tech-market.com',
            to: options.email,
            subject: options.subject,
            text: options.message,
        };
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    }
    catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email could not be sent');
    }
};
