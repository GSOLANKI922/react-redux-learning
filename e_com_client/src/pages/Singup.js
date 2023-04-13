import { useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { USER_LOGIN, USER_SINGUP } from "../gqloperation/mutation";
import { useNavigate } from "react-router-dom";

const Singup = () => {
  const navigate = useNavigate();
  const [fromData, setFromData] = useState({
    username: "",
    password: "",
    email: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  const [loginUser, { loading, error, data }] = useMutation(USER_SINGUP);
  if (loading) return <h1>Loading...</h1>;
  if (data) {
    console.log(data, "singup");
    localStorage.setItem("token", data.register.jwt);
    navigate("/");
  }

  const changeHandler = ({ target }) => {
    const { name, value } = target;
    setFromData({
      ...fromData,
      [name]: value,
    });
  };

  const loginFormHandler = (e) => {
    e.preventDefault();
    loginUser({
      variables: {
        input: fromData,
      },
    });
  };

  return (
    <div>
      <div className="container">
        {error && <div className="card-panel red">{error.message}</div>}
        <h3 style={{ marginTop: "10rem" }}>User Singup</h3>
        <form className="col s9" onSubmit={loginFormHandler}>
          <div className="row">
            <div className="input-field col s8">
              <input
                id="username"
                type="text"
                className="validate"
                onChange={changeHandler}
                value={fromData.username}
                name="username"
              />
              <label htmlFor="username">firstName</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s8">
              <input
                id="email"
                type="email"
                className="validate"
                onChange={changeHandler}
                value={fromData.email}
                name="email"
              />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s8">
              <input
                id="password"
                type="password"
                className="validate"
                onChange={changeHandler}
                value={fromData.password}
                name="password"
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <button type="submit" className="waves-effect waves-light btn-large">
            Singup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Singup;
