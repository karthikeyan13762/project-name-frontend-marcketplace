import React, { useEffect } from "react";
import Products from "./Products";
import Users from "./Users";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);

  useEffect(() => {
    if (user.role != "admin") {
      navigate("/");
    }
  });
  return (
    <>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="products-tab"
            data-bs-toggle="tab"
            data-bs-target="#products"
            type="button"
            role="tab"
            aria-controls="products"
            aria-selected="true"
          >
            Products
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="users-tab"
            data-bs-toggle="tab"
            data-bs-target="#users"
            type="button"
            role="tab"
            aria-controls="users"
            aria-selected="false"
          >
            Users
          </button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="products"
          role="tabpanel"
          aria-labelledby="products-tab"
        >
          <Products />
        </div>
        <div
          className="tab-pane fade"
          id="users"
          role="tabpanel"
          aria-labelledby="users-tab"
        >
          <Users />
        </div>
      </div>
    </>
  );
}

export default Admin;
