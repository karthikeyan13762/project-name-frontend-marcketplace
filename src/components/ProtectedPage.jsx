import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";

function ProtectedPage({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const validateToken = async () => {
    try {
      const response = await GetCurrentUser();
      console.log(response);
      console.log(response.data);

      if (response.success) {
        setUser(response.data);
      } else {
        navigate("/login");
        console.log(response.message);
      }
    } catch (error) {
      navigate("/login");
      console.log(error);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      // if try to navigatethehome page this error  comes in console jwt malformed - thatmenas thereis now jwt insted of getting this message you can doone thing if there is no token directly navigate the user to login page becaus  this jwt malware  this wordonly technical people will understand normal people will not understand youjust navigate theuser to home page to login
      navigate("/login");
    }
  }, []);
  //   if the user is there then only render the children else don't render any children

  return (
    <div>
      {user && (
        <div className="p-5">
          {user.name}
          {children}
        </div>
      )}
    </div>
  );
}

export default ProtectedPage;

// In this we are going to call get current user before calling 1st we should have apiInstance lets gotothe users
