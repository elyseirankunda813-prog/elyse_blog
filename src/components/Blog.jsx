const posts = [
  {
    title: 'Building Modern Web Apps with React 19',
    excerpt: 'A deep dive into the new features in React 19 and how they change the way we build user interfaces.',
    date: 'Jun 15, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
  },
  {
    title: 'The Developer\'s Guide to Rwanda\'s Tech Scene',
    excerpt: 'An overview of the growing technology ecosystem in Rwanda and opportunities for developers.',
    date: 'May 28, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop',
  },
  {
    title: 'Why Flutter is the Future of Cross-Platform Development',
    excerpt: 'Exploring why Flutter has become my go-to framework for building beautiful mobile applications.',
    date: 'Apr 10, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
  },
]

import { lazy, Suspense } from 'react'
const SectionScene = lazy(() => import('./SectionScene'))

export default function Blog() {
  return (
    <section id="blog" className="blog">
      <div className="section-bg"><Suspense fallback={null}><SectionScene variant="stars" /></Suspense></div>
      <div className="blog-header">
        <span className="section-label">Blog</span>
        <h2 className="section-title">Latest Articles</h2>
        <p className="blog-subtitle">
          Thoughts, tutorials, and insights from my journey in software development
        </p>
      </div>
      <div className="blog-grid">
        {posts.map((post, i) => (
          <article className="blog-card stagger-item" style={{ '--i': i }} key={i}>
            <div className="blog-image">
              <img src={post.image} alt={post.title} loading="lazy" />
            </div>
            <div className="blog-body">
              <div className="blog-meta">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="blog-title">{post.title}</h3>
              <p className="blog-excerpt">{post.excerpt}</p>
              <a href="#" className="blog-link">Read More →</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
