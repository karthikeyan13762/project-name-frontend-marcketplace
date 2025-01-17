import React from "react";
import "../css/App.css";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ProtectedPage from "./components/ProtectedPage";
import Spinner from "./components/Spinner";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile/Profile";
import Admin from "./pages/Admin/Admin";
import ProductInfo from "./pages/ProductInfo/ProductInfo";
function App() {
  // what ever name you give in the store that has to be given heir this loaders match with stat.loaders now showing the spinner componenet only when the loading is true

  const { loading } = useSelector((state) => state.loaders);
  return (
    <>
      {loading && <Spinner />}

      <Router basename="/">
        <Routes>
          {/* home page is protected */}
          <Route
            path="/"
            element={
              <ProtectedPage>
                <Home />
              </ProtectedPage>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedPage>
                <Profile />
              </ProtectedPage>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedPage>
                <Admin />
              </ProtectedPage>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProtectedPage>
                <ProductInfo />
              </ProtectedPage>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
