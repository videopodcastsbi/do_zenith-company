import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Sparkles, Torus } from '@react-three/drei';
import * as THREE from 'three';
import '../styles/DragonBackground.css';

// --- MATERIALS ---
const MaterialArmor = ({ color = "#111" }) => (
    <meshStandardMaterial color={color} metalness={1} roughness={0.2} envMapIntensity={1.5} />
);
const MaterialGold = () => (
    <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.1} emissive="#B8860B" emissiveIntensity={0.4} />
);
const MaterialEnergy = ({ color = "#00ffff" }) => (
    <meshBasicMaterial color={color} />
);

// --- PARTS ---
const UltimateHead = () => (
    <group position={[0, 2.8, 0]}>
        {/* Crest */}
        <mesh position={[0, 0.6, 0]}>
             <coneGeometry args={[0.1, 1, 4]} />
             <MaterialGold />
        </mesh>
        {/* V-Fin */}
        <group position={[0, 0.2, 0.4]}>
            <mesh rotation={[0, 0, 0.8]} position={[0.4, 0.4, 0]}>
                <boxGeometry args={[0.05, 1.2, 0.05]} />
                <MaterialGold />
            </mesh>
            <mesh rotation={[0, 0, -0.8]} position={[-0.4, 0.4, 0]}>
                <boxGeometry args={[0.05, 1.2, 0.05]} />
                <MaterialGold />
            </mesh>
        </group>
        {/* Helmet */}
        <mesh>
            <dodecahedronGeometry args={[0.6]} />
            <MaterialArmor color="#1a1a1a" />
        </mesh>
        {/* Eyes */}
        <mesh position={[0, 0, 0.5]}>
            <boxGeometry args={[0.4, 0.1, 0.1]} />
            <MaterialEnergy color="#00ff00" />
        </mesh>
    </group>
);

const UltimateTorso = () => (
    <group position={[0, 1, 0]}>
        {/* Chest Plate */}
        <mesh position={[0, 1, 0.2]}>
             <cylinderGeometry args={[1.2, 0.6, 1.2, 5]} />
             <MaterialArmor color="#0a0a0a" />
        </mesh>
        {/* Reactor */}
        <mesh position={[0, 1, 0.8]} rotation={[1.57, 0, 0]}>
             <torusGeometry args={[0.3, 0.05, 16, 32]} />
             <MaterialGold />
        </mesh>
        <mesh position={[0, 1, 0.75]}>
             <sphereGeometry args={[0.25]} />
             <MaterialEnergy color="#00ffff" />
        </mesh>
        {/* Ribs/Abdomen */}
        <mesh position={[0, 0, 0]}>
             <cylinderGeometry args={[0.5, 0.5, 1, 8]} />
             <MaterialArmor color="#222" />
        </mesh>
    </group>
);

const HugeShoulder = ({ align }: { align: 'left' | 'right' }) => {
    const m = align === 'left' ? -1 : 1;
    return (
        <group position={[1.8 * m, 2, 0]}>
             <mesh rotation={[0, 0, 0.3 * m]}>
                 <boxGeometry args={[1.5, 1.2, 1.2]} />
                 <MaterialArmor color="#111" />
             </mesh>
             <mesh position={[0.5 * m, 0.5, 0]} rotation={[0, 0, -0.5 * m]}>
                 <coneGeometry args={[0.2, 1.5, 4]} />
                 <MaterialGold />
             </mesh>
             <mesh position={[0, 0, 0.6]}>
                 <circleGeometry args={[0.4, 6]} />
                 <MaterialEnergy color="#FFD700" />
             </mesh>
        </group>
    );
};

const UltimateArm = ({ side }: { side: 'left' | 'right' }) => {
    const groupRef = useRef<THREE.Group>(null);
    const m = side === 'left' ? -1 : 1;
    
    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        if(groupRef.current) {
            groupRef.current.rotation.x = Math.sin(t * 0.5 + (side==='left'?0:2)) * 0.1;
            groupRef.current.rotation.z = 0.2 * m + Math.sin(t * 0.3) * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
             <HugeShoulder align={side} />
             <group position={[1.8 * m, 1.5, 0]}>
                 <mesh position={[0, -1, 0]}>
                     <cylinderGeometry args={[0.3, 0.2, 1.5]} />
                     <MaterialArmor color="#222" />
                 </mesh>
                 {/* Gauntlet */}
                 <mesh position={[0, -2, 0]}>
                     <boxGeometry args={[0.6, 1.2, 0.6]} />
                     <MaterialArmor color="#111" />
                 </mesh>
                 {/* Energy Claws */}
                 <mesh position={[0, -2.8, 0]}>
                      <cylinderGeometry args={[0.02, 0.3, 1]} />
                      <MaterialEnergy color="#D4AF37" />
                 </mesh>
             </group>
        </group>
    );
};

const DivineHalo = () => {
    const ref = useRef<THREE.Group>(null);
    useFrame(() => {
        if(ref.current) ref.current.rotation.z -= 0.01;
    });
    return (
        <group ref={ref} position={[0, 2, -1]}>
             <Torus args={[3, 0.1, 16, 100]} >
                 <MaterialEnergy color="#FFD700" />
             </Torus>
             <mesh rotation={[0, 0, 0.78]}>
                 <boxGeometry args={[5, 0.1, 0.1]} />
                 <MaterialEnergy color="#FFD700" />
             </mesh>
             <mesh rotation={[0, 0, -0.78]}>
                 <boxGeometry args={[5, 0.1, 0.1]} />
                 <MaterialEnergy color="#FFD700" />
             </mesh>
        </group>
    );
}

const Wings = () => (
    <group position={[0, 1.5, -0.8]}>
         {[1, -1].map((side) => (
             <group key={side} rotation={[0, 0, side * 0.4]}>
                 <mesh position={[side * 2.5, 1, 0]}>
                     <boxGeometry args={[5, 0.2, 1]} />
                     <MaterialArmor color="#000" />
                 </mesh>
                 {/* Energy Feathers */}
                 {[0, 1, 2, 3].map((i) => (
                     <mesh key={i} position={[side * (1 + i * 0.8), -1 - i * 0.5, 0]} rotation={[0, 0, side * 0.5]}>
                         <boxGeometry args={[0.5, 3, 0.1]} />
                         <MaterialEnergy color="#00ffff" />
                     </mesh>
                 ))}
             </group>
         ))}
    </group>
);

const UltimateRobot = () => {
    const ref = useRef<THREE.Group>(null);
    useFrame(({ clock }) => {
        if(ref.current) ref.current.position.y = Math.sin(clock.getElapsedTime()) * 0.5 - 2; // Hover with offset
    });

    return (
         <group ref={ref} scale={[1, 1, 1]}>
             <DivineHalo />
             <UltimateHead />
             <UltimateTorso />
             <UltimateArm side="left" />
             <UltimateArm side="right" />
             <Wings />
             
             {/* Skirt Armor */}
             <group position={[0, -1, 0]}>
                 <mesh>
                     <coneGeometry args={[1.5, 2, 6]} />
                     <MaterialArmor color="#111" />
                 </mesh>
                 <mesh position={[0, -0.5, 1]} rotation={[-0.2, 0, 0]}>
                     <boxGeometry args={[1, 2, 0.2]} />
                     <MaterialGold />
                 </mesh>
             </group>
         </group>
    );
};

const RobotBackground = () => {
  return (
    <div className="dragon-bg-container">
        <Canvas camera={{ position: [0, 0, 14], fov: 60 }}>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={2} color="#00ffff" />
            <pointLight position={[-10, 5, 5]} intensity={2} color="#FFD700" />
            <spotLight position={[0, 10, 0]} intensity={1} angle={0.5} penumbra={1} color="#ffffff" />
            
            <Stars radius={100} depth={50} count={6000} factor={4} saturation={0} fade speed={1} />
            <Sparkles count={200} scale={15} size={3} speed={0.4} opacity={0.6} color="#FFD700" />

            <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
                 {/* Lower Group to frame text */}
                <group position={[0, -1.5, 0]}> 
                    <UltimateRobot />
                </group>
            </Float>

            <fog attach="fog" args={['#000000', 5, 35]} />
            <gridHelper args={[100, 40, "#D4AF37", "#111"]} position={[0, -8, 0]} />
        </Canvas>
    </div>
  );
};

export default RobotBackground;

