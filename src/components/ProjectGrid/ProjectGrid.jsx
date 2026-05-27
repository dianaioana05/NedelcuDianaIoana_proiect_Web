import { Cpu, Music, Code } from 'lucide-react'
import ProjectCard from './ProjectCard'
import styles from './ProjectGrid.module.css'

const projects = [
  {
    id: 1,
    title: 'Automatic Music Player',
    shortDescription: 'Embedded Rust — Raspberry Pi Pico 2W',
    fullDescription:
      'Sistem embedded care redă continuu fișiere WAV de pe un card microSD și comută automat la anunțuri la intervale predefinite. Construit în Rust cu Embassy-rs, DAC PCM5102A și protocol I2S.',
    image: 'https://embedded-rust-101.wyliodrin.com/assets/images/hardware-f4f9e930992f4ff040b8942575191eb8.webp',
    icon: Cpu,
    link: 'https://embedded-rust-101.wyliodrin.com/docs/fils_en/project/2026/diana_ioana.nedelcu',
    tags: ['Rust', 'Embedded', 'Raspberry Pi', 'I2S'],
  },
  {
    id: 2,
    title: 'Dans Sportiv',
    shortDescription: 'Poli InternationalFest 2026 — Aula Magna',
    fullDescription:
      'Performanță la Ceremonia de Deschidere a Poli InternationalFest 2026, Aula Magna POLITEHNICA București — 30+ membri ai corpului diplomatic și parteneri internaționali.',
    image: 'https://scontent.fsbz3-1.fna.fbcdn.net/v/t39.99422-6/703296512_1994002124547797_2720051558868419960_n.png?stp=dst-jpg_tt6&_nc_cat=109&cb2=07a86f17-38790ae2&ccb=1-7&_nc_sid=127cfc&_nc_ohc=lExBPcOdZN0Q7kNvwEATS4k&_nc_oc=AdqYgvVXhoNvAeKeuaZLvCyu8K4X7BMqUtEOVAvvi0z0KddC1eEUFV9Dj70w_CfiYY0&_nc_zt=14&_nc_ht=scontent.fsbz3-1.fna&_nc_gid=37aQlmbOOYi5ohxiyU2HJg&_nc_ss=7b2a8&oh=00_Af6S79bPFarqKvSRHU-m-NCUFp3re4pGXcXSk1p3P1ADGw&oe=6A1CF614',
    icon: Music,
    link: 'https://www.facebook.com/FILSPolitehnică',
    tags: ['Dans Sportiv', 'Politehnica', 'InternationalFest'],
  },
  {
    id: 3,
    title: 'Hackademy Web Course 101',
    shortDescription: 'Curs intensiv de Web Development',
    fullDescription:
      'Participare la cursul Hackademy Web 101 — JavaScript, HTML, CSS și fundamente de web development. Primul pas în lumea programării web.',
    image: 'https://cdn.photonspark.com/Logo_hackademy_color.svg',
    icon: Code,
    link: '#',
    tags: ['JavaScript', 'HTML', 'CSS', 'Web Dev'],
  },
]

function ProjectGrid() {
  return (
    <section id="projects" className={styles.section}>
      <div className={styles.container}>
        <p className={styles.sectionLabel}>Realizări & Proiecte</p>
        <h2 className={styles.sectionTitle}>Portofoliul meu</h2>
        <p className={styles.sectionSubtitle}>
          Hover pe un card pentru a vedea mai multe detalii
        </p>

        <div className={styles.grid}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectGrid
