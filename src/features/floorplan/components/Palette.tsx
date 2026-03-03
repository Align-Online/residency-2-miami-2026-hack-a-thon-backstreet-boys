import React from "react";
import type { FloorObject } from "../types";

// comprehensive palette with consistent sizing rules
// all dimensions are in canvas units (scale 1:1)
const assetDefinitions: { id: string; label: string; type: string; w: number; h: number; description?: string }[] = [
    { id: "chair", label: "Chair", type: "chair", w: 40, h: 40, description: "Individual seating" },
    { id: "table-round", label: "Round Table (10-seat)", type: "table-round", w: 120, h: 120, description: "Banquet standard" },
    { id: "table-rect", label: "Rectangular Table", type: "table-rect", w: 200, h: 80, description: "Buffet or cocktail" },
    { id: "stage", label: "Stage", type: "stage", w: 500, h: 100, description: "Performance area" },
    { id: "bar", label: "Bar", type: "bar", w: 400, h: 80, description: "Service counter" },
    { id: "av-booth", label: "AV Booth", type: "av-booth", w: 100, h: 100, description: "Sound & lighting" },
    { id: "dance-floor", label: "Dance Floor", type: "dance-floor", w: 600, h: 400, description: "Large open area" },
    { id: "seating-lounge", label: "Lounge Seating", type: "seating-lounge", w: 300, h: 200, description: "Casual lounge area" },
];

interface PaletteProps {
    onAddObject: (obj: FloorObject) => void;
}

export const Palette: React.FC<PaletteProps> = ({ onAddObject }) => {
    const handleClick = (asset: typeof assetDefinitions[0]) => {
        const newObj: FloorObject = {
            id: `${asset.id}-${Date.now()}`,
            type: asset.type,
            x: 0,
            y: 0,
            w: asset.w,
            h: asset.h,
        };
        onAddObject(newObj);
    };

    return (
        <div className="palette">
            {assetDefinitions.map((a) => (
                <button key={a.id} onClick={() => handleClick(a)}>
                    {a.label}
                </button>
            ))}
        </div>
    );
};
