import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, ArrowRight, BookOpen, CalendarDays, Clock3, Search, Tag, Youtube, Play } from 'lucide-react';
import CodeBlock from './CodeBlock';
import { isValidElement } from 'react';


interface Post { slug: string; title: string; date: string; summary: string; tags: string[]; content: string; minutes: number; videoUrl?: string; }
const sources = import.meta.glob('./posts/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
function parsePost(path: string, source: string): Post {
  const match = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
  const header = match?.[1] ?? '';
  const meta: Record<string, string> = {};
  header.split('\n').forEach(line => { const i = line.indexOf(':'); if (i > -1) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^['"]|['"]$/g, ''); });
  const content = match ? source.slice(match[0].length) : source;
  return { slug: path.split('/').pop()!.replace(/\.md$/, ''), title: meta.title || 'Untitled', date: meta.date || '', summary: meta.summary || '', tags: (meta.tags || '').split(',').map(t => t.trim()).filter(Boolean), content, videoUrl: meta.youtube || undefined, minutes: Math.max(1, Math.ceil(content.split(/\s+/).length / 220)) };
}
// Accept standard YouTube watch, short and embed URLs. Never embed arbitrary URLs.
function youtubeId(url?: string): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();
    let id: string | null = null;
    if (host === 'youtu.be' || host === 'www.youtu.be') id = parsed.pathname.split('/')[1];
    else if (['youtube.com', 'www.youtube.com', 'm.youtube.com'].includes(host)) {
      if (parsed.pathname === '/watch') id = parsed.searchParams.get('v');
      else if (/^\/(shorts|embed|live)\//.test(parsed.pathname)) id = parsed.pathname.split('/')[2];
    }
    return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
  } catch { return null; }
}
function VideoFeature({ url }: { url?: string }) {
  const id = youtubeId(url);
  const [playing, setPlaying] = useState(false);
  if (!id) return null;
  return <section className="video-feature" aria-label="Article video">
    <div className="video-feature-copy"><div className="video-feature-label"><Youtube size={17}/> WATCH THE EXPLAINER</div><h2>Prefer watching?</h2><p>A companion walkthrough for this article. Watch the video, then explore the notes and code below.</p><a href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer">Open on YouTube <ArrowRight size={15}/></a></div>
    <div className="video-frame">{playing ? <iframe title="YouTube video explainer" src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/> : <button type="button" className="video-poster" onClick={() => setPlaying(true)} aria-label="Play YouTube video"><img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="Video thumbnail" loading="lazy"/><span className="video-play"><Play size={25} fill="currentColor"/></span></button>}</div>
  </section>;
}
const posts = Object.entries(sources).map(([path, content]) => parsePost(path, content)).sort((a,b) => b.date.localeCompare(a.date));
const categories = ['All', ...Array.from(new Set(posts.flatMap(p => p.tags)))];
function displayDate(date: string) { return new Date(date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); }
export default function Blog({ slug }: { slug?: string }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const post = slug ? posts.find(p => p.slug === slug) : undefined;
  useEffect(() => { window.scrollTo({top:0,behavior:'smooth'}); }, [slug]);
  if (slug && !post) return <section className="blog-shell"><h2>Article not found</h2><p>That article doesn't exist yet.</p><a href="#blog">← Back to writing</a></section>;
  if (post) 
    return <article className="blog-shell article">
      <a className="back-link" href="#blog"><ArrowLeft size={16}/> All articles</a>
      <div className="article-kicker">ENGINEERING NOTES / {post.tags[0]?.toUpperCase()}</div><h1>{post.title}</h1><p className="article-deck">{post.summary}</p><div className="post-meta"><span><CalendarDays size={15}/>{displayDate(post.date)}</span><span><Clock3 size={15}/>{post.minutes} min read</span></div>
      
      <div className="article-tags">{post.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      
      <VideoFeature key={post.slug} url={post.videoUrl}/><div className="markdown-body">
        

<ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    pre({ children }) {
      if (!isValidElement<{
        className?: string;
        children?: React.ReactNode;
      }>(children)) {
        return <pre>{children}</pre>;
      }

      const className = children.props.className ?? '';
      const language =
        /language-([\w+-]+)/.exec(className)?.[1] ?? 'text';

      const code = String(children.props.children ?? '')
        .replace(/\n$/, '');

      return <CodeBlock code={code} language={language} />;
    },
  }}
>
  {post.content}
</ReactMarkdown>
        
        
        </div>
        
        
        <div className="article-end"><strong>Thanks for reading.</strong><p>Thanks for reading. I hope these notes make complex systems concepts easier to understand and apply.</p>
        
        <a href="#blog">Explore more articles <ArrowRight size={16}/></a></div>
        
        </article>;
  const filtered = posts.filter(p => (category === 'All' || p.tags.includes(category)) && (p.title + p.summary + p.tags.join(' ')).toLowerCase().includes(query.toLowerCase()));
  return <section className="blog-shell"><div className="blog-eyebrow"><BookOpen size={16}/> THE ENGINEERING JOURNAL</div><h1>Technical Notes Experiments <span>& deep dives.</span></h1><p className="blog-description">Exploring the systems behind modern AI—from memory hierarchies and GPU kernels to distributed computing. Clear explanations, real tradeoffs, and reproducible experiments.</p><div className="blog-controls"><label className="blog-search"><Search size={17}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search articles..." aria-label="Search articles"/></label><div className="category-list" aria-label="Filter by topic">{categories.map(c => <button key={c} type="button" className={category === c ? 'selected' : ''} onClick={() => setCategory(c)}>{c}</button>)}</div></div><div className="post-list">{filtered.map((p, i) => <a href={'#blog/' + p.slug} className="post-card" key={p.slug}><div className="post-card-main"><div className="post-meta"><span><CalendarDays size={14}/>{displayDate(p.date)}</span><span><Clock3 size={14}/>{p.minutes} min read</span>{youtubeId(p.videoUrl) && <span className="video-indicator"><Youtube size={14}/> Video</span>}</div><h2>{p.title}</h2><p>{p.summary}</p><div className="article-tags">{p.tags.map(t => <span key={t}><Tag size={12}/>{t}</span>)}</div></div><div className="post-card-side"><span className="post-number">0{i+1}</span><ArrowRight size={21}/></div></a>)}{filtered.length === 0 && <p className="empty-results">No articles match your search.</p>}</div></section>;
}
