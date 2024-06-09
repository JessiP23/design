import React, { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from 'three';
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Plane } from "@react-three/drei";

const Room = ({ images, wallColors, floorTexture }) => {
    const [isContextLost, setIsContextLost ] = useState(false);
    const orbitControlsRef = useRef();
    const rendererRef = useRef();

    useEffect(() => {
        const handleContextLost = (event) => {
            event.preventDefault();
            setIsContextLost(true);
        };

        const handleContextRestored = () => {
            setIsContextLost(false);
        };

        window.addEventListener('webglcontextlost', handleContextLost, false);
        window.addEventListener('webglcontextrestored', handleContextRestored, false);

        return () => {
            window.removeEventListener('webglcontextlost', handleContextLost);
            window.removeEventListener('webglcontextrestored', handleContextRestored);
        };
    }, []);

    const calculateTargetPoint = () => {
        if (isContextLost) return null;

        const controller = orbitControlsRef.current.object;
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        // Get the mouse position relative to the canvas
        mouse.x = (controller.position.x / window.innerWidth) * 2 - 1;
        mouse.y = -(controller.position.y / window.innerHeight) * 2 + 1;

        // Ensure that the camera exists and is a perspective camera
        if (orbitControlsRef.current && orbitControlsRef.current.camera && orbitControlsRef.current.camera.isPerspectiveCamera) {
            raycaster.setFromCamera(mouse, orbitControlsRef.current.camera);

            const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
            const intersectionPoint = new THREE.Vector3();
            raycaster.ray.intersectPlane(plane, intersectionPoint);

            return intersectionPoint;
        } else {
            return new THREE.Vector3(0, 0, 0); // Return a default point if camera not available
        }
    };

    useFrame(() => {
        const target = calculateTargetPoint();
        orbitControlsRef.current.target.copy(target);
    });

    const textures = (image) => {
        const texture = new THREE.TextureLoader().load(image);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
        return texture;
    };

    const floorMaterial = useMemo(() => {
        if (floorTexture) {
            return new THREE.MeshBasicMaterial({ map: textures(floorTexture) });
        }
        return new THREE.MeshBasicMaterial({ color: '#ffffff' });
    }, [floorTexture]);

    return (
        <>
            <OrbitControls ref={orbitControlsRef} />
            <Plane args={[10, 10]} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <meshBasicMaterial attach="material" map={images.floor ? textures(images.floor) : null} />
            </Plane>
            <Plane args={[10, 10]} position={[0, 10, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <meshBasicMaterial attach="material" map={images.roof ? textures(images.roof) : null} />
            </Plane>
            <Plane args={[10, 10]} position={[5, 5, 0]} rotation={[0, -Math.PI / 2, 0]}>
                <meshBasicMaterial attach="material" color={wallColors.wall1} map={images.wall1 ? textures(images.wall1) : null} />
            </Plane>
            <Plane args={[10, 10]} position={[-5, 5, 0]} rotation={[0, Math.PI / 2, 0]}>
                <meshBasicMaterial attach="material" color={wallColors.wall2} map={images.wall2 ? textures(images.wall2) : null} />
            </Plane>
            <Plane args={[10, 10]} position={[0, 5, 5]} rotation={[0, Math.PI, 0]}>
                <meshBasicMaterial attach="material" color={wallColors.wall3} map={images.wall3 ? textures(images.wall3) : null} />
            </Plane>
            <Plane args={[10, 10]} position={[0, 5, -5]}>
                <meshBasicMaterial attach="material" color={wallColors.wall4} map={images.wall4 ? textures(images.wall4) : null} />
            </Plane>
        </>
    );
};

export default Room;
