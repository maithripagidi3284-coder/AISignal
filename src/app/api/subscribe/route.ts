import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { newsArticles } from "@/data/news";
import { products } from "@/data/products";
import { jobs } from "@/data/jobs";

const resend = new Resend(process.env.RESEND_API_KEY);

// ---------- helpers ----------

function getRandomItems<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function emailShell(innerContent: string): string {
  return `
    <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; background: #fff;">
      ${innerContent}
      <p style="color: #9ca3af; font-size: 12px; margin-top: 32px;">You're receiving this because you subscribed at GraphOne. <a href="#" style="color: #9ca3af;">Unsubscribe</a></p>
    </div>
  `;
}

// ---------- 1. Newsletter (real news.ts data) ----------

function buildNewsletterEmail() {
  const items = getRandomItems(newsArticles, 4);

  const listHtml = items
    .map(
      (a) => `
        <li style="margin-bottom: 10px;">
          <span style="margin-right: 6px;">${a.logo}</span>
          <strong style="color: #111;">${a.title}</strong><br/>
          <span style="color: #9ca3af; font-size: 11px;">${a.source} · ${a.timeAgo} · ${a.comments} comments</span>
        </li>
      `
    )
    .join("");

  const body = emailShell(`
    <div style="margin-bottom: 24px;">
      <span style="background: #fee2e2; color: #ef4444; font-size: 11px; font-weight: 700; letter-spacing: 2px; padding: 4px 10px; border-radius: 100px; text-transform: uppercase;">Live AI Intelligence</span>
    </div>
    <h1 style="font-size: 28px; font-weight: 800; color: #111; margin: 0 0 12px;">You're now part of the AI revolution. 🎉</h1>
    <p style="color: #6b7280; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
      Thanks for subscribing to <strong>GraphOne AI News</strong>. Here's what's happening right now:
    </p>
    <div style="background: #f9fafb; border-radius: 16px; padding: 20px; margin-bottom: 24px;">
      <p style="font-size: 13px; font-weight: 700; color: #111; margin: 0 0 12px;">🔥 Today's top stories:</p>
      <ul style="margin: 0; padding: 0 0 0 16px; color: #6b7280; font-size: 13px; line-height: 1.5;">
        ${listHtml}
      </ul>
    </div>
    <a href="https://graphone.ai/news" style="display: inline-block; background: #ef4444; color: #fff; font-size: 14px; font-weight: 700; padding: 12px 24px; border-radius: 100px; text-decoration: none;">Read Today's News →</a>
  `);

  return { subject: "🚀 Welcome to GraphOne AI News — You're in!", body };
}

// ---------- 2. Product Alert (real products.ts data) ----------

function buildProductAlertEmail() {
  const items = getRandomItems(products, 3);

  const listHtml = items
    .map(
      (p) => `
        <div style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 14px;">
          <span style="font-size: 20px;">${p.logo}</span>
          <div>
            <p style="margin: 0; font-weight: 700; color: #111; font-size: 14px;">
              ${p.name}
              ${p.badgeLabel ? `<span style="background:#fee2e2;color:#ef4444;font-size:10px;font-weight:700;padding:2px 8px;border-radius:100px;margin-left:6px;">${p.badgeLabel}</span>` : ""}
            </p>
            <p style="margin: 2px 0 0; color: #6b7280; font-size: 13px;">${p.desc}</p>
            <p style="margin: 4px 0 0; color: #9ca3af; font-size: 11px;">▲ ${p.votes.toLocaleString()} votes · ${p.category}</p>
          </div>
        </div>
      `
    )
    .join("");

  const body = emailShell(`
    <div style="margin-bottom: 24px;">
      <span style="background: #fee2e2; color: #ef4444; font-size: 11px; font-weight: 700; letter-spacing: 2px; padding: 4px 10px; border-radius: 100px; text-transform: uppercase;">Trending Products</span>
    </div>
    <h1 style="font-size: 28px; font-weight: 800; color: #111; margin: 0 0 12px;">Welcome! Here's what's hot in AI tools. 🚀</h1>
    <p style="color: #6b7280; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
      You're now subscribed to <strong>GraphOne Products</strong> — the AI tools everyone's talking about.
    </p>
    <div style="background: #f9fafb; border-radius: 16px; padding: 20px; margin-bottom: 24px;">
      ${listHtml}
    </div>
    <a href="https://graphone.ai/products" style="display: inline-block; background: #ef4444; color: #fff; font-size: 14px; font-weight: 700; padding: 12px 24px; border-radius: 100px; text-decoration: none;">Explore All Products →</a
  `);

  return { subject: "🛠️ Welcome to GraphOne Products — Trending AI tools inside", body };
}

// ---------- 3. Job Alert (real jobs.ts data) ----------

function buildJobAlertEmail() {
  const items = getRandomItems(jobs, 3);

  const listHtml = items
    .map(
      (j) => `
        <div style="margin-bottom: 14px; padding-bottom: 14px; border-bottom: 1px solid #f3f4f6;">
          <p style="margin: 0; font-weight: 700; color: #111; font-size: 14px;">${j.title}</p>
          <p style="margin: 2px 0 0; color: #6b7280; font-size: 13px;">${j.company} · ${j.location} · ${j.type}</p>
          <p style="margin: 4px 0 0; color: #9ca3af; font-size: 11px;">
            ${j.salary ?? ""}${j.equity ? ` · ${j.equity} equity` : ""} · ${j.postedAt}
          </p>
        </div>
      `
    )
    .join("");

  const body = emailShell(`
    <div style="margin-bottom: 24px;">
      <span style="background: #fee2e2; color: #ef4444; font-size: 11px; font-weight: 700; letter-spacing: 2px; padding: 4px 10px; border-radius: 100px; text-transform: uppercase;">New Job Alerts</span>
    </div>
    <h1 style="font-size: 28px; font-weight: 800; color: #111; margin: 0 0 12px;">Welcome! New AI roles are live. 💼</h1>
    <p style="color: #6b7280; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
      You're now subscribed to <strong>GraphOne Jobs</strong> — fresh roles from top AI companies, hand-picked for you.
    </p>
    <div style="background: #f9fafb; border-radius: 16px; padding: 20px; margin-bottom: 24px;">
      ${listHtml}
    </div>
    <a href="https://graphone.ai/jobs" style="display: inline-block; background: #ef4444; color: #fff; font-size: 14px; font-weight: 700; padding: 12px 24px; border-radius: 100px; text-decoration: none;">Browse All Jobs →</a>
  `);

  return { subject: "💼 Welcome to GraphOne Jobs — New AI roles inside", body };
}

// ---------- pick & send ----------

const ALERT_BUILDERS = [buildNewsletterEmail, buildProductAlertEmail, buildJobAlertEmail];

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Pick a random alert category, then build it from real data
    const builder = ALERT_BUILDERS[Math.floor(Math.random() * ALERT_BUILDERS.length)];
    const message = builder();

    const { data, error } = await resend.emails.send({
      from: "GraphOne AI News <onboarding@resend.dev>",
      to: [email],
      subject: message.subject,
      html: message.body,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Subscription error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}