import { useState, useEffect, useRef } from 'react'

export default function useAudio(
  url: string,
  {
    loop = false,
    volume = 1,
    muted = false,
    autoPlay = false,
  }: {
    loop?: boolean
    volume?: number
    muted?: boolean
    autoPlay?: boolean
  } = {}
) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(autoPlay)

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(url)
    }

    const audio = audioRef.current
    audio.loop = loop
    audio.volume = volume
    audio.muted = muted
    if (autoPlay) {
      audio.play().catch(() => {})
    }

    const handleEnded = () => setPlaying(false)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('ended', handleEnded)
      audio.pause()
      // audio.currentTime = 0
    }
  }, [url, loop, volume, muted, autoPlay])

  const play = async () => {
    const audio = audioRef.current
    if (audio) {
      try {
        await audio.play()
        setPlaying(true)
      } catch (e) {
        console.error('Playback failed:', e)
      }
    }
  }

  const pause = () => {
    const audio = audioRef.current
    if (audio) {
      audio.pause()
      setPlaying(false)
    }
  }

  const toggle = () => {
    playing ? pause() : play()
  }

  const stop = () => {
    const audio = audioRef.current
    if (audio) {
      pause()
      audio.currentTime = 0
    }
  }

  const mute = (value: boolean) => {
    const audio = audioRef.current
    if (audio) {
      audio.muted = value
    }
  }

  const replay = () => {
    const audio = audioRef.current
    if (audio) {
      audio.currentTime = 0
      play()
    }
  }

  return {
    audio: audioRef.current,
    playing,
    play,
    pause,
    toggle,
    replay,
    stop,
    mute,
  }
}

// import { useState, useEffect } from 'react'

// export default function useAudio(
//   url: string,
//   {
//     loop,
//     volume,
//     muted,
//     autoPlay,
//   }: {
//     loop?: boolean
//     volume?: number
//     muted?: boolean
//     autoPlay?: boolean
//   } = {}
// ) {
//   const [audio] = useState(() => {
//     const audio = new Audio(url)
//     console.log({ audio })

//     audio.loop = loop ?? false
//     audio.volume = volume ?? 1
//     audio.muted = muted ?? false
//     audio.autoplay = autoPlay ?? false
//     return audio
//   })
//   const [playing, setPlaying] = useState(false)

//   const toggle = () => setPlaying(!playing)

//   const play = () => {
//     console.log('play audio')

//     setPlaying(true)
//   }
//   const pause = () => {
//     console.log('pause audio')
//     setPlaying(false)
//   }

//   const stop = () => {
//     pause()
//     audio.currentTime = 0
//   }

//   const mute = (value: boolean) => {
//     audio.muted = value
//   }

//   const replay = () => {
//     audio.currentTime = 0
//     setPlaying(true) // Ensure it starts playing
//   }

//   useEffect(() => {
//     try {
//       playing ? audio.play() : audio.pause()
//     } catch (e) {
//       console.error(e)
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [playing])

//   useEffect(() => {
//     const handleEnded = () => setPlaying(false)
//     audio.addEventListener('ended', handleEnded)
//     return () => {
//       console.log('Audio removed')

//       audio.removeEventListener('ended', handleEnded)
//       audio.pause() // Stop audio when component unmounts
//       audio.currentTime = 0 // Reset audio position
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   return { audio, playing, play, pause, toggle, replay, stop, mute }
// }
