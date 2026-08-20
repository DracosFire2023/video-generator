import React, { useState, useEffect } from 'react'
import { useVideoStore } from '../store/videoStore'
import { Canvas } from './Canvas'
import { motion } from 'framer-motion'

export const VideoPlayer: React.FC = () => {
  const { project } = useVideoStore()
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!isPlaying || !project) return

    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= project.duration) {
          setIsPlaying(false)
          return 0
        }
        return prev + 1 / project.fps
      })
    }, 1000 / project.fps)

    return () => clearInterval(interval)
  }, [isPlaying, project])

  if (!project) return null

  const progress = (currentTime / project.duration) * 100

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
        <Canvas currentTime={currentTime} />
      </div>

      <div className="bg-gray-900 rounded-lg p-4 border border-gray-700 space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">
              {currentTime.toFixed(2)}s / {project.duration.toFixed(2)}s
            </span>
          </div>
          <motion.div
            className="h-2 bg-gray-700 rounded overflow-hidden cursor-pointer"
            onClick={(e) => {
              const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
              const newTime = ((e.clientX - rect.left) / rect.width) * project.duration
              setCurrentTime(newTime)
            }}
          >
            <motion.div
              className="h-full bg-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0 }}
            />
          </motion.div>
        </div>

        {/* Controls */}
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => setCurrentTime(Math.max(0, currentTime - 1))}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
          >
            ⏮ Back
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition"
          >
            {isPlaying ? '⏸ Pause' : '▶ Play'}
          </button>
          <button
            onClick={() => setCurrentTime(Math.min(project.duration, currentTime + 1))}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
          >
            Forward ⏭
          </button>
          <button
            onClick={() => setCurrentTime(0)}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}
