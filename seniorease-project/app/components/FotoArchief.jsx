"use client";

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';

export default function FotoArchief() {
  const [originalImage, setOriginalImage] = useState(null);
  const [outlineImage, setOutlineImage] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [edgeStrength, setEdgeStrength] = useState(30);
  const [showOriginal, setShowOriginal] = useState(true);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFilename, setExportFilename] = useState('foto-met-nummers');
  const [draggedMarker, setDraggedMarker] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  const canvasRef = useRef(null);
  const imageContainerRef = useRef(null);

  // Sobel edge detection
  const applyEdgeDetection = useCallback((imageData, threshold) => {
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
      for (let x = 0; x < width; x++) {
        if (x === 0 || x === width - 1) {
          const idx = (y * width + x) * 4;
          output[idx] = output[idx + 1] = output[idx + 2] = 255;
          output[idx + 3] = 255;
          continue;
        }
        
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

    // Handle top and bottom borders
    for (let x = 0; x < width; x++) {
      const topIdx = x * 4;
      const bottomIdx = ((height - 1) * width + x) * 4;
      output[topIdx] = output[topIdx + 1] = output[topIdx + 2] = 255;
      output[topIdx + 3] = 255;
      output[bottomIdx] = output[bottomIdx + 1] = output[bottomIdx + 2] = 255;
      output[bottomIdx + 3] = 255;
    }

    return new ImageData(output, width, height);
  }, []);

  const processImage = useCallback((img) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const maxSize = 800;
    let { width, height } = img;
    if (width > maxSize || height > maxSize) {
      const ratio = Math.min(maxSize / width, maxSize / height);
      width = Math.floor(width * ratio);
      height = Math.floor(height * ratio);
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);

    const imageData = ctx.getImageData(0, 0, width, height);
    const edgeData = applyEdgeDetection(imageData, edgeStrength);
    ctx.putImageData(edgeData, 0, 0);

    setOutlineImage(canvas.toDataURL());
  }, [applyEdgeDetection, edgeStrength]);

  useEffect(() => {
    if (originalImage) {
      const img = new Image();
      img.onload = () => processImage(img);
      img.src = originalImage;
    }
  }, [originalImage, edgeStrength, processImage]);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setOriginalImage(event.target.result);
        setMarkers([]);
        setSelectedMarker(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCanvasClick = (e) => {
    if (!outlineImage || draggedMarker) return;

    const rect = imageContainerRef.current?.getBoundingClientRect();
    if (!rect) return;

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
  };

  const updateMarkerName = (id, name) => {
    setMarkers(markers.map(m => m.id === id ? { ...m, name } : m));
  };

  const deleteMarker = (id) => {
    const filtered = markers.filter(m => m.id !== id);
    const renumbered = filtered.map((m, idx) => ({ ...m, number: idx + 1 }));
    setMarkers(renumbered);
    if (selectedMarker === id) setSelectedMarker(null);
  };

  // Drag handlers
  const handleMarkerMouseDown = (e, marker) => {
    e.preventDefault();
    e.stopPropagation();
    
    const rect = imageContainerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const markerX = (marker.x / 100) * rect.width;
    const markerY = (marker.y / 100) * rect.height;

    setDragOffset({
      x: e.clientX - rect.left - markerX,
      y: e.clientY - rect.top - markerY
    });
    setDraggedMarker(marker.id);
    setSelectedMarker(marker.id);
  };

  useEffect(() => {
    if (!draggedMarker) return;

    const handleMouseMove = (e) => {
      const rect = imageContainerRef.current?.getBoundingClientRect();
      if (!rect) return;

      let x = ((e.clientX - rect.left - dragOffset.x) / rect.width) * 100;
      let y = ((e.clientY - rect.top - dragOffset.y) / rect.height) * 100;

      x = Math.max(0, Math.min(100, x));
      y = Math.max(0, Math.min(100, y));

      setMarkers(prev => prev.map(m => 
        m.id === draggedMarker ? { ...m, x, y } : m
      ));
    };

    const handleMouseUp = () => {
      setDraggedMarker(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggedMarker, dragOffset]);

  const exportImage = async () => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const sourceCanvas = canvasRef.current;
      
      if (!sourceCanvas) return;

      canvas.width = sourceCanvas.width;
      canvas.height = sourceCanvas.height;
      ctx.drawImage(sourceCanvas, 0, 0);

      markers.forEach(marker => {
        const x = (marker.x / 100) * canvas.width;
        const y = (marker.y / 100) * canvas.height;

        ctx.beginPath();
        ctx.arc(x, y, 18, 0, Math.PI * 2);
        ctx.fillStyle = '#1a1a2e';
        ctx.fill();
        ctx.strokeStyle = '#e8d5b7';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = '#e8d5b7';
        ctx.font = 'bold 16px Georgia, serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(marker.number.toString(), x, y + 1);
      });

      if (markers.length > 0) {
        const lineHeight = 28;
        const legendPadding = 16;
        const legendHeight = markers.length * lineHeight + legendPadding * 2 + 30;
        const legendWidth = 220;
        const legendX = canvas.width - legendWidth - 20;
        const legendY = 20;

        ctx.fillStyle = 'rgba(26, 26, 46, 0.95)';
        ctx.fillRect(legendX, legendY, legendWidth, legendHeight);
        ctx.strokeStyle = '#e8d5b7';
        ctx.lineWidth = 2;
        ctx.strokeRect(legendX, legendY, legendWidth, legendHeight);

        ctx.fillStyle = '#e8d5b7';
        ctx.font = 'bold 16px Georgia, serif';
        ctx.textAlign = 'left';
        ctx.fillText('Legenda', legendX + legendPadding, legendY + 28);

        ctx.font = '14px Georgia, serif';
        markers.forEach((marker, idx) => {
          const text = `${marker.number}. ${marker.name || 'Onbekend'}`;
          ctx.fillText(text, legendX + legendPadding, legendY + 58 + idx * lineHeight);
        });
      }

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${exportFilename}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setShowExportModal(false);
    } catch (error) {
      console.error('Export error:', error);
      alert('Er ging iets mis bij het exporteren.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      fontFamily: "'Georgia', 'Times New Roman', serif",
      color: '#e8d5b7',
      padding: '24px'
    }}>
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* Terug link */}
      <div style={{ marginBottom: '16px', maxWidth: '1200px', margin: '0 auto 16px auto' }}>
        <Link 
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#e8d5b7',
            textDecoration: 'none',
            fontSize: '0.95rem',
            opacity: 0.8,
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
        >
          <span>←</span>
          <span>Terug naar home</span>
        </Link>
      </div>

      {/* Controls: alleen boven de titel, niet nog eens bij de afbeelding */}
      {outlineImage && (
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto 16px auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <label style={{
              background: 'rgba(232, 213, 183, 0.1)',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              border: '1px solid rgba(232, 213, 183, 0.3)',
              transition: 'all 0.2s'
            }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              Nieuwe foto
            </label>
            <button
              onClick={() => setShowOriginal(!showOriginal)}
              style={{
                background: showOriginal ? 'rgba(232, 213, 183, 0.2)' : 'transparent',
                color: '#e8d5b7',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                border: '1px solid rgba(232, 213, 183, 0.3)'
              }}
            >
              {showOriginal ? 'Toon outlines' : 'Toon origineel'}
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <label style={{ fontSize: '0.85rem', opacity: 0.8 }}>Lijnsterkte:</label>
            <input
              type="range"
              min="10"
              max="80"
              value={edgeStrength}
              onChange={(e) => setEdgeStrength(Number(e.target.value))}
              style={{ width: '100px', accentColor: '#e8d5b7' }}
            />
          </div>
        </div>
      )}

      {/* Header */}
      <header style={{
        textAlign: 'center',
        marginBottom: '32px',
        borderBottom: '1px solid rgba(232, 213, 183, 0.3)',
        paddingBottom: '24px'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'normal',
          letterSpacing: '0.1em',
          margin: 0,
          textTransform: 'uppercase'
        }}>
          Foto Archief
        </h1>
        <p style={{
          fontSize: '0.9rem',
          opacity: 0.7,
          marginTop: '8px',
          fontStyle: 'italic'
        }}>
          Identificeer personen met genummerde annotaties
        </p>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: outlineImage ? '1fr 320px' : '1fr',
        gap: '24px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Main Image Area */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(232, 213, 183, 0.2)',
          borderRadius: '4px',
          padding: '20px'
        }}>
          {!outlineImage ? (
            <label style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '400px',
              border: '2px dashed rgba(232, 213, 183, 0.4)',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              <div style={{ fontSize: '4rem', marginBottom: '16px', opacity: 0.5 }}>📷</div>
              <span style={{ fontSize: '1.1rem' }}>Klik om een foto te uploaden</span>
              <span style={{ fontSize: '0.85rem', opacity: 0.6, marginTop: '8px' }}>
                of sleep een bestand hierheen
              </span>
            </label>
          ) : (
            <>
              <div
                ref={imageContainerRef}
                onClick={handleCanvasClick}
                style={{
                  position: 'relative',
                  cursor: 'crosshair',
                  display: 'inline-block',
                  width: '100%',
                  userSelect: 'none'
                }}
              >
                <img
                  src={showOriginal ? originalImage : outlineImage}
                  alt="Foto"
                  style={{
                    width: '100%',
                    display: 'block',
                    borderRadius: '2px',
                    pointerEvents: 'none'
                  }}
                  draggable={false}
                />

                {/* Markers */}
                {markers.map(marker => (
                  <div
                    key={marker.id}
                    onMouseDown={(e) => handleMarkerMouseDown(e, marker)}
                    style={{
                      position: 'absolute',
                      left: `${marker.x}%`,
                      top: `${marker.y}%`,
                      transform: 'translate(-50%, -50%)',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: selectedMarker === marker.id ? '#e8d5b7' : '#1a1a2e',
                      color: selectedMarker === marker.id ? '#1a1a2e' : '#e8d5b7',
                      border: '2px solid #e8d5b7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                      cursor: draggedMarker === marker.id ? 'grabbing' : 'grab',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                      transition: draggedMarker === marker.id ? 'none' : 'background 0.2s, color 0.2s',
                      userSelect: 'none',
                      zIndex: draggedMarker === marker.id ? 100 : 1
                    }}
                  >
                    {marker.number}
                    
                    {/* Delete button */}
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteMarker(marker.id);
                      }}
                      style={{
                        position: 'absolute',
                        top: '-8px',
                        right: '-8px',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: '#c0392b',
                        color: 'white',
                        fontSize: '14px',
                        lineHeight: '18px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        border: '2px solid #1a1a2e',
                        opacity: selectedMarker === marker.id ? 1 : 0,
                        transition: 'opacity 0.2s'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.background = '#e74c3c'}
                      onMouseOut={(e) => e.currentTarget.style.background = '#c0392b'}
                    >
                      ×
                    </span>
                  </div>
                ))}
              </div>

              <p style={{
                fontSize: '0.85rem',
                opacity: 0.6,
                marginTop: '12px',
                textAlign: 'center',
                fontStyle: 'italic'
              }}>
                Klik om nummer te plaatsen • Sleep om te verplaatsen • Klik voor verwijder-knop
              </p>
            </>
          )}
        </div>

        {/* Sidebar */}
        {outlineImage && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(232, 213, 183, 0.2)',
            borderRadius: '4px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h2 style={{
              fontSize: '1.2rem',
              fontWeight: 'normal',
              marginBottom: '20px',
              paddingBottom: '12px',
              borderBottom: '1px solid rgba(232, 213, 183, 0.2)',
              letterSpacing: '0.05em'
            }}>
              Namenlijst
            </h2>

            {markers.length === 0 ? (
              <p style={{
                opacity: 0.5,
                fontStyle: 'italic',
                textAlign: 'center',
                padding: '40px 0'
              }}>
                Nog geen personen gemarkeerd
              </p>
            ) : (
              <div style={{
                flex: 1,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                {markers.map(marker => (
                  <div
                    key={marker.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      background: selectedMarker === marker.id
                        ? 'rgba(232, 213, 183, 0.15)'
                        : 'rgba(255, 255, 255, 0.02)',
                      borderRadius: '4px',
                      border: selectedMarker === marker.id
                        ? '1px solid rgba(232, 213, 183, 0.4)'
                        : '1px solid transparent'
                    }}
                  >
                    <span style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: '#1a1a2e',
                      border: '2px solid #e8d5b7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.85rem',
                      fontWeight: 'bold',
                      flexShrink: 0
                    }}>
                      {marker.number}
                    </span>

                    <input
                      type="text"
                      value={marker.name}
                      onChange={(e) => updateMarkerName(marker.id, e.target.value)}
                      onFocus={() => setSelectedMarker(marker.id)}
                      placeholder="Naam invoeren..."
                      style={{
                        flex: 1,
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(232, 213, 183, 0.2)',
                        borderRadius: '4px',
                        padding: '8px 12px',
                        color: '#e8d5b7',
                        fontFamily: 'inherit',
                        fontSize: '0.9rem'
                      }}
                    />

                    <button
                      onClick={() => deleteMarker(marker.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#e8d5b7',
                        opacity: 0.5,
                        cursor: 'pointer',
                        padding: '4px',
                        fontSize: '1.2rem',
                        lineHeight: 1
                      }}
                      title="Verwijderen"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {markers.length > 0 && (
              <button
                onClick={() => setShowExportModal(true)}
                style={{
                  marginTop: '20px',
                  background: 'linear-gradient(135deg, #e8d5b7 0%, #d4c4a8 100%)',
                  color: '#1a1a2e',
                  border: 'none',
                  padding: '14px 24px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  letterSpacing: '0.05em',
                  transition: 'all 0.2s ease',
                  textTransform: 'uppercase'
                }}
              >
                📥 Exporteren
              </button>
            )}
          </div>
        )}
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={() => setShowExportModal(false)}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
              border: '1px solid rgba(232, 213, 183, 0.3)',
              borderRadius: '8px',
              padding: '32px',
              minWidth: '360px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{
              margin: '0 0 24px 0',
              fontSize: '1.3rem',
              fontWeight: 'normal',
              letterSpacing: '0.05em'
            }}>
              Exporteren als PNG
            </h3>

            <label style={{
              display: 'block',
              fontSize: '0.9rem',
              marginBottom: '8px',
              opacity: 0.8
            }}>
              Bestandsnaam
            </label>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="text"
                value={exportFilename}
                onChange={(e) => setExportFilename(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && exportFilename.trim() && exportImage()}
                autoFocus
                style={{
                  flex: 1,
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(232, 213, 183, 0.3)',
                  borderRadius: '4px',
                  padding: '12px 16px',
                  color: '#e8d5b7',
                  fontFamily: 'inherit',
                  fontSize: '1rem'
                }}
              />
              <span style={{ opacity: 0.6 }}>.png</span>
            </div>

            <div style={{
              display: 'flex',
              gap: '12px',
              marginTop: '28px',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => setShowExportModal(false)}
                style={{
                  background: 'transparent',
                  color: '#e8d5b7',
                  border: '1px solid rgba(232, 213, 183, 0.3)',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: '0.95rem'
                }}
              >
                Annuleren
              </button>
              <button
                onClick={exportImage}
                disabled={!exportFilename.trim()}
                style={{
                  background: exportFilename.trim()
                    ? 'linear-gradient(135deg, #e8d5b7 0%, #d4c4a8 100%)'
                    : 'rgba(232, 213, 183, 0.3)',
                  color: '#1a1a2e',
                  border: 'none',
                  padding: '10px 24px',
                  borderRadius: '4px',
                  cursor: exportFilename.trim() ? 'pointer' : 'not-allowed',
                  fontFamily: 'inherit',
                  fontSize: '0.95rem',
                  fontWeight: 'bold'
                }}
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
