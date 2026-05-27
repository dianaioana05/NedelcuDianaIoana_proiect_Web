# Portfolio Personal — Diana Nedelcu
### Proiect Web 102 · Modul I + Modul II (CV)

> **Stack:** React 18 · Vite 5 · CSS Modules · lucide-react · GitHub REST API

---

## Cuprins

1. [Cum rulezi proiectul](#1-cum-rulezi-proiectul)
2. [Structura fișierelor](#2-structura-fișierelor)
3. [Concepte React fundamentale](#3-concepte-react-fundamentale)
4. [Componenta Hero](#4-componenta-hero)
5. [Componenta ProjectGrid și ProjectCard](#5-componenta-projectgrid-și-projectcard)
6. [Componenta Carousel + Modal](#6-componenta-carousel--modal)
7. [Componenta GitHubEmbed](#7-componenta-githubembed)
8. [CSS Modules — cum funcționează](#8-css-modules--cum-funcționează)
9. [Fișiere statice (public/)](#9-fișiere-statice-public)
10. [Securitate — variabile de mediu](#10-securitate--variabile-de-mediu)
11. [Ce mai trebuie făcut](#11-ce-mai-trebuie-făcut)

---

## 1. Cum rulezi proiectul

```bash
# 1. Intră în folderul proiectului
cd NedelcuDianaIoana_proiect_Web

# 2. Instalează dependințele (o singură dată)
npm install

# 3. Pornește serverul de dezvoltare
npm run dev
# → Deschide http://localhost:5173 în browser

# 4. Build pentru producție
npm run build
# → Generează folderul dist/ cu fișierele finale
```

**De ce `npm install` înainte?**  
Fișierul `package.json` listează dependințele (`react`, `react-dom`, `lucide-react` etc.), dar ele nu sunt salvate în repository. `npm install` le descarcă din internet în folderul `node_modules/`.

**De ce Vite?**  
Vite este un build tool modern, mult mai rapid decât webpack. Suportă HMR (*Hot Module Replacement*) — când salvezi un fișier, browserul actualizează **doar** componenta modificată, fără refresh complet.

---

## 2. Structura fișierelor

```
NedelcuDianaIoana_proiect_Web/
│
├── public/                    ← fișiere statice (servite direct, fără procesare)
│   ├── logo.jpeg              ← poza din Hero
│   ├── diploma1.jpeg          ← diplome dans sportiv (1–5)
│   ├── diploma2.jpeg
│   ├── diploma3.jpeg
│   ├── diploma4.jpeg
│   ├── diploma5.jpeg
│   └── cv.pdf                 ← ⚠️ LIPSĂ — trebuie adăugat manual
│
├── src/                       ← codul sursă React
│   ├── main.jsx               ← punctul de intrare, montează aplicația
│   ├── App.jsx                ← componenta rădăcină, asamblează toate secțiunile
│   ├── index.css              ← stiluri globale (reset, font)
│   ├── App.css                ← stiluri minimale pentru wrapper-ul principal
│   │
│   └── components/
│       ├── Hero/
│       │   ├── Hero.jsx
│       │   └── Hero.module.css
│       ├── ProjectGrid/
│       │   ├── ProjectGrid.jsx
│       │   ├── ProjectCard.jsx
│       │   ├── ProjectGrid.module.css
│       │   └── ProjectCard.module.css
│       ├── Carousel/
│       │   ├── Carousel.jsx
│       │   └── Carousel.module.css
│       ├── Modal/
│       │   ├── Modal.jsx
│       │   └── Modal.module.css
│       └── GitHubEmbed/
│           ├── GitHubEmbed.jsx
│           └── GitHubEmbed.module.css
│
├── index.html                 ← template HTML principal (conține div#root)
├── vite.config.js             ← configurare Vite
├── package.json               ← metadate proiect + dependințe
└── .gitignore                 ← fișiere excluse din git (node_modules, .env etc.)
```

**Regula de aur:** Orice fișier din `public/` este accesibil direct în browser la `/numefisier`. De aceea scriem `src="/logo.jpeg"` în JSX, nu o cale relativă.

---

## 3. Concepte React fundamentale

### 3.1 Ce este JSX?

JSX este o extensie de sintaxă pentru JavaScript care arată ca HTML, dar este de fapt JavaScript:

```jsx
// JSX (ce scriem)
const element = <h1 className="titlu">Bună ziua!</h1>

// Cum îl transformă Vite în JavaScript pur
const element = React.createElement('h1', { className: 'titlu' }, 'Bună ziua!')
```

**Diferențe față de HTML:**
| HTML | JSX |
|------|-----|
| `class="..."` | `className="..."` |
| `for="..."` | `htmlFor="..."` |
| `onclick="..."` | `onClick={...}` |
| Tag-uri fără atribute auto-close: `<br>` | Trebuie închise: `<br />` |

### 3.2 Componente funcționale

O componentă React este o **funcție JavaScript** care returnează JSX:

```jsx
function Salut({ nume }) {           // primește props ca argument
  return <p>Bună, {nume}!</p>        // {} evaluează expresii JS în JSX
}

// Utilizare
<Salut nume="Diana" />
// → <p>Bună, Diana!</p>
```

### 3.3 useState — memorie locală a componentei

`useState` permite unei componente să "țină minte" valori între re-renderizări:

```jsx
import { useState } from 'react'

function Contor() {
  //      ↓ valoare curentă    ↓ funcție care o schimbă   ↓ valoare inițială
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicks: {count}
    </button>
  )
}
```

**Important:** Nu modifica state-ul direct (`count = count + 1` nu funcționează). Folosește ÎNTOTDEAUNA setter-ul (`setCount(...)`). React știe că trebuie să re-renderizeze componenta **doar** când apelezi setter-ul.

### 3.4 useEffect — efecte secundare

`useEffect` rulează cod după ce componenta a fost randată în DOM:

```jsx
import { useEffect } from 'react'

useEffect(() => {
  // Cod care rulează după render
  console.log('Componenta a apărut!')

  return () => {
    // Cleanup — rulează înainte de next effect sau la unmount
    console.log('Componenta dispare!')
  }
}, [dependency]) // Array de dependințe
```

**Regula array-ului de dependințe:**
| Dependințe | Când rulează |
|-----------|-------------|
| `[]` (array gol) | O singură dată, la montare |
| `[valoare]` | La montare + oricând se schimbă `valoare` |
| Fără array | La **fiecare** re-renderizare (rar util) |

### 3.5 useRef — referință persistentă fără re-render

`useRef` stochează o valoare care nu provoacă re-renderizare când se schimbă:

```jsx
import { useRef } from 'react'

const intervalRef = useRef(null)

// Setăm
intervalRef.current = setInterval(...)

// Accesăm
clearInterval(intervalRef.current)
```

Folosit în `Carousel` pentru a salva ID-ul intervalului de autoscroll.

---

## 4. Componenta Hero

**Fișier:** `src/components/Hero/Hero.jsx`

### Ce face?
Secțiunea de introducere a site-ului: poză cu inel animat, titlu, descriere și buton CTA.

### Codul explicat

```jsx
function Hero() {
  // Funcție de scroll smooth la secțiunea de proiecte
  const scrollToProjects = () => {
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })
    //                              ↑ caută elementul cu id="projects" în DOM
    //                                               ↑ scroll animat în loc de salt brusc
  }
```

**`scrollIntoView`** este o metodă nativă a browser-ului, nu din React. `{ behavior: 'smooth' }` activează animația de scroll. Elementul țintă este `<section id="projects">` din `ProjectGrid.jsx`.

```jsx
  return (
    <section className={styles.hero}>
      <div className={styles.bgLines}>
        <span /><span /><span />   {/* 3 linii decorative verticale din CSS */}
      </div>

      <div className={styles.photoRing}>       {/* inelul animat auriu */}
        <div className={styles.photoInner}>    {/* contra-rotație ca poza să stea dreaptă */}
          <img
            src="/logo.jpeg"
            alt="Diana Nedelcu"
            className={styles.photo}
            onError={(e) => { e.target.style.display = 'none' }}
            {/* dacă poza lipsește → ascunde img, rămâne vizibil div-ul cu inițiale */}
          />
          <div className={styles.initials}>DN</div>   {/* fallback text */}
        </div>
      </div>
```

**`onError`** este un event handler React, echivalentul lui `onerror` din HTML. `e.target` este elementul `<img>` însuși. Când poza nu se poate încărca, o ascundem în loc să afișăm iconița "broken image" urâtă.

```jsx
      <button className={styles.cta} onClick={scrollToProjects}>
        Descoperă portofoliul meu
      </button>
    </section>
  )
}
```

### CSS — Inelul animat

```css
/* Hero.module.css */
.photoRing {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  padding: 4px;
  /* conic-gradient creează un gradient circular — efectul de inel auriu */
  background: conic-gradient(#c9a84c, #f0d080, #c9a84c, transparent, transparent);
  animation: spinRing 8s linear infinite;
}

@keyframes spinRing {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.photoInner {
  /* contra-rotație: dacă ring-ul se rotește cu +1deg, inner-ul se rotește cu -1deg */
  /* → poza rămâne staționară */
  animation: spinRing 8s linear infinite reverse;
}
```

**`clip-path` pe butonul CTA:**
```css
.cta {
  clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
  /* Tăie colțurile diagonal → efect geometric/tech */
}
```

---

## 5. Componenta ProjectGrid și ProjectCard

### 5.1 ProjectGrid — container cu date

**Fișier:** `src/components/ProjectGrid/ProjectGrid.jsx`

```jsx
// Datele proiectelor sunt definite în afara componentei
// → nu se re-creează la fiecare render, sunt constante
const projects = [
  {
    id: 1,
    title: 'Automatic Music Player',
    shortDescription: 'Embedded Rust — Raspberry Pi Pico 2W',
    fullDescription: '...',
    image: 'https://embedded-rust-101.wyliodrin.com/assets/images/...',
    icon: Cpu,              // referință la componenta lucide-react, nu string!
    link: 'https://...',
    tags: ['Rust', 'Embedded', 'Raspberry Pi', 'I2S'],
  },
  // ... încă 2 proiecte
]

function ProjectGrid() {
  return (
    <section id="projects" className={styles.section}>
      {/* id="projects" → butonul din Hero poate face scrollIntoView */}
      <div className={styles.grid}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
          //           ↑ key obligatoriu în liste — ajută React să identifice
          //             ce element s-a schimbat la re-render
        ))}
      </div>
    </section>
  )
}
```

**De ce `key`?** Când React randează o listă, are nevoie de un identificator unic pentru fiecare element. Fără `key`, la orice schimbare React re-renderizează toată lista. Cu `key`, React știe exact care element s-a modificat.

### 5.2 ProjectCard — interactivitate cu hover

**Fișier:** `src/components/ProjectGrid/ProjectCard.jsx`

```jsx
const isSvg = (url) => url && url.endsWith('.svg')
// Funcție helper: returnează true dacă URL-ul e un SVG
// SVG-urile au nevoie de tratare specială în CSS (fundal alb, object-fit: contain)
```

```jsx
function ProjectCard({ project }) {
  const [hovered, setHovered]     = useState(false)  // e mouse-ul pe card?
  const [imgLoaded, setImgLoaded] = useState(false)  // s-a încărcat poza?
  const [imgFailed, setImgFailed] = useState(false)  // a eșuat poza?
  
  const Icon = project.icon
  // Icon este o componentă React (ex: Cpu din lucide-react)
  // Salvăm referința cu majusculă → JSX știe că e o componentă, nu un tag HTML
```

**Logica afișării imaginii:**
```jsx
{/* Afișăm imaginea DOAR dacă nu a eșuat */}
{!imgFailed && (
  <img
    src={project.image}
    className={`${styles.image} ${isSvg(project.image) ? styles.imageSvg : ''}`}
    //          ↑ clase concatenate cu template literal
    //          Adăugăm imageSvg dacă URL-ul e .svg
    onLoad={() => setImgLoaded(true)}   // poza s-a încărcat OK
    onError={() => setImgFailed(true)}  // poza a eșuat
  />
)}

{/* Placeholder vizibil cât timp poza se încarcă SAU dacă a eșuat */}
{(!imgLoaded || imgFailed) && (
  <div className={styles.imagePlaceholder}>
    <Icon size={48} strokeWidth={1} color="#c9a84c" opacity={0.5} />
  </div>
)}
```

**Diagrama stărilor imaginii:**
```
imgFailed=false, imgLoaded=false → placeholder vizibil, img montată (invizibilă)
imgFailed=false, imgLoaded=true  → placeholder ascuns, img vizibilă  ✓
imgFailed=true,  imgLoaded=false → img demontată, placeholder vizibil
```

**Overlay la hover:**
```jsx
<div className={`${styles.overlay} ${hovered ? styles.overlayVisible : ''}`}>
```
```css
/* ProjectCard.module.css */
.overlay {
  opacity: 0;              /* ascuns implicit */
  transition: opacity 0.3s ease;
}
.overlayVisible {
  opacity: 1;              /* vizibil când hovered=true */
}
```

**Accesibilitate:**
```jsx
<div
  role="button"          // anunță screen reader-elor că e clickabil
  tabIndex={0}           // permite focus cu Tab de la tastatură
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
  // utilizatorii de tastatură pot "click" cu Enter
>
```

---

## 6. Componenta Carousel + Modal

### 6.1 Carousel — autoscroll cu useRef

**Fișier:** `src/components/Carousel/Carousel.jsx`

```jsx
const [current, setCurrent]   = useState(0)       // indexul cardului activ
const [paused, setPaused]     = useState(false)   // oprit la hover
const [selected, setSelected] = useState(null)    // diploma deschisă în modal (null = închis)
const intervalRef             = useRef(null)       // salvăm ID-ul interval-ului
const total                   = diplomas.length   // 5
const visibleCount            = 3                 // câte carduri vedem simultan pe desktop
```

**De ce `useRef` pentru interval?**

```jsx
// ❌ GREȘIT — la fiecare re-render, intervalId ar fi o valoare nouă
// nu am mai putea face clearInterval corect
let intervalId = null

// ✅ CORECT — useRef păstrează ACEEAȘI referință între re-render-uri
const intervalRef = useRef(null)
```

**Autoscroll-ul:**
```jsx
useEffect(() => {
  if (paused) return           // dacă mouse-ul e pe carousel, nu pornești timer-ul

  intervalRef.current = setInterval(() => {
    setCurrent((prev) => (prev + 1) % total)
    //                   ↑ forma funcțională a setter-ului
    //                   prev = valoarea ACTUALĂ a state-ului
    //                   % total → 0,1,2,3,4,0,1,2,... (loop circular)
  }, 3500)

  return () => clearInterval(intervalRef.current)
  // ↑ Cleanup function: rulează când:
  //   1. paused se schimbă (oprim timer-ul)
  //   2. componenta se demontează (curățăm resursele)

}, [paused, total])
// ↑ Dependințe: re-rulăm effect-ul când paused sau total se schimbă
```

**Translația CSS a caruselului:**
```jsx
<div
  className={styles.strip}
  style={{ transform: `translateX(calc(-${current} * (100% / ${visibleCount})))` }}
>
```

**Cum funcționează matematic:**
- `visibleCount = 3` → fiecare card are `width = 100% / 3 = 33.33%`
- Când `current = 0`: `translateX(0)` → vedem cardurile 0, 1, 2
- Când `current = 1`: `translateX(-33.33%)` → vedem cardurile 1, 2, 3
- Când `current = 2`: `translateX(-66.66%)` → vedem cardurile 2, 3, 4

```css
/* Carousel.module.css */
.strip {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  /* cubic-bezier: accelerare la început, decelerare la sfârșit */
}
.card {
  flex: 0 0 calc(100% / 3);   /* fiecare card ocupă exact 1/3 din lățime */
  /* flex: 0=nu crește, 0=nu scade, calc(...)=lățime fixă */
}

/* Pe mobile: 1 card visible */
@media (max-width: 768px) {
  .card { flex: 0 0 100%; }
}
```

**Sub-componenta CVDownload:**
```jsx
// Definită în același fișier ca Carousel, dar separat — bună practică
// pentru logică izolată, chiar dacă e mică
function CVDownload() {
  return (
    <a href="/cv.pdf" download="CV_Diana_Nedelcu.pdf" className={styles.cvBtn}>
      {/* href="/cv.pdf" → fișier din public/ */}
      {/* download="..." → sugerează un nume la descărcare */}
    </a>
  )
}
```

### 6.2 Modal — overlay cu Escape și scroll lock

**Fișier:** `src/components/Modal/Modal.jsx`

**Deschidere/Închidere:**
```jsx
// În Carousel.jsx:
// selected = null → modal închis
// selected = { ...diplomaObject } → modal deschis cu acea diplomă

<div onClick={() => setSelected(item)}>   {/* click pe card → deschide */}

{selected && (                             {/* && = short-circuit: randează Modal DOAR dacă selected != null */}
  <Modal item={selected} onClose={() => setSelected(null)} />
)}
```

**Prevenirea propagării click-ului:**
```jsx
<div className={styles.overlay} onClick={onClose}>
  {/* click pe fundal negru → închide modalul */}

  <div
    className={styles.modal}
    onClick={(e) => e.stopPropagation()}
    {/* e.stopPropagation(): oprește click-ul să "urce" la overlay */}
    {/* fără asta, click pe modal ar propaga la overlay și ar închide modalul */}
  >
```

**Diagrama propagare evenimente:**
```
[overlay onClick=onClose]
  └── [modal onClick=stopPropagation]
         └── [buton X onClick=onClose]

Fără stopPropagation: click oriunde în modal → event urcă → overlay → onClose()
Cu stopPropagation:   click în modal → oprit aici → overlay nu primește event
```

**Effect 1 — Escape key:**
```jsx
useEffect(() => {
  const handleKey = (e) => {
    if (e.key === 'Escape') onClose()
  }
  window.addEventListener('keydown', handleKey)

  return () => window.removeEventListener('keydown', handleKey)
  // ↑ Fără cleanup, listener-ul rămâne activ chiar după ce modalul dispare
  // → mai multe modals deschise/închise = mai mulți listeners acumulați = memory leak

}, [onClose])    // re-rulăm dacă se schimbă funcția onClose (în practică nu se schimbă)
```

**Effect 2 — Blocare scroll:**
```jsx
useEffect(() => {
  document.body.style.overflow = 'hidden'   // oprește scroll-ul pe pagină
  return () => {
    document.body.style.overflow = ''        // restaurează scroll-ul la închidere
  }
}, [])    // [] = o singură dată, la deschiderea modalului
```

**CSS custom property per item:**
```jsx
// Fiecare diplomă are propria culoare (aur, argint, bronz etc.)
<div style={{ '--accent': item.color }}>

// CSS:
.modal {
  border-top: 3px solid var(--accent, #c9a84c);
  /* var(--accent, #c9a84c): folosește --accent dacă există, altfel #c9a84c ca fallback */
}
```

---

## 7. Componenta GitHubEmbed

**Fișier:** `src/components/GitHubEmbed/GitHubEmbed.jsx`

### 7.1 Funcția de fetch — în afara componentei

```jsx
// Definim funcția AFARA componentei React
// → nu se recreează la fiecare re-render
// → poate fi testată independent
async function fetchAllCommits(username) {
```

**Pasul 1 — Fetch repo-uri:**
```jsx
  const reposRes = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=20&sort=updated`
    //                                                  ↑ max 20 repo-uri
    //                                                             ↑ sortate după ultima actualizare
  )

  if (!reposRes.ok) {
    if (reposRes.status === 404) throw new Error('Utilizatorul GitHub nu a fost găsit.')
    throw new Error('Eroare la preluarea datelor de pe GitHub.')
    // ↑ throw oprtește execuția și trimite eroarea la catch din load()
  }

  const repos = await reposRes.json()   // parsăm JSON-ul răspunsului
```

**Pasul 2 — Fetch commit-uri în paralel:**
```jsx
  const commitPromises = repos.slice(0, 5).map(async (repo) => {
    //                        ↑ maxim 5 repo-uri (evităm rate limiting GitHub API)
    try {
      const res = await fetch(
        `https://api.github.com/repos/${username}/${repo.name}/commits?per_page=10&author=${username}`
        //                                                                           ↑ doar commit-urile autorului
      )
      if (!res.ok) return []    // repo privat sau alt error → ignorăm, returnăm array gol

      const commits = await res.json()
      return commits.map((c) => ({
        id:      c.sha,                                      // hash unic al commit-ului
        message: c.commit.message.split('\n')[0],            // prima linie a mesajului
        repo:    repo.name,
        date:    new Date(c.commit.author.date).toLocaleDateString('ro-RO', {...}),
        rawDate: new Date(c.commit.author.date),             // păstrat pentru sortare
        url:     c.html_url,
      }))
    } catch {
      return []    // orice eroare de rețea → ignorăm acel repo
    }
  })
```

**De ce `Promise.all`?**
```jsx
  const results = await Promise.all(commitPromises)
  // ↑ Lansează TOATE cele 5 request-uri SIMULTAN
  // Fără Promise.all: request 1 → aștepți → request 2 → aștepți → ... (5× mai lent)
  // Cu Promise.all:   toate 5 în paralel → aștepți cel mai lent
```

**Asamblare finală:**
```jsx
  const all = results
    .flat()                              // [[c1,c2],[c3],[c4,c5]] → [c1,c2,c3,c4,c5]
    .sort((a, b) => b.rawDate - a.rawDate)  // sortare descrescătoare după dată
    .slice(0, 15)                        // maxim 15 commit-uri afișate
```

### 7.2 Componenta — state și render

```jsx
function GitHubEmbed() {
  const [username, setUsername]   = useState('dianaioana05')  // username confirmat
  const [inputValue, setInputValue] = useState('dianaioana05') // valoarea din input (poate fi parțial tastată)
  const [commits, setCommits]     = useState([])
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState(null)
```

**De ce două state-uri separate pentru username?**
- `inputValue` = ce scrie utilizatorul în câmpul de căutare (live, se schimbă la fiecare tastă)
- `username` = username-ul **confirmat** după apăsarea butonului de căutare
- Dacă ai folosi un singur state, fetch-ul s-ar declanșa la fiecare literă tastată

```jsx
  const load = async (user) => {
    if (!user.trim()) return      // nu face nimic dacă input-ul e gol/whitespace
    setLoading(true)
    setError(null)
    setCommits([])                // curăță commit-urile vechi
    try {
      const data = await fetchAllCommits(user)
      setCommits(data)
    } catch (err) {
      setError(err.message)       // salvăm mesajul erorii pentru afișare
    } finally {
      setLoading(false)           // finally rulează și la succes și la eroare
    }
  }

  useEffect(() => { load(username) }, [])
  // [] = o singură dată, la montare → fetch automat cu username-ul default
```

**Logica de randare condițională:**
```jsx
{loading && (
  <Loader ... className={styles.spinnerIcon} />
  // spinnerIcon are animation: spin 1s linear infinite în CSS
)}

{error && !loading && (
  <AlertTriangle ... />
  // afișăm eroarea DOAR dacă nu mai încărcăm
)}

{!loading && !error && commits.map((commit) => (
  <a key={commit.id} href={commit.url} target="_blank">
    {/* key={commit.id} → id-ul e SHA-ul commit-ului, unic garantat */}
    {/* target="_blank" → deschide în tab nou */}
    {/* rel="noopener noreferrer" → securitate: pagina deschisă nu poate accesa window.opener */}
  </a>
))}
```

---

## 8. CSS Modules — cum funcționează

### Problema pe care o rezolvă
În CSS global, dacă două componente au `.button`, stilurile se suprapun. CSS Modules **izolează** stilurile per componentă:

```jsx
// Carousel.jsx
import styles from './Carousel.module.css'
// styles = { section: 'Carousel_section__xK2p', card: 'Carousel_card__3mNa', ... }

<div className={styles.card}>     // → class="Carousel_card__3mNa"
```

```jsx
// Modal.jsx
import styles from './Modal.module.css'

<div className={styles.card}>     // → class="Modal_card__7qRt"  (altă clasă!)
```

**Vite transformă automat** numele claselor adăugând un hash unic → imposibil să se ciocnească între componente.

### Clase condiționale
```jsx
// Metoda template literal
className={`${styles.card} ${isActive ? styles.cardActive : ''}`}

// Metoda cu filter (mai curată pentru mai multe clase)
className={[styles.card, isActive && styles.cardActive].filter(Boolean).join(' ')}
```

### CSS custom properties (variabile)
```css
/* Definit în JavaScript, folosit în CSS */
```jsx
<div style={{ '--accent': '#c9a84c' }}>
```
```css
.border {
  border-color: var(--accent);          /* citim variabila */
  border-color: var(--accent, #c9a84c); /* cu fallback */
}
```

Avantaj: o singură culoare definită în datele JavaScript controlează toate stilurile dintr-un subtree HTML.

---

## 9. Fișiere statice (public/)

Fișierele din `public/` sunt copiate **nemodificate** în `dist/` la build. Sunt accesibile la URL-uri absolute:

```jsx
<img src="/logo.jpeg" />         // public/logo.jpeg
<a href="/cv.pdf">               // public/cv.pdf
```

**Nu** folosi căi relative ca `./logo.jpeg` — în React Router sau la deploy pe subfolder, acestea se pot rupe.

### Fișiere necesare în public/:
| Fișier | Status | Utilizare |
|--------|--------|-----------|
| `logo.jpeg` | ✅ Există | Poza Hero |
| `diploma1.jpeg` | ✅ Există | Carousel |
| `diploma2.jpeg` | ✅ Există | Carousel |
| `diploma3.jpeg` | ✅ Există | Carousel |
| `diploma4.jpeg` | ✅ Există | Carousel |
| `diploma5.jpeg` | ✅ Există | Carousel |
| `cv.pdf` | ❌ **LIPSĂ** | Buton Download CV |

> **Acțiune necesară:** Adaugă CV-ul tău în `public/cv.pdf` pentru a activa butonul de download.

---

## 10. Securitate — variabile de mediu

### Regula de bază
**Nu pune niciodată token-uri, parole sau chei API direct în cod!** Acestea ajung în repository și sunt publice.

### Cum se folosesc variabilele de mediu în Vite

**1. Creează fișierul `.env` în rădăcina proiectului:**
```bash
# .env (NU se commitează pe GitHub!)
VITE_GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**2. Accesează în cod:**
```jsx
const token = import.meta.env.VITE_GITHUB_TOKEN
// Prefix VITE_ obligatoriu → Vite expune în browser doar variabilele cu acest prefix
```

**3. Adaugă în `.gitignore`:**
```gitignore
.env
.env.local
.env.production
```

**4. Pentru GitHub Actions/deploy:**
Mergi la **Settings → Secrets and variables → Actions → New repository secret** și adaugă variabila acolo. Nu o scrie niciodată în cod sau în fișiere commitate.

### Situația actuală
GitHub API public permite **60 request-uri/oră** fără token. Dacă vrei mai mult (5000/oră), adaugă un token prin `.env` și modifică fetch-ul:

```jsx
const res = await fetch(url, {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
  }
})
```

---

## 11. Ce mai trebuie făcut

### Obligatoriu
- [ ] Adaugă `public/cv.pdf` (CV-ul tău în format PDF)

### Opțional — îmbunătățiri de conținut
- [ ] Actualizează titlurile diplomelor în `Carousel.jsx` (momentan "Diplomă 1...5") cu numele real al fiecărei diplome
- [ ] Actualizează descrierile diplomelor (`description` și `details`) cu informații reale
- [ ] Salvează poza de Dans Sportiv local în `public/dans.jpeg` — URL-ul de Facebook CDN expiră

### Opțional — îmbunătățiri tehnice
- [ ] Adaugă token GitHub în `.env` pentru a evita rate limiting-ul (60 req/h)
- [ ] Adaugă `react-router-dom` dacă vrei pagini separate
- [ ] Deploy pe Vercel/Netlify (drag & drop folderul `dist/` sau conectezi repository-ul)

---

## Modul I — Cerințe bifate

| Cerință | Implementare |
|---------|-------------|
| Pagină web personală | ✅ Hero cu nume, poză, descriere |
| Secțiune proiecte | ✅ ProjectGrid cu 3 proiecte reale |
| Secțiune diplome/realizări | ✅ Carousel cu 5 diplome + Modal |
| Activitate GitHub | ✅ GitHubEmbed cu API live |
| Design responsiv | ✅ Media queries în toate componentele |
| Fără emoji-uri brute | ✅ Toate înlocuite cu lucide-react icons |

## Modul II — CV — Cerințe bifate

| Cerință | Implementare |
|---------|-------------|
| CV descărcabil | ✅ Buton Download CV în secțiunea Carousel |
| Date personale | ✅ Hero (nume, rol, scurtă biografie) |
| Proiecte tehnice | ✅ Embedded Rust, Web Dev |
| Activități extra-curriculare | ✅ Dans Sportiv, Hackademy |

---

*Proiect realizat de Diana Nedelcu — Web 102, 2026*
