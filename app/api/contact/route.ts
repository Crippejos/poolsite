import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const { name, email, phone, subject, message } = await request.json();

  if (!name || !email || !message) {
    return Response.json({ error: "Namn, e-post och meddelande krävs." }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"${name}" <${process.env.SMTP_USER}>`,
    replyTo: email,
    to: process.env.CONTACT_EMAIL,
    subject: `Nytt meddelande från poolpro.se — ${subject || "Övrigt"}`,
    text: `Namn: ${name}\nE-post: ${email}\nTelefon: ${phone || "–"}\nÄrende: ${subject || "–"}\n\n${message}`,
    html: `
      <p><strong>Namn:</strong> ${name}</p>
      <p><strong>E-post:</strong> ${email}</p>
      <p><strong>Telefon:</strong> ${phone || "–"}</p>
      <p><strong>Ärende:</strong> ${subject || "–"}</p>
      <hr />
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
  });

  return Response.json({ ok: true });
}
