import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

function General({ user }) {
  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h3>User Details</h3>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <strong>Name:</strong> <span>{user.name}</span>
          </div>
          <div className="mb-3">
            <strong>Email:</strong> <span>{user.email}</span>
          </div>
          <div className="mb-3">
            <strong>Role:</strong> <span>{user.role}</span>
          </div>
          <div className="mb-3">
            <strong>Created At:</strong> <span>{user.createdAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default General;
