import React, { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../../redux/loaderSlice";
import { GetProducts } from "../../../apicalls/prodoucts";
import { DeleteProduct } from "../../../apicalls/prodoucts";

function Product() {
  const [shoModel, setShoModel] = useState(false);
  const [products, setProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null); //the momenet we clickon the edit button wearegoing to set the selected products is this record and open themodel
  console.log(products);

  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts(); //latter wearegoing tofetchthe products only on the selleridwrite now wedit not add mongodb filter just complete the productcrud operation latterwe are going to make changeshere
      console.log(response);

      dispatch(SetLoader(false));

      if (response.success) {
        setProducts(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      console.log(error.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      dispatch(SetLoader(true));
      const response = await DeleteProduct(id);

      dispatch(SetLoader(false));

      if (response.success) {
        // Filter out the deleted product from the local state
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        );
        alert("Product deleted successfully");
        getData();
      }
    } catch (error) {
      dispatch(SetLoader(false));
      console.log(error.message);
    }
  };
  const column = [
    //  Inthe columns data index propert must matchwithmongodb model properties (this is for antitynotbootsrap)

    {
      title: "Name",
      description: "name",
    },
    {
      title: "Description",
      description: "description",
    },
    {
      title: "Price",
      description: "price",
    },
    {
      title: "Category",
      description: "category",
    },
    {
      title: "Age",
      description: "age",
    },
    {
      title: "Status",
      description: "status",
    },
    {
      title: "Action",
      description: "action",
    },
  ];

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
      {/* Lets create table  */}
      <div className="table-responsive">
        <table className="table caption-top  ">
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
            {products.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{data.name}</td>
                  <td>{data.description}</td>
                  <td>{data.price}</td>
                  <td>{data.category}</td>
                  <td>{data.age}</td>
                  <td>{data.status}</td>
                  <td className="">
                    <div className="">
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
                        className="btn btn-danger  ms-2"
                        onClick={() => {
                          deleteProduct(data._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content align-items-center">
        {shoModel && (
          <ProductForm
            shoModel={shoModel}
            setShoModel={setShoModel}
            selectedProduct={selectedProduct}
            getData={getData} // whenever makechanges justreload the data
          />
        )}
      </div>
    </>
  );
}

export default Product;
