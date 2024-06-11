import CategoryList from '../components/CategoryList.jsx';
import CategoryForm from '../components/CategoryForm.jsx';
import React, { useState,useEffect, useRef } from 'react';
import { addMethod, deleteMethod, editMethod } from './methods.js';

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

  return (
    <div>
      {open && <CategoryForm {...{open, setOpen, editMethod, elementEdit , setCategories, categories}} />}
      <CategoryForm {...{addMethod ,setCategories, categories}} />
      <CategoryList {...{categories ,setElementEdit ,deleteMethod, setOpen, setCategories}} />
    </div>
  );
};

export default React.memo(CategoriesPage);
