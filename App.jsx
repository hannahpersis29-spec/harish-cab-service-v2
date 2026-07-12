import React, { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  Phone,
  MessageCircle,
  MapPin,
  Calendar,
  Clock,
  ShieldCheck,
  Sparkles,
  Star,
  Mail,
  Send,
  Facebook,
  Instagram,
  Twitter,
  Plane,
  Building2,
  Route as RouteIcon,
  Briefcase,
  RefreshCw,
  Compass,
  Check,
  Users,
  Luggage,
  Snowflake,
  ChevronDown,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  CONFIG — replace these with the real business details before      */
/*  deploying to harishcabservice.com                                  */
/* ------------------------------------------------------------------ */
const PHONE_DISPLAY = "+91 90000 00000";
const PHONE_TEL = "+919000000000";
const WHATSAPP_NUMBER = "919000000000"; // digits only, country code first

/* ------------------------------------------------------------------ */
/*  Small utility: fade-up reveal on scroll                            */
/* ------------------------------------------------------------------ */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Decorative route-line SVG — the signature motif of the design      */
/*  (a dashed journey line linking a pickup pin to a drop pin)         */
/* ------------------------------------------------------------------ */
function RoutePath({ className = "" }) {
  return (
    <svg
      viewBox="0 0 600 400"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M40 340 C 160 340, 140 140, 280 140 S 420 40, 560 60"
        stroke="#FF8A00"
        strokeWidth="2.5"
        strokeDasharray="2 12"
        strokeLinecap="round"
        style={{
          strokeDashoffset: 0,
          animation: "dash 6s linear infinite",
        }}
      />
      <circle cx="40" cy="340" r="7" fill="#0F2B5B" />
      <circle cx="40" cy="340" r="12" stroke="#0F2B5B" strokeOpacity="0.3" strokeWidth="1.5" />
      <circle cx="560" cy="60" r="7" fill="#FF8A00" />
      <circle cx="560" cy="60" r="12" stroke="#FF8A00" strokeOpacity="0.3" strokeWidth="1.5" />
      <style>{`
        @keyframes dash {
          to { stroke-dashoffset: -140; }
        }
      `}</style>
    </svg>
  );
}

/* Simple line-art side-view car icon used across fleet cards */
function CarIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 120 60" fill="none" className={className}>
      <path
        d="M10 42 L16 24 C18 18 24 14 30 14 H78 C86 14 93 18 97 25 L104 42"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M4 42 H112 V48 C112 50.2 110.2 52 108 52 H8 C5.8 52 4 50.2 4 48 Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <circle cx="30" cy="48" r="8" stroke="currentColor" strokeWidth="2.5" fill="white" />
      <circle cx="90" cy="48" r="8" stroke="currentColor" strokeWidth="2.5" fill="white" />
      <path d="M30 24 L36 15 M78 15 L86 24" stroke="currentColor" strokeWidth="2.5" />
      <line x1="55" y1="14" x2="55" y2="42" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const SERVICES = [
  { icon: Plane, title: "Airport Pickup & Drop", desc: "On-time transfers with flight tracking, so a delayed flight never means a missed ride." },
  { icon: Compass, title: "Local City Rides", desc: "Hourly or point-to-point rides around town for errands, meetings and days out." },
  { icon: RouteIcon, title: "Outstation Trips", desc: "Comfortable long-distance travel between cities, with an experienced highway driver." },
  { icon: MapPin, title: "One Way Taxi", desc: "Pay only for the distance you travel — no return fare, no hidden charges." },
  { icon: RefreshCw, title: "Round Trip Taxi", desc: "Book the same cab for your onward and return journey at a better combined fare." },
  { icon: Briefcase, title: "Corporate Travel", desc: "Reliable rides for teams and executives, with monthly billing available." },
  { icon: Sparkles, title: "Tourist Packages", desc: "Curated multi-day itineraries with a driver who knows the region well." },
  { icon: Clock, title: "24×7 Taxi Service", desc: "A cab whenever you need one — early flights and late-night pickups included." },
];

const FEATURES = [
  { icon: ShieldCheck, title: "Professional Drivers", desc: "Verified, licensed and trained for courteous, safe driving." },
  { icon: Sparkles, title: "Clean Vehicles", desc: "Sanitised and inspected before every single trip." },
  { icon: Clock, title: "On-Time Pickup", desc: "We track your schedule so your driver is always waiting." },
  { icon: Check, title: "Transparent Pricing", desc: "The fare you're quoted is the fare you pay. No surprises." },
  { icon: ShieldCheck, title: "Safe Journey", desc: "GPS-tracked rides with 24×7 support on every trip." },
  { icon: Phone, title: "24/7 Support", desc: "Reach a real person, any hour, any day of the year." },
];

const FLEET = [
  { name: "Swift Dzire", seats: "4 Passengers", luggage: "2 Bags", tag: "Sedan · Economy" },
  { name: "Maruti Ertiga", seats: "6 Passengers", luggage: "3 Bags", tag: "MUV · Family" },
  { name: "Toyota Innova Crysta", seats: "6–7 Passengers", luggage: "4 Bags", tag: "Premium SUV" },
  { name: "Tempo Traveller", seats: "12–17 Passengers", luggage: "Large Capacity", tag: "Group Travel" },
];

const REVIEWS = [
  { name: "Ananya Rao", trip: "Airport Transfer", rating: 5, text: "Driver was waiting exactly on time despite my flight landing early. Clean car and a genuinely smooth ride into the city." },
  { name: "Vikram Shetty", trip: "Outstation Trip", rating: 5, text: "Booked a two-day outstation trip for the family. The driver was patient, careful on the ghats, and the fare matched the quote exactly." },
  { name: "Priya Menon", trip: "Corporate Travel", rating: 5, text: "We use Harish Cab Service for all client pickups now. Professional, always on schedule, and billing is refreshingly simple." },
  { name: "Farhan Khan", trip: "Local City Ride", rating: 4, text: "Quick booking on WhatsApp and the car arrived in under ten minutes. Would happily book again for daily commutes." },
];

const FAQS = [
  { q: "How do I book a taxi with Harish Cab Service?", a: "Use the booking form on this page, call us directly, or send your trip details on WhatsApp. You'll get a confirmed driver and fare before the trip starts." },
  { q: "Are your fares fixed or metered?", a: "Fares are fixed and shared with you upfront based on your route and vehicle choice, so there are no surprises at the end of the trip." },
  { q: "Can I cancel or reschedule a booking?", a: "Yes. You can reschedule or cancel free of charge up to a few hours before pickup — just call or message us and we'll adjust it." },
  { q: "Do outstation trips include driver allowance and toll?", a: "Outstation quotes are all-inclusive of driver allowance, tolls and state permit charges unless stated otherwise at booking." },
  { q: "What payment methods do you accept?", a: "We accept cash, UPI, and all major cards, both at the end of your trip and in advance for corporate accounts." },
  { q: "Are your drivers verified?", a: "Every driver is background-verified, licensed, and trained on customer service before they're allowed on the road for us." },
];

const TRIP_TYPES = ["Airport Transfer", "Local City Ride", "Outstation Trip", "Corporate Travel", "Round Trip"];
const VEHICLE_TYPES = ["Swift Dzire", "Maruti Ertiga", "Toyota Innova Crysta", "Tempo Traveller", "Not Sure Yet"];

/* ------------------------------------------------------------------ */
/*  Booking form (shared shape used in hero)                          */
/* ------------------------------------------------------------------ */
function BookingForm({ compact = false }) {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", pickup: "", drop: "",
    date: "", time: "", tripType: TRIP_TYPES[0], vehicle: VEHICLE_TYPES[0], notes: "",
  });
  const [confirmed, setConfirmed] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const requiredFilled = form.name && form.phone && form.pickup && form.drop;

  const buildMessage = () =>
    `New booking request%0A` +
    `Name: ${form.name}%0A` +
    `Phone: ${form.phone}%0A` +
    (form.email ? `Email: ${form.email}%0A` : "") +
    `Pickup: ${form.pickup}%0A` +
    `Drop: ${form.drop}%0A` +
    (form.date ? `Date: ${form.date}%0A` : "") +
    (form.time ? `Time: ${form.time}%0A` : "") +
    `Trip Type: ${form.tripType}%0A` +
    `Vehicle: ${form.vehicle}%0A` +
    (form.notes ? `Notes: ${form.notes}` : "");

  const handleBookNow = (e) => {
    e.preventDefault();
    if (!requiredFilled) return;
    setConfirmed(true);
    setTimeout(() => setConfirmed(false), 4500);
  };

  const handleWhatsApp = () => {
    if (!requiredFilled) return;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${buildMessage()}`, "_blank");
  };

  const inputCls =
    "w-full rounded-xl border border-navy/10 bg-white/70 px-4 py-3 text-sm text-navy placeholder:text-navy/40 outline-none focus:border-orange focus:ring-2 focus:ring-orange/30 transition";

  return (
    <form onSubmit={handleBookNow} className="relative">
      {/* perforation row — the "ticket stub" signature detail */}
      {!compact && (
        <div className="absolute -left-5 top-0 bottom-0 hidden md:flex flex-col justify-between py-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} className="h-2.5 w-2.5 rounded-full bg-white" />
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input required placeholder="Full Name" value={form.name} onChange={update("name")} className={inputCls} />
        <input required placeholder="Phone Number" value={form.phone} onChange={update("phone")} className={inputCls} />
        <input placeholder="Email (optional)" value={form.email} onChange={update("email")} className={`${inputCls} sm:col-span-2`} />
        <div className="relative sm:col-span-2">
          <MapPin className="absolute left-4 top-3.5 h-4 w-4 text-orange" />
          <input required placeholder="Pickup Location" value={form.pickup} onChange={update("pickup")} className={`${inputCls} pl-10`} />
        </div>
        <div className="relative sm:col-span-2">
          <MapPin className="absolute left-4 top-3.5 h-4 w-4 text-navy" />
          <input required placeholder="Drop Location" value={form.drop} onChange={update("drop")} className={`${inputCls} pl-10`} />
        </div>
        <div className="relative">
          <Calendar className="absolute left-4 top-3.5 h-4 w-4 text-navy/50" />
          <input type="date" value={form.date} onChange={update("date")} className={`${inputCls} pl-10`} />
        </div>
        <div className="relative">
          <Clock className="absolute left-4 top-3.5 h-4 w-4 text-navy/50" />
          <input type="time" value={form.time} onChange={update("time")} className={`${inputCls} pl-10`} />
        </div>
        <select value={form.tripType} onChange={update("tripType")} className={inputCls}>
          {TRIP_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
        <select value={form.vehicle} onChange={update("vehicle")} className={inputCls}>
          {VEHICLE_TYPES.map((v) => <option key={v}>{v}</option>)}
        </select>
        <textarea
          placeholder="Special Instructions (child seat, extra luggage, etc.)"
          value={form.notes}
          onChange={update("notes")}
          rows={2}
          className={`${inputCls} sm:col-span-2 resize-none`}
        />
      </div>

      {!requiredFilled && (
        <p className="mt-2 text-xs text-navy/40">Name, phone, pickup and drop are required.</p>
      )}

      {confirmed && (
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-orange/10 border border-orange/30 px-4 py-2.5 text-sm text-navy">
          <Check className="h-4 w-4 text-orange shrink-0" />
          Request received — we'll call {form.phone} shortly to confirm your ride.
        </div>
      )}

      <div className="mt-4 flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          className="flex-1 rounded-xl bg-navy text-white font-semibold py-3.5 text-sm tracking-wide hover:bg-navy-deep active:scale-[0.98] transition shadow-card"
        >
          Book Now
        </button>
        <button
          type="button"
          onClick={handleWhatsApp}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#25D366] text-white font-semibold py-3.5 text-sm tracking-wide hover:brightness-95 active:scale-[0.98] transition shadow-card"
        >
          <MessageCircle className="h-4 w-4" /> Book on WhatsApp
        </button>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/*  Main App                                                          */
/* ------------------------------------------------------------------ */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Why Us", href: "#why-us" },
    { label: "Reviews", href: "#reviews" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-white text-navy font-body antialiased">
      {/* ----------------------------- NAV ----------------------------- */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/80 backdrop-blur-lg shadow-card" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 flex items-center justify-between py-3.5">
          <a href="#" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-navy text-orange font-display font-semibold">H</span>
            <span className="font-display text-lg tracking-tight text-navy">Harish Cab Service</span>
          </a>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-navy/70">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-orange transition-colors">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-2 text-sm font-semibold text-navy hover:text-orange transition-colors">
              <Phone className="h-4 w-4" /> Call Now
            </a>
            <a
              href="#booking"
              className="rounded-full bg-orange text-white text-sm font-semibold px-5 py-2.5 hover:brightness-95 transition shadow-soft"
            >
              Book Now
            </a>
          </div>

          <button className="lg:hidden text-navy" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-navy/10 px-5 py-4 space-y-4">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block text-sm font-medium text-navy/80">
                {l.label}
              </a>
            ))}
            <div className="flex gap-3 pt-2">
              <a href={`tel:${PHONE_TEL}`} className="flex-1 text-center rounded-full border border-navy/20 py-2.5 text-sm font-semibold">
                Call Now
              </a>
              <a href="#booking" className="flex-1 text-center rounded-full bg-orange text-white py-2.5 text-sm font-semibold">
                Book Now
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ----------------------------- HERO ----------------------------- */}
      <section id="booking" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28 bg-gradient-to-b from-white to-paper">
        <RoutePath className="pointer-events-none absolute -right-16 -top-6 h-[420px] w-[620px] opacity-70 hidden md:block" />

        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-navy/5 border border-navy/10 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-navy/60">
              <RouteIcon className="h-3.5 w-3.5 text-orange" /> Premium Rides, Every Trip
            </span>
            <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] tracking-tight text-navy">
              Your Trusted <span className="italic text-orange">Travel</span> Partner
            </h1>
            <p className="mt-5 text-base sm:text-lg text-navy/70 max-w-xl leading-relaxed">
              Premium taxi service for Airport Transfers, Local Trips, Outstation Rides and Corporate Travel.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-2 rounded-full border border-navy/15 px-6 py-3.5 text-sm font-semibold text-navy hover:bg-navy hover:text-white transition">
                <Phone className="h-4 w-4" /> Call Now
              </a>
              <a href="#services" className="inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3.5 text-sm font-semibold text-white shadow-soft hover:brightness-95 transition">
                Explore Services
              </a>
            </div>

            <dl className="mt-12 grid grid-cols-3 max-w-md gap-6 border-t border-navy/10 pt-6">
              {[["8K+", "Trips completed"], ["24×7", "On the road"], ["4.9★", "Average rating"]].map(([n, l]) => (
                <div key={l}>
                  <dt className="font-display text-2xl text-navy">{n}</dt>
                  <dd className="mt-1 text-xs text-navy/50">{l}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Booking form styled as a boarding-pass ticket */}
          <Reveal delay={150}>
            <div className="relative rounded-[28px] bg-white/60 backdrop-blur-xl border border-white shadow-soft p-6 sm:p-8 ml-0 md:ml-4">
              <div className="absolute inset-0 -z-10 rounded-[28px] bg-gradient-to-br from-navy/5 via-transparent to-orange/10" />
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display text-xl text-navy">Reserve Your Ride</h2>
                <span className="font-mono text-[11px] uppercase tracking-widest text-navy/40">Trip Ticket</span>
              </div>
              <BookingForm />
            </div>
          </Reveal>
        </div>

        {/* premium fleet strip */}
        <Reveal delay={100} className="mx-auto max-w-7xl px-5 sm:px-8 mt-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {FLEET.map((f) => (
              <div key={f.name} className="rounded-2xl border border-navy/10 bg-white p-5 flex flex-col items-center text-center hover:shadow-card hover:-translate-y-1 transition-all duration-300">
                <CarIcon className="h-10 w-16 text-navy" />
                <span className="mt-3 text-sm font-semibold text-navy">{f.name}</span>
                <span className="text-[11px] text-navy/45 font-mono uppercase tracking-wide">{f.tag}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ----------------------------- SERVICES ----------------------------- */}
      <section id="services" className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="max-w-xl">
            <span className="font-mono text-xs uppercase tracking-widest text-orange">Our Services</span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl text-navy">Every kind of journey, covered.</h2>
          </Reveal>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 60}>
                <div className="group h-full rounded-2xl border border-navy/10 p-6 hover:border-orange/30 hover:shadow-card transition-all duration-300 bg-white">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-navy/5 text-navy group-hover:bg-orange group-hover:text-white transition-colors duration-300">
                    <s.icon className="h-[22px] w-[22px]" />
                  </div>
                  <h3 className="mt-5 font-display text-lg text-navy">{s.title}</h3>
                  <p className="mt-2 text-sm text-navy/60 leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------- WHY US ----------------------------- */}
      <section id="why-us" className="py-24 sm:py-28 bg-navy relative overflow-hidden">
        <RoutePath className="pointer-events-none absolute -left-24 bottom-0 h-[380px] w-[560px] opacity-20 rotate-180" />
        <div className="mx-auto max-w-7xl px-5 sm:px-8 relative">
          <Reveal className="max-w-xl">
            <span className="font-mono text-xs uppercase tracking-widest text-orange-light">Why Choose Us</span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl text-white">Built around your comfort and safety.</h2>
          </Reveal>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 60}>
                <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-6 hover:bg-white/10 transition-colors duration-300">
                  <f.icon className="h-6 w-6 text-orange" />
                  <h3 className="mt-4 font-display text-lg text-white">{f.title}</h3>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------- FLEET ----------------------------- */}
      <section id="fleet" className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="max-w-xl">
            <span className="font-mono text-xs uppercase tracking-widest text-orange">The Fleet</span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl text-navy">A vehicle for every trip size.</h2>
          </Reveal>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FLEET.map((v, i) => (
              <Reveal key={v.name} delay={i * 70}>
                <div className="rounded-2xl border border-navy/10 overflow-hidden hover:shadow-card transition-all duration-300 bg-white flex flex-col h-full">
                  <div className="bg-paper py-10 grid place-items-center border-b border-navy/10">
                    <CarIcon className="h-14 w-24 text-navy" />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-orange">{v.tag}</span>
                    <h3 className="mt-1 font-display text-lg text-navy">{v.name}</h3>
                    <div className="mt-3 space-y-1.5 text-sm text-navy/60">
                      <div className="flex items-center gap-2"><Users className="h-3.5 w-3.5" /> {v.seats}</div>
                      <div className="flex items-center gap-2"><Snowflake className="h-3.5 w-3.5" /> Air Conditioned</div>
                      <div className="flex items-center gap-2"><Luggage className="h-3.5 w-3.5" /> {v.luggage}</div>
                    </div>
                    <a href="#booking" className="mt-5 inline-flex justify-center rounded-full bg-navy text-white text-sm font-semibold py-2.5 hover:bg-orange transition-colors">
                      Book Now
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------- REVIEWS ----------------------------- */}
      <section id="reviews" className="py-24 sm:py-28 bg-paper">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="max-w-xl">
            <span className="font-mono text-xs uppercase tracking-widest text-orange">Customer Reviews</span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl text-navy">Riders who keep coming back.</h2>
          </Reveal>

          <div className="mt-14 grid sm:grid-cols-2 gap-5">
            {REVIEWS.map((r, i) => (
              <Reveal key={r.name} delay={i * 70}>
                <div className="rounded-2xl bg-white/70 backdrop-blur-md border border-white shadow-card p-6 h-full">
                  <div className="flex items-center gap-1 text-orange">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-4 w-4" fill={s < r.rating ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-navy/70 leading-relaxed">"{r.text}"</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="font-display text-sm text-navy">{r.name}</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-navy/40">{r.trip}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------- FAQ ----------------------------- */}
      <section id="faq" className="py-24 sm:py-28">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal className="text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-orange">FAQ</span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl text-navy">Questions, answered.</h2>
          </Reveal>

          <div className="mt-12 space-y-3">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 50}>
                <div className="rounded-2xl border border-navy/10 overflow-hidden bg-white">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                  >
                    <span className="font-medium text-sm sm:text-base text-navy pr-4">{f.q}</span>
                    <ChevronDown className={`h-4 w-4 shrink-0 text-orange transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  <div
                    className="grid transition-all duration-300 px-5"
                    style={{ gridTemplateRows: openFaq === i ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-4 text-sm text-navy/60 leading-relaxed">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------- CONTACT ----------------------------- */}
      <section id="contact" className="py-24 sm:py-28 bg-navy">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-14">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-widest text-orange-light">Contact</span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl text-white">Harish Cab Service</h2>
            <p className="mt-4 text-white/60 max-w-md leading-relaxed">
              Call, message on WhatsApp, or send us your trip details below — we typically respond within minutes.
            </p>

            <div className="mt-8 space-y-4">
              <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-3 text-white hover:text-orange transition-colors">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10"><Phone className="h-4 w-4" /></span>
                {PHONE_DISPLAY}
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank" rel="noreferrer"
                className="flex items-center gap-3 text-white hover:text-orange transition-colors"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10"><MessageCircle className="h-4 w-4" /></span>
                Chat on WhatsApp
              </a>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 h-48 grid place-items-center text-white/40 text-sm font-mono">
              {/* Replace with a real embedded Google Map <iframe> for your location */}
              <div className="flex flex-col items-center gap-2">
                <MapPin className="h-6 w-6 text-orange" />
                Google Maps embed goes here
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form className="rounded-2xl bg-white/95 backdrop-blur p-6 sm:p-8 shadow-soft space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input placeholder="Your Name" required className="w-full rounded-xl border border-navy/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange/30" />
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-4 w-4 text-navy/40" />
                <input type="email" placeholder="Your Email" required className="w-full rounded-xl border border-navy/10 pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange/30" />
              </div>
              <textarea placeholder="How can we help?" rows={4} required className="w-full rounded-xl border border-navy/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange/30 resize-none" />
              <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-orange text-white font-semibold py-3.5 text-sm hover:brightness-95 transition">
                <Send className="h-4 w-4" /> Send Message
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------- FOOTER ----------------------------- */}
      <footer className="bg-navy-deep border-t border-white/10 py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-10 text-white/60 text-sm">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-orange text-white font-display font-semibold">H</span>
              <span className="font-display text-white text-base">Harish Cab Service</span>
            </div>
            <p className="mt-4 leading-relaxed">Premium taxi rides for every kind of journey — airport, local, outstation and corporate.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Services</h4>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:text-orange transition-colors">Airport Transfers</a></li>
              <li><a href="#services" className="hover:text-orange transition-colors">Outstation Trips</a></li>
              <li><a href="#services" className="hover:text-orange transition-colors">Corporate Travel</a></li>
              <li><a href="#services" className="hover:text-orange transition-colors">Tourist Packages</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-orange transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-orange transition-colors">Terms of Service</a></li>
              <li><a href="#contact" className="hover:text-orange transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Follow Us</h4>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-orange transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Harish Cab Service. All rights reserved.
        </div>
      </footer>

      {/* Floating WhatsApp button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank" rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-soft hover:scale-105 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}
