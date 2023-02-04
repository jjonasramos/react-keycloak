import { Route, Routes as Router } from "react-router-dom";
import { SecureRoute } from "../components";
import { AuthenticationProvider } from "../contexts/Authentication";
import { Home, Login } from "../pages";

const Routes = () => {
  return (
    <AuthenticationProvider>
      <Router>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<SecureRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Router>
    </AuthenticationProvider>
  );
};

export default Routes;