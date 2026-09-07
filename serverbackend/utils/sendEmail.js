/**
 * Send OTP Email using Brevo API
 */
export const sendOTPEmail = async (to, otp) => {
  try {
    const response = await fetch(
      "https://api.brevo.com/v3/smtp/email",
      {
        method: "POST",

        headers: {
          accept: "application/json",
          "api-key": process.env.BREVO_API_KEY,
          "content-type": "application/json",
        },

        body: JSON.stringify({
          sender: {
            name:
              process.env.MAIL_FROM_NAME ||
              "PU Hostel",

            email: process.env.MAIL_FROM,
          },

          to: [
            {
              email: to,
            },
          ],

          subject: "Email Verification OTP",

          htmlContent: `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto;">

              <h2>Email Verification</h2>

              <p>Your OTP is:</p>

              <h1 style="color: green; letter-spacing: 5px;">
                ${otp}
              </h1>

              <p>
                This OTP is valid for 5 minutes.
              </p>

              <p>
                Thank you,<br>
                PU Hostel
              </p>

            </div>
          `,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ BREVO ERROR:", data);

      throw new Error(
        data.message || "Email sending failed"
      );
    }

    console.log("✅ OTP Email sent to:", to);
    console.log("📨 Brevo Message ID:", data.messageId);

    return data;

  } catch (error) {
    console.error("❌ EMAIL SEND ERROR:", error.message);
    throw error;
  }
};