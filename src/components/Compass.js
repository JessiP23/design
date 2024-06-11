import React, { useEffect, useRef } from "react";
import * as THREE from 'three';
import { Text } from "@react-three/drei";
import { Svg } from "@react-three/drei";

Math.degrees = function(radians) {
    return radians * (180 / Math.PI);
}

const Compass = ({ camera }) => {
  const compassRef = useRef();

  useEffect(() => {
    const updateCompassRotation = () => {
      const dir = new THREE.Vector3();
      const sph = new THREE.Spherical();
      camera.getWorldDirection(dir);
      sph.setFromVector3(dir);
      compassRef.current.style.transform = `rotate(${Math.degrees(sph.theta) - 180}deg)`;
    };

    updateCompassRotation();

    camera.addEventListener('cameraChange', updateCompassRotation);

    return () => {
      camera.removeEventListener('cameraChange', updateCompassRotation);
    };
  }, [camera]);

  return (
    <div
      id="compassContainer"
      style={{
        position: 'absolute',
        top: '10px', // Adjust positioning as needed
        left: '10px', // Adjust positioning as needed
        zIndex: '1000', // Ensure it's above other elements
      }}
    >
      <Svg
        version="1.1"
        id="compass"
        width="200" // Adjust size as needed
        height="200" // Adjust size as needed
        viewBox="0 0 200 200"
        ref={compassRef}
      >
        {/* Compass path */}

            <path fillRule="evenodd" clipRule="evenodd" fill="#575756" d="M162.312,118.21l-24.773,4.063c-0.41,7.021-2.08,13.585-4.961,19.679c-2.871,6.094-6.787,11.466-11.581,16.075c-4.717,4.609-10.233,8.359-16.542,11.173c-6.239,2.891-12.87,4.443-19.988,4.922l-2.881,23.341l-3.906-23.341c-7.509-0.479-14.471-2.031-20.779-4.922c-6.318-2.813-11.757-6.642-16.386-11.251c-4.638-4.678-8.388-10.147-11.269-16.31c-2.792-6.172-4.472-12.735-4.873-19.835L0,118.21l24.373-3.115c0.4-7.032,2.08-13.595,4.873-19.679c2.881-6.085,6.63-11.476,11.347-16.085c4.717-4.61,10.234-8.282,16.542-11.085c6.318-2.725,13.192-4.375,20.545-4.766l3.906-23.966l3.125,23.741c7.108,0.469,13.749,2.109,19.979,4.912c6.23,2.813,11.747,6.631,16.464,11.241c4.716,4.688,8.554,10.078,11.425,16.163c2.881,6.162,4.551,12.646,4.961,19.522L162.312,118.21L162.312,118.21z M62.007,73.627c-6.22,3.126-11.581,6.798-15.976,11.017c-4.482,4.219-8.065,9.141-10.868,14.825L58.901,109l0.879-1.406L46.832,84.409L71.84,96.666l0.566-0.234L62.007,73.627L62.007,73.627z M58.901,129.372l-0.4-1.016l-23.495,9.142c5.351,12.021,13.974,20.763,25.809,25.997l10.556-22.56l-1.045-0.391l-23.495,12.169L58.901,129.372L58.901,129.372z M126.992,100.104c-5.204-11.554-13.427-19.991-24.783-25.461l-11.024,22.18l1.191,0.859l23.338-13.272l-12.47,24.044c0.254,0.234,0.488,0.469,0.645,0.781c0.078,0.234,0.322,0.625,0.566,1.016L126.992,100.104L126.992,100.104z M90.94,140.779c-0.156,0.078-0.557,0.156-1.191,0.156l11.415,22.56c11.123-5.156,19.511-13.429,25.184-24.747l-22.693-9.767l-0.645,0.781l12.704,22.951L90.94,140.779L90.94,140.779z M91.34,118.366c0-2.725-0.879-4.913-2.793-6.71c-1.835-1.719-4.159-2.656-6.962-2.656c-2.871,0-5.341,0.938-7.343,2.656c-2.08,1.797-3.037,3.985-3.037,6.71c0,2.891,0.957,5.313,3.037,7.412c2.002,2.109,4.472,3.203,7.343,3.203c2.803,0,5.127-1.094,6.962-3.203C90.461,123.679,91.34,121.257,91.34,118.366L91.34,118.366z" />
            {/* North text */}
            <Text transform="matrix(1 0 0 1 77 68.681)" fill="#FFFFFF">N</Text>
            {/* South text */}
            <Text transform="matrix(1 0 0 1 77 177)" fill="#FFFFFF">S</Text>
            {/* West text */}
            <Text transform="matrix(1 0 0 1 13 118)" fill="#FFFFFF">W</Text>
            {/* East text */}
            <Text transform="matrix(1 0 0 1 140 118)" fill="#FFFFFF">E</Text>
      </Svg>
    </div>
  );
};

export default Compass;

