import nodemailer from "nodemailer";
import { cookies} from "next/headers";

export async function sendConfirmationEmail({ to, name, date, time, bookingType }) {
  const cookieLocale = (await cookies()).get("MYMUSICCALENDARAPPMKDCHASOVI_LOCALE")?.value || "en";
  const locale = cookieLocale;

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
    console.log("tuke ideeeeeeee", locale);
    if (locale === "en") {
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
      subject = "🎶 Your Free Trial Lesson is Confirmed!";
      html = `
        <h2>Hallo ${displayName}! 🎵</h2>
        <p>Ihre kostenlose Probestunde wurde erfolgreich gebucht.</p>
        <p><strong>Date:</strong> ${date}<br/><strong>Zeit:</strong> ${time}</p>
        <p>We can't wait to meet you!</p>
        <hr/>
        <p>🎹 Das Team Ihrer Musikschule</p>
      `;
    }
  } else {
    // Customize based on package
    if (locale === "en") {
    let price = "";
    if (bookingType === "beginner package") price = "$20";
    if (bookingType === "standard package") price = "$30";
    if (bookingType === "advanced package") price = "$40";

    subject = `🎹 Deine ${bookingType} ist bestätigt – Zahlungsinformationen`;

    html = `
      <h2>Hallo ${displayName}! 🎶</h2>
      <p>Ihre <strong>${bookingType}</strong> Unterrichtseinheit wurde gebucht:</p>
      <p><strong>Date:</strong> ${date}<br/><strong>Zeit:</strong> ${time}</p>

      <h3>💳 Zahlung erforderlich</h3>
      <p>Bitte schließen Sie Ihre Buchung ab, indem Sie<strong>${price}</strong> per PayPal bezahlen.</p>
      <p><a href="https://paypal.me/YOUR_PAYPAL_LINK" target="_blank" style="background:#0070f3;color:white;padding:10px 20px;border-radius:5px;text-decoration:none;">Pay Now on PayPal</a></p>

      <h4>📝 Zahlungsschritte:</h4>
      <ol>
        <li>Klicken Sie oben auf die PayPal-Schaltfläche oder gehen Sie zu: <a href="https://paypal.me/YOUR_PAYPAL_LINK">paypal.me/YOUR_PAYPAL_LINK</a></li>
        <li>Geben Sie den Betrag ein: <strong>${price}</strong></li>
        <li>Fügen Sie eine Notiz mit Ihrem Namen und dem Unterrichtsdatum hinzu</li>
        <li>Senden Sie die Zahlung</li>
      </ol>

      <p>Wenn Sie Fragen haben, antworten Sie einfach auf diese E-Mail.</p>

      <hr/>
      <p>🎹 Vielen Dank, dass Sie sich für Your Music School entschieden haben!</p>
    `;
      
    } else {
      
    }
  }

  const mailOptions = {
    from: `"Your Music School" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
}

