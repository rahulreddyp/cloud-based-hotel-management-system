import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { API } from "../backend";

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

    const emailregex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (values.email === "" || values.password === "") {
      setError("All fields are required! Please try again");
    } else if (!emailregex.test(values.email)) {
      setError("Please enter valid email address");
    } else {
      SigninUser({ email: values.email, password: values.password })
      .then((data) => {
        if (data.status === 200) {
          history.push({
            pathname: "/profile",
          });
        }
         else {
          setError(data.response);
        }
      })
      .catch((err)=> {
        console.log("Error occurred in signin: ", err);
      });
    }
  };

  const SigninUser = async (data) => {
    const response = await fetch(`${API}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    return await response.json();
      // .then((res) => {
      //   if (res.status === 200) {
      //     history.push({
      //       pathname: "/profile",
      //     });
      //   }
      //    else {
      //     console.log(res.response);
      //     setError(res.response);
      //     console.log(error);
      //   }
      // })
      // .catch((err) => {
      //   console.log(err.response);
      //   setError(err.response);
      // });
  };

  return (
    <div className="container">
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
    </div>
  );
};

export default Signin;
