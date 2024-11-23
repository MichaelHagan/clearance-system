// src/components/StudentLogin.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../utils/helperFunctions";

const SignUp = () => {
  const signUpInput = [
    {
      label: "Enter Username",
      name: "userName",
      placeholder: "User Name",
      type: "text",
    },
    {
      label: "First Name",
      name: "firstName",
      placeholder: "First Name",
      type: "text",
    },
    {
      label: "Last Name",
      name: "lastName",
      placeholder: "Last Name",
      type: "text",
    },
    {
      label: "Gender",
      name: "gender",
      placeholder: "Gender",
      type: "text",
    },
    {
      label: "Nationality",
      name: "nationality",
      placeholder: "Nationality",
      type: "text",
    },
    {
      label: "Email",
      name: "email",
      placeholder: "Email",
      type: "text",
    },
    {
      label: "Phone Number",
      name: "phoneNumber",
      placeholder: "Phone",
      type: "text",
    },
    {
      label: "Enter Password",
      name: "password",
      placeholder: "Enter Password",
      type: "password",
    },
  ];

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [val, setVal] = useState({});

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setVal((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/users`, val);
      console.log(response);

      navigate("/login");
    } catch (error) {
      setErrorMessage("SignUp failed. Please Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[31.25rem]">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          {signUpInput.map(({ name, type, placeholder, label }, index) => (
            <div className="mb-4" key={index}>
              <label>{label}</label>
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={val.name}
                onChange={handleInput}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          ))}
          <div>
            <select
              name="RoleId"
              onChange={handleInput}
              className={
                "w-full px-4 py-2 border mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              }
            >
              <option>Select Role</option>
              <option className="" value={Number(3)}>
                Staff
              </option>
              <option className="" value={Number(4)}>
                Student
              </option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            SignUp
          </button>
          {errorMessage && (
            <p className="text-red-500 text-sm mt-4">{errorMessage}</p>
          )}
        </form>
        <p className="mt-4 text-sm text-center">
          Have an Account ?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login Here
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
