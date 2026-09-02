import React, { useEffect } from "react";
import { ArrowLeft, Calendar, Clock, User, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { useData } from "../context/DataContext";
import { mediaUrl } from "../utils/media";
import ReactMarkdown from 'react-markdown';

interface BlogDetailsProps {
  slug: string;
  onChangePage: (pageId: string) => void;
}

export const BlogDetails: React.FC<BlogDetailsProps> = ({ slug, onChangePage }) => {
  const { blogsData } = useData();
  
  const post = blogsData?.find(b => b.slug === slug || b.id === slug);
  const coverImage = post ? (mediaUrl(post.coverImage) || mediaUrl(post.image) || mediaUrl(post.imageUrl)) : "";

  useEffect(() => {
    if (post) {
      const activeTitle = post.seo?.metaTitle || `${post.title} | Tech Master`;
      const activeDesc = post.seo?.metaDescription || post.excerpt || post.title;
      const canonicalUrl = `https://www.techmasterco.com/blog/${post.slug || post.id}`;
      const ogImg = coverImage || "https://www.techmasterco.com/Trendz%20talk%20logo.png";

      document.title = activeTitle;

      const setMeta = (name: string, content: string, isProperty = false) => {
        const attr = isProperty ? "property" : "name";
        let elem = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
        if (!elem) {
          elem = document.createElement("meta");
          elem.setAttribute(attr, name);
          document.head.appendChild(elem);
        }
        elem.setAttribute("content", content);
      };

      setMeta("description", activeDesc);
      setMeta("og:title", activeTitle, true);
      setMeta("og:description", activeDesc, true);
      setMeta("og:image", ogImg, true);
      setMeta("og:url", canonicalUrl, true);
      setMeta("og:type", "article", true);
      setMeta("twitter:title", activeTitle);
      setMeta("twitter:description", activeDesc);
      setMeta("twitter:image", ogImg);

      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute("href", canonicalUrl);
    }
  }, [post, coverImage]);

  if (!post) {
    return (
      <div className="relative text-white min-h-screen pt-32 pb-8 px-6 overflow-hidden flex flex-col items-center justify-center">
        <h2 className="text-3xl font-serif text-gold mb-4">Article Not Found</h2>
        <button onClick={() => onChangePage("blog")} className="px-6 py-2 border border-white/20 rounded-full hover:bg-white/10 transition-colors">
          Return to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="relative text-white min-h-screen pt-24 pb-20 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] aurora-glow-purple opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] aurora-glow-gold opacity-10 pointer-events-none" />

      <article className="max-w-4xl mx-auto relative z-10">
        <button 
          onClick={() => onChangePage("blog")}
          className="flex items-center gap-2 text-xs text-gray-400 hover:text-gold uppercase tracking-widest transition-colors mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Journal
        </button>

        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-widest font-mono mb-6">
            <span className="px-3 py-1 bg-gold/10 text-gold border border-gold/20 rounded-full">
              {post.category}
            </span>
            <div className="flex items-center gap-1.5 text-gray-400">
              <Calendar className="w-3.5 h-3.5" /> {post.publishDate || post.date}
            </div>
            <div className="flex items-center gap-1.5 text-gray-400">
              <Clock className="w-3.5 h-3.5" /> {post.readTime}
            </div>
            <div className="flex items-center gap-1.5 text-gray-400">
              <User className="w-3.5 h-3.5" /> {post.author || "TechMaster"}
            </div>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-light leading-tight mb-8"
          >
            {post.title}
          </motion.h1>

          {coverImage && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="w-full aspect-[21/9] md:aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 relative"
            >
              <img src={coverImage} alt={post.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </motion.div>
          )}
        </header>

        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:font-light prose-a:text-gold prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-img:border prose-img:border-white/10 prose-hr:border-white/10">
          <ReactMarkdown>
             {post.content}
          </ReactMarkdown>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-4 h-4 text-gold" />
              <span className="text-xs uppercase tracking-widest text-gray-400">Tags</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string, idx: number) => (
                <span key={idx} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};
