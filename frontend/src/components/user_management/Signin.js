import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { API } from "../../backend";
import Page from "../Page";

const Signin = () => {
  let history = useHistory();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const emailregex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (values.email === "" || values.password === "") {
      setError("All fields are required! Please try again");
    } else if (!emailregex.test(values.email)) {
      setError("Please enter valid email address");
    } else {
      SigninUser({ email: values.email, password: values.password })
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            console.log(data);
            authenticateUser(data, () => {
              history.push({
                pathname: "/searchroom",
              });
            });
          }
        })
        .catch((err) => {
          console.log("Error occurred in signin: ", err);
        });
    }
  };

  const SigninUser = async (data) => {
    const response = await fetch(`${API}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  };

  const authenticateUser = (data, next) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", JSON.stringify(data.token));
      next();
    }
  };

  return (
    <Page>
      <h2 className="text-center mt-3">User Login</h2>
      <div className="m-5 justify-content-center">
        <span className="text-danger text-center">{error}</span>
        <form>
          <div className="form-group">
            <label className="fw-bold">Email Id:</label>
            <input
              className="form-control"
              type="text"
              placeholder="Enter your Email Address"
              onChange={handleChange("email")}
            />
          </div>

          <div className="form-group">
            <label className="fw-bold">Password:</label>
            <input
              className="form-control"
              type="password"
              placeholder="Enter your password"
              onChange={handleChange("password")}
            />
          </div>

          <div className="m-4 text-center">
            <button onClick={handleSubmit} className="btn btn-primary">
              Signin
            </button>
          </div>
        </form>
      </div>
    </Page>
  );
};

export default Signin;
