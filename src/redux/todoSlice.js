import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: 1, text: "Learn Redux", completed: false },
];

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.push({
        id: Date.now(),
        text: action.payload.text,
        completed: false,
        dueDate: action.payload.dueDate, 
        priority: action.payload.priority,
      });
    },

    toggleComplete: (state, action) => {
      const todo = state.find(todo => todo.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },

    deleteTodo: (state, action) => {
      return state.filter(todo => todo.id !== action.payload);
    },

    setPriority: (state, action) => {
      return state.map((todo) => {
        if (action.payload.id === todo.id) {
          return {...todo, priority: action.payload.priority}
        }
        return todo
      })
    }
  },
});

export const { 
  addTodo, 
  toggleComplete, 
  deleteTodo, 
  setPriority 
} = todoSlice.actions;
export default todoSlice.reducer;
