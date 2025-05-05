import { createSlice } from "@reduxjs/toolkit";

export const SORTING = {
  NEWEST_FIRST: "newest",
  OLDEST_FIRST: "oldest",
  COMPLETED_FIRST: "completed",
  PRIORITY: 'PRIORITY'
};

const sortingSlice = createSlice({
  name: "sorting",
  initialState: SORTING.NEWEST_FIRST,
  reducers: {
    setSorting: (state, action) => action.payload,
  },
});

export const { setSorting } = sortingSlice.actions;
export default sortingSlice.reducer;
