import React, { useState } from "react";
import ImageUpload from "./components/ImageUpload";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

    const handleSubmit = async () => {
        try{
            const formData = new FormData();
            for (const [label, image] of Object.entries(images)) {
                formData.append('files', dataURItoBlob(image), `${label}.png`);
            }
            formData.append("promp", 'Your prompt text here');

            const response = await axios.post("http://localhost:8000/api/upload/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            navigate('/room', { state: { images, results: response.data } });
        } catch(error) {
            console.error("Error uploading images:", error);
        }
    };

    const dataURItoBlob = (dataURI) => {
        const byteString = atob(dataURI.split(",")[1]);
        const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
        
    }


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
