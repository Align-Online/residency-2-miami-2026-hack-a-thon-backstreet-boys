"use client";

import { useState } from "react";
import { TemplatePicker } from "./components/TemplatePicker";
import { CanvasEditor } from "./components/CanvasEditor";
import { PaletteBar } from "./components/PaletteBar";
import type { Layout } from "./lib/floorplan/types";

export default function Home() {
  const [currentLayout, setCurrentLayout] = useState<Layout | null>(null);
  const [venueId] = useState("dock");

  const handleSelectTemplate = (layout: Layout) => {
    setCurrentLayout(layout);
  };

  const handleLayoutChange = (layout: Layout) => {
    setCurrentLayout(layout);
  };

  const handleExport = (dataUrl: string, fileName: string) => {
    // trigger browser download
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = fileName;
    a.click();
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-black mb-2">Floor Plan Tool</h1>
        <p className="text-gray-600">Create professional event floor plans in minutes</p>
      </header>

      {/* Venue selector */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
        <p className="text-sm text-gray-700">
          <strong>Venue:</strong> {venueId.toUpperCase()}
        </p>
      </div>

      {!currentLayout ? (
        <>
          {/* Step 1: Template selection */}
          <TemplatePicker
            onSelectTemplate={handleSelectTemplate}
            venueId={venueId}
          />
          <p className="text-center text-gray-500 text-sm mt-8">
            Select a template to get started →
          </p>
        </>
      ) : (
        <>
          {/* Step 2: Editing */}
          <div className="mb-6">
            <button
              onClick={() => setCurrentLayout(null)}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm"
            >
              ← Back to Templates
            </button>
          </div>

          {/* Template info */}
          <div className="mb-4 p-3 bg-gray-100 rounded text-sm text-gray-700">
            <strong>Template:</strong> {currentLayout.templateId || "Custom"}
          </div>

          {/* Palette */}
          <PaletteBar layout={currentLayout} onAddObject={handleLayoutChange} />

          {/* Canvas */}
          <CanvasEditor
            layout={currentLayout}
            onLayoutChange={handleLayoutChange}
            onExport={handleExport}
          />

          {/* Export info */}
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded text-sm text-green-700">
            ✓ Ready to export! Click "Export to PNG" above to download your floor plan.
          </div>
        </>
      )}
    </div>
  );
}
