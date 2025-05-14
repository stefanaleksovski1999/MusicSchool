import nodemailer from "nodemailer";

export async function sendConfirmationEmail({ to, name, date, time, bookingType }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let subject = "";
  let html = "";

  const displayName = name || "musician";

  if (bookingType === "free trial") {
    subject = "🎶 Your Free Trial Lesson is Confirmed!";
    html = `
      <h2>Hello ${displayName}! 🎵</h2>
      <p>Your free trial lesson has been successfully booked.</p>
      <p><strong>Date:</strong> ${date}<br/><strong>Time:</strong> ${time}</p>
      <p>We can't wait to meet you!</p>
      <hr/>
      <p>🎹 The Your Music School Team</p>
    `;
  } else {
    // Customize based on package
    let price = "";
    if (bookingType === "beginner package") price = "$20";
    if (bookingType === "standard package") price = "$30";
    if (bookingType === "advanced package") price = "$40";

    subject = `🎹 Your ${bookingType} is Confirmed – Payment Info`;

    html = `
      <h2>Hello ${displayName}! 🎶</h2>
      <p>Your <strong>${bookingType}</strong> lesson has been booked:</p>
      <p><strong>Date:</strong> ${date}<br/><strong>Time:</strong> ${time}</p>

      <h3>💳 Payment Required</h3>
      <p>Please complete your booking by paying <strong>${price}</strong> via PayPal.</p>
      <p><a href="https://paypal.me/YOUR_PAYPAL_LINK" target="_blank" style="background:#0070f3;color:white;padding:10px 20px;border-radius:5px;text-decoration:none;">Pay Now on PayPal</a></p>

      <h4>📝 Payment Steps:</h4>
      <ol>
        <li>Click the PayPal button above or go to: <a href="https://paypal.me/YOUR_PAYPAL_LINK">paypal.me/YOUR_PAYPAL_LINK</a></li>
        <li>Enter the amount: <strong>${price}</strong></li>
        <li>Add a note with your name and lesson date</li>
        <li>Send the payment</li>
      </ol>

      <p>If you have any questions, feel free to reply to this email.</p>

      <hr/>
      <p>🎹 Thank you for choosing Your Music School!</p>
    `;
  }

  const mailOptions = {
    from: `"Your Music School" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
}

