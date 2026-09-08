'use client'

import { useState } from 'react'
import {
  ArrowUpRight,
  Bell,
  Check,
  ChevronDown,
  FileCheck2,
  FilePlus2,
  FileText,
  Layers3,
  Menu,
  MoreHorizontal,
  PencilLine,
  Plus,
  ReceiptText,
  Search,
  Send,
  Settings2,
  Sparkles,
  Stamp,
  WalletCards,
  X,
} from 'lucide-react'

const documentTypes = [
  { name: 'Invoice', description: 'Request a payment', icon: FileText, tone: 'coral' },
  { name: 'Receipt', description: 'Confirm a payment', icon: ReceiptText, tone: 'teal' },
  { name: 'Quotation', description: 'Share an estimate', icon: FileCheck2, tone: 'gold' },
  { name: 'Payment confirmation', description: 'Mark it paid', icon: WalletCards, tone: 'blue' },
  { name: 'Order confirmation', description: 'Lock in an order', icon: Stamp, tone: 'violet' },
  { name: 'Delivery note', description: 'Track a delivery', icon: Layers3, tone: 'lime' },
]

const recentDocuments = [
  { title: 'Invoice #INV-024', client: 'Aarong Interiors', amount: '৳ 48,500', type: 'Invoice', status: 'Sent', date: 'Today, 10:42 AM', initials: 'AI', color: 'coral' },
  { title: 'Receipt #REC-018', client: 'North End Coffee', amount: '৳ 12,800', type: 'Receipt', status: 'Paid', date: 'Yesterday, 4:18 PM', initials: 'NE', color: 'teal' },
  { title: 'Quote #QUO-009', client: 'Bengal Logistics', amount: '৳ 86,200', type: 'Quotation', status: 'Draft', date: 'Nov 24, 2024', initials: 'BL', color: 'gold' },
]

export default function Page() {
  const [selectedType, setSelectedType] = useState('Invoice')
  const [showMenu, setShowMenu] = useState(false)
  const [search, setSearch] = useState('')
  const selected = documentTypes.find((doc) => doc.name === selectedType) ?? documentTypes[0]
  const SelectedIcon = selected.icon

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="relative z-20 flex h-20 items-center justify-between border-b border-border/70 bg-background/75 px-5 backdrop-blur-xl sm:px-8 lg:px-12">
        <div className="flex items-center gap-3">
          <button className="icon-button lg:hidden" aria-label="Open navigation"><Menu size={19} /></button>
          <div className="brand-mark" aria-hidden="true"><span>K</span></div>
          <div className="flex items-baseline gap-2"><span className="font-serif text-[22px] font-semibold tracking-[-0.04em]">kagoj</span><span className="hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:inline">studio</span></div>
        </div>
        <div className="hidden items-center gap-1.5 rounded-full border border-border/70 bg-card/70 p-1 md:flex">
          <button className="top-nav-active">Workspace</button><button className="top-nav">Templates</button><button className="top-nav">Brand kit</button>
        </div>
        <div className="flex items-center gap-2">
          <button className="icon-button hidden sm:flex" aria-label="Notifications"><Bell size={18} /></button>
          <button className="avatar" aria-label="Open profile">RA</button>
          <button className="icon-button" aria-label="Open settings"><Settings2 size={18} /></button>
        </div>
      </header>

      <div className="relative z-10 mx-auto flex max-w-[1500px]">
        <aside className="hidden w-[228px] shrink-0 border-r border-border/60 px-5 py-8 lg:block">
          <div className="mb-8 flex items-center justify-between px-2"><span className="eyebrow">Your space</span><button className="text-muted-foreground transition-colors hover:text-foreground" aria-label="Add workspace"><Plus size={17} /></button></div>
          <nav className="space-y-1">
            <button className="side-link side-link-active"><FilePlus2 size={18} />Create new<span className="ml-auto rounded bg-primary px-1.5 py-0.5 font-mono text-[10px] text-primary-foreground">N</span></button>
            <button className="side-link"><FileText size={18} />All documents<span className="ml-auto text-xs text-muted-foreground">24</span></button>
            <button className="side-link"><Layers3 size={18} />Collections</button>
          </nav>
          <div className="my-8 border-t border-border/60" />
          <div className="px-2"><span className="eyebrow">Quick access</span></div>
          <nav className="mt-3 space-y-1"><button className="side-link"><Sparkles size={17} />Favourites</button><button className="side-link"><Send size={17} />Shared with me</button></nav>
          <div className="mt-24 rounded-2xl border border-border/70 bg-card/60 p-4 shadow-[0_12px_30px_-24px_var(--shadow)]"><div className="mb-3 flex items-center justify-between"><span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Free workspace</span><span className="h-2 w-2 rounded-full bg-teal" /></div><div className="mb-3 h-1 overflow-hidden rounded-full bg-muted"><div className="h-full w-[38%] rounded-full bg-teal" /></div><p className="text-xs leading-relaxed text-muted-foreground">9 of 25 documents created this month.</p></div>
        </aside>

        <section className="min-w-0 flex-1 px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
          <div className="mx-auto max-w-[1120px]">
            <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="eyebrow mb-3 text-coral">Saturday, 30 November 2024</p><h1 className="font-serif text-4xl font-medium tracking-[-0.055em] sm:text-5xl">Make it official<span className="text-coral">.</span></h1><p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">Create polished documents that make your business look as good as it works.</p></div><div className="flex items-center gap-2"><div className="search-field"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find a document" aria-label="Find a document" />{search && <button onClick={() => setSearch('')} aria-label="Clear search"><X size={14} /></button>}</div><button className="icon-button" aria-label="More options"><MoreHorizontal size={18} /></button></div></div>

            <div className="creation-zone mb-14"><div className="relative z-10 max-w-md"><div className="mb-5 inline-flex items-center gap-2 rounded-full border border-coral/25 bg-coral/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-coral"><Sparkles size={13} />Start with a document</div><h2 className="font-serif text-3xl font-medium tracking-[-0.045em] sm:text-4xl">What are we making<br />today?</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">Pick a format. We&apos;ll make it beautiful.</p><div className="mt-7 flex flex-wrap gap-2">{documentTypes.slice(0, 3).map((doc) => <button key={doc.name} onClick={() => setSelectedType(doc.name)} className={`type-pill ${selectedType === doc.name ? 'type-pill-active' : ''}`}><doc.icon size={15} />{doc.name}</button>)}<button onClick={() => setShowMenu(!showMenu)} className="type-pill"><Plus size={15} />More</button></div>{showMenu && <div className="more-menu">{documentTypes.slice(3).map((doc) => <button key={doc.name} onClick={() => { setSelectedType(doc.name); setShowMenu(false) }}><doc.icon size={15} />{doc.name}</button>)}</div>}</div><div className="document-stage" aria-label={`${selectedType} preview`}><div className="paper-shadow" /><div className="paper-sheet"><div className="paper-topline"><div className="mini-logo">K</div><span className="font-mono text-[7px] uppercase tracking-wider text-slate-400">{selectedType}</span></div><div className="mt-5 flex justify-between"><div><div className="h-1.5 w-16 rounded bg-slate-900" /><div className="mt-1.5 h-1 w-11 rounded bg-slate-200" /></div><div className="text-right"><div className="font-serif text-[12px] font-bold text-slate-800">৳ 48,500</div><div className="mt-1 text-[6px] text-slate-400">DUE 30 DEC 2024</div></div></div><div className="mt-8 space-y-2">{[1,2,3,4].map((line) => <div key={line} className="flex gap-3"><div className="h-1 flex-1 rounded bg-slate-100" /><div className="h-1 w-8 rounded bg-slate-100" /></div>)}</div><div className="mt-9 flex justify-end"><div className="h-1.5 w-20 rounded bg-coral/65" /></div><div className="mt-1.5 flex justify-end"><div className="h-1 w-12 rounded bg-slate-100" /></div></div><div className="paper-stamp"><Check size={12} />Ready to send</div></div><div className="absolute bottom-7 right-7 hidden items-center gap-2 text-xs text-muted-foreground sm:flex"><span className="h-2 w-2 rounded-full bg-teal" />Live preview</div></div>

            <div className="mb-5 flex items-center justify-between"><div><p className="eyebrow mb-2">Your activity</p><h2 className="font-serif text-2xl font-medium tracking-[-0.04em]">Recent documents</h2></div><button className="link-button">View all <ArrowUpRight size={15} /></button></div>
            <div className="document-list">{recentDocuments.filter((doc) => doc.title.toLowerCase().includes(search.toLowerCase()) || doc.client.toLowerCase().includes(search.toLowerCase())).map((doc) => <div className="document-row" key={doc.title}><div className={`doc-icon doc-icon-${doc.color}`}>{doc.initials}</div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="truncate text-sm font-semibold">{doc.title}</h3><span className={`status status-${doc.status.toLowerCase()}`}>{doc.status}</span></div><p className="mt-1 truncate text-xs text-muted-foreground">{doc.client} <span className="mx-1 text-border">•</span> {doc.date}</p></div><div className="hidden text-right sm:block"><p className="font-mono text-sm font-medium">{doc.amount}</p><p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">{doc.type}</p></div><button className="icon-button small-button" aria-label={`Edit ${doc.title}`}><PencilLine size={15} /></button></div>)}</div>
          </div>
        </section>
      </div>
    </main>
  )
}
