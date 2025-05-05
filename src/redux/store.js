import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";
import filtersReducer from "./filtersSlice";
import sortingReducer from "./sortingSlice"; // 1️⃣
import { loadState, saveState } from "./localStorage";

const preloadedState = loadState() || { todos: [] };

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    filters: filtersReducer,
    sorting: sortingReducer, // 2️⃣
  },
  preloadedState, 
});

store.subscribe(() => {
  saveState({
    todos: store.getState().todos,
    filters: store.getState().filters,
    sorting: store.getState().sorting // 3️⃣
  });
});