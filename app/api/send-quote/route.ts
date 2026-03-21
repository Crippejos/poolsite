import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO   = "order@elitepoolochspa.se"; // update if needed
const FROM = "Elite Pool & Spa <noreply@elitepoolochspa.se>"; // must be verified in Resend

function fmt(n: number) { return n.toLocaleString("sv-SE") + " kr"; }

function row(label: string, value?: string | string[]) {
  if (!value || (Array.isArray(value) && !value.length)) return "";
  const v = Array.isArray(value) ? value.join(", ") : value;
  return `<tr><td style="padding:6px 0;color:#6b7280;font-size:13px;width:40%">${label}</td><td style="padding:6px 0;color:#111827;font-size:13px;font-weight:600">${v}</td></tr>`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { category, name, email, phone, location, message, price,
      poolType, poolSize, poolShape, poolFeatures,
      spadbadType, spadbadSize, spadbadPlacement, spadbadFeatures,
      heServices, projectSize, budgetRange,
      serviceType, currentProduct, issueDescription, preferredDate,
      siteDescription, timeline } = body;

    const catLabel: Record<string, string> = {
      pool: "Pool", spabad: "Spabad", helentreprenad: "Helentreprenad", renovering: "Renovering & Service",
    };

    const priceHtml = price
      ? `<div style="background:#f9fafb;border-radius:12px;padding:16px 20px;margin:16px 0">
           <div style="color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">Estimerat prisintervall</div>
           <div style="color:#111827;font-size:22px;font-weight:900">${fmt(price.min)} – ${fmt(price.max)}</div>
         </div>` : "";

    const detailsHtml = `<table style="width:100%;border-collapse:collapse">
      ${row("Kategori", catLabel[category])}
      ${row("Pooltyp", poolType)}
      ${row("Poolstorlek", poolSize === "small" ? "Liten (upp till 20 m²)" : poolSize === "medium" ? "Medel (20–40 m²)" : poolSize === "large" ? "Stor (40 m²+)" : "")}
      ${row("Poolform", poolShape)}
      ${row("Pool-tillval", poolFeatures)}
      ${row("Spa-typ", spadbadType)}
      ${row("Spa-storlek", spadbadSize)}
      ${row("Spa-placering", spadbadPlacement)}
      ${row("Spa-tillval", spadbadFeatures)}
      ${row("Helentreprenad-tjänster", heServices)}
      ${row("Projektstorlek", projectSize)}
      ${row("Budget", budgetRange)}
      ${row("Servicetyp", serviceType)}
      ${row("Befintlig pool/spa", currentProduct)}
      ${row("Problembeskrivning", issueDescription)}
      ${row("Önskat datum", preferredDate)}
      ${row("Platsbeskrivning", siteDescription)}
      ${row("Tidslinje", timeline)}
      ${row("Ort/Postnummer", location)}
      ${row("Meddelande", message)}
    </table>`;

    const timestamp = new Date().toLocaleString("sv-SE", { timeZone: "Europe/Stockholm" });

    const adminHtml = `
    <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#0f172a;border-radius:16px 16px 0 0;padding:24px 28px">
        <p style="color:#94a3b8;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;margin:0 0 4px">Elite Pool & Spa</p>
        <h1 style="color:#fff;font-size:22px;font-weight:900;margin:0">Ny offertförfrågan</h1>
        <p style="color:#64748b;font-size:13px;margin:4px 0 0">${timestamp}</p>
      </div>
      <div style="background:#fff;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 16px 16px;padding:28px">
        <div style="background:#f8fafc;border-radius:12px;padding:16px 20px;margin-bottom:20px">
          <p style="margin:0;font-size:18px;font-weight:900;color:#111827">${name}</p>
          <p style="margin:4px 0 0;font-size:13px;color:#6b7280">${email} · ${phone}</p>
        </div>
        ${priceHtml}
        <h2 style="font-size:13px;font-weight:700;color:#374151;text-transform:uppercase;letter-spacing:0.08em;margin:20px 0 8px">Projektdetaljer</h2>
        ${detailsHtml}
      </div>
    </div>`;

    const confirmHtml = `
    <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto">
      <div style="background:#0f172a;border-radius:16px 16px 0 0;padding:24px 28px">
        <h1 style="color:#fff;font-size:20px;font-weight:900;margin:0">Tack för din förfrågan!</h1>
      </div>
      <div style="background:#fff;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 16px 16px;padding:28px">
        <p style="color:#374151;font-size:15px">Hej ${name.split(" ")[0]},</p>
        <p style="color:#6b7280;font-size:14px;line-height:1.6">
          Vi har mottagit din offertförfrågan för <strong style="color:#111827">${catLabel[category]}</strong> och återkommer
          till dig inom <strong style="color:#111827">24 timmar</strong> på vardagar.
        </p>
        ${priceHtml}
        <p style="color:#6b7280;font-size:13px;line-height:1.6;margin-top:20px">
          Slutpriset beror på platsförhållanden och slutgiltiga specifikationer. Uppskattningen ovan är vägledande.
        </p>
        <div style="margin-top:24px;padding-top:20px;border-top:1px solid #f3f4f6;color:#9ca3af;font-size:12px">
          Elite Pool & Spa · Hålluddsvägen 14, 134 40 Gustavsberg · 0708-22 48 00
        </div>
      </div>
    </div>`;

    await Promise.all([
      resend.emails.send({
        from: FROM, to: TO,
        subject: `Ny offertförfrågan — ${catLabel[category]} — ${name}`,
        html: adminHtml,
      }),
      resend.emails.send({
        from: FROM, to: email,
        subject: `Vi har mottagit din förfrågan — Elite Pool & Spa`,
        html: confirmHtml,
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("send-quote error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
