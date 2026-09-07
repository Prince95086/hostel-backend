// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "princeguraru9693@gmail.com", // your gmail
//     pass: "etzo iidc hfho pgun",         // Gmail APP PASSWORD
//   },
// });

// /**
//  * Send OTP Email
//  */
// export const sendOTPEmail = async (to, otp) => {
//   try {
//     await transporter.sendMail({
//       from: `"PU Hostel" <princeguraru9693@gmail.com>`, // ✅ FIXED
//       to,
//       subject: "Email Verification OTP",
//       html: `
//         <h2>Email Verification</h2>
//         <p>Your OTP is:</p>
//         <h1 style="color:green;">${otp}</h1>
//         <p>This OTP is valid for 5 minutes.</p>
//       `,
//     });

//     console.log("✅ OTP Email sent to:", to);
//   } catch (error) {
//     console.error("❌ EMAIL SEND ERROR:", error.message);
//     throw error;
//   }
// };


/**
 * Send OTP Email using Resend API
 */
/**
 * Send OTP Email using Resend API
 */

export const sendOTPEmail = async (to, otp) => {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",

      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        from: process.env.MAIL_FROM,
        to: [to],
        subject: "Email Verification OTP",

        html: `
          <div style="font-family: Arial, sans-serif;">
            <h2>Email Verification</h2>

            <p>Your OTP is:</p>

            <h1 style="color: green;">${otp}</h1>

            <p>This OTP is valid for 5 minutes.</p>

            <p>Thank you,<br>PU Hostel</p>
          </div>
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ RESEND ERROR:", data);
      throw new Error(data.message || "Email sending failed");
    }

    console.log("✅ OTP Email sent to:", to);

    return data;

  } catch (error) {
    console.error("❌ EMAIL SEND ERROR:", error.message);
    throw error;
  }
};