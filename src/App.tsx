import { BookOpen, Cpu, ExternalLink, Github, Linkedin, Mail, MapPin, FileText, Code2 } from 'lucide-react';
import './styles.css';
import Blog from './Blog';
import { useEffect, useState } from 'react';

// Replace placeholder identity, links, and sample projects with your real information before publishing.
const person = {
  name: 'Rajashekar Mudigonda', handle: 'rajshekarm', initials: 'RM',
  title: 'AI Systems · Computer Architecture · Hardware–Software Co-design',
  location: 'United States', email: 'rashekarmudigonda@gmail.com',
  github: 'https://github.com/rajshekarm', linkedin: 'https://www.linkedin.com/rajashekar-mudigonda',
  resume: '', // Put resume.pdf in /public and set this to '/resume.pdf'
};
const projects = [
  { name: 'gpu-kernel-optimization', area: 'GPU Computing', language: 'CUDA / C++', description: 'Example project: benchmark and optimize matrix multiplication using tiling, memory coalescing, and kernel profiling.', url: '', details: 'Focus: latency, throughput, memory bandwidth' },
  { name: 'cache-memory-simulator', area: 'Computer Architecture', language: 'C++', description: 'Example project: simulate cache configurations and study the impact of locality, replacement policies, and miss rates.', url: '', details: 'Focus: memory hierarchy and performance' },
  { name: 'distributed-training-study', area: 'AI Infrastructure', language: 'Python / PyTorch', description: 'Example project: profile communication and compute bottlenecks in distributed machine learning workloads.', url: '', details: 'Focus: scaling efficiency and utilization' },
];
const interests = ['Computer architecture & memory systems', 'GPU programming and kernel optimization', 'ML systems and efficient inference', 'Hardware–software co-design', 'Distributed and parallel computing'];
const nav = [{label:'About', href:'#about'}, {label:'Projects', href:'#projects'}, {label:'Blog', href:'#blog'}, {label:'Research', href:'#research'}, {label:'Contact', href:'#contact'}];

export default function App() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => { const sync = () => setHash(window.location.hash); window.addEventListener('hashchange', sync); return () => window.removeEventListener('hashchange', sync); }, []);
  const blogRoute = hash === '#blog' || hash.startsWith('#blog/');
  return <div className="page" id="top">
    <header className="topbar"><div className="top-inner"><a className="wordmark" href="#top"><span className="wordmark-icon">&lt;/&gt;</span> {person.handle}<span className="muted">.github.io</span></a><nav aria-label="Main navigation">{nav.map(item => <a href={item.href} key={item.href}>{item.label}</a>)}</nav></div></header>
    {blogRoute ? <Blog slug={hash.startsWith('#blog/') ? decodeURIComponent(hash.slice(6)) : undefined}/> : <div className="layout">
      <aside className="sidebar">
<img
  src={`${import.meta.env.BASE_URL}images/profile.png`}
  alt="Rajashekar Mudigonda"
  className="avatar"
/>        <h1>{person.name}</h1><p className="handle">@{person.handle}</p>
        <p className="bio">Engineering efficient AI systems from silicon to software.</p>
        <a className="sidebar-button" href={`mailto:${person.email}`}>Get in touch</a><div className="sidebar-links"><span><MapPin size={16}/>{person.location}</span><a href={person.github} target="_blank" rel="noreferrer"><Github size={16}/> GitHub</a><a href={person.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16}/> LinkedIn</a><a href={`mailto:${person.email}`}><Mail size={16}/>{person.email}</a>{person.resume && <a href={person.resume}><FileText size={16}/> Resume</a>}</div><div className="sidebar-note">B.E./B.Tech · Electronics & Communication Engineering<br/>M.S. · Computer Science</div></aside>
      <main className="main">
        <div className="tabs"><a href="#about" className="active"><BookOpen size={16}/> Overview</a><a href="#projects"><Code2 size={16}/> Projects</a><a href="#research"><Cpu size={16}/> Research interests</a></div>
        <section id="about" className="intro"><p className="eyebrow">HELLO, I'M {person.name.toUpperCase()}</p><h2>Building efficient systems<br/><span>at the intersection of hardware and AI.</span></h2><p>My background combines a Bachelor's in <strong>Electronics & Communication Engineering</strong> and a Master's in <strong>Computer Science</strong>. I'm interested in understanding computing across the stack—from processors and memory systems to performance-critical software and modern AI workloads.</p><p>I enjoy problems where architectural insight, careful measurement, and software optimization come together to make systems faster and more efficient.</p><div className="pills"><span>Computer Architecture</span><span>AI Systems</span><span>Performance Engineering</span><span>HW/SW Co-design</span></div></section>
        <section className="section" id="projects"><div className="section-head"><h3>Pinned projects <span className="count">{projects.length}</span></h3><span className="subtle">Representative examples · replace with real work</span></div><div className="project-grid">{projects.map(project => <article className="repo" key={project.name}><div className="repo-title"><BookOpen size={16}/>{project.url ? <a href={project.url} target="_blank" rel="noreferrer">{project.name} <ExternalLink size={12}/></a> : <strong>{project.name}</strong>}<span className="public">Example</span></div><p>{project.description}</p><div className="repo-bottom"><span className="language"><i/>{project.language}</span><span>{project.area}</span></div></article>)}</div><p className="hint">These are sample project ideas, not completed work. Add your own repositories, benchmarks, technical write-ups, and verified results.</p></section>
        <section className="section" id="research"><div className="section-head"><h3>Research & technical interests</h3></div><p className="section-lead">I am especially drawn to the systems challenges behind large-scale AI: compute efficiency, memory movement, accelerator utilization, and communication overhead.</p><ul className="interest-list">{interests.map(i => <li key={i}>{i}</li>)}</ul><div className="note"><strong>What I'm exploring</strong><p>How software and hardware can be designed together to improve the efficiency of training and inference workloads. This section can later feature papers, experiments, benchmark reports, or a thesis.</p></div></section>
        <section className="section" id="education"><div className="section-head"><h3>Education</h3></div><div className="education-row"><span className="edu-icon"><Cpu size={19}/></span><div><strong>Master of Science in Computer Science</strong><p>University Name · Graduation year</p></div></div><div className="education-row"><span className="edu-icon"><Cpu size={19}/></span><div><strong>Bachelor's in Electronics & Communication Engineering</strong><p>University Name · Graduation year</p></div></div></section>
        <section className="section contact" id="contact"><div className="section-head"><h3>Let's connect</h3></div><p>Interested in AI compute infrastructure, systems engineering, and research-oriented collaborations.</p><a className="contact-link" href={`mailto:${person.email}`}><Mail size={17}/> {person.email} <ExternalLink size={14}/></a></section>
        <footer>© {new Date().getFullYear()} {person.name} · Built with React + TypeScript · Hosted on GitHub Pages</footer>
      </main>
    </div>}
  </div>;
}
