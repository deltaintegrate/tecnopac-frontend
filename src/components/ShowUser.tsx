import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPencilAlt, FaEye } from "react-icons/fa";
import { CiTrash } from "react-icons/ci";
import { Link } from "react-router-dom";
import Loader from "./common/Loader";

import '../style/ShowUser.css'

const ShowUser = () => {
  const showUserApi = "http://localhost:3005/api/v1/user";

  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handelDelete = async (id) => {
    console.log("id : -", id);
    setIsLoading(true);
    try {
      const response = await fetch(showUserApi.concat("?") + id, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      setUser(user.filter((item) => item.id !== id));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios
      .get(showUserApi + "?take=10")
      .then((res) => {
        console.log(res.data.data);
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (user.length < 0) {
    return <h1>no user found</h1>;
  } else {
    return (
      <div className="showTable">
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="itemsCol">USER</th>
              <th scope="itemsCol">USER ROLE</th>
              <th scope="itemsCol">STATUS</th>
              <th scope="itemsCol">SOCIAL PROFILE</th>
              <th scope="itemsCol">PROMOTE</th>
              <th scope="itemsCol">RATING</th>
              <th scope="itemsCol">LAST LOGIN</th>
            </tr>
          </thead>
          <tbody>
            {user?.map((item, i) => {
              return (
                <tr key={i + 1}>
                  <td className="itemsRow">{item.name}</td>
                  <td className="itemsRow">{item.role.name}</td>
                  <td className="itemsRow">{item.status['name']}</td>
                  <td className="itemsRow">{item.socialProfiles.map((letdata) =>{ return letdata.name})}</td>
                  <td className="itemsRow">{item.promote_status == true ? "true" : "false" }</td>
                  <td className="itemsRow">{item.rating}</td>
                  <td className="itemsRow">{item.login_at}</td>
                  <td className="optionsRow">
                    <Link to={`/edit-user/${item.id}`}>
                      <FaPencilAlt  aria-hidden="true" />
                    </Link>
                    <Link to={`/user/${item.id}`}>
                      <FaEye aria-hidden="true" />
                    </Link>
                      <CiTrash aria-hidden="true"
                      onClick={() => handelDelete(item.id)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default ShowUser;