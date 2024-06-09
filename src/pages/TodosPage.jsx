import React, { useState, useEffect, useRef } from 'react';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import SearchBar from '../components/SearchBar';
import FilterByCategory from '../components/FilterByCategory';

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

  const addTodo = ((todo) => {
    const newTodos = [...todos, todo];
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  });

  const editTodo = ((updatedTodo) => {
    const updatedTodos = todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  });

  const deleteTodo = ((id) => {
    const remainingTodos = todos.filter(todo => todo.id !== id);
    setTodos(remainingTodos);
    localStorage.setItem('todos', JSON.stringify(remainingTodos));
  });

  const filteredTodos = todos
    .filter(todo => todo.title.includes(searchTerm) || todo.description.includes(searchTerm) || todo.category.includes(searchTerm))
    .filter(todo => !selectedCategory || todo.category === selectedCategory);

  return (
    <div className="container">
      {open && <TodoForm {...{open, elementEdit, setOpen, editTodo}} />}
      <h2>To-dos</h2>
      <SearchBar {...{setSearchTerm}} />
      <FilterByCategory {...{setSelectedCategory}} />
      <TodoForm {...{addTodo}} />

      {filteredTodos.length ? <TodoList todos={filteredTodos} {...{editTodo, deleteTodo, setOpen, setElementEdit}} /> : null}
    </div>
  );
};

export default React.memo(TodosPage);
