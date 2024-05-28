import React from "react";

const textures = [
    { label: 'Wood', value: 'textures/wood.png' },
    { label: 'Marble', value: 'textures/marble.png' },
    { label: 'Tile', value: 'textures/tile.png' },
];

const TexturePicker = ({ onChange }) => {
    return (
        <div>
            <h4>Floor Texture</h4>
            {textures.map((texture) => (
                <button key={texture.value} onClick={() => onChange(texture.value)}>
                    {texture.label}
                </button>
            ))}
        </div>
    );
};


export default TexturePicker;