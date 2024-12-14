// src/components/StudentLogin.js
import React, { useState } from "react";
import axios from "axios";
import { baseURL, getToken } from "../utils/helperFunctions";

const AddDept = ({ closeModal }) => {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${baseURL}/departments`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      closeModal();
      window.location.reload();
    } catch (error) {
      // Handle the error
      setErrorMessage("Check your credentials");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className=" p-8 rounded-lg w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Department
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Add
          </button>
          {errorMessage && (
            <p className="text-red-500 text-sm mt-4">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddDept;
