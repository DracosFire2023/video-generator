import React, { useState } from 'react'
import { useVideoStore, VideoClip } from '../store/videoStore'

export const ClipPanel: React.FC = () => {
  const { project, addClip } = useVideoStore()
  const [clipType, setClipType] = useState<'text' | 'image' | 'video'>('text')
  const [textInput, setTextInput] = useState('')
  const [startTime, setStartTime] = useState(0)
  const [duration, setDuration] = useState(3)

  const handleAddClip = () => {
    if (!project) return

    const newClip: VideoClip = {
      id: Date.now().toString(),
      type: clipType,
      startTime,
      duration,
      text: clipType === 'text' ? textInput : undefined,
      fontSize: 48,
      color: '#FFFFFF',
      x: 50,
      y: 100,
    }

    addClip(newClip)
    setTextInput('')
    setStartTime(0)
    setDuration(3)
  }

  if (!project) return null

  return (
    <div className="bg-gray-900 rounded-lg p-4 border border-gray-700 space-y-4">
      <h3 className="text-lg font-semibold text-white">Add Clip</h3>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Clip Type
        </label>
        <select
          value={clipType}
          onChange={(e) => setClipType(e.target.value as any)}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
        >
          <option value="text">Text</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
      </div>

      {clipType === 'text' && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Text Content
          </label>
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Enter text"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500"
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Start Time (s)
          </label>
          <input
            type="number"
            min="0"
            max={project.duration}
            value={startTime}
            onChange={(e) => setStartTime(parseFloat(e.target.value))}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Duration (s)
          </label>
          <input
            type="number"
            min="0.1"
            value={duration}
            onChange={(e) => setDuration(parseFloat(e.target.value))}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
          />
        </div>
      </div>

      <button
        onClick={handleAddClip}
        className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition"
      >
        Add Clip
      </button>
    </div>
  )
}
