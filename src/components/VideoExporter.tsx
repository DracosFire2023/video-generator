import React, { useState } from 'react'
import { useVideoStore } from '../store/videoStore'
import { useFFmpeg } from '../hooks/useFFmpeg'
import { motion } from 'framer-motion'

export const VideoExporter: React.FC = () => {
  const { project } = useVideoStore()
  const { ffmpeg, isLoaded, isLoading, error } = useFFmpeg()
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)

  const handleExport = async () => {
    if (!project || !ffmpeg || !isLoaded) return

    setIsExporting(true)
    setExportProgress(0)

    try {
      // This is a simplified export - in production you'd render all frames
      // and compose them into a video using FFmpeg
      
      const canvas = document.querySelector('canvas') as HTMLCanvasElement
      if (!canvas) throw new Error('Canvas not found')

      // For demonstration, we'll create a simple video file
      // In production, you'd render each frame and use FFmpeg to compose them
      setExportProgress(50)
      
      // Get canvas data
      const imageData = canvas.toDataURL('image/png')
      
      setExportProgress(100)
      
      // Create a simple blob download for now
      const link = document.createElement('a')
      link.href = imageData
      link.download = `${project.name}.png`
      link.click()
      
      alert('Export started! In production, this would create a full MP4 video.')
    } catch (err) {
      console.error('Export error:', err)
      alert('Export failed: ' + (err instanceof Error ? err.message : 'Unknown error'))
    } finally {
      setIsExporting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="p-4 bg-yellow-500/10 border border-yellow-500 rounded text-yellow-500">
        Loading video encoder...
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 bg-red-500/10 border border-red-500 rounded text-red-500">
        Error: {error}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <button
        onClick={handleExport}
        disabled={!project || isExporting}
        className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-500 text-white font-semibold rounded-lg transition"
      >
        {isExporting ? `Exporting... ${exportProgress}%` : 'Export Video'}
      </button>
      {isExporting && (
        <motion.div
          className="w-full h-2 bg-gray-700 rounded overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="h-full bg-green-500"
            initial={{ width: 0 }}
            animate={{ width: `${exportProgress}%` }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      )}
    </div>
  )
}
