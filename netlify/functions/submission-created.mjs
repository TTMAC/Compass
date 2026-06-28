// Netlify event-triggered function.
//
// Fires automatically AFTER a Netlify Forms submission passes spam filtering.
// We use it to sync newsletter subscribers into Resend: add the contact to a
// Resend audience and send a single-opt-in welcome email.
//
// Only the "subscribe" form is handled here — the "contact" form is ignored.
//
// Required environment variables (set in the Netlify dashboard, see README):
//   RESEND_API_KEY     — Resend API key (server-side secret)
//   RESEND_AUDIENCE_ID — ID of the Resend audience to add subscribers to
//   RESEND_FROM        — verified sender, e.g. "GovCompass <hello@govcompass.co.za>"
//   SITE_URL           — canonical site URL (already set per-branch in netlify.toml)

const RESEND_API = "https://api.resend.com";

export const handler = async (event) => {
  let payload;
  try {
    ({ payload } = JSON.parse(event.body));
  } catch {
    return { statusCode: 400, body: "Invalid submission payload" };
  }

  const formName = payload?.form_name;
  const email = (payload?.data?.email || payload?.email || "")
    .trim()
    .toLowerCase();

  // Only act on newsletter signups.
  if (formName !== "subscribe") {
    return { statusCode: 200, body: `Ignored form: ${formName}` };
  }

  if (!email || !email.includes("@")) {
    console.warn("submission-created: no valid email in payload");
    return { statusCode: 200, body: "No valid email; nothing to do" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  const from = process.env.RESEND_FROM;

  if (!apiKey || !audienceId) {
    console.error(
      "submission-created: RESEND_API_KEY or RESEND_AUDIENCE_ID not configured",
    );
    // Return 200 so Netlify doesn't retry; the submission is still stored.
    return {
      statusCode: 200,
      body: "Resend not configured; subscriber stored in Netlify only",
    };
  }

  const authHeaders = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };

  // 1. Add the contact to the Resend audience.
  let newlyAdded = false;
  try {
    const res = await fetch(`${RESEND_API}/audiences/${audienceId}/contacts`, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({ email, unsubscribed: false }),
    });

    if (res.ok) {
      newlyAdded = true;
      console.log(`submission-created: added ${email} to audience`);
    } else {
      // A 4xx here is most commonly "contact already exists" — treat as a
      // re-subscribe (don't re-send the welcome) rather than a failure.
      const body = await res.text();
      console.warn(
        `submission-created: add-contact returned ${res.status} for ${email}: ${body}`,
      );
    }
  } catch (err) {
    console.error("submission-created: add-contact failed", err);
  }

  // 2. Welcome email is ON HOLD. For now we only subscribe people — adding them
  //    to the Resend audience above — and do NOT send a welcome email (the
  //    sender domain govcompass.co.za is not yet verified in Resend). Set
  //    WELCOME_EMAIL_ON_HOLD to false to re-enable the welcome.
  const WELCOME_EMAIL_ON_HOLD = true;

  if (WELCOME_EMAIL_ON_HOLD) {
    if (newlyAdded) {
      console.log(
        `submission-created: welcome on hold; ${email} subscribed to audience only`,
      );
    }
  } else if (newlyAdded && from) {
    const siteUrl = process.env.SITE_URL || "https://govcompass.co.za";
    try {
      const res = await fetch(`${RESEND_API}/emails`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({
          from,
          to: [email],
          subject: "Welcome to GovCompass",
          html: welcomeHtml(siteUrl),
          text: welcomeText(siteUrl),
        }),
      });
      if (!res.ok) {
        const body = await res.text();
        console.warn(
          `submission-created: welcome email returned ${res.status} for ${email}: ${body}`,
        );
      } else {
        console.log(`submission-created: welcome email sent to ${email}`);
      }
    } catch (err) {
      console.error("submission-created: welcome email failed", err);
    }
  } else if (newlyAdded && !from) {
    console.warn(
      "submission-created: RESEND_FROM not set; skipping welcome email",
    );
  }

  return { statusCode: 200, body: "ok" };
};

function welcomeHtml(siteUrl) {
  return `<!doctype html>
<html lang="en-ZA">
  <body style="margin:0;padding:0;background:#f7f7f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#2a2a2a;">
    <div style="max-width:560px;margin:0 auto;padding:32px 24px;">
      <p style="font-size:20px;font-weight:700;color:#355E3B;margin:0 0 16px;">GovCompass</p>
      <p style="font-size:16px;line-height:1.6;margin:0 0 16px;">Thanks for subscribing.</p>
      <p style="font-size:16px;line-height:1.6;margin:0 0 16px;">
        You'll now get an email when a new article is published — clear, non-partisan
        explanations of how South Africa's government actually works, written for ordinary citizens.
      </p>
      <p style="font-size:16px;line-height:1.6;margin:0 0 24px;">
        While you wait, you can start reading at
        <a href="${siteUrl}" style="color:#355E3B;">${siteUrl.replace(/^https?:\/\//, "")}</a>.
      </p>
      <p style="font-size:13px;line-height:1.6;color:#6b6b6b;margin:0;">
        You're receiving this because you subscribed at ${siteUrl}.
        You can unsubscribe at any time using the link in any email we send.
      </p>
    </div>
  </body>
</html>`;
}

function welcomeText(siteUrl) {
  return [
    "GovCompass",
    "",
    "Thanks for subscribing.",
    "",
    "You'll now get an email when a new article is published — clear, non-partisan explanations of how South Africa's government actually works, written for ordinary citizens.",
    "",
    `While you wait, start reading at ${siteUrl}`,
    "",
    `You're receiving this because you subscribed at ${siteUrl}. You can unsubscribe at any time using the link in any email we send.`,
  ].join("\n");
}
