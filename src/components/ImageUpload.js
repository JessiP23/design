import React, {useState} from "react";

const ImageUpload = ({ label, onUpload }) => {
    const [image, setImage] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                onUpload(label, reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleImageUpload} />
            {image && <img src={image} alt={label} width="100" />}
            {image && <span style={{color: 'green'}}>✔️</span>}
        </div>
    );
};


export default ImageUpload;