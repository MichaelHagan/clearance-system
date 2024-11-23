// src/components/StudentClearanceCard.js
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

import { SquareMenu } from "lucide-react";
import axios from "axios";
import { baseURL, getToken } from "../utils/helperFunctions";

const ManageUsers = () => {
  const navigate = useNavigate();

  const [userDetials, setUserDetails] = useState([]);
  const loginUser = sessionStorage.getItem("authenticated");

  useEffect(() => {
    if (loginUser === "null") {
      return navigate("/login");
    }
    const getData = async () => {
      try {
        const response = await axios.get(`${baseURL}/users`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        console.log(response.data, "dataaaa");
        setUserDetails(response.data);
      } catch (error) {
        console.log(error);
        window.alert("Token Expired");
        navigate("/login");
      }
    };
    getData();
  }, []);

  const handleDelete = async (e) => {
    try {
      await axios.delete(`${baseURL}/users/${Number(e?.target?.id)}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setUserDetails(userDetials.filter((data) => data.id !== e?.target?.id));
    } catch (error) {
      window.alert("Something went wrong");
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 mx-[10rem]">
      <NavBar />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-[7rem]">
          <div className="flex gap-3 items-center">
            <p className={"p-3 bg-blue-400 rounded"}>
              <SquareMenu className={"block text-white"} />
            </p>
            <h1 className="text-xl md:text-2xl font-bold text-blue-600 mb-2 md:mb-0">
              Manager Users
            </h1>
          </div>
        </div>
        <div>
          <div className={"bg-white p-3"}>
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white text-left">
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Username</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Gender Name</th>
                  <th className="py-2 px-4 border-b">Phone Number</th>
                  <th className="py-2 px-4 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {userDetials.map((user, index) => (
                  <tr key={index} className="odd:bg-gray-100 even:bg-white">
                    <td className="py-2 px-4 border-b">
                      {user?.firstName} {user?.lastName}
                    </td>
                    <td className="py-2 px-4 border-b">{user?.userName}</td>
                    <td className="py-2 px-4 border-b">{user?.email}</td>
                    <td className="py-2 px-4 border-b">{user?.gender}</td>
                    <td className="py-2 px-4 border-b">{user?.phoneNumber}</td>
                    <td className="py-2 px-4 border-b">
                      <button className="text-blue-600 font-semibold hover:underline">
                        Edit
                      </button>
                      {" | "}
                      <button
                        className="text-blue-600 font-semibold hover:underline"
                        id={user?.id}
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
