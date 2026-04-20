// Sends the David's Hill brochure to a new prospect via Resend (through the Lovable connector gateway).
// Also persists the lead in `public.subscribers`.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";

const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

interface SubscribePayload {
  fullName?: unknown;
  phone?: unknown;
  email?: unknown;
  brochureUrl?: unknown;
}

function sanitize(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = (await req.json()) as SubscribePayload;
    const fullName = sanitize(body.fullName, 120);
    const phone = sanitize(body.phone, 30);
    const email = sanitize(body.email, 254).toLowerCase();
    const brochureUrl = sanitize(body.brochureUrl, 500);

    const errors: Record<string, string> = {};
    if (fullName.length < 2) errors.fullName = "Please enter your full name.";
    if (phone.length < 5) errors.phone = "Please enter a valid phone number.";
    if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email.";
    if (!brochureUrl.startsWith("http")) errors.brochureUrl = "Invalid brochure URL.";

    if (Object.keys(errors).length > 0) {
      return new Response(JSON.stringify({ ok: false, errors }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Persist lead
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const { error: insertError } = await supabase
      .from("subscribers")
      .insert({ full_name: fullName, phone, email });
    if (insertError) {
      console.error("Failed to insert subscriber", insertError);
    }

    // Send brochure email via Resend gateway
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    let emailSent = false;
    let emailError: string | null = null;

    if (LOVABLE_API_KEY && RESEND_API_KEY) {
      const safeName = escapeHtml(fullName);
      const safeUrl = escapeHtml(brochureUrl);
      const html = `<!doctype html>
<html><body style="margin:0;padding:0;background:#0a0a0a;font-family:Georgia,'Times New Roman',serif;color:#f5efe6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:32px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#111;border:1px solid #1f1f1f;border-radius:8px;overflow:hidden;">
        <tr><td style="background:#000;padding:28px 32px;border-bottom:2px solid #c8102e;">
          <div style="font-size:11px;letter-spacing:4px;color:#c8102e;text-transform:uppercase;">David&apos;s Hill</div>
          <div style="font-size:22px;color:#fff;margin-top:6px;">Luxury Living, Victoria Island</div>
        </td></tr>
        <tr><td style="padding:32px;">
          <p style="margin:0 0 16px;font-size:16px;color:#f5efe6;">Dear ${safeName},</p>
          <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#d6cfc2;">
            Thank you for your interest in <strong style="color:#fff;">David&apos;s Hill</strong> — a striking 8-storey
            residence on Ade Odedina Street, Victoria Island, comprised of 2 &amp; 3-bedroom apartments with BQ
            and a magnificent 4-bedroom penthouse.
          </p>
          <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#d6cfc2;">
            Your private brochure is attached below.
          </p>
          <p style="margin:0 0 32px;text-align:center;">
            <a href="${safeUrl}" style="display:inline-block;background:#c8102e;color:#fff;text-decoration:none;padding:14px 28px;font-size:14px;letter-spacing:2px;text-transform:uppercase;border-radius:2px;">Download Brochure</a>
          </p>
          <p style="margin:0;font-size:13px;line-height:1.6;color:#9c948a;">
            One of our advisors will reach out shortly to arrange a private viewing.
          </p>
        </td></tr>
        <tr><td style="padding:20px 32px;background:#000;border-top:1px solid #1f1f1f;font-size:12px;color:#7a7268;">
          David&apos;s Hill · 152B, Ade Odedina Street, Victoria Island, Lagos<br/>
          Developed by 360 Distinct Real Estate Ltd
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

      const text = `Dear ${fullName},

Thank you for your interest in David's Hill — a striking 8-storey residence on Ade Odedina Street, Victoria Island.

Download your brochure: ${brochureUrl}

One of our advisors will reach out shortly to arrange a private viewing.

— David's Hill
152B, Ade Odedina Street, Victoria Island, Lagos
Developed by 360 Distinct Real Estate Ltd`;

      const resp = await fetch(`${GATEWAY_URL}/emails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "X-Connection-Api-Key": RESEND_API_KEY,
        },
        body: JSON.stringify({
          from: "David's Hill <onboarding@resend.dev>",
          to: [email],
          subject: "Your David's Hill brochure",
          html,
          text,
        }),
      });

      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) {
        emailError = `Resend error [${resp.status}]: ${JSON.stringify(data)}`;
        console.error(emailError);
      } else {
        emailSent = true;
      }
    } else {
      emailError = "Email provider not configured";
      console.warn(emailError);
    }

    return new Response(
      JSON.stringify({ ok: true, emailSent, emailError }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("send-brochure failed", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ ok: false, error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
