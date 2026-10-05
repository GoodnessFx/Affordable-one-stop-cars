import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, ArrowUp, BadgeCheck, Bot, Camera, Car, ChevronDown, CircleDollarSign,
  FileCheck2, Gauge, Gavel, Globe2, Menu, MessageCircle,
  PackageSearch, Play, ReceiptText, ScanSearch, Search, ShieldCheck, Ship, Sparkles,
  Send, Video, X, Zap,
  Twitter, Facebook, Instagram, Linkedin, Youtube
} from "lucide-react";
import { FormEvent, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { benefits, brands, cars, categories, countryOptions, faqs, guides, heroSlides, ports, reviews, steps } from "./data";

const iconMap: Record<string, typeof Gavel> = { Gavel, ReceiptText, ScanSearch, Ship, MessageCircle };
const categoryIcons = [BadgeCheck, PackageSearch, Gavel, Zap, CircleDollarSign, Car, Sparkles];

function Button({ children, variant = "primary", className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" }) {
  return <button className={`button button-${variant} ${className}`} {...props}>{children}</button>;
}

function SectionTitle({ eyebrow, title, copy, align = "left" }: { eyebrow: string; title: string; copy?: string; align?: "left" | "center" }) {
  return <div className={`section-heading ${align === "center" ? "section-heading-center" : ""}`}>
    <span className="eyebrow">{eyebrow}</span>
    <h2>{title}</h2>
    {copy && <p>{copy}</p>}
  </div>;
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: .65, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function Splash() {
  const [show, setShow] = useState(() => sessionStorage.getItem("aoss-splash") !== "seen");
  useEffect(() => {
    if (!show) return;
    const timer = window.setTimeout(() => { sessionStorage.setItem("aoss-splash", "seen"); setShow(false); }, 1900);
    return () => window.clearTimeout(timer);
  }, [show]);
  return <AnimatePresence>{show && <motion.div className="splash" exit={{ y: "-100%" }} transition={{ duration: .55, ease: [0.76, 0, 0.24, 1] }}>
    <button className="splash-skip" onClick={() => setShow(false)}>Skip</button>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .55 }} className="splash-lockup">
      <strong>Affordable One Stop Shop</strong>
      <div className="splash-line"><motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: .4, duration: .75 }} /><motion.div initial={{ x: -120, opacity: 0 }} animate={{ x: 120, opacity: 1 }} transition={{ delay: .52, duration: .9 }}><Car size={20} /></motion.div></div>
    </motion.div>
  </motion.div>}</AnimatePresence>;
}

function Header({ openEstimate }: { openEstimate: () => void }) {
  const [mobile, setMobile] = useState(false);
  const links = [["Home", "home"], ["Inventory", "inventory"], ["How It Works", "process"], ["Shipping", "shipping"], ["Reviews", "reviews"], ["FAQ", "faq"], ["Contact", "contact"]];
  return <header className="site-header">
    <div className="nav-wrap">
      <a href="#home" className="wordmark" aria-label="Affordable One Stop Shop home"><span>AOSS</span><strong>Affordable<br />One Stop Shop</strong></a>
      <nav className="desktop-nav" aria-label="Primary navigation">{links.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
      <div className="nav-actions">
        <select aria-label="Language and currency" defaultValue="EN-USD"><option value="EN-USD">EN · USD</option><option value="FR-EUR">FR · EUR</option><option value="ES-USD">ES · USD</option></select>
        <Button onClick={openEstimate}>Get an Estimate</Button>
        <button className="menu-button" aria-label="Open menu" onClick={() => setMobile(!mobile)}>{mobile ? <X /> : <Menu />}</button>
      </div>
    </div>
    <AnimatePresence>{mobile && <motion.nav className="mobile-nav" initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}>{links.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMobile(false)}>{label}</a>)}</motion.nav>}</AnimatePresence>
  </header>;
}

function SearchPanel() {
  return <form className="search-panel" onSubmit={(e) => e.preventDefault()}>
    <label className="keyword-field"><Search size={18} /><input aria-label="Keyword lot or VIN" placeholder="Keyword, lot or VIN" /><span>Check a VIN</span></label>
    {["Make", "Model", "Year from", "Year to", "Min price", "Max price"].map((item) => <label key={item}><span>{item}</span><select aria-label={item}><option>Any</option></select></label>)}
    <Button type="submit"><Search size={17} /> Search</Button>
  </form>;
}

function Hero({ openEstimate }: { openEstimate: () => void }) {
  const [slide, setSlide] = useState(0);
  useEffect(() => { const id = setInterval(() => setSlide((value) => (value + 1) % heroSlides.length), 6000); return () => clearInterval(id); }, []);
  return <main id="home">
    <section className="hero shell" aria-label="Introduction">
      <div className="hero-frame">
        {heroSlides.map((item, index) => <img key={item.image} src={item.image} alt={item.alt} className={index === slide ? "active" : ""} fetchPriority={index === 0 ? "high" : "auto"} />)}
        <div className="hero-shade" />
        <div className="hero-content">
          <motion.span key={heroSlides[slide].eyebrow} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hero-eyebrow">{heroSlides[slide].eyebrow}</motion.span>
          <h1>Your car.<br />Straight from the USA.</h1>
          <p>We buy, ship and deliver US auction vehicles to over 100 countries.</p>
          <div className="hero-buttons"><Button onClick={openEstimate}>Get an Estimate <ArrowRight size={17} /></Button><Button variant="secondary" onClick={() => document.querySelector("#inventory")?.scrollIntoView()}>Browse Cars</Button></div>
        </div>
        <div className="slide-dots">{heroSlides.map((_, i) => <button key={i} aria-label={`View slide ${i + 1}`} className={i === slide ? "active" : ""} onClick={() => setSlide(i)} />)}</div>
      </div>
      <SearchPanel />
    </section>
    <div className="trustbar shell">
      {[[ShieldCheck, "Licensed US exporter"], [FileCheck2, "Secure payments"], [Ship, "Tracked shipping"], [ScanSearch, "Inspection reports"]].map(([Icon, text]) => {
        const TrustIcon = Icon as typeof ShieldCheck; return <div key={text as string}><TrustIcon size={18} /><span>{text as string}</span></div>;
      })}
    </div>
  </main>;
}

function Categories() {
  return <section className="categories shell" aria-label="Browse categories">{categories.map((category, index) => { const Icon = categoryIcons[index]; return <a href="#inventory" key={category}><Icon /><span>{category}</span></a>; })}</section>;
}

function Process({ openEstimate }: { openEstimate: () => void }) {
  return <section id="process" className="section warm">
    <div className="shell"><SectionTitle eyebrow="A simpler way to import" title="From first estimate to your port." copy="One expert team coordinates the entire purchase, with clear updates at every milestone." />
      <div className="stepper">{steps.map(([title, copy], index) => <Reveal key={title} className={`step ${index === 0 ? "step-featured" : ""}`}>
        <div className="step-number">{String(index + 1).padStart(2, "0")}</div><div><h3>{title}</h3><p>{copy}</p>{index === 0 && <Button variant="ghost" onClick={openEstimate}>Start here <ArrowRight size={15} /></Button>}</div>
      </Reveal>)}</div>
    </div>
  </section>;
}

function Inventory() {
  const scroller = useRef<HTMLDivElement>(null);
  const move = (direction: number) => scroller.current?.scrollBy({ left: direction * 370, behavior: "smooth" });
  return <section id="inventory" className="section">
    <div className="shell">
      <div className="title-row"><SectionTitle eyebrow="Curated opportunities" title="Hot lots, ready to move." copy="A sample of fresh wholesale and auction vehicles selected by our team." /><div className="carousel-actions"><button onClick={() => move(-1)} aria-label="Previous cars"><ArrowLeft /></button><button onClick={() => move(1)} aria-label="Next cars"><ArrowRight /></button></div></div>
      <div className="car-track" ref={scroller}>{cars.map((car) => <article className="car-card" key={car.name}>
        <div className="car-image"><img src={car.image} alt={`${car.year} ${car.name}`} loading="lazy" /><span className={`badge badge-${car.badge.toLowerCase().replace(" ", "")}`}>{car.badge}</span></div>
        <div className="car-body"><p className="sale-type">{car.sale}</p><h3>{car.year} {car.name}</h3><strong className="price">{car.price}</strong><div className="car-meta"><span><Gauge />{car.mileage}</span><span><BadgeCheck />{car.damage}</span><span><Globe2 />{car.location}</span></div><Button variant="secondary">View lot <ArrowRight size={15} /></Button></div>
      </article>)}</div>
      <a className="text-link" href="#inventory">View full inventory <ArrowRight size={15} /></a>
    </div>
  </section>;
}

function WhyUs() {
  return <section className="section warm">
    <div className="shell">
      <SectionTitle eyebrow="Why clients stay with us" title="Big logistics. Personal service." copy="Importing a vehicle should feel considered, transparent and calm." align="center" />
      <div className="benefit-grid">{benefits.map(([icon, title, copy]) => { const Icon = iconMap[icon]; return <Reveal className="benefit-card" key={title}><Icon /><h3>{title}</h3><p>{copy}</p></Reveal>; })}</div>
      <div className="stats">{[["3,200+", "Cars shipped"], ["100+", "Countries served"], ["12", "Years of experience"], ["2,700+", "Happy clients"]].map(([number, label]) => <div key={label}><strong>{number}</strong><span>{label}</span></div>)}</div>
    </div>
  </section>;
}

function Shipping() {
  return <section id="shipping" className="section shipping-section">
    <div className="shell">
      <SectionTitle eyebrow="Worldwide shipping network" title="From America’s auction lanes to your nearest port." copy="We consolidate the moving parts—vehicle release, inland trucking, export documents and ocean booking." />
      <div className="map-card">
        <div className="map-copy"><span className="eyebrow">Six US departure hubs</span><h3>Routes built around reliability, not guesswork.</h3><p>Savannah · Baltimore · Houston · New Jersey · Jacksonville · Los Angeles</p></div>
        <svg viewBox="0 0 1000 470" role="img" aria-label="Stylized world map showing vehicle shipping routes">
          <path className="land" d="M45 112l88-54 113 18 55 57-32 47-76 8-35 66-55-13-11-52-55-26zm258 211 62-24 41 34-8 83-34 47-32-42-16-55zm181-216 72-37 83 12 44 49-24 41-63-13-18 57-41 37-49-31-27-75zm112 174 42-47 80 20 46 72-26 67-82-6-41-48zm190-169 117 8 55 61-23 62-65 7-31-44-80 2-30-54z" />
          {[
            "M170 168 Q370 70 548 185", "M170 168 Q400 260 595 330", "M170 168 Q520 40 735 180",
            "M170 168 Q640 90 860 215", "M170 168 Q380 410 350 378", "M170 168 Q620 400 700 365",
          ].map((d, index) => <motion.path key={d} className="route" d={d} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.8, delay: index * .12 }} />)}
          {[[170,168,"USA"], [548,185,"Lagos"], [595,330,"Durban"], [735,180,"Dubai"], [860,215,"Mombasa"], [350,378,"Santos"], [700,365,"Tema"]].map(([x,y,label]) => <g key={label as string} className="port"><circle cx={x} cy={y} r="7" /><text x={Number(x)+12} y={Number(y)+4}>{label}</text></g>)}
        </svg>
      </div>
      <div className="port-list">{ports.map(([city, country, time, code]) => <div key={city}><span className="flag">{code}</span><div><strong>{city}</strong><small>{country}</small></div><span>{time}</span></div>)}</div>
    </div>
  </section>;
}

function Brands() {
  return <section className="section warm"><div className="shell"><SectionTitle eyebrow="Search by marque" title="The brands you trust." align="center" />
    <div className="brand-grid">{brands.map((brand) => <a href="#inventory" key={brand}><span>{brand === "Mercedes-Benz" ? "✦" : brand.slice(0, 2).toUpperCase()}</span><strong>{brand}</strong></a>)}</div>
    <div className="center"><Button variant="secondary">View all makes <ArrowRight size={16} /></Button></div>
  </div></section>;
}

function EstimateForm({ compact = false }: { compact?: boolean }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [price, setPrice] = useState(18000);
  const fees = Math.round(price * .08);
  const total = price + fees + 650 + 1450 + 900;
  const submit = (e: FormEvent) => { e.preventDefault(); if (step < 3) setStep(step + 1); else setSubmitted(true); };
  if (submitted) return <div className="success-state"><div><BadgeCheck /></div><span className="eyebrow">Request received</span><h3>We will send your estimate within 24 hours.</h3><p>Your vehicle specialist will review availability, shipping routes and current auction fees, then contact you directly.</p></div>;
  return <form className={`estimate-form ${compact ? "compact" : ""}`} onSubmit={submit}>
    <div className="form-progress"><span>Step {step} of 3</span><div><i style={{ width: `${step * 33.34}%` }} /></div></div>
    {step === 1 && <div className="form-fields"><label>Make<input required placeholder="e.g. Lexus" /></label><label>Model<input required placeholder="e.g. RX 350" /></label><label>Year<select><option>2022 or newer</option><option>2019–2021</option><option>2015–2018</option></select></label><label>Budget (USD)<input type="number" value={price} min="3000" onChange={(e) => setPrice(Number(e.target.value))} /></label></div>}
    {step === 2 && <div className="form-fields"><label>Destination country<select>{countryOptions.map((country) => <option key={country}>{country}</option>)}</select></label><label>Destination port<input required placeholder="e.g. Lagos" /></label><fieldset><legend>Preferred condition</legend><label className="radio"><input type="radio" name="condition" defaultChecked /> Clean title</label><label className="radio"><input type="radio" name="condition" /> Salvage</label></fieldset></div>}
    {step === 3 && <div className="form-fields"><label>Full name<input required placeholder="Your name" /></label><label>WhatsApp number<input required type="tel" placeholder="+1 000 000 0000" /></label><label>Email address<input required type="email" placeholder="you@email.com" /></label></div>}
    <div className="form-actions">{step > 1 && <Button type="button" variant="ghost" onClick={() => setStep(step - 1)}><ArrowLeft size={15} /> Back</Button>}<Button type="submit">{step === 3 ? "Request estimate" : "Continue"} <ArrowRight size={15} /></Button></div>
    {step === 1 && <div className="calculator"><span className="eyebrow">Approximate landed cost</span>{[["Car price", price], ["Auction fees", fees], ["Inland transport", 650], ["Ocean freight", 1450], ["Clearing estimate", 900]].map(([label, value]) => <div key={label}><span>{label}</span><strong>${Number(value).toLocaleString()}</strong></div>)}<div className="calculator-total"><span>Estimated total</span><strong>${total.toLocaleString()}</strong></div><small>Planning estimate only. Duties and route rates vary.</small></div>}
  </form>;
}

function EstimateSection() {
  return <section id="estimate" className="section estimate-section"><div className="shell estimate-layout"><div><SectionTitle eyebrow="Your numbers, before your bid" title="Plan the whole journey—not just the winning price." copy="Tell us what you are looking for. We will match the car, the auction and the best shipping route for your destination." /><ul className="check-list"><li><BadgeCheck /> No obligation</li><li><BadgeCheck /> Itemized fees</li><li><BadgeCheck /> Reply within 24 hours</li></ul></div><EstimateForm /></div></section>;
}

function Reviews() {
  return <section id="reviews" className="section warm"><div className="shell"><SectionTitle eyebrow="Client stories" title="Trust, delivered." copy="From first-time buyers to established dealers, clear communication makes the difference." />
    <div className="review-grid">{reviews.map((review) => <article key={review.name} className="review-card"><div className="stars" aria-label="5 out of 5 stars">★★★★★</div><blockquote>“{review.quote}”</blockquote><div><span className="review-avatar">{review.name.split(" ").map((x) => x[0]).join("")}</span><p><strong>{review.name}</strong><small>{review.flag} {review.country} · {review.date}</small></p></div></article>)}</div>
  </div></section>;
}

function Guides() {
  return <section className="section"><div className="shell"><SectionTitle eyebrow="The import journal" title="Buy with better information." />
    <div className="guide-grid">{guides.map((guide) => <article key={guide.title} className="guide-card"><img src={guide.image} alt="" loading="lazy" /><div><span>{guide.date}</span><h3>{guide.title}</h3><p>{guide.text}</p><a href="#contact">Read guide <ArrowRight size={14} /></a></div></article>)}</div>
  </div></section>;
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return <section id="faq" className="section warm"><div className="shell faq-layout"><SectionTitle eyebrow="Questions, answered" title="Everything you need to know before you bid." copy="Need more detail? Your vehicle specialist is one message away." /><div className="accordion">{faqs.map(([question, answer], index) => <div className="faq-item" key={question}><button aria-expanded={open === index} onClick={() => setOpen(open === index ? -1 : index)}><span>{question}</span><ChevronDown className={open === index ? "rotate" : ""} /></button><AnimatePresence initial={false}>{open === index && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}><p>{answer}</p></motion.div>}</AnimatePresence></div>)}</div></div></section>;
}

function CTA({ openEstimate }: { openEstimate: () => void }) {
  return <section className="cta-section"><div className="shell"><span className="eyebrow">Start your import</span><h2>Ready to import<br />your next car?</h2><p>A clear estimate is the best place to begin.</p><div><Button onClick={openEstimate}>Get an Estimate <ArrowRight size={17} /></Button><Button variant="secondary"><img src="/whatsapp.svg" alt="WhatsApp" className="whatsapp-icon" style={{ width: "20px", height: "20px" }} /> WhatsApp us</Button></div></div></section>;
}

function Footer() {
  const groups = [
    ["Car Search", "Clean-title cars", "Salvage vehicles", "Electric vehicles", "SUVs & trucks"],
    ["Help", "How it works", "Shipping", "Payment guide", "FAQs"],
    ["About", "Our company", "Client reviews", "Buying guides", "Contact"],
    ["Legal", "Privacy policy", "Terms of service", "Cookie policy", "Shipping terms"],
  ];
  return <footer id="contact"><div className="shell footer-main"><div className="footer-brand"><a className="wordmark light" href="#home"><span>AOSS</span><strong>Affordable<br />One Stop Shop</strong></a><p>Premium US auction access and vehicle export services for buyers in Nigeria, Ghana, the UAE, UK, Europe and beyond.</p><div className="socials">
  <a href="https://twitter.com/yourprofile" aria-label="Twitter"><Twitter /></a>
  <a href="https://facebook.com/yourpage" aria-label="Facebook"><Facebook /></a>
  <a href="https://instagram.com/yourprofile" aria-label="Instagram"><Instagram /></a>
  <a href="https://linkedin.com/company/yourcompany" aria-label="LinkedIn"><Linkedin /></a>
  <a href="https://youtube.com/channel/yourchannel" aria-label="YouTube"><Youtube /></a>
</div></div>{groups.map(([heading, ...links]) => <div className="footer-col" key={heading}><strong>{heading}</strong>{links.map((link) => <a href="#" key={link}>{link}</a>)}</div>)}<div className="footer-col contact-col"><strong>Contact</strong><a href="tel:+10000000000">+1 (000) 000-0000</a><a href="mailto:hello@affordableonestopshop.com">hello@affordableonestopshop.com</a><span>Mon–Fri · 9am–6pm EST</span><span>USA office address placeholder</span></div></div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} Affordable One Stop Shop. All rights reserved.</span><span>Licensed vehicle exporter · United States</span></div></footer>;
}

function FloatingTools({ openEstimate }: { openEstimate: () => void }) {
  const [chat, setChat] = useState(false);
  const [top, setTop] = useState(false);
  useEffect(() => { const listener = () => setTop(window.scrollY > 700); window.addEventListener("scroll", listener); return () => window.removeEventListener("scroll", listener); }, []);
  return <><div className="floating-tools">{top && <button aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><ArrowUp /></button>}<a className="whatsapp" href="#contact" aria-label="Contact on WhatsApp"><img src="/whatsapp.svg" alt="WhatsApp" style={{ width: "20px", height: "20px" }} /></a><button className="chat-toggle" aria-label="Open chat" onClick={() => setChat(!chat)}><Bot /><i /></button></div><AnimatePresence>{chat && <motion.div className="chat-panel" initial={{ opacity: 0, y: 16, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12 }}><div className="chat-head"><div><span className="online-dot" /><strong>Import concierge</strong></div><button onClick={() => setChat(false)} aria-label="Close chat"><X /></button></div><p>Welcome. What can we help you with?</p><button onClick={openEstimate}>Get an estimate <ArrowRight /></button><a href="#shipping">How shipping works <ArrowRight /></a><a href="#contact">Talk to an agent on WhatsApp <ArrowRight /></a></motion.div>}</AnimatePresence></>;
}

function CookieNotice() {
  const [visible, setVisible] = useState(() => localStorage.getItem("aoss-cookie") !== "ok");
  if (!visible) return null;
  return <div className="cookie"><p>We use essential cookies to keep this site working smoothly.</p><button onClick={() => { localStorage.setItem("aoss-cookie", "ok"); setVisible(false); }}>Accept</button></div>;
}

function NotFound() {
  return <main className="not-found"><a href="/" className="wordmark"><span>AOSS</span><strong>Affordable<br />One Stop Shop</strong></a><div><span className="eyebrow">404 · Wrong turn</span><h1>This road doesn’t go anywhere.</h1><p>The page may have moved, but your next car is still within reach.</p><a className="button button-primary" href="/">Return home <ArrowRight /></a></div></main>;
}

export default function App() {
  const [modal, setModal] = useState(false);
  const validPath = useMemo(() => window.location.pathname === "/" || window.location.pathname === "", []);
  useEffect(() => { document.body.style.overflow = modal ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [modal]);
  if (!validPath) return <NotFound />;
  const openEstimate = () => setModal(true);
  return <><Splash /><Header openEstimate={openEstimate} /><Hero openEstimate={openEstimate} /><Categories /><Process openEstimate={openEstimate} /><Inventory /><WhyUs /><Shipping /><Brands /><EstimateSection /><Reviews /><Guides /><FAQ /><CTA openEstimate={openEstimate} /><Footer /><FloatingTools openEstimate={openEstimate} /><CookieNotice />
    <AnimatePresence>{modal && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => { if (e.target === e.currentTarget) setModal(false); }}><motion.div role="dialog" aria-modal="true" aria-label="Get an estimate" className="modal" initial={{ opacity: 0, y: 20, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12 }}><div className="modal-header"><div><span className="eyebrow">Personal import plan</span><h2>Get your estimate.</h2></div><button aria-label="Close estimate form" onClick={() => setModal(false)}><X /></button></div><EstimateForm compact /></motion.div></motion.div>}</AnimatePresence>
  </>;
}
