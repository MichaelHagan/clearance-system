// src/components/StudentLogin.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseURL, decodedToken, setToken } from "../utils/helperFunctions";

const StudentLogin = () => {
  const [matricNumber, setMatricNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/users/login`, {
        identifier: matricNumber,
        password,
      });

      sessionStorage.setItem("authenticated", true);
      setToken(response?.data);
      const decode = decodedToken(response.data);
      localStorage.setItem("authUser", JSON.stringify(decode));
      if (decode?.roleName === "admin") {
        navigate("/manage-users");
      } else if (decode?.roleName === "department_staff") {
        navigate("/manage-dept");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      // Handle the error
      setErrorMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dt8vgj0u3/image/upload/v1732162178/gala/photo-collage.png_gbhzql.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "Background",
      }}
    >
      <div className="flex items-center justify-center min-h-screen bg-blue-950/70 gap-5">
        <div className="flex bg-white shadow-lg">
          <div>
            <img
              src="https://res.cloudinary.com/dt8vgj0u3/image/upload/v1732118677/gala/image-removebg-preview_1_jxbdtd.png"
              alt="logo"
            />
          </div>
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Matric number"
                  value={matricNumber}
                  onChange={(e) => setMatricNumber(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                SIGN IN
              </button>
              {errorMessage && (
                <p className="text-red-500 text-sm mt-4">{errorMessage}</p>
              )}
            </form>
            <p className="mt-4 text-sm text-center">
              Dont have an account?{" "}
              <a href="/signup" className="text-blue-500 hover:underline">
                Register Here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
