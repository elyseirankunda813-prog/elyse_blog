const images = [
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=500&fit=crop',
  'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1537432376144-ea7e7c7820f4?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=500&fit=crop',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&h=600&fit=crop',
]

export default function Gallery() {
  return (
    <section id="gallery" className="gallery">
      <h2 className="section-title">Gallery</h2>
      <div className="gallery-grid">
        {images.map((src, i) => (
          <div className="gallery-item" key={i}>
            <img src={src} alt={`Gallery ${i + 1}`} loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  )
}
