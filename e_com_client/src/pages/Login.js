import { useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { USER_LOGIN } from "../gqloperation/mutation";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [fromData, setFromData] = useState({
    identifier: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }else{
      navigate("/login")
    }
  }, []);

  const [loginUser, { loading, error, data }] = useMutation(USER_LOGIN);
  if (loading) return <h1>Loading...</h1>;
  if (data) {
    localStorage.setItem("token", data.login.jwt);
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
     
      <div className="container" >
      {error && <div className="card-panel red">{error.message}</div>}
        <h3 style={{ marginTop: "10rem" }}>User Login</h3>
        <form className="col s9" onSubmit={loginFormHandler}>
          <div className="row">
            <div className="input-field col s8">
              <input
                id="email"
                type="text"
                className="validate"
                onChange={changeHandler}
                value={fromData.email}
                name="identifier"
              />
              <label htmlFor="email">Email & UserName</label>
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
