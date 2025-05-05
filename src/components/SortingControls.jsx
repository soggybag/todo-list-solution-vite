import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSorting, SORTING } from "../redux/sortingSlice";

const SortingControls = () => {
  const dispatch = useDispatch();
  const currentSorting = useSelector((state) => state.sorting);

  return (
    <select 
      className="bg-transparent border border rounded pl-3 pr-8 py-1 ml-1 transition border-slate-900 focus:border-black hover:border-black shadow-sm focus:shadow-md appearance-none cursor-pointer"
      value={currentSorting} 
      onChange={(e) => dispatch(setSorting(e.target.value))}
    >
      <option value={SORTING.NEWEST_FIRST}>Newest First</option>
      <option value={SORTING.OLDEST_FIRST}>Oldest First</option>
      <option value={SORTING.COMPLETED_FIRST}>Completed First</option>
      <option value={SORTING.PRIORITY}>Priority</option>
    </select>
  );
};

export default SortingControls;