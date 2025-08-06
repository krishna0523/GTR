import { useEffect, useRef } from 'react';

interface Cable {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
  baseAmplitude: number;
  frequency: number;
  phase: number;
}

const WaveCableBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const scrollProgressRef = useRef(0);

  const cables: Cable[] = [
    {
      id: 1,
      startX: 0.1,
      startY: 0.2,
      endX: 0.9,
      endY: 0.3,
      color: '#00bfff',
      baseAmplitude: 30,
      frequency: 0.01,
      phase: 0
    },
    {
      id: 2,
      startX: 0.0,
      startY: 0.5,
      endX: 0.8,
      endY: 0.4,
      color: '#9d4edd',
      baseAmplitude: 25,
      frequency: 0.015,
      phase: Math.PI / 3
    },
    {
      id: 3,
      startX: 0.2,
      startY: 0.1,
      endX: 1.0,
      endY: 0.6,
      color: '#00ff88',
      baseAmplitude: 35,
      frequency: 0.008,
      phase: Math.PI / 2
    },
    {
      id: 4,
      startX: 0.0,
      startY: 0.8,
      endX: 0.7,
      endY: 0.7,
      color: '#ff6b6b',
      baseAmplitude: 20,
      frequency: 0.012,
      phase: Math.PI
    },
    {
      id: 5,
      startX: 0.3,
      startY: 0.0,
      endX: 0.6,
      endY: 1.0,
      color: '#ffd93d',
      baseAmplitude: 40,
      frequency: 0.006,
      phase: Math.PI * 1.5
    },
    {
      id: 6,
      startX: 0.8,
      startY: 0.1,
      endX: 1.0,
      endY: 0.9,
      color: '#6bcf7f',
      baseAmplitude: 28,
      frequency: 0.014,
      phase: Math.PI / 4
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgressRef.current = Math.min(scrollTop / documentHeight, 1);
    };

    // Throttled scroll handler for better performance
    let ticking = false;
    const throttledScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    const drawWavyCable = (cable: Cable, time: number) => {
      const { startX, startY, endX, endY, color, baseAmplitude, frequency, phase } = cable;
      
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      
      const actualStartX = startX * canvasWidth;
      const actualStartY = startY * canvasHeight;
      const actualEndX = endX * canvasWidth;
      const actualEndY = endY * canvasHeight;
      
      // Calculate cable length and direction
      const dx = actualEndX - actualStartX;
      const dy = actualEndY - actualStartY;
      const length = Math.sqrt(dx * dx + dy * dy);
      
      // Wave amplitude affected by scroll
      const scrollAmplitude = baseAmplitude * (1 + scrollProgressRef.current * 2);
      
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
      
      // Create wavy path
      const segments = 50;
      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        
        // Base position along straight line
        const baseX = actualStartX + dx * t;
        const baseY = actualStartY + dy * t;
        
        // Wave offset perpendicular to cable direction
        const waveOffset = Math.sin(t * Math.PI * 4 + time * frequency + phase + scrollProgressRef.current * Math.PI * 2) * scrollAmplitude;
        
        // Perpendicular direction (rotated 90 degrees)
        const perpX = -dy / length;
        const perpY = dx / length;
        
        const finalX = baseX + perpX * waveOffset;
        const finalY = baseY + perpY * waveOffset;
        
        if (i === 0) {
          ctx.moveTo(finalX, finalY);
        } else {
          ctx.lineTo(finalX, finalY);
        }
      }
      
      ctx.stroke();
      
      // Reset shadow for next cable
      ctx.shadowBlur = 0;
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw all wavy cables
      cables.forEach(cable => {
        drawWavyCable(cable, time);
      });
      
      // Add connection points with glow
      cables.forEach(cable => {
        const startX = cable.startX * canvas.width;
        const startY = cable.startY * canvas.height;
        const endX = cable.endX * canvas.width;
        const endY = cable.endY * canvas.height;
        
        // Pulsing connection points
        const pulseSize = 3 + Math.sin(time * 0.002 + cable.phase) * 2;
        
        ctx.beginPath();
        ctx.fillStyle = cable.color;
        ctx.shadowColor = cable.color;
        ctx.shadowBlur = 15;
        ctx.arc(startX, startY, pulseSize, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(endX, endY, pulseSize, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 0;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    animate(0);

    // Event listeners
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', throttledScrollHandler, { passive: true });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', throttledScrollHandler);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)' }}
    />
  );
};

export default WaveCableBackground;