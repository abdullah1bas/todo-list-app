/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";

const FilterByCategory = ({ setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const shouldLog= useRef(true);

  useEffect(() => {
    if(shouldLog.current) {
      shouldLog.current = false;
      const storedCategories = JSON.parse(localStorage.getItem("categories")) || [];
      setCategories(storedCategories);
    }}, []);

  return (
    <div className="filter-by-category">
      <select onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterByCategory;
