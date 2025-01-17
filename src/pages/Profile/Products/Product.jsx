import React, { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../../redux/loaderSlice";
import { GetProducts, DeleteProduct } from "../../../apicalls/prodoucts";
import Bids from "./Bids";

function Product() {
  const [showBids, setShowBids] = useState(false);
  const [shoModel, setShoModel] = useState(false);

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts({ seller: user._id });

      dispatch(SetLoader(false));
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      return error.message;
    }
  };

  const deleteProduct = async (id) => {
    try {
      dispatch(SetLoader(true));
      const response = await DeleteProduct(id);

      dispatch(SetLoader(false));
      if (response.success) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        );
        alert("Product deleted successfully");
        getData();
      }
    } catch (error) {
      dispatch(SetLoader(false));
      return error.message;
    }
  };

  useEffect(() => {
    getData();
  }, [shoModel]);

  return (
    <>
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-outline-primary mt-3"
          onClick={() => {
            setSelectedProduct(null);
            setShoModel(true);
          }}
        >
          Add Product
        </button>
      </div>
      <div className="table-responsive">
        <table className="table caption-top">
          <caption>List of products</caption>
          <thead className="text-center">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Category</th>
              <th scope="col">Age</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {products.map((data, index) => (
              <tr key={index}>
                <td>{data.name}</td>
                <td>{data.description}</td>
                <td>{data.price}</td>
                <td>{data.category}</td>
                <td>{data.age}</td>
                <td>{data.status}</td>
                <td>
                  <div>
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        setSelectedProduct(data);
                        setShoModel(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger ms-2"
                      onClick={() => {
                        deleteProduct(data._id);
                      }}
                    >
                      Delete
                    </button>
                    {/* <button
                      className="btn btn-warning ms-2"
                      onClick={() => {
                        setSelectedProduct(data);
                        setShowBids(true);
                      }}
                    >
                      Show Bids
                    </button> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content align-items-center">
        {shoModel && (
          <ProductForm
            shoModel={shoModel}
            setShoModel={setShoModel}
            selectedProduct={selectedProduct}
            getData={getData}
          />
        )}
        {showBids && (
          <Bids
            showBids={showBids}
            setShowBids={setShowBids}
            selectedProduct={selectedProduct}
          />
        )}
      </div>
    </>
  );
}

export default Product;
