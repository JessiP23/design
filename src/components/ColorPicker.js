import React from "react";
import { SketchPicker } from "react-color";

const ColorPicker = ({label, color, onChange}) => {
    return (
        <div>
            <h4>{label}</h4>
            <SketchPicker color={color} onChange={onChange} />
        </div>
    );
};


export default ColorPicker;