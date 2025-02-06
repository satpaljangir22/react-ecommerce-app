import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import Payments from "./components/Payments";
import OrderSuccess from "./components/OrderSuccess";
import RegistrationSuccess from "./components/RegistrationSuccess";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route
            path="/registration-success"
            element={<RegistrationSuccess />}
          />
          <Route path="/" element={<Navigate to="/login" />} />{" "}
          {/* Default route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
