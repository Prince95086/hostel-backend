/**
 * Send OTP Email using Brevo API
 */
export const sendOTPEmail = async (
  to,
  otp,
  purpose = "Password Reset"
) => {
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
              "PU Hostel Portal",

            email: process.env.MAIL_FROM,
          },

          to: [
            {
              email: to,
            },
          ],

          subject: `${purpose} OTP`,

          htmlContent: `
            <div style="
              font-family: Arial, sans-serif;
              max-width: 500px;
              margin: auto;
              padding: 20px;
            ">

              <h2>${purpose}</h2>

              <p>Your OTP is:</p>

              <h1 style="
                color: green;
                letter-spacing: 6px;
              ">
                ${otp}
              </h1>

              <p>
                This OTP is valid for 10 minutes.
              </p>

              <p>
                Thank you,<br>
                PU Hostel Portal
              </p>

            </div>
          `,
        }),
      }
    );

    const data = await response.json();

    // Brevo returned an error
    if (!response.ok) {
      console.error("❌ BREVO ERROR:", data);

      throw new Error(
        data.message || "Email could not be sent"
      );
    }

    console.log("✅ OTP sent to:", to);
    console.log("📨 Brevo Message ID:", data.messageId);

    return data;

  } catch (error) {
    console.error(
      "❌ EMAIL SEND ERROR:",
      error.message
    );

    throw new Error("Email could not be sent");
  }
};