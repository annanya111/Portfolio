import React, { useState, useEffect, useCallback, useMemo, useRef, memo } from 'react';
import { Menu, X, Mail, ExternalLink, ArrowRight, ChevronDown, Share2, Code } from 'lucide-react';

// ============================================
// COMPONENT: Navigation (Memoized)
// ============================================
const Navbar = memo(({ currentPage, setCurrentPage, navigation }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = useCallback((id) => {
    setCurrentPage(id);
    setMenuOpen(false);
  }, [setCurrentPage]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-950/50 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-2xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:scale-110 transition-transform duration-300 cursor-pointer"
          aria-label="Home"
        >
          Annanya
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`font-semibold transition-all duration-300 relative group outline-none ${
                currentPage === item.id ? 'text-blue-400' : 'text-slate-300 hover:text-white'
              }`}
              aria-current={currentPage === item.id ? 'page' : undefined}
            >
              {item.label}
              <div
                className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 ${
                  currentPage === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 right-0 border-t border-white/10 backdrop-blur-xl md:hidden">
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-all duration-300 outline-none ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
});
Navbar.displayName = 'Navbar';

// ============================================
// COMPONENT: Hero Section with Intro
// ============================================
const HeroSection = memo(({ setCurrentPage, mousePosition }) => {
  const tilt = useMemo(() => {
    const tiltX = (mousePosition.y - 96) * 0.005;
    const tiltY = (mousePosition.x - 96) * 0.005;
    return { tiltX, tiltY };
  }, [mousePosition]);

  const scrollToProjects = () => {
    setCurrentPage('projects');
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden pt-20">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob will-change-transform" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 will-change-transform" />
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 will-change-transform" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* 3D Photo Container */}
        <div className="mb-12 group">
          <div className="relative w-48 h-48 mx-auto mb-8">
            {/* Glowing background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl will-change-transform" />

            {/* Photo */}
            <div
              className="relative w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl overflow-hidden border border-white/10 backdrop-blur-xl shadow-2xl will-change-transform transition-transform duration-300"
              style={{
                transform: `perspective(1000px) rotateX(${tilt.tiltX}deg) rotateY(${tilt.tiltY}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 flex items-center justify-center text-6xl font-bold">
                👨‍💻
              </div>
            </div>
          </div>
        </div>

        {/* Name - Bold */}
        <h1 className="text-5xl md:text-6xl font-black mb-4 text-white animate-fade-in leading-tight">
          Hi, I'm <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Annanya Tiwari</span>
        </h1>

        {/* Main Description */}
        <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto animate-fade-in leading-relaxed">
          An aspiring Software Developer focused on building scalable, efficient, and user-centric applications using modern technologies and strong problem-solving skills.
        </p>

        {/* Title */}
        <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto animate-fade-in leading-relaxed">
          <span className="font-bold">Software Developer</span>
          <br />
          React • Java • Problem Solving
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in flex-wrap">
          <button
            onClick={scrollToProjects}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-bold text-white hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group outline-none will-change-transform"
          >
            View My Work <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </button>
          <button
            onClick={() => setCurrentPage('contact')}
            className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl font-bold text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105 active:scale-95 outline-none will-change-transform"
          >
            Get In Touch
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="animate-bounce mt-12 hidden md:block">
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-slate-400">Scroll to explore</p>
            <ChevronDown size={24} className="text-slate-400" />
          </div>
        </div>
      </div>
    </section>
  );
});
HeroSection.displayName = 'HeroSection';

// ============================================
// COMPONENT: About Section
// ============================================
const AboutSection = memo(() => (
  <section className="min-h-screen py-20 px-4">
    <div className="max-w-5xl mx-auto">
      <h2 className="text-5xl md:text-6xl font-black mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
        About Me
      </h2>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-slate-300 leading-relaxed">
          <p className="text-lg">
            I'm <span className="font-bold text-white">Annanya Tiwari</span>, an aspiring software developer passionate about creating scalable and efficient solutions. With a strong foundation in problem-solving and modern web technologies, I'm committed to building applications that make a real impact.
          </p>
          <p className="text-lg">
            My expertise spans frontend development with React, backend fundamentals with Java, and a deep understanding of data structures and algorithms. I love working on real-world projects that challenge me to grow and learn continuously.
          </p>
          <p className="text-lg">
            When I'm not coding, you can find me contributing to open-source projects, solving problems on LeetCode, or learning new technologies to expand my skillset.
          </p>
        </div>

        <div className="space-y-4">
          <StatCard number="123+" label="LeetCode Problems Solved" color="blue" />
          <StatCard number="3+" label="Completed Projects" color="purple" />
          <StatCard number="100%" label="Passion for Learning" color="pink" />
        </div>
      </div>
    </div>
  </section>
));
AboutSection.displayName = 'AboutSection';

// ============================================
// COMPONENT: Stat Card (Memoized)
// ============================================
const StatCard = memo(({ number, label, color }) => {
  const colorMap = {
    blue: 'hover:border-blue-400/50 hover:shadow-blue-500/20',
    purple: 'hover:border-purple-400/50 hover:shadow-purple-500/20',
    pink: 'hover:border-pink-400/50 hover:shadow-pink-500/20',
  };

  return (
    <div
      className={`group p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl transition-all duration-300 transform hover:scale-105 will-change-transform outline-none ${colorMap[color]} shadow-lg`}
    >
      <h3 className={`text-3xl font-bold mb-2 bg-gradient-to-r ${
        color === 'blue' ? 'from-blue-400 to-blue-600' :
        color === 'purple' ? 'from-purple-400 to-purple-600' :
        'from-pink-400 to-pink-600'
      } bg-clip-text text-transparent`}>
        {number}
      </h3>
      <p className="text-slate-300">{label}</p>
    </div>
  );
});
StatCard.displayName = 'StatCard';

// ============================================
// COMPONENT: Skills Section
// ============================================
const SkillsSection = memo(() => {
  const skillGroups = useMemo(() => [
    {
      category: 'Frontend',
      items: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Responsive Design'],
    },
    {
      category: 'Backend & Core',
      items: ['Java', 'OOP Principles', 'Data Structures', 'Algorithms', 'Problem Solving'],
    },
    {
      category: 'Tools & APIs',
      items: ['Git', 'OpenWeatherMap API', 'VS Code', 'Chrome DevTools', 'Netlify'],
    },
  ], []);

  const skillBars = useMemo(() => [
    { name: 'Frontend Development', level: 85 },
    { name: 'Java & OOP', level: 82 },
    { name: 'Problem Solving', level: 88 },
    { name: 'API Integration', level: 80 },
  ], []);

  return (
    <section className="min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-black mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Skills & Expertise
        </h2>

        {/* Skill Groups */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {skillGroups.map((skillGroup, idx) => (
            <SkillCard key={skillGroup.category} {...skillGroup} idx={idx} />
          ))}
        </div>

        {/* Skill Bars */}
        <div className="space-y-8">
          {skillBars.map((skill, idx) => (
            <SkillBar key={skill.name} {...skill} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
});
SkillsSection.displayName = 'SkillsSection';

// ============================================
// COMPONENT: Skill Card (Memoized)
// ============================================
const SkillCard = memo(({ category, items, idx }) => (
  <div
    className="group p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl hover:border-white/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 will-change-transform outline-none"
    style={{ transitionDelay: `${idx * 100}ms` }}
  >
    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
      <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full" />
      {category}
    </h3>
    <ul className="space-y-3">
      {items.map((skill, skillIdx) => (
        <li
          key={skill}
          className="text-slate-300 flex items-center gap-3 transform transition-all duration-300 group-hover:translate-x-2"
          style={{ transitionDelay: `${skillIdx * 50}ms` }}
        >
          <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex-shrink-0" />
          {skill}
        </li>
      ))}
    </ul>
  </div>
));
SkillCard.displayName = 'SkillCard';

// ============================================
// COMPONENT: Skill Bar (Memoized)
// ============================================
const SkillBar = memo(({ name, level, idx }) => (
  <div key={name}>
    <div className="flex justify-between mb-2">
      <span className="text-slate-300 font-semibold">{name}</span>
      <span className="text-blue-400 font-bold">{level}%</span>
    </div>
    <div className="h-3 bg-white/10 rounded-full overflow-hidden border border-white/20">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out will-change-transform"
        style={{
          width: `${level}%`,
          transitionDelay: `${idx * 100}ms`,
        }}
      />
    </div>
  </div>
));
SkillBar.displayName = 'SkillBar';

// ============================================
// COMPONENT: Projects Section
// ============================================
const ProjectsSection = memo(() => {
  const projects = useMemo(() => [
    {
      title: 'Weather Forecasting Web App',
      description: 'Built a responsive weather app fetching real-time data using OpenWeatherMap API. Users can search any city and view live temperature, humidity and weather conditions. Deployed live on Netlify with mobile-responsive design.',
      tech: ['HTML', 'CSS', 'JavaScript', 'OpenWeatherMap API'],
      link: 'https://github.com/annanya111/weatherapp',
    },
    {
      title: 'JavaScript Calculator',
      description: 'Built a fully functional calculator supporting addition, subtraction, multiplication and division. Implemented error handling for invalid inputs using JavaScript try/catch. Styled with CSS Grid for a clean, responsive button layout.',
      tech: ['HTML', 'CSS', 'JavaScript'],
      link: 'https://github.com/annanya111/BMICALCULATOR',
    },
    {
      title: 'Airline Management System',
      description: 'Built a console-based system to manage airline bookings and customer records. Applied OOP principles including inheritance, encapsulation, and polymorphism. Simulated real-world workflows: booking, cancellation, and scheduling.',
      tech: ['Java', 'OOP', 'Data Structures'],
      link: 'https://github.com/annanya111',
    },
  ], []);

  return (
    <section className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-black mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <ProjectCard key={project.title} {...project} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
});
ProjectsSection.displayName = 'ProjectsSection';

// ============================================
// COMPONENT: Project Card (Memoized) - Light Grey with Bold Black Text
// ============================================
const ProjectCard = memo(({ title, description, tech, idx, link }) => (
  <a
    href={link}
    className="group relative h-auto rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-105 will-change-transform outline-none focus:ring-2 focus:ring-blue-400/50"
    style={{ transitionDelay: `${idx * 50}ms` }}
    target="_blank"
    rel="noopener noreferrer"
  >
    {/* Card content - Light grey background with dark text */}
    <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 group-hover:border-gray-400 transition-all duration-300 p-8 flex flex-col justify-between rounded-2xl overflow-hidden h-full min-h-96">
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

      {/* Content */}
      <div>
        <h3 className="text-2xl font-black text-black mb-4 group-hover:translate-x-2 transition-transform duration-300">
          {title}
        </h3>
        <p className="text-gray-700 mb-6 leading-relaxed text-sm font-medium">
          {description}
        </p>
      </div>

      {/* Tech tags - Bold and visible */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tech.map((t, tidx) => (
          <span
            key={t}
            className="px-4 py-2 text-xs font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full border border-blue-600 transform transition-all duration-300 group-hover:scale-110"
            style={{ transitionDelay: `${tidx * 30}ms` }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* View button */}
      <button
        className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-white opacity-0 group-hover:opacity-100 transform transition-all duration-300 group-hover:scale-105 flex items-center justify-center gap-2 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-200 focus:ring-blue-400"
        onClick={(e) => {
          e.preventDefault();
          window.open(link, '_blank');
        }}
      >
        View on GitHub <ExternalLink size={18} />
      </button>

      {/* Hover shine effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, transparent 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
          transform: 'rotate(45deg)',
        }}
      />
    </div>
  </a>
));
ProjectCard.displayName = 'ProjectCard';

// ============================================
// COMPONENT: Contact Section
// ============================================
const ContactSection = memo(() => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  }, [formData]);

  const contacts = useMemo(() => [
    { icon: Mail, label: 'Email', value: 'annanyatiwari2004@gmail.com', color: 'from-blue-400 to-blue-600', link: 'mailto:annanyatiwari2004@gmail.com' },
    { icon: Share2, label: 'LinkedIn', value: 'linkedin.com/in/annanya-tiwari', color: 'from-purple-400 to-purple-600', link: 'https://linkedin.com/in/annanya-tiwari' },
    { icon: Code, label: 'GitHub', value: 'github.com/annanya111', color: 'from-pink-400 to-pink-600', link: 'https://github.com/annanya111' },
  ], []);

  return (
    <section className="min-h-screen py-20 px-4 flex items-center">
      <div className="max-w-3xl mx-auto w-full">
        <h2 className="text-5xl md:text-6xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Let's Connect
        </h2>

        <p className="text-lg text-slate-300 mb-12 max-w-2xl">
          I'm open to exciting opportunities and collaborations. Have a project in mind or just want to chat? Feel free to reach out!
        </p>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contacts.map(({ icon: Icon, label, value, color, link }) => (
            <a
              key={label}
              href={link}
              className="group p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl hover:border-white/40 transition-all duration-300 transform hover:scale-105 will-change-transform text-center outline-none focus:ring-2 focus:ring-blue-400/50"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="text-white" size={24} />
              </div>
              <h3 className="text-white font-bold mb-2">{label}</h3>
              <p className="text-slate-400 text-sm truncate">{value}</p>
            </a>
          ))}
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
          <div>
            <label htmlFor="name" className="block text-slate-300 font-semibold mb-2">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="John Doe"
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/30 transition-all duration-300 will-change-transform"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-slate-300 font-semibold mb-2">
              Your Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john@example.com"
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/30 transition-all duration-300 will-change-transform"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-slate-300 font-semibold mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Your message here..."
              rows="5"
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/30 transition-all duration-300 resize-none will-change-transform"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-bold text-white hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95 outline-none focus:ring-2 focus:ring-blue-400/50 will-change-transform"
          >
            {submitted ? '✓ Message Sent!' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
});
ContactSection.displayName = 'ContactSection';

// ============================================
// COMPONENT: Footer (Memoized)
// ============================================
const Footer = memo(() => (
  <footer className="border-t border-white/10 backdrop-blur-xl bg-slate-950/50 py-8 px-4">
    <div className="max-w-6xl mx-auto text-center text-slate-400 text-sm">
      <p>© 2024 Annanya Tiwari. Built with React & Tailwind CSS.</p>
    </div>
  </footer>
));
Footer.displayName = 'Footer';

// ============================================
// MAIN: App Component
// ============================================
export default function Portfolio() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const rafRef = useRef(null);

  const navigation = useMemo(
    () => [
      { id: 'home', label: 'Home' },
      { id: 'about', label: 'About' },
      { id: 'skills', label: 'Skills' },
      { id: 'projects', label: 'Projects' },
      { id: 'contact', label: 'Contact' },
    ],
    []
  );

  // OPTIMIZATION: Use requestAnimationFrame for mouse tracking
  const handleMouseMove = useCallback((e) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(() => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleMouseMove]);

  // OPTIMIZATION: Render page content conditionally
  const renderPage = useCallback(() => {
    switch (currentPage) {
      case 'home':
        return <HeroSection setCurrentPage={setCurrentPage} mousePosition={mousePosition} />;
      case 'about':
        return <AboutSection />;
      case 'skills':
        return <SkillsSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return null;
    }
  }, [currentPage, mousePosition]);

  return (
    <div
      className="min-h-screen bg-slate-950 text-white overflow-x-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(15, 23, 42, 1), rgba(2, 6, 23, 1))',
      }}
    >
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} navigation={navigation} />
      <main className="pt-20">{renderPage()}</main>
      <Footer />

      {/* Global Styles */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #a855f7);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #60a5fa, #c084fc);
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}