import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { plan, price, form, addons } = body;

    // Log to console for now (replace with email/CRM integration)
    console.log("=== NYTT SERVICEAVTAL ===");
    console.log(`Avtal: ${plan} — ${price} kr/mån`);
    console.log(`Kund: ${form.firstName} ${form.lastName}`);
    console.log(`E-post: ${form.email}`);
    console.log(`Telefon: ${form.phone}`);
    console.log(`Adress: ${form.address}, ${form.zip} ${form.city}`);
    if (form.spaModel) console.log(`Spa: ${form.spaModel}`);
    if (addons?.length) console.log(`Tillval: ${addons.join(", ")}`);
    if (form.notes) console.log(`Meddelande: ${form.notes}`);
    console.log("=========================");

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
