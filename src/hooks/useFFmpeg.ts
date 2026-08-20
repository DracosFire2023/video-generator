import { useEffect, useState } from 'react'

export const useFFmpeg = () => {
  const [ffmpeg, setFFmpeg] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const ffmpegModule = await import('@ffmpeg/ffmpeg')
        const utilModule = await import('@ffmpeg/util')

        // Resolve constructors/functions across both named and default ES module exports
        const FFmpeg = ffmpegModule.FFmpeg || (ffmpegModule as any).default?.FFmpeg
        const toBlobURL = utilModule.toBlobURL || (utilModule as any).default?.toBlobURL

        if (typeof toBlobURL !== 'function') {
          throw new Error('Failed to resolve toBlobURL from @ffmpeg/util')
        }

        const ffmpegInstance = new FFmpeg()
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm'

        await ffmpegInstance.load({
          coreURL: await toBlobURL(
            `${baseURL}/ffmpeg-core.js`,
            'text/javascript'
          ),
          wasmURL: await toBlobURL(
            `${baseURL}/ffmpeg-core.wasm`,
            'application/wasm'
          ),
        })

        setFFmpeg(ffmpegInstance)
        setIsLoaded(true)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load FFmpeg')
      } finally {
        setIsLoading(false)
      }
    }

    load()
  }, [])

  return { ffmpeg, isLoaded, isLoading, error }
}
