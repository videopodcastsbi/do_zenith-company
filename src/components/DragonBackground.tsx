import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import '../styles/DragonBackground.css';

// Reusable virtual scale material
const VirtualMaterial = () => (
  <meshStandardMaterial 
    color="#000000" 
    emissive="#D4AF37"
    emissiveIntensity={2}
    wireframe={true}
    transparent
    opacity={0.8}
  />
);

const DragonHead = ({ position, rotation }: { position: THREE.Vector3, rotation: THREE.Euler }) => {
    return (
        <group position={position} rotation={rotation}>
             {/* Cranium */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[1.2, 1, 1.5]} />
                <VirtualMaterial />
            </mesh>
            {/* Snout */}
            <mesh position={[0, -0.2, 1.2]}>
                <boxGeometry args={[0.8, 0.6, 1.2]} />
                <VirtualMaterial />
            </mesh>
            {/* Jaw */}
            <mesh position={[0, -0.6, 1.0]} rotation={[0.2, 0, 0]}>
                 <boxGeometry args={[0.7, 0.2, 1.0]} />
                 <VirtualMaterial />
            </mesh>
            {/* Horns */}
            <mesh position={[0.4, 0.5, -0.5]} rotation={[-0.5, 0, 0.2]}>
                <coneGeometry args={[0.1, 1.5, 8]} />
                <VirtualMaterial />
            </mesh>
            <mesh position={[-0.4, 0.5, -0.5]} rotation={[-0.5, 0, -0.2]}>
                <coneGeometry args={[0.1, 1.5, 8]} />
                <VirtualMaterial />
            </mesh>
            {/* Glowing Eyes */}
             <mesh position={[0.3, 0.1, 0.6]}>
                <sphereGeometry args={[0.15]} />
                <meshBasicMaterial color="#00ff00" />
            </mesh>
            <mesh position={[-0.3, 0.1, 0.6]}>
                <sphereGeometry args={[0.15]} />
                <meshBasicMaterial color="#00ff00" />
            </mesh>
        </group>
    );
};

const DragonBodySegment = ({ position, rotation, scale, index }: any) => {
    return (
        <group position={position} rotation={rotation} scale={scale}>
            <mesh>
                <octahedronGeometry args={[1, 0]} />
                <VirtualMaterial />
            </mesh>
            {/* Spines */}
            <mesh position={[0, 0.8, 0]}>
                <coneGeometry args={[0.2, 0.8, 4]} />
                <VirtualMaterial />
            </mesh>
            
            {/* Simple Wings for first few segments */}
            {index === 4 && (
                 <group>
                    <mesh position={[1.5, 0, 0]} rotation={[0, 0, -0.5]}>
                        <boxGeometry args={[3, 0.1, 1]} />
                        <VirtualMaterial />
                    </mesh>
                    <mesh position={[-1.5, 0, 0]} rotation={[0, 0, 0.5]}>
                         <boxGeometry args={[3, 0.1, 1]} />
                         <VirtualMaterial />
                    </mesh>
                 </group>
            )}
        </group>
    );
};

const MechaDragon = () => {
    // ... refs ...
    
    // Initial path state
    const segmentCount = 20; // Increased segments for longer body
    const [path, setPath] = useState(() => 
        Array.from({ length: segmentCount }).map((_, i) => ({
            position: new THREE.Vector3(0, 0, -i * 1.5),
            rotation: new THREE.Euler(0, 0, 0)
        }))
    );

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        
        // Move Head in a wider figure-8/spiral to be more visible
        const headX = Math.sin(time * 0.4) * 12; // Wider X
        const headY = Math.cos(time * 0.3) * 6;  // Taller Y
        const headZ = Math.sin(time * 0.2) * 5; 
        
        // ... rest of logic ...
        const targetPos = new THREE.Vector3(headX, headY, headZ);
        
        // Calculate rotation based on velocity (simple look-ahead)
        const dummy = new THREE.Object3D();
        dummy.position.copy(targetPos);
        dummy.lookAt(headX + Math.cos(time * 0.4), headY - Math.sin(time * 0.3), headZ);
        
        // Update paths (Follow the leader logic)
        const newPath = [...path];
        // Shift all positions down
        for (let i = newPath.length - 1; i > 0; i--) {
            // Smoother lerp
            newPath[i].position.lerp(newPath[i-1].position, 0.4); 
            newPath[i].rotation.x = newPath[i-1].rotation.x;
            newPath[i].rotation.y = newPath[i-1].rotation.y;
             newPath[i].rotation.z = newPath[i-1].rotation.z;
        }
        
        // Update head
        newPath[0].position.copy(targetPos);
        newPath[0].rotation.copy(dummy.rotation);
        
        setPath(newPath);
    });

    return (
        <group>
            <DragonHead position={path[0].position} rotation={path[0].rotation} />
            {path.slice(1).map((p, i) => {
                 const scale = 1 - (i / segmentCount) * 0.6; // Less tapering to keep it big
                 return (
                    <DragonBodySegment 
                        key={i} 
                        index={i}
                        position={p.position} 
                        rotation={p.rotation}
                        scale={[scale, scale, scale]}
                    />
                 );
            })}
        </group>
    );
};

const DragonBackground = () => {
  return (
    <div className="dragon-bg-container">
        {/* Pulled camera back from 20 to 35 to see the whole dragon */}
        <Canvas camera={{ position: [0, 0, 35], fov: 60 }}>
            {/* Darker, moodier lighting for the holograms to pop */}
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#D4AF37" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
            
            {/* Cyber Grid Floor */}
            <gridHelper args={[150, 60, "#D4AF37", "#2a2a2a"]} position={[0, -15, 0]} />
            
            <Stars radius={100} depth={50} count={8000} factor={4} saturation={0} fade speed={2} />
            
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
               <MechaDragon />
            </Float>

            <fog attach="fog" args={['#000000', 20, 90]} />
        </Canvas>
    </div>
  );
};

export default DragonBackground;
