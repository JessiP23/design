import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { XR, VRButton, Controllers, Hands } from '@react-three/xr';
import { OrbitControls } from '@react-three/drei';
import Room from './Room';
import ColorPicker from './ColorPicker';
import TexturePicker from './TexturePicker';
import { useLocation, useNavigate } from 'react-router-dom';
import './RoomPage.css';

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
                </div>
                <div className="canvas-container">
                    <div className="texture-picker-container">
                        <h2>Pick Floor Texture</h2>
                        <TexturePicker onChange={handleTextureChange} />
                    </div>
                    <VRButton />
                    <Canvas>
                        <XR>
                            <OrbitControls maxPolarAngle={Math.PI / 2} minDistance={15} maxDistance={30} />
                            <Controllers />
                            <Hands />
                            <Room images={images} wallColors={wallColors} floorTexture={floorTexture} />
                        </XR>
                    </Canvas>
                </div>
            </div>
        </div>
    );
};

export default RoomPage;
