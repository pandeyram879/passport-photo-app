import { useState, useRef, useEffect } from "react";

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

/* ===========================
   CROP MODAL
   =========================== */
.crop-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.85);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.crop-modal {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(0,245,255,0.25);
  border-radius: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 90vw;
  max-height: 90vh;
  width: 600px;
  box-shadow: 0 0 60px rgba(0,245,255,0.1), 0 0 120px rgba(191,0,255,0.08);
}

.crop-title {
  font-family: 'Orbitron', monospace;
  font-size: 0.75rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--neon-cyan);
  text-align: center;
}

.crop-canvas-wrapper {
  position: relative;
  cursor: crosshair;
  user-select: none;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(0,245,255,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 60vh;
}

.crop-canvas-wrapper canvas {
  display: block;
  max-width: 100%;
  max-height: 60vh;
  object-fit: contain;
}

.crop-actions {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
}

.crop-hint {
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.7rem;
  color: rgba(255,255,255,0.3);
  text-align: center;
  letter-spacing: 1px;
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

  // Crop states
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [cropImageSrc, setCropImageSrc] = useState(null);
  const [cropFile, setCropFile] = useState(null);
  const cropCanvasRef = useRef(null);
  const cropImgRef = useRef(null);
  const cropStateRef = useRef({
    dragging: false, resizing: false, handle: null,
    startX: 0, startY: 0,
    rect: { x: 0, y: 0, w: 0, h: 0 },
    imgNaturalW: 0, imgNaturalH: 0,
    displayW: 0, displayH: 0,
    offsetX: 0, offsetY: 0,
  });

  const API_KEY = "oAAibCneuLMLwo2jiyu7XTuR";

  const bgOptions = [
    { color: "white", display: "#ffffff", label: "White" },
    { color: "lightblue", display: "#add8e6", label: "Blue" },
    { color: "#e8e8e8", display: "#e8e8e8", label: "Grey" },
    { color: "red", display: "#cc0000", label: "Red" },
  ];

  // ✅ CAMERA FIX: video element DOM mein aane ke baad stream attach karo
  useEffect(() => {
    if (cameraOn && videoStream && videoRef.current) {
      videoRef.current.srcObject = videoStream;
      videoRef.current.play().catch(() => {});
    }
  }, [cameraOn, videoStream]);

  // ── CROP LOGIC ──────────────────────────────────────────

  const openCropModal = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setCropImageSrc(url);
    setCropFile(file);
    setCropModalOpen(true);
  };

  const initCropCanvas = (imgEl) => {
    const canvas = cropCanvasRef.current;
    if (!canvas || !imgEl) return;
    const maxW = Math.min(550, window.innerWidth - 80);
    const maxH = Math.min(window.innerHeight * 0.55);
    const ratio = Math.min(maxW / imgEl.naturalWidth, maxH / imgEl.naturalHeight, 1);
    const dW = Math.floor(imgEl.naturalWidth * ratio);
    const dH = Math.floor(imgEl.naturalHeight * ratio);
    canvas.width = dW;
    canvas.height = dH;
    const s = cropStateRef.current;
    s.imgNaturalW = imgEl.naturalWidth;
    s.imgNaturalH = imgEl.naturalHeight;
    s.displayW = dW;
    s.displayH = dH;
    // Default crop: center 80%
    s.rect = { x: dW * 0.1, y: dH * 0.1, w: dW * 0.8, h: dH * 0.8 };
    drawCrop();
  };

  const drawCrop = () => {
    const canvas = cropCanvasRef.current;
    const img = cropImgRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    const { displayW: dW, displayH: dH, rect } = cropStateRef.current;
    ctx.clearRect(0, 0, dW, dH);
    ctx.drawImage(img, 0, 0, dW, dH);
    // Dark overlay outside crop
    ctx.fillStyle = "rgba(0,0,0,0.55)";
    ctx.fillRect(0, 0, dW, dH);
    // Clear crop area
    ctx.clearRect(rect.x, rect.y, rect.w, rect.h);
    ctx.drawImage(img, 0, 0, dW, dH);
    ctx.clearRect(rect.x, rect.y, rect.w, rect.h);
    ctx.drawImage(img, 0, 0, dW, dH);
    // Re-draw just crop area from image
    ctx.save();
    ctx.beginPath();
    ctx.rect(rect.x, rect.y, rect.w, rect.h);
    ctx.clip();
    ctx.drawImage(img, 0, 0, dW, dH);
    ctx.restore();
    // Crop border
    ctx.strokeStyle = "rgba(0,245,255,0.9)";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([]);
    ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
    // Rule of thirds grid
    ctx.strokeStyle = "rgba(0,245,255,0.25)";
    ctx.lineWidth = 0.5;
    for (let i = 1; i <= 2; i++) {
      ctx.beginPath(); ctx.moveTo(rect.x + (rect.w / 3) * i, rect.y); ctx.lineTo(rect.x + (rect.w / 3) * i, rect.y + rect.h); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(rect.x, rect.y + (rect.h / 3) * i); ctx.lineTo(rect.x + rect.w, rect.y + (rect.h / 3) * i); ctx.stroke();
    }
    // Corner handles
    const hs = 8;
    const corners = [
      [rect.x, rect.y], [rect.x + rect.w, rect.y],
      [rect.x, rect.y + rect.h], [rect.x + rect.w, rect.y + rect.h],
    ];
    corners.forEach(([cx, cy]) => {
      ctx.fillStyle = "var(--neon-cyan, #00f5ff)";
      ctx.shadowColor = "#00f5ff";
      ctx.shadowBlur = 8;
      ctx.fillRect(cx - hs / 2, cy - hs / 2, hs, hs);
      ctx.shadowBlur = 0;
    });
    // Edge handles
    const edges = [
      [rect.x + rect.w / 2, rect.y], [rect.x + rect.w / 2, rect.y + rect.h],
      [rect.x, rect.y + rect.h / 2], [rect.x + rect.w, rect.y + rect.h / 2],
    ];
    edges.forEach(([cx, cy]) => {
      ctx.fillStyle = "rgba(0,245,255,0.7)";
      ctx.fillRect(cx - hs / 2, cy - hs / 2, hs, hs);
    });
  };

  const getHandle = (mx, my) => {
    const { rect } = cropStateRef.current;
    const hs = 12;
    const pts = {
      tl: [rect.x, rect.y], tr: [rect.x + rect.w, rect.y],
      bl: [rect.x, rect.y + rect.h], br: [rect.x + rect.w, rect.y + rect.h],
      tm: [rect.x + rect.w / 2, rect.y], bm: [rect.x + rect.w / 2, rect.y + rect.h],
      ml: [rect.x, rect.y + rect.h / 2], mr: [rect.x + rect.w, rect.y + rect.h / 2],
    };
    for (const [key, [px, py]] of Object.entries(pts)) {
      if (Math.abs(mx - px) <= hs && Math.abs(my - py) <= hs) return key;
    }
    return null;
  };

  const getCanvasPos = (e) => {
    const canvas = cropCanvasRef.current;
    const bounds = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - bounds.left) * (canvas.width / bounds.width),
      y: (clientY - bounds.top) * (canvas.height / bounds.height),
    };
  };

  const onCropMouseDown = (e) => {
    e.preventDefault();
    const { x, y } = getCanvasPos(e);
    const s = cropStateRef.current;
    const handle = getHandle(x, y);
    if (handle) {
      s.resizing = true; s.handle = handle;
    } else if (x >= s.rect.x && x <= s.rect.x + s.rect.w && y >= s.rect.y && y <= s.rect.y + s.rect.h) {
      s.dragging = true;
    } else {
      // Start new crop
      s.resizing = true; s.handle = "br";
      s.rect = { x, y, w: 0, h: 0 };
    }
    s.startX = x; s.startY = y;
  };

  const onCropMouseMove = (e) => {
    e.preventDefault();
    const s = cropStateRef.current;
    if (!s.dragging && !s.resizing) return;
    const { x, y } = getCanvasPos(e);
    const dx = x - s.startX, dy = y - s.startY;
    const { displayW: dW, displayH: dH } = s;
    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
    const minSize = 20;

    if (s.dragging) {
      s.rect.x = clamp(s.rect.x + dx, 0, dW - s.rect.w);
      s.rect.y = clamp(s.rect.y + dy, 0, dH - s.rect.h);
    } else if (s.resizing) {
      const r = { ...s.rect };
      const h = s.handle;
      if (h.includes("r")) r.w = clamp(r.w + dx, minSize, dW - r.x);
      if (h.includes("b")) r.h = clamp(r.h + dy, minSize, dH - r.y);
      if (h.includes("l")) { const nw = clamp(r.w - dx, minSize, r.x + r.w); r.x = r.x + r.w - nw; r.w = nw; }
      if (h.includes("t")) { const nh = clamp(r.h - dy, minSize, r.y + r.h); r.y = r.y + r.h - nh; r.h = nh; }
      if (h === "tm" || h === "bm") r.x = s.rect.x;
      if (h === "ml" || h === "mr") r.y = s.rect.y;
      s.rect = r;
    }
    s.startX = x; s.startY = y;
    drawCrop();
  };

  const onCropMouseUp = () => {
    cropStateRef.current.dragging = false;
    cropStateRef.current.resizing = false;
  };

  const applyCrop = () => {
    const s = cropStateRef.current;
    const img = cropImgRef.current;
    if (!img) return;
    const scaleX = s.imgNaturalW / s.displayW;
    const scaleY = s.imgNaturalH / s.displayH;
    const sx = s.rect.x * scaleX, sy = s.rect.y * scaleY;
    const sw = s.rect.w * scaleX, sh = s.rect.h * scaleY;
    const out = document.createElement("canvas");
    out.width = sw; out.height = sh;
    out.getContext("2d").drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
    out.toBlob((blob) => {
      const croppedFile = new File([blob], cropFile?.name || "cropped.jpg", { type: "image/jpeg" });
      setCropModalOpen(false);
      setCropImageSrc(null);
      processFile(croppedFile);
    }, "image/jpeg", 0.95);
  };

  const skipCrop = () => {
    const file = cropFile;
    setCropModalOpen(false);
    setCropImageSrc(null);
    processFile(file);
  };

  // ── ORIGINAL processFile (called after crop or skip) ─────
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

  const handleUpload = (e) => openCropModal(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    openCropModal(e.dataTransfer.files[0]);
  };

  // ✅ CAMERA FIX: sirf state set karo, useEffect srcObject handle karega
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      setVideoStream(stream);
      setCameraOn(true);
    } catch (err) {
      alert("Camera access denied or unavailable 📷");
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    canvas.toBlob((blob) => {
      const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
      videoStream.getTracks().forEach((t) => t.stop());
      setCameraOn(false);
      setVideoStream(null);
      openCropModal(file);
    });
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
    // Convert dataURL to blob then create blob URL
    // This fixes "problem printing" on mobile Chrome
    fetch(finalSheet)
      .then((res) => res.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <title>Passport Photo Print</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      @page { size: A4 portrait; margin: 0; }
      html, body { width: 210mm; height: 297mm; background: white; }
      img { width: 210mm; height: 297mm; display: block; object-fit: contain; }
    </style>
  </head>
  <body>
    <img src="${blobUrl}" />
    <script>
      window.onload = function() {
        setTimeout(function() {
          window.print();
        }, 300);
      };
    </script>
  </body>
</html>`;
        const printBlob = new Blob([html], { type: "text/html" });
        const printUrl = URL.createObjectURL(printBlob);
        const win = window.open(printUrl, "_blank");
        if (!win) {
          // Popup blocked — fallback: download the image
          alert("Print popup blocked. Downloading image instead — open it and print from your gallery.");
          handleDownload();
        }
        // Cleanup blob URLs after delay
        setTimeout(() => {
          URL.revokeObjectURL(blobUrl);
          URL.revokeObjectURL(printUrl);
        }, 60000);
      });
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

            {/* ✅ Camera view — ref only, useEffect srcObject set karega */}
            {cameraOn && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                <video ref={videoRef} autoPlay playsInline muted className="camera-video" />
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

      {/* ── CROP MODAL ── */}
      {cropModalOpen && (
        <div className="crop-overlay">
          <div className="crop-modal">
            <div className="crop-title">✂ Crop Your Photo</div>
            <div className="crop-hint">Drag to move • Pull corners/edges to resize • Draw new area on blank space</div>

            <div
              className="crop-canvas-wrapper"
              onMouseDown={onCropMouseDown}
              onMouseMove={onCropMouseMove}
              onMouseUp={onCropMouseUp}
              onMouseLeave={onCropMouseUp}
              onTouchStart={onCropMouseDown}
              onTouchMove={onCropMouseMove}
              onTouchEnd={onCropMouseUp}
            >
              {/* Hidden img for drawing */}
              <img
                ref={cropImgRef}
                src={cropImageSrc}
                alt="crop-source"
                style={{ display: "none" }}
                onLoad={(e) => initCropCanvas(e.target)}
              />
              <canvas ref={cropCanvasRef} style={{ display: "block", maxWidth: "100%", touchAction: "none" }} />
            </div>

            <div className="crop-actions">
              <button className="neon-btn btn-pink" onClick={() => { setCropModalOpen(false); setCropImageSrc(null); }} style={{ width: "100%", fontSize: "0.6rem" }}>
                ✕ &nbsp; Cancel
              </button>
              <button className="neon-btn btn-purple" onClick={skipCrop} style={{ width: "100%", fontSize: "0.6rem" }}>
                ⬡ &nbsp; Skip Crop
              </button>
              <button className="neon-btn btn-green" onClick={applyCrop} style={{ width: "100%", fontSize: "0.6rem" }}>
                ✓ &nbsp; Apply Crop
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
}