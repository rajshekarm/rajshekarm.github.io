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
  { name: 'gpu-kernel-optimization', area: 'GPU Computing', language: 'CUDA / C++', description: 'GPU performance study focused on matrix multiplication, tiling, memory coalescing, and kernel profiling.', url: '', details: 'Focus: latency, throughput, memory bandwidth', isExample: false },
  { name: 'cache-memory-simulator', area: 'Computer Architecture', language: 'C++', description: 'Computer architecture study focused on cache configurations, locality, replacement policies, and miss rates.', url: '', details: 'Focus: memory hierarchy and performance', isExample: false },
  { name: 'distributed-training-study', area: 'AI Infrastructure', language: 'Python / PyTorch', description: 'AI infrastructure study focused on communication and compute bottlenecks in distributed machine learning workloads.', url: '', details: 'Focus: scaling efficiency and utilization', isExample: false },
  { name: 'ReAugmenAI', area: 'Agentic AI', language: 'Python', description: 'Agentic AI project focused on retrieval-augmented workflows and context-aware responses.', url: 'https://github.com/rajshekarm/ReAugmenAI', details: 'GitHub repository', isExample: false },
  { name: 'mcp-server-generator', area: 'Agentic AI', language: 'Python', description: 'Tooling project for generating Model Context Protocol servers and connecting AI agents to tools and data.', url: 'https://github.com/rajshekarm/mcp-server-generator', details: 'GitHub repository', isExample: false },
  { name: 'DocuAgent', area: 'Agentic AI / RAG', language: 'Python / LangChain', description: 'Built document ingestion, chunking, embeddings, and PostgreSQL/pgvector retrieval with cited answers; added a re-ranking agent that improved answer accuracy by approximately 30%.', url: '', details: 'Docker deployment · query latency and error monitoring', isExample: false },
  { name: 'numerical-linear-algebra-lab', area: 'Mathematical Foundations', language: 'Python / NumPy', description: 'Research-oriented experiments on matrix multiplication, conditioning, eigendecomposition, SVD, and gradient computation for machine learning workloads.', url: '', details: 'Focus: numerical stability, complexity, and reproducibility', isExample: false },
  { name: 'roofline-analysis-toolkit', area: 'AI Hardware', language: 'Python', description: 'A performance-analysis toolkit for relating arithmetic intensity, memory bandwidth, and compute throughput across AI kernels and accelerators.', url: '', details: 'Focus: bandwidth limits, utilization, and bottleneck analysis', isExample: false },
  { name: 'systolic-array-simulator', area: 'Computer Architecture', language: 'Python / C++', description: 'A simulator for studying dataflow, tiling, utilization, and communication in matrix-multiplication accelerators.', url: '', details: 'Focus: data movement and accelerator efficiency', isExample: false },
  { name: 'cuda-warp-behavior-lab', area: 'GPU Architecture', language: 'CUDA / Nsight', description: 'A controlled CUDA study of warp divergence, memory coalescing, register pressure, occupancy, and their effects on kernel performance.', url: '', details: 'Focus: instruction execution, scheduling, and profiling', isExample: false },
];
const experience = [
  { role: 'Software Engineer — AI Tool Execution Platform Supporting MCP Infrastructure', company: 'Guidewire Software', context: 'via Gannu Software (Contract)', location: 'Chicago, IL', dates: 'July 2026 – Present', summary: 'Building a scalable AI Tool Execution Engine for secure, reliable enterprise AI integrations.', bullets: ['Developed Java/Spring Boot platform services and reusable execution pipelines with pluggable REST and Model Context Protocol (MCP) connectors for tool invocation across enterprise applications.', 'Implemented OAuth 2.0, JWT, role-based permissions, and input/output schema validation to enforce security and control data boundaries for AI-enabled integrations.', 'Engineered idempotency, retries, timeouts, circuit breakers, bounded concurrency, and bulkhead isolation, supporting 2,000+ invocations/sec with under 100ms platform-added latency.', 'Integrated OpenTelemetry, Prometheus, and Grafana for distributed tracing and operational monitoring; reduced MTTR by 40% while maintaining 99.9% availability.'] },
  { role: 'Backend Engineer — AI-Powered Virtual Try-On & E-Commerce Platform', company: 'fAIshion', context: '', location: 'Chicago, IL', dates: 'October 2025 – April 2026', summary: 'Building AI-enabled product discovery and virtual try-on services for e-commerce workflows.', bullets: ['Built OpenAI-powered API workflows, asynchronous processing pipelines, and parallel service integrations with retries and timeouts for AI-enabled product experiences.', 'Developed conversational intent parsing into validated OpenSearch queries, improving retrieval latency by 25%; automated evaluation with scoring, thresholds, and regression tests.', 'Reduced image-generation processing from 40 seconds to under 20 seconds and supported personalized discovery and cart workflows spanning 200+ retail brands; partnered with product and design teams in Agile releases.'] },
  { role: 'Teaching Assistant', company: 'Illinois Institute of Technology', context: '', location: 'Chicago, IL', dates: 'October 2024 – April 2025', summary: '', bullets: ['Mentored 100+ students in algorithms, data structures, and computational problem-solving relevant to reliable application development.'] },
  { role: 'Software Engineer — Post-Trade Infrastructure & Regulatory Reporting', company: 'SS&C Eze Software', context: 'SS&C Technologies', location: 'Hyderabad, India', dates: 'August 2019 – July 2020', summary: 'Building high-volume distributed services for trade processing and regulatory reporting.', bullets: ['Designed and maintained Java/Spring Boot microservices processing 5M+ trade events daily, with Kafka partitioning for ordered ingestion, validation, enrichment, and reporting.', 'Created transaction lineage and relational data models; resolved concurrency and out-of-order data issues with PostgreSQL reconciliation, reducing inconsistencies by approximately 98%.', 'Automated validation/rejection-repair workflows with AWS Lambda, reducing reporting exceptions from approximately 2.5% to below 0.4%; supported caching, code reviews, CI/CD, and zero-downtime deployments.'] },
  { role: 'Associate Software Engineer — Enterprise Onboarding & Account Management', company: 'SS&C Eze Software', context: '', location: 'Hyderabad, India', dates: 'June 2018 – July 2019', summary: 'Building secure enterprise onboarding, access management, and trading applications.', bullets: ['Developed Angular and ASP.NET full-stack onboarding workflows serving 100+ buy-side firms and approximately 1,000 traders; integrated risk checks and market-data/position feeds.', 'Implemented multi-tenant authorization, Kafka transactional outbox messaging, and automated access control, reducing onboarding time from approximately 7 days to 4 hours; supported production issue resolution.'] },
];
const education = [
  { degree: 'Master of Science, Computer Science', school: 'Illinois Institute of Technology', location: 'Chicago, IL', date: 'May 2025' },
  { degree: 'Bachelor of Engineering, Electronics and Communication Engineering', school: 'National Institute of Technology Tiruchirappalli', location: 'Tiruchirappalli, India', date: 'May 2018' },
];
const interests = ['Computer architecture & memory systems', 'GPU programming and kernel optimization', 'ML systems and efficient inference', 'Hardware–software co-design', 'Distributed and parallel computing'];
const nav = [{label:'About', href:'#about'}, {label:'Projects', href:'#projects'}, {label:'Experience', href:'#experience'}, {label:'Blog', href:'#blog'}, {label:'Research', href:'#research'}, {label:'Contact', href:'#contact'}];

function ExperienceSection() {
  return <section className="section" id="experience"><div className="section-head"><h3>Selected engineering experience</h3></div><div className="experience-list">{experience.map(job => <article className="experience-item" key={`${job.company}-${job.role}`}><div className="experience-heading"><div><h4>{job.role}</h4><p className="experience-company">{job.company}{job.context && <> - {job.context}</>}</p></div><div className="experience-meta"><span>{job.location}</span><span>{job.dates}</span></div></div>{job.summary && <p className="experience-summary">{job.summary}</p>}<ul>{job.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul></article>)}</div></section>;
}

function EducationSection() {
  return <section className="section education-real" id="education-real"><div className="section-head"><h3>Education</h3></div>{education.map(item => <div className="education-row" key={item.degree}><span className="edu-icon"><Cpu size={19}/></span><div><strong>{item.degree}</strong><p>{item.school} - {item.location} - {item.date}</p></div></div>)}</section>;
}

function ResearchStatement() {
  return <section className="research-statement"><p className="eyebrow">RESEARCH DIRECTION</p><h2>Systems research for efficient, reliable AI.</h2><p>I am interested in how architecture, software infrastructure, and agentic systems can be designed together. My approach combines implementation with measurement: form a systems question, build a controlled experiment, analyze the bottleneck, and communicate the tradeoffs clearly.</p><div className="research-questions"><span>How can AI systems move less data?</span><span>How can tool execution remain reliable at scale?</span><span>How should hardware and software co-evolve?</span></div></section>;
}

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
        <p className="bio">Researching efficient AI systems across hardware, software, and agentic infrastructure.</p>
        <a className="sidebar-button" href={`mailto:${person.email}`}>Get in touch</a><div className="sidebar-links"><span><MapPin size={16}/>{person.location}</span><a href={person.github} target="_blank" rel="noreferrer"><Github size={16}/> GitHub</a><a href={person.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16}/> LinkedIn</a><a href={`mailto:${person.email}`}><Mail size={16}/>{person.email}</a>{person.resume && <a href={person.resume}><FileText size={16}/> Resume</a>}</div><div className="sidebar-note">B.E./B.Tech · Electronics & Communication Engineering<br/>M.S. · Computer Science</div></aside>
      <main className="main">
        <ResearchStatement />
        <div className="tabs"><a href="#about" className="active"><BookOpen size={16}/> Overview</a><a href="#projects"><Code2 size={16}/> Projects</a><a href="#research"><Cpu size={16}/> Research interests</a></div>
        <section id="about" className="intro"><p className="eyebrow">HELLO, I'M {person.name.toUpperCase()}</p><h2>Building efficient systems<br/><span>at the intersection of hardware and AI.</span></h2><p>My background combines a Bachelor's in <strong>Electronics & Communication Engineering</strong> and a Master's in <strong>Computer Science</strong>. I'm interested in understanding computing across the stack—from processors and memory systems to performance-critical software and modern AI workloads.</p><p>I enjoy problems where architectural insight, careful measurement, and software optimization come together to make systems faster and more efficient.</p><div className="pills"><span>Computer Architecture</span><span>AI Systems</span><span>Performance Engineering</span><span>HW/SW Co-design</span></div></section>
        <section className="section" id="projects"><div className="section-head"><h3>Pinned projects <span className="count">{projects.length}</span></h3><span className="subtle">Selected projects and technical work</span></div><div className="project-grid">{projects.map(project => <article className="repo" key={project.name}><div className="repo-title"><BookOpen size={16}/>{project.url ? <a href={project.url} target="_blank" rel="noreferrer">{project.name} <ExternalLink size={12}/></a> : <strong>{project.name}</strong>}<span className="public">Project</span></div><p>{project.description}</p><div className="repo-bottom"><span className="language"><i/>{project.language}</span><span>{project.area}</span></div></article>)}</div><p className="hint">Explore the linked repositories for implementation details, experiments, and supporting documentation.</p></section>
        <section className="section" id="research"><div className="section-head"><h3>Research & technical interests</h3></div><p className="section-lead">I am especially drawn to the systems challenges behind large-scale AI: compute efficiency, memory movement, accelerator utilization, and communication overhead.</p><ul className="interest-list">{interests.map(i => <li key={i}>{i}</li>)}</ul><div className="note"><strong>Current focus</strong><p>I explore how software and hardware can be designed together to improve the efficiency of training and inference workloads.</p></div></section>
        <section className="section" id="education"><div className="section-head"><h3>Education</h3></div><div className="education-row"><span className="edu-icon"><Cpu size={19}/></span><div><strong>Master of Science, Computer Science</strong><p>Illinois Institute of Technology · Chicago, IL · May 2025</p></div></div><div className="education-row"><span className="edu-icon"><Cpu size={19}/></span><div><strong>Bachelor of Engineering, Electronics and Communication Engineering</strong><p>National Institute of Technology Tiruchirappalli · Tiruchirappalli, India · May 2018</p></div></div></section>
        <section className="section contact" id="contact"><div className="section-head"><h3>Let's connect</h3></div><p>Interested in AI compute infrastructure, systems engineering, and research-oriented collaborations.</p><a className="contact-link" href={`mailto:${person.email}`}><Mail size={17}/> {person.email} <ExternalLink size={14}/></a></section>
        <footer>© {new Date().getFullYear()} {person.name} · Built with React + TypeScript · Hosted on GitHub Pages</footer>
        <ExperienceSection />
        <EducationSection />
      </main>
    </div>}
  </div>;
}
