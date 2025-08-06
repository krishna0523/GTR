import { useEffect, useRef } from 'react';

const ShaderCableBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const uniformsRef = useRef<{
    time: WebGLUniformLocation | null;
    resolution: WebGLUniformLocation | null;
    scroll: WebGLUniformLocation | null;
    mouse: WebGLUniformLocation | null;
  }>({
    time: null,
    resolution: null,
    scroll: null,
    mouse: null,
  });

  // Vertex shader - defines positions
  const vertexShaderSource = `
    attribute vec4 position;
    void main() {
      gl_Position = position;
    }
  `;

  // Fragment shader - creates the visual effects
  const fragmentShaderSource = `
    precision mediump float;
    
    uniform float time;
    uniform vec2 resolution;
    uniform float scroll;
    uniform vec2 mouse;
    
    // Noise function for organic effects
    float noise(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }
    
    // Smooth noise
    float smoothNoise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      
      float a = noise(i);
      float b = noise(i + vec2(1.0, 0.0));
      float c = noise(i + vec2(0.0, 1.0));
      float d = noise(i + vec2(1.0, 1.0));
      
      vec2 u = f * f * (3.0 - 2.0 * f);
      
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }
    
    // Fractal noise
    float fbm(vec2 st) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 0.0;
      
      for (int i = 0; i < 4; i++) {
        value += amplitude * smoothNoise(st);
        st *= 2.0;
        amplitude *= 0.5;
      }
      return value;
    }
    
    // Distance to line segment
    float lineDistance(vec2 p, vec2 a, vec2 b) {
      vec2 pa = p - a;
      vec2 ba = b - a;
      float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
      return length(pa - ba * h);
    }
    
    // Cable generation function with mouse interaction
    vec3 generateCable(vec2 uv, vec2 start, vec2 end, vec3 color, float thickness, float wave, vec2 mousePos) {
      // Create wavy path
      vec2 direction = normalize(end - start);
      vec2 perpendicular = vec2(-direction.y, direction.x);
      
      float t = dot(uv - start, direction) / length(end - start);
      t = clamp(t, 0.0, 1.0);
      
      // Wave distortion based on scroll and time - slower pace
      float waveOffset = sin(t * 15.0 + time * 1.0 + wave) * 0.05 * (1.0 + scroll * 2.0);
      waveOffset += sin(t * 8.0 + time * 0.75 + wave + 1.0) * 0.03 * (1.0 + scroll);
      
      // Mouse influence on cable distortion
      vec2 baseCablePoint = start + (end - start) * t;
      float mouseInfluence = smoothstep(0.3, 0.0, length(baseCablePoint - mousePos));
      waveOffset += mouseInfluence * sin(time * 2.0) * 0.02;
      
      vec2 cablePoint = baseCablePoint + perpendicular * waveOffset;
      float dist = lineDistance(uv, start, end);
      
      // Add wave distortion to distance calculation
      dist = abs(dist - abs(waveOffset * 0.5));
      
      // Cable glow effect
      float cable = smoothstep(thickness + 0.02, thickness, dist);
      float glow = smoothstep(thickness + 0.08, thickness, dist);
      
      // Electrical pulse effect - slower
      float pulse = sin(t * 20.0 - time * 4.0) * 0.5 + 0.5;
      pulse = smoothstep(0.7, 1.0, pulse);
      
      // Data flow particles - slower
      float particles = 0.0;
      for (int i = 0; i < 3; i++) {
        float particleT = fract(time * 0.15 + float(i) * 0.33 + wave);
        vec2 particlePos = start + (end - start) * particleT + perpendicular * waveOffset;
        float particleDist = length(uv - particlePos);
        particles += smoothstep(0.02, 0.01, particleDist) * (1.0 + pulse);
      }
      
      // Combine effects - much more subtle
      vec3 result = color * cable * 0.6;
      result += color * glow * 0.2;
      result += color * pulse * cable * 0.4;
      result += color * particles * 0.8;
      
      return result;
    }
    
    void main() {
      vec2 uv = gl_FragCoord.xy / resolution.xy;
      vec2 mouseUV = mouse / resolution.xy;
      
      // Black background
      vec3 background = vec3(0.0, 0.0, 0.0);
      
      // Add noise texture - reduced
      float noiseValue = fbm(uv * 5.0 + time * 0.1);
      background += vec3(0.01) * noiseValue;
      
      vec3 color = background;
      
      // Simplified cables positioned on the sides - more subtle
      // Left side cables - reduced colors and fewer cables
      // Cable 1: Left vertical
      color += generateCable(uv, vec2(0.0, 0.0), vec2(0.15, 1.0), 
                           vec3(0.0, 0.2, 0.3), 0.008, 0.0, mouseUV);
      
      // Cable 2: Left diagonal
      color += generateCable(uv, vec2(0.0, 0.5), vec2(0.2, 0.8), 
                           vec3(0.15, 0.08, 0.22), 0.006, 2.0, mouseUV);
      
      // Right side cables - reduced colors and fewer cables
      // Cable 3: Right vertical
      color += generateCable(uv, vec2(0.85, 0.0), vec2(1.0, 1.0), 
                           vec3(0.25, 0.1, 0.1), 0.005, 1.5, mouseUV);
      
      // Cable 4: Right diagonal
      color += generateCable(uv, vec2(0.8, 0.2), vec2(1.0, 0.7), 
                           vec3(0.0, 0.25, 0.25), 0.009, 3.0, mouseUV);
      
      // Small round torch effect
      float mouseDist = length(uv - mouseUV);
      
      // Smaller perfect circular light with smooth falloff
      float torchCore = smoothstep(0.05, 0.0, mouseDist);
      float torchGlow = smoothstep(0.1, 0.0, mouseDist);
      
      // Bright center with softer outer glow - perfectly round
      color += vec3(0.15, 0.25, 0.35) * torchCore;
      color += vec3(0.05, 0.1, 0.15) * torchGlow;
      
      // Cable attraction to cursor - clean effect
      float cableAttraction = smoothstep(0.15, 0.0, mouseDist);
      color += color * cableAttraction * 0.2;
      
      
      // Scroll-based color intensity - reduced
      color *= (1.0 + scroll * 0.3);
      
      // Final tone mapping
      color = color / (color + vec3(1.0));
      color = pow(color, vec3(1.0/2.2)); // Gamma correction
      
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    
    return shader;
  };

  const createProgram = (gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) => {
    const program = gl.createProgram();
    if (!program) return null;
    
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }
    
    return program;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }
    
    glRef.current = gl;

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    
    if (!vertexShader || !fragmentShader) return;
    
    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return;
    
    programRef.current = program;

    // Get uniform locations
    uniformsRef.current.time = gl.getUniformLocation(program, 'time');
    uniformsRef.current.resolution = gl.getUniformLocation(program, 'resolution');
    uniformsRef.current.scroll = gl.getUniformLocation(program, 'scroll');
    uniformsRef.current.mouse = gl.getUniformLocation(program, 'mouse');

    // Create vertex buffer for fullscreen quad
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    let mouseX = 0;
    let mouseY = 0;
    let scrollProgress = 0;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = canvas.height - (e.clientY - rect.top); // Flip Y coordinate
    };

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = Math.min(scrollTop / documentHeight, 1);
    };

    const render = (time: number) => {
      gl.useProgram(program);
      
      // Update uniforms
      gl.uniform1f(uniformsRef.current.time, time * 0.001);
      gl.uniform2f(uniformsRef.current.resolution, canvas.width, canvas.height);
      gl.uniform1f(uniformsRef.current.scroll, scrollProgress);
      gl.uniform2f(uniformsRef.current.mouse, mouseX, mouseY);
      
      // Clear and draw
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      
      animationRef.current = requestAnimationFrame(render);
    };

    // Initialize
    handleResize();
    render(0);

    // Event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      // Cleanup WebGL resources
      if (gl && program) {
        gl.deleteProgram(program);
      }
      if (gl && vertexShader) {
        gl.deleteShader(vertexShader);
      }
      if (gl && fragmentShader) {
        gl.deleteShader(fragmentShader);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{ background: '#000' }}
    />
  );
};

export default ShaderCableBackground;