import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const colors = {
  HTML: "bg-red-200",
  CSS: "bg-blue-200",
  JavaScript: "bg-yellow-200",
  React: "bg-green-200",
};

export default function SortableItem({ id, box, title, subtitles, activeId, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      data: { box },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || "transform 200ms ease",
    opacity: id === activeId ? 0.5 : 1,
    position: "relative",
  };

  return (
    <div ref={setNodeRef} style={style} className="p-4 m-1 border border-gray-300 rounded-lg cursor-grab relative">
      <div {...attributes} {...listeners} className="cursor-grab">
        <strong className="block text-lg font-semibold">{title}</strong>
        <div className="flex flex-wrap mt-2 gap-2">
          {subtitles?.map((subtitle) => (
            <span
              key={subtitle}
              className={`px-3 py-1 text-sm text-gray-700 ${colors[subtitle]} border border-gray-300 rounded-md`}
            >
              {subtitle}
            </span>
          ))}
        </div>
      </div>
      
      <button
        onClick={() => onDelete?.(box, id)}
        className="absolute bottom-2 right-2 text-red-600 hover:text-red-800"
      >
        🗑️
      </button>
    </div>
  );
}
