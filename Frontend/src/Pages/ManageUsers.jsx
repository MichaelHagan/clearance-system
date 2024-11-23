// src/components/StudentClearanceCard.js
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { CircleX } from "lucide-react";
import axios from "axios";
import { baseURL, getToken } from "../utils/helperFunctions";
import ModalComponent from "../components/ModalComponent";
import UpdateRole from "../components/UpdateRole";
import Header from "../components/Header";

const ManageUsers = () => {
  const navigate = useNavigate();
  const [userDetials, setUserDetails] = useState([]);
  const loginUser = sessionStorage.getItem("authenticated");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedUserId, setClickedUserId] = useState("");
  const authUser = JSON.parse(localStorage.getItem("authUser"));

  const openModal = (e) => {
    setClickedUserId(e.target.id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
        <Header
          header_name={`Manager Users`}
          name={`${authUser.firstName} ${authUser.lastName}`}
        />
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
                  <th className="py-2 px-4 border-b">Role</th>
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
                    <td className="py-2 px-4 border-b">{user?.roleName}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        className="text-blue-600 font-semibold hover:underline"
                        onClick={openModal}
                        id={user?.id}
                      >
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
      <ModalComponent
        isOpen={isModalOpen}
        closeModal={closeModal}
        className={
          "flex justify-center items-center h-screen bg-gray-100 overflow-y-auto"
        }
      >
        <button onClick={closeModal}>{<CircleX />}</button>
        <UpdateRole closeModal={closeModal} user_id={clickedUserId} />
      </ModalComponent>
    </div>
  );
};

export default ManageUsers;
