import { useState, useRef } from "react";

const glowPulse = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: #020010;
  font-family: 'Rajdhani', sans-serif;
  min-height: 100vh;
}

:root {
  --neon-cyan: #00f5ff;
  --neon-purple: #bf00ff;
  --neon-pink: #ff006e;
  --neon-green: #39ff14;
  --glass-bg: rgba(255,255,255,0.04);
  --glass-border: rgba(255,255,255,0.12);
  --glass-highlight: rgba(255,255,255,0.08);
}

.cosmos-bg {
  position: fixed;
  inset: 0;
  background: radial-gradient(ellipse at 20% 20%, rgba(0,245,255,0.08) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 80%, rgba(191,0,255,0.08) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 50%, rgba(255,0,110,0.04) 0%, transparent 60%),
              #020010;
  z-index: 0;
}

.cosmos-bg::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(1px 1px at 10% 15%, rgba(255,255,255,0.6) 0%, transparent 100%),
    radial-gradient(1px 1px at 30% 55%, rgba(255,255,255,0.4) 0%, transparent 100%),
    radial-gradient(1px 1px at 70% 25%, rgba(255,255,255,0.5) 0%, transparent 100%),
    radial-gradient(1px 1px at 85% 75%, rgba(255,255,255,0.3) 0%, transparent 100%),
    radial-gradient(1px 1px at 50% 90%, rgba(255,255,255,0.4) 0%, transparent 100%),
    radial-gradient(1px 1px at 20% 80%, rgba(0,245,255,0.8) 0%, transparent 100%),
    radial-gradient(1px 1px at 90% 10%, rgba(191,0,255,0.8) 0%, transparent 100%);
}

.grid-lines {
  position: fixed;
  inset: 0;
  background-image: 
    linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  z-index: 0;
}

.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid var(--glass-border);
  border-radius: 24px;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  height: 100%;
  box-sizing: border-box;
}

.glass-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--glass-highlight) 0%, transparent 50%);
  border-radius: inherit;
  pointer-events: none;
}

.glass-card:hover {
  border-color: rgba(0,245,255,0.3);
  box-shadow: 0 0 30px rgba(0,245,255,0.08), 0 8px 40px rgba(0,0,0,0.4);
}

.neon-title {
  font-family: 'Orbitron', monospace;
  font-weight: 900;
  font-size: 1.6rem;
  text-align: center;
  letter-spacing: 3px;
  text-transform: uppercase;
  background: linear-gradient(135deg, var(--neon-cyan), var(--neon-purple), var(--neon-pink));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 20px rgba(0,245,255,0.5));
  animation: titleGlow 3s ease-in-out infinite alternate;
}

@keyframes titleGlow {
  from { filter: drop-shadow(0 0 10px rgba(0,245,255,0.4)); }
  to { filter: drop-shadow(0 0 30px rgba(191,0,255,0.7)); }
}

.subtitle {
  font-family: 'Rajdhani', sans-serif;
  color: rgba(0,245,255,0.5);
  text-align: center;
  font-size: 0.75rem;
  letter-spacing: 6px;
  text-transform: uppercase;
  margin-top: 4px;
}

.neon-btn {
  font-family: 'Orbitron', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 12px 24px;
  border-radius: 12px;
  border: 1px solid;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  background: transparent;
}

.neon-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: currentColor;
  opacity: 0;
  transition: opacity 0.3s;
}

.neon-btn:hover::before { opacity: 0.1; }

.neon-btn:active { transform: scale(0.96); }

.btn-cyan {
  color: var(--neon-cyan);
  border-color: var(--neon-cyan);
  box-shadow: 0 0 12px rgba(0,245,255,0.2), inset 0 0 12px rgba(0,245,255,0.05);
}
.btn-cyan:hover {
  box-shadow: 0 0 25px rgba(0,245,255,0.5), 0 0 50px rgba(0,245,255,0.2), inset 0 0 20px rgba(0,245,255,0.1);
}

.btn-purple {
  color: var(--neon-purple);
  border-color: var(--neon-purple);
  box-shadow: 0 0 12px rgba(191,0,255,0.2), inset 0 0 12px rgba(191,0,255,0.05);
}
.btn-purple:hover {
  box-shadow: 0 0 25px rgba(191,0,255,0.5), 0 0 50px rgba(191,0,255,0.2), inset 0 0 20px rgba(191,0,255,0.1);
}

.btn-pink {
  color: var(--neon-pink);
  border-color: var(--neon-pink);
  box-shadow: 0 0 12px rgba(255,0,110,0.2), inset 0 0 12px rgba(255,0,110,0.05);
}
.btn-pink:hover {
  box-shadow: 0 0 25px rgba(255,0,110,0.5), 0 0 50px rgba(255,0,110,0.2), inset 0 0 20px rgba(255,0,110,0.1);
}

.btn-green {
  color: var(--neon-green);
  border-color: var(--neon-green);
  box-shadow: 0 0 12px rgba(57,255,20,0.2), inset 0 0 12px rgba(57,255,20,0.05);
}
.btn-green:hover {
  box-shadow: 0 0 25px rgba(57,255,20,0.5), 0 0 50px rgba(57,255,20,0.2), inset 0 0 20px rgba(57,255,20,0.1);
}

.upload-zone {
  border: 1px dashed rgba(0,245,255,0.3);
  border-radius: 16px;
  padding: 28px;
  text-align: center;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  background: rgba(0,245,255,0.02);
  position: relative;
  overflow: hidden;
}

.upload-zone::before {
  content: '';
  position: absolute;
  inset: -50%;
  background: conic-gradient(from 0deg, transparent, rgba(0,245,255,0.05), transparent);
  animation: rotateBg 8s linear infinite;
  opacity: 0;
  transition: opacity 0.4s;
}

.upload-zone:hover::before { opacity: 1; }

.upload-zone:hover {
  border-color: rgba(0,245,255,0.7);
  background: rgba(0,245,255,0.05);
  box-shadow: 0 0 30px rgba(0,245,255,0.1), inset 0 0 30px rgba(0,245,255,0.05);
}

@keyframes rotateBg {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.upload-icon {
  font-size: 2.5rem;
  margin-bottom: 8px;
  filter: drop-shadow(0 0 10px rgba(0,245,255,0.6));
  animation: iconFloat 3s ease-in-out infinite;
}

@keyframes iconFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

.upload-text {
  font-family: 'Orbitron', monospace;
  font-size: 0.7rem;
  color: rgba(0,245,255,0.6);
  letter-spacing: 3px;
  text-transform: uppercase;
}

.neon-label {
  font-family: 'Orbitron', monospace;
  font-size: 0.6rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(0,245,255,0.5);
  margin-bottom: 8px;
  display: block;
}

.neon-input {
  background: rgba(0,245,255,0.04);
  border: 1px solid rgba(0,245,255,0.2);
  border-radius: 8px;
  padding: 8px 12px;
  color: var(--neon-cyan);
  font-family: 'Orbitron', monospace;
  font-size: 0.8rem;
  width: 80px;
  outline: none;
  transition: all 0.3s;
}

.neon-input:focus {
  border-color: var(--neon-cyan);
  box-shadow: 0 0 15px rgba(0,245,255,0.3);
  background: rgba(0,245,255,0.08);
}

.bg-selector {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.bg-option {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  border: 2px solid rgba(255,255,255,0.15);
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.bg-option::after {
  content: '✓';
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  opacity: 0;
  transition: opacity 0.3s;
  text-shadow: 0 0 10px rgba(0,0,0,0.8);
}

.bg-option.selected::after { opacity: 1; }

.bg-option.selected {
  border-color: var(--neon-cyan);
  box-shadow: 0 0 20px rgba(0,245,255,0.5);
  transform: scale(1.1);
}

.bg-option:hover {
  transform: scale(1.08);
  border-color: rgba(0,245,255,0.5);
}

.photo-preview {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(0,245,255,0.2);
  position: relative;
}

.photo-preview::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0,245,255,0.05) 0%, transparent 50%);
  pointer-events: none;
}

.photo-label {
  font-family: 'Orbitron', monospace;
  font-size: 0.6rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 6px;
}

.loading-bar {
  width: 100%;
  height: 2px;
  background: rgba(0,245,255,0.1);
  border-radius: 2px;
  overflow: hidden;
  position: relative;
}

.loading-bar::after {
  content: '';
  position: absolute;
  height: 100%;
  width: 40%;
  background: linear-gradient(90deg, transparent, var(--neon-cyan), transparent);
  animation: loadSlide 1.2s ease-in-out infinite;
}

@keyframes loadSlide {
  from { left: -40%; }
  to { left: 100%; }
}

.loading-text {
  font-family: 'Orbitron', monospace;
  font-size: 0.65rem;
  letter-spacing: 4px;
  color: var(--neon-cyan);
  text-align: center;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% { opacity: 0.3; }
}

.section-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0,245,255,0.2), transparent);
  margin: 4px 0;
}

.camera-video {
  width: 100%;
  border-radius: 12px;
  border: 1px solid rgba(191,0,255,0.4);
  box-shadow: 0 0 20px rgba(191,0,255,0.2);
}

.corner-decor {
  position: absolute;
  width: 20px;
  height: 20px;
  border-color: var(--neon-cyan);
  border-style: solid;
  opacity: 0.5;
}
.corner-tl { top: 8px; left: 8px; border-width: 1px 0 0 1px; }
.corner-tr { top: 8px; right: 8px; border-width: 1px 1px 0 0; }
.corner-bl { bottom: 8px; left: 8px; border-width: 0 0 1px 1px; }
.corner-br { bottom: 8px; right: 8px; border-width: 0 1px 1px 0; }

.scan-line {
  position: absolute;
  left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--neon-cyan), transparent);
  opacity: 0.4;
  animation: scan 3s linear infinite;
}
@keyframes scan {
  from { top: 0; }
  to { top: 100%; }
}

.status-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--neon-green);
  box-shadow: 0 0 8px var(--neon-green);
  animation: pulse 2s ease-in-out infinite;
  display: inline-block;
}
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}

.controls-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.preview-sheet {
  width: 100%;
  border-radius: 12px;
  border: 1px solid rgba(0,245,255,0.15);
  box-shadow: 0 0 40px rgba(0,245,255,0.08), 0 0 80px rgba(191,0,255,0.05);
}

.action-btns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.floating-orb {
  position: fixed;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 0;
  animation: orbFloat 8s ease-in-out infinite;
}
@keyframes orbFloat {
  0%, 100% { transform: translate(0, 0); }
  33% { transform: translate(20px, -20px); }
  66% { transform: translate(-15px, 15px); }
}

/* ===========================
   TWO-COLUMN LAYOUT
   =========================== */

.two-col-layout {
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
  max-width: 1100px;
  align-items: stretch;
}

.left-panel {
  flex: 1 1 auto;
  min-width: 0;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

/* A4 ratio = 210 : 297 */
.right-panel {
  flex: 0 0 370px;
  width: 370px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 37px;
  position: sticky;
  top: 20px;
  align-self: flex-start;
  min-height: 100%;
}

.a4-frame {
  flex: 1 1 auto;
  width: 100%;
  min-height: 0;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(0,245,255,0.15);
  box-shadow: 0 0 30px rgba(0,245,255,0.07), 0 0 60px rgba(191,0,255,0.05);
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.a4-frame img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

@media (max-width: 900px) {
  .two-col-layout {
    flex-direction: column;
    align-items: stretch;
  }
  .left-panel {
    flex: none;
    width: 100%;
  }
  .right-panel {
    flex: none;
    width: 100% !important;
    max-width: 100%;
    position: static;
    align-self: auto;
    min-height: unset;
  }
  .a4-frame {
    aspect-ratio: 210 / 297;
    flex: none;
    width: 100%;
    max-width: 360px;
    margin: 0 auto;
  }
  .glass-card {
    height: auto;
  }
}

/* ===========================
   RESPONSIVE — TABLET (≤768px)
   =========================== */
@media (max-width: 768px) {
  .two-col-layout {
    flex-direction: column;
  }
  .right-panel {
    position: static;
  }
  .neon-title {
    font-size: 1.2rem;
    letter-spacing: 2px;
  }
  .subtitle {
    font-size: 0.65rem;
    letter-spacing: 4px;
  }
  .glass-card {
    border-radius: 18px;
    padding: 20px !important;
  }
  .controls-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
  .neon-input {
    width: 100%;
    font-size: 0.75rem;
  }
  .action-btns {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .neon-btn {
    font-size: 0.65rem;
    padding: 11px 16px;
    letter-spacing: 1px;
  }
  .bg-option {
    width: 42px;
    height: 42px;
  }
  .upload-zone {
    padding: 22px 16px;
  }
  .upload-text {
    font-size: 0.6rem;
    letter-spacing: 2px;
  }
  .upload-icon {
    font-size: 2rem;
  }
}

/* ===========================
   RESPONSIVE — MOBILE (≤480px)
   =========================== */
@media (max-width: 480px) {
  .neon-title {
    font-size: 1rem;
    letter-spacing: 1.5px;
  }
  .subtitle {
    font-size: 0.6rem;
    letter-spacing: 3px;
  }
  .glass-card {
    border-radius: 14px;
    padding: 16px !important;
    gap: 14px !important;
  }
  .controls-grid {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 6px;
  }
  .neon-input {
    width: 100%;
    font-size: 0.7rem;
    padding: 7px 8px;
  }
  .neon-label {
    font-size: 0.5rem;
    letter-spacing: 1.5px;
  }
  .action-btns {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  .neon-btn {
    font-size: 0.6rem;
    padding: 10px 12px;
    letter-spacing: 1px;
  }
  .bg-option {
    width: 38px;
    height: 38px;
    border-radius: 8px;
  }
  .bg-selector {
    gap: 8px;
  }
  .upload-zone {
    padding: 18px 12px;
  }
  .upload-text {
    font-size: 0.55rem;
    letter-spacing: 1.5px;
  }
  .upload-icon {
    font-size: 1.8rem;
  }
  .corner-decor {
    width: 14px;
    height: 14px;
  }
  .photo-label {
    font-size: 0.5rem;
    letter-spacing: 2px;
  }
}

/* ===========================
   RESPONSIVE — SMALL (≤360px)
   =========================== */
@media (max-width: 360px) {
  .neon-title {
    font-size: 0.85rem;
    letter-spacing: 1px;
  }
  .controls-grid {
    grid-template-columns: 1fr 1fr;
    gap: 6px;
  }
  .neon-input {
    font-size: 0.65rem;
    padding: 6px 8px;
  }
  .glass-card {
    padding: 14px !important;
  }
}

/* Touch devices — remove hover-only effects */
@media (hover: none) {
  .glass-card:hover {
    border-color: var(--glass-border);
    box-shadow: none;
  }
  .neon-btn:hover::before {
    opacity: 0;
  }
  .upload-zone:hover::before {
    opacity: 0;
  }
  .upload-zone:hover {
    border-color: rgba(0,245,255,0.3);
    background: rgba(0,245,255,0.02);
    box-shadow: none;
  }
  .bg-option:hover {
    transform: none;
    border-color: rgba(255,255,255,0.15);
  }
  .bg-option.selected {
    transform: scale(1.05);
  }
}

/* Prevent horizontal overflow on all screens */
html, body {
  overflow-x: hidden;
  max-width: 100vw;
}

`;

export default function App() {
  const [image, setImage] = useState(null);
  const [removedBg, setRemovedBg] = useState(null);
  const [finalSheet, setFinalSheet] = useState(null);
  const [copies, setCopies] = useState(6);
  const [bgColor, setBgColor] = useState("white");
  const [loading, setLoading] = useState(false);
  const [customWidth, setCustomWidth] = useState(380);
  const [customHeight, setCustomHeight] = useState(531);
  const [cameraOn, setCameraOn] = useState(false);
  const [videoStream, setVideoStream] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const videoRef = useRef(null);

  const API_KEY = "oAAibCneuLMLwo2jiyu7XTuR";

  const bgOptions = [
    { color: "white", display: "#ffffff", label: "White" },
    { color: "lightblue", display: "#add8e6", label: "Blue" },
    { color: "#e8e8e8", display: "#e8e8e8", label: "Grey" },
    { color: "red", display: "#cc0000", label: "Red" },
  ];

  const processFile = async (file) => {
    if (!file) return;
    setImage(URL.createObjectURL(file));
    setLoading(true);
    setFinalSheet(null);
    setRemovedBg(null);

    const formData = new FormData();
    formData.append("image_file", file);

    try {
      const res = await fetch("https://api.remove.bg/v1.0/removebg", {
        method: "POST",
        headers: { "X-Api-Key": API_KEY },
        body: formData,
      });
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setRemovedBg(url);
      generateSheet(url, copies, bgColor, customWidth, customHeight);
    } catch {
      alert("Error removing background 😢");
    }
    setLoading(false);
  };

  const handleUpload = (e) => processFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    processFile(e.dataTransfer.files[0]);
  };

  const startCamera = async () => {
  if (typeof window === "undefined" || !navigator.mediaDevices) {
    alert("Camera not supported in this environment");
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    setVideoStream(stream);
    setCameraOn(true);
  } catch (err) {
    alert("Camera access denied ❌");
  }
};

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    canvas.toBlob((blob) => {
      processFile(new File([blob], "capture.jpg", { type: "image/jpeg" }));
    });
    videoStream.getTracks().forEach((t) => t.stop());
    setCameraOn(false);
  };

  const generateSheet = (imgUrl, copiesCount, background, w, h) => {
    const img = new Image();
    img.src = imgUrl;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const A4W = 2480, A4H = 3508;
      canvas.width = A4W; canvas.height = A4H;
      const photoW = w || 413, photoH = h || 531;
      const margin = 40, gap = 20;
      const cols = Math.floor((A4W - margin * 2) / (photoW + gap));
      const rows = Math.floor((A4H - margin * 2) / (photoH + gap));
      let count = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (count >= copiesCount) break;
          const x = margin + c * (photoW + gap);
          const y = margin + r * (photoH + gap);
          ctx.fillStyle = background;
          ctx.fillRect(x, y, photoW, photoH);
          ctx.drawImage(img, x, y, photoW, photoH);
          count++;
        }
      }
      setFinalSheet(canvas.toDataURL("image/png"));
    };
  };

  const handleCopiesChange = (e) => {
  const value = e.target.value;

  // allow empty
  if (value === "") {
    setCopies("");
    return;
  }

  const num = parseInt(value);
  if (!isNaN(num)) {
    setCopies(num);

    if (removedBg) {
      generateSheet(removedBg, num, bgColor, customWidth, customHeight);
    }
  }
};

  const handleBgChange = (color) => {
    setBgColor(color);
    if (removedBg) generateSheet(removedBg, copies, color, customWidth, customHeight);
  };

  const handleWidthChange = (e) => {
    const num = parseInt(e.target.value);
    if (!isNaN(num)) {
      setCustomWidth(num);
      if (removedBg) generateSheet(removedBg, copies, bgColor, num, customHeight);
    }
  };

  const handleHeightChange = (e) => {
    const num = parseInt(e.target.value);
    if (!isNaN(num)) {
      setCustomHeight(num);
      if (removedBg) generateSheet(removedBg, copies, bgColor, customWidth, num);
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = finalSheet;
    link.download = "passport-photo.png";
    link.click();
  };

  const handlePrint = () => {
    const w = window.open("", "_blank");
    w.document.write(`<html><head><title>Print</title><style>@page{size:A4;margin:0}body{margin:0}img{width:210mm;height:297mm;object-fit:contain}</style></head><body><img src="${finalSheet}" /></body></html>`);
    w.document.close();
    setTimeout(() => { w.print(); w.close(); }, 500);
  };

  return (
    <>
      <style>{glowPulse}</style>

      {/* Background layers */}
      <div className="cosmos-bg" />
      <div className="grid-lines" />
      <div className="floating-orb" style={{ width: 300, height: 300, background: "rgba(0,245,255,0.04)", top: "10%", left: "5%" }} />
      <div className="floating-orb" style={{ width: 400, height: 400, background: "rgba(191,0,255,0.04)", bottom: "10%", right: "5%", animationDelay: "4s" }} />

      {/* Page wrapper */}
      <div style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px 16px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 20, width: "100%" }}>
          <h1 className="neon-title">MAKE MY IMAGE</h1>
          <p className="subtitle">Passport Size Photo Generation System</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 8 }}>
            <span className="status-dot" />
            <span style={{ fontFamily: "Orbitron, monospace", fontSize: "0.6rem", color: "rgba(57,255,20,0.7)", letterSpacing: 3 }}>SYSTEM ONLINE</span>
          </div>
        </div>

        {/* ── TWO-COLUMN LAYOUT ── */}
        <div className="two-col-layout">

          {/* ── LEFT: Controls Panel ── */}
          <div className="glass-card left-panel">
            <div className="corner-decor corner-tl" />
            <div className="corner-decor corner-tr" />
            <div className="corner-decor corner-bl" />
            <div className="corner-decor corner-br" />

            {/* Upload Zone */}
            <div
              className={`upload-zone ${dragOver ? "dragover" : ""}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              <div className="scan-line" />
              <input type="file" onChange={handleUpload} id="upload" style={{ display: "none" }} accept="image/*" />
              <label htmlFor="upload" style={{ cursor: "pointer", display: "block" }}>
                <div className="upload-icon">⬡</div>
                <div className="upload-text">Drop image or click to upload</div>
                <div style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.25)", fontFamily: "Rajdhani", marginTop: 6, letterSpacing: 2 }}>
                  JPG • PNG • WEBP
                </div>
              </label>
            </div>

            {/* Camera button */}
            <button className="neon-btn btn-purple" onClick={startCamera} style={{ width: "100%" }}>
              ⬡ &nbsp; Open Camera Module
            </button>

            {/* Camera view */}
            {cameraOn && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                <video ref={videoRef} autoPlay className="camera-video" />
                <button className="neon-btn btn-pink" onClick={capturePhoto} style={{ width: "100%" }}>
                  ◉ &nbsp; Capture Frame
                </button>
              </div>
            )}

            <div className="section-divider" />

            {/* Configuration */}
            <div>
              <span className="neon-label">Configuration</span>
              <div className="controls-grid">
                <div className="input-group">
                  <label className="neon-label" style={{ fontSize: "0.5rem" }}>Copies</label>
                  <input type="number" value={copies} min="1" onChange={handleCopiesChange} className="neon-input" style={{ width: "100%" }} />
                </div>
                <div className="input-group">
                  <label className="neon-label" style={{ fontSize: "0.5rem" }}>Width px</label>
                  <input type="number" value={customWidth} onChange={handleWidthChange} className="neon-input" style={{ width: "100%" }} />
                </div>
                <div className="input-group">
                  <label className="neon-label" style={{ fontSize: "0.5rem" }}>Height px</label>
                  <input type="number" value={customHeight} onChange={handleHeightChange} className="neon-input" style={{ width: "100%" }} />
                </div>
              </div>
            </div>

            <div className="section-divider" />

            {/* Background Color */}
            <div>
              <span className="neon-label">Background Color</span>
              <div className="bg-selector">
                {bgOptions.map((opt) => (
                  <div
                    key={opt.color}
                    className={`bg-option ${bgColor === opt.color ? "selected" : ""}`}
                    style={{ background: opt.display }}
                    onClick={() => handleBgChange(opt.color)}
                    title={opt.label}
                  />
                ))}
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <label style={{ fontFamily: "Orbitron", fontSize: "0.5rem", color: "rgba(0,245,255,0.4)", letterSpacing: 2 }}>CUSTOM</label>
                  <input
                    type="color"
                    value={bgColor.startsWith("#") ? bgColor : "#ffffff"}
                    onChange={(e) => handleBgChange(e.target.value)}
                    style={{ width: 42, height: 42, borderRadius: 10, border: "1px solid rgba(0,245,255,0.2)", cursor: "pointer", background: "transparent", padding: 2 }}
                  />
                </div>
              </div>
            </div>

            {/* Loading */}
            {loading && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div className="loading-bar" />
                <div className="loading-text">⬡ &nbsp; PROCESSING IMAGE DATA PLEASE WAIT PATIENTLY...</div>
              </div>
            )}

            {/* Original + Processed thumbnails */}
            {(image || removedBg) && (
              <>
                <div className="section-divider" />
                <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                  {image && (
                    <div style={{ flex: "0 0 auto", textAlign: "center" }}>
                      <div className="photo-label" style={{ color: "rgba(255,255,255,0.35)" }}>Original</div>
                      <div className="photo-preview" style={{ width: 100 }}>
                        <img src={image} alt="original" />
                      </div>
                    </div>
                  )}
                  {removedBg && (
                    <div style={{ flex: "0 0 auto", textAlign: "center" }}>
                      <div className="photo-label" style={{ color: "rgba(0,245,255,0.8)" }}>Processed</div>
                      <div className="photo-preview" style={{ width: 100, background: "rgba(255,255,255,0.05)" }}>
                        <img src={removedBg} alt="processed" />
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

          </div>{/* end left-panel */}

          {/* ── RIGHT: A4 Preview Panel ── */}
          <div className="glass-card right-panel">
            <div className="corner-decor corner-tl" />
            <div className="corner-decor corner-tr" />
            <div className="corner-decor corner-bl" />
            <div className="corner-decor corner-br" />

            <span className="neon-label">A4 Sheet Preview</span>

            {finalSheet ? (
              <>
                <div className="a4-frame">
                  <img src={finalSheet} alt="A4 Sheet" />
                </div>

                <div className="section-divider" />

                <div className="action-btns">
                  <button className="neon-btn btn-green" onClick={handleDownload} style={{ width: "100%" }}>
                    ↓ &nbsp; Download
                  </button>
                  <button className="neon-btn btn-cyan" onClick={handlePrint} style={{ width: "100%" }}>
                    ⬡ &nbsp; Print A4
                  </button>
                </div>
              </>
            ) : (
              /* Empty state */
              <div className="a4-frame" style={{ opacity: 0.25, flexDirection: "column", gap: 16 }}>
                <div style={{ fontSize: "3rem", filter: "drop-shadow(0 0 10px rgba(0,245,255,0.4))" }}>⬡</div>
                <div style={{ fontFamily: "Orbitron, monospace", fontSize: "0.55rem", color: "var(--neon-cyan)", letterSpacing: 3, textAlign: "center", lineHeight: 2.2 }}>
                  UPLOAD AN IMAGE<br />TO GENERATE<br />A4 SHEET
                </div>
              </div>
            )}
          </div>{/* end right-panel */}

        </div>{/* end two-col-layout */}

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 16, fontFamily: "Orbitron, monospace", fontSize: "0.5rem", color: "rgba(255,255,255,0.12)", letterSpacing: 4 }}>
          CREATED BY RAM PANDEY &nbsp;•&nbsp; ALL COPYRIGHTS RESERVED &copy; 2026
        </div>

      </div>
    </>
  );
}