import React, {useState} from "react";
import ImageUpload from "./components/ImageUpload";
import { Canvas } from "@react-three/fiber";
import { XR, VRButton, Controllers, Hands } from "@react-three/xr";
import { OrbitControls } from "@react-three/drei";
import Room from "./components/Room";

const App = () => {
  const [images, setImages] = useState({
    wall1: null,
    wall2: null,
    wall3: null,
    wall4: null, 
    floor: null,
    roof: null,
  });

  const handleUploadImages = (label, image) => {
    setImages((prevImages) => ({
      ...prevImages,
      [label]: image,
    }));
  };

  const allImagesUploaded = Object.values(images).every((image) => image !== null)

  return (
    <div>
      {Object.keys(images).map((label) => (
        <ImageUpload key={label} label={label} onUpload={handleUploadImages} />
      ))}

      {allImagesUploaded && (
        <button onClick={() => console.log("Submit all pages")}>Submit all Pictures</button>
      )}

      <VRButton />
      <Canvas>
        <XR>
          <Controllers />
          <Hands />
          <ambientLight />
          <pointLight position={[10,10,10]} />
          {allImagesUploaded && <Room images={images} />}
          <OrbitControls />
        </XR>
      </Canvas>
    </div>
  );
};

export default App;