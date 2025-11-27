"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Color, Triangle } from "ogl";

interface AuroraProps {
    colorStops?: string[];
    amplitude?: number;
    blend?: number;
    speed?: number;
    className?: string;
}

const VERTEX_SHADER = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;
uniform vec2 uMouse;

out vec4 fragColor;

vec3 permute(vec3 x){return mod(((x*34.0)+1.0)*x,289.0);}

float snoise(vec2 v){
  const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
  vec2 i=floor(v+dot(v,C.yy));
  vec2 x0=v-i+dot(i,C.xx);
  vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
  vec4 x12=x0.xyxy+C.xxzz;
  x12.xy-=i1;
  i=mod(i,289.0);
  vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
  vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
  m=m*m; m=m*m;
  vec3 x=2.0*fract(p*C.www)-1.0;
  vec3 h=abs(x)-0.5;
  vec3 ox=floor(x+0.5);
  vec3 a0=x-ox;
  m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
  vec3 g; g.x=a0.x*x0.x+h.x*x0.y; g.yz=a0.yz*x12.xz+h.yz*x12.yw;
  return 130.0*dot(m,g);
}

struct ColorStop { vec3 color; float position; };
#define COLOR_RAMP(colors,factor,finalColor){ \
  int index=0; \
  for(int i=0;i<2;i++){ \
    ColorStop currentColor=colors[i]; \
    bool inBetween=currentColor.position<=factor; \
    index=int(mix(float(index),float(i),float(inBetween))); \
  } \
  ColorStop currentColor=colors[index]; \
  ColorStop nextColor=colors[index+1]; \
  float range=nextColor.position-currentColor.position; \
  float lerpFactor=(factor-currentColor.position)/range; \
  finalColor=mix(currentColor.color,nextColor.color,lerpFactor); \
}

void main(){
  vec2 uv=gl_FragCoord.xy/uResolution;
  vec2 m = uMouse / uResolution;

  ColorStop colors[3];
  colors[0]=ColorStop(uColorStops[0],0.0);
  colors[1]=ColorStop(uColorStops[1],0.5);
  colors[2]=ColorStop(uColorStops[2],1.0);

  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);

  // Apply noise to create the wave shape
  float noise = snoise(vec2(uv.x * 3.0, uTime * 0.2 + m.x * 0.5));
  float waveHeight = uv.y - (noise * 0.15 * uAmplitude);

  // Fade the wave out at the bottom
  float fade = smoothstep(0.0, 0.4, uv.y);
  waveHeight = mix(uv.y, waveHeight, fade);

  // Define the core of the aurora
  float core = 0.5;
  float intensity = smoothstep(core - uBlend, core + uBlend, waveHeight);
  
  vec3 auroraColor = intensity * rampColor;
  float auroraAlpha = intensity;
  
  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
}
`;

export default function AuroraShader({
    colorStops = ["#ea580c", "#f97316", "#ea580c"],
    amplitude = 0.8,
    blend = 0.6,
    speed = 0.5,
    className = "w-full h-full absolute top-[-20%] left-0 opacity-50",
}: AuroraProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const rendererRef = useRef<Renderer | null>(null);
    const animationIdRef = useRef<number | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let gl: any = null;
        let resizeObserver: ResizeObserver | null = null;
        let intersectionObserver: IntersectionObserver | null = null;

        const cleanup = () => {
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }

            if (resizeObserver) {
                resizeObserver.disconnect();
            }

            if (intersectionObserver) {
                intersectionObserver.disconnect();
            }

            window.removeEventListener("mousemove", onMouseMove);

            if (gl && gl.canvas && container.contains(gl.canvas)) {
                container.removeChild(gl.canvas);
            }

            if (gl) {
                const loseContext = gl.getExtension("WEBGL_lose_context");
                if (loseContext) loseContext.loseContext();
            }
            rendererRef.current = null;
        };

        const onMouseMove = (e: MouseEvent) => {
            mouseRef.current.x += (e.clientX - mouseRef.current.x) * 0.05;
            mouseRef.current.y += (e.clientY - mouseRef.current.y) * 0.05;
        };

        try {
            const renderer = new Renderer({
                alpha: true,
                antialias: false,
                dpr: Math.min(window.devicePixelRatio, 2),
            });
            rendererRef.current = renderer;
            gl = renderer.gl;

            gl.clearColor(0, 0, 0, 0);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

            const geometry = new Triangle(gl);
            if (geometry.attributes.uv) delete geometry.attributes.uv;

            const program = new Program(gl, {
                vertex: VERTEX_SHADER,
                fragment: FRAGMENT_SHADER,
                uniforms: {
                    uTime: { value: 0 },
                    uAmplitude: { value: amplitude },
                    uBlend: { value: blend },
                    uResolution: { value: [container.offsetWidth, container.offsetHeight] },
                    uColorStops: {
                        value: colorStops.map((hex) => {
                            const c = new Color(hex);
                            return [c.r, c.g, c.b];
                        }),
                    },
                    uMouse: { value: [0, 0] },
                },
            });

            const mesh = new Mesh(gl, { geometry, program });
            container.appendChild(gl.canvas);

            const resize = () => {
                if (!container) return;
                const width = container.offsetWidth;
                const height = container.offsetHeight;
                renderer.setSize(width, height);
                program.uniforms.uResolution.value = [width, height];
            };

            // Use ResizeObserver for better reliability than window resize
            resizeObserver = new ResizeObserver(() => {
                requestAnimationFrame(resize);
            });
            resizeObserver.observe(container);

            window.addEventListener("mousemove", onMouseMove, { passive: true });

            let isVisible = true;
            intersectionObserver = new IntersectionObserver((entries) => {
                isVisible = entries[0].isIntersecting;
            });
            intersectionObserver.observe(container);

            const animate = (t: number) => {
                animationIdRef.current = requestAnimationFrame(animate);

                if (!isVisible) return;

                program.uniforms.uTime.value = t * 0.001 * speed;
                program.uniforms.uAmplitude.value = amplitude;
                program.uniforms.uBlend.value = blend;
                program.uniforms.uMouse.value = [mouseRef.current.x, mouseRef.current.y];

                renderer.render({ scene: mesh });
            };
            animate(0);

        } catch (error) {
            console.warn("Aurora Shader initialization failed:", error);
            cleanup(); // Clean up immediately if initialization fails
            return; // Exit without returning cleanup (it's already done)
        }

        return cleanup;
    }, [amplitude, blend, colorStops, speed]);

    return <div ref={containerRef} className={className} />;
}
