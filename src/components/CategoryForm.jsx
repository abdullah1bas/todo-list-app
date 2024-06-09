/* eslint-disable react/prop-types */
import { useState } from 'react';
import Swal from 'sweetalert2';

const CategoryForm = ({ addCategory , open, setOpen , editCategory ,  elementEdit}) => {
  const [name, setName] = useState(open ? elementEdit.name : '');

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
        const newCategory = { id: Date.now(), name };
        addCategory(newCategory);
        setName('');
      }
    });
  };
  const handleSubmitEdit = (e) => {
    e.preventDefault();
    editCategory({id: elementEdit.id, name });
    setOpen(false);
  };

  return (
    <form onSubmit={open ? handleSubmitEdit : handleSubmitAdd} className={open ? 'form-edit' : null}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="New Category" required />
      <button type="submit">{open ? 'Edit Category' : 'Add Category'}</button>
      {open ? <button type='submit' style={{'marginTop': '8px'}} onClick={()=> setOpen(false)}>Cancel</button> : null}
    </form>
  );
};

export default CategoryForm;
