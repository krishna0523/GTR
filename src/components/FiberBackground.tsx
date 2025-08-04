import { useEffect, useRef, useState } from 'react';

interface FiberLine {
  id: string;
  points: { x: number; y: number; z: number }[];
  color: string;
  opacity: number;
  pulse: number;
  speed: number;
  visible: boolean;
}


const FiberBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const animationRef = useRef<number>();
  const lastFrameTime = useRef(0);

  // Generate fiber optic lines with irregular, organic paths
  const [fiberLines] = useState<FiberLine[]>(() => {
    const lines: FiberLine[] = [];
    const colors = ['#00bfff', '#ffffff', '#ffaa33', '#00ff88', '#ff6b6b'];
    
    for (let i = 0; i < 15; i++) {
      const points: { x: number; y: number; z: number }[] = [];
      let x = -100; // Start from far left off-screen
      let y = -50 + Math.random() * 100; // Random vertical position across full height
      let z = -20 + Math.random() * 40;
      
      // Create cables that span the full screen width
      const totalSegments = 25 + Math.random() * 10; // More segments for full screen
      const segmentWidth = 250 / totalSegments; // Span from -100 to +150 (250 units total)
      
      for (let j = 0; j < totalSegments; j++) {
        points.push({ x, y, z });
        
        // Move horizontally across screen with organic curves
        x += segmentWidth;
        y += (Math.sin(j * 0.2) + Math.random() - 0.5) * 1.5;
        z += (Math.cos(j * 0.15) + Math.random() - 0.5) * 1;
      }
      
      lines.push({
        id: `fiber_${i}`,
        points,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 0.3 + Math.random() * 0.7,
        pulse: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 1.5,
        visible: false
      });
    }
    
    return lines;
  });

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.pageYOffset;
          const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = Math.min(scrollTop / documentHeight, 1);
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size and handle high DPI
    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      
      ctx.scale(dpr, dpr);
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 3D projection helper
    const project3D = (x: number, y: number, z: number) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const scale = 8;
      const perspective = 500;
      
      // Simple perspective projection
      const projectedX = centerX + (x * scale * perspective) / (perspective + z);
      const projectedY = centerY + (y * scale * perspective) / (perspective + z);
      
      return { x: projectedX, y: projectedY, depth: z };
    };

    // Draw fiber optic line with glow effect
    const drawFiberLine = (line: FiberLine, time: number) => {
      if (!line.visible || line.points.length < 2) return;

      ctx.save();
      
      // Pulse effect
      const pulse = 0.3 + 0.7 * Math.sin(time * line.speed + line.pulse);
      ctx.globalAlpha = line.opacity * pulse;

      // Create gradient along the line
      const startProj = project3D(line.points[0].x, line.points[0].y, line.points[0].z);
      const endProj = project3D(
        line.points[line.points.length - 1].x,
        line.points[line.points.length - 1].y,
        line.points[line.points.length - 1].z
      );

      const gradient = ctx.createLinearGradient(
        startProj.x, startProj.y, endProj.x, endProj.y
      );
      gradient.addColorStop(0, line.color + '00');
      gradient.addColorStop(0.2, line.color + 'FF');
      gradient.addColorStop(0.8, line.color + 'FF');
      gradient.addColorStop(1, line.color + '00');

      // Draw main fiber line
      ctx.beginPath();
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2 + pulse;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      let first = true;
      for (const point of line.points) {
        const proj = project3D(point.x, point.y, point.z);
        if (first) {
          ctx.moveTo(proj.x, proj.y);
          first = false;
        } else {
          ctx.lineTo(proj.x, proj.y);
        }
      }
      ctx.stroke();

      // Draw glow effect
      ctx.globalCompositeOperation = 'screen';
      ctx.beginPath();
      ctx.strokeStyle = line.color + '40';
      ctx.lineWidth = 6 + pulse * 2;
      first = true;
      for (const point of line.points) {
        const proj = project3D(point.x, point.y, point.z);
        if (first) {
          ctx.moveTo(proj.x, proj.y);
          first = false;
        } else {
          ctx.lineTo(proj.x, proj.y);
        }
      }
      ctx.stroke();
      ctx.globalCompositeOperation = 'source-over';

      ctx.restore();
    };


    // Animation loop with frame rate control
    const animate = (currentTime: number) => {
      // Frame rate control - limit to ~30fps for better performance
      if (currentTime - lastFrameTime.current < 33) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime.current = currentTime;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Simple dark background
      ctx.fillStyle = '#000008';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      const time = currentTime * 0.001;

      // Update line visibility based on scroll progress (fewer lines)
      const visibleCount = Math.floor(scrollProgress * fiberLines.length) + 3;
      fiberLines.forEach((line, index) => {
        line.visible = index < visibleCount;
      });

      // Draw fiber lines only
      fiberLines.forEach(line => {
        if (line.visible) {
          drawFiberLine(line, time);
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [scrollProgress, fiberLines]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ 
          background: 'linear-gradient(135deg, #000010 0%, #001020 50%, #000000 100%)'
        }}
      />
      
      {/* Fiber Optic Legend */}
      <div className="absolute bottom-6 right-6 z-10 pointer-events-auto">
        <div className="glass-card">
          <h4 className="text-white font-semibold mb-3">Fiber Network</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-blue-400 rounded glow-blue"></div>
              <span className="text-xs text-white/80">Data Transmission</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-white rounded glow-white"></div>
              <span className="text-xs text-white/80">Signal Processing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-orange-400 rounded glow-orange"></div>
              <span className="text-xs text-white/80">Network Backbone</span>
            </div>
          </div>
          <div className="mt-3 text-xs text-white/50">
            Network Status: Active
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiberBackground;