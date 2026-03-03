/**
 * DOCK Overlay Specification
 *
 * The DOCK venue floor plan is rendered as a locked, non-selectable background layer.
 * This prevents users from accidentally moving or deleting the venue outline while allowing
 * them to place furniture and plan layouts on top of it.
 *
 * Layer behavior:
 * - DOCK appears as background (lowest z-index)
 * - Is NOT selectable (no drag/resize)
 * - Can be toggled on/off via UI
 * - Occupies the full canvas or defined venue boundaries
 * - Acts as a visual reference grid/anchor
 */

import React from "react";

interface DockOverlayProps {
    width: number;
    height: number;
    visible: boolean;
}

export const DockOverlay: React.FC<DockOverlayProps> = (props: DockOverlayProps) => {
    const { width, height, visible } = props;
    if (!visible) return null;
    return (
        <>
            {/* Grid pattern for reference (optional) - defs must be top-level inside <svg> */}
            <defs>
                <pattern id="dock-grid" width="100" height="100" patternUnits="userSpaceOnUse">
                    <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#cccccc" strokeWidth={0.5} />
                </pattern>
            </defs>

            <g id="dock-overlay" style={{ pointerEvents: "none", opacity: 0.15 }}>
                {/* Main floor boundary */}
                <rect
                    x={0}
                    y={0}
                    width={width}
                    height={height}
                    fill="none"
                    stroke="#999999"
                    strokeWidth={8}
                    rx={8}
                />

                {/* Grid fill */}
                <rect x={0} y={0} width={width} height={height} fill="url(#dock-grid)" />

                {/* Dock label */}
                <text
                    x={width / 2}
                    y={height / 2}
                    textAnchor="middle"
                    fontSize={32}
                    fill="#999999"
                    style={{ pointerEvents: "none", opacity: 0.3 }}
                >
                    The DOCK
                </text>
            </g>
        </>
    );
};
