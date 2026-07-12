import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, Clock, ArrowRight, Search, Tag, X } from 'lucide-react';

// Dynamic import of all blog post JSON files under /src/content/blog/
const blogModules = import.meta.glob('/src/content/blog/*.json', { eager: true });
const blogData = Object.values(blogModules)
  .map((m: any) => m.default || m)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [readingPost, setReadingPost] = useState<any | null>(null);

  // Extract all unique tags
  const allTags = Array.from(
    new Set(blogData.flatMap((post) => post.tags || []))
  );

  // Filter posts
  const filteredPosts = blogData.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTag = !selectedTag || (post.tags && post.tags.includes(selectedTag));

    return matchesSearch && matchesTag;
  });

  return (
    <div className="py-20 px-6 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-4">
          <span className="text-xs font-mono font-bold tracking-[0.3em] text-blue-600 dark:text-accent-blue uppercase">The Journal</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-light text-slate-900 dark:text-white tracking-tight">
            Our Corporate <span className="font-bold text-blue-900 dark:text-accent-blue italic">Insights</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl font-light">
            Stay updated with cutting-edge industry trends, computational coordination strategies, and virtual twin engineering.
          </p>
        </div>

        {/* Toolbar - Search & Tags filter */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="relative md:col-span-5 w-full">
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search articles..."
              className="w-full px-5 py-3.5 pl-12 rounded-2xl border border-white/50 dark:border-white/10 bg-white/40 dark:bg-navy-950/40 text-slate-950 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-accent-blue text-sm shadow-sm backdrop-blur-md"
            />
            <Search size={18} className="absolute left-4 top-4 text-slate-400" />
          </div>

          <div className="md:col-span-7 flex flex-wrap gap-2 justify-start md:justify-end">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4.5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer border ${
                selectedTag === null 
                  ? 'bg-blue-600 dark:bg-accent-blue text-white border-blue-600 dark:border-accent-blue' 
                  : 'bg-white/40 dark:bg-navy-950/40 text-slate-500 dark:text-slate-400 border-white/50 dark:border-white/10 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              All Tags
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4.5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer border flex items-center gap-1.5 ${
                  selectedTag === tag 
                    ? 'bg-blue-600 dark:bg-accent-blue text-white border-blue-600 dark:border-accent-blue' 
                    : 'bg-white/40 dark:bg-navy-950/40 text-slate-500 dark:text-slate-400 border-white/50 dark:border-white/10 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                <Tag size={12} />
                <span>{tag}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, idx) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group rounded-[2.5rem] glass-card shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 p-2 flex flex-col h-full bg-white/30 dark:bg-navy-900/30 backdrop-blur-md overflow-hidden"
              >
                {/* Cover Image */}
                <div className="relative overflow-hidden h-[260px] rounded-[2.1rem]">
                  <img 
                    src={post.coverImage} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 flex gap-1.5 flex-wrap">
                    {post.tags?.slice(0, 2).map((tag: string) => (
                      <span key={tag} className="bg-white/40 dark:bg-navy-950/55 backdrop-blur-md border border-white/40 dark:border-white/10 px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase text-blue-900 dark:text-accent-blue font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-6 flex flex-col gap-4 flex-grow text-slate-800 dark:text-slate-100">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-blue-600 dark:text-accent-blue" />
                      <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} className="text-blue-600 dark:text-accent-blue" />
                      <span>5 min read</span>
                    </span>
                  </div>

                  <h3 className="font-sans font-bold text-xl sm:text-2xl text-slate-950 dark:text-white group-hover:text-blue-700 dark:group-hover:text-accent-blue transition-colors tracking-tight leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-light line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="border-t border-slate-200/40 dark:border-white/10 pt-4 mt-auto flex items-center justify-between">
                    {/* Author sub-card */}
                    <div className="flex items-center gap-3">
                      <img 
                        src={post.authorImage} 
                        alt={post.author} 
                        className="w-8 h-8 rounded-full object-cover border border-white/20"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{post.author}</span>
                        <span className="text-[10px] text-slate-500 leading-none">{post.authorRole}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setReadingPost(post)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase font-mono tracking-wider text-blue-700 dark:text-accent-blue hover:gap-2.5 transition-all cursor-pointer"
                    >
                      <span>Read Article</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))
          ) : (
            <div className="md:col-span-2 text-center py-20 flex flex-col items-center gap-3">
              <span className="text-4xl">📚</span>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold">No publications found matching your search criteria.</p>
            </div>
          )}
        </div>

        {/* Fullscreen Reading Panel Overlay */}
        <AnimatePresence>
          {readingPost && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-md overflow-y-auto flex justify-center p-4 sm:p-6 md:p-10"
            >
              <motion.div
                initial={{ y: 50, scale: 0.95 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: 50, scale: 0.95 }}
                className="max-w-4xl w-full bg-white dark:bg-navy-950 rounded-[2.5rem] border border-slate-200/50 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col h-fit p-1"
              >
                {/* Header banner */}
                <div className="relative h-[250px] sm:h-[350px] rounded-[2.3rem] overflow-hidden">
                  <img 
                    src={readingPost.coverImage} 
                    alt={readingPost.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 sm:p-10">
                    <div className="flex gap-1.5 flex-wrap mb-3">
                      {readingPost.tags?.map((tag: string) => (
                        <span key={tag} className="bg-white/20 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase text-white font-bold">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-extrabold text-white tracking-tight leading-tight">
                      {readingPost.title}
                    </h2>
                  </div>

                  {/* Close button */}
                  <button
                    onClick={() => setReadingPost(null)}
                    className="absolute top-6 right-6 text-slate-300 hover:text-white p-2.5 rounded-full bg-navy-950/75 border border-white/10 hover:bg-navy-900 cursor-pointer transition-colors"
                    aria-label="Close Article"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Author card & metrics row */}
                <div className="px-6 sm:px-10 py-6 border-b border-slate-100 dark:border-white/5 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={readingPost.authorImage} 
                      alt={readingPost.author} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-600"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex flex-col">
                      <span className="font-sans font-bold text-sm text-slate-900 dark:text-white">{readingPost.author}</span>
                      <span className="text-xs text-slate-500">{readingPost.authorRole}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 font-mono text-xs text-slate-500 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-blue-600 dark:text-accent-blue" />
                      <span>{new Date(readingPost.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} className="text-blue-600 dark:text-accent-blue" />
                      <span>5 Min Read</span>
                    </span>
                  </div>
                </div>

                {/* Reading Body */}
                <div className="px-6 sm:px-10 py-8 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-light whitespace-pre-wrap max-w-none flex flex-col gap-6">
                  {/* Since Decap CMS saves as Markdown under 'body' (or we mapped as 'body' or 'content'), let's fallback to 'body' or 'content' */}
                  <p className="whitespace-pre-line leading-relaxed font-sans">{readingPost.body || readingPost.content}</p>
                </div>

                {/* Close Footer bar */}
                <div className="px-6 sm:px-10 py-6 border-t border-slate-100 dark:border-white/5 flex justify-end">
                  <button
                    onClick={() => setReadingPost(null)}
                    className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-sans text-xs font-bold tracking-wider uppercase cursor-pointer transition-all border border-slate-700 dark:bg-white dark:text-navy-950 dark:hover:bg-slate-100"
                  >
                    Close Article
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
