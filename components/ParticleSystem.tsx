'use client';

import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
  color: string;
}

export function ParticleSystem() {
  const [particles, setParticles] = useState<Particle[]>([]);

  const createParticles = (x: number, y: number, count: number = 8) => {
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const velocity = 50 + Math.random() * 50;
      
      newParticles.push({
        id: Date.now() + i,
        x,
        y,
        tx: Math.cos(angle) * velocity,
        ty: Math.sin(angle) * velocity,
        color: ['#fbbf24', '#f59e0b', '#ef4444', '#8b5cf6'][Math.floor(Math.random() * 4)],
      });
    }
    
    setParticles(prev => [...prev, ...newParticles]);
    
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 800);
  };

  // Expose function globally for use in other components
  useEffect(() => {
    (window as any).createParticles = createParticles;
    return () => {
      delete (window as any).createParticles;
    };
  }, []);

  return (
    <>
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            background: particle.color,
            '--tx': `${particle.tx}px`,
            '--ty': `${particle.ty}px`,
          } as React.CSSProperties}
        />
      ))}
    </>
  );
}
