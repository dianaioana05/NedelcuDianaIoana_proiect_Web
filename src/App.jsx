import Hero from './components/Hero/Hero'
import ProjectGrid from './components/ProjectGrid/ProjectGrid'
import Carousel from './components/Carousel/Carousel'
import GitHubEmbed from './components/GitHubEmbed/GitHubEmbed'
import './App.css'

function App() {
  return (
    <div className="app">
      <Hero />
      <ProjectGrid />
      <Carousel />
      <GitHubEmbed />
    </div>
  )
}

export default App
