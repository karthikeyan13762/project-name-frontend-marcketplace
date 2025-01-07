import React, { useRef } from "react";
import "./ProductForm.css";

import { useDispatch, useSelector } from "react-redux";
import { AddProduct } from "../../../apicalls/prodoucts";
import { SetLoader } from "../../../redux/loaderSlice";
function ProductForm({ shoModel, setShoModel }) {
  // to get the current userid weneed to fetchit from the redux

  const { user } = useSelector((state) => state.users);
  const addtionalThings = [
    {
      lable: "Bill Aavailable",
      name: "billAavailable",
    },
    {
      lable: "Warranty Aavailable",
      name: "warrantyAavailable",
    },
    {
      lable: "Accessories Aavailable",
      name: "accessoriesAavailable",
    },
    {
      lable: "Box Aavailable",
      name: "boxAavailable",
    },
  ];

  const dispatch = useDispatch();
  const formRef = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);

    const data = {};
    data.seller = user._id;
    data.status = "pending";
    // Handle all form fields
    const inputs = formRef.current.elements;
    for (const input of inputs) {
      if (input.type === "checkbox") {
        // Checkboxes: true if checked, false otherwise
        data[input.name] = input.checked;
      } else if (input.name) {
        // Other fields: Add value
        data[input.name] = input.value;
      }
    }

    try {
      const response = await AddProduct(data);
      dispatch(SetLoader(false));
      if (response.success) {
        console.log(response.message);
        setShoModel(false);
      } else {
        console.log(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      console.log(error.message);
    }
  };
  return (
    <>
      <div
        className={`modal ${shoModel ? "d-inline-block" : ""} `}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog custom-modal-width " role="document">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h5 className="modal-title" id="productFormModalLabel">
                Product Form
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShoModel(false)}
                aria-label="Close"
              />
            </div>

            {/* Tabs Navigation */}
            <ul className="nav nav-tabs" id="productTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="general-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#general"
                  type="button"
                  role="tab"
                  aria-controls="general"
                  aria-selected="true"
                >
                  General
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="images-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#images"
                  type="button"
                  role="tab"
                  aria-controls="images"
                  aria-selected="false"
                >
                  Images
                </button>
              </li>
            </ul>

            {/* Tab Content */}
            <div className="tab-content ms-4" id="productTabContent">
              <div
                className="tab-pane fade show active"
                id="general"
                role="tabpanel"
                aria-labelledby="general-tab"
              >
                <form className="m-2" ref={formRef} onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="form-label  mt-2 fw-bold">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control "
                      id="name"
                      placeholder="Name"
                      required
                      name="name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="form-label  mt-2 fw-bold"
                    >
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      placeholder="Description"
                      required
                      name="description"
                    />
                  </div>
                  <div className="row">
                    <div className="col">
                      <label
                        htmlFor="price"
                        className="form-label  mt-2 fw-bold"
                      >
                        Price
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Price"
                        id="price"
                        name="price"
                        required
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="age" className="form-label  mt-2 fw-bold">
                        Age
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Age"
                        id="age"
                        name="age"
                        required
                      />
                    </div>
                    <div className="col">
                      <label
                        htmlFor="category"
                        className="form-label  mt-2 fw-bold"
                      >
                        Category
                      </label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        name="category" // Add this line
                        required // Add required to enforce selection
                      >
                        <option>Select</option>
                        <option value={"electronics"}>Electronics</option>
                        <option value={"fashion"}>Fashion</option>
                        <option value={"home"}>Home</option>
                        <option value={"sports"}>Sports</option>
                      </select>
                    </div>
                  </div>
                  <div className="d-flex form-check justify-content-between mt-3">
                    {addtionalThings.map((item, index) => {
                      return (
                        <div key={index}>
                          <input
                            className="form-check-input "
                            type="checkbox"
                            defaultValue
                            id={item.lable}
                            name={item.name}
                          />
                          <label
                            className="form-check-label "
                            htmlFor={item.lable}
                          >
                            {item.lable}
                          </label>
                        </div>
                      );
                    })}
                  </div>

                  <div className="d-grid gap-2 mt-4">
                    <button className="btn btn-primary" type="Submit">
                      Save
                    </button>
                  </div>
                </form>
              </div>
              <div
                className="tab-pane fade"
                id="images"
                role="tabpanel"
                aria-labelledby="images-tab"
              >
                <h1>Images</h1>
                <p>Here you can upload product images.</p>
              </div>
            </div>

            {/* Modal Body */}

            {/* Modal Footer */}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductForm;
