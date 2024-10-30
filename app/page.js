"use client";
import React from "react";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import SortableItem from "./components/SortableItem";
import DroppableBox from "./components/DroppableBox";
import useStore from "./useStore";

export default function Home() {
  const {
    items,
    newTitle,
    selectedBox,
    selectedSubtitles,
    activeId,
    setNewTitle,
    setSelectedBox,
    setSelectedSubtitles,
    addItem,
    deleteItem,
    setActiveId,
    moveItem,
  } = useStore();

  const handleDragStart = (event) => setActiveId(event.active.id);

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) {
      setActiveId(null);
      return;
    }
    const fromBox = active.data.current?.box;
    const toBox = over?.id;
    if (fromBox && toBox && fromBox !== toBox) {
      moveItem(fromBox, toBox, active.id);
    }
  
    setActiveId(null);
  };
  

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex items-center justify-center min-h-screen flex-col">
        <div className="flex flex-col w-[600px] items-center gap-4 ">
          <input
            type="text"
            placeholder="Enter title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="p-2 w-full border border-gray-300 rounded"
          />
          <div className="flex justify-between w-full">
            <div className="flex gap-2 w-3/5">
              {["HTML", "CSS", "React", "JavaScript"].map((subtitle) => (
                <button
                  key={subtitle}
                  onClick={() => setSelectedSubtitles(subtitle)}
                  className={`p-2 border border-gray-300 rounded ${
                    selectedSubtitles.includes(subtitle)
                      ? "bg-green-300"
                      : "bg-gray-200"
                  }`}
                >
                  {subtitle}
                </button>
              ))}
            </div>
            <div className="flex w-2/5 gap-1">
              <select
                value={selectedBox}
                onChange={(e) => setSelectedBox(e.target.value)}
                className="p-2 border border-gray-300 rounded w-1/2"
              >
                <option value="TODO">TODO</option>
                <option value="DOING">DOING</option>
                <option value="DONE">DONE</option>
              </select>
              <button
                onClick={addItem}
                className="p-2 bg-blue-500 text-white rounded w-1/2"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-6 mt-6">
          {Object.keys(items).map((boxId) => (
            <DroppableBox
              key={boxId}
              id={boxId}
              items={items[boxId]}
              activeId={activeId}
              onDelete={deleteItem}
            />
          ))}
        </div>
      </div>

      <DragOverlay>
        {activeId ? (
          <SortableItem
            id={activeId}
            box={null}
            title={items[Object.keys(items).find((boxId) =>
              items[boxId].some((item) => item.id === activeId)
            )]?.find((item) => item.id === activeId)?.title}
            subtitles={items[Object.keys(items).find((boxId) =>
              items[boxId].some((item) => item.id === activeId)
            )]?.find((item) => item.id === activeId)?.subtitles}
            activeId={activeId}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
