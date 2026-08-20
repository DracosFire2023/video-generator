import React, { useState } from 'react'
import { useVideoStore } from './store/videoStore'
import { VideoPlayer } from './components/VideoPlayer'
import { Timeline } from './components/Timeline'
import { ClipPanel } from './components/ClipPanel'
import { VideoExporter } from './components/VideoExporter'
import { VideoClip } from './store/videoStore'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const { project, createProject } = useVideoStore()
  const [projectName, setProjectName] = useState('My Video')
  const [selectedClip, setSelectedClip] = useState<VideoClip | null>(null)
  const [showSettings, setShowSettings] = useState(false)

  const handleCreateProject = () => {
    if (projectName.trim()) {
      createProject(projectName)
    }
  }

  if (!project) {
    return (
      <AnimatePresence>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-gray-900 rounded-lg border border-gray-700 p-8 space-y-6">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-2">🎬 Video Generator</h1>
                <p className="text-gray-400">Create videos with code</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Enter project name"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                    onKeyPress={(e) => e.key === 'Enter' && handleCreateProject()}
                  />
                </div>

                <button
                  onClick={handleCreateProject}
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg transition"
                >
                  Create Project
                </button>
              </div>

              <div className="pt-4 border-t border-gray-700">
                <p className="text-xs text-gray-500 text-center">
                  Built with React, Vite, FFmpeg.wasm, and Canvas API
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="bg-gray-900/50 border-b border-gray-700 backdrop-blur sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">🎬 {project.name}</h1>
            <p className="text-sm text-gray-400">
              {project.clips.length} clips • {project.duration.toFixed(1)}s • {project.width}x{project.height}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
            >
              ⚙ Settings
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
            >
              New Project
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <motion.div
            className="lg:col-span-1 space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ClipPanel />
            <VideoExporter />

            {selectedClip && (
              <motion.div
                className="bg-gray-900 rounded-lg p-4 border border-gray-700 space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h3 className="font-semibold text-white">Selected Clip</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>Type: {selectedClip.type}</p>
                  <p>Start: {selectedClip.startTime.toFixed(2)}s</p>
                  <p>Duration: {selectedClip.duration.toFixed(2)}s</p>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Center Content */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <VideoPlayer />
            <Timeline
              duration={project.duration}
              onClipSelect={setSelectedClip}
            />
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default App
