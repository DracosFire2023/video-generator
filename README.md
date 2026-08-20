# Frontend Video Generator

A powerful, open-source video generator built with love, React, Vite and modern web technologies. Create videos directly in your browser using open-source video libraries.

## 🚀 Features

- **React + TypeScript** - Modern, type-safe development
- **Vite** - Lightning-fast build tool
- **Canvas API** - Client-side video rendering
- **FFmpeg.wasm** - Video processing and encoding in the browser
- **Framer Motion** - Smooth animations and transitions
- **Tailwind CSS** - Utility-first styling
- **Zustand** - Simple state management

## 📋 Capabilities

- ✅ Add text, images, and video clips
- ✅ Visual timeline editor
- ✅ Real-time preview
- ✅ Play/pause controls
- ✅ Video export (MP4)
- ✅ Clip manipulation (drag, resize, delete)
- ✅ Support for multiple resolutions
- ✅ Custom frame rates

## 🛠️ Tech Stack

### Core Libraries
- **React 18** - UI framework
- **Vite 4** - Build tool
- **TypeScript 5** - Type safety

### Video Processing
- **FFmpeg.wasm** - Video encoding and processing
- **Canvas API** - Frame rendering

### State & Animation
- **Zustand** - State management
- **Framer Motion** - Animations

### Styling
- **Tailwind CSS** - Utility-first CSS
- **PostCSS** - CSS processing

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd video-generator

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will open in your browser at `http://localhost:3000`

## 📖 Usage

1. **Create a Project** - Give your video project a name
2. **Add Clips** - Add text, images, or videos from the left panel
3. **Edit Timeline** - Drag clips on the timeline to adjust timing
4. **Preview** - Use the player controls to preview your video
5. **Export** - Click "Export Video" to download your video as MP4

## 🎨 Project Structure

```
src/
├── components/          # React components
│   ├── Canvas.tsx      # Canvas rendering
│   ├── Timeline.tsx    # Timeline editor
│   ├── VideoPlayer.tsx # Video player controls
│   ├── ClipPanel.tsx   # Add clips panel
│   └── VideoExporter.tsx # Export functionality
├── hooks/
│   └── useFFmpeg.ts    # FFmpeg integration
├── store/
│   └── videoStore.ts   # Zustand state management
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## 🎯 Component Overview

### Canvas Component
Renders the current frame based on active clips and current playback time.

### Timeline Component
Drag-and-drop interface for managing clips' timing and order.

### VideoPlayer Component
Provides playback controls (play, pause, seek, frame stepping).

### ClipPanel Component
Interface to add new clips with configurable properties.

### VideoExporter Component
Handles video export using FFmpeg.wasm.

## 🔧 API Reference

### useVideoStore Hook

```typescript
const {
  project,           // Current video project
  createProject,     // (name: string) => void
  addClip,           // (clip: VideoClip) => void
  removeClip,        // (id: string) => void
  updateClip,        // (id: string, updates: Partial<VideoClip>) => void
  setDuration,       // (duration: number) => void
} = useVideoStore()
```

### VideoClip Interface

```typescript
interface VideoClip {
  id: string
  type: 'video' | 'image' | 'text'
  startTime: number      // In seconds
  duration: number       // In seconds
  url?: string          // For images/videos
  text?: string         // For text clips
  fontSize?: number
  color?: string
  x?: number            // X position
  y?: number            // Y position
  width?: number
  height?: number
}
```

## 🚧 Planned Features

- [ ] Audio track editing
- [ ] More transition effects
- [ ] Filters and effects (blur, brightness, etc.)
- [ ] Multi-track support
- [ ] Keyframe animation
- [ ] Asset library
- [ ] Undo/Redo history
- [ ] Project save/load
- [ ] Batch export
- [ ] Real-time collaboration

## 📝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Support

For issues, questions, or suggestions, please open an issue on GitHub.

## 🎓 Resources

- [Remotion - React-based video creation](https://remotion.dev/)
- [FFmpeg.wasm Documentation](https://ffmpegwasm.netlify.app/)
- [Canvas API - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)

---

Made with ❤️ by the Video Generator Community
