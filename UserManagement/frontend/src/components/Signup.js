import React, { useState } from "react";
import { API } from "../backend";

const Signup = () => {

  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
    message: "",
    success: false,
  });

  const { firstname, lastname, email, phone, password, confirmpassword } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, message: false, [name]: event.target.value });
  };

  const SignupUser = async () => {

    try {
      const response = await fetch(`${API}/signup`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstname, lastname, email, phone, password }),
      });
      console.log(response);
      return await response.json();
    } catch (err) {
      return console.log(err);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, message: false });
    if(values.firstname === "" || values.lastname === "" || values.email === "" || values.phone === "" || values.password === "" || values.confirmpassword === "" ) {
      setValues({ ...values, message: "Fileds cannot be empty!" });
    }
    if (password === confirmpassword) {

      SignupUser(values)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, message: data.error, success: false });
        } else {
          
          setValues({
            ...values,
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            password: "",
            confirmpassword: "",
            message: data.message,
            success: true,
          });
        }
      })
      .catch((err) => {
        console.log("Error occurred in signup: ", err);
      });
    }
    else {
      setValues({ ...values, message: "Password does not match!! Please try again" });
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">Signup Here..</h2>
      <div className="m-8 justify-content-center">
        <span className="text-danger text-center">{values.message}</span>
          <form>
            <div className="form-group">
              <label className="fw-bold">First Name:</label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter firstname"
                onChange={handleChange("firstname")}
              />
            </div>

            <div className="form-group">
              <label className="fw-bold">Last Name:</label>
              <input
                className="form-control"
                type="text"
                required
                placeholder="Enter lastname"
                onChange={handleChange("lastname")}
              />
            </div>

            <div className="form-group">
              <label className="fw-bold">Email:</label>
              <input
                className="form-control"
                type="email"            
                placeholder="Enter email address"
                onChange={handleChange("email")}
              />
            </div>

            <div className="form-group">
              <label className="fw-bold">Phone No:</label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter mobile number"
                onChange={handleChange("phone")}
              />
            </div>

            <div className="form-group">
              <label className="fw-bold">Password:</label>
              <input
                className="form-control"
                type="password"
                placeholder="Enter password"
                onChange={handleChange("password")}
              />
            </div>

            <div className="form-group">
              <label className="fw-bold">Confirm Password:</label>
              <input
                className="form-control"
                type="password"
                placeholder="please re-enter password"
                onChange={handleChange("confirmpassword")}
              />
            </div>
            <div className="m-4 text-center">
            <button onClick={onSubmit} className="btn btn-primary">
              Signup
            </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default Signup;
