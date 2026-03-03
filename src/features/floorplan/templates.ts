import type { FloorObject } from "./types";

export interface Template {
    id: string;
    name: string;
    description?: string;
    canvas: { width: number; height: number; scale: number };
    objects: FloorObject[];
}

// three templates for standard event layouts
export const templates: Template[] = [
    {
        id: "theater-1",
        name: "Theater - 100 Seats",
        description: "Classroom-style with stage, rows of seating, and side aisles.",
        canvas: { width: 2400, height: 1800, scale: 1 },
        objects: [
            // stage at front
            {
                id: "stage-theater",
                type: "stage",
                x: 900,
                y: 50,
                w: 600,
                h: 120,
            },
            // 10 rows of chairs (100 seats total)
            ...Array.from({ length: 100 }, (_, idx) => {
                const row = Math.floor(idx / 10);
                const col = idx % 10;
                return {
                    id: `chair-theater-${idx}`,
                    type: "chair",
                    x: 200 + col * 160,
                    y: 250 + row * 140,
                    w: 40,
                    h: 40,
                } as FloorObject;
            }),
        ],
    },
    {
        id: "banquet-1",
        name: "Banquet - 120 Guests",
        description: "12 round 10-seat tables with stage, bar, dance floor, and AV.",
        canvas: { width: 2400, height: 1800, scale: 1 },
        objects: [
            // stage
            {
                id: "stage-banquet",
                type: "stage",
                x: 200,
                y: 50,
                w: 500,
                h: 100,
            },
            // bar in corner
            {
                id: "bar-banquet",
                type: "bar",
                x: 1900,
                y: 100,
                w: 350,
                h: 80,
            },
            // AV booth
            {
                id: "av-booth-banquet",
                type: "av-booth",
                x: 2100,
                y: 1600,
                w: 80,
                h: 80,
            },
            // 12 round tables (10-seat capacity each)
            ...Array.from({ length: 12 }, (_, i) => ({
                id: `table-banquet-${i}`,
                type: "table-round",
                x: 350 + (i % 3) * 600,
                y: 300 + Math.floor(i / 3) * 400,
                w: 120,
                h: 120,
                style: { label: `Table ${i + 1}` },
            } as FloorObject)),
        ],
    },
    {
        id: "cocktail-1",
        name: "Cocktail / Standing",
        description: "Flexible layout with dance floor, bar, lounge seating, and AV.",
        canvas: { width: 2400, height: 1800, scale: 1 },
        objects: [
            // dance floor as focal point
            {
                id: "dance-floor-cocktail",
                type: "dance-floor",
                x: 750,
                y: 300,
                w: 900,
                h: 600,
            },
            // main bar
            {
                id: "bar-main-cocktail",
                type: "bar",
                x: 100,
                y: 400,
                w: 450,
                h: 100,
            },
            // secondary bar
            {
                id: "bar-secondary-cocktail",
                type: "bar",
                x: 1950,
                y: 400,
                w: 300,
                h: 80,
            },
            // AV booth
            {
                id: "av-booth-cocktail",
                type: "av-booth",
                x: 1150,
                y: 100,
                w: 100,
                h: 100,
            },
            // 4 lounge seating areas
            ...Array.from({ length: 4 }, (_, i) => ({
                id: `lounge-${i}`,
                type: "table-rect",
                x: 100 + (i % 2) * 1100,
                y: 1200 + Math.floor(i / 2) * 300,
                w: 350,
                h: 200,
                style: { label: `Lounge ${i + 1}` },
            } as FloorObject)),
        ],
    },
];
