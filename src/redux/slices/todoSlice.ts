"use client"

import {createSlice} from "@reduxjs/toolkit";

interface TodoStateInterface {
    todos: Array<Todo>;
}

const initialState: TodoStateInterface = {
    todos: []
}

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        setTodos: (state, action) => {
            state.todos = action.payload
        },
        updateTodos: (state, action) => {
            state.todos = action.payload
        }
    }
});

export const { setTodos, updateTodos } = todoSlice.actions;
export default todoSlice.reducer;
