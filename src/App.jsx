import { useState, useEffect, useRef } from "react";
import {
  FaBitcoin, FaEthereum, FaTwitter, FaGithub, FaTelegram, FaDiscord,
  FaShieldAlt, FaBolt, FaRocket, FaBrain, FaGlobe, FaGem,
  FaArrowUp, FaArrowDown, FaChartLine, FaBell, FaNewspaper,
  FaBars, FaTimes, FaCheckCircle,
} from "react-icons/fa";
import { SiSolana, SiDogecoin } from "react-icons/si";

const NAV_LINKS = ["Markets", "Trade", "Portfolio", "Analytics", "About"];

const COINS = [
  {
    id: "btc", name: "Bitcoin", symbol: "BTC", price: 67432.18, change: 2.34,
    Icon: FaBitcoin, iconColor: "text-orange-400",
    ringColor: "ring-orange-500/20", bgColor: "bg-orange-500/10",
    spark: [60, 62, 61, 65, 63, 66, 67.4], strokeColor: "#fb923c",
  },
  {
    id: "eth", name: "Ethereum", symbol: "ETH", price: 3521.44, change: -1.12,
    Icon: FaEthereum, iconColor: "text-indigo-400",
    ringColor: "ring-indigo-500/20", bgColor: "bg-indigo-500/10",
    spark: [31, 33, 32, 34, 33.5, 34.8, 35.2], strokeColor: "#818cf8",
  },
  {
    id: "sol", name: "Solana", symbol: "SOL", price: 178.92, change: 5.67,
    Icon: SiSolana, iconColor: "text-purple-400",
    ringColor: "ring-purple-500/20", bgColor: "bg-purple-500/10",
    spark: [140, 150, 145, 160, 155, 170, 178], strokeColor: "#c084fc",
  },
  {
    id: "doge", name: "Dogecoin", symbol: "DOGE", price: 0.1823, change: 3.21,
    Icon: SiDogecoin, iconColor: "text-yellow-400",
    ringColor: "ring-yellow-500/20", bgColor: "bg-yellow-500/10",
    spark: [0.14, 0.15, 0.16, 0.17, 0.175, 0.18, 0.182], strokeColor: "#facc15",
  },
];

const STATS = [
  { value: 120, prefix: "$", suffix: "B+", label: "Trading Volume" },
  { value: 10, prefix: "", suffix: "M+", label: "Active Users" },
  { value: 150, prefix: "", suffix: "+", label: "Countries" },
  { value: 500, prefix: "", suffix: "+", label: "Assets Listed" },
];

const FEATURES = [
  { Icon: FaShieldAlt, title: "Secure Wallet", desc: "Military-grade encryption with multi-sig authentication protects your assets around the clock." },
  { Icon: FaBolt, title: "Instant Trading", desc: "Execute trades in milliseconds with our high-frequency matching engine and deep liquidity." },
  { Icon: FaRocket, title: "Fast Transactions", desc: "Lightning-fast settlements across 150+ blockchain networks with near-zero fees." },
  { Icon: FaBrain, title: "AI Market Analysis", desc: "Proprietary AI scans 10,000+ signals to surface alpha opportunities before the market moves." },
  { Icon: FaGlobe, title: "Global Access", desc: "Trade from anywhere, anytime — 24/7 markets with zero downtime across all devices." },
  { Icon: FaGem, title: "DeFi Integration", desc: "Earn yield, provide liquidity, and access DeFi protocols in one seamless click." },
];

const TREND_ITEMS = [
  { Icon: FaChartLine, title: "Trend Detection", desc: "Identify emerging patterns across 500+ assets in real time." },
  { Icon: FaBell, title: "Price Alerts", desc: "Custom alerts for any price level, move, or volume spike." },
  { Icon: FaNewspaper, title: "News Sentiment", desc: "Real-time NLP scoring of market-moving news events." },
];

const FOOTER_LINKS = {
  Product: ["Markets", "Trade", "Portfolio", "Analytics", "Mobile App"],
  Company: ["About", "Blog", "Careers", "Press", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookies", "Compliance"],
};

function Sparkline({ data, color }) {
  const W = 120, H = 44;
  const min = Math.min(...data), max = Math.max(...data), range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - 4 - ((v - min) / range) * (H - 8);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const polyPts = pts.join(" ");
  const fillPts = `0,${H} ${polyPts} ${W},${H}`;
  const gradId = `sg${color.replace("#", "")}`;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="overflow-visible">

      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      <polygon points={fillPts} fill={`url(#${gradId})`} />
      <polyline points={polyPts} fill="none" stroke={color} strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1].split(",")[0]} cy={pts[pts.length - 1].split(",")[1]}
        r="3.5" fill={color} />
    </svg>
  );
}

function Counter({ value, prefix = "", suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const fired = useRef(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !fired.current) {
        fired.current = true;
        const steps = 60, dur = 1800;
        let i = 0;
        const t = setInterval(() => {
          i++;
          setCount(Math.round((i / steps) * value));
          if (i >= steps) clearInterval(t);
        }, dur / steps);
      }
    }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [value]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

function FloatingCoin({ Icon, colorClass, glowColor, style }) {
  return (
    <div className={`absolute w-14 h-14 rounded-full flex items-center justify-center
      border border-white/10 backdrop-blur-sm ${colorClass}`}
      style={{ boxShadow: `0 0 24px ${glowColor}55`, animation: "floatY 6s ease-in-out infinite", ...style }}>
      <Icon className="text-2xl text-white" />
    </div>
  );
}

export default function CryptoX() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [activeTab, setActiveTab] = useState("1D");

  return (
    <div className="bg-[#0B0F19] text-slate-200 overflow-x-hidden min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        * { font-family:'Outfit',sans-serif; box-sizing:border-box; margin:0; padding:0; }

        @keyframes floatY {
          0%,100%{transform:translateY(0) rotate(0deg);}
          40%{transform:translateY(-16px) rotate(4deg);}
          70%{transform:translateY(-8px) rotate(-2deg);}
        }

        @keyframes pulseGlow {
          0%,100%{opacity:.3;transform:scale(1);}
          50%{opacity:.6;transform:scale(1.1);}
        }

        @keyframes slideUp {
          from{opacity:0;transform:translateY(28px);}
          to{opacity:1;transform:translateY(0);}
        }

        @keyframes gradShift {
          0%{background-position:0% 50%;}
          50%{background-position:100% 50%;}
          100%{background-position:0% 50%;}
        }

        .anim-up{animation:slideUp .7s ease both;}
        .d1{animation-delay:.12s;} .d2{animation-delay:.24s;}
        .d3{animation-delay:.36s;} .d4{animation-delay:.48s;}
        .glow{border-radius:50%;filter:blur(90px);pointer-events:none;position:absolute;}
        .grad-text{
          background:linear-gradient(135deg,#a78bfa,#38bdf8,#34d399);
          background-size:200% 200%;
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;
          background-clip:text;animation:gradShift 5s ease infinite;
        }

        .glass{
          background:linear-gradient(135deg,rgba(255,255,255,.055),rgba(255,255,255,.015));
          border:1px solid rgba(255,255,255,.08);backdrop-filter:blur(16px);
        }

        .btn-p{
          background:linear-gradient(135deg,#7c3aed,#2563eb);
          box-shadow:0 0 28px rgba(124,58,237,.4);transition:all .25s;
          color:#fff;border:none;cursor:pointer;font-family:inherit;font-weight:600;
        }

        .btn-p:hover{transform:translateY(-2px);box-shadow:0 8px 36px rgba(124,58,237,.6);}
        .btn-o{
          border:1.5px solid rgba(124,58,237,.55);color:#a78bfa;background:transparent;
          cursor:pointer;transition:all .25s;font-family:inherit;font-weight:600;
        }
          
        .btn-o:hover{background:rgba(124,58,237,.12);transform:translateY(-2px);}
        .coin-card{transition:all .3s;}
        .coin-card:hover{transform:translateY(-6px);box-shadow:0 24px 64px rgba(0,0,0,.5);}
        .feat-card{transition:all .3s;position:relative;overflow:hidden;}
        .feat-card:hover{transform:translateY(-4px);}
        .feat-card::before{content:'';position:absolute;inset:0;
          background:linear-gradient(135deg,rgba(124,58,237,.07),transparent);
          opacity:0;transition:opacity .3s;border-radius:inherit;}
        .feat-card:hover::before{opacity:1;}
        .nav-a{color:#94a3b8;text-decoration:none;font-size:14px;font-weight:500;transition:color .2s;}
        .nav-a:hover{color:#a78bfa;}
        .foot-a{color:#475569;text-decoration:none;font-size:13px;font-weight:300;transition:color .2s;}
        .foot-a:hover{color:#a78bfa;}
        .soc-btn{transition:all .2s;}
        .soc-btn:hover{transform:translateY(-2px);color:#a78bfa;}
        .tab-btn{transition:all .2s;cursor:pointer;font-family:inherit;}
        input:focus{outline:none;}
        .grid-bg{
          background-image:linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),
            linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);
          background-size:60px 60px;
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "fixed", top: 0, inset: "0 0 auto", zIndex: 50,
        background: "rgba(11,15,25,.85)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,.06)",
      }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between" style={{ height: 68 }}>
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-black text-white text-lg"
              style={{ background: "linear-gradient(135deg,#7c3aed,#2563eb)" }}>X</div>
            <span className="text-xl font-bold text-white tracking-tight">CryptoX</span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(l => <a key={l} href="#" className="nav-a">{l}</a>)}
          </div>

          {/* Desktop buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button className="btn-o px-5 py-2 rounded-full text-sm">Log In</button>
            <button className="btn-p px-5 py-2 rounded-full text-sm">Get Started</button>
          </div>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-slate-300 text-xl p-1 bg-transparent border-none cursor-pointer">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {menuOpen && (
          <div style={{ background: "rgba(11,15,25,.98)", borderTop: "1px solid rgba(255,255,255,.06)" }}
            className="md:hidden px-6 pb-6 pt-3">
            {NAV_LINKS.map(l => (
              <div key={l} style={{ borderBottom: "1px solid rgba(255,255,255,.05)" }} className="py-3">
                <a href="#" className="nav-a text-base">{l}</a>
              </div>
            ))}
            <div className="flex gap-3 mt-5">
              <button className="btn-o flex-1 py-2.5 rounded-full text-sm">Log In</button>
              <button className="btn-p flex-1 py-2.5 rounded-full text-sm">Get Started</button>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden"
        style={{ paddingTop: 100, paddingBottom: 80, paddingLeft: "5%", paddingRight: "5%" }}>
        <div className="glow" style={{ width: 640, height: 640, top: -120, left: -160, background: "rgba(124,58,237,.13)", animation: "pulseGlow 8s ease-in-out infinite" }} />
        <div className="glow" style={{ width: 480, height: 480, top: 80, right: -100, background: "rgba(37,99,235,.1)", animation: "pulseGlow 7s 2s ease-in-out infinite" }} />
        <div className="glow" style={{ width: 340, height: 340, bottom: 0, left: "42%", background: "rgba(6,182,212,.07)", animation: "pulseGlow 9s 1s ease-in-out infinite" }} />
        <div className="absolute inset-0 grid-bg opacity-100" />

        <div className="max-w-7xl mx-auto w-full relative">
          <div className="flex flex-col lg:flex-row items-center gap-16">

            {/* Left */}
            <div className="flex-1 lg:max-w-[54%]">
              <div className="anim-up inline-flex items-center gap-2.5 mb-7 px-4 py-1.5 rounded-full"
                style={{ background: "rgba(124,58,237,.1)", border: "1px solid rgba(124,58,237,.28)" }}>
                <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse inline-block" />
                <span className="text-xs text-violet-400 font-semibold tracking-widest uppercase">
                  Live Markets · 500+ Assets
                </span>
              </div>

              <h1 className="anim-up d1 font-black text-white leading-tight tracking-tight mb-6"
                style={{ fontSize: "clamp(38px,5.5vw,68px)" }}>
                The Future of<br />
                <span className="grad-text">Digital Finance</span>
              </h1>

              <p className="anim-up d2 text-slate-400 leading-relaxed mb-10 font-light"
                style={{ fontSize: 18, maxWidth: 480 }}>
                Trade crypto with institutional-grade tools. Real-time data, AI-powered
                analysis, and lightning-fast execution — all in one platform.
              </p>

              <div className="anim-up d3 flex flex-wrap gap-4 mb-12">
                <button className="btn-p px-8 py-3.5 rounded-full text-base">Start Trading Free →</button>
                <button className="btn-o px-8 py-3.5 rounded-full text-base">View Markets</button>
              </div>

              <div className="anim-up d4 flex gap-10">
                {[["$4.2B", "Daily Volume"], ["99.9%", "Uptime"], ["<0.1s", "Execution"]].map(([v, l]) => (
                  <div key={l}>
                    <div className="text-2xl font-bold text-white">{v}</div>
                    <div className="text-xs text-slate-500 mt-1 font-medium">{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right – Dashboard mockup */}
            <div className="flex-1 relative hidden lg:block" style={{ minHeight: 380 }}>
              <FloatingCoin Icon={FaBitcoin} colorClass="bg-orange-500/20" glowColor="#f97316" style={{ top: 10, right: 60, animationDelay: "0s" }} />
              <FloatingCoin Icon={FaEthereum} colorClass="bg-indigo-500/20" glowColor="#6366f1" style={{ top: 110, right: -10, animationDelay: "1.6s" }} />
              <FloatingCoin Icon={SiSolana} colorClass="bg-purple-500/20" glowColor="#a855f7" style={{ bottom: 90, right: 70, animationDelay: "3s" }} />
              <FloatingCoin Icon={SiDogecoin} colorClass="bg-yellow-500/20" glowColor="#eab308" style={{ bottom: 20, right: -5, animationDelay: "0.9s" }} />

              <div className="glass rounded-2xl p-6 shadow-2xl" style={{ marginRight: 80 }}>
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <p className="text-slate-500 text-sm mb-1">Portfolio Value</p>
                    <p className="text-3xl font-bold text-white">$84,291.42</p>
                  </div>
                  <span className="text-xs font-bold px-3 py-1.5 rounded-full"
                    style={{ background: "rgba(16,185,129,.15)", color: "#10b981" }}>+18.4%</span>
                </div>

                {/* Bar chart */}
                <div className="flex items-end gap-1 mb-5" style={{ height: 80 }}>
                  {[40, 65, 50, 80, 60, 90, 70, 85, 75, 95, 80, 100].map((h, i) => (
                    <div key={i} className="flex-1 rounded-sm"
                      style={{ height: `${h}%`, background: "linear-gradient(to top,#7c3aed,#06b6d4)", opacity: i === 11 ? 1 : 0.45 + (i / 12) * 0.45 }} />
                  ))}
                </div>

                {/* Coin pills */}
                <div className="grid grid-cols-3 gap-2">
                  {COINS.slice(0, 3).map(c => (
                    <div key={c.id} className={`${c.bgColor} rounded-xl p-3`}>
                      <c.Icon className={`${c.iconColor} text-xl mb-1`} />
                      <p className="text-xs font-bold text-slate-300">{c.symbol}</p>
                      <p className={`text-xs font-semibold ${c.change > 0 ? "text-emerald-400" : "text-red-400"}`}>
                        {c.change > 0 ? "+" : ""}{c.change}%
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LIVE COIN CARDS ── */}
      <section style={{ padding: "80px 5%" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-black text-white tracking-tight mb-3" style={{ fontSize: "clamp(32px,4vw,48px)" }}>
              Live Market Prices
            </h2>
            <p className="text-slate-500">Real-time prices updated every second</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {COINS.map(coin => (
              <div key={coin.id} className="coin-card glass rounded-2xl p-6 cursor-pointer">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-full ${coin.bgColor} ring-2 ${coin.ringColor} flex items-center justify-center`}>
                      <coin.Icon className={`${coin.iconColor} text-xl`} />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">{coin.name}</p>
                      <p className="text-slate-500 text-xs">{coin.symbol}</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-full
                    ${coin.change > 0 ? "text-emerald-400" : "text-red-400"}`}
                    style={{ background: coin.change > 0 ? "rgba(16,185,129,.12)" : "rgba(239,68,68,.12)" }}>
                    {coin.change > 0 ? <FaArrowUp className="text-[10px]" /> : <FaArrowDown className="text-[10px]" />}
                    {Math.abs(coin.change)}%
                  </div>
                </div>

                <div className="mb-4">
                  <Sparkline data={coin.spark} color={coin.strokeColor} />
                </div>

                <p className="text-2xl font-black text-white">
                  ${coin.price.toLocaleString("en-US", { minimumFractionDigits: coin.price < 1 ? 4 : 2, maximumFractionDigits: coin.price < 1 ? 4 : 2 })}
                </p>
                <p className="text-slate-600 text-xs mt-1 font-medium">USD</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ padding: "80px 5%", position: "relative", overflow: "hidden" }}>
        <div className="glow" style={{ width: 700, height: 350, top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "rgba(124,58,237,.07)" }} />
        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {STATS.map((s, i) => (
              <div key={i} className="text-center rounded-2xl py-10 px-6"
                style={{ background: "linear-gradient(135deg,rgba(124,58,237,.12),rgba(37,99,235,.07))", border: "1px solid rgba(124,58,237,.2)" }}>
                <div className="font-black text-white mb-2" style={{ fontSize: "clamp(32px,4vw,48px)" }}>
                  <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <p className="text-slate-500 text-sm font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: "80px 5%" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-violet-400 text-xs font-bold tracking-widest uppercase mb-4">Why CryptoX</p>
            <h2 className="font-black text-white tracking-tight mb-4" style={{ fontSize: "clamp(32px,4vw,48px)" }}>
              Built for Serious Traders
            </h2>
            <p className="text-slate-500 max-w-md mx-auto font-light">
              Every feature engineered to give you an edge in fast-moving markets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <div key={i} className="feat-card glass rounded-2xl p-7">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: "rgba(124,58,237,.1)", border: "1px solid rgba(124,58,237,.2)" }}>
                  <f.Icon className="text-violet-400 text-lg" />
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-light">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARKET TRENDS ── */}
      <section style={{ padding: "80px 5%", position: "relative", overflow: "hidden" }}>
        <div className="glow" style={{ width: 500, height: 500, bottom: -80, right: -80, background: "rgba(6,182,212,.07)", animation: "pulseGlow 8s ease-in-out infinite" }} />
        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col lg:flex-row items-center gap-16">

            {/* Left */}
            <div className="flex-1">
              <p className="text-violet-400 text-xs font-bold tracking-widest uppercase mb-5">Market Trends</p>
              <h2 className="font-black text-white tracking-tight leading-tight mb-5" style={{ fontSize: "clamp(32px,4vw,48px)" }}>
                Stay Ahead of<br />Every Move
              </h2>
              <p className="text-slate-400 leading-relaxed mb-10 font-light" style={{ maxWidth: 440 }}>
                Our AI processes millions of data points per second, surfacing actionable
                insights before they're priced in.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {TREND_ITEMS.map((t, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ background: "rgba(124,58,237,.1)", border: "1px solid rgba(124,58,237,.2)" }}>
                      <t.Icon className="text-violet-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold mb-1">{t.title}</p>
                      <p className="text-slate-500 text-sm font-light">{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right – chart */}
            <div className="flex-1 w-full">
              <div className="glass rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-5">
                  <p className="text-white font-bold">BTC / USD</p>
                  <div className="flex gap-2">
                    {["1H", "1D", "1W", "1M"].map(tab => (
                      <button key={tab} onClick={() => setActiveTab(tab)} className="tab-btn text-xs font-semibold px-3 py-1.5 rounded-lg"
                        style={{
                          background: activeTab === tab ? "rgba(124,58,237,.28)" : "transparent",
                          border: activeTab === tab ? "1px solid rgba(124,58,237,.5)" : "1px solid rgba(255,255,255,.07)",
                          color: activeTab === tab ? "#a78bfa" : "#64748b",
                        }}>{tab}</button>
                    ))}
                  </div>
                </div>

                <svg viewBox="0 0 400 160" className="w-full" style={{ height: 160 }}>
                  <defs>
                    <linearGradient id="cf" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[0.25, 0.5, 0.75].map((y, i) => (
                    <line key={i} x1="0" y1={y * 140 + 5} x2="400" y2={y * 140 + 5}
                      stroke="rgba(255,255,255,.05)" strokeWidth="1" />
                  ))}
                  <polygon points="0,140 40,118 80,128 120,88 160,98 200,68 240,78 280,48 320,58 360,33 400,43 400,150 0,150"
                    fill="url(#cf)" />
                  <polyline points="0,140 40,118 80,128 120,88 160,98 200,68 240,78 280,48 320,58 360,33 400,43"
                    fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="400" cy="43" r="4" fill="#7c3aed" />
                  <circle cx="400" cy="43" r="9" fill="rgba(124,58,237,.25)" />
                </svg>

                <div className="flex items-center justify-between mt-5">
                  <div>
                    <p className="text-2xl font-black text-white">$67,432</p>
                    <p className="text-xs font-semibold mt-1" style={{ color: "#10b981" }}>▲ +$1,543 (2.34%) today</p>
                  </div>
                  <button className="btn-p px-5 py-2.5 rounded-xl text-sm">Trade Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ padding: "60px 5%" }}>
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl text-center overflow-hidden"
            style={{
              padding: "80px 40px",
              background: "linear-gradient(135deg,rgba(124,58,237,.18),rgba(37,99,235,.12),rgba(6,182,212,.08))",
              border: "1px solid rgba(124,58,237,.25)",
            }}>
            <div className="glow" style={{ width: 500, height: 500, top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "rgba(124,58,237,.12)" }} />
            <div style={{ position: "relative" }}>
              <h2 className="font-black text-white tracking-tight mb-4" style={{ fontSize: "clamp(30px,4vw,48px)" }}>
                Ready to Start Trading?
              </h2>
              <p className="text-slate-400 mb-10 font-light" style={{ fontSize: 18 }}>
                Join 10 million+ traders. No minimum deposit. Withdraw anytime.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button className="btn-p px-10 py-4 rounded-full text-base">Create Free Account</button>
                <button className="btn-o px-10 py-4 rounded-full text-base">View Live Demo</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,.06)", padding: "64px 5% 40px" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-14">

            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-black text-white text-sm"
                  style={{ background: "linear-gradient(135deg,#7c3aed,#2563eb)" }}>X</div>
                <span className="text-lg font-bold text-white">CryptoX</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 font-light" style={{ maxWidth: 280 }}>
                The next-generation crypto trading platform built for speed, security, and global scale.
              </p>
              <div className="flex gap-3">
                {[FaTwitter, FaGithub, FaTelegram, FaDiscord].map((Icon, i) => (
                  <div key={i} className="soc-btn w-9 h-9 rounded-full flex items-center justify-center text-slate-400 cursor-pointer text-sm"
                    style={{ border: "1px solid rgba(255,255,255,.08)", background: "rgba(255,255,255,.03)" }}>
                    <Icon />
                  </div>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title}>
                <p className="text-slate-400 text-xs font-bold tracking-widest uppercase mb-5">{title}</p>
                <ul style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {links.map(l => (
                    <li key={l}><a href="#" className="foot-a">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="glass rounded-2xl p-6 mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-white font-bold mb-1">Stay in the loop</p>
              <p className="text-slate-500 text-sm font-light">Weekly market insights delivered to your inbox.</p>
            </div>
            {subscribed ? (
              <div className="flex items-center gap-2 font-semibold" style={{ color: "#10b981" }}>
                <FaCheckCircle /> Subscribed!
              </div>
            ) : (
              <div className="flex gap-3 w-full md:w-auto">
                <input type="email" placeholder="Enter your email" value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="text-slate-200 text-sm rounded-xl px-4 py-2.5 w-full md:w-64"
                  style={{
                    background: "rgba(255,255,255,.05)",
                    border: "1px solid rgba(255,255,255,.1)",
                    fontFamily: "inherit", fontWeight: 300,
                    transition: "border .25s",
                  }}
                  onFocus={e => e.target.style.borderColor = "rgba(124,58,237,.5)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,.1)"}
                />
                <button onClick={() => email && setSubscribed(true)}
                  className="btn-p px-5 py-2.5 rounded-xl text-sm whitespace-nowrap">Subscribe</button>
              </div>
            )}
          </div>

          {/* Bottom */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4"
            style={{ borderTop: "1px solid rgba(255,255,255,.05)", paddingTop: 28 }}>
            <p className="text-slate-600 text-sm font-light">© 2026 CryptoX. All rights reserved. Not financial advice.</p>
            <div className="flex gap-3">
              {["🇺🇸 English", "💲 USD"].map(item => (
                <span key={item} className="text-xs text-slate-500 font-medium px-3 py-1.5 rounded-lg"
                  style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)" }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}