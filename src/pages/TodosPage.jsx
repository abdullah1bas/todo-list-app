import React, { useState, useEffect, useRef } from 'react';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import SearchBar from '../components/SearchBar';
import FilterByCategory from '../components/FilterByCategory';
import { addMethod, editMethod, deleteMethod } from './methods';

const TodosPage = () => {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [open , setOpen] = useState(false);
  const [elementEdit, setElementEdit] = useState({});
  const shouldLog= useRef(true);

  useEffect(() => {
    if(shouldLog.current){
      shouldLog.current = false;
      const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
      setTodos(storedTodos);
    }}, []);

  const filteredTodos = todos
    .filter(todo => todo.title.includes(searchTerm) || todo.description.includes(searchTerm) || todo.category.includes(searchTerm))
    .filter(todo => !selectedCategory || todo.category === selectedCategory);

  return (
    <div className="container">
      {open && <TodoForm {...{open, elementEdit, setOpen, editMethod, todos, setTodos}} />}
      <h2>To-dos</h2>
      <SearchBar {...{setSearchTerm}} />
      <FilterByCategory {...{setSelectedCategory}} />
      <TodoForm {...{addMethod, todos, setTodos}} />

      {filteredTodos.length ? <TodoList {...{filteredTodos, deleteMethod, setOpen, setElementEdit, todos, setTodos}} /> : null}
    </div>
  );
};

export default React.memo(TodosPage);
