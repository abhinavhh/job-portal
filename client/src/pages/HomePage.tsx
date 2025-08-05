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

  return (
    <div>HomePage</div>
  );
};

export default HomePage;
