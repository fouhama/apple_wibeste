import './App.css'
import Hero from './components/Hero'
import Hightlights from './components/Hightlights'
import Model from './components/Model'
import NavBar from './components/NavBar'

function App() {
  return (
    <>
      <main className="bg-black">
        <NavBar />
        <Hero/>
        <Hightlights/>
        <Model />
      </main>
    </>
  )
}

export default App
