import React from "react";
import Product from "./Products/Product";

function Profile() {
  return (
    <div>
      {/* Tabs Navigation */}
      <ul className="nav nav-tabs" id="profileTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="buy-sell-tab"
            data-bs-toggle="tab"
            data-bs-target="#buy-sell"
            type="button"
            role="tab"
            aria-controls="buy-sell"
            aria-selected="true"
          >
            Products
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="bids-tab"
            data-bs-toggle="tab"
            data-bs-target="#bids"
            type="button"
            role="tab"
            aria-controls="bids"
            aria-selected="false"
          >
            Bids
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="general-tab"
            data-bs-toggle="tab"
            data-bs-target="#general"
            type="button"
            role="tab"
            aria-controls="general"
            aria-selected="false"
          >
            General
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div className="tab-content" id="profileTabContent">
        <div
          className="tab-pane fade show active"
          id="buy-sell"
          role="tabpanel"
          aria-labelledby="buy-sell-tab"
        >
          <Product />
        </div>
        <div
          className="tab-pane fade"
          id="bids"
          role="tabpanel"
          aria-labelledby="bids-tab"
        >
          <h1>Bids</h1>
        </div>
        <div
          className="tab-pane fade"
          id="general"
          role="tabpanel"
          aria-labelledby="general-tab"
        >
          <h1>General</h1>
        </div>
      </div>
    </div>
  );
}

export default Profile;
