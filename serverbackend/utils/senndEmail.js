/**
 * Send OTP Email using Resend API
 */
export const sendOTPEmail = async (
  to,
  otp,
  purpose = "Password Reset"
) => {
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
        subject: `${purpose} OTP`,

        html: `
          <div style="font-family: Arial, sans-serif;">
            <h2>${purpose}</h2>

            <p>Your OTP is:</p>

            <h1 style="color: green;">${otp}</h1>

            <p>This OTP is valid for 10 minutes.</p>

            <p>Thank you,<br>PU Hostel Portal</p>
          </div>
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ RESEND ERROR:", data);
      throw new Error(data.message || "Email could not be sent");
    }

    console.log("✅ OTP sent to:", to);

    return data;

  } catch (error) {
    console.error("❌ EMAIL SEND ERROR:", error.message);
    throw new Error("Email could not be sent");
  }
};