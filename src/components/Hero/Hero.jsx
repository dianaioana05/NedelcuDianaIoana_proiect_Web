import styles from './Hero.module.css'

function Hero() {
  const scrollToProjects = () => {
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className={styles.hero}>

      {/* Decorative background lines */}
      <div className={styles.bgLines}>
        <span /><span /><span />
      </div>

      <div className={styles.content}>

        {/* Photo */}
        <div className={styles.photoRing}>
          <div className={styles.photoInner}>
            <img
              src="/logo.jpeg"
              alt="Diana Nedelcu"
              className={styles.photo}
              onError={(e) => { e.target.style.display = 'none' }}
            />
            <div className={styles.initials}>DN</div>
          </div>
        </div>

        {/* Tag line */}
        <p className={styles.tag}>✦ Dans Sportiv · Web Development ✦</p>

        {/* Name */}
        <h1 className={styles.name}>
          Diana<br />
          <span className={styles.nameAccent}>Nedelcu</span>
        </h1>

        {/* Description */}
        <p className={styles.description}>
          Dansatoare pasionată de dans sportiv și studentă în informatică.
          Combin eleganța scenei cu logica codului.
        </p>

        {/* CTA */}
        <button className={styles.cta} onClick={scrollToProjects}>
          Descoperă portofoliul meu
        </button>

      </div>

      {/* Scroll arrow */}
      <button className={styles.scrollArrow} onClick={scrollToProjects}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12l7 7 7-7" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

    </section>
  )
}

export default Hero
