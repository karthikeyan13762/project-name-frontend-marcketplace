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
function App() {
  // what ever name you give in the store that has to be given heir this loaders match with stat.loaders now showing the spinner componenet only when the loading is true

  const { loading } = useSelector((state) => state.loaders);
  return (
    // <div className="container-fluied vh-100 d-flex justify-content-center align-items-center">
    //   <div className=" bg-white p-5">
    //     <h1>Marcketplace App</h1>
    //     <button type="button" className="btn btn-success rounded-0">
    //       Success
    //     </button>
    //   </div>
    // </div>
    <>
      {loading && <Spinner />}

      <Router>
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
