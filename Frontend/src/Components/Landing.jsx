import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  HiOutlineMail,
  HiOutlineLightningBolt,
  HiOutlineLockClosed,
  HiOutlineSparkles,
  HiOutlineDeviceMobile,
  HiOutlineGlobeAlt,
  HiArrowRight,
  HiChevronDown,
  HiOutlineStar,
  HiOutlineUserGroup,
  HiOutlinePaperAirplane,
  HiOutlineClock,
  HiOutlineChat,
} from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const CONTACT_EMAIL = "tgaurav1k@gmail.com";

const ROTATING_WORDS = ["modern web", "fast minds", "your team", "everyone"];

const SAMPLE_MAILS = [
  { from: "Anna Park", subject: "Welcome to NeoMail!", preview: "We're excited to have you onboard…", color: "from-pink-500 to-rose-600" },
  { from: "Stripe", subject: "Your receipt", preview: "Thanks for your payment of $19.00…", color: "from-violet-500 to-purple-600" },
  { from: "GitHub", subject: "PR ready to review", preview: "feat(auth): add 2FA support — 12 files changed…", color: "from-gray-700 to-gray-900" },
  { from: "Linear", subject: "Sprint summary", preview: "You completed 8 issues this week 🎉", color: "from-indigo-500 to-blue-600" },
  { from: "Vercel", subject: "Deployment ready", preview: "neomail-frontend.vercel.app is live", color: "from-black to-gray-700" },
  { from: "Notion", subject: "New comment on your doc", preview: "Looks good — let's ship it Monday…", color: "from-amber-500 to-orange-600" },
];

// Hook: animate a number from 0 to target when section enters viewport
const useCountUp = (target, durationMs = 1500) => {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min(1, (now - start) / durationMs);
            const eased = 1 - Math.pow(1 - t, 3);
            setValue(Math.round(eased * target));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, durationMs]);

  return [value, ref];
};

// Hook: fade-in on scroll
const useFadeIn = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

const Stat = ({ target, suffix, label, icon }) => {
  const [v, ref] = useCountUp(target);
  return (
    <div ref={ref} className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 text-center hover:shadow-lg transition">
      <div className="inline-flex p-2 sm:p-3 rounded-xl bg-blue-50 text-blue-600 mb-2 sm:mb-3">{icon}</div>
      <div className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
        {v.toLocaleString()}
        {suffix}
      </div>
      <div className="text-xs sm:text-sm text-gray-500 mt-1">{label}</div>
    </div>
  );
};

const FAQItem = ({ q, a, isOpen, onClick }) => (
  <button
    onClick={onClick}
    className="w-full text-left bg-white rounded-2xl border border-gray-100 p-5 hover:border-blue-200 transition"
  >
    <div className="flex items-center justify-between">
      <span className="font-medium text-gray-800">{q}</span>
      <HiChevronDown
        className={`text-gray-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        size={20}
      />
    </div>
    <div
      className={`grid transition-all duration-300 ${
        isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="overflow-hidden text-sm text-gray-600 leading-relaxed">{a}</div>
    </div>
  </button>
);

const Landing = () => {
  const { user } = useSelector((state) => state.app);
  const navigate = useNavigate();

  // redirect logged-in users
  useEffect(() => {
    if (user) navigate("/inbox");
  }, [user, navigate]);

  // rotating headline word
  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setWordIdx((i) => (i + 1) % ROTATING_WORDS.length), 2200);
    return () => clearInterval(id);
  }, []);

  // animated mockup — cycle through emails as the "newest" arriving
  const [mailOffset, setMailOffset] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setMailOffset((o) => (o + 1) % SAMPLE_MAILS.length), 3000);
    return () => clearInterval(id);
  }, []);
  const visibleMails = [0, 1, 2].map((i) => SAMPLE_MAILS[(mailOffset + i) % SAMPLE_MAILS.length]);

  // mouse-follow glow on hero
  const heroRef = useRef(null);
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const onHeroMove = (e) => {
    const r = heroRef.current?.getBoundingClientRect();
    if (!r) return;
    setGlow({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  // scroll progress bar
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handler = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? (h.scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // FAQ open state
  const [openFAQ, setOpenFAQ] = useState(0);
  const faqs = [
    {
      q: "Is NeoMail really free?",
      a: "Yes — completely free. Sign up in under a minute, no credit card required. We may introduce premium features in the future, but the core inbox stays free forever.",
    },
    {
      q: "How is my data protected?",
      a: "Passwords are hashed with bcrypt and authentication uses signed JWTs over HTTPS. Your messages are stored securely on cloud infrastructure with daily backups.",
    },
    {
      q: "Can I use NeoMail on mobile?",
      a: "Absolutely. NeoMail's responsive design works on any modern browser — phone, tablet, or desktop.",
    },
    {
      q: "Where is my data stored?",
      a: "On MongoDB Atlas, hosted in AWS Mumbai. Emails older than 7 days are automatically pruned to keep your inbox snappy.",
    },
  ];

  // section fade-ins
  const [statsRef, statsVisible] = useFadeIn();
  const [featuresRef, featuresVisible] = useFadeIn();
  const [testimonialsRef, testimonialsVisible] = useFadeIn();
  const [faqRef, faqVisible] = useFadeIn();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F6F8FC] via-white to-[#EEF2FF] text-gray-800 overflow-hidden">
      {/* scroll progress bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 z-50 transition-all duration-100"
        style={{ width: `${progress}%` }}
      />

      {/* Top nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-gray-100 bg-white/70 backdrop-blur sticky top-0 z-30">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-blue-600 text-white p-2 rounded-lg group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
            <HiOutlineMail size={22} />
          </div>
          <span className="text-xl font-semibold tracking-tight">NeoMail</span>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <Link
            to="/login"
            className="text-sm md:text-base font-medium text-gray-700 hover:text-blue-600 px-3 py-2 transition relative after:absolute after:bottom-1 after:left-3 after:right-3 after:h-0.5 after:bg-blue-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-sm md:text-base font-medium bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-5 py-2 rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            Sign up
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section
        ref={heroRef}
        onMouseMove={onHeroMove}
        className="relative max-w-6xl mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-20 text-center"
      >
        {/* mouse-follow glow */}
        <div
          className="pointer-events-none absolute inset-0 transition-[background-position] duration-300"
          style={{
            background: `radial-gradient(600px circle at ${glow.x}% ${glow.y}%, rgba(99,102,241,0.15), transparent 60%)`,
          }}
        />
        {/* floating blobs */}
        <div className="pointer-events-none absolute -top-10 -left-10 w-72 h-72 bg-blue-300/30 rounded-full blur-3xl animate-pulse" />
        <div className="pointer-events-none absolute top-20 -right-10 w-72 h-72 bg-indigo-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="pointer-events-none absolute -bottom-10 left-1/3 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />

        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs md:text-sm font-medium mb-6 border border-blue-100">
            <HiOutlineSparkles size={16} className="animate-pulse" />
            Welcome to the future of email
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            Email, <span className="text-blue-600">reimagined</span> for
          </h1>
          <div className="relative h-[1.3em] mt-3 text-4xl md:text-6xl font-bold tracking-tight leading-tight overflow-hidden">
            <span
              key={wordIdx}
              className="absolute inset-0 flex items-center justify-center whitespace-nowrap bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent animate-[wordFade_0.6s_ease-out]"
            >
              {ROTATING_WORDS[wordIdx]}
            </span>
          </div>
          <p className="mt-6 text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            NeoMail is a fast, secure, and beautifully simple email client.
            Send, receive, and organize your messages — all in one clean inbox.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/signup"
              className="group inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all w-full sm:w-auto"
            >
              Get started — it's free
              <HiArrowRight className="group-hover:translate-x-1 transition" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-800 font-medium px-6 py-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:-translate-y-0.5 transition-all w-full sm:w-auto"
            >
              Sign in to your account
            </Link>
          </div>

          {/* live mockup */}
          <div className="mt-16 md:mt-20 mx-auto max-w-4xl perspective-[2000px]">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden hover:shadow-blue-200/50 hover:shadow-2xl transition-shadow duration-500">
              <div className="bg-gray-50 border-b border-gray-100 px-4 py-3 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-3 text-xs text-gray-500 flex items-center gap-2">
                  neomail.app — Inbox
                  <span className="ml-2 inline-flex items-center gap-1 text-green-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> live
                  </span>
                </span>
              </div>
              <div className="grid grid-cols-12 min-h-[260px] sm:min-h-[300px]">
                <div className="hidden sm:block sm:col-span-3 border-r border-gray-100 p-4 bg-gray-50/50">
                  <div className="bg-blue-100 text-blue-700 rounded-lg px-3 py-2 text-sm font-medium mb-3 hover:bg-blue-200 transition cursor-pointer">
                    + Compose
                  </div>
                  {[
                    { label: "Inbox", count: SAMPLE_MAILS.length },
                    { label: "Starred" },
                    { label: "Sent" },
                    { label: "Drafts" },
                  ].map((s, i) => (
                    <div
                      key={s.label}
                      className={`text-sm px-3 py-2 rounded-lg mb-1 flex items-center justify-between ${
                        i === 0 ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-100 cursor-pointer"
                      }`}
                    >
                      <span>{s.label}</span>
                      {s.count != null && (
                        <span className="text-xs bg-blue-600 text-white rounded-full px-2 animate-pulse">
                          {s.count}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="col-span-12 sm:col-span-9 p-1 sm:p-2 text-left">
                  {visibleMails.map((m, i) => (
                    <div
                      key={`${mailOffset}-${i}`}
                      className="flex items-start gap-2 sm:gap-3 py-2 sm:py-3 border-b border-gray-100 hover:bg-gray-50 px-2 sm:px-3 rounded transition"
                      style={{
                        animation: `slideIn 0.5s ease-out ${i * 0.1}s both`,
                      }}
                    >
                      <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br ${m.color} text-white text-xs sm:text-sm font-medium flex items-center justify-center shrink-0`}>
                        {m.from[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-medium text-xs sm:text-sm truncate">{m.from}</span>
                          {i === 0 && (
                            <span className="text-[10px] bg-green-100 text-green-700 rounded-full px-2 py-0.5 font-medium shrink-0">
                              new
                            </span>
                          )}
                        </div>
                        <div className="text-xs sm:text-sm font-medium truncate">{m.subject}</div>
                        <div className="text-[11px] sm:text-xs text-gray-500 truncate">{m.preview}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        ref={statsRef}
        className={`max-w-6xl mx-auto px-6 md:px-12 py-12 transition-all duration-700 ${
          statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat target={50} suffix="+" label="Active users" icon={<HiOutlineUserGroup size={20} />} />
          <Stat target={500} suffix="+" label="Emails delivered" icon={<HiOutlinePaperAirplane size={20} />} />
          <Stat target={99} suffix="%" label="Uptime" icon={<HiOutlineLightningBolt size={20} />} />
          <Stat target={45} suffix="ms" label="Avg response" icon={<HiOutlineClock size={20} />} />
        </div>
      </section>

      {/* Features */}
      <section
        ref={featuresRef}
        className={`max-w-6xl mx-auto px-6 md:px-12 py-16 transition-all duration-700 ${
          featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Built for how you actually use email
          </h2>
          <p className="mt-3 text-gray-600 max-w-xl mx-auto">
            No clutter, no ads, no nonsense — just the essentials, done well.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <HiOutlineLightningBolt size={24} />, title: "Lightning fast", desc: "Powered by a modern stack. Open, search, and send in milliseconds.", color: "bg-yellow-100 text-yellow-700" },
            { icon: <HiOutlineLockClosed size={24} />, title: "Private by default", desc: "Your messages are encrypted and tokens are never exposed.", color: "bg-green-100 text-green-700" },
            { icon: <HiOutlineDeviceMobile size={24} />, title: "Works everywhere", desc: "Responsive design that looks great on any screen size.", color: "bg-purple-100 text-purple-700" },
            { icon: <HiOutlineMail size={24} />, title: "Clean inbox", desc: "A focused, distraction-free interface that respects your time.", color: "bg-blue-100 text-blue-700" },
            { icon: <HiOutlineGlobeAlt size={24} />, title: "Cloud powered", desc: "Access your mail from any device with secure sync.", color: "bg-indigo-100 text-indigo-700" },
            { icon: <HiOutlineSparkles size={24} />, title: "Free forever", desc: "Sign up in seconds — no credit card, no commitments.", color: "bg-pink-100 text-pink-700" },
          ].map((f, i) => (
            <div
              key={f.title}
              className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 hover:border-blue-100 transition-all duration-300"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div className={`inline-flex p-3 rounded-xl ${f.color} mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section
        ref={testimonialsRef}
        className={`max-w-6xl mx-auto px-6 md:px-12 py-16 transition-all duration-700 ${
          testimonialsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Loved by early users</h2>
          <p className="mt-3 text-gray-600">Real feedback from people who switched.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Aarav S.", role: "Indie Developer", quote: "Finally an email client that doesn't feel bloated. NeoMail is a breath of fresh air.", color: "from-blue-500 to-cyan-500" },
            { name: "Priya K.", role: "Product Designer", quote: "The interface is clean, fast, and gets out of my way. I can finally focus on the actual messages.", color: "from-pink-500 to-rose-500" },
            { name: "Rohan M.", role: "Startup Founder", quote: "Setup took 30 seconds. Login was instant. Just works — that's all I want from email.", color: "from-violet-500 to-purple-500" },
          ].map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex gap-0.5 text-yellow-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <HiOutlineStar key={i} className="fill-current" size={16} />
                ))}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} text-white font-medium flex items-center justify-center`}>
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section
        ref={faqRef}
        className={`max-w-3xl mx-auto px-6 md:px-12 py-16 transition-all duration-700 ${
          faqVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Frequently asked</h2>
          <p className="mt-3 text-gray-600">Quick answers to common questions.</p>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <FAQItem
              key={f.q}
              q={f.q}
              a={f.a}
              isOpen={openFAQ === i}
              onClick={() => setOpenFAQ(openFAQ === i ? -1 : i)}
            />
          ))}
        </div>
      </section>

      {/* Contact Us */}
      <section
        id="contact"
        className="max-w-4xl mx-auto px-6 md:px-12 py-16"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs md:text-sm font-medium mb-4 border border-blue-100">
            <HiOutlineChat size={16} />
            Get in touch
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Contact us</h2>
          <p className="mt-3 text-gray-600 max-w-xl mx-auto">
            Questions, feedback, or just want to say hi? We'd love to hear from you.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-10 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="group flex items-start gap-4 p-5 rounded-xl hover:bg-blue-50 transition border border-transparent hover:border-blue-100"
            >
              <div className="bg-blue-100 text-blue-600 p-3 rounded-xl group-hover:scale-110 transition-transform">
                <HiOutlineMail size={22} />
              </div>
              <div className="min-w-0">
                <div className="text-sm text-gray-500 mb-1">Email us</div>
                <div className="font-medium text-gray-800 break-all group-hover:text-blue-600 transition">
                  {CONTACT_EMAIL}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  We reply within 24 hours
                </div>
              </div>
            </a>

            <a
              href="https://github.com/Tgaurav1k"
              target="_blank"
              rel="noreferrer"
              className="group flex items-start gap-4 p-5 rounded-xl hover:bg-gray-50 transition border border-transparent hover:border-gray-200"
            >
              <div className="bg-gray-100 text-gray-700 p-3 rounded-xl group-hover:scale-110 transition-transform">
                <FaGithub size={22} />
              </div>
              <div className="min-w-0">
                <div className="text-sm text-gray-500 mb-1">GitHub</div>
                <div className="font-medium text-gray-800 group-hover:text-gray-900 transition">
                  @Tgaurav1k
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  GitHub profile
                </div>
              </div>
            </a>
          </div>

          <div className="mt-6 text-center">
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Hello%20NeoMail`}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <HiOutlineMail size={18} />
              Send a message
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-10 md:p-14 text-center text-white shadow-xl overflow-hidden">
          {/* decorative animated rings */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full border-8 border-white/10 animate-pulse" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full border-8 border-white/10 animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Ready to take control of your inbox?
            </h2>
            <p className="mt-3 text-blue-100 max-w-xl mx-auto">
              Create your free NeoMail account in less than a minute.
            </p>
            <Link
              to="/signup"
              className="mt-8 inline-flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 hover:scale-105 font-medium px-6 py-3 rounded-lg shadow-md transition-all"
            >
              Create free account <HiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white/60">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-blue-600 text-white p-1.5 rounded-md">
                  <HiOutlineMail size={14} />
                </div>
                <span className="font-semibold text-gray-700">NeoMail</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                A fast, secure, and beautifully simple email client for the modern web.
              </p>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-700 mb-3">Product</div>
              <div className="flex flex-col gap-2 text-sm text-gray-500">
                <Link to="/login" className="hover:text-blue-600 transition w-fit">Login</Link>
                <Link to="/signup" className="hover:text-blue-600 transition w-fit">Sign up</Link>
                <a href="#contact" className="hover:text-blue-600 transition w-fit">Contact</a>
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-700 mb-3">Reach out</div>
              <div className="flex flex-col gap-2 text-sm text-gray-500">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="hover:text-blue-600 transition flex items-center gap-2 w-fit break-all"
                >
                  <HiOutlineMail size={14} className="shrink-0" />
                  {CONTACT_EMAIL}
                </a>
                <a
                  href="https://github.com/Tgaurav1k"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-600 transition flex items-center gap-2 w-fit"
                >
                  <FaGithub size={14} />
                  @Tgaurav1k
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-6 text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} NeoMail. All rights reserved.
          </div>
        </div>
      </footer>

      {/* keyframes for slide-in animation */}
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes wordFade {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Landing;
