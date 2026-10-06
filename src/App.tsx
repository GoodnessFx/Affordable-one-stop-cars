import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, ArrowUp, BadgeCheck, Bot, Car, ChevronDown, CircleDollarSign,
  FileCheck2, Gauge, Gavel, Globe2, Menu, MessageCircle,
  PackageSearch, ReceiptText, ScanSearch, Search, ShieldCheck, Ship, Sparkles,
  X, Zap
} from "lucide-react";
import { FormEvent, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { benefits, cars, categories, countryOptions, faqs, heroSlides, ports, reviews, steps } from "./data";

const iconMap: Record<string, typeof Gavel> = { Gavel, ReceiptText, ScanSearch, Ship, MessageCircle };
const categoryIcons = [BadgeCheck, PackageSearch, Gavel, Zap, CircleDollarSign, Car, Sparkles];

const CAR_BRANDS = [
  { name: "Toyota",       logo: "https://cdn.simpleicons.org/toyota/111" },
  { name: "Honda",        logo: "https://cdn.simpleicons.org/honda/111" },
  { name: "Ford",         logo: "https://cdn.simpleicons.org/ford/111" },
  { name: "Mercedes",     logo: "https://cdn.simpleicons.org/mercedes/111" },
  { name: "BMW",          logo: "https://cdn.simpleicons.org/bmw/111" },
  { name: "Hyundai",      logo: "https://cdn.simpleicons.org/hyundai/111" },
  { name: "Nissan",       logo: "https://cdn.simpleicons.org/nissan/111" },
  { name: "Lexus",        logo: "https://cdn.simpleicons.org/lexus/111" },
  { name: "Chevrolet",    logo: "https://cdn.simpleicons.org/chevrolet/111" },
  { name: "Volkswagen",   logo: "https://cdn.simpleicons.org/volkswagen/111" },
  { name: "Kia",          logo: "https://cdn.simpleicons.org/kia/111" },
  { name: "Audi",         logo: "https://cdn.simpleicons.org/audi/111" },
  { name: "Jeep",         logo: "https://cdn.simpleicons.org/jeep/111" },
  { name: "Land Rover",   logo: "https://cdn.simpleicons.org/landrover/111" },
  { name: "Tesla",        logo: "https://cdn.simpleicons.org/tesla/111" },
  { name: "Dodge",        logo: "https://cdn.simpleicons.org/dodge/111" },
];

function Button({ children, variant = "primary", className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" | "accent" }) {
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
  const [show, setShow] = useState(() => sessionStorage.getItem("aosc-splash") !== "seen");
  useEffect(() => {
    if (!show) return;
    const timer = window.setTimeout(() => { sessionStorage.setItem("aosc-splash", "seen"); setShow(false); }, 1900);
    return () => window.clearTimeout(timer);
  }, [show]);
  return <AnimatePresence>{show && <motion.div className="splash" exit={{ y: "-100%" }} transition={{ duration: .55, ease: [0.76, 0, 0.24, 1] }}>
    <button className="splash-skip" onClick={() => setShow(false)}>Skip</button>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .55 }} className="splash-lockup">
      <strong>Affordable One Stop Cars</strong>
      <div className="splash-line"><motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: .4, duration: .75 }} /><motion.div initial={{ x: -120, opacity: 0 }} animate={{ x: 120, opacity: 1 }} transition={{ delay: .52, duration: .9 }}><Car size={20} /></motion.div></div>
    </motion.div>
  </motion.div>}</AnimatePresence>;
}

function Header() {
  const [mobile, setMobile] = useState(false);
  const links = [["Home", "home"], ["Inventory", "inventory"], ["How It Works", "process"], ["Shipping", "shipping"], ["Reviews", "reviews"], ["FAQ", "faq"], ["Contact", "contact"]];
  return <header className="site-header">
    <div className="nav-wrap">
      <a href="#home" className="wordmark" aria-label="Affordable One Stop Cars home"><span>AOSC</span><strong>Affordable<br />One Stop Cars</strong></a>
      <nav className="desktop-nav" aria-label="Primary navigation">{links.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
      <div className="nav-actions">
        <select aria-label="Language and currency" defaultValue="EN-USD"><option value="EN-USD">EN · USD</option><option value="FR-EUR">FR · EUR</option><option value="ES-USD">ES · USD</option></select>
        <Button variant="accent" onClick={() => document.querySelector("#contact")?.scrollIntoView()}>Contact Us</Button>
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

function Hero() {
  const [slide, setSlide] = useState(0);
  useEffect(() => { const id = setInterval(() => setSlide((value) => (value + 1) % heroSlides.length), 6000); return () => clearInterval(id); }, []);
  return <main id="home">
    <section className="hero shell" aria-label="Introduction">
      <div className="hero-frame">
        {heroSlides.map((item, index) => <img key={item.image} src={item.image} alt={item.alt} className={index === slide ? "active" : ""} fetchPriority={index === 0 ? "high" : "auto"} />)}
        <div className="hero-shade" />
        <div className="hero-content">
          <motion.span key={heroSlides[slide].eyebrow} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hero-eyebrow">{heroSlides[slide].eyebrow}</motion.span>
          <h1>Your car.<br />Straight from the USA<span style={{ color: "var(--red)" }}>.</span></h1>
          <p>We buy, ship and deliver US auction vehicles to over 100 countries.</p>
          <div className="hero-buttons"><Button variant="accent" onClick={() => document.querySelector("#contact")?.scrollIntoView()}>Contact Us <ArrowRight size={17} /></Button><Button variant="secondary" onClick={() => document.querySelector("#inventory")?.scrollIntoView()}>Browse Cars</Button></div>
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

function Process() {
  return <section id="process" className="section warm">
    <div className="shell"><SectionTitle eyebrow="A simpler way to import" title="From first estimate to your port." copy="One expert team coordinates the entire purchase, with clear updates at every milestone." />
      <div className="stepper">{steps.map(([title, copy], index) => <Reveal key={title} className={`step ${index === 0 ? "step-featured" : ""}`}>
        <div className="step-number">{String(index + 1).padStart(2, "0")}</div><div><h3>{title}</h3><p>{copy}</p>{index === 0 && <Button variant="ghost" onClick={() => document.querySelector("#contact")?.scrollIntoView()}>Start here <ArrowRight size={15} /></Button>}</div>
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
  const trackRef = useRef<HTMLDivElement>(null);
  return <section className="section warm">
    <div className="shell">
      <SectionTitle eyebrow="Why clients stay with us" title="Big logistics. Personal service." copy="Importing a vehicle should feel considered, transparent and calm." align="center" />
      <div className="benefit-track" ref={trackRef}>
        {benefits.map(([icon, title, copy]) => { const Icon = iconMap[icon]; return <div className="benefit-card" key={title}><Icon /><h3>{title}</h3><p>{copy}</p></div>; })}
      </div>
      <div className="stats">{[["3,200", "+", "Cars shipped"], ["100", "+", "Countries served"], ["12", "", "Years of experience"], ["2,700", "+", "Happy clients"]].map(([number, suffix, label]) => <div key={label}><strong>{number}<em>{suffix}</em></strong><span>{label}</span></div>)}</div>
    </div>
  </section>;
}

const PORT_COORDS: Record<string, [number, number]> = {
  "Lagos":       [6.455, 3.384],
  "Tema":        [5.618, -0.016],
  "Abidjan":     [5.345, -4.001],
  "Mombasa":     [-4.043, 39.668],
  "Durban":      [-29.858, 31.029],
  "Jebel Ali":   [24.988, 55.063],
  "Rotterdam":   [51.919, 4.482],
  "Bremerhaven": [53.55, 8.576],
  "Santos":      [-23.967, -46.333],
  "Kingston":    [17.994, -76.783],
};

const shipIcon = L.divIcon({
  className: "",
  html: `<div style="width:14px;height:14px;border-radius:50%;background:#d90429;border:2.5px solid white;box-shadow:0 2px 8px rgba(0,0,0,.45);"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
  popupAnchor: [0, -10],
});

function Shipping() {
  return <section id="shipping" className="section shipping-section">
    <div className="shell">
      <SectionTitle eyebrow="Worldwide shipping network" title="We deliver to ports across the globe." copy="From the US to your destination port — we handle every leg of the journey." />
      <div className="shipping-map-wrap">
        <MapContainer
          center={[20, 10]}
          zoom={2}
          minZoom={2}
          maxZoom={5}
          scrollWheelZoom={false}
          style={{ width: "100%", height: "420px", borderRadius: "16px", zIndex: 1 }}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution="&copy; OpenStreetMap &copy; CARTO"
          />
          {ports.map(([city, country, time]) => {
            const coords = PORT_COORDS[city as string];
            if (!coords) return null;
            return (
              <Marker key={city as string} position={coords} icon={shipIcon}>
                <Popup>
                  <strong style={{ fontFamily: "Manrope, sans-serif", fontSize: "13px" }}>{city as string}</strong><br />
                  <span style={{ fontSize: "11px", color: "#666" }}>{country as string}</span><br />
                  <span style={{ fontSize: "11px", color: "#b08d57", fontWeight: 700 }}>{time as string}</span>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
      <div className="port-list">{ports.map(([city, country, time, code]) => <div key={city}><span className="flag">{code}</span><div><strong>{city}</strong><small>{country}</small></div><span>{time}</span></div>)}</div>
    </div>
  </section>;
}

function BrandLogos() {
  const logos = [...CAR_BRANDS, ...CAR_BRANDS];
  return <section className="section warm">
    <div className="shell"><SectionTitle eyebrow="Search by marque" title="Buy cars" align="center" /></div>
    <div className="brand-ticker-wrap">
      <div className="brand-ticker">
        {logos.map((brand, i) => (
          <div className="brand-ticker-item" key={`${brand.name}-${i}`}>
            <img src={brand.logo} alt={brand.name} />
            <span>{brand.name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>;
}


function Reviews() {
  return <section id="reviews" className="section warm"><div className="shell"><SectionTitle eyebrow="Client stories" title="Trust, delivered." copy="From first-time buyers to established dealers, clear communication makes the difference." />
    <div className="review-grid">{reviews.map((review) => <article key={review.name} className="review-card"><div className="stars" aria-label="5 out of 5 stars">★★★★★</div><blockquote>"{review.quote}"</blockquote><div><span className="review-avatar">{review.name.split(" ").map((x) => x[0]).join("")}</span><p><strong>{review.name}</strong><small>{review.flag} {review.country} · {review.date}</small></p></div></article>)}</div>
  </div></section>;
}

function FAQ() {
  const [open, setOpen] = useState(0);
  const topFaqs = faqs.slice(0, 4);
  return <section id="faq" className="section warm"><div className="shell faq-layout"><SectionTitle eyebrow="Questions, answered" title="Everything you need to know before you bid." copy="Need more detail? Your vehicle specialist is one message away." /><div className="accordion">{topFaqs.map(([question, answer], index) => <div className="faq-item" key={question}><button aria-expanded={open === index} onClick={() => setOpen(open === index ? -1 : index)}><span>{question}</span><ChevronDown className={open === index ? "rotate" : ""} /></button><AnimatePresence initial={false}>{open === index && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}><p>{answer}</p></motion.div>}</AnimatePresence></div>)}</div></div></section>;
}

function CTA() {
  return <section className="cta-section"><div className="shell"><span className="eyebrow">Start your import</span><h2>Ready to import<br />your next car?</h2><p>A clear estimate is the best place to begin.</p><div><Button variant="accent" onClick={() => document.querySelector("#contact")?.scrollIntoView()}>Contact Us <ArrowRight size={17} /></Button><Button variant="secondary"><img src="/whatsapp.svg" alt="WhatsApp" className="whatsapp-icon" style={{ width: "20px", height: "20px" }} /> WhatsApp us</Button></div></div></section>;
}

function Footer() {
  const groups = [
    ["Car Search", "Clean-title cars", "Salvage vehicles", "Electric vehicles", "SUVs & trucks"],
    ["Help", "How it works", "Shipping", "Payment guide", "FAQs"],
    ["About", "Our company", "Client reviews", "Buying guides", "Contact"],
    ["Legal", "Privacy policy", "Terms of service", "Cookie policy", "Shipping terms"],
  ];
  return <footer id="contact"><div className="shell footer-main"><div className="footer-brand"><a className="wordmark light" href="#home"><span>AOSC</span><strong>Affordable<br />One Stop Cars</strong></a><p>Premium US auction access and vehicle export services for buyers in Nigeria, Ghana, the UAE, UK, Europe and beyond.</p></div>{groups.map(([heading, ...links]) => <div className="footer-col" key={heading}><strong>{heading}</strong>{links.map((link) => <a href="#" key={link}>{link}</a>)}</div>)}<div className="footer-col contact-col"><strong>Call Center</strong><a href="tel:+10000000000">+1 416.900.3303</a><a href="mailto:help@auctionexport.com">help@auctionexport.com</a><span>Mon-Fri 9:00am-6:00pm EST<br/>Sat 9:00am-4:00pm EST</span></div></div>
  <div className="footer-socials-row">
    <a href="#" aria-label="Telegram"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.892-.661 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg></a>
    <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.838 17.838H6.162V6.162h11.676v11.676zM12 8.76A3.24 3.24 0 1 0 15.24 12 3.244 3.244 0 0 0 12 8.76zm0 5.373a2.133 2.133 0 1 1 2.133-2.133A2.135 2.135 0 0 1 12 14.133zM15.42 7.82a.76.76 0 1 1 .76-.76.76.76 0 0 1-.76.76z"/></svg></a>
    <a href="#" aria-label="X"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.01 17.44h-2.13l-4.64-6.06-5.34 6.06H2.76l6.47-7.34L3.12 3.86h2.18l4.18 5.46 4.88-5.46h2.15l-6.02 6.83 6.52 6.75zm-3.4-1.39h1.18L7.33 5.12H6.07l9.54 10.93z"/></svg></a>
    <a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.666 15.86c-.15.564-.596 1.01-1.162 1.16-1.02.274-5.114.274-5.114.274s-4.095 0-5.114-.275a1.643 1.643 0 0 1-1.16-1.16C4.84 14.84 4.84 12 4.84 12s0-2.84.275-3.86a1.643 1.643 0 0 1 1.16-1.16c1.02-.275 5.115-.275 5.115-.275s4.094 0 5.114.275c.566.15 1.012.596 1.162 1.16.274 1.02.274 3.86.274 3.86s0 2.84-.274 3.86zM9.597 14.593v-5.18l4.52 2.59-4.52 2.59z"/></svg></a>
    <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm2.766 12h-1.63v6.75h-2.8V12H9.082v-2.38h1.254V8.04c0-1.242.758-1.92 1.868-1.92h1.15v2.29h-.72c-.544 0-.65.258-.65.637v1.18h1.42l-.187 2.38z"/></svg></a>
    <a href="#" aria-label="TikTok"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.276 10.743c-.45-.027-.91-.073-1.37-.184a4.57 4.57 0 0 1-1.914-.997v5.617c0 2.257-1.83 4.088-4.087 4.088-2.257 0-4.087-1.83-4.087-4.088 0-2.256 1.83-4.086 4.087-4.086.32 0 .633.037.933.107v2.443c-.29-.07-.604-.108-.933-.108-1.077 0-1.95.873-1.95 1.95 0 1.076.873 1.95 1.95 1.95s1.95-.874 1.95-1.95v-9.525h2.18c.046 1.15.548 2.185 1.345 2.923.633.586 1.464.966 2.386 1.03v2.835z"/></svg></a>
  </div>
<div className="shell footer-bottom"><span>Copyright © 2007-{new Date().getFullYear()} All Rights Reserved</span></div></footer>;
}

function FloatingTools() {
  const [chat, setChat] = useState(false);
  const [top, setTop] = useState(false);
  useEffect(() => { const listener = () => setTop(window.scrollY > 700); window.addEventListener("scroll", listener); return () => window.removeEventListener("scroll", listener); }, []);
  return <><div className="floating-tools">{top && <button aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><ArrowUp /></button>}<a className="whatsapp" href="#contact" aria-label="Contact on WhatsApp"><img src="/whatsapp.svg" alt="WhatsApp" style={{ width: "20px", height: "20px" }} /></a><button className="chat-toggle" aria-label="Open chat" onClick={() => setChat(!chat)}><Bot /><i /></button></div><AnimatePresence>{chat && <motion.div className="chat-panel" initial={{ opacity: 0, y: 16, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12 }}><div className="chat-head"><div><span className="online-dot" /><strong>Import concierge</strong></div><button onClick={() => setChat(false)} aria-label="Close chat"><X /></button></div><p>Welcome. What can we help you with?</p><a href="#contact">Contact an agent <ArrowRight /></a><a href="#shipping">How shipping works <ArrowRight /></a><a href="#contact">Talk to an agent on WhatsApp <ArrowRight /></a></motion.div>}</AnimatePresence></>;
}

function CookieNotice() {
  const [visible, setVisible] = useState(() => localStorage.getItem("aosc-cookie") !== "ok");
  if (!visible) return null;
  return <div className="cookie"><p>We use essential cookies to keep this site working smoothly.</p><button onClick={() => { localStorage.setItem("aosc-cookie", "ok"); setVisible(false); }}>Accept</button></div>;
}

function NotFound() {
  return <main className="not-found"><a href="/" className="wordmark"><span>AOSC</span><strong>Affordable<br />One Stop Cars</strong></a><div><span className="eyebrow">404 · Wrong turn</span><h1>This road does not go anywhere.</h1><p>The page may have moved, but your next car is still within reach.</p><a className="button button-primary" href="/">Return home <ArrowRight /></a></div></main>;
}

export default function App() {
  const validPath = useMemo(() => window.location.pathname === "/" || window.location.pathname === "", []);
  if (!validPath) return <NotFound />;
  return <><Splash /><Header /><Hero /><Categories /><Process /><Inventory /><WhyUs /><Shipping /><BrandLogos /><Reviews /><FAQ /><CTA /><Footer /><FloatingTools /><CookieNotice /></>;
}
