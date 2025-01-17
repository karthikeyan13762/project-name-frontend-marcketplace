import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../redux/loaderSlice";
import { GetProducts, UpdateProductStatus } from "../../apicalls/prodoucts";
// import { DeleteProduct } from "../../apicalls/prodoucts";
// import ProductForm from "../Profile/Products/ProductForm";

function Products() {
  const [shoModel, setShoModel] = useState(false);
  const [products, setProducts] = useState([]);

  //   const [selectedProduct, setSelectedProduct] = useState(null); //the momenet we clickon the edit button wearegoing to set the selected products is this record and open themodel

  //   const { user } = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts(null);
      dispatch(SetLoader(false));
      if (response.success) {
        setProducts(response.data); // Update state
      }
    } catch (error) {
      dispatch(SetLoader(false));
      return error.message;
    }
  };

  //       const response = await DeleteProduct(id);

  //       dispatch(SetLoader(false));

  //       if (response.success) {
  //         // Filter out the deleted product from the local state
  //         setProducts((prevProducts) =>
  //           prevProducts.filter((product) => product._id !== id)
  //         );
  //         alert("Product deleted successfully");

  //         getData();
  //       }
  //     } catch (error) {
  //       dispatch(SetLoader(false));
  //       console.log(error.message);
  //     }
  //   };

  const handleStatusChange = async (id, status) => {
    try {
      dispatch(SetLoader(true));

      const response = await UpdateProductStatus(id, { status });

      dispatch(SetLoader(false));

      if (response.success) {
        getData();
      } else {
        throw new Error(response.message);
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
      {/* Lets create table  */}
      <div className="table-responsive">
        <table className="table caption-top  ">
          <caption>List of products</caption>
          <thead className="text-center">
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Seller</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Category</th>
              <th scope="col">Age</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {products.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{data.name}</td>
                  <td>{data.seller?.name || "N/A"}</td>
                  <td>{data.description}</td>
                  <td>{data.price}</td>
                  <td>{data.category}</td>
                  <td>{data.age}</td>
                  <td>{data.status}</td>
                  <td className="">
                    <div className="">
                      {data.status === "pending" && (
                        <>
                          <button
                            className="btn btn-success btn-sm  ms-2"
                            onClick={() =>
                              handleStatusChange(data._id, "approved")
                            }
                          >
                            Approve
                          </button>
                        </>
                      )}
                      {data.status === "pending" && (
                        <>
                          <button
                            className="btn btn-danger btn-sm ms-2"
                            onClick={() =>
                              handleStatusChange(data._id, "rejected")
                            }
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {data.status === "approved" && (
                        <>
                          <button
                            className="btn btn-danger btn-sm  ms-2"
                            onClick={() =>
                              handleStatusChange(data._id, "blocked")
                            }
                          >
                            Block
                          </button>
                        </>
                      )}

                      {data.status === "blocked" && (
                        <>
                          <button
                            className="btn btn-warning btn-sm  ms-2"
                            onClick={() =>
                              handleStatusChange(data._id, "approved")
                            }
                          >
                            Reapprove
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* <div className="d-flex justify-content align-items-center">
        {shoModel && (
          <ProductForm
            shoModel={shoModel}
            setShoModel={setShoModel}
            selectedProduct={selectedProduct}
            getData={getData} // whenever makechanges justreload the data
          />
        )}
      </div> */}
    </>
  );
}

export default Products;
