import { getTodos } from "../store/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";

import TodoListItem from "./TodoListItem";
import FilterButtons from "./FilterButtons";
import TodoNotifications from "./TodoNotifications";

import { Pagination, PaginationItem } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { ITEM_PER_PAGE } from "../config";

import {gsap} from 'gsap'
import Modal from "./Modal";
import { createPortal } from "react-dom";

const TodoList = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);

  const todos = useSelector((state) => state.todos);
  const [filteredTodos, setFilteredTodos] = useState(todos.data);
  const dispatch = useDispatch();

  const [active, setActive] = useState("all");
  const [isEditing, setIsEditing] = useState({ todoId: null, state: false });


  const todoListRef = useRef();
  const qsa = gsap.utils.selector(todoListRef)

   
  
  useEffect(() => {
      gsap.from(qsa(".todo-list-item"), {
        x: -20,
        opacity: 0,
        stagger: 0.1,
      });
  }, [active, page]);

  useEffect(() => {
    switch (active) {
      case "all":
        setFilteredTodos(todos.data);
        break;
      case "completed":
        setFilteredTodos(todos.data.filter((todo) => todo.isCompleted));
        break;
      case "uncompleted":
        setFilteredTodos(todos.data.filter((todo) => !todo.isCompleted));
        break;
      default:
        setFilteredTodos(todos.data);
    }
  }, [todos.data]);

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  return (
    <div className="todo-container">
      <FilterButtons
        onActive={setActive}
        todos={todos.data}
        setTodos={setFilteredTodos}
      />
      {createPortal(
        <Modal todos={todos}>
          <TodoNotifications todos={todos} />
        </Modal>, document.body
      )}
      <ul ref={todoListRef}>
        {filteredTodos
          .slice((page - 1) * ITEM_PER_PAGE, page * ITEM_PER_PAGE)
          .map((todo) => (
            <TodoListItem
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              key={todo.id}
              todo={todo}
            />
          ))}
      </ul>
      <Pagination
        page={page}
        defaultPage={1}
        count={Math.ceil(filteredTodos.length / ITEM_PER_PAGE)}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`/${item.page === 1 ? "" : `?page=${item.page}`}`}
            {...item}
          />
        )}
      />{" "}
    </div>
  );
};

export default TodoList;
