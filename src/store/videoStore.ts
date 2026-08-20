import { create } from 'zustand'

export interface VideoClip {
  id: string
  type: 'video' | 'image' | 'text'
  startTime: number
  duration: number
  url?: string
  text?: string
  fontSize?: number
  color?: string
  x?: number
  y?: number
  width?: number
  height?: number
}

export interface VideoProject {
  id: string
  name: string
  duration: number
  width: number
  height: number
  fps: number
  clips: VideoClip[]
}

interface VideoStore {
  project: VideoProject | null
  createProject: (name: string, width?: number, height?: number) => void
  addClip: (clip: VideoClip) => void
  removeClip: (id: string) => void
  updateClip: (id: string, updates: Partial<VideoClip>) => void
  setDuration: (duration: number) => void
}

const createDefaultProject = (name: string): VideoProject => ({
  id: Date.now().toString(),
  name,
  duration: 10,
  width: 1920,
  height: 1080,
  fps: 30,
  clips: [],
})

export const useVideoStore = create<VideoStore>((set) => ({
  project: null,
  createProject: (name, width = 1920, height = 1080) => {
    set({
      project: {
        ...createDefaultProject(name),
        width,
        height,
      },
    })
  },
  addClip: (clip) => {
    set((state) => ({
      project: state.project
        ? { ...state.project, clips: [...state.project.clips, clip] }
        : null,
    }))
  },
  removeClip: (id) => {
    set((state) => ({
      project: state.project
        ? {
            ...state.project,
            clips: state.project.clips.filter((clip) => clip.id !== id),
          }
        : null,
    }))
  },
  updateClip: (id, updates) => {
    set((state) => ({
      project: state.project
        ? {
            ...state.project,
            clips: state.project.clips.map((clip) =>
              clip.id === id ? { ...clip, ...updates } : clip
            ),
          }
        : null,
    }))
  },
  setDuration: (duration) => {
    set((state) => ({
      project: state.project
        ? { ...state.project, duration }
        : null,
    }))
  },
}))
