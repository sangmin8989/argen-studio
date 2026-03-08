# ⚡ ARGEN DESIGN — Quick Start Guide

Get your premium interior website running in 5 minutes.

---

## 🚀 Step 1: Download Files

All files are ready in your project folder:
```
argen-studio/
├── index.html                  ✅ Main page
├── css/style.css              ✅ Styles
├── js/main.js                 ✅ Interactions
├── README.md                  ✅ Full documentation
├── VIDEO-REQUIREMENTS.md      ✅ Video setup guide
├── DEPLOYMENT-SUMMARY.md      ✅ Deployment info
└── QUICK-START.md            ✅ This file
```

---

## 🎬 Step 2: Add Hero Video (Optional)

### Option A: Use Your Own Video
1. Record or obtain a premium interior video
2. Rename it to `hero-video.mp4`
3. Place it in the root directory

### Option B: Download from Stock Sites
**Free Sources:**
- [Pexels](https://www.pexels.com/search/videos/modern%20interior/)
- [Pixabay](https://pixabay.com/videos/search/interior/)
- [Coverr](https://coverr.co/s?q=interior)

**Download a video → Rename to `hero-video.mp4` → Place in root**

### Option C: Skip for Now
The website works perfectly without the video! It shows a beautiful cinematic gradient background instead.

---

## 🖥️ Step 3: Test Locally

### Method 1: Using npx (Recommended)
```bash
cd argen-studio
npx serve .
```
Open: http://localhost:3000

### Method 2: Using Python
```bash
cd argen-studio
python3 -m http.server 8000
```
Open: http://localhost:8000

### Method 3: Using VS Code
1. Install "Live Server" extension
2. Right-click `index.html`
3. Click "Open with Live Server"

---

## 🌐 Step 4: Deploy to Production

### Vercel (Easiest — Recommended)
```bash
# Install Vercel CLI (one time)
npm i -g vercel

# Deploy
cd argen-studio
vercel --prod
```
You'll get a live URL in seconds!

### Netlify
1. Drag & drop the `argen-studio` folder to [netlify.com/drop](https://app.netlify.com/drop)
2. Done! You get a live URL instantly.

### GitHub Pages (Free Hosting)
```bash
# 1. Create a repository on GitHub
# 2. Push your code
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/argen-studio.git
git push -u origin main

# 3. Enable GitHub Pages in repository settings
# Settings → Pages → Source: main branch
```
Your site will be live at: `https://username.github.io/argen-studio`

---

## ✏️ Step 5: Customize Content

### Replace Placeholder Text
Edit `index.html` and update:

**Line ~60:** Company address
```html
<p data-ko="경기도 수원시 영통구 영통로 123" 
   data-en="123 Yeongtong-ro, Suwon">
```

**Line ~70:** Phone number
```html
<a href="tel:031-123-4567">TEL. 031-123-4567</a>
```

**Line ~75:** Email
```html
<a href="mailto:info@argen.co.kr">info@argen.co.kr</a>
```

**Line ~80:** Business registration
```html
<p data-ko="사업자등록번호: 123-45-67890">
```

### Replace Portfolio Images
Edit `index.html`, find `<div class="portfolio-image" style="background-image: url('...')">` and replace URLs with your own project images.

### Add Real Project Data
Update the 6 portfolio items (Lines ~300-400) with:
- Project names
- Categories
- Image URLs

---

## 🎨 Step 6: Adjust Colors (Optional)

Edit `css/style.css` — Lines 10-20:

```css
:root {
  --charcoal:       #1C1917;  /* Main dark background */
  --cream:          #FAF7F2;  /* Text and highlights */
  --bronze:         #8B7355;  /* Brand accent color */
  --bronze-light:   #B09A7A;  /* Lighter accent */
  --cream-warm:     #F0EBE3;  /* Section backgrounds */
}
```

Change these HEX codes to match your brand colors!

---

## 📱 Step 7: Test on Mobile

### iOS (iPhone/iPad)
1. Deploy to production (Step 4)
2. Open in Safari
3. Test video autoplay (should work with `playsinline`)
4. Test language toggle
5. Test mobile menu

### Android
1. Open in Chrome
2. Test all features
3. Check responsiveness

### Responsive Testing Tools
- Chrome DevTools (F12 → Device toolbar)
- [Responsive Design Checker](https://responsivedesignchecker.com/)
- [BrowserStack](https://www.browserstack.com/) (real devices)

---

## 🔧 Troubleshooting

### Video Not Playing
**Problem:** Video doesn't autoplay on iOS  
**Solution:** Ensure these attributes: `autoplay muted loop playsinline`

**Problem:** Video too large (slow loading)  
**Solution:** Compress using FFmpeg or Handbrake (see VIDEO-REQUIREMENTS.md)

### Language Toggle Not Working
**Problem:** Text doesn't change when clicking KO/EN  
**Solution:** Check browser console for JS errors. Ensure all elements have `data-ko` and `data-en` attributes.

### Mobile Menu Stuck Open
**Problem:** Can't close mobile menu  
**Solution:** Refresh page. Check if hamburger button has event listener.

### Images Not Loading
**Problem:** Portfolio images show broken  
**Solution:** Check image URLs. Use https:// URLs for external images.

---

## 📚 More Resources

- **Full Documentation:** `README.md`
- **Video Setup:** `VIDEO-REQUIREMENTS.md`
- **Deployment Info:** `DEPLOYMENT-SUMMARY.md`

---

## ✅ Checklist

Before going live:

- [ ] Added hero video (or confirmed gradient fallback looks good)
- [ ] Updated company contact information
- [ ] Replaced portfolio images with real projects
- [ ] Tested on desktop Chrome/Firefox/Safari
- [ ] Tested on mobile iOS/Android
- [ ] Checked language toggle works (KO/EN)
- [ ] Verified all links work
- [ ] Tested contact CTAs (phone, KakaoTalk)
- [ ] Deployed to production
- [ ] Shared URL with team

---

## 🎉 You're Ready!

Your ARGEN DESIGN website is live and looking premium. 

**Share it with pride!** 🚀

---

## 📞 Need Help?

- Check browser console (F12) for errors
- Review `README.md` for detailed documentation
- Test in incognito mode to rule out caching issues
- Compare your code with the original files

---

**Built for success. Ready to impress.**

© 2026 ARGEN DESIGN