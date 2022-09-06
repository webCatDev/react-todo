import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as TodoAPI from "./todoAPI";

const initialState = {
  data: [],
  loading: false,
  error: "",
};

export const todoSlice = createSlice({
  initialState,
  name: "todos",
  reducers: {},
  extraReducers: (builder) => {
    // get todos
    builder.addCase(getTodos.pending, (state, action) => {
      state.error = "";
      state.loading = true;
    });
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(getTodos.rejected, (state, action) => {
      state.error = "Something went wrong while receiving data.";
      state.loading = false;
    });

    // delete todo

    builder.addCase(deleteTodo.pending, (state, action) => {
      state.error = "";
      state.loading = true;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.data = state.data.filter((todo) => todo.id !== action.payload.id);
      state.loading = false;
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.error = "Something went wrong while receiving data.";
      state.loading = false;
    });

    // add todo
    builder.addCase(addTodo.pending, (state, action) => {
      state.error = "";
      state.loading = true;
    });
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.data = [...state.data, action.payload];
      state.loading = false;
    });
    builder.addCase(addTodo.rejected, (state, action) => {
      state.error = "Something went wrong while receiving data.";
      state.loading = false;
    });
    // update todo
    builder.addCase(updateTodo.pending, (state, action) => {
      state.error = "";
      state.loading = true;
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      const todoIndex = state.data.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.data[todoIndex] = action.payload;
      state.loading = false;
    });
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.error = "Something went wrong while receiving data.";
      state.loading = false;
    });
  },
});

export const getTodos = createAsyncThunk(
  "getTodos",
  async () => await TodoAPI.getTodoList()
);

export const deleteTodo = createAsyncThunk(
  "deleteTodo",
  async (todoId) => await TodoAPI.deleteTodo(todoId)
);

export const addTodo = createAsyncThunk(
  "addTodo",
  async (todo) => await TodoAPI.addTodo(todo)
);

export const updateTodo = createAsyncThunk(
  "updateTodo",
  async ({ todoId, todo }) => {
    const updated = await TodoAPI.updateTodo(todoId, todo);
    console.log(updated);
    return updated;
  }
);
