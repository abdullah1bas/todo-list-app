/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

/* eslint-disable react/prop-types */
const TodoList = ({ filteredTodos ,setElementEdit, deleteMethod, setOpen , todos, setTodos}) => {
  const [now, setNow] = useState(new Date().getTime());
  const [finishedTodos, setFinishedTodos] = useState([]);
  
  const second = 1000, minute = second * 60, hour = minute * 60, day = hour * 24, month = day * 30;
  const getDays = (date) => Math.floor(((new Date(date).getTime() - now ) % month) / day);
  const getHours = (date) => Math.floor(((new Date(date).getTime() - now ) % day) / hour);
  const getMinutes = (date) => Math.floor(((new Date(date).getTime() - now ) % hour) / minute);
  const getSeconds = (date) => Math.floor(((new Date(date).getTime() - now ) % minute) / second);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date().getTime());
    }, 1000);

    filteredTodos.forEach(todo => {
      if (!finishedTodos.includes(todo.id)) {
        const remainingTime = new Date(todo.reminderDate).getTime() - now;
        if (remainingTime <= 0) {
          Swal.fire(`Time's up for ${todo.title}`);
          setFinishedTodos([...finishedTodos, todo.id]);
        }
      }
    });

    return () => clearInterval(interval);
  }, [now, filteredTodos, finishedTodos]);
  
  return (
    <ul className="list">
      {filteredTodos.map(todo => (
        <li key={todo.id}>
          <div className="category-data">
            <h3>{todo.title}</h3>
            <p className="category-description">{todo.description}</p>
            <p><strong>Category:</strong> {todo.category}</p>
            {finishedTodos.includes(todo.id) ? (
              <p><strong>Reminder Date:</strong> Time's up!</p>
            ) : (
              <p><strong>Reminder Date:</strong> {`d{${getDays(todo.reminderDate)}} h{${getHours(todo.reminderDate)}} m{${getMinutes(todo.reminderDate)}} s{${getSeconds(todo.reminderDate)}}`}</p>
            )}
          </div>
          <div className="button-cat" style={{}}>
            <button onClick={() => {
              setElementEdit(todo);
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
                  deleteMethod(todo.id, todos , 'todos', setTodos);
                }
              });
              }}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;

