"use client";

import React from "react";
import type { Layout } from "@/../../src/features/floorplan/types";

interface PaletteBarProps {
    layout: Layout;
    onAddObject: (layout: Layout) => void;
}

// palette with consistent sizing
const assetDefinitions = [
    { id: "chair", label: "Chair", type: "chair", w: 40, h: 40 },
    { id: "table-round", label: "Round Table", type: "table-round", w: 120, h: 120 },
    { id: "table-rect", label: "Rectangular Table", type: "table-rect", w: 200, h: 80 },
    { id: "stage", label: "Stage", type: "stage", w: 500, h: 100 },
    { id: "bar", label: "Bar", type: "bar", w: 400, h: 80 },
    { id: "av-booth", label: "AV Booth", type: "av-booth", w: 100, h: 100 },
    { id: "dance-floor", label: "Dance Floor", type: "dance-floor", w: 600, h: 400 },
    { id: "seating-lounge", label: "Lounge Seating", type: "seating-lounge", w: 300, h: 200 },
];

export const PaletteBar: React.FC<PaletteBarProps> = ({ layout, onAddObject }) => {
    const handleAddAsset = (asset: (typeof assetDefinitions)[0]) => {
        // place new object at canvas center
        const centerX = (layout.canvas.width / 2) - (asset.w / 2);
        const centerY = (layout.canvas.height / 2) - (asset.h / 2);

        const newObject: typeof layout.objects[0] = {
            id: `${asset.id}-${layout.objects.length}`,
            type: asset.type,
            x: Math.max(0, centerX),
            y: Math.max(0, centerY),
            w: asset.w,
            h: asset.h,
        };

        const updatedLayout: Layout = {
            ...layout,
            objects: [...layout.objects, newObject],
        };

        onAddObject(updatedLayout);
    };

    return (
        <div className="p-4 bg-white border border-gray-300 rounded mb-4">
            <h2 className="text-lg font-semibold mb-4">Palette</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {assetDefinitions.map((asset) => (
                    <button
                        key={asset.id}
                        onClick={() => handleAddAsset(asset)}
                        className="px-3 py-2 bg-gray-50 border border-gray-300 rounded hover:bg-blue-50 transition text-sm text-gray-700 font-medium"
                    >
                        {asset.label}
                    </button>
                ))}
            </div>
        </div>
    );
};
