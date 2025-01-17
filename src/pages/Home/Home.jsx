import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../redux/loaderSlice";
import { GetProducts } from "../../apicalls/prodoucts";
import { useNavigate } from "react-router-dom";
import Filter from "./Filter";

function Home() {
  const [showFilters, setShowFilters] = useState(true);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    status: "approved",
    category: [],
    age: [],
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts(filters);

      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      return error.message;
    } finally {
      dispatch(SetLoader(false)); // Ensure loader stops in all cases
    }
  };

  useEffect(() => {
    getData();
  }, [filters]);

  return (
    <div className="container mt-4">
      <div className="row">
        {showFilters && (
          <div className="col-md-3 mb-3">
            <Filter
              showFilters={showFilters}
              setShowFilters={setShowFilters}
              filters={filters}
              setFilters={setFilters}
            />
          </div>
        )}

        <div className="col-md-9">
          {/* Button to toggle filters visibility */}
          {!showFilters && (
            <button
              className="btn btn-secondary mb-3"
              onClick={() => setShowFilters(!showFilters)}
            >
              <i className="fa-solid fa-bars"></i> Show Filters
            </button>
          )}

          {/* Search bar */}
          {/* <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search for products"
              disabled
            />
          </div> */}

          {/* Products grid */}
          <div className="row">
            {products?.map((product, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div
                  className="card h-100"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  <img
                    src={product?.images[0]}
                    className="card-img-top"
                    alt={product.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                  </div>
                  <div className="card-footer">
                    <span className="text-muted">$ {product.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
