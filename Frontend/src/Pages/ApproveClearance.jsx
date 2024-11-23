// src/components/StudentClearanceCard.js
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import {
  SquareChevronLeft,
  SquareChevronRight,
  SquareMenu,
} from "lucide-react";
import axios from "axios";
import {
  baseURL,
  getStatusClass,
  getToken,
  replaceObjectInArray,
} from "../utils/helperFunctions";

const ApproveClearance = () => {
  const navigate = useNavigate();

  const [approvalsData, setapprovalsData] = useState([]);

  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const determinUrl = (url, authUser) => {
    return authUser?.roleName === "admin"
      ? `${url}/approvals`
      : `${url}/approvals/department/${authUser.DepartmentId}`;
  };

  useEffect(() => {
    const loginUser = sessionStorage.getItem("authenticated");
    if (!loginUser) {
      window.alert("Not Authenticated");
      return navigate("/login");
    }
    const getData = async () => {
      try {
        const response = await axios.get(`${determinUrl(baseURL, authUser)}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        setapprovalsData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  console.log(approvalsData);
  const approveClearance = async (id, status) => {
    try {
      const response = await axios.put(
        `${baseURL}/approvals/${id}`,
        {
          status: `${status}`,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      setapprovalsData(
        replaceObjectInArray(
          approvalsData,
          response?.data?.id,
          response?.data?.status
        )
      );
      // setapprovalsData();
    } catch (error) {
      console.log(error);
    }
  };

  const onClickApprove = (e) => {
    approveClearance(e.target.id, "approved");
  };

  const onClickDisapprove = (e) => {
    approveClearance(e.target.id, "rejected");
  };

  // Paginations

  const [currentPage, setCurrentPage] = useState(1);

  // Calculate indices for slicing the data
  const startIndex = (currentPage - 1) * 15;
  const endIndex = startIndex + 15;

  // Get the current page's data
  const currentData = approvalsData.slice(startIndex, endIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(approvalsData.length / 15);

  // Function to handle page changes
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
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
              Clearance Unit:{" "}
              {authUser?.department
                ? `${authUser?.department?.name}`
                : `${authUser?.roleName}`}
            </h1>
          </div>
        </div>
        <div>
          <div className={"bg-white p-3"}>
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white text-left">
                  <th className="py-2 px-4 border-b">Student No</th>
                  <th className="py-2 px-4 border-b">Student Name</th>
                  <th className="py-2 px-4 border-b">Department</th>
                  <th className="py-2 px-4 border-b">Status</th>
                  <th className="py-2 px-4 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((student, index) => (
                  <tr key={index} className="odd:bg-gray-100 even:bg-white">
                    <td className="py-2 px-4 border-b">{student?.user?.id}</td>
                    <td className="py-2 px-4 border-b">
                      {student?.user?.firstName} {student?.user?.lastName}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {student?.departmentName}
                    </td>
                    <td
                      className={`py-2 px-4 border-b ${getStatusClass(
                        student?.status
                      )}`}
                    >
                      {student?.status}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        id={student?.id}
                        className="text-blue-600 font-semibold hover:underline"
                        onClick={onClickApprove}
                      >
                        Approve
                      </button>
                      {" | "}
                      <button
                        id={student?.id}
                        className="text-blue-600 font-semibold hover:underline"
                        onClick={onClickDisapprove}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination controls */}
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex gap-1`}
              >
                {<SquareChevronLeft />}Previous
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={currentPage === index + 1 ? "text-[#007bff]" : ""}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex gap-1`}
              >
                Next{<SquareChevronRight />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApproveClearance;
