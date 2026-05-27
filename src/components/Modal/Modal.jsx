import { useEffect } from 'react'
import { X, MapPin, Calendar, CheckCircle } from 'lucide-react'
import styles from './Modal.module.css'

function Modal({ item, onClose }) {
  const Icon = item.icon

  // Închide la Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  // Blochează scroll-ul pe body
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        style={{ '--accent': item.color }}
      >
        {/* Close */}
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={20} strokeWidth={1.5} />
        </button>

        {/* Imagine diplomă */}
        {item.image && (
          <div className={styles.imageWrapper}>
            <img
              src={item.image}
              alt={item.title}
              className={styles.diplomaImg}
              onError={(e) => { e.target.parentElement.style.display = 'none' }}
            />
          </div>
        )}

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.iconBox}>
            <Icon size={36} strokeWidth={1.2} color={item.color} />
          </div>
          <div className={styles.headerText}>
            <h2 className={styles.title}>{item.title}</h2>
            <p className={styles.subtitle}>{item.subtitle}</p>
          </div>
        </div>

        {/* Meta */}
        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <Calendar size={14} strokeWidth={1.5} />
            {item.date}
          </span>
          <span className={styles.metaItem}>
            <MapPin size={14} strokeWidth={1.5} />
            {item.location}
          </span>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Description */}
        <p className={styles.description}>{item.description}</p>

        {/* Details list */}
        <ul className={styles.detailsList}>
          {item.details.map((d, i) => (
            <li key={i} className={styles.detailItem}>
              <CheckCircle size={15} strokeWidth={1.5} color={item.color} />
              {d}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Modal
