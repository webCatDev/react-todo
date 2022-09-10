import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as TodoAPI from "./todoAPI";

const initialState = {
  data: [],
  todoCounts: {
    all: 0,
    completed: 0,
    uncompleted: 0,
  },
  loading: false,
  error: "",
};

const pendingCb = (state) => {
  state.error = "";
  state.loading = true;
};

const rejectedCb = (state) => {
  state.error = "Something went wrong while receiving data.";
  state.loading = false;
};

const getCounts = (data) => {
  const all = data.length;
  const completed = data.filter((todo) => todo.isCompleted).length;
  return {
    all,
    completed,
    uncompleted: all - completed
  }
}

export const todoSlice = createSlice({
  initialState,
  name: "todos",
  reducers: {},
  extraReducers: (builder) => {
    // get todos
    builder.addCase(getTodos.pending, pendingCb);
    builder.addCase(getTodos.rejected, rejectedCb);
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.data = action.payload;
      state.todoCounts = getCounts(action.payload)
      state.loading = false;
    });

    // delete todo

    builder.addCase(deleteTodo.rejected, rejectedCb);
    builder.addCase(deleteTodo.pending, pendingCb);

    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      const todos = state.data.filter((todo) => todo.id !== action.payload.id);
      state.data = todos
      state.todoCounts = getCounts(todos)
      state.loading = false;
    });

    // add todo
    builder.addCase(addTodo.rejected, rejectedCb);
    builder.addCase(addTodo.pending, pendingCb);

    builder.addCase(addTodo.fulfilled, (state, action) => {
      const todos = [...state.data, action.payload]
      state.data = todos;
      state.todoCounts = getCounts(todos);
      state.loading = false;
    });
    // update todo
    builder.addCase(updateTodo.pending, pendingCb);
    builder.addCase(updateTodo.rejected, rejectedCb);

    builder.addCase(updateTodo.fulfilled, (state, action) => {
      const todos = [...state.data]
      const todoIndex = todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      todos[todoIndex] = action.payload;
      state.data = todos
      state.todoCounts = getCounts(todos);
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
