import Navigation from "./components/Navigation";
import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <Navigation />
      <Outlet />
    </div>
  );
}

export default App;


