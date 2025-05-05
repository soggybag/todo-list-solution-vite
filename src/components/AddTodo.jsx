import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/todoSlice";

const AddTodo = () => {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo({ text, dueDate, priority }));
      setText("");
    }
  };

  return (
    <motion.form 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ 
        duration: 2,
        delayChildren: 0.5,
        staggerChildren: 0.3
      }}
      onSubmit={handleSubmit}
    >
      <input
        className="p-1 border-solid border rounded"
        type="text"
        value={text}
        placeholder="Task Name"
        onChange={(e) => setText(e.target.value)}
      />
      <input
      className="p-1 m-1 border-solid border rounded"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <select 
        className="bg-transparent border border rounded pl-3 pr-8 py-1 transition border-slate-900 focus:border-black hover:border-black shadow-sm focus:shadow-md appearance-none cursor-pointer"
        value={priority} 
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button 
        className="p-1 m-1 border rounded"
        type="submit"
      >Add Todo</button>
    </motion.form>
  );
};

export default AddTodo;
