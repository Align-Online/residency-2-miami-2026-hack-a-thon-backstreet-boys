// Shared types for the floor‑plan domain

export interface FloorObject {
    id: string;               // unique identifier (uuid, etc.)
    type: string;             // e.g. "round-table", "chair", "stage"
    x: number;                // canvas coordinate
    y: number;                // canvas coordinate
    w: number;                // width (in canvas units)
    h: number;                // height (in canvas units)
    rotation?: number;        // degrees clockwise (optional)
    style?: Record<string, any>; // extra style properties (color, label, etc.)
}

export interface CanvasSettings {
    width: number;
    height: number;
    scale: number;
}

export interface LayoutMetadata {
    createdBy: string;
    createdAt: string; // ISO timestamp
    notes?: string;
}

export interface Layout {
    id: string;
    venueId: string;          // e.g. "dock" or other venue slug
    templateId?: string;
    canvas: CanvasSettings;
    objects: FloorObject[];
    metadata: LayoutMetadata;
}
