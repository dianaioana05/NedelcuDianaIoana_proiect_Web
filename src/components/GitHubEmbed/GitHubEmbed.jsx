import { useState, useEffect } from 'react'
import { GitBranch, Search, AlertTriangle, Loader, GitCommitHorizontal, ExternalLink } from 'lucide-react'
import styles from './GitHubEmbed.module.css'

async function fetchAllCommits(username) {
  // 1. Fetch repos
  const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=20&sort=updated`)
  if (!reposRes.ok) {
    if (reposRes.status === 404) throw new Error('Utilizatorul GitHub nu a fost găsit.')
    throw new Error('Eroare la preluarea datelor de pe GitHub.')
  }
  const repos = await reposRes.json()
  if (repos.length === 0) throw new Error('Niciun repository găsit pentru acest utilizator.')

  // 2. Fetch commits din fiecare repo (maxim 5 repos)
  const commitPromises = repos.slice(0, 5).map(async (repo) => {
    try {
      const res = await fetch(
        `https://api.github.com/repos/${username}/${repo.name}/commits?per_page=10&author=${username}`
      )
      if (!res.ok) return []
      const commits = await res.json()
      return commits.map((c) => ({
        id: c.sha,
        message: c.commit.message.split('\n')[0],
        repo: repo.name,
        date: new Date(c.commit.author.date).toLocaleDateString('ro-RO', {
          day: '2-digit', month: 'short', year: 'numeric',
        }),
        rawDate: new Date(c.commit.author.date),
        url: c.html_url,
      }))
    } catch {
      return []
    }
  })

  const results = await Promise.all(commitPromises)
  const all = results
    .flat()
    .sort((a, b) => b.rawDate - a.rawDate)
    .slice(0, 15)

  if (all.length === 0) throw new Error('Nu există commit-uri găsite pentru acest utilizator.')
  return all
}

function GitHubEmbed() {
  const [username, setUsername] = useState('dianaioana05')
  const [inputValue, setInputValue] = useState('dianaioana05')
  const [commits, setCommits] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const load = async (user) => {
    if (!user.trim()) return
    setLoading(true)
    setError(null)
    setCommits([])
    try {
      const data = await fetchAllCommits(user)
      setCommits(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load(username) }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    const u = inputValue.trim()
    if (u) { setUsername(u); load(u) }
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <p className={styles.sectionLabel}>Activitate</p>
        <h2 className={styles.sectionTitle}>
          <GitBranch size={32} strokeWidth={1.5} />
          GitHub
        </h2>
        <p className={styles.sectionSubtitle}>Istoricul commit-urilor mele recente</p>

        {/* Search */}
        <form className={styles.searchForm} onSubmit={handleSearch}>
          <div className={styles.inputWrapper}>
            <Search size={16} className={styles.inputIcon} />
            <input
              type="text"
              className={styles.input}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="GitHub username..."
            />
          </div>
          <button type="submit" className={styles.searchBtn}>Caută</button>
        </form>

        {/* Feed */}
        <div className={styles.feed}>
          {loading && (
            <div className={styles.statusBox}>
              <Loader size={28} strokeWidth={1.5} className={styles.spinnerIcon} color="#c9a84c" />
              <p>Se încarcă commit-urile...</p>
            </div>
          )}

          {error && !loading && (
            <div className={styles.statusBox}>
              <AlertTriangle size={28} strokeWidth={1.5} color="#c9a84c" />
              <p className={styles.errorText}>{error}</p>
              <p className={styles.hintText}>Încearcă un username GitHub valid, ex: <strong>torvalds</strong></p>
            </div>
          )}

          {!loading && !error && commits.map((commit) => (
            <a
              key={commit.id}
              href={commit.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.commitRow}
            >
              <div className={styles.commitLeft}>
                <GitCommitHorizontal size={18} strokeWidth={1.5} className={styles.commitIcon} />
                <div className={styles.commitInfo}>
                  <p className={styles.commitMessage}>{commit.message}</p>
                  <p className={styles.commitRepo}>{commit.repo}</p>
                </div>
              </div>
              <div className={styles.commitRight}>
                <span className={styles.commitDate}>{commit.date}</span>
                <ExternalLink size={13} strokeWidth={1.5} className={styles.externalIcon} />
              </div>
            </a>
          ))}
        </div>

        {!loading && !error && commits.length > 0 && (
          <div className={styles.profileLink}>
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.viewProfile}
            >
              <GitBranch size={15} strokeWidth={1.5} />
              Vezi profilul complet pe GitHub
              <ExternalLink size={13} strokeWidth={1.5} />
            </a>
          </div>
        )}

      </div>
    </section>
  )
}

export default GitHubEmbed
