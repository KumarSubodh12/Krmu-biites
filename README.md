# 🍽️ KRMU Bites — Full Stack Campus Canteen System

Premium smart food ordering platform for KR Mangalam University.
Luxury dark theme inspired by Zara · Ralph Lauren · H&M.

## 🚀 Quick Start

```bash
npm install
npm start
```

Open browser → **http://localhost:3000**

## 📁 Project Structure

```
krmu-bites/
├── server.js           ← Express + Socket.io backend
├── krmu_data.json      ← JSON database (auto-migrated on boot)
├── package.json
├── public/
│   ├── index.html      ← Animated landing page
│   ├── student.html    ← Student ordering portal (120+ animations)
│   └── manager.html    ← Manager dashboard
└── README.md
```

## 🌐 Portal Links

| Portal   | URL                                |
|----------|------------------------------------|
| Landing  | http://localhost:3000              |
| Student  | http://localhost:3000/student.html |
| Manager  | http://localhost:3000/manager.html |

## 🔐 Manager Login

Credentials are configured in server.js → POST /api/auth/manager

## ✨ Student Portal Features

- Browse 5 canteens with real-time open/closed status
- Luxury Zara-inspired dark UI with 120+ animations
- Custom magnetic cursor + mouse spotlight effect
- Floating Island navigation (Dynamic Island style)
- 3D card tilt on mouse/gyroscope
- Aurora gradient + animated mesh background
- Canvas-based infinite particle system
- Flying add-to-cart with physics
- Elastic cart with swipe-to-delete (touch)
- Tinder-style swipe cards on mobile
- Slide-to-confirm payment interaction
- Circular SVG progress ring for order tracking
- Animated chef avatar on progress rail
- Receipt unfold animation after order
- Confetti + coin rain + fireworks on success
- Steam effect (hot meals), bubbles (cold drinks), cheese stretch (pizza)
- Floating aroma particles on hover
- Glass reflection sweep on cards
- AI typing indicator in search
- Heart burst on favorites
- Rolling number counters
- Sound-reactive animations
- Full socket.io real-time updates

## 👨‍🍳 Manager Portal Features

- Secure login (no credential hints in UI)
- Collapsible sidebar with keyboard shortcuts (1-4, R)
- Live order Kanban: Placed → Confirmed → Preparing → Ready → Done
- Color-coded status system (🟡🔵🔥🟢⚪)
- Sound notifications for new orders (Web Audio API)
- Red dot alert + flashing for delayed orders (>15 min)
- Kitchen panel with live elapsed timers per order
- Drag-and-drop menu reorder
- Food photo upload (base64) per item
- QR Payment upload with mandatory Account Holder Name
- Canteen ON/OFF toggles with real-time sync
- Bulk mark-as-ready action
- Hourly order chart (SVG bars)
- Revenue by canteen visualization
- Top selling items leaderboard
- Auto-refresh every 30 seconds + socket.io live push

## 🗺️ Canteens

| Block         | Canteen        |
|---------------|----------------|
| A Block       | Main Canteen   |
| B Block       | Basil          |
| C Block       | Nescafé ☕     |
| C Block       | CCD 🧁         |
| C Block       | Main Canteen 🍛|

## 🛠️ Tech Stack

- **Backend:** Node.js, Express, Socket.io
- **Database:** JSON file (krmu_data.json)
- **Frontend:** Vanilla HTML/CSS/JS — zero dependencies
- **Fonts:** Playfair Display + Inter (Google Fonts)
- **Design:** Zara × Ralph Lauren × H&M luxury dark theme

## 🔐 Forgot Password — After Deployment

### Method 1 — Environment Variable (Recommended for Railway/Render/Heroku)
Go to your platform dashboard → Environment Variables → Add:
```
MANAGER_PASSWORD = YourNewPassword
```
Redeploy/restart the app. This overrides everything — no code change needed.

### Method 2 — Secret Reset URL (Browser-based, no terminal needed)
**Step 1:** Set env var in your platform dashboard:
```
RESET_TOKEN = mysecret123
```
**Step 2:** Open this URL in your browser:
```
https://your-app.com/api/auth/reset?token=mysecret123
```
To set a specific new password:
```
https://your-app.com/api/auth/reset?token=mysecret123&newpw=MyNewPass@123
```
Without `&newpw=`, it resets to `krmu@admin`.

### Method 3 — Terminal / SSH (VPS or local)
```bash
npm run reset-password
```
Resets password back to `krmu@admin`.

---

## 🌍 Deployment Platforms

### Railway (Recommended — Free tier available)
1. Push code to GitHub
2. Connect repo on railway.app
3. Add env vars in dashboard: `MANAGER_PASSWORD`, `RESET_TOKEN`
4. Railway auto-deploys on every push

### Render
1. New Web Service → connect GitHub repo
2. Start Command: `npm start`
3. Add env vars in Environment tab

### VPS (Ubuntu)
```bash
git clone your-repo && cd krmu-bites
npm install
npm start                    # or use PM2: pm2 start server.js
```
