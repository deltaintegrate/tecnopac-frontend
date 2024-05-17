import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./User.css";
const EditUser = () => {
  const [user, setUser] = useState([]);
  const { id } = useParams();
  const getUserApi = "http://localhost:3005/user";

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    axios
      .get(getUserApi.concat("/") + id)
      .then((item) => {
        setUser(item.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="user mt-5">
      <table className="table table-bordered">
    <thead>
            <tr>
              <th>USER</th>
              <th>USER ROLE</th>
              <th>STATUS</th>
              <th>SOCIAL PROFILE</th>
              <th>PROMOTE</th>
              <th>RATING</th>
              <th>LAST LOGIN</th>
            </tr>
    </thead>
    <tbody>
      <tr key={i + 1}>
                  <td>{user.name}</td>
                  <td>{user.role['name']}</td>
                  <td>{user.status['name']}</td>
                  <td>{user.socialProfiles['name']}</td>
                  <td>{user.promote_status}</td>
                  <td>{user.rating}</td>
                  <td>{user.login_at}</td>
                  <td>
                    <Link to={`/edit-user/${user.id}`}>
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </Link>
                    <Link to={`/user/${user.id}`}>
                      <i className="fa fa-eye" aria-hidden="true"></i>
                    </Link>
                  </td>
                </tr>
    </tbody>
  </table>
    </div>
  );
};
export default EditUser;