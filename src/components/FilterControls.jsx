import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, FILTERS } from "../redux/filtersSlice";

const FilterControls = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.filters);

  return (
    <select 
      className="bg-transparent border border rounded pl-3 pr-8 py-1 transition border-slate-900 focus:border-black hover:border-black shadow-sm focus:shadow-md appearance-none cursor-pointer"
      value={currentFilter} 
      onChange={(e) => dispatch(setFilter(e.target.value))}
    >
      <option value={FILTERS.ALL}>All</option>
      <option value={FILTERS.ACTIVE}>Active</option>
      <option value={FILTERS.COMPLETED}>Completed</option>
    </select>
  );
};

export default FilterControls;
