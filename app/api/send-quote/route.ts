import { NextResponse } from "next/server";

// Email sending disabled — re-enable by adding Resend integration here
export async function POST() {
  return NextResponse.json({ ok: true });
}
