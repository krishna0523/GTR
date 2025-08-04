import { useEffect, useRef, useState } from 'react';

interface Pipe {
  id: string;
  x1: number;
  y1: number;
  z1: number;
  x2: number;
  y2: number;
  z2: number;
  radius: number;
  type: 'water' | 'gas' | 'fiber' | 'electric';
  flowRate: number;
  color: string;
  metallic: boolean;
}

interface FlowParticle {
  id: string;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  pipeId: string;
  progress: number;
}

const Advanced3DPipeGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [particles, setParticles] = useState<FlowParticle[]>([]);
  const [constructionProgress, setConstructionProgress] = useState(0);
  const animationRef = useRef<number>();

  // Simplified and centered pipe network for clear visibility
  const pipeNetwork: Pipe[] = [
    // Main water distribution lines (centered and shorter for better visibility)
    { id: 'w1', x1: -15, y1: 0, z1: 0, x2: 15, y2: 0, z2: 0, radius: 3, type: 'water', flowRate: 2, color: '#4A90E2', metallic: true },
    { id: 'w2', x1: 0, y1: 0, z1: -15, x2: 0, y2: 0, z2: 15, radius: 2.5, type: 'water', flowRate: 1.5, color: '#4A90E2', metallic: true },
    
    // Gas pipeline network
    { id: 'g1', x1: -12, y1: -3, z1: -12, x2: 12, y2: -3, z2: 12, radius: 2.5, type: 'gas', flowRate: 3, color: '#F39C12', metallic: true },
    { id: 'g2', x1: -12, y1: -3, z1: 12, x2: 12, y2: -3, z2: -12, radius: 2, type: 'gas', flowRate: 2.5, color: '#F39C12', metallic: true },
    
    // Fiber optic cables (aerial)
    { id: 'f1', x1: -18, y1: 8, z1: -3, x2: 18, y2: 8, z2: 3, radius: 1.5, type: 'fiber', flowRate: 5, color: '#00D4AA', metallic: false },
    { id: 'f2', x1: -3, y1: 10, z1: 18, x2: 3, y2: 10, z2: -18, radius: 1.2, type: 'fiber', flowRate: 4, color: '#00D4AA', metallic: false },
    
    // Electrical conduits
    { id: 'e1', x1: -8, y1: 4, z1: -8, x2: 8, y2: 4, z2: 8, radius: 2, type: 'electric', flowRate: 8, color: '#E74C3C', metallic: true },
    
    // Central junction (more prominent)
    { id: 'j1', x1: 0, y1: -3, z1: 0, x2: 0, y2: 8, z2: 0, radius: 4, type: 'water', flowRate: 0, color: '#7F8C8D', metallic: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / documentHeight, 1);
      setScrollProgress(progress);
      setConstructionProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate flowing particles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles: FlowParticle[] = [];
      
      pipeNetwork.forEach(pipe => {
        if (Math.random() < 0.3 && pipe.flowRate > 0) { // 30% chance per frame for more particles
          const particle: FlowParticle = {
            id: `${pipe.id}_${Date.now()}_${Math.random()}`,
            x: pipe.x1,
            y: pipe.y1,
            z: pipe.z1,
            vx: (pipe.x2 - pipe.x1) * 0.015 * pipe.flowRate,
            vy: (pipe.y2 - pipe.y1) * 0.015 * pipe.flowRate,
            vz: (pipe.z2 - pipe.z1) * 0.015 * pipe.flowRate,
            life: 400,
            maxLife: 400,
            size: pipe.radius * 0.5, // Larger particles
            color: pipe.type === 'fiber' ? '#00FFE0' : pipe.type === 'water' ? '#40A0FF' : pipe.type === 'gas' ? '#FFB84D' : '#FF6B6B',
            pipeId: pipe.id,
            progress: 0
          };
          newParticles.push(particle);
        }
      });

      setParticles(prev => [
        ...prev.filter(p => p.life > 0).slice(-500), // Keep max 500 particles
        ...newParticles
      ]);
    };

    const interval = setInterval(generateParticles, 100);
    return () => clearInterval(interval);
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

    // Advanced isometric projection with perspective
    const toIsometric = (x: number, y: number, z: number) => {
      const angle = Math.PI / 6; // 30 degrees
      const isoX = (x - z) * Math.cos(angle);
      const isoY = (x + z) * Math.sin(angle) - y;
      return { x: isoX, y: isoY };
    };

    // Draw 3D cylinder (pipe)
    const drawPipe = (pipe: Pipe, alpha: number = 1) => {
      ctx.save();
      ctx.globalAlpha = alpha;

      // Use visual dimensions for proper centering
      const dpr = window.devicePixelRatio || 1;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const scale = 6; // Increased scale for better visibility

      // Calculate pipe segments for smooth curves
      const segments = 20;
      const dx = (pipe.x2 - pipe.x1) / segments;
      const dy = (pipe.y2 - pipe.y1) / segments;
      const dz = (pipe.z2 - pipe.z1) / segments;

      for (let i = 0; i < segments; i++) {
        const x = pipe.x1 + dx * i;
        const y = pipe.y1 + dy * i;
        const z = pipe.z1 + dz * i;

        const nextX = pipe.x1 + dx * (i + 1);
        const nextY = pipe.y1 + dy * (i + 1);
        const nextZ = pipe.z1 + dz * (i + 1);

        // Draw pipe segment as 3D cylinder
        const pos1 = toIsometric(x, y, z);
        const pos2 = toIsometric(nextX, nextY, nextZ);
        
        // Create gradient for metallic effect
        const gradient = ctx.createLinearGradient(
          centerX + pos1.x * scale - pipe.radius * scale,
          centerY + pos1.y * scale - pipe.radius * scale,
          centerX + pos1.x * scale + pipe.radius * scale,
          centerY + pos1.y * scale + pipe.radius * scale
        );

        if (pipe.metallic) {
          gradient.addColorStop(0, pipe.color);
          gradient.addColorStop(0.3, lightenColor(pipe.color, 40));
          gradient.addColorStop(0.7, pipe.color);
          gradient.addColorStop(1, darkenColor(pipe.color, 30));
        } else {
          gradient.addColorStop(0, pipe.color);
          gradient.addColorStop(1, lightenColor(pipe.color, 20));
        }

        // Draw pipe body
        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = pipe.radius * scale * 2;
        ctx.lineCap = 'round';
        ctx.moveTo(centerX + pos1.x * scale, centerY + pos1.y * scale);
        ctx.lineTo(centerX + pos2.x * scale, centerY + pos2.y * scale);
        ctx.stroke();

        // Add highlights and shadows for 3D effect
        if (pipe.metallic) {
          // Highlight
          ctx.beginPath();
          ctx.strokeStyle = lightenColor(pipe.color, 60);
          ctx.lineWidth = pipe.radius * scale * 0.6;
          ctx.moveTo(centerX + pos1.x * scale, centerY + pos1.y * scale - pipe.radius * scale * 0.7);
          ctx.lineTo(centerX + pos2.x * scale, centerY + pos2.y * scale - pipe.radius * scale * 0.7);
          ctx.stroke();

          // Shadow
          ctx.beginPath();
          ctx.strokeStyle = darkenColor(pipe.color, 50);
          ctx.lineWidth = pipe.radius * scale * 0.4;
          ctx.moveTo(centerX + pos1.x * scale, centerY + pos1.y * scale + pipe.radius * scale * 0.8);
          ctx.lineTo(centerX + pos2.x * scale, centerY + pos2.y * scale + pipe.radius * scale * 0.8);
          ctx.stroke();
        }
      }

      ctx.restore();
    };

    // Draw flowing particles with trails
    const drawParticles = () => {
      particles.forEach(particle => {
        const pos = toIsometric(particle.x, particle.y, particle.z);
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const scale = 6;

        // Draw particle with glow effect
        ctx.save();
        ctx.globalAlpha = particle.life / particle.maxLife;
        
        // Glow effect
        const glowSize = particle.size * scale * 3;
        const glowGradient = ctx.createRadialGradient(
          centerX + pos.x * scale, centerY + pos.y * scale, 0,
          centerX + pos.x * scale, centerY + pos.y * scale, glowSize
        );
        glowGradient.addColorStop(0, particle.color + 'FF');
        glowGradient.addColorStop(0.5, particle.color + '80');
        glowGradient.addColorStop(1, particle.color + '00');

        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(centerX + pos.x * scale, centerY + pos.y * scale, glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Core particle
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(centerX + pos.x * scale, centerY + pos.y * scale, particle.size * scale, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });
    };

    // Helper functions for color manipulation
    const lightenColor = (color: string, percent: number) => {
      const num = parseInt(color.replace('#', ''), 16);
      const amt = Math.round(2.55 * percent);
      const R = (num >> 16) + amt;
      const G = (num >> 8 & 0x00FF) + amt;
      const B = (num & 0x0000FF) + amt;
      return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    };

    const darkenColor = (color: string, percent: number) => {
      const num = parseInt(color.replace('#', ''), 16);
      const amt = Math.round(2.55 * percent);
      const R = (num >> 16) - amt;
      const G = (num >> 8 & 0x00FF) - amt;
      const B = (num & 0x0000FF) - amt;
      return '#' + (0x1000000 + (R > 255 ? 255 : R < 0 ? 0 : R) * 0x10000 +
        (G > 255 ? 255 : G < 0 ? 0 : G) * 0x100 +
        (B > 255 ? 255 : B < 0 ? 0 : B)).toString(16).slice(1);
    };

    // Draw background grid
    const drawGrid = () => {
      ctx.save();
      ctx.strokeStyle = 'rgba(100, 200, 255, 0.2)';
      ctx.lineWidth = 1;

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const scale = 6;
      const gridSize = 5;
      const gridRange = 30;

      for (let x = -gridRange; x <= gridRange; x += gridSize) {
        for (let z = -gridRange; z <= gridRange; z += gridSize) {
          const iso1 = toIsometric(x, 0, z);
          const iso2 = toIsometric(x + gridSize, 0, z);
          const iso3 = toIsometric(x, 0, z + gridSize);

          ctx.beginPath();
          ctx.moveTo(centerX + iso1.x * scale, centerY + iso1.y * scale);
          ctx.lineTo(centerX + iso2.x * scale, centerY + iso2.y * scale);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(centerX + iso1.x * scale, centerY + iso1.y * scale);
          ctx.lineTo(centerX + iso3.x * scale, centerY + iso3.y * scale);
          ctx.stroke();
        }
      }
      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Dark background with gradient
      const bgGradient = ctx.createRadialGradient(
        window.innerWidth / 2, window.innerHeight / 2, 0,
        window.innerWidth / 2, window.innerHeight / 2, Math.max(window.innerWidth, window.innerHeight) / 2
      );
      bgGradient.addColorStop(0, '#0a0a0a');
      bgGradient.addColorStop(1, '#000000');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      // Draw grid
      drawGrid();

      // Draw pipes with construction animation
      pipeNetwork.forEach((pipe, index) => {
        const pipeProgress = Math.max(0, Math.min(1, (constructionProgress * pipeNetwork.length) - index));
        if (pipeProgress > 0) {
          drawPipe(pipe, pipeProgress);
        }
      });

      // Draw particles
      drawParticles();

      // Update particles
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        z: particle.z + particle.vz,
        life: particle.life - 1
      })).filter(p => p.life > 0));

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [scrollProgress, constructionProgress, particles]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ 
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)'
        }}
      />
      
      {/* Construction Progress Indicator */}
      <div className="absolute top-20 right-6 z-10 pointer-events-auto">
        <div className="glass-card">
          <h3 className="text-white font-semibold mb-3">Infrastructure Construction</h3>
          <div className="space-y-2">
            <div className="text-sm text-primary font-medium">
              Underground Utilities: {Math.round(Math.min(constructionProgress * 3, 1) * 100)}%
            </div>
            <div className="text-sm text-accent font-medium">
              Surface Infrastructure: {Math.round(Math.max(0, Math.min((constructionProgress - 0.33) * 3, 1)) * 100)}%
            </div>
            <div className="text-sm text-blue-400 font-medium">
              Aerial Networks: {Math.round(Math.max(0, Math.min((constructionProgress - 0.66) * 3, 1)) * 100)}%
            </div>
          </div>
          <div className="mt-4 text-xs text-white/60">
            Scroll to build infrastructure layers
          </div>
          <div className="mt-2 text-xs text-white/50">
            Active Particles: {particles.length}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-6 left-6 z-10 pointer-events-auto">
        <div className="glass-card">
          <h4 className="text-white font-semibold mb-3">Infrastructure Types</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-2 bg-blue-500 rounded"></div>
              <span className="text-xs text-white/80">Water Distribution</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-2 bg-orange-500 rounded"></div>
              <span className="text-xs text-white/80">Gas Pipeline</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-2 bg-green-400 rounded"></div>
              <span className="text-xs text-white/80">Fiber Optic</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-2 bg-red-500 rounded"></div>
              <span className="text-xs text-white/80">Electrical</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advanced3DPipeGrid;