import React from "react";
import { Canvas } from "@react-three/fiber";
import { XR, VRButton, Controllers, Hands } from "@react-three/xr";
import { OrbitControls } from "@react-three/drei";
import Room from "./Room";
import { useLocation } from "react-router-dom";
import './RoomPage.css'

const RoomPage = () => {
 const location = useLocation();
 const {images} = location.state || {};

 if (!images) {
    return <div>No images provided</div>
 }

 return (
    <div className="room-page">
        <header className="room-header">
            <h1>3D Room Viewer</h1>
        </header>
        <div className="room-container">
            <VRButton />
            <Canvas>
                <XR>
                    <Controllers />
                    <Hands />
                    <ambientLight />
                    <pointLight position={[10,10,10 ]} />
                    <Room images={images} />
                    <OrbitControls />
                </XR>
            </Canvas>
        </div>
    </div>
 );
};


export default RoomPage; 