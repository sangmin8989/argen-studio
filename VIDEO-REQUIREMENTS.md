# Hero Video Requirements

**File Name:** `hero-video.mp4`  
**Location:** Root directory (same level as index.html)

## Video Specifications

### Technical Requirements
- **Format:** MP4 (H.264 codec)
- **Resolution:** 1920x1080 or higher
- **Aspect Ratio:** 16:9
- **Duration:** 8-15 seconds (will loop)
- **File Size:** 3-5 MB recommended (max 10 MB)
- **Frame Rate:** 24-30 fps
- **Audio:** None (video will be muted)

### Content Guidelines
The video should showcase:
- Interior spaces (modern apartments, showrooms, or commercial spaces)
- Slow camera movements (dolly, pan, or tracking shots)
- Professional lighting
- Premium finishes and materials
- Warm, inviting atmosphere

### Recommended Approach
1. **Use the provided video** from the main agent conversation (3.7 MB, showroom interior)
2. **Source from stock sites:**
   - Pexels: https://www.pexels.com/search/videos/modern%20interior/
   - Pixabay: https://pixabay.com/videos/search/interior%20design/
   - Unsplash: https://unsplash.com/s/videos/interior
3. **Create custom footage** of actual completed projects

### Video Optimization
If your video is too large, compress it using:

**FFmpeg (command line):**
```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow -vf scale=1920:1080 -an hero-video.mp4
```

**Handbrake (GUI):**
- Video codec: H.264
- Quality: RF 26-28
- Resolution: 1920x1080
- Remove audio track

### Fallback
If the video file is missing, the website will display:
- **Desktop:** Cinematic dark gradient with radial overlays
- **Mobile:** Same gradient background
- All text and functionality will still work perfectly

The CSS already includes a fallback gradient background:
```css
.hero {
  background: linear-gradient(135deg, #1C1917 0%, #2C2418 50%, #1C1917 100%);
}

.hero::before {
  background: 
    radial-gradient(ellipse at 30% 40%, rgba(139,115,85,0.15) 0%, transparent 60%),
    radial-gradient(ellipse at 70% 70%, rgba(28,25,23,0.8) 0%, transparent 50%);
}
```

---

## How to Add the Video

1. Download or create your hero video
2. Rename it to exactly `hero-video.mp4`
3. Place it in the root directory:
   ```
   argen-studio/
   ├── hero-video.mp4    ← Here!
   ├── index.html
   ├── css/
   └── js/
   ```
4. Test locally: `npx serve .`
5. Deploy to production

The video will automatically:
- ✅ Autoplay on page load
- ✅ Loop continuously
- ✅ Play muted (required for autoplay)
- ✅ Work on iOS (playsinline attribute)
- ✅ Scale to fill viewport (object-fit: cover)
- ✅ Pause if user prefers reduced motion

---

**Current Status:** Video file not included in deployment. Add `hero-video.mp4` to enable full experience.