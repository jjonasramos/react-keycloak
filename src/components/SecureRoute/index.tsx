import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuthentication } from "../../contexts/Authentication";

const SecureRoute: React.FC = () => {
  const { isAuthenticated, verifyRealmLocalStorage } = useAuthentication();
  const [isLoading, setIsLoading] = useState(true);
  
  if (!isAuthenticated) {
    verifyRealmLocalStorage().then(() => setIsLoading(false)).catch(() => {
      window.location.href = "/login";
    });
  }

  return isLoading ? <div>Loading...</div> : ( <Outlet />);
};

export default SecureRoute;