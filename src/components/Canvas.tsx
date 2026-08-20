import React, { useEffect, useRef } from 'react'
import { useVideoStore } from '../store/videoStore'

interface CanvasProps {
  currentTime: number
}

export const Canvas: React.FC<CanvasProps> = ({ currentTime }) => {
  const { project } = useVideoStore()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !project) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = project.width
    canvas.height = project.height

    // Clear canvas
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Render clips for current time
    project.clips.forEach((clip) => {
      const clipStart = clip.startTime
      const clipEnd = clip.startTime + clip.duration

      if (currentTime < clipStart || currentTime > clipEnd) return

      const localTime = currentTime - clipStart

      switch (clip.type) {
        case 'text':
          ctx.fillStyle = clip.color || '#FFFFFF'
          ctx.font = `${clip.fontSize || 48}px Arial`
          ctx.fillText(
            clip.text || '',
            clip.x || 50,
            clip.y || 100
          )
          break

        case 'image':
          if (clip.url) {
            const img = new Image()
            img.crossOrigin = 'anonymous'
            img.onload = () => {
              ctx.drawImage(
                img,
                clip.x || 0,
                clip.y || 0,
                clip.width || 300,
                clip.height || 300
              )
            }
            img.src = clip.url
          }
          break
      }
    })
  }, [project, currentTime])

  if (!project) return null

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-800 rounded-lg">
      <canvas
        ref={canvasRef}
        className="border-2 border-gray-700 rounded"
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          aspectRatio: `${project.width}/${project.height}`,
        }}
      />
    </div>
  )
}
