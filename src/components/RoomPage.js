import React, { useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Room from './Room';
import ColorPicker from './ColorPicker';
import TexturePicker from './TexturePicker';
import { useLocation, useNavigate } from 'react-router-dom';
import './RoomPage.css';
import { XR} from '@react-three/xr';
import { VRButton } from '@react-three/xr';

const RoomPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const images = location.state?.images;

    const [wallColors, setWallColors] = useState({
        wall1: '#ffffff',
        wall2: '#ffffff',
        wall3: '#ffffff',
        wall4: '#ffffff',
    });

    const [floorTexture, setFloorTexture] = useState(null);

    const handleColorChange = (wall, color) => {
        setWallColors((prevColors) => ({
            ...prevColors,
            [wall]: color.hex,
        }));
    };

    const handleTextureChange = (texture) => {
        setFloorTexture(texture);
    };

    // If images are not available, redirect to the home page after rendering once
    if (!images) {
        navigate('/');
        return null; // or a loading indicator
    }

    return (
        <div className="room-page-container">
            <header>
                <h1>Customize Your Room</h1>
            </header>
            <div className="main-content">
                <div className="controls-container">
                    <div className="color-picker-container">
                        <h2>Pick Wall Colors</h2>
                        {Object.keys(wallColors).map((wall) => (
                            <ColorPicker
                                key={wall}
                                label={wall}
                                color={wallColors[wall]}
                                onChange={(color) => handleColorChange(wall, color)}
                            />
                        ))}
                    </div>
                    <div className="texture-picker-container">
                        <h2>Pick Floor Texture</h2>
                        <TexturePicker onChange={handleTextureChange} />
                    </div>
                </div>
                <div className="canvas-container">
                
                    <VRButton />
                    <Canvas>
                        <XR>
                            <CameraAndControls />
                            <Room images={images} wallColors={wallColors} floorTexture={floorTexture} />
                        </XR>
                    </Canvas>
                </div>
            </div>
        </div>
    );
};

// A separate component to handle camera and controls
const CameraAndControls = () => {
    const { camera } = useThree();

    // Set initial camera position
    camera.position.set(0, 10, 15);

    return (
        <>
            <OrbitControls
                enableZoom={true}
                enableRotate={true}
                enablePan={false}
                minPolarAngle={0}
                maxPolarAngle={Math.PI/2}
                enableDamping={true}
                dampingFactor={0.1}
                rotateSpeed={0.5}
            />
        </>
    );
};

export default RoomPage;
