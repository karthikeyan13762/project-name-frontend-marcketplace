import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../redux/loaderSlice";

import { GetAllUsers, UpdateUserStatus } from "../../apicalls/users";

function Users() {
  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetAllUsers(null);
      dispatch(SetLoader(false));
      if (response.success) {
        setUsers(response.data); // Update state
      }
    } catch (error) {
      dispatch(SetLoader(false));
      return error.message;
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      dispatch(SetLoader(true));

      const response = await UpdateUserStatus(id, { status });

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
  }, []);
  return (
    <>
      {/* Lets create table  */}
      <div className="table-responsive">
        <table className="table caption-top  ">
          <caption>List of users</caption>
          <thead className="text-center">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Created At</th>

              <th scope="col">Status</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {users.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.createdAt}</td>
                  <td>{data.status}</td>
                  <td>{data.role}</td>
                  <td className="">
                    <div className="">
                      {data.status === "active" && (
                        <>
                          <button
                            className="btn btn-success btn-sm  ms-2"
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
                            className="btn btn-danger btn-sm ms-2"
                            onClick={() =>
                              handleStatusChange(data._id, "active")
                            }
                          >
                            Unblock
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
    </>
  );
}

export default Users;
