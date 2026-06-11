import "../App.css";
import { useState, useRef } from "react";

type Props = {
  imageUrl: string | null;
};

const ImageViewer = ({ imageUrl }: Props) => {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement | null>(null);

  if (!imageUrl) {
    return <p>No Image Selected</p>;
  }

  function zoomAtPoint(nextZoom: number, clientX: number, clientY: number) {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();

    // mouse position relative to container
    const mx = clientX - rect.left;
    const my = clientY - rect.top;

    setPosition((prev) => {
      const scaleRatio = nextZoom / zoom;

      return {
        x: mx - scaleRatio * (mx - prev.x),
        y: my - scaleRatio * (my - prev.y),
      };
    });

    setZoom(nextZoom);
  }

  function zoomIn(e?: React.MouseEvent) {
    const next = Math.min(5, zoom + 0.2);
    if (e) zoomAtPoint(next, e.clientX, e.clientY);
    else setZoom(next);
  }

  function zoomOut(e?: React.MouseEvent) {
    const next = Math.max(0.2, zoom - 0.2);
    if (e) zoomAtPoint(next, e.clientX, e.clientY);
    else setZoom(next);
  }

  function resetView() {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }

  function handleMouseDown(e: React.MouseEvent) {
    setIsDragging(true);

    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!isDragging) return;

    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  }

  function handleMouseUp() {
    setIsDragging(false);
  }

  function handleWheel(e: React.WheelEvent) {
    e.preventDefault();

    const nextZoom = zoom + (e.deltaY < 0 ? 0.1 : -0.1);
    const clamped = Math.min(5, Math.max(0.2, nextZoom));
    zoomAtPoint(clamped, e.clientX, e.clientY);
  }

  return (
    <div>
      <div>
        <button onClick={() => zoomIn()}>Zoom In</button>
        <button onClick={() => zoomOut()}>Zoom Out</button>
        <button onClick={resetView}>Reset</button>
      </div>

      <div
        ref={containerRef}
        className="preview-container"
        onWheel={handleWheel}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          width: "800px",
          height: "500px",
          overflow: "hidden",
          border: "1px solid #ccc",
          position: "relative",
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        <img
          src={imageUrl}
          alt="Preview"
          draggable={false}
          onMouseDown={handleMouseDown}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
            transformOrigin: "0 0",
            userSelect: "none",
          }}
        />
      </div>
    </div>
  );
};

export default ImageViewer;