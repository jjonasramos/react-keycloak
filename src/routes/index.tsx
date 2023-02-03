import { Route, Routes as Router } from "react-router-dom";
import { Home } from "../pages";

const Routes = () => {
  return (
    <Router>
      <Route path="/" element={<Home />} />
    </Router>
  );
};

export default Routes;