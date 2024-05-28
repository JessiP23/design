import React, { useMemo } from "react";
import * as THREE from 'three';
import { Plane } from "@react-three/drei";

const Room = ({ images, wallColors, floorTexture }) =>{ 
    const textures = (image) => {
        const texture = new THREE.TextureLoader().load(image);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1,1);
        return texture;
    };

    const floorMaterial = useMemo(() => {
        if (floorTexture) {
            return new THREE.MeshBasicMaterial({ map: textures(floorTexture) });
        }
        return new THREE.MeshBasicMaterial({ color: '#ffffff' });
    }, [floorTexture]);

    return(
        <>
            <Plane args={[10,10]} position={[0,0,0]} rotation={[-Math.PI / 2, 0, 0]}>
                <meshBasicMaterial attach="material" map={images.floor ? textures(images.floor) : null} />
            </Plane>
            <Plane args={[10,10]} position={[0,10,0]} rotation={[Math.PI / 2, 0, 0]}>
                <meshBasicMaterial attach="material" map={images.roof ? textures(images.roof) : null} />
            </Plane>
            <Plane args={[10,10]} position={[5,5,0]} rotation={[0, -Math.PI / 2, 0]}>
                <meshBasicMaterial attach="material" color={wallColors.wall1} map={images.wall1 ? textures(images.wall1) : null} />
            </Plane>
            <Plane args={[10,10]} position={[-5,5,0]} rotation={[0,Math.PI / 2, 0]}>
                <meshBasicMaterial attach="material" color={wallColors.wall2} map={images.wall2 ? textures(images.wall2) : null} />
            </Plane>
            <Plane args={[10,10]} position={[0,5,5]} rotation={[0, Math.PI, 0]}>
                <meshBasicMaterial attach="material" color={wallColors.wall3} map={images.wall3 ? textures(images.wall3) : null} />
            </Plane>
            <Plane args={[10,10]} position={[0,5,-5]}>
                <meshBasicMaterial attach="material" color={wallColors.wall4} map={images.wall4 ? textures(images.wall4) : null} />
            </Plane>
        </>
    );
};

export default Room;
