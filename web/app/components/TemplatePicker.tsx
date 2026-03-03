"use client";

import React from "react";
import { templates } from "@/../../src/features/floorplan/templates";
import type { Layout } from "@/../../src/features/floorplan/types";

interface TemplatePickerProps {
    onSelectTemplate: (layout: Layout) => void;
    venueId: string;
}

export const TemplatePicker: React.FC<TemplatePickerProps> = ({
    onSelectTemplate,
    venueId,
}) => {
    const handleSelectTemplate = (templateId: string) => {
        const template = templates.find((t) => t.id === templateId);
        if (!template) return;

        const timestamp = new Date();
        const layout: Layout = {
            id: `layout-${timestamp.getTime()}`,
            venueId,
            templateId,
            canvas: template.canvas,
            objects: template.objects.map((obj, idx) => ({
                ...obj,
                id: `${obj.id}-${idx}`, // ensure unique IDs
            })),
            metadata: {
                createdBy: "demo-user",
                createdAt: timestamp.toISOString(),
                notes: `Created from template: ${template.name}`,
            },
        };

        onSelectTemplate(layout);
    };

    return (
        <div className="p-4 bg-white border border-gray-300 rounded mb-4">
            <h2 className="text-lg font-semibold mb-4">Select a Template</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {templates.map((template) => (
                    <button
                        key={template.id}
                        onClick={() => handleSelectTemplate(template.id)}
                        className="p-4 border border-gray-300 rounded hover:bg-blue-50 transition text-left"
                    >
                        <h3 className="font-semibold text-black">{template.name}</h3>
                        {template.description && (
                            <p className="text-sm text-gray-600 mt-2">{template.description}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-2">
                            {template.objects.length} objects
                        </p>
                    </button>
                ))}
            </div>
        </div>
    );
};
