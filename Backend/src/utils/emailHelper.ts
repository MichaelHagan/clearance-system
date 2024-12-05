import { Transporter, createTransport } from 'nodemailer';

const address: string = process.env.EMAIL_USER!;

interface MailAttachment {
  filename: string;
  path: string;
}

export const sendMail = async (
  recipient: string,
  subject: string,
  message: string,
  html: string = '',
  attachments: MailAttachment | false = false,
): Promise<string> => {
  
  let info: any;
  try {
    const transporter: Transporter = createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT!),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    if (attachments) {
      const info = await transporter.sendMail({
        from: `KAIPTC Clearance System <${address}>`,
        to: recipient,
        subject: subject,
        text: message,
        html: html,
        attachments: [
          {
            filename: attachments.filename,
            path: attachments.path,
          },
        ],
      });
      return 'Message sent with attachment';
    } else {      
      info = await transporter.sendMail({
        from: `KAIPTC Clearance System <${address}>`,
        to: recipient,
        subject: subject,
        text: message,
        html: html,
      });
    }

    console.log('Message sent:', { messageId: info.messageId });
    return 'Message sent';
  } catch (e: any) {
    console.log('Error sending email:', { error: e });
    return e.message;
  }
};
