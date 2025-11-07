import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const frameRef = useRef(null);
  const particlesRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene / camera / renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 70;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    // Light
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    const point = new THREE.PointLight(0xffd480, 0.8, 200);
    point.position.set(50, 50, 50);
    scene.add(point);

    // Particles
    const particlesCount = 1200;
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 160;
      pos[i + 1] = (Math.random() - 0.5) * 80;
      pos[i + 2] = (Math.random() - 0.5) * 160;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.8,
      sizeAttenuation: true,
      color: 0xffcc33,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // Cubes with varied sizes and types
    const cubes = [];
    const cubeConfigs = [
      // Small wireframe cubes
      { size: 4, x: -40, y: 20, z: 20, wireframe: true, rotSpeed: 0.4 },
      { size: 4, x: 35, y: -25, z: 15, wireframe: true, rotSpeed: 0.5 },
      { size: 4, x: -20, y: -30, z: 30, wireframe: true, rotSpeed: 0.45 },
      { size: 4, x: 45, y: 15, z: 5, wireframe: true, rotSpeed: 0.38 },
      { size: 4, x: 0, y: 35, z: 25, wireframe: true, rotSpeed: 0.42 },
      { size: 4, x: -35, y: -10, z: 10, wireframe: true, rotSpeed: 0.48 },
      // Large wireframe cubes
      { size: 8, x: -15, y: 10, z: 40, wireframe: true, rotSpeed: 0.5 },
      { size: 7, x: 20, y: -15, z: 35, wireframe: true, rotSpeed: 0.45 },
      // Large opaque cubes
      { size: 6, x: -30, y: -20, z: 45, wireframe: false, rotSpeed: 0.4 },
      { size: 5, x: 30, y: 25, z: 42, wireframe: false, rotSpeed: 0.38 },
    ];

    cubeConfigs.forEach((config) => {
      const cubeGeo = new THREE.BoxGeometry(config.size, config.size, config.size);
      
      if (config.wireframe) {
        const edges = new THREE.EdgesGeometry(cubeGeo);
        const mat = new THREE.LineBasicMaterial({
          color: 0xffd480,
          linewidth: 1,
          transparent: true,
          opacity: config.size > 5 ? 0.5 : 0.35,
        });
        const cube = new THREE.LineSegments(edges, mat);
        cube.position.set(config.x, config.y, config.z);
        cube.userData = {
          rotSpeed: config.rotSpeed,
          initialX: config.x,
          initialY: config.y,
          initialZ: config.z,
          size: config.size,
          wireframe: true,
        };
        scene.add(cube);
        cubes.push(cube);
      } else {
        const mat = new THREE.MeshBasicMaterial({
          color: 0xffd480,
          transparent: true,
          opacity: 0.15,
        });
        const cube = new THREE.Mesh(cubeGeo, mat);
        cube.position.set(config.x, config.y, config.z);
        cube.userData = {
          rotSpeed: config.rotSpeed,
          initialX: config.x,
          initialY: config.y,
          initialZ: config.z,
          size: config.size,
          wireframe: false,
        };
        scene.add(cube);
        cubes.push(cube);
      }
    });

    // Mouse movement smoothing
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const onMove = (e) => {
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove);

    // Animation loop with delta time
    let lastTime = performance.now();
    const animate = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // Smooth mouse tracking
      mouseX += (targetX - mouseX) * Math.min(10 * dt, 1);
      mouseY += (targetY - mouseY) * Math.min(10 * dt, 1);

      // Rotate particles
      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.15 * dt;
        particlesRef.current.rotation.x += 0.06 * dt;
        // Mouse influence on particles
        particlesRef.current.rotation.y += mouseX * 0.003;
        particlesRef.current.rotation.x += mouseY * 0.003;
      }

      // Animate cubes
      cubes.forEach((cube, idx) => {
        // Base rotation
        cube.rotation.x += cube.userData.rotSpeed * dt;
        cube.rotation.y += cube.userData.rotSpeed * 1.3 * dt;
        cube.rotation.z += cube.userData.rotSpeed * 0.7 * dt;

        // Mouse-based rotation
        cube.rotation.y += mouseX * 0.02;
        cube.rotation.x += mouseY * 0.02;

        // Floating animation with sine wave
        const floatSpeed = 0.5 + idx * 0.1;
        const floatRange = cube.userData.size > 5 ? 50 : 25;
        const zOffset = Math.sin(now / 1000 * floatSpeed) * floatRange;
        cube.position.z = cube.userData.initialZ + zOffset;

        // Mouse parallax movement (slower)
        const parallaxSpeed = cube.userData.size > 5 ? 12 : 6;
        cube.position.x = cube.userData.initialX + mouseX * parallaxSpeed;
        cube.position.y = cube.userData.initialY + mouseY * parallaxSpeed;

        // Subtle floating motion
        cube.position.y += Math.sin(now / 1000 + idx) * 0.03;
        cube.position.x += Math.cos(now / 1000 + idx * 0.5) * 0.02;

        // Opacity pulsing
        if (cube.userData.wireframe) {
          const baseOpacity = cube.userData.size > 5 ? 0.4 : 0.3;
          const pulseAmount = 0.2;
          cube.material.opacity = baseOpacity + Math.sin(now / 1000 * 1.5 + idx) * pulseAmount;
        } else {
          cube.material.opacity = 0.12 + Math.sin(now / 1000 * 1.2 + idx) * 0.08;
        }
      });

      // Enhanced camera parallax (slower)
      const cam = cameraRef.current;
      const desiredX = mouseX * 15;
      const desiredY = mouseY * 12;
      cam.position.x += (desiredX - cam.position.x) * Math.min(8 * dt, 1);
      cam.position.y += (desiredY - cam.position.y) * Math.min(8 * dt, 1);
      cam.lookAt(scene.position);

      renderer.render(scene, cam);
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    // Resize handler
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', onResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(frameRef.current);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      cubes.forEach((c) => {
        if (c.geometry) c.geometry.dispose();
        if (c.material) c.material.dispose();
      });
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

export default ThreeBackground;