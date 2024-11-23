// src/components/StudentClearanceCard.js
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

import { Ban, Check, Loader, SquareMenu } from "lucide-react";
import axios from "axios";
import { baseURL, getToken } from "../utils/helperFunctions";

const StudentClearanceCard = () => {
  const navigate = useNavigate();

  const loginUser = sessionStorage.getItem("authenticated");

  const [userDetials, setUserDetails] = useState({});
  const [clearanceData, setclearanceData] = useState([]);

  const authUser = JSON.parse(localStorage.getItem("authUser"));
  useEffect(() => {
    if (!loginUser) {
      return navigate("/login");
    }
    const getData = async () => {
      const response = await axios.get(`${baseURL}/users/${authUser?.id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setUserDetails(response?.data?.dataValues);
    };
    getData();

    const loadClearanceData = async () => {
      const response = await axios.get(
        `${baseURL}/approvals/user/${authUser?.id}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      setclearanceData(response?.data);
    };
    if (authUser?.roleName !== "admin" || "department_staff")
      loadClearanceData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 mx-[10rem]">
      <NavBar />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
          <div className="flex gap-3 items-center">
            <p className={"p-3 bg-blue-400 rounded"}>
              <SquareMenu className={"block text-white"} />
            </p>
            <h1 className="text-xl md:text-2xl font-bold text-blue-600 mb-2 md:mb-0">
              Clearance Card
            </h1>
          </div>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors">
            Print
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Clearance Progress</h2>
          <div className="bg-gray-300 rounded-full h-4">
            <div
              className="bg-green-500 h-4 rounded-full"
              style={{ width: "100%" }}
            >
              <span className="sr-only">100% cleared</span>
            </div>
          </div>
        </div>

        {/* Student Details and Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Student Details Card */}
          <div className="bg-white p-6 rounded-lg shadow-md h-[87vh]">
            <h3 className="text-lg md:text-xl font-bold mb-4">User Detials</h3>
            <div className="mb-4">
              <div className="space-y-2 text-sm md:text-base h-[62vh] flex flex-col justify-evenly border-2 rounded border-blue-400">
                <div className="flex p-5 border-b-2">
                  <h1 className="flex flex-[0.6]">
                    {" "}
                    <strong>{"Name"}</strong>
                  </h1>
                  <h1 className="flex flex-[0.4]">{`${userDetials?.firstName} ${userDetials?.lastName}`}</h1>
                </div>
                <div className="flex p-5 border-b-2">
                  <h1 className="flex flex-[0.6]">
                    {" "}
                    <strong>{"Gender"}</strong>
                  </h1>
                  <h1 className="flex flex-[0.4]">{`${userDetials?.gender}`}</h1>
                </div>
                <div className="flex p-5 border-b-2">
                  <h1 className="flex flex-[0.6]">
                    {" "}
                    <strong>{"Email"}</strong>
                  </h1>
                  <h1 className="flex flex-[0.4]">{`${userDetials?.email}`}</h1>
                </div>
                <div className="flex p-5 border-b-2">
                  <h1 className="flex flex-[0.6]">
                    {" "}
                    <strong>{"Phone"}</strong>
                  </h1>
                  <h1 className="flex flex-[0.4]">{`${userDetials?.phoneNumber}`}</h1>
                </div>
                <div className="flex p-5 border-b-2">
                  <h1 className="flex flex-[0.6]">
                    {" "}
                    <strong>{"Nationality"}</strong>
                  </h1>
                  <h1 className="flex flex-[0.4]">{`${userDetials?.nationality}`}</h1>
                </div>
              </div>
            </div>
          </div>

          {/* Student Clearance Status */}
          <div className="bg-white p-6 rounded-lg shadow-md h-[87vh]">
            <h3 className="text-lg md:text-xl font-bold mb-10 text-blue-600">
              CLEARANCE STATUS
            </h3>
            <div className="flex flex-col justify-between gap-5 p-7 bg-[#e5eaf5] h-[74vh] ">
              <div className="flex border-b-2 border-[#989ca3] pb-3 font-bold">
                <h1 className="flex flex-[0.6] ">Clearance Unit</h1>
                <h1>Status</h1>
              </div>
              {clearanceData.map((data, index) => (
                <div
                  className="flex border-b-2 border-[#989ca3] pb-3"
                  key={index}
                >
                  <h1 className="flex flex-[0.6]">{data?.departmentName}</h1>
                  {data?.status === "approved" ? (
                    <Check className={"text-green-700 size-6"} />
                  ) : data?.status === "rejected" ? (
                    <Ban className={"text-red-600 size-6"} />
                  ) : (
                    <Loader className={"size-6"} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentClearanceCard;
