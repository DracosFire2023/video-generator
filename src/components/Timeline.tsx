import React, { useRef, useState } from 'react'
import { useVideoStore, VideoClip } from '../store/videoStore'
import { motion } from 'framer-motion'

interface TimelineProps {
  duration: number
  onClipSelect: (clip: VideoClip) => void
}

export const Timeline: React.FC<TimelineProps> = ({ duration, onClipSelect }) => {
  const { project, removeClip, updateClip } = useVideoStore()
  const timelineRef = useRef<HTMLDivElement>(null)
  const [draggingClip, setDraggingClip] = useState<string | null>(null)
  const [dragStart, setDragStart] = useState(0)

  if (!project) return null

  const pixelsPerSecond = 100
  const totalWidth = duration * pixelsPerSecond

  const handleClipMouseDown = (e: React.MouseEvent, clipId: string) => {
    e.preventDefault()
    setDraggingClip(clipId)
    setDragStart(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingClip) return

    const clip = project.clips.find((c) => c.id === draggingClip)
    if (!clip) return

    const delta = e.clientX - dragStart
    const newStartTime = Math.max(
      0,
      clip.startTime + delta / pixelsPerSecond
    )

    updateClip(draggingClip, { startTime: newStartTime })
    setDragStart(e.clientX)
  }

  const handleMouseUp = () => {
    setDraggingClip(null)
  }

  return (
    <div className="w-full bg-gray-900 rounded-lg p-4 border border-gray-700">
      <div className="mb-2 text-sm font-semibold text-gray-300">Timeline</div>
      <div
        ref={timelineRef}
        className="relative overflow-x-auto bg-gray-800 rounded border border-gray-700"
        style={{ minHeight: '200px' }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Ruler */}
        <div className="flex border-b border-gray-700 sticky top-0 bg-gray-800 z-10">
          {Array.from({ length: Math.ceil(duration) + 1 }).map((_, i) => (
            <div
              key={i}
              className="text-xs text-gray-500 flex-shrink-0"
              style={{ width: `${pixelsPerSecond}px` }}
            >
              {i}s
            </div>
          ))}
        </div>

        {/* Clips */}
        <div className="relative" style={{ width: `${totalWidth}px` }}>
          {project.clips.map((clip) => (
            <motion.div
              key={clip.id}
              className="absolute bg-primary/70 hover:bg-primary rounded border border-primary cursor-move group"
              style={{
                left: `${clip.startTime * pixelsPerSecond}px`,
                top: `${20 + project.clips.indexOf(clip) * 40}px`,
                width: `${clip.duration * pixelsPerSecond}px`,
                height: '35px',
              }}
              onMouseDown={(e) => handleClipMouseDown(e, clip.id)}
              onClick={() => onClipSelect(clip)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-xs text-white p-1 truncate">
                {clip.type === 'text' ? clip.text : `${clip.type}`}
              </div>
              <button
                className="absolute top-1 right-1 bg-red-500 text-white px-1 py-0.5 rounded text-xs opacity-0 group-hover:opacity-100 transition"
                onClick={(e) => {
                  e.stopPropagation()
                  removeClip(clip.id)
                }}
              >
                ×
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
