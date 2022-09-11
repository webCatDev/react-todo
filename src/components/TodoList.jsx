import { getTodos } from '../store/todoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef, useMemo } from 'react';

import TodoListItem from './TodoListItem';
import FilterButtons from './FilterButtons';

import { Pagination, PaginationItem } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ITEM_PER_PAGE } from '../config';

import { gsap } from 'gsap';

const TodoList = () => {
  const { todoCounts, data: todos } = useSelector(state => state.todos);

  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);

  const [filteredTodos, setFilteredTodos] = useState(todos);
  const dispatch = useDispatch();

  const { activeTab } = useSelector(state => state.ui);
  const [isEditing, setIsEditing] = useState({ todoId: null, state: false });

  const todoListRef = useRef();
  const qsa = useMemo(() => gsap.utils.selector(todoListRef), [todoListRef]);

  useEffect(() => {
    const elements = qsa('.todo-list-item')
    if (elements.length) {
      gsap.from(elements, {
        x: -20,
        opacity: 0,
        stagger: 0.1,
      });
    }
  }, [activeTab, page, qsa]);

  useEffect(() => {
    switch (activeTab) {
      case 'all':
        setFilteredTodos(todos);
        break;
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.isCompleted));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => !todo.isCompleted));
        break;
      default:
        setFilteredTodos(todos);
    }
  }, [todos, activeTab]);

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const handlePageTransitionOnDelete = () => {
    if ((todoCounts[activeTab] - 1) % ITEM_PER_PAGE === 0) {
      navigate(`/?page=${Math.floor(todoCounts[activeTab] / ITEM_PER_PAGE)}`);
    }
  };

  return (
    <div className="todo-container">
      {/* Filter Buttons */}
      <FilterButtons todos={todos} setTodos={setFilteredTodos} />
    
      {/* Todo List */}
      <ul ref={todoListRef}>
        {[...filteredTodos].reverse()
          .slice((page - 1) * ITEM_PER_PAGE, page * ITEM_PER_PAGE)
          .map(todo => (
            <TodoListItem
              checkPageCountOnDelete={handlePageTransitionOnDelete}
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
        renderItem={item => (
          <PaginationItem
            component={Link}
            to={`/${item.page === 1 ? '' : `?page=${item.page}`}`}
            {...item}
          />
        )}
      />{' '}
    </div>
  );
};

export default TodoList;
