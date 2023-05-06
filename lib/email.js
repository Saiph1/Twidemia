import nodemailer from "nodemailer";

async function sendToken({ token }) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host:process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_FROM_EMAIL, // generated ethereal user
      pass: process.env.SMTP_PASSWORD, // generated ethereal password
    },
  });

  // set email content depending on email type
  let content = "";
  let subject = "";
  if (token.type == "forgot") {
    subject = "Twidemia Password Reset";
    content = `
      <p> Hello user: </p>
      <p> Your token is ${token.hash}</p>
      <p>To reset your password, please enter your token or follow this link: <a target="_" href=\"${process.env.DOMAIN}/reset/${token.hash}\"> ${process.env.DOMAIN}/reset/${token.hash} </a></p>
      <p>Cheers</p>
      <p>Twidemia Team</p>
    `;
  } else {
    subject = "Twidemia Email Verification";
    content = `
      <p> Hello user: </p>
      <p> Your token is ${token.hash}</p>
      <p>To verify your email, please enter your token or follow this link: <a target="_" href=\"${process.env.DOMAIN}/verify?token=${token.hash}\"> ${process.env.DOMAIN}/verify?token=${token.hash} </a></p>
      <p>Cheers</p>
      <p>Twidemia Team</p>
    `;
  }
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.SMTP_FROM_EMAIL, // sender address
    to: token.email, // list of receivers
    // to: "bot.twidemia@gmail.com", // sender address
    subject: subject, // Subject line
    // text: "", // plain text body
    html: content,
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

export default sendToken;
