import { Link } from "react-router-dom";
import { useValidate } from "../hooks/ValidateToken";
import { useEffect } from "react";

const HomePage = () => {
  const isAuthenticated = useValidate();

  useEffect(() => {
    if (!isAuthenticated) {
      // Optional: Add a check to prevent alerting on first load
      alert('Validation Failed');
    }
  }, [isAuthenticated]);

  const handleClick = () => {
    localStorage.removeItem('userId')
  }
  return (
    <div>HomePage
      <button onClick={handleClick}>LogOut</button>
      <Link to="/profile" className="border-1 p-2 ml-2 rounded-xl ">
        View User Profile
      </Link>
    </div>
    
  );
};

export default HomePage;
