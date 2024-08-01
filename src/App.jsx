import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CommitteeDetails from "./pages/CommitteeDetails";
import AddMahalla from "./pages/AddInfo";

const PrivateRoute = ({ element }) => {
  const user = JSON.parse(localStorage.getItem("user") || "false");
  return user ? element : <Navigate to="/login" />;
};
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="committees" element={<CommitteeDetails />} />
          <Route
            path="addInfo"
            element={<PrivateRoute element={<AddMahalla />} />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
