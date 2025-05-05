import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { toggleComplete, deleteTodo, setPriority } from "../redux/todoSlice";
import { FILTERS } from "../redux/filtersSlice"; 
import { SORTING } from "../redux/sortingSlice";
import clsx from "clsx";

const priority = {
  'Low': 'bg-yellow-100',
  'Medium': 'bg-orange-100',
  'High': 'bg-red-100'
}

const priorityOrder = {
  Low: 1, 
  Medium: 2, 
  High: 3
}

const TodoList = () => {
  const todos = useSelector((state) => state.todos)
  const filter = useSelector((state) => state.filters)
  const sorting = useSelector((state) => state.sorting)
  const dispatch = useDispatch()
  const [pendingDeleteId, setPendingDeleteId] = useState(null)

  const handleDelete = (id) => {
    setPendingDeleteId(id)
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === FILTERS.ACTIVE) return !todo.completed
    if (filter === FILTERS.COMPLETED) return todo.completed
    return true;
  });

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sorting === SORTING.NEWEST_FIRST) return b.id - a.id;
    if (sorting === SORTING.OLDEST_FIRST) return a.id - b.id;
    if (sorting === SORTING.COMPLETED_FIRST) return b.completed - a.completed;
    if (sorting === SORTING.PRIORITY) return priorityOrder[b.priority] - priorityOrder[a.priority]    
    return 0;
  });

  console.log('Filtered Todos: ', filteredTodos)
  console.log('Sorted Todos:', sortedTodos)

  const displayTodos = sortedTodos.filter(todo => todo.id !== pendingDeleteId)

  return (
    <motion.ul className="p-1 m-1 flex flex-col">
      <AnimatePresence
        mode="popLayout"
        onExitComplete={() => {
          if (pendingDeleteId !== null) {
            dispatch(deleteTodo(pendingDeleteId))
            setPendingDeleteId(null)
          }
        }}
      >
        {displayTodos.map((todo) => (
          <motion.li
            className={clsx("p-3 m-1 flex rounded justify-between items-center relative", priority[todo.priority])}
            key={todo.id}
            layout
            layoutId={`todo-${todo.id}`}
            variants={itemVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >

            <input
              // Notice appearance-none this removes the default appearance. We will draw the check mark with SVG, below.
              // Notice hover:bg-green1-100 and hover:checked:bg-green-500
              className="appearance-none hover:bg-green-100 hover:checked:bg-green-500 relative peer w-6 h-6 border rounded mr-3 bg-white/70 checked:bg-green-300"
              type="checkbox"
              checked={todo.completed}
              id={todo.id}
              onChange={() => dispatch(toggleComplete(todo.id))}
            />

            <label
              className=""
              htmlFor={todo.id}
            >{todo.text} <span>{todo.dueDate}</span></label>

            <svg
              // This SVG draws the check mark
              // Had to hack the position, this is absolute
              // https://boxy-svg.com use this to create SVG images
              className="pointer-events-none w-4 h-4 mt-1 left-4 top-[0.85rem] absolute hidden peer-checked:block"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>

            <select 
              // appearance-none allows us to customize the appearance of the select menu!
              className="bg-white/70 placeholder:text-slate-400 border ml-auto border rounded pl-3 pr-8 transition duration-300 ease focus:outline-none hover:bg-white shadow-sm focus:shadow-md appearance-none cursor-pointer"
              value={todo.priority} 
              onChange={(e) => {
                dispatch(setPriority({ id: todo.id, priority: e.target.value }))
              }}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            
            <button 
              className="ml-1 border rounded text-xs p-1 flex center bg-white relative peer cursor-pointer hover:bg-red-300"
              onClick={() => handleDelete(todo.id)}
            >

            <svg 
              // This is the X in the delete button. 
              className=""
              width="16px" height="16px" viewBox="0 0 20 20" version="1.1" 
              xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <g id="Page-1" stroke="none" stroke-width="2" fill="none" fill-rule="evenodd" stroke-linecap="round">
                <g id="Custom-Preset" transform="translate(-2.000000, -2.000000)" stroke="#000000" stroke-width="4">
                  <line x1="3.5" y1="3.5" x2="20.5" y2="20.5" id="Line"></line>
                  <line x1="20.5" y1="3.5" x2="3.5" y2="20.5" id="Line-2"></line>
                </g>
              </g>
            </svg>

            </button>

          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};

export default TodoList;

