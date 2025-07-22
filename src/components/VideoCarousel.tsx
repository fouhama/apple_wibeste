/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useRef, useState } from "react"
import { hightlightsSlides } from "../constants"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { pauseImg, playImg, replayImg } from "../utils"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)
const VideoCarousel = () => {
    const videoRef = useRef<(HTMLVideoElement | null)[]>([])
    const videoDivRef = useRef<(HTMLElement | null)[]>([])
    const videoSpanRef = useRef<(HTMLElement | null)[]>([])
    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false,
    })
    const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video
    const [loadedData, setloadedData] = useState<React.SyntheticEvent<HTMLVideoElement, Event>[]>([])


    useEffect(() => {
        if (loadedData.length > 3) {
            if (!isPlaying) {
                videoRef.current[videoId]?.pause()
            } else {
                startPlay && videoRef.current[videoId]?.play()
            }
        }

    }, [isPlaying, startPlay, videoId, loadedData])
    const handleLoadedMetaData = (_i: number, e: React.SyntheticEvent<HTMLVideoElement, Event>) => setloadedData((prev) => [...prev, e])


    useEffect(() => {
        let currentProgress = 0
        const span = videoSpanRef.current
        if (span[videoId]) {
            // eslint-disable-next-line prefer-const
            let anim = gsap.to(span[videoId], {
                onUpdate: () => {
                    const progress = Math.ceil(anim.progress() * 100)
                    console.log(progress);
                    
                    if (progress != currentProgress) {
                        currentProgress = progress;
                        gsap.to(videoDivRef.current[videoId], {
                            width : window.innerWidth < 1200 ? '10vw' : '4vw'
                        })
                        gsap.to(span[videoId], {
                            width: `${currentProgress}%`,
                            backgroundColor : 'white'
                        })
                    }
                },
                onComplete: () => {
                    gsap.to(videoDivRef.current[videoId], {
                        width:'12px',
                    })
                    gsap.to(span[videoId], {
                        backgroundColor:'#afafaf'
                    })
                 }
            })

            if (videoId == 0) anim.restart()
            
            const animUpdate = () => {
                const current = videoRef.current[videoId]?.currentTime || 0;
                const duration = hightlightsSlides[videoId]?.videoDuration || 1;
                anim.progress(current/duration)
            }
            isPlaying ? gsap.ticker.add(animUpdate) : gsap.ticker.remove(animUpdate)
        }
    }, [videoId, startPlay])


    useGSAP(() => {
        gsap.to('#slider', {
            transform: `translateX(${-100 * videoId}%)`,
            duration: 2,
            ease:'power2.inout'
        })

        gsap.to("#video", {
            opacity:1,
            scrollTrigger: {
                trigger: '#video',
                toggleActions: "restart none none none"
            },
 
        
            onComplete: () => {                
                setVideo((prev) => ({
                    ...prev, startPlay: true, isPlaying: true
                }))
            }
            
        })
    }, [isEnd, videoId])
    const handleProcess = (type: string, _i: (number | null)) => {
        switch (type) {
            case 'video-end':
                setVideo((prev) => ({ ...prev, isEnd: true, videoId: prev.videoId + 1 }))
                break;
            case 'last-video':
                setVideo((pre) => ({ ...pre, isLastVideo: true }))
                break;
            case 'reset-video':
                setVideo((pre) => ({ ...pre, isLastVideo: false, videoId: 0 }))
                break;
            case 'play':
            case 'pause':
                setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }))
                break;
            default:
                return video

        }

    }


    return (
        <>
            <div className="flex items-center" >
                {hightlightsSlides.map((list, i) => (
                    <div key={list.id} id="slider" className="sm:pr-20 pr-10" >
                        <div className="video-carousel_container">
                            <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black" >
                                <video playsInline={true} muted id="video" preload="auto" ref={(el) => { videoRef.current[i] = el }} onPlay={() => {
                                    setVideo((prevVideo) => ({
                                        ...prevVideo, startPlay: true
                                    }))
                                }}
                                    onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                                    onEnded={() =>
                                        i !== (hightlightsSlides.length - 1 ) ? handleProcess('video-end', i) : handleProcess('last-video', i)
                                    }
                                >
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
                    {videoRef.current.map((_, i) => (
                        <span key={i} className=" w-3 h-3 mx-2 bg-gray-200 rounded-full relative cursor-pointer" ref={(el) => { videoDivRef.current[i] = el }} >
                            <span className="w-full h-full absolute rounded-full" ref={(el) => { videoSpanRef.current[i] = el }} />
                        </span>
                    ))}
                </div>
                <button className="control-btn" >
                    <img src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg} alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'}
                        onClick={isLastVideo ? () => handleProcess('reset-video',0) : !isPlaying ? () => handleProcess('play',0) : () => handleProcess('pause',0)}
                    />
                </button>
            </div>
        </>
    )
}

export default VideoCarousel