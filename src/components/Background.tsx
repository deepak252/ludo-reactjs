import { memo } from 'react'

const Background = () => {
  const stars = Array.from({ length: 30 })

  return (
    <>
      {stars.map((_, index) => (
        <div
          key={index}
          className="absolute bg-white w-2 h-2 rounded-full animate-blink"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`, // Random delay for natural blinking effect
          }}
        />
      ))}
    </>
  )
}

export default memo(Background)
