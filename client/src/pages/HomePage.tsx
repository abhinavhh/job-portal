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
    </div>
    
  );
};

export default HomePage;
