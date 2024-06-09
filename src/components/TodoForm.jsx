/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';

const TodoForm = ({ addTodo , open , elementEdit , setOpen, editTodo}) => {
  const [title, setTitle] = useState(open ? elementEdit.title : '');
  const [description, setDescription] = useState(open ? elementEdit.description : '');
  const [category, setCategory] = useState(open ? elementEdit.category : '');
  const [reminderDate, setReminderDate] = useState(open ? elementEdit.reminderDate : '');
  const [categories, setCategories] = useState([]);
  const shouldLog = useRef(true);

  useEffect(() => {
    if(shouldLog.current) setCategories(JSON.parse(localStorage.getItem('categories')) || []);
    }, []);

  const handleSubmitAdd = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to Add this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Add it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Accept!",
          text: "Your file has been Add.",
          icon: "success"
        });
        const newTodo = { id: Date.now(), title, description, category, reminderDate };
        addTodo(newTodo);
        setTitle('');
        setDescription('');
        setCategory('');
        setReminderDate('');
      }
    });
    
  };
  const handleSubmitEdit = (e) => {
    e.preventDefault();
    editTodo({id: elementEdit.id, title, description, category, reminderDate });
    setOpen(false);
  };

  return (
    <form onSubmit={open ? handleSubmitEdit : handleSubmitAdd} className={open ? 'form-edit' : null}>
      <input  type="text"  value={title}  onChange={(e) => setTitle(e.target.value)}  placeholder="Title"  required  />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <select value={category} onChange={(e) => setCategory(e.target.value)} required >
        <option value="">Select Category</option>
        {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
      </select>
      <input type="date" value={reminderDate} onChange={(e) => {setReminderDate(e.target.value)}} required />
      <button type="submit">{open ? 'Edit' : 'Add To-do'}</button>
      {open ? <button type='submit' style={{'marginTop': '8px'}} onClick={()=> setOpen(false)}>Cancel</button> : null}
    </form>
  );
};

export default React.memo(TodoForm);
