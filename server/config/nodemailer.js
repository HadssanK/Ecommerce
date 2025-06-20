import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // Use TLS
    auth: {
      user: '850582002@smtp-brevo.com' ,
      pass: 'V0xMLZYIEnTzsK9G'
    },
  
  });
export default transporter