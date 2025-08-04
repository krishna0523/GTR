import { useEffect, useRef, useState } from 'react';

interface GridLayer {
  id: string;
  name: string;
  yPosition: number;
  elements: InfrastructureElement[];
  color: string;
  opacity: number;
  particles: FlowParticle[];
}

interface InfrastructureElement {
  id: string;
  type: 'pipe' | 'cable' | 'building' | 'junction' | 'cylinder_pipe' | 'elbow_pipe';
  x: number;
  z: number;
  width: number;
  height: number;
  length: number;
  rotation: number;
  animated: boolean;
  materialType: 'metal' | 'concrete' | 'fiber' | 'building';
  flowDirection?: 'horizontal' | 'vertical';
  connectionPoints?: { x: number, z: number }[];
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
  trail: { x: number, y: number, z: number }[];
}

const IsometricGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentLayer, setCurrentLayer] = useState(0);
  const [particles, setParticles] = useState<FlowParticle[]>([]);
  const animationRef = useRef<number>();

  // Enhanced infrastructure layers with realistic 3D elements
  const layers: GridLayer[] = [
    {
      id: 'underground',
      name: 'Underground Infrastructure',
      yPosition: -20,
      color: '#8B4513',
      opacity: 0.8,
      elements: [
        // Water pipes
        { id: 'wp1', type: 'pipe', x: -10, z: 0, width: 2, height: 2, length: 20, rotation: 0, animated: true },
        { id: 'wp2', type: 'pipe', x: 0, z: -10, width: 2, height: 2, length: 20, rotation: 90, animated: true },
        // Sewer lines
        { id: 'sw1', type: 'pipe', x: 5, z: 5, width: 3, height: 3, length: 15, rotation: 45, animated: true },
        // Junction boxes
        { id: 'jb1', type: 'junction', x: 0, z: 0, width: 4, height: 3, length: 4, rotation: 0, animated: false },
      ]
    },
    {
      id: 'surface',
      name: 'Surface Infrastructure',
      yPosition: 0,
      color: '#32CD32',
      opacity: 0.9,
      elements: [
        // Buildings
        { id: 'b1', type: 'building', x: -15, z: -15, width: 8, height: 12, length: 8, rotation: 0, animated: false },
        { id: 'b2', type: 'building', x: 10, z: -10, width: 6, height: 15, length: 6, rotation: 0, animated: false },
        { id: 'b3', type: 'building', x: 15, z: 15, width: 10, height: 8, length: 10, rotation: 0, animated: false },
        // Surface pipes
        { id: 'sp1', type: 'pipe', x: -5, z: 0, width: 1.5, height: 1.5, length: 25, rotation: 0, animated: true },
      ]
    },
    {
      id: 'aerial',
      name: 'Aerial Infrastructure',
      yPosition: 15,
      color: '#1E90FF',
      opacity: 0.7,
      elements: [
        // Fiber optic cables
        { id: 'fc1', type: 'cable', x: -20, z: 0, width: 0.5, height: 0.5, length: 40, rotation: 0, animated: true },
        { id: 'fc2', type: 'cable', x: 0, z: -20, width: 0.5, height: 0.5, length: 40, rotation: 90, animated: true },
        { id: 'fc3', type: 'cable', x: -10, z: 10, width: 0.5, height: 0.5, length: 30, rotation: 45, animated: true },
        // Cable junctions
        { id: 'cj1', type: 'junction', x: 0, z: 0, width: 2, height: 2, length: 2, rotation: 0, animated: false },
      ]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / documentHeight, 1);
      setScrollProgress(progress);
      
      // Determine current layer based on scroll progress
      const layerIndex = Math.floor(progress * layers.length);
      setCurrentLayer(Math.min(layerIndex, layers.length - 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [layers.length]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
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

    // Isometric projection helper functions
    const toIsometric = (x: number, y: number, z: number) => {
      const isoX = (x - z) * Math.cos(Math.PI / 6);
      const isoY = (x + z) * Math.sin(Math.PI / 6) - y;
      return { x: isoX, y: isoY };
    };

    const drawRect = (x: number, y: number, z: number, width: number, height: number, length: number, color: string, alpha: number = 1) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1;

      // Convert to isometric coordinates
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const scale = 3;

      const topLeft = toIsometric(x, y + height, z);
      const topRight = toIsometric(x + width, y + height, z);
      const bottomLeft = toIsometric(x, y + height, z + length);
      const bottomRight = toIsometric(x + width, y + height, z + length);
      
      const topLeftBottom = toIsometric(x, y, z);
      const topRightBottom = toIsometric(x + width, y, z);

      // Draw top face
      ctx.beginPath();
      ctx.moveTo(centerX + topLeft.x * scale, centerY + topLeft.y * scale);
      ctx.lineTo(centerX + topRight.x * scale, centerY + topRight.y * scale);
      ctx.lineTo(centerX + bottomRight.x * scale, centerY + bottomRight.y * scale);
      ctx.lineTo(centerX + bottomLeft.x * scale, centerY + bottomLeft.y * scale);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Draw front face
      ctx.beginPath();
      ctx.moveTo(centerX + topLeft.x * scale, centerY + topLeft.y * scale);
      ctx.lineTo(centerX + topLeftBottom.x * scale, centerY + topLeftBottom.y * scale);
      ctx.lineTo(centerX + topRightBottom.x * scale, centerY + topRightBottom.y * scale);
      ctx.lineTo(centerX + topRight.x * scale, centerY + topRight.y * scale);
      ctx.closePath();
      ctx.fillStyle = adjustBrightness(color, -20);
      ctx.fill();
      ctx.stroke();

      // Draw right face
      ctx.beginPath();
      ctx.moveTo(centerX + topRight.x * scale, centerY + topRight.y * scale);
      ctx.lineTo(centerX + topRightBottom.x * scale, centerY + topRightBottom.y * scale);
      ctx.lineTo(centerX + bottomRight.x * scale, centerY + (bottomRight.y - height) * scale);
      ctx.lineTo(centerX + bottomRight.x * scale, centerY + bottomRight.y * scale);
      ctx.closePath();
      ctx.fillStyle = adjustBrightness(color, -40);
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    };

    const adjustBrightness = (color: string, percent: number) => {
      const num = parseInt(color.replace('#', ''), 16);
      const amt = Math.round(2.55 * percent);
      const R = (num >> 16) + amt;
      const G = (num >> 8 & 0x00FF) + amt;
      const B = (num & 0x0000FF) + amt;
      return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    };

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      drawGrid(ctx, canvas.width, canvas.height);

      // Draw layers based on scroll progress
      layers.forEach((layer, index) => {
        const layerProgress = Math.max(0, Math.min(1, (scrollProgress * layers.length) - index));
        const layerAlpha = layerProgress * layer.opacity;

        if (layerAlpha > 0) {
          layer.elements.forEach((element) => {
            const animationOffset = element.animated ? Math.sin(Date.now() * 0.002) * 2 : 0;
            
            drawRect(
              element.x,
              layer.yPosition + animationOffset,
              element.z,
              element.width,
              element.height,
              element.length,
              layer.color,
              layerAlpha
            );
          });
        }
      });

      requestAnimationFrame(animate);
    };

    const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 0.5;

      const centerX = width / 2;
      const centerY = height / 2;
      const scale = 3;
      const gridSize = 5;
      const gridRange = 20;

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

    animate();
  }, [scrollProgress, currentLayer, layers]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ 
          mixBlendMode: 'screen',
          opacity: 0.6
        }}
      />
      
      {/* Layer Information */}
      <div className="absolute top-20 right-6 z-10 pointer-events-auto">
        <div className="glass-card">
          <h3 className="text-white font-semibold mb-2">Infrastructure Layers</h3>
          {layers.map((layer, index) => (
            <div 
              key={layer.id}
              className={`text-sm mb-1 transition-all duration-300 ${
                index === currentLayer 
                  ? 'text-primary font-medium' 
                  : 'text-white/60'
              }`}
            >
              {layer.name}
            </div>
          ))}
          <div className="mt-3 text-xs text-white/50">
            Scroll Progress: {Math.round(scrollProgress * 100)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default IsometricGrid;