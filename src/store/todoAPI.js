import axios from "axios";

const instance = axios.create({
  baseURL: "https://630f2db537925634188947e9.mockapi.io/todos",
});

export const getTodoList = async () => {
  const { data } = await instance.get();
  return data;
};

export const deleteTodo = async (id) => {
  const { data } = await instance.delete(`/${id}`);
  return data;
};

export const addTodo = async (todo) => {
  const { data } = await instance.post("/", { ...todo });
  return data;
};

export const updateTodo = async (id, todo) => {
  const { data } = await instance.put(`/${id}`, { ...todo });
  return data;
};
