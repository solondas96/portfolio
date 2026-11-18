import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Packet {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  speed: number;
  progress: number;
  axis: 'x' | 'y';
  color: string;
}

export default function DataFlowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight);

    const gridSize = 48;
    const isDark = theme === 'dark';

    // Packet pool
    const packets: Packet[] = [];
    const maxPackets = 18;

    const createPacket = (): Packet => {
      const col = Math.floor(Math.random() * (width / gridSize)) * gridSize;
      const row = Math.floor(Math.random() * (height / gridSize)) * gridSize;
      const axis = Math.random() > 0.5 ? 'x' : 'y';
      const distance = (Math.floor(Math.random() * 4) + 2) * gridSize;
      const direction = Math.random() > 0.5 ? 1 : -1;

      return {
        x: col,
        y: row,
        targetX: axis === 'x' ? col + distance * direction : col,
        targetY: axis === 'y' ? row + distance * direction : row,
        speed: 0.008 + Math.random() * 0.012,
        progress: 0,
        axis,
        color: Math.random() > 0.75 ? '#e34f3c' : (isDark ? 'rgba(244, 240, 232, 0.45)' : 'rgba(21, 21, 20, 0.35)'),
      };
    };

    for (let i = 0; i < maxPackets; i++) {
      packets.push(createPacket());
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const parent = canvas.parentElement;
    parent?.addEventListener('mousemove', handleMouseMove);
    parent?.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render subtle nodes at grid intersections near mouse
      if (mouseX > 0 && mouseY > 0) {
        const radius = 180;
        const startCol = Math.max(0, Math.floor((mouseX - radius) / gridSize));
        const endCol = Math.min(Math.ceil((mouseX + radius) / gridSize), Math.floor(width / gridSize));
        const startRow = Math.max(0, Math.floor((mouseY - radius) / gridSize));
        const endRow = Math.min(Math.ceil((mouseY + radius) / gridSize), Math.floor(height / gridSize));

        for (let c = startCol; c <= endCol; c++) {
          for (let r = startRow; r <= endRow; r++) {
            const nx = c * gridSize;
            const ny = r * gridSize;
            const dist = Math.hypot(nx - mouseX, ny - mouseY);
            if (dist < radius) {
              const alpha = (1 - dist / radius) * 0.18;
              ctx.fillStyle = isDark ? `rgba(244, 240, 232, ${alpha})` : `rgba(21, 21, 20, ${alpha})`;
              ctx.beginPath();
              ctx.arc(nx, ny, 2.5, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      // Update and draw packets
      for (let i = 0; i < packets.length; i++) {
        const p = packets[i];
        p.progress += p.speed;

        if (p.progress >= 1) {
          packets[i] = createPacket();
          continue;
        }

        const currX = p.x + (p.targetX - p.x) * p.progress;
        const currY = p.y + (p.targetY - p.y) * p.progress;

        // Draw data packet head and tail trail
        const trailLength = 16;
        const tailX = p.axis === 'x' ? currX - (p.targetX > p.x ? trailLength : -trailLength) : currX;
        const tailY = p.axis === 'y' ? currY - (p.targetY > p.y ? trailLength : -trailLength) : currY;

        const grad = ctx.createLinearGradient(tailX, tailY, currX, currY);
        grad.addColorStop(0, 'rgba(227, 79, 60, 0)');
        grad.addColorStop(1, p.color);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(currX, currY);
        ctx.stroke();

        // Packet head pulse
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(currX, currY, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      parent?.removeEventListener('mousemove', handleMouseMove);
      parent?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-60 dark:opacity-50"
    />
  );
}
