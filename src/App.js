import React, { useState } from "react";
import ImageUpload from "./components/ImageUpload";
import { useNavigate } from "react-router-dom";

const App = () => {
    const [images, setImages] = useState({
        wall1: null,
        wall2: null,
        wall3: null,
        wall4: null,
        floor: null,
        roof: null,
    });

    const navigate = useNavigate();

    const handleUploadImages = (label, image) => {
        setImages((prevImages) => ({
            ...prevImages,
            [label]: image,
        }));
    };

    const allImagesUploaded = Object.values(images).every((image) => image !== null);

    const handleSubmit = () => {
        navigate('/room', { state: { images } });
    };

    return (
        <div>
            {Object.keys(images).map((label) => (
                <ImageUpload key={label} label={label} onUpload={handleUploadImages} />
            ))}

            {allImagesUploaded && (
                <button onClick={handleSubmit}>Submit all Pictures</button>
            )}
        </div>
    );
};

export default App;
