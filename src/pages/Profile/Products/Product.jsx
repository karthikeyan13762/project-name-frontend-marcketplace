import React, { useState } from "react";
import ProductForm from "./ProductForm";

function Product() {
  const [shoModel, setShoModel] = useState(false);
  console.log(shoModel);

  return (
    <>
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-outline-primary mt-3"
          onClick={() => setShoModel(true)}
        >
          Add Product
        </button>
      </div>

      <div className="d-flex justify-content align-items-center">
        {shoModel && (
          <ProductForm shoModel={shoModel} setShoModel={setShoModel} />
        )}
      </div>
    </>
  );
}

export default Product;
