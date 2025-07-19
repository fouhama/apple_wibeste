import { useEffect, useRef, useState } from "react"
import { hightlightsSlides } from "../constants"
import gsap from "gsap"
import { pauseImg, playImg, replayImg } from "../utils"

const VideoCarousel = () => {
    const videoRef = useRef<(HTMLVideoElement | null)[]>([])
    const  videoDivRef = useRef<(HTMLElement | null)[]>([])
    const videoSpanRef = useRef<(HTMLElement | null)[]>([])
    const [video, setVideo] = useState({
        idEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo:false,
        isPlaying: false,
    })
    const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video
    const [loadedData, setloadedData] = useState([])
    useEffect(() => {
        if (loadedData.length > 3) {
            if (!isPlaying) {
                videoRef.current[videoId]?.pause()
            } else {
                startPlay && videoRef.current[videoId]?.play()
            }
        } 
        
    },[isPlaying,startPlay, videoId,loadedData])


    useEffect(() => {
        const currentProgress = 0
        let span = videoSpanRef.current
        if (span[videoId]) {
            let anim = gsap.to(span[videoId], {
                onUpdate: () => { },
                onComplete:()=>{}
            })
        }
    },[videoId, startPlay])
    return (
        <>
            <div className="flex items-center">
                {hightlightsSlides.map((list, i) => (
                    <div key={list.id} id="slider" className="sm:pr-20 pr-10" >
                        <div className="video-carousel_container">
                            <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                                <video playsInline={true} muted id="video" preload="auto" ref={(el) => {videoRef.current[i] = el }} onPlay={() => {
                                    setVideo((prevVideo) => ({
                                        ...prevVideo, startPlay:true
                                    }))
                                }}>
                                    <source src={list.video} type="video/mp4" />
                                </video>
                            </div>
                            <div className="absolute top-12 left-[5%] z-10">
                                {list.textLists.map(text => (
                                    <p key={text} className="text-xl sm:text-2xl font-medium">
                                        {text}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="relative flex-center mt-10">
                <div className="flex-center px-7 py-5 bg-zinc-800 backdrop-blur-md rounded-full">
                    {videoRef.current.map((_,i) => (
                        <span key={i} className=" w-3 h-3 mx-2 bg-gray-200 rounded-full relative cursor-pointer" ref={(el)=>{videoDivRef.current[i] = el}} >
                            <span className="w-full h-full absolute rounded-full" ref={ (el) =>{videoSpanRef.current[i] = el}} />
                        </span>
                    ))}
                </div> 
                <button className="control-btn">
                    <img src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg } alt={isLastVideo ? 'replay' : !isPlaying? 'play': 'pause'} />
                </button>
            </div>
        </>
    )
}

export default VideoCarousel