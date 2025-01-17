import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../../redux/loaderSlice";
import { GetAllBids } from "../../../apicalls/prodoucts";

function UserBids() {
  const [bidData, setBidData] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetAllBids({ buyer: user._id });
      dispatch(SetLoader(false));
      if (response.success) {
        setBidData(response.data);
      }
    } catch (error) {
      return error.message;
    } finally {
      dispatch(SetLoader(false));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="table-responsive bg-primary  mt-4">
      <h2 className="text-center mb-4">Your Bids</h2>
      <table className="table table-bordered table-striped text-center ">
        <thead className="">
          <tr className="">
            <th>Seller Name</th>
            <th>Bid Amount</th>
            <th>Message</th>
            <th>Contact Details</th>
          </tr>
        </thead>
        <tbody>
          {bidData.length > 0 ? (
            bidData.map((bid, index) => (
              <tr key={index}>
                <td>{bid.seller?.name || "Unknown Seller"}</td>
                <td>${bid.bidAmount || "N/A"}</td>
                <td>{bid.message || "No message provided"}</td>
                <td>
                  <div>
                    <div>Phone: {bid.mobile || "N/A"}</div>
                    <div>Email: {bid.seller?.email || "N/A"}</div>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No bids found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserBids;
