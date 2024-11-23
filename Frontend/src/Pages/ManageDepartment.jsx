// src/components/StudentClearanceCard.js
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { CircleX, SquareMenu } from "lucide-react";
import axios from "axios";
import { baseURL, getToken } from "../utils/helperFunctions";
import ModalComponent from "../components/ModalComponent";
import AddDept from "./AddDept";

const ManageDepartment = () => {
  // Manage Depts.
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();
  const [departmentsData, setDeptData] = useState([]);

  useEffect(() => {
    const loginUser = sessionStorage.getItem("authenticated");
    if (!loginUser) {
      return navigate("/login");
    }
    const getData = async () => {
      try {
        const response = await axios.get(`${baseURL}/departments`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        setDeptData(response.data);
      } catch (error) {
        window.alert("Token Expired");
        navigate("/");
      }
      // if (response.status === 403) navigate("/");
    };
    getData();
  }, []);

  const handleDelete = async (e) => {
    try {
      await axios.delete(`${baseURL}/departments/${Number(e?.target?.id)}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setDeptData(departmentsData.filter((data) => data.id !== e?.target?.id));
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
              Manage Departments
            </h1>
          </div>
        </div>
        <div>
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors mb-4"
            onClick={openModal}
          >
            Add Department
          </button>
          <div className={"bg-white p-3"}>
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white text-left">
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {departmentsData.map((data, index) => (
                  <tr key={index} className="odd:bg-gray-100 even:bg-white">
                    <td className="py-2 px-4 border-b">{data?.name}</td>
                    <td className="py-2 px-4 border-b">
                      <button className="text-blue-600 font-semibold hover:underline">
                        Edit
                      </button>
                      {" | "}
                      <button
                        className="text-blue-600 font-semibold hover:underline"
                        id={data?.id}
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
      <ModalComponent
        isOpen={isModalOpen}
        closeModal={closeModal}
        className={
          "flex justify-center items-center h-screen bg-gray-100 overflow-y-auto"
        }
      >
        <button onClick={closeModal}>{<CircleX />}</button>
        <AddDept closeModal={closeModal} />
      </ModalComponent>
    </div>
  );
};

export default ManageDepartment;
