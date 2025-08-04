import { useEffect, useRef, useState } from 'react';

interface Cable3D {
  id: string;
  x: number;
  y: number;
  z: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  scale: number;
  opacity: number;
  color: string;
  glowIntensity: number;
  pulsePhase: number;
  energyLevel: number;
  lastPulseTime: number;
  cableType: 'fiber' | 'power' | 'data';
  randomGlowSeed: number;
  randomGlowSpeed: number;
}

interface DataPulse {
  id: string;
  cableId: string;
  progress: number;
  speed: number;
  intensity: number;
  color: string;
  size: number;
}

interface ConnectionSpark {
  id: string;
  x: number;
  y: number;
  z: number;
  life: number;
  maxLife: number;
  intensity: number;
}

const CableBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cables, setCables] = useState<Cable3D[]>([]);
  const dataPulsesRef = useRef<DataPulse[]>([]);
  const connectionSparksRef = useRef<ConnectionSpark[]>([]);
  const lastScrollTime = useRef(0);
  const animationRef = useRef<number>();
  const texturesRef = useRef<{ [key: string]: HTMLImageElement }>({});
  const lastFrameTime = useRef(0);

  // Generate multiple cable instances with fiber optic colors
  useEffect(() => {
    const cableInstances: Cable3D[] = [];
    const cableConfigs = [
      { color: '#00bfff', type: 'fiber' as const, speed: 1.5 },
      { color: '#00ff88', type: 'data' as const, speed: 2.0 },
      { color: '#ff6b6b', type: 'power' as const, speed: 0.8 },
      { color: '#ffaa33', type: 'fiber' as const, speed: 1.8 },
      { color: '#9933ff', type: 'data' as const, speed: 2.2 },
      { color: '#ff3399', type: 'fiber' as const, speed: 1.6 },
      { color: '#33ff99', type: 'data' as const, speed: 1.9 },
      { color: '#ffff33', type: 'power' as const, speed: 0.9 }
    ];
    
    // Create connected network layout
    const networkPositions = [
      { x: -200, y: -100, z: 0 },    // Top left
      { x: 0, y: -150, z: -20 },     // Top center
      { x: 200, y: -100, z: 0 },     // Top right
      { x: -150, y: 0, z: 10 },      // Middle left
      { x: 0, y: 0, z: 0 },          // Center hub
      { x: 150, y: 0, z: 10 },       // Middle right
      { x: -100, y: 120, z: -10 },   // Bottom left
      { x: 100, y: 120, z: -10 }     // Bottom right
    ];
    
    for (let i = 0; i < 8; i++) {
      const config = cableConfigs[i % cableConfigs.length];
      const position = networkPositions[i];
      
      cableInstances.push({
        id: `cable_${i}`,
        x: position.x,
        y: position.y,
        z: position.z,
        rotationX: Math.random() * Math.PI * 2,
        rotationY: Math.random() * Math.PI * 2,
        rotationZ: Math.random() * Math.PI * 2,
        scale: 0.5 + Math.random() * 0.8,
        opacity: 0.6 + Math.random() * 0.4,
        color: config.color,
        glowIntensity: 0.5 + Math.random() * 0.5,
        pulsePhase: Math.random() * Math.PI * 2,
        energyLevel: 0.3 + Math.random() * 0.7,
        lastPulseTime: 0,
        cableType: config.type,
        randomGlowSeed: Math.random() * Math.PI * 2,
        randomGlowSpeed: 0.8 + Math.random() * 0.4
      });
    }
    
    setCables(cableInstances);
  }, []);

  // Load textures
  useEffect(() => {
    const textureUrls = {
      baseColor: '/cables/textures/Cable_DefaultMaterial_BaseColor.png',
      metallic: '/cables/textures/Cable_DefaultMaterial_Metallic.png',
      normal: '/cables/textures/Cable_DefaultMaterial_Normal.png',
      roughness: '/cables/textures/Cable_DefaultMaterial_Roughness.png'
    };

    Object.entries(textureUrls).forEach(([key, url]) => {
      const img = new Image();
      img.onload = () => {
        texturesRef.current[key] = img;
      };
      img.src = url;
    });
  }, []);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime.current < 16) return; // Throttle to ~60fps
      lastScrollTime.current = now;
      
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

    const handleClick = (e: MouseEvent) => {
      // Generate sparks on click
      const newSparks: ConnectionSpark[] = [];
      for (let i = 0; i < 3; i++) {
        newSparks.push({
          id: `spark_${Date.now()}_${i}`,
          x: e.clientX + (Math.random() - 0.5) * 60,
          y: e.clientY + (Math.random() - 0.5) * 60,
          z: Math.random() * 30,
          life: 40,
          maxLife: 40,
          intensity: 0.9 + Math.random() * 0.1
        });
      }
      connectionSparksRef.current = [...connectionSparksRef.current, ...newSparks];
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('click', handleClick);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
    };
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

  // Generate data pulses with performance optimization
  useEffect(() => {
    const generatePulses = () => {
      const newPulses: DataPulse[] = [];
      
      // Reduce pulse generation frequency for better performance
      cables.forEach(cable => {
        const pulseChance = cable.cableType === 'data' ? 0.04 : 
                          cable.cableType === 'fiber' ? 0.03 : 0.01;
        
        if (Math.random() < pulseChance) {
          const speed = cable.cableType === 'data' ? 0.04 : 
                       cable.cableType === 'fiber' ? 0.03 : 0.02;
          
          newPulses.push({
            id: `pulse_${cable.id}_${Date.now()}`,
            cableId: cable.id,
            progress: 0,
            speed: speed * (0.9 + Math.random() * 0.2),
            intensity: 0.8 + Math.random() * 0.2,
            color: cable.color,
            size: cable.cableType === 'data' ? 2.5 : cable.cableType === 'fiber' ? 2 : 3
          });
        }
      });

      // Filter completed pulses and limit active pulses
      dataPulsesRef.current = [
        ...dataPulsesRef.current.filter(p => p.progress < 1).slice(-25), // Reduced from 50 to 25
        ...newPulses
      ];
    };

    const interval = setInterval(generatePulses, 200); // Increased from 150ms
    return () => clearInterval(interval);
  }, [cables]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 3D projection helper with perspective
    const project3D = (x: number, y: number, z: number, zoom: number) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const perspective = 800;
      const scale = zoom * 2;
      
      const projectedX = centerX + (x * scale * perspective) / (perspective + z);
      const projectedY = centerY + (y * scale * perspective) / (perspective + z);
      const depth = (perspective + z) / perspective;
      
      return { x: projectedX, y: projectedY, depth, scale: scale * depth };
    };

    // Draw connection lines between cables
    const drawConnections = () => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // Define connection paths between cables (network topology)
      const connections = [
        [0, 1], [1, 2], // Top row
        [0, 3], [2, 5], // Vertical connections
        [3, 4], [4, 5], // Middle row
        [3, 6], [5, 7], // To bottom
        [6, 7], [4, 6], [4, 7] // Bottom connections and center hub
      ];
      
      connections.forEach(([fromIdx, toIdx]) => {
        const fromCable = cables[fromIdx];
        const toCable = cables[toIdx];
        if (!fromCable || !toCable) return;
        
        const fromProj = project3D(fromCable.x, fromCable.y, fromCable.z, 1);
        const toProj = project3D(toCable.x, toCable.y, toCable.z, 1);
        
        ctx.save();
        
        // Connection opacity based on scroll progress
        const connectionOpacity = Math.min(scrollProgress * 2, 0.8);
        ctx.globalAlpha = connectionOpacity;
        
        // Create gradient for connection line
        const gradient = ctx.createLinearGradient(
          centerX + fromProj.x * 6, centerY + fromProj.y * 6,
          centerX + toProj.x * 6, centerY + toProj.y * 6
        );
        gradient.addColorStop(0, fromCable.color + '80');
        gradient.addColorStop(0.5, '#ffffff40');
        gradient.addColorStop(1, toCable.color + '80');
        
        // Draw connection line with scroll-based thickness
        const lineWidth = 1 + scrollProgress * 3; // Lines get thicker with scroll
        ctx.strokeStyle = gradient;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(centerX + fromProj.x * 6, centerY + fromProj.y * 6);
        ctx.lineTo(centerX + toProj.x * 6, centerY + toProj.y * 6);
        ctx.stroke();
        
        ctx.restore();
      });
    };

    // Draw cable with enhanced 3D appearance and effects
    const drawCable = (cable: Cable3D, time: number, globalZoom: number) => {
      ctx.save();

      // No mouse proximity calculations - performance optimization

      // Calculate scroll-based transformations
      const scrollRotation = scrollProgress * Math.PI * 4; // 4 full rotations
      const scrollZoom = 0.5 + scrollProgress * 2; // Zoom from 0.5x to 2.5x
      
      // Apply individual cable rotations + scroll rotation + organic sway
      const rotX = cable.rotationX + scrollRotation * 0.3 + Math.sin(time * 0.0008) * 0.1;
      const rotY = cable.rotationY + scrollRotation * 0.5 + Math.cos(time * 0.0006) * 0.15;
      const rotZ = cable.rotationZ + scrollRotation * 0.2 + Math.sin(time * 0.0009) * 0.08;

      // Project cable position with zoom and organic movement
      const projected = project3D(
        cable.x + Math.sin(time * 0.0005) * 10, 
        cable.y + Math.cos(time * 0.0007) * 8, 
        cable.z + Math.sin(time * 0.001) * 20,
        globalZoom * scrollZoom * cable.scale
      );

      // Dynamic glow intensity with randomized variation for performance
      const pulseGlow = Math.sin(time * 0.003 + cable.pulsePhase) * 0.3 + 0.7;
      const energyGlow = cable.energyLevel * pulseGlow;
      
      // Randomized glow variation instead of mouse proximity
      const randomGlow = Math.sin(time * 0.002 * cable.randomGlowSpeed + cable.randomGlowSeed) * 0.4 + 0.6;
      const totalGlow = (energyGlow + randomGlow * 0.3) * cable.glowIntensity;

      // Set opacity based on depth, cable opacity, and glow
      ctx.globalAlpha = cable.opacity * projected.depth * (0.6 + totalGlow * 0.4);

      // Draw cable as an elongated shape with scroll-based length extension
      const baseCableLength = 60 * projected.scale; // Reduced base length
      const lengthMultiplier = 1 + scrollProgress * 4; // Cables get up to 5x longer when fully scrolled
      const cableLength = baseCableLength * lengthMultiplier;
      const cableWidth = 6 * projected.scale; // Slightly thinner base width

      ctx.translate(projected.x, projected.y);
      ctx.rotate(rotZ);

      // Create gradient for fiber optic cable appearance
      const gradient = ctx.createLinearGradient(
        -cableLength / 2, -cableWidth / 2,
        cableLength / 2, cableWidth / 2
      );
      
      // Use fiber optic colors with glow effect
      const baseColor = cable.color;
      const darkColor = adjustBrightness(baseColor, -60);
      const lightColor = adjustBrightness(baseColor, 40);
      
      gradient.addColorStop(0, darkColor);
      gradient.addColorStop(0.2, baseColor);
      gradient.addColorStop(0.5, lightColor);
      gradient.addColorStop(0.8, baseColor);
      gradient.addColorStop(1, darkColor);

      // Draw main cable body
      ctx.fillStyle = gradient;
      ctx.fillRect(-cableLength / 2, -cableWidth / 2, cableLength, cableWidth);

      // Add fiber optic core highlight
      ctx.fillStyle = lightColor;
      ctx.fillRect(-cableLength / 2, -cableWidth / 4, cableLength, cableWidth / 8);

      // Add connector ends with cable color
      ctx.fillStyle = darkColor;
      ctx.fillRect(-cableLength / 2 - 5, -cableWidth / 2, 10, cableWidth);
      ctx.fillRect(cableLength / 2 - 5, -cableWidth / 2, 10, cableWidth);

      // Add fiber optic glow effect
      const glowGradient = ctx.createLinearGradient(
        -cableLength / 2, -cableWidth / 2,
        -cableLength / 2, cableWidth / 2
      );
      const glowColor = hexToRgba(cable.color, 0.6);
      const glowColorFade = hexToRgba(cable.color, 0.1);
      
      glowGradient.addColorStop(0, glowColor);
      glowGradient.addColorStop(0.5, glowColorFade);
      glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = glowGradient;
      ctx.fillRect(-cableLength / 2, -cableWidth / 2, cableLength, cableWidth / 3);

      // Enhanced glow effects based on cable type and energy
      const glowRadius = 8 + totalGlow * 12;
      const glowIntensity = totalGlow * 0.8;
      
      // Outer energy field
      ctx.shadowBlur = glowRadius * 2;
      ctx.shadowColor = cable.color;
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = hexToRgba(cable.color, glowIntensity * 0.3);
      ctx.fillRect(-cableLength / 2, -cableWidth / 2 - glowRadius, cableLength, cableWidth + glowRadius * 2);
      
      // Inner glow core
      ctx.shadowBlur = glowRadius;
      ctx.fillStyle = hexToRgba(cable.color, glowIntensity * 0.6);
      ctx.fillRect(-cableLength / 2, -cableWidth / 2 - 3, cableLength, cableWidth + 6);
      
      ctx.globalCompositeOperation = 'source-over';
      ctx.shadowBlur = 0;

      // Subtle random vibration for organic feel
      const vibration = Math.sin(time * 0.01 + cable.randomGlowSeed) * 0.5;
      ctx.translate(vibration, vibration * 0.3);

      ctx.restore();
    };

    // Helper functions for color manipulation
    const adjustBrightness = (color: string, percent: number) => {
      const num = parseInt(color.replace('#', ''), 16);
      const amt = Math.round(2.55 * percent);
      const R = Math.max(0, Math.min(255, (num >> 16) + amt));
      const G = Math.max(0, Math.min(255, (num >> 8 & 0x00FF) + amt));
      const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
      return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
    };

    const hexToRgba = (hex: string, alpha: number) => {
      const num = parseInt(hex.replace('#', ''), 16);
      const r = (num >> 16) & 255;
      const g = (num >> 8) & 255;
      const b = num & 255;
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    // Draw data pulses traveling along cables (optimized)
    const drawDataPulses = () => {
      const pulses = dataPulsesRef.current;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      for (let i = 0; i < pulses.length; i++) {
        const pulse = pulses[i];
        const cable = cables.find(c => c.id === pulse.cableId);
        if (!cable) continue;

        // Simplified pulse position calculation
        const pulseX = cable.x + (pulse.progress - 0.5) * 80;
        const pulseY = cable.y;
        const pulseZ = cable.z;

        const projected = project3D(pulseX, pulseY, pulseZ, 1);

        ctx.save();
        ctx.globalAlpha = pulse.intensity;

        // Simplified pulse core (no trail for performance)
        const coreSize = pulse.size * 1.5;
        ctx.fillStyle = pulse.color;
        ctx.shadowBlur = coreSize;
        ctx.shadowColor = pulse.color;
        ctx.beginPath();
        ctx.arc(centerX + projected.x * 6, centerY + projected.y * 6, coreSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.restore();
      }
    };

    // Draw connection sparks (optimized)
    const drawConnectionSparks = () => {
      const sparks = connectionSparksRef.current;
      
      for (let i = 0; i < sparks.length; i++) {
        const spark = sparks[i];
        const lifeRatio = spark.life / spark.maxLife;
        
        ctx.save();
        ctx.globalAlpha = lifeRatio * spark.intensity;

        // Simplified spark (no rays for performance)
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00bfff';
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, 8 * lifeRatio, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.restore();
      }
    };

    // Animation loop with performance optimizations
    const animate = (currentTime: number) => {
      // Basic frame rate control
      if (currentTime - lastFrameTime.current < 16) { // ~60fps
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime.current = currentTime;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Dark gradient background
      const bgGradient = ctx.createRadialGradient(
        window.innerWidth / 2, window.innerHeight / 2, 0,
        window.innerWidth / 2, window.innerHeight / 2, Math.max(window.innerWidth, window.innerHeight) / 2
      );
      bgGradient.addColorStop(0, '#0a0f1a');
      bgGradient.addColorStop(0.5, '#051020');
      bgGradient.addColorStop(1, '#000000');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      const time = currentTime;
      const globalZoom = 0.8 + scrollProgress * 1.2;

      // Draw connection lines first (background layer)
      drawConnections();

      // Draw cables (no sorting for performance)
      cables.forEach(cable => {
        drawCable(cable, time, globalZoom);
      });

      // Draw data pulses
      drawDataPulses();

      // Draw connection sparks
      drawConnectionSparks();

      // Update data pulses in ref (no React state updates)
      dataPulsesRef.current = dataPulsesRef.current.map(pulse => ({
        ...pulse,
        progress: pulse.progress + pulse.speed
      })).filter(pulse => pulse.progress < 1);

      // Update connection sparks in ref
      connectionSparksRef.current = connectionSparksRef.current.map(spark => ({
        ...spark,
        life: spark.life - 1
      })).filter(spark => spark.life > 0);

      // Update cable energy levels less frequently (every 30th frame)
      if (Math.floor(currentTime / 16) % 30 === 0) {
        setCables(prev => prev.map(cable => {
          const nearbyPulses = dataPulsesRef.current.filter(p => p.cableId === cable.id).length;
          const targetEnergy = 0.3 + Math.min(nearbyPulses * 0.15, 0.6);
          const energyDiff = targetEnergy - cable.energyLevel;
          
          return {
            ...cable,
            energyLevel: cable.energyLevel + energyDiff * 0.05,
            pulsePhase: cable.pulsePhase + 0.1
          };
        }));
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [scrollProgress, cables]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ 
          background: 'linear-gradient(135deg, #0a0f1a 0%, #051020 50%, #000000 100%)'
        }}
      />
      
    </div>
  );
};

export default CableBackground;