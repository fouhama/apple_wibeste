import './App.css'
import Hero from './components/Hero'
import Hightlights from './components/Hightlights'
import NavBar from './components/NavBar'

function App() {
  return (
    <>
      <main className="bg-black">
        <NavBar />
        <Hero/>
        <Hightlights/>
        
      </main>
    </>
  )
}

export default App
