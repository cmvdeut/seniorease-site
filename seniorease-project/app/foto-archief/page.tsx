'use client';

import { useEffect, useRef, useState } from 'react';

export default function FotoArchiefPage() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [outlineImage, setOutlineImage] = useState<string | null>(null);
  const [markers, setMarkers] = useState<Array<{id: number, x: number, y: number, number: number, name: string}>>([]);
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const [edgeStrength, setEdgeStrength] = useState(30);
  const [showOriginal, setShowOriginal] = useState(false);
  const [draggedMarker, setDraggedMarker] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [exportFilename, setExportFilename] = useState('foto-met-nummers');
  const [showExportModal, setShowExportModal] = useState(false);

  const hiddenCanvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const displayImageRef = useRef<HTMLImageElement>(null);

  // Edge Detection
  function applyEdgeDetection(imageData: ImageData, threshold: number): ImageData {
    const width = imageData.width;
    const height = imageData.height;
    const src = imageData.data;
    const output = new Uint8ClampedArray(src.length);

    const gray = new Float32Array(width * height);
    for (let i = 0; i < width * height; i++) {
      const idx = i * 4;
      gray[i] = 0.299 * src[idx] + 0.587 * src[idx + 1] + 0.114 * src[idx + 2];
    }

    const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
    const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let gx = 0, gy = 0;
        
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const idx = (y + ky) * width + (x + kx);
            const kernelIdx = (ky + 1) * 3 + (kx + 1);
            gx += gray[idx] * sobelX[kernelIdx];
            gy += gray[idx] * sobelY[kernelIdx];
          }
        }

        const magnitude = Math.sqrt(gx * gx + gy * gy);
        const outputIdx = (y * width + x) * 4;
        const edge = magnitude > threshold ? 0 : 255;
        output[outputIdx] = edge;
        output[outputIdx + 1] = edge;
        output[outputIdx + 2] = edge;
        output[outputIdx + 3] = 255;
      }
    }

    // Fill borders
    for (let x = 0; x < width; x++) {
      const topIdx = x * 4;
      const bottomIdx = ((height - 1) * width + x) * 4;
      output[topIdx] = output[topIdx + 1] = output[topIdx + 2] = 255;
      output[topIdx + 3] = 255;
      output[bottomIdx] = output[bottomIdx + 1] = output[bottomIdx + 2] = 255;
      output[bottomIdx + 3] = 255;
    }
    for (let y = 0; y < height; y++) {
      const leftIdx = y * width * 4;
      const rightIdx = (y * width + width - 1) * 4;
      output[leftIdx] = output[leftIdx + 1] = output[leftIdx + 2] = 255;
      output[leftIdx + 3] = 255;
      output[rightIdx] = output[rightIdx + 1] = output[rightIdx + 2] = 255;
      output[rightIdx + 3] = 255;
    }

    return new ImageData(output, width, height);
  }

  function processImage(img: HTMLImageElement) {
    const maxSize = 800;
    let { width, height } = img;
    if (width > maxSize || height > maxSize) {
      const ratio = Math.min(maxSize / width, maxSize / height);
      width *= ratio;
      height *= ratio;
    }

    const canvas = hiddenCanvasRef.current;
    if (!canvas) return;

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(img, 0, 0, width, height);
    const imageData = ctx.getImageData(0, 0, width, height);
    const edgeData = applyEdgeDetection(imageData, edgeStrength);
    ctx.putImageData(edgeData, 0, 0);

    setOutlineImage(canvas.toDataURL());
  }

  function handleImageUpload(file: File | null) {
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setOriginalImage(result);
      setMarkers([]);
      setSelectedMarker(null);
      
      const img = new Image();
      img.onload = () => {
        processImage(img);
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  }

  function handleImageClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target !== displayImageRef.current) return;
    if (!imageContainerRef.current) return;

    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newMarker = {
      id: Date.now(),
      x,
      y,
      number: markers.length + 1,
      name: ''
    };

    setMarkers([...markers, newMarker]);
    setSelectedMarker(newMarker.id);
  }

  function deleteMarker(id: number) {
    const newMarkers = markers.filter(m => m.id !== id);
    const renumbered = newMarkers.map((m, idx) => ({ ...m, number: idx + 1 }));
    setMarkers(renumbered);
    if (selectedMarker === id) setSelectedMarker(null);
  }

  function updateMarkerName(id: number, name: string) {
    setMarkers(markers.map(m => m.id === id ? { ...m, name } : m));
  }

  function startDragging(marker: typeof markers[0], e: React.MouseEvent | React.TouchEvent) {
    setDraggedMarker(marker.id);
    setSelectedMarker(marker.id);
    
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const markerX = (marker.x / 100) * rect.width;
    const markerY = (marker.y / 100) * rect.height;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    setDragOffset({
      x: clientX - rect.left - markerX,
      y: clientY - rect.top - markerY
    });
  }

  useEffect(() => {
    if (!draggedMarker || !imageContainerRef.current) return;

    function onDrag(e: MouseEvent | TouchEvent) {
      const rect = imageContainerRef.current!.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      
      let x = ((clientX - rect.left - dragOffset.x) / rect.width) * 100;
      let y = ((clientY - rect.top - dragOffset.y) / rect.height) * 100;
      
      x = Math.max(0, Math.min(100, x));
      y = Math.max(0, Math.min(100, y));
      
      setMarkers(markers.map(m => 
        m.id === draggedMarker ? { ...m, x, y } : m
      ));
    }

    function stopDragging() {
      setDraggedMarker(null);
    }

    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDragging);
    document.addEventListener('touchmove', onDrag, { passive: false });
    document.addEventListener('touchend', stopDragging);

    return () => {
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', stopDragging);
      document.removeEventListener('touchmove', onDrag);
      document.removeEventListener('touchend', stopDragging);
    };
  }, [draggedMarker, dragOffset, markers]);

  useEffect(() => {
    if (originalImage && edgeStrength !== undefined) {
      const img = new Image();
      img.onload = () => processImage(img);
      img.src = originalImage;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edgeStrength]);

  function exportImage() {
    const canvas = hiddenCanvasRef.current;
    if (!canvas) return;

    const exportCanvas = document.createElement('canvas');
    const expCtx = exportCanvas.getContext('2d');
    if (!expCtx) return;

    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height;
    expCtx.drawImage(canvas, 0, 0);

    // Draw markers
    markers.forEach(marker => {
      const x = (marker.x / 100) * exportCanvas.width;
      const y = (marker.y / 100) * exportCanvas.height;

      expCtx.beginPath();
      expCtx.arc(x, y, 18, 0, Math.PI * 2);
      expCtx.fillStyle = '#1a1a2e';
      expCtx.fill();
      expCtx.strokeStyle = '#e8d5b7';
      expCtx.lineWidth = 3;
      expCtx.stroke();

      expCtx.fillStyle = '#e8d5b7';
      expCtx.font = 'bold 16px Georgia, serif';
      expCtx.textAlign = 'center';
      expCtx.textBaseline = 'middle';
      expCtx.fillText(marker.number.toString(), x, y + 1);
    });

    // Draw legend
    if (markers.length > 0) {
      const lineHeight = 28;
      const legendPadding = 16;
      const legendHeight = markers.length * lineHeight + legendPadding * 2 + 30;
      const legendWidth = 220;
      const legendX = exportCanvas.width - legendWidth - 20;
      const legendY = 20;

      expCtx.fillStyle = 'rgba(26, 26, 46, 0.95)';
      expCtx.fillRect(legendX, legendY, legendWidth, legendHeight);
      expCtx.strokeStyle = '#e8d5b7';
      expCtx.lineWidth = 2;
      expCtx.strokeRect(legendX, legendY, legendWidth, legendHeight);

      expCtx.fillStyle = '#e8d5b7';
      expCtx.font = 'bold 16px Georgia, serif';
      expCtx.textAlign = 'left';
      expCtx.fillText('Legenda', legendX + legendPadding, legendY + 28);

      expCtx.font = '14px Georgia, serif';
      markers.forEach((marker, idx) => {
        const text = `${marker.number}. ${marker.name || 'Onbekend'}`;
        expCtx.fillText(text, legendX + legendPadding, legendY + 58 + idx * lineHeight);
      });
    }

    const link = document.createElement('a');
    link.download = exportFilename + '.png';
    link.href = exportCanvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setShowExportModal(false);
  }

  const hasImage = !!originalImage;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-amber-50 p-6">
      <canvas ref={hiddenCanvasRef} className="hidden" />
      <input 
        ref={fileInputRef} 
        type="file" 
        accept="image/*" 
        className="hidden"
        onChange={(e) => handleImageUpload(e.target.files?.[0] || null)}
      />

      <header className="text-center mb-8 pb-6 border-b border-amber-200/30">
        <h1 className="text-4xl font-normal tracking-wider uppercase mb-2">
          Foto Archief
        </h1>
        <p className="text-sm opacity-70 italic">
          Identificeer personen met genummerde annotaties
        </p>
      </header>

      <div className={`max-w-7xl mx-auto grid gap-6 ${hasImage ? 'md:grid-cols-[1fr_320px]' : 'grid-cols-1'}`}>
        {/* Main Panel */}
        <div className="bg-white/5 border border-amber-200/20 rounded p-5">
          {!hasImage ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-amber-200/40 rounded cursor-pointer hover:border-amber-200/70 hover:bg-white/5 transition-all"
            >
              <div className="text-6xl mb-4 opacity-50">📷</div>
              <span className="text-lg">Klik om een foto te uploaden</span>
              <span className="text-sm opacity-60 mt-2">of sleep een bestand hierheen</span>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
                <div className="flex gap-3">
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-white/10 text-amber-50 rounded border border-amber-200/30 hover:bg-white/20 text-sm"
                  >
                    Nieuwe foto
                  </button>
                  <button 
                    onClick={() => setShowOriginal(!showOriginal)}
                    className={`px-4 py-2 bg-white/10 text-amber-50 rounded border border-amber-200/30 hover:bg-white/20 text-sm ${showOriginal ? 'bg-white/20' : ''}`}
                  >
                    {showOriginal ? 'Toon outlines' : 'Toon origineel'}
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-sm opacity-80">Lijnsterkte:</label>
                  <input 
                    type="range" 
                    min="10" 
                    max="80" 
                    value={edgeStrength}
                    onChange={(e) => setEdgeStrength(parseInt(e.target.value))}
                    className="w-24 accent-amber-200"
                  />
                </div>
              </div>

              <div 
                ref={imageContainerRef}
                className="relative cursor-crosshair inline-block w-full"
                onClick={handleImageClick}
              >
                <img 
                  ref={displayImageRef}
                  src={showOriginal ? originalImage : outlineImage || ''} 
                  alt="Foto"
                  className="w-full block rounded"
                />
                <div className="absolute inset-0">
                  {markers.map(marker => (
                    <div
                      key={marker.id}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900 text-amber-50 border-2 border-amber-200 flex items-center justify-center font-bold text-sm cursor-grab active:cursor-grabbing shadow-lg select-none transition-all ${
                        selectedMarker === marker.id ? 'bg-amber-200 text-slate-900' : ''
                      }`}
                      style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMarker(marker.id);
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        startDragging(marker, e);
                      }}
                      onTouchStart={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        startDragging(marker, e);
                      }}
                    >
                      {marker.number}
                      <span 
                        className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-600 text-white text-sm leading-5 text-center opacity-0 hover:opacity-100 transition-opacity border-2 border-slate-900 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteMarker(marker.id);
                        }}
                      >
                        ×
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-sm opacity-60 mt-3 text-center italic">
                Klik om nummer te plaatsen • Sleep om te verplaatsen • Hover voor verwijderen
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        {hasImage && (
          <div className="bg-white/5 border border-amber-200/20 rounded p-5">
            <h2 className="text-xl font-normal mb-5 pb-3 border-b border-amber-200/20 tracking-wide">
              Namenlijst
            </h2>
            {markers.length === 0 ? (
              <p className="opacity-50 italic text-center py-10">Nog geen personen gemarkeerd</p>
            ) : (
              <>
                <div className="flex flex-col gap-3 mb-5">
                  {markers.map(marker => (
                    <div
                      key={marker.id}
                      className={`flex items-center gap-3 p-3 bg-white/5 rounded border ${
                        selectedMarker === marker.id 
                          ? 'bg-amber-200/15 border-amber-200/40' 
                          : 'border-transparent'
                      }`}
                    >
                      <span className="w-7 h-7 rounded-full bg-slate-900 border-2 border-amber-200 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {marker.number}
                      </span>
                      <input
                        type="text"
                        value={marker.name}
                        onChange={(e) => updateMarkerName(marker.id, e.target.value)}
                        onFocus={() => setSelectedMarker(marker.id)}
                        placeholder="Naam invoeren..."
                        className="flex-1 bg-white/5 border border-amber-200/20 rounded px-3 py-2 text-amber-50 text-sm focus:outline-none focus:border-amber-200/50"
                      />
                      <button
                        onClick={() => deleteMarker(marker.id)}
                        className="bg-transparent border-none text-amber-50 opacity-50 hover:opacity-100 cursor-pointer p-1 text-xl leading-none"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setShowExportModal(true)}
                  className="w-full py-3 px-6 bg-gradient-to-r from-amber-200 to-amber-300 text-slate-900 font-bold rounded border-none uppercase tracking-wide hover:brightness-110"
                >
                  📥 Exporteren
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div 
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setShowExportModal(false)}
        >
          <div 
            className="bg-gradient-to-br from-slate-900 to-slate-800 border border-amber-200/30 rounded-lg p-8 min-w-[360px] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-normal mb-6 tracking-wide">Exporteren als PNG</h3>
            <label className="block text-sm mb-2 opacity-80">Bestandsnaam</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={exportFilename}
                onChange={(e) => setExportFilename(e.target.value)}
                className="flex-1 bg-white/5 border border-amber-200/30 rounded px-4 py-3 text-amber-50 text-base focus:outline-none focus:border-amber-200/50"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && exportFilename.trim()) {
                    exportImage();
                  }
                }}
              />
              <span className="opacity-60">.png</span>
            </div>
            <div className="flex gap-3 mt-7 justify-end">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 bg-white/10 text-amber-50 rounded border border-amber-200/30 hover:bg-white/20"
              >
                Annuleren
              </button>
              <button
                onClick={exportImage}
                className="px-4 py-2 bg-gradient-to-r from-amber-200 to-amber-300 text-slate-900 font-bold rounded border-none uppercase tracking-wide hover:brightness-110"
              >
                Downloaden
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
