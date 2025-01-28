import { useState, useEffect } from 'react'

export default function useAudio(url: string) {
  const [audio] = useState(new Audio(url))
  const [playing, setPlaying] = useState(false)

  const toggle = () => setPlaying(!playing)
  const stop = () => setPlaying(false)

  const replay = () => {
    audio.currentTime = 0 // Reset to the beginning
    setPlaying(true) // Ensure it starts playing
  }

  useEffect(() => {
    playing ? audio.play() : audio.pause()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing])

  useEffect(() => {
    const handleEnded = () => setPlaying(false)
    audio.addEventListener('ended', handleEnded)
    return () => {
      audio.removeEventListener('ended', handleEnded)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { playing, toggle, replay, stop }
}
