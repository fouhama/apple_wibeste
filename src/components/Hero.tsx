import gsap from "gsap"
import { useGSAP } from '@gsap/react'
import { heroVideo , smallHeroVideo} from "../utils"
import { useEffect, useState } from "react"
const Hero = () => {
    useGSAP(() => {
        gsap.to('#hero', {
            opacity: 1,
            delay: 2            
        }) 
        gsap.to('#cta', {
            opacity: 1,
            y: -50,
            delay: 2
        })
    }, [])
    const [vedioSrc, setVedioSrc] = useState(
        window.innerWidth  < 760 ? smallHeroVideo : heroVideo
    )
    const handleVedioSrcSet = () => {
        if (window.innerWidth < 760) {
            setVedioSrc(smallHeroVideo)
        } else {
            setVedioSrc(heroVideo)
        }
    }
    useEffect(() => {
        window.addEventListener('resize', handleVedioSrcSet) 
        return () => {
            window.removeEventListener('resize', handleVedioSrcSet)
        }
    },[])

  return (
      <section className="w-full  nav-height bg-black relative">
          <div className="h-5/6 w-full flex-center flex-col">
          <p id="hero" className="hero-title">iPhone 15 Pro</p>
              <div className="md:w-10/12 w-9/12">
                  <video autoPlay muted playsInline={true} key={vedioSrc}>
                      <source src={vedioSrc}   />
                  </video>                                
              </div>
          </div>
          <div id="cta" className="flex flex-col items-center opacity-0 translate-y-20">
              <a href="#hightlights" className="btn">Buy</a>
              <p className="font-normal text-xl"> Form $199/month or  $999 </p>            
          </div>

      </section>
  )
}

export default Hero