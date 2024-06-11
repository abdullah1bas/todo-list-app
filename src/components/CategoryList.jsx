/* eslint-disable react/prop-types */

import Swal from "sweetalert2";

const CategoryList = ({ categories, setElementEdit, deleteMethod ,setCategories, setOpen }) => {
  return (
    <ul className="list">
      {categories.map(category => (
        <li key={category.id} style={{flexDirection: 'row'}}>
          <span>{category.name}</span>
          <div style={{display: 'flex' , gap: 10}}>
            <button onClick={() => {
              setElementEdit(category);
              setOpen(true);
            }}>Edit</button>
            <button onClick={() => {
              Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                  });
                  deleteMethod(category.id, categories, 'categories', setCategories);
                }
              })
            }}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
