import { useState } from 'react'
import styles from './ProjectCard.module.css'

const isSvg = (url) => url && url.endsWith('.svg')

function ProjectCard({ project }) {
  const [hovered, setHovered]       = useState(false)
  const [imgLoaded, setImgLoaded]   = useState(false)
  const [imgFailed, setImgFailed]   = useState(false)
  const Icon = project.icon

  const handleClick = () => {
    if (project.link && project.link !== '#') {
      window.open(project.link, '_blank')
    }
  }

  return (
    <div
      className={`${styles.card} ${hovered ? styles.cardHovered : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      <div className={styles.imageWrapper}>

        {!imgFailed && (
          <img
            src={project.image}
            alt={project.title}
            className={`${styles.image} ${isSvg(project.image) ? styles.imageSvg : ''}`}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgFailed(true)}
          />
        )}

        {/* Placeholder cu icon — vizibil doar dacă poza nu s-a încărcat */}
        {(!imgLoaded || imgFailed) && (
          <div className={styles.imagePlaceholder}>
            <Icon size={48} strokeWidth={1} color="#c9a84c" opacity={0.5} />
          </div>
        )}

        {/* Overlay la hover */}
        <div className={`${styles.overlay} ${hovered ? styles.overlayVisible : ''}`}>
          <Icon size={28} strokeWidth={1} color="#c9a84c" />
          <p className={styles.fullDescription}>{project.fullDescription}</p>
          <div className={styles.tags}>
            {project.tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </div>

      </div>

      {/* Info */}
      <div className={styles.info}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.shortDescription}>{project.shortDescription}</p>
      </div>
    </div>
  )
}

export default ProjectCard
