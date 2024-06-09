import CategoryList from '../components/CategoryList.jsx';
import CategoryForm from '../components/CategoryForm.jsx';
import React, { useState,useEffect, useRef } from 'react';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [open , setOpen] = useState(false);
  const [elementEdit, setElementEdit] = useState({});
  const shouldLog= useRef(true);

  useEffect(() => {
    if(shouldLog.current) {
      shouldLog.current = false;
      const storedCategories = JSON.parse(localStorage.getItem('categories')) || [];
      setCategories(storedCategories);
    }}, []);

  const addCategory = (category) => {
    const newCategories = [...categories, category];
    setCategories(newCategories);
    localStorage.setItem('categories', JSON.stringify(newCategories));
  };

  const editCategory = (updatedCategory) => {
    const updatedCategories = categories.map(cat => cat.id === updatedCategory.id ? updatedCategory : cat);
    setCategories(updatedCategories);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
  };

  const deleteCategory = (id) => {
    const remainingCategories = categories.filter(cat => cat.id !== id);
    setCategories(remainingCategories);
    localStorage.setItem('categories', JSON.stringify(remainingCategories));
  };

  return (
    <div>
      {open && <CategoryForm {...{open, setOpen, editCategory, elementEdit}} />}
      <CategoryForm addCategory={addCategory} />
      <CategoryList {...{categories ,setElementEdit ,deleteCategory, setOpen}} />
    </div>
  );
};

export default React.memo(CategoriesPage);
