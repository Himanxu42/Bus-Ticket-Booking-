import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { isAdmin, isAuthenticated } from "./helper";
import Dashboard from "./pages/Admin/Dashboard";
import AddBus from "./pages/Admin/AddBus";
import { SnackbarProvider } from "notistack";
import Search from "./pages/Search/Search";
import AddCities from "./pages/Admin/AddCities";
import Booking from "./pages/Booking/Booking";
import AllBus from "./pages/Admin/AllBus";
import Payment from "./pages/Payment/Payment";
import PaymentSuccess from "./pages/Payment/PaymentSuccess";
import Profile from "./pages/Profile/Profile";
import AllBookings from "./pages/Admin/AllBookings";
import Feedbacks from "./pages/Admin/Feedbacks";

console.log(isAdmin());
ReactDOM.createRoot(document.getElementById("root")).render(

    <SnackbarProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={isAdmin() ? <Navigate to="/admin/dashboard" /> : <Home />}
          />
          <Route
            path="/signup"
            element={
              !isAuthenticated() ? <Signup /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/login"
            element={
              !isAuthenticated() ? <Login /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/search"
            element={!isAuthenticated() ? <Login /> : <Search />}
          />
          <Route
            path="/booking"
            element={!isAuthenticated() ? <Login /> : <Booking />}
          />
          <Route
            path="/payment"
            element={!isAuthenticated() ? <Login /> : <Payment />}
          />
          <Route
            path="/payment-success"
            element={!isAuthenticated() ? <Login /> : <PaymentSuccess />}
          />
          <Route
            path="/profile"
            element={!isAuthenticated() ? <Login /> : <Profile />}
          />
          <Route
            path="/admin/dashboard"
            element={!isAdmin() ? <Navigate to="/" replace /> : <Dashboard />}
          />
          <Route
            path="/admin/addbus"
            element={!isAdmin() ? <Navigate to="/" replace /> : <AddBus />}
          />
          <Route
            path="/admin/addcity"
            element={!isAdmin() ? <Navigate to="/" replace /> : <AddCities />}
          />
          <Route
            path="/admin/all-bus"
            element={!isAdmin() ? <Navigate to="/" replace /> : <AllBus />}
          />
          <Route
            path="/admin/all-bookings"
            element={!isAdmin() ? <Navigate to="/" replace /> : <AllBookings />}
          />
          <Route
            path="/admin/feedbacks"
            element={!isAdmin() ? <Navigate to="/" replace /> : <Feedbacks />} 
          />
        </Routes>
      </Router>
    </SnackbarProvider>
);
