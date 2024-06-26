import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider,} from "react-router-dom";
import CategoriesPage from './pages/CategoriesPage.jsx';
import TodosPage from './pages/TodosPage.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path='categories' index element={<CategoriesPage />} />
      <Route path="/todos" element={<TodosPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)