import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../redux/loaderSlice";
import { SetUser } from "../redux/userSlice";

function ProtectedPage({ children }) {
  // const [user, setUser] = useState(null);

  const { user } = useSelector((state) => state.users); //now we don'thave state variable stiil we have see the output
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validateToken = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetCurrentUser();

      dispatch(SetLoader(false));
      if (response.success) {
        // setUser(response.data);
        dispatch(SetUser(response.data));
      } else {
        navigate("/login");
      }
    } catch (error) {
      dispatch(SetLoader(false));
      navigate("/login");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      // if try to navigatethehome page this error  comes in console jwt malformed - thatmenas thereis now jwt insted of getting this message you can doone thing if there is no token directly navigate the user to login page becaus  this jwt malware  this wordonly technical people will understand normal people will not understand youjust navigate theuser to home page to login
      dispatch(SetUser(null));
      navigate("/login");
    }
  }, [navigate]);

  //   if the user is there then only render the children else don't render any children

  return (
    user && (
      <div className="">
        <div className="d-flex justify-content-between align-items-center bg-primary p-4">
          {/* Header */}
          <h2
            className="text-white "
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Marcketpalce App
          </h2>
          <div className="bg-white py-2 px-3 rounded">
            <div>
              <i className="fa-solid fa-user mx-3 "></i>
              <span
                className="text-decoration-underline fw-bold text-uppercase"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (user.role === "user") {
                    navigate("/profile");
                  } else {
                    navigate("/admin");
                  }
                }}
              >
                {user.name}
              </span>
              <i
                className="fa-solid fa-right-from-bracket ms-4"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
              ></i>
            </div>
          </div>
        </div>
        <div className="p-3">{children}</div>
      </div>
    )
  );
}

export default ProtectedPage;

// In this we are going to call get current user before calling 1st we should have apiInstance lets gotothe users
