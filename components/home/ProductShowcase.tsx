"use client"

import { useEffect, useMemo, useState } from "react"

const logos = ["Facebook", "Instagram", "WhatsApp", "bKash", "Nagad", "Fiverr", "Upwork", "Shopify", "WordPress", "Webflow", "Vercel"]
const workflows = ["CREATE", "FILL", "CALCULATE", "CUSTOMIZE", "SAVE", "DOWNLOAD", "SHARE", "REUSE"]
const documentTypes = ["INVOICE", "RECEIPT", "PAYMENT CONFIRMATION", "QUOTATION", "ORDER CONFIRMATION", "DELIVERY NOTE"]

export function ProductShowcase() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => setStep((current) => (current + 1) % 8), 2100)
    return () => window.clearInterval(timer)
  }, [])

  const amount = useMemo(() => (step >= 2 ? "৳12,500" : "৳0"), [step])
  const status = step >= 3 ? "SAVED" : step >= 2 ? "CALCULATED" : "DRAFT"

  return (
    <section className="product-showcase" aria-label="How Kagoj helps you work">
      <div className="showcase-logos" aria-label="Works with your stack">
        {[...logos, ...logos].map((logo, index) => <span key={`${logo}-${index}`}><i className="logo-mark">{logo.slice(0, 1)}</i>{logo}<b>·</b></span>)}
      </div>
      <div className="showcase-grid">
        <div className="showcase-copy">
          <span className="showcase-kicker">ONE CLEAN WORKFLOW</span>
          <h2>From first line<br /><em>to paid.</em></h2>
          <p>One calm workspace for the documents that keep your business moving.</p>
          <div className="showcase-proof"><span>{String(step + 1).padStart(2, "0")}</span><div><strong>{workflows[step % workflows.length]}</strong><small>happening automatically</small></div></div>
        </div>
        <div className="showcase-demo" aria-live="polite">
          <div className="demo-window-bar"><span className="demo-dots"><i /><i /><i /></span><span>kagoj / instant invoice</span><b>{status}</b></div>
          <div className="demo-paper">
            <div className="demo-paper-head"><div><span className="demo-mini-label">FROM</span><strong>KAGOJ STUDIO</strong><small>Dhaka, Bangladesh</small></div><div className="demo-invoice-title"><span>INVOICE</span><strong>INV-0248</strong></div></div>
            <div className="demo-fields"><div><span>Bill to</span><strong>{step >= 1 ? "Rahman Traders" : "Who is this for?"}</strong></div><div><span>Date</span><strong>14 Sep 2026</strong></div></div>
            <div className="demo-table"><div className="demo-table-head"><span>Item</span><span>Qty</span><span>Amount</span></div><div className={`demo-row ${step >= 1 ? "filled" : ""}`}><span>{step >= 1 ? "Brand identity package" : "Description of item/service..."}</span><span>1</span><strong>{step >= 2 ? "৳12,500" : "৳0"}</strong></div><div className="demo-row muted"><span>{step >= 1 ? "Delivery and setup" : "Add another line"}</span><span>1</span><strong>৳0</strong></div></div>
            <div className="demo-total"><span>Total</span><strong>{amount}</strong></div>
            <div className="demo-action-row"><button className={step >= 3 ? "done" : ""}>{step >= 3 ? "Saved to workspace" : "Save & send"}</button><span>{step >= 4 ? "PDF ready · Share link ready" : "No clutter. No guessing."}</span></div>
          </div>
          <div className={`demo-share-card ${step >= 5 ? "visible" : ""}`}><span>SHARE LINK READY</span><strong>rahman-traders.kagoj.app</strong><button>Copy link</button></div>
        </div>
      </div>
      <div className="showcase-marquee workflow-marquee">{[...workflows, ...workflows].map((item, index) => <span key={`${item}-${index}`}>{item}<b>→</b></span>)}</div>
      <div className="showcase-marquee document-marquee">{[...documentTypes, ...documentTypes].map((item, index) => <span key={`${item}-${index}`}>{item}<b>|</b></span>)}</div>
      <style jsx>{`
        .product-showcase{position:relative;overflow:hidden;margin:48px -24px 0;padding:0 24px;background:linear-gradient(180deg,transparent 0,#f8f6f1 8%,#f8f6f1 92%,transparent)}.product-showcase:after{position:absolute;inset:0;z-index:2;pointer-events:none;background:linear-gradient(90deg,#f8f6f1 0,transparent 7%,transparent 93%,#f8f6f1 100%);content:""}
        .showcase-logos,.showcase-marquee{display:flex;width:max-content;white-space:nowrap}
        .showcase-logos{margin:0 auto 42px;gap:30px;animation:showcase-scroll 42s linear infinite;color:#6f7975;font:10px var(--font-mono);letter-spacing:.06em;text-transform:none}.showcase-logos span{display:flex;align-items:center;gap:8px}.showcase-logos b{margin-left:20px;color:#b7bfbb;font-weight:400}.logo-mark{display:grid;place-items:center;width:18px;height:18px;border:1px solid #bdc7c1;border-radius:50%;color:#53635d;font:10px var(--font-mono);font-style:normal}
        .showcase-grid{display:grid;grid-template-columns:minmax(220px,.72fr) minmax(430px,1.28fr);gap:56px;align-items:center;max-width:1080px;margin:auto}
        .showcase-copy{padding:20px 0}.showcase-kicker{color:#0b8f73;font:10px var(--font-mono);letter-spacing:.15em}.showcase-copy h2{margin:16px 0 14px;color:#192523;font:400 clamp(38px,5vw,68px) var(--font-serif);letter-spacing:-.055em;line-height:.92}.showcase-copy h2 em{color:#0b8f73;font-style:italic}.showcase-copy p{max-width:310px;color:#66716d;font-size:14px;line-height:1.6}.showcase-proof{display:flex;gap:13px;align-items:center;margin-top:32px}.showcase-proof>span{color:#0b8f73;font:12px var(--font-mono)}.showcase-proof div{display:grid;gap:3px;border-left:1px solid #b9cbc5;padding-left:13px}.showcase-proof strong{color:#1c3631;font:12px var(--font-mono);letter-spacing:.08em}.showcase-proof small{color:#84908b;font-size:11px}
        .showcase-demo{position:relative;min-height:440px;padding:12px;border:1px solid #dfe5e1;border-radius:15px;background:#eef2ef;box-shadow:0 28px 70px #17382b1c;transform:rotate(1.2deg)}.demo-window-bar{display:flex;align-items:center;gap:10px;padding:4px 6px 12px;color:#87928e;font:9px var(--font-mono);letter-spacing:.06em}.demo-window-bar>b{margin-left:auto;color:#0b8f73;font-size:8px}.demo-dots{display:flex;gap:4px}.demo-dots i{width:6px;height:6px;border-radius:50%;background:#ccd5d0}.demo-dots i:first-child{background:#e99b80}.demo-paper{padding:24px;background:#fff;border:1px solid #e0e5e2;box-shadow:0 12px 26px #17382b12}.demo-paper-head,.demo-fields,.demo-table-head,.demo-row,.demo-total,.demo-action-row{display:grid;grid-template-columns:1fr auto;gap:12px}.demo-paper-head{padding-bottom:26px;border-bottom:1px solid #e8ece9}.demo-paper-head strong,.demo-paper-head small{display:block}.demo-paper-head strong{color:#1b302c;font:700 13px var(--font-mono);letter-spacing:.08em}.demo-paper-head small{margin-top:6px;color:#7a8580;font-size:10px}.demo-mini-label,.demo-fields span,.demo-table-head,.demo-action-row span{color:#8b9691;font:9px var(--font-mono);letter-spacing:.08em;text-transform:uppercase}.demo-invoice-title{text-align:right}.demo-invoice-title span{display:block;color:#122d26;font:700 28px var(--font-mono);letter-spacing:-.08em}.demo-invoice-title strong{display:block;margin-top:7px;color:#83908a;font:10px var(--font-mono)}.demo-fields{grid-template-columns:1fr 1fr;padding:22px 0}.demo-fields div{display:grid;gap:5px}.demo-fields strong{color:#283b36;font-size:11px}.demo-table{border:1px solid #e4e9e6}.demo-table-head,.demo-row{grid-template-columns:1fr 48px 80px;padding:10px 12px}.demo-table-head{background:#152c2c;color:#dbe8e1}.demo-row{min-height:38px;border-top:1px solid #edf0ee;color:#63716a;font-size:10px}.demo-row strong{color:#263e37;font:11px var(--font-mono);text-align:right}.demo-row.muted{color:#aab4af}.demo-total{padding:20px 2px;color:#6c7872;font-size:11px}.demo-total strong{color:#153e34;font:700 18px var(--font-mono)}.demo-action-row{align-items:center;padding-top:12px;border-top:1px solid #dde5e0}.demo-action-row button,.demo-share-card button{border:0;border-radius:5px;background:#07966f;color:#fff;padding:9px 12px;font:10px var(--font-mono);cursor:pointer}.demo-action-row button.done{background:#173d35}.demo-share-card{position:absolute;right:-26px;bottom:26px;display:grid;gap:7px;width:180px;padding:14px;border:1px solid #cae5db;border-radius:9px;background:#f2fbf6;box-shadow:0 12px 24px #17382b1c;opacity:0;transform:translateY(8px);transition:.35s}.demo-share-card.visible{opacity:1;transform:none}.demo-share-card span{color:#0b8f73;font:8px var(--font-mono);letter-spacing:.1em}.demo-share-card strong{color:#254940;font:10px var(--font-mono)}.demo-share-card button{justify-self:start;padding:6px 8px;background:#d8eee5;color:#0b8068}
        .showcase-marquee{position:relative;z-index:1;gap:30px;padding:18px 0;margin-top:38px;animation:showcase-scroll 48s linear infinite;color:#6c7772;font:10px var(--font-mono);letter-spacing:.12em}.showcase-marquee span{display:flex;gap:30px;align-items:center}.showcase-marquee b{color:#a9b5af;font-weight:400}.workflow-marquee{margin-top:0;color:#365950;letter-spacing:.18em;animation-duration:54s}.document-marquee{margin-top:0;color:#7d8984;letter-spacing:.1em;animation-duration:58s}.document-marquee b{color:#b8c0bc}
        @keyframes showcase-scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @media(max-width:760px){.product-showcase{margin-inline:-14px;padding-inline:14px}.showcase-logos{margin-bottom:28px;gap:20px}.showcase-logos span{gap:20px}.showcase-grid{grid-template-columns:1fr;gap:22px}.showcase-copy{padding:8px 12px}.showcase-copy h2{font-size:48px}.showcase-demo{min-height:390px;transform:none}.demo-paper{padding:16px}.demo-invoice-title span{font-size:22px}.demo-table-head,.demo-row{grid-template-columns:1fr 34px 66px;padding:9px 8px}.demo-share-card{right:10px;bottom:16px}.showcase-marquee{margin-inline:-14px;padding-inline:14px}}
        @media(prefers-reduced-motion:reduce){.showcase-logos,.showcase-marquee{animation:none}.demo-share-card{transition:none}}
      `}</style>
    </section>
  )
}
