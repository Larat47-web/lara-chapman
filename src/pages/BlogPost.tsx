import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Mail } from 'lucide-react';
import { getBlogPostBySlug, type BlogPost as BlogPostType } from '../lib/api';

// Smart content processor for blog posts:
// Handles both structured HTML content (h2 + newlines) and completely flat plain text
const processContent = (raw: string): string => {
    if (!raw) return '';

    // ── Step 1: Strip forced white/light color spans ───────────────────────
    // Greedy strip of the typical admin-editor pattern:
    // <span style="color: #FFFFFF">ENTIRE CONTENT</span>
    let html = raw.replace(
        /^<span\s[^>]*style=["'][^"']*color\s*:\s*#(?:[Ff]{3}|[Ff]{6})[^"']*["'][^>]*>([\s\S]*)<\/span>$/,
        '$1'
    );
    // Also strip any remaining inline color overrides on spans (handles nesting)
    html = html.replace(
        /<span([^>]*?)style=["'][^"']*color\s*:[^"']*["']([^>]*)>/gi,
        '<span$1$2>'
    );
    // Remove bare empty <span> tags left over
    html = html.replace(/<span\s*>/gi, '').replace(/<\/span>/gi, '');

    // ── Step 2: Convert <br> tags to newlines ──────────────────────────────
    html = html.replace(/<br\s*\/?>/gi, '\n');

    // ── Step 3: Check if content already has block-level HTML structure ────
    const hasBlockTags = /<(p|h[1-6]|ul|ol|blockquote|pre|table|figure)\b/i.test(html);
    if (hasBlockTags) return html; // Already structured — return as-is

    // ── Step 4: Pure plain text path ──────────────────────────────────────
    // Strip any remaining inline HTML tags
    const text = html.replace(/<[^>]+>/g, '').trim();

    // ── Step 5: Handle bullet character "•" — group into <ul> ─────────────
    // Replace bullet sequences so we can split around them
    const hasBullets = text.includes('•');

    // Split on newlines first (if present)
    const lines: string[] = text.split(/\n+/).map(l => l.trim()).filter(Boolean);

    // If only 1 line (completely flat text — zero newlines), do sentence-level splitting
    const sections: string[] = lines.length <= 1
        ? splitFlat(text)
        : lines;

    // ── Step 6: Convert sections to HTML ──────────────────────────────────
    const parts: string[] = [];
    let bulletBuffer: string[] = [];

    const flushBullets = () => {
        if (bulletBuffer.length > 0) {
            parts.push(`<ul>\n${bulletBuffer.map(b => `  <li>${b}</li>`).join('\n')}\n</ul>`);
            bulletBuffer = [];
        }
    };

    for (const section of sections) {
        if (!section.trim()) continue;

        // Bullet item
        if (section.startsWith('•')) {
            bulletBuffer.push(section.replace(/^•\s*/, '').trim());
            continue;
        }

        // Multi-bullet chunk (e.g. "• A • B • C")
        if (hasBullets && section.includes('•')) {
            flushBullets();
            const items = section.split('•').map(s => s.trim()).filter(Boolean);
            parts.push(`<ul>\n${items.map(b => `  <li>${b}</li>`).join('\n')}\n</ul>`);
            continue;
        }

        flushBullets();

        // Heading detection: short (< 80 chars), no trailing sentence punctuation,
        // not starting mid-sentence (no lowercase start after capital letter pattern)
        const isHeading =
            section.length < 80 &&
            section.length > 3 &&
            !/[.!?,;]$/.test(section) &&
            !section.match(/^(a|an|the|in|of|for|and|but|or|with|to)\s/i);

        if (isHeading) {
            parts.push(`<h2>${section}</h2>`);
        } else {
            parts.push(`<p>${section}</p>`);
        }
    }

    flushBullets();
    return parts.join('\n');
};

// Splits a single flat string (no newlines) into readable sections
// by grouping sentences into ~2–3 sentence paragraphs
const splitFlat = (text: string): string[] => {
    // Detect embedded heading patterns like "Title – Location" or "Title\n Body"
    // Split on ". " followed by a capital letter (sentence boundary)
    const raw = text.split(/(?<=[.!?])\s+(?=[A-Z])/).map(s => s.trim()).filter(Boolean);
    if (raw.length <= 1) return [text];

    const sections: string[] = [];
    const SENTENCES_PER_PARA = 3;
    let buffer: string[] = [];

    for (let i = 0; i < raw.length; i++) {
        const s = raw[i];
        // Short sentence (< 80 chars) that doesn't end with punctuation = heading
        if (s.length < 80 && !/[.!?,;]$/.test(s)) {
            if (buffer.length) { sections.push(buffer.join(' ')); buffer = []; }
            sections.push(s);
        } else {
            buffer.push(s);
            if (buffer.length >= SENTENCES_PER_PARA) {
                sections.push(buffer.join(' '));
                buffer = [];
            }
        }
    }
    if (buffer.length) sections.push(buffer.join(' '));
    return sections;
};

const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<BlogPostType | null>(null);
    const [loading, setLoading] = useState(true);
    const [showShareMenu, setShowShareMenu] = useState(false);

    useEffect(() => {
        if (slug) {
            fetchPost(slug);
        }
    }, [slug]);

    const fetchPost = async (postSlug: string) => {
        setLoading(true);
        try {
            console.log('Fetching blog post with slug:', postSlug);
            const response = await getBlogPostBySlug(postSlug);
            console.log('API Response:', response);

            if (response.success && response.data) {
                setPost(response.data);
            } else {
                console.error('Post not found:', response.message);
                // Don't redirect immediately, show error
                setPost(null);
            }
        } catch (error) {
            console.error('Failed to fetch blog post:', error);
            setPost(null);
        } finally {
            setLoading(false);
        }
    };

    const shareUrl = window.location.href;
    const shareTitle = post?.title || '';

    const handleShare = (platform: string) => {
        const urls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
            email: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareUrl)}`
        };

        window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400');
        setShowShareMenu(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F5F1EA] flex items-center justify-center">
                <div className="text-[#222222] text-xl">Loading...</div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-[#F5F1EA] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-[#222222] mb-4">Blog Post Not Found</h1>
                    <p className="text-[#555555] mb-6">The blog post you're looking for doesn't exist.</p>
                    <button
                        onClick={() => navigate('/blog')}
                        className="px-6 py-3 bg-[#E76F51] hover:bg-[#D65D40] rounded-lg text-white transition-all"
                    >
                        Back to Blog
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5F1EA]">
            {/* Hero Section */}
            <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
                </div>

                {/* Back Button */}
                <button
                    onClick={() => navigate('/blog')}
                    className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg text-white transition-all z-10"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Blog
                </button>

                {/* Post Meta */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <span className="inline-block px-4 py-1 bg-purple-600 text-white text-sm rounded-full mb-4">
                                {post.category}
                            </span>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-gray-300">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={post.author.image}
                                        alt={post.author.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-medium text-white">{post.author.name}</p>
                                        <p className="text-sm text-gray-400">Real Estate Expert</p>
                                    </div>
                                </div>

                                <div className="hidden md:block w-px h-12 bg-white/20" />

                                <div className="flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>
                                            {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        <span>{post.readTime} min read</span>
                                    </div>
                                </div>

                                <div className="hidden md:block w-px h-12 bg-white/20" />

                                <div className="relative">
                                    <button
                                        onClick={() => setShowShareMenu(!showShareMenu)}
                                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
                                    >
                                        <Share2 className="w-4 h-4" />
                                        Share
                                    </button>

                                    {showShareMenu && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="absolute top-full mt-2 right-0 bg-gray-800 border border-white/10 rounded-lg shadow-xl overflow-hidden z-20"
                                        >
                                            <button
                                                onClick={() => handleShare('facebook')}
                                                className="flex items-center gap-3 w-full px-4 py-3 hover:bg-white/10 transition-colors text-left"
                                            >
                                                <Facebook className="w-5 h-5 text-blue-400" />
                                                <span>Facebook</span>
                                            </button>
                                            <button
                                                onClick={() => handleShare('twitter')}
                                                className="flex items-center gap-3 w-full px-4 py-3 hover:bg-white/10 transition-colors text-left"
                                            >
                                                <Twitter className="w-5 h-5 text-blue-400" />
                                                <span>Twitter</span>
                                            </button>
                                            <button
                                                onClick={() => handleShare('linkedin')}
                                                className="flex items-center gap-3 w-full px-4 py-3 hover:bg-white/10 transition-colors text-left"
                                            >
                                                <Linkedin className="w-5 h-5 text-blue-600" />
                                                <span>LinkedIn</span>
                                            </button>
                                            <button
                                                onClick={() => handleShare('email')}
                                                className="flex items-center gap-3 w-full px-4 py-3 hover:bg-white/10 transition-colors text-left"
                                            >
                                                <Mail className="w-5 h-5 text-gray-400" />
                                                <span>Email</span>
                                            </button>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-6 md:px-8 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {/* Excerpt */}
                    <div className="text-xl text-[#333333] mb-10 p-6 bg-white border-l-4 border-[#E76F51] rounded-r-xl shadow-sm leading-relaxed">
                        {post.excerpt}
                    </div>

                    {/* Main Content — custom scoped CSS for guaranteed formatting */}
                    <style>{`
                        .blog-content {
                            font-size: 1.125rem;
                            line-height: 1.85;
                            color: #222222;
                        }
                        .blog-content h1 {
                            font-family: 'Playfair Display', Georgia, serif;
                            font-size: 2.4rem;
                            font-weight: 700;
                            color: #1a1a1a;
                            margin-top: 3rem;
                            margin-bottom: 1rem;
                            line-height: 1.25;
                        }
                        .blog-content h2 {
                            font-family: 'Playfair Display', Georgia, serif;
                            font-size: 1.75rem;
                            font-weight: 700;
                            color: #1a1a1a;
                            margin-top: 2.5rem;
                            margin-bottom: 0.75rem;
                            padding-bottom: 0.4rem;
                            border-bottom: 2px solid #E76F51;
                            line-height: 1.3;
                        }
                        .blog-content h3 {
                            font-family: 'Playfair Display', Georgia, serif;
                            font-size: 1.35rem;
                            font-weight: 700;
                            color: #2a2a2a;
                            margin-top: 2rem;
                            margin-bottom: 0.5rem;
                            line-height: 1.35;
                        }
                        .blog-content h4 {
                            font-size: 1.15rem;
                            font-weight: 700;
                            color: #2a2a2a;
                            margin-top: 1.5rem;
                            margin-bottom: 0.4rem;
                        }
                        .blog-content p {
                            color: #333333;
                            margin-top: 0;
                            margin-bottom: 1.5rem;
                            font-size: 1.1rem;
                            line-height: 1.9;
                        }
                        .blog-content p:last-child { margin-bottom: 0; }
                        .blog-content ul,
                        .blog-content ol {
                            padding-left: 1.75rem;
                            margin-top: 0.75rem;
                            margin-bottom: 1.5rem;
                        }
                        .blog-content ul { list-style-type: disc; }
                        .blog-content ol { list-style-type: decimal; }
                        .blog-content li {
                            color: #333333;
                            margin-bottom: 0.6rem;
                            font-size: 1.05rem;
                            line-height: 1.75;
                        }
                        .blog-content a {
                            color: #E76F51;
                            text-decoration: none;
                            border-bottom: 1px solid rgba(231,111,81,0.3);
                            transition: color 0.2s, border-color 0.2s;
                        }
                        .blog-content a:hover {
                            color: #D65D40;
                            border-bottom-color: #D65D40;
                        }
                        .blog-content strong, .blog-content b {
                            color: #1a1a1a;
                            font-weight: 700;
                        }
                        .blog-content em, .blog-content i { font-style: italic; }
                        .blog-content blockquote {
                            margin: 1.5rem 0;
                            padding: 1rem 1.5rem;
                            border-left: 4px solid #E76F51;
                            background: white;
                            border-radius: 0 0.75rem 0.75rem 0;
                            font-size: 1.1rem;
                            color: #444444;
                        }
                        .blog-content code {
                            background: #f5f5f5;
                            color: #E76F51;
                            padding: 0.2em 0.45em;
                            border-radius: 4px;
                            font-family: monospace;
                            font-size: 0.9em;
                        }
                        .blog-content pre {
                            background: #f5f5f5;
                            padding: 1.25rem;
                            border-radius: 0.75rem;
                            overflow-x: auto;
                            margin: 1.5rem 0;
                        }
                        .blog-content img {
                            max-width: 100%;
                            border-radius: 1rem;
                            box-shadow: 0 4px 24px rgba(0,0,0,0.10);
                            margin: 2rem 0;
                        }
                        .blog-content hr {
                            border: none;
                            border-top: 1px solid #e5e7eb;
                            margin: 2.5rem 0;
                        }
                        .blog-content table {
                            width: 100%;
                            border-collapse: collapse;
                            margin: 1.5rem 0;
                            font-size: 1rem;
                        }
                        .blog-content th, .blog-content td {
                            border: 1px solid #e5e7eb;
                            padding: 0.75rem 1rem;
                            text-align: left;
                        }
                        .blog-content th {
                            background: #f9f8f5;
                            font-weight: 700;
                            color: #1a1a1a;
                        }
                        /* Strip any remaining inline color overrides */
                        .blog-content * { color: inherit !important; }
                        .blog-content h1, .blog-content h2, .blog-content h3, .blog-content h4 {
                            color: #1a1a1a !important;
                        }
                        .blog-content p { color: #333333 !important; }
                        .blog-content li { color: #333333 !important; }
                        .blog-content a { color: #E76F51 !important; }
                    `}</style>
                    <div
                        className="blog-content"
                        dangerouslySetInnerHTML={{ __html: processContent(post.content) }}
                    />

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <h3 className="text-[#222222] font-semibold mb-4">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="px-4 py-2 bg-white hover:bg-gray-100 text-[#555555] rounded-full text-sm flex items-center gap-2 transition-colors cursor-pointer border border-gray-200"
                                    >
                                        <Tag className="w-4 h-4" />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Author Bio */}
                    <div className="mt-12 p-8 bg-white border border-gray-200 rounded-2xl shadow-sm">
                        <div className="flex items-start gap-6">
                            <img
                                src={post.author.image}
                                alt={post.author.name}
                                className="w-24 h-24 rounded-full object-cover flex-shrink-0"
                            />
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-[#222222] mb-2">About {post.author.name}</h3>
                                <p className="text-[#555555] leading-relaxed">
                                    {post.author.name} is a dedicated real estate professional serving the Phoenix Valley.
                                    With years of experience and a passion for helping clients achieve their real estate dreams,
                                    {post.author.name} provides expert guidance through every step of the buying, selling, and investing process.
                                </p>
                                <button
                                    onClick={() => navigate('/contact')}
                                    className="mt-4 px-6 py-2 bg-[#E76F51] hover:bg-[#D65D40] rounded-lg text-white transition-all duration-200"
                                >
                                    Get in Touch
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-12 p-8 bg-[#E76F51] rounded-2xl text-center">
                        <h3 className="text-2xl font-bold text-white mb-4 font-serif">
                            Ready to Take the Next Step?
                        </h3>
                        <p className="text-white/90 mb-6">
                            Whether you're buying, selling, or investing in the Phoenix Valley, I'm here to help you succeed.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button
                                onClick={() => navigate('/contact')}
                                className="px-8 py-3 bg-white text-[#E76F51] hover:bg-gray-50 rounded-xl font-semibold transition-all duration-200"
                            >
                                Schedule a Consultation
                            </button>
                            <button
                                onClick={() => navigate('/blog')}
                                className="px-8 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl font-semibold transition-all duration-200"
                            >
                                Read More Articles
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default BlogPost;
