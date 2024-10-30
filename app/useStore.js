import {create }from "zustand";

const useStore = create((set) => ({
  items: { TODO: [], DOING: [], DONE: [] },
  newTitle: "",
  selectedBox: "TODO",
  selectedSubtitles: [],
  activeId: null,

  setNewTitle: (title) => set({ newTitle: title }),
  setSelectedBox: (box) => set({ selectedBox: box }),
  setSelectedSubtitles: (subtitle) =>
    set((state) => ({
      selectedSubtitles: state.selectedSubtitles.includes(subtitle)
        ? state.selectedSubtitles.filter((item) => item !== subtitle)
        : [...state.selectedSubtitles, subtitle],
    })),
  addItem: () =>
    set((state) => {
      if (!state.newTitle) return state;

      const newItem = {
        id: `${state.newTitle}-${Date.now()}`,
        title: state.newTitle,
        subtitles: state.selectedSubtitles,
      };

      return {
        ...state,
        items: {
          ...state.items,
          [state.selectedBox]: [...state.items[state.selectedBox], newItem],
        },
        newTitle: "",
        selectedSubtitles: [],
      };
    }),
  deleteItem: (boxId, itemId) =>
    set((state) => ({
      items: {
        ...state.items,
        [boxId]: state.items[boxId].filter((item) => item.id !== itemId),
      },
    })),
  setActiveId: (id) => set({ activeId: id }),
  moveItem: (fromBox, toBox, itemId) =>
    set((state) => {
      const itemToMove = state.items[fromBox].find((item) => item.id === itemId);
      const fromItems = state.items[fromBox].filter((item) => item.id !== itemId);
      const toItems = [...state.items[toBox], itemToMove];

      return {
        items: {
          ...state.items,
          [fromBox]: fromItems,
          [toBox]: toItems,
        },
        activeId: null,
      };
    }),
}));

export default useStore;
