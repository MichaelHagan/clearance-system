// src/components/StudentLogin.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL, getToken } from "../utils/helperFunctions";

const UpdateRole = ({ closeModal, user_id }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [val, setVal] = useState({});

  const [departmentsData, setDeptData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${baseURL}/departments`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        setDeptData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${baseURL}/users/${user_id}`, val, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      closeModal();
      window.location.reload();
    } catch (error) {
      // Handle the error
      console.error("Error:", error);
      setErrorMessage("Check your credentials");
    }
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setVal((prev) => ({ ...prev, [name]: value }));
  };

  console.log(user_id, "Womba");
  return (
    <div className="flex items-center justify-center">
      <div className=" p-8 rounded-lg w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Department
        </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <select
              name="RoleId"
              onChange={handleInput}
              className={
                "w-full px-4 py-2 border mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              }
            >
              <option>Select Role</option>
              <option className="" value={Number(1)}>
                Admin
              </option>
              <option className="" value={Number(3)}>
                Staff
              </option>
              <option className="" value={Number(4)}>
                Student
              </option>
              <option className="" value={Number(2)}>
                Department Staff
              </option>
            </select>
            <select
              name="DepartmentId"
              onChange={handleInput}
              className={`w-full px-4 py-2 border mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                Number(val.RoleId) === 2 ? "" : "hidden"
              }`}
            >
              <option>Select Department</option>
              <option className="" value={Number(1)}>
                Admin
              </option>
              {departmentsData.map((data, index) => (
                <option className="" value={Number(data?.id)}>
                  {data?.name}
                </option>
              ))}
            </select>
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

export default UpdateRole;
