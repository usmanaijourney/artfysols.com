import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Calendar, Clock, User, ArrowUpRight, BookOpen, Layers } from 'lucide-react';
import { getStoredBlogPosts } from '../data/blogData';
import { BlogPost } from '../types';

interface BlogPreviewSectionProps {
  onNavigateToBlog: () => void;
  onSelectPost?: (post: BlogPost) => void;
}

export const BlogPreviewSection: React.FC<BlogPreviewSectionProps> = ({
  onNavigateToBlog,
}) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const loaded = getStoredBlogPosts();
    setPosts(loaded.slice(0, 3));
  }, []);

  return (
    <section id="blog-preview" className="py-24 relative overflow-hidden bg-transparent border-t border-white/[0.06]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-[92%] sm:w-[88%] max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span>Research, Engineering & News</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight font-display">
              Latest Insights & Architecture
            </h2>
            <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mt-3 leading-relaxed">
              Explore our technical dispatches, production benchmarks, multi-agent frameworks, and enterprise AI blueprints.
            </p>
          </div>

          <button
            onClick={onNavigateToBlog}
            id="view-all-blog-posts-btn"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm shadow-lg shadow-violet-600/30 transition-all duration-200 active:scale-95 group shrink-0"
          >
            <BookOpen className="w-4 h-4 text-violet-200" />
            <span>Explore All Publications</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3-Column Featured Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              onClick={onNavigateToBlog}
              className="group cursor-pointer rounded-2xl bg-[#0c0c14] border border-white/[0.08] hover:border-violet-500/40 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_12px_30px_rgba(139,92,246,0.15)] hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Post Cover Image */}
              <div className="w-full h-48 rounded-xl overflow-hidden mb-4 relative bg-zinc-900">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-violet-300 border border-white/10">
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-zinc-400 mb-2 font-mono-code">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.publishDate}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-violet-300 transition-colors leading-snug line-clamp-2 font-display mb-2">
                    {post.title}
                  </h3>

                  <p className="text-sm text-zinc-400 line-clamp-3 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-violet-600/30 border border-violet-500/40 flex items-center justify-center text-[10px] font-bold text-violet-300">
                      {post.author.name.slice(0, 1)}
                    </div>
                    <span className="text-xs text-zinc-300 font-medium">
                      {post.author.name}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-violet-400 group-hover:text-violet-300 flex items-center gap-1">
                    <span>Read Article</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
