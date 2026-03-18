import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trophy, 
  ArrowRight, 
  Zap, 
  Activity, 
  ShieldCheck, 
  Menu, 
  X,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle navbar background change on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-700">
      
      {/* --- PUBLIC NAVBAR --- */}
      <nav className={`fixed w-full z-[100] transition-all duration-300 px-6 py-4 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
              <Activity size={24} strokeWidth={3} />
            </div>
            <span className={`text-2xl font-black tracking-tighter italic ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              RUN<span className="text-blue-500">SYS</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {['Home', 'Events', 'Services', 'Community'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className={`text-sm font-bold uppercase tracking-widest hover:text-blue-500 transition-colors ${
                  isScrolled ? 'text-gray-600' : 'text-gray-200'
                }`}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login" className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
              isScrolled ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}>
              Sign In
            </Link>
            <Link to="/register" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
              Register
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} className={isScrolled ? 'text-gray-900' : 'text-white'} /> : <Menu size={28} className={isScrolled ? 'text-gray-900' : 'text-white'} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300 md:hidden shadow-xl">
            <a href="#home" className="font-bold text-lg">Home</a>
            <a href="#events" className="font-bold text-lg">Events</a>
            <a href="#services" className="font-bold text-lg">Services</a>
            <hr />
            <Link to="/login" className="font-bold text-blue-600">Sign In</Link>
            <Link to="/register" className="w-full bg-blue-600 text-white p-4 rounded-xl text-center font-bold">Get Started</Link>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <header id="home" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?q=80&w=2074&auto=format&fit=crop" 
            alt="Marathon Runners" 
            className="w-full h-full object-cover scale-105 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-white"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mt-12">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-blue-300 text-xs font-black uppercase tracking-[0.2em] mb-8 animate-bounce">
            <Zap size={14} /> The 2026 Racing Season is Live
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
            FAST TRACK YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">VICTORY.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            The world-class management platform for organizers and elite marathon runners. 
            Real-time tracking, seamless payments, and data-driven performance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <Link to="/register" className="group px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-[1.5rem] font-black text-lg flex items-center justify-center transition-all shadow-2xl shadow-blue-500/40 hover:-translate-y-1">
              JOIN THE RACE <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/login" className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white backdrop-blur-xl border border-white/20 rounded-[1.5rem] font-black text-lg transition-all hover:border-white/40">
              EXPLORE EVENTS
            </Link>
          </div>
        </div>
      </header>

      {/* --- STATS STRIP --- */}
      <section className="relative z-20 -mt-16 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatBox value="150+" label="Global Races" />
          <StatBox value="85K" label="Active Runners" />
          <StatBox value="12" label="Major Sponsors" />
          <StatBox value="1.2M" label="Raised for Charity" />
        </div>
      </section>

      {/* --- SERVICES / FEATURES SECTION --- */}
      <section id="services" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-4">Core Ecosystem</h2>
            <h3 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              A complete toolkit for <br /> modern marathon management.
            </h3>
          </div>
          <p className="text-gray-500 font-medium max-w-xs">
            We bridge the gap between complex event logistics and the athlete's finish line.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Zap size={28} />}
            title="Instant Entry"
            desc="One-click registration for all major events with secure digital wallet integration."
          />
          <FeatureCard 
            icon={<Trophy size={28} />}
            title="Pro Dashboard"
            desc="Powerful analytics for organizers to manage heats, bibs, and real-time results."
          />
          <FeatureCard 
            icon={<ShieldCheck size={28} />}
            title="Verified Records"
            desc="Anti-fraud bib systems and official timing integration recognized worldwide."
          />
        </div>
      </section>

      {/* --- IMAGE / CONTENT SPLIT --- */}
      <section id="events" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?q=80&w=2070&auto=format&fit=crop" 
              alt="Athlete" 
              className="rounded-[3rem] shadow-2xl relative z-10"
            />
          </div>
          <div className="space-y-8">
            <h3 className="text-4xl font-black text-gray-900 leading-tight">
              Manage your entire <span className="text-blue-600">career</span> from one single profile.
            </h3>
            <p className="text-gray-600 text-lg font-medium leading-relaxed">
              Track every mile, every registration, and every payment. Our athlete portal gives you deep insights into your racing history and helps you prepare for the next big challenge.
            </p>
            <ul className="space-y-4">
              {['Real-time GPS Heatmaps', 'Instant Digital Receipts', 'Automated Bib Generation'].map(item => (
                <li key={item} className="flex items-center gap-3 font-bold text-gray-800">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={14} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto text-center bg-gray-900 rounded-[3rem] p-16 shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8">Ready to cross <br /> the finish line?</h2>
            <Link to="/register" className="inline-flex items-center gap-3 bg-blue-600 text-white px-12 py-5 rounded-[1.5rem] font-black uppercase tracking-widest hover:bg-blue-700 transition-all hover:scale-105">
              Get Started Now <ArrowRight size={20} />
            </Link>
          </div>
          {/* Decorative glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]"></div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-16 bg-white px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="text-blue-600" />
              <span className="text-2xl font-black tracking-tighter italic">RUN<span className="text-blue-500">SYS</span></span>
            </div>
            <p className="text-gray-400 max-w-sm font-medium">
              Leading the digital transformation of global marathon events. Run smarter, manage better.
            </p>
          </div>
          <div>
            <h4 className="font-black text-gray-900 mb-6 uppercase tracking-widest text-xs">Platform</h4>
            <div className="flex flex-col gap-4 text-gray-500 font-bold text-sm">
              <a href="#">Events</a>
              <a href="#">Pricing</a>
              <a href="#">Sponsors</a>
            </div>
          </div>
          <div>
            <h4 className="font-black text-gray-900 mb-6 uppercase tracking-widest text-xs">Support</h4>
            <div className="flex flex-col gap-4 text-gray-500 font-bold text-sm">
              <a href="#">Docs</a>
              <a href="#">Help Center</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 border-t border-gray-100 text-center text-gray-400 font-bold text-[10px] uppercase tracking-widest">
          © 2026 RUNSYS International. Engineered for Performance.
        </div>
      </footer>
    </div>
  );
};

// --- HELPER COMPONENTS ---

const StatBox = ({ value, label }: { value: string, label: string }) => (
  <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-50 text-center transform hover:-translate-y-2 transition-transform duration-500">
    <h4 className="text-3xl font-black text-gray-900 mb-1 tracking-tighter">{value}</h4>
    <p className="text-[10px] font-black uppercase tracking-widest text-blue-600">{label}</p>
  </div>
);

const FeatureCard = ({ icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="p-10 rounded-[2.5rem] bg-white border border-gray-100 hover:border-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/10 transition-all group">
    <div className="mb-6 w-14 h-14 bg-gray-50 text-blue-600 flex items-center justify-center rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:rotate-6 shadow-inner">
      {icon}
    </div>
    <h3 className="text-xl font-black mb-4 text-gray-900">{title}</h3>
    <p className="text-gray-500 font-medium leading-relaxed text-sm">{desc}</p>
  </div>
);

export default LandingPage;