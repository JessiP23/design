import React from "react";
import { useTexture } from "@react-three/drei";

const Room = ({ images }) =>{ 
    const textures = useTexture({
        wall1: images.wall1,
        wall2: images.wall2,
        wall3: images.wall3,
        wall4: images.wall4,
        floor: images.floor,
        roof: images.roof,
    });

    return(
        <group>
            {/*wall 1 */}
            <mesh position={[0,2,-5]}>
                <planeGeometry args={[10,4]} />
                <meshBasicMaterial map={textures.wall1} />
            </mesh>

            {/*wall 2 */}
            <mesh position={[-5,2,0]} rotation={[0, Math.PI / 2, 0]}>
                <planeGeometry args={[10,4]} />
                <meshBasicMaterial map={textures.wall2} />
            </mesh>

            {/*wall 3 */}
            <mesh position={[0, 2, 5]} rotation={[0, Math.PI, 0]}>
                <planeGeometry args={[10,4]} />
                <meshBasicMaterial map={textures.wall3} />
            </mesh>

            {/*wall 4 */}
            <mesh position={[5,2,0]} rotation={[0, -Math.PI / 2, 0]}>
                <planeGeometry args={[10,4]} />
                <meshBasicMaterial map={textures.wall4} />
            </mesh>

            {/*Floor */}
            <mesh position={[0,0,0]} rotation={[Math.PI / 2, 0, 0]}>
                <planeGeometry args={[10,10]} />
                <meshBasicMaterial map={textures.floor} />
            </mesh>

            {/*Roof */}
            <mesh position={[0, 4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[10,10]} />
                <meshBasicMaterial map={textures.roof} />
            </mesh>
        </group>
    );
};

export default Room;