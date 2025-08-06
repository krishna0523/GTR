import { useEffect, useRef } from 'react';

const CursorLight = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const uniformsRef = useRef<{
    time: WebGLUniformLocation | null;
    resolution: WebGLUniformLocation | null;
    mouse: WebGLUniformLocation | null;
  }>({
    time: null,
    resolution: null,
    mouse: null,
  });

  // Vertex shader
  const vertexShaderSource = `
    attribute vec4 position;
    void main() {
      gl_Position = position;
    }
  `;

  // Fragment shader - only cursor light
  const fragmentShaderSource = `
    precision mediump float;
    
    uniform float time;
    uniform vec2 resolution;
    uniform vec2 mouse;
    
    void main() {
      vec2 uv = gl_FragCoord.xy / resolution.xy;
      vec2 mouseUV = mouse / resolution.xy;
      
      // Black background
      vec3 color = vec3(0.0, 0.0, 0.0);
      
      // Small round torch effect
      float mouseDist = length(uv - mouseUV);
      
      // Smaller perfect circular light with smooth falloff
      float torchCore = smoothstep(0.05, 0.0, mouseDist);
      float torchGlow = smoothstep(0.1, 0.0, mouseDist);
      
      // Bright center with softer outer glow - perfectly round
      color += vec3(0.15, 0.25, 0.35) * torchCore;
      color += vec3(0.05, 0.1, 0.15) * torchGlow;
      
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

    const render = (time: number) => {
      gl.useProgram(program);
      
      // Update uniforms
      gl.uniform1f(uniformsRef.current.time, time * 0.001);
      gl.uniform2f(uniformsRef.current.resolution, canvas.width, canvas.height);
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

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
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

export default CursorLight;