import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, Award, Star, Trophy, Medal, Flame, BookOpen } from 'lucide-react'
import Modal from '../Modal/Modal'
import styles from './Carousel.module.css'

const diplomas = [
  {
    id: 1,
    image: '/diploma1.jpeg',
    title: 'Diplomă 1',
    subtitle: 'Dans Sportiv',
    date: '2026',
    location: 'România',
    icon: Trophy,
    color: '#c9a84c',
    description: 'Diplomă dans sportiv.',
    details: [],
  },
  {
    id: 2,
    image: '/diploma2.jpeg',
    title: 'Diplomă 2',
    subtitle: 'Dans Sportiv',
    date: '2026',
    location: 'România',
    icon: Award,
    color: '#c0c0c0',
    description: 'Diplomă dans sportiv.',
    details: [],
  },
  {
    id: 3,
    image: '/diploma3.jpeg',
    title: 'Diplomă 3',
    subtitle: 'Dans Sportiv',
    date: '2026',
    location: 'România',
    icon: Star,
    color: '#c9a84c',
    description: 'Diplomă dans sportiv.',
    details: [],
  },
  {
    id: 4,
    image: '/diploma4.jpeg',
    title: 'Diplomă 4',
    subtitle: 'Dans Sportiv',
    date: '2026',
    location: 'România',
    icon: Medal,
    color: '#cd7f32',
    description: 'Diplomă dans sportiv.',
    details: [],
  },
  {
    id: 5,
    image: '/diploma5.jpeg',
    title: 'Diplomă 5',
    subtitle: 'Dans Sportiv',
    date: '2026',
    location: 'România',
    icon: Flame,
    color: '#ff9955',
    description: 'Diplomă dans sportiv.',
    details: [],
  },
]

function Carousel() {
  const [current, setCurrent]   = useState(0)
  const [paused, setPaused]     = useState(false)
  const [selected, setSelected] = useState(null)
  const intervalRef             = useRef(null)
  const total                   = diplomas.length
  const visibleCount            = 3

  useEffect(() => {
    if (paused) return
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total)
    }, 3500)
    return () => clearInterval(intervalRef.current)
  }, [paused, total])

  const goTo   = (idx) => setCurrent((idx + total) % total)
  const goPrev = () => goTo(current - 1)
  const goNext = () => goTo(current + 1)

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.sectionLabel}>Diplome & Participări</p>
        <h2 className={styles.sectionTitle}>Realizări</h2>
        <p className={styles.sectionSubtitle}>Apasă pe o diplomă pentru detalii</p>

        <div
          className={styles.carouselWrapper}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <button className={`${styles.navBtn} ${styles.navLeft}`} onClick={goPrev}>
            <ChevronLeft size={22} strokeWidth={1.5} />
          </button>

          <div className={styles.track}>
            <div
              className={styles.strip}
              style={{ transform: `translateX(calc(-${current} * (100% / ${visibleCount})))` }}
            >
              {diplomas.map((item, idx) => {
                const Icon = item.icon
                const isActive = idx === current
                return (
                  <div
                    key={item.id}
                    className={`${styles.card} ${isActive ? styles.cardActive : ''}`}
                    onClick={() => setSelected(item)}
                    style={{ '--accent': item.color }}
                  >
                    {/* Imagine diplomă */}
                    <div className={styles.cardImage}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className={styles.diplomaImg}
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextSibling.style.display = 'flex'
                        }}
                      />
                      <div className={styles.diplomaFallback} style={{ display: 'none' }}>
                        <Icon size={40} strokeWidth={1} color={item.color} />
                      </div>
                    </div>

                    {/* Info */}
                    <div className={styles.cardBody}>
                      <div className={styles.cardTop}>
                        <div className={styles.iconBox}>
                          <Icon size={22} strokeWidth={1.2} color={item.color} />
                        </div>
                        <span className={styles.date}>{item.date}</span>
                      </div>
                      <h3 className={styles.cardTitle}>{item.title}</h3>
                      <p className={styles.cardSubtitle}>{item.subtitle}</p>
                      <div className={styles.cardHint}>Click pentru detalii</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <button className={`${styles.navBtn} ${styles.navRight}`} onClick={goNext}>
            <ChevronRight size={22} strokeWidth={1.5} />
          </button>
        </div>

        <div className={styles.dots}>
          {diplomas.map((_, idx) => (
            <button
              key={idx}
              className={`${styles.dot} ${idx === current ? styles.dotActive : ''}`}
              onClick={() => goTo(idx)}
            />
          ))}
        </div>

        <CVDownload />
      </div>

      {selected && (
        <Modal item={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}

function CVDownload() {
  return (
    <div className={styles.cvSection}>
      <div className={styles.cvDivider} />
      <p className={styles.cvLabel}>Descarcă CV-ul meu</p>
      <a href="/cv.pdf" download="cv.pdf" className={styles.cvBtn}>
        <BookOpen size={18} strokeWidth={1.5} />
        Download CV
      </a>
      <p className={styles.cvHint}>PDF · Actualizat 2026</p>
    </div>
  )
}

export default Carousel
