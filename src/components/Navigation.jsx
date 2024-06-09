
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();
  return(
    <nav>
      <ul>
        <li><button onClick={() => navigate('/categories')} >Categories</button></li>
        <li><button onClick={() => navigate('/todos')} >To-dos</button></li>
      </ul>
    </nav>
  )
  
};

export default Navigation;
