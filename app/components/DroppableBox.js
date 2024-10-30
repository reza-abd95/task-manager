// DroppableBox.js
"use client";
import React from "react";
import { useDroppable } from "@dnd-kit/core";
import SortableItem from "./SortableItem";

export default function DroppableBox({ id, items, activeId, onDelete }) {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`p-5 border border-gray-500 rounded-lg min-h-[300px] w-[400px] shadow-md ${
        isOver ? "bg-blue-100" : "bg-white"
      }`}
    >
      <h3 className="text-xl font-semibold text-gray-700 mb-3">{id}</h3>
      {items.length === 0 ? (
        <div className="text-gray-400">No items</div>
      ) : (
        items.map((item) => (
          <SortableItem
            key={item.id}
            id={item.id}
            box={id}
            title={item.title}
            subtitles={item.subtitles}
            activeId={activeId}
            onDelete={onDelete} // ارسال تابع حذف به SortableItem
          />
        ))
      )}
    </div>
  );
}
