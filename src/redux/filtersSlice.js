import { createSlice } from "@reduxjs/toolkit";

export const FILTERS = {
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState: FILTERS.ALL,
  reducers: {
    setFilter: (state, action) => action.payload,
  },
});

export const { setFilter } = filtersSlice.actions;
export default filtersSlice.reducer;