# Kanban Board with Drag and Drop

A Kanban board application built with **React**, **@dnd-kit**, and **zustand** for managing tasks with drag-and-drop functionality and global state handling.

## Features

- 🖱️ **Drag and Drop**: Smooth and intuitive item movement between columns.
- ➕ **Dynamic Item Addition**: Easily add items with custom titles and tags to any column.
- 🌐 **Zustand for State Management**: Efficient global state management for responsive performance.
- 🗂️ **Three Default Columns**: Organized into `TODO`, `DOING`, and `DONE`.

## Tech Stack

- **React** - for UI components and interactions
- **@dnd-kit** - for drag-and-drop functionality
- **Zustand** - for lightweight state management
- **Tailwind CSS** - for responsive styling

## Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
Install dependencies:

bash
Copy code
yarn install
Run the development server:

bash
Copy code
yarn dev
Usage
Add items: Enter a title, choose tags, and select a column to add a new item.
Drag and Drop: Move items between columns using drag-and-drop.
Delete items: Click the trash icon on an item to remove it from the board.
Folder Structure
plaintext
Copy code
.
├── components
│   ├── SortableItem.js      # Single item component with drag-and-drop
│   ├── DroppableBox.js      # Column box for holding items
├── store
│   └── useStore.js          # Zustand store for global state
└── pages
    └── Home.js              # Main Kanban board layout
Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you have any suggestions