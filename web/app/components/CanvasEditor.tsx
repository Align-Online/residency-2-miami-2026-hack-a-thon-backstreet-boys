"use client";

import React, { useRef, useState, useEffect } from "react";
import { Stage, Layer, Rect, Text, Transformer } from "react-konva";
import Konva from "konva";
import type { Layout } from "@/../../src/features/floorplan/types";

interface CanvasEditorProps {
    layout: Layout;
    onLayoutChange: (layout: Layout) => void;
    onExport: (dataUrl: string, fileName: string) => void;
}

export const CanvasEditor: React.FC<CanvasEditorProps> = ({
    layout,
    onLayoutChange,
    onExport,
}) => {
    const stageRef = useRef<Konva.Stage>(null);
    const transformerRef = useRef<Konva.Transformer>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const canvas = layout.canvas;
    const objects = layout.objects;

    // Update transformer when selection changes
    useEffect(() => {
        if (selectedId && stageRef.current && transformerRef.current) {
            const selectedNode = stageRef.current.findOne(`#${selectedId}`) as Konva.Rect;
            if (selectedNode) {
                transformerRef.current.nodes([selectedNode]);
                stageRef.current.batchDraw();
            }
        } else if (transformerRef.current) {
            transformerRef.current.nodes([]);
            stageRef.current?.batchDraw();
        }
    }, [selectedId]);

    // asset colors for visual distinction
    const assetColors: Record<string, string> = {
        chair: "#E8D5B7",
        "table-round": "#D4A574",
        "table-rect": "#B8956A",
        stage: "#FF6B6B",
        bar: "#FF8C42",
        "av-booth": "#6C63FF",
        "dance-floor": "#FFD700",
        "seating-lounge": "#95E1D3",
        default: "#CCCCCC",
    };

    const getColor = (type: string) => assetColors[type] || assetColors.default;
    const getStroke = (type: string) =>
        type === "dance-floor" ? "#FFB700" : "#333333";

    // handle object drag
    const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>, id: string) => {
        const newObjects = objects.map((obj) =>
            obj.id === id
                ? {
                    ...obj,
                    x: Math.max(0, e.target.x()),
                    y: Math.max(0, e.target.y()),
                }
                : obj
        );
        onLayoutChange({ ...layout, objects: newObjects });
    };

    // handle object transform (resize/rotate)
    const handleTransformEnd = (
        e: Konva.KonvaEventObject<Event>,
        id: string
    ) => {
        const node = e.target as Konva.Rect;
        const newObjects = objects.map((obj) =>
            obj.id === id
                ? {
                    ...obj,
                    x: node.x(),
                    y: node.y(),
                    w: node.width() * node.scaleX(),
                    h: node.height() * node.scaleY(),
                    rotation: node.rotation(),
                }
                : obj
        );
        onLayoutChange({ ...layout, objects: newObjects });
        node.scaleX(1);
        node.scaleY(1);
    };

    // export canvas to PNG
    const handleExport = () => {
        if (stageRef.current) {
            const dataUrl = stageRef.current.toDataURL({
                pixelRatio: 2,
                mimeType: "image/png",
            });
            onExport(dataUrl, `floor-plan-${layout.venueId}-${Date.now()}.png`);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Export button */}
            <button
                onClick={handleExport}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Export to PNG
            </button>

            {/* Canvas */}
            <div
                className="border border-gray-300 bg-gray-50 overflow-auto"
                style={{ width: "100%", height: "600px" }}
            >
                <Stage
                    ref={stageRef}
                    width={canvas.width}
                    height={canvas.height}
                    scale={{ x: 0.5, y: 0.5 }}
                >
                    <Layer>
                        {/* Background grid */}
                        <Rect
                            width={canvas.width}
                            height={canvas.height}
                            fill="#FAFAFA"
                            stroke="#E0E0E0"
                            strokeWidth={2}
                        />

                        {/* Floor objects */}
                        {objects.map((obj) => (
                            <React.Fragment key={obj.id}>
                                <Rect
                                    id={obj.id}
                                    x={obj.x}
                                    y={obj.y}
                                    width={obj.w}
                                    height={obj.h}
                                    fill={getColor(obj.type)}
                                    stroke={getStroke(obj.type)}
                                    strokeWidth={2}
                                    rotation={obj.rotation || 0}
                                    draggable
                                    onClick={() => setSelectedId(obj.id)}
                                    onDragEnd={(e) => handleDragEnd(e, obj.id)}
                                    onTransformEnd={(e) => handleTransformEnd(e, obj.id)}
                                />

                                {/* Object label */}
                                <Text
                                    x={obj.x + 5}
                                    y={obj.y + 5}
                                    text={obj.type}
                                    fontSize={12}
                                    fill="#333333"
                                    pointerEvents="none"
                                />

                                {/* Transformer for resize (only rendered once) */}
                                {selectedId === obj.id && (
                                    <Transformer
                                        ref={transformerRef}
                                        rotateEnabled={false}
                                        boundBoxFunc={(oldBox, newBox) => {
                                            if (newBox.width < 20 || newBox.height < 20) {
                                                return oldBox;
                                            }
                                            return newBox;
                                        }}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </Layer>
                </Stage>
            </div>

            {/* Info */}
            <div className="text-sm text-gray-600">
                Canvas: {canvas.width}x{canvas.height} | Objects: {objects.length} |
                {selectedId && ` Selected: ${selectedId}`}
            </div>
        </div>
    );
};
