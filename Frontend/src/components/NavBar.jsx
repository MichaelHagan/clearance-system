import React from "react";
import { BellElectric, House, LibraryBig, LogOut, Users } from "lucide-react";
import { getMenuVisibility } from "../utils/helperFunctions";

const NavBar = () => {
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("authUser");
    sessionStorage.removeItem("authenticated");
  };
  return (
    <div className="w-full md:w-[15%] bg-black border-r h-lvh shadow-md  mt-9">
      <div className="flex flex-col gap-3 mb-6 px-[2rem] bg-blue-300 w-full content-center">
        <img
          src="https://res.cloudinary.com/dt8vgj0u3/image/upload/v1732118677/gala/image-removebg-preview_1_jxbdtd.png"
          alt="User"
          className="w-[50rem] rounded-full"
        />
        {/* <ProfileInitials
          name={getInitials(`${authUser?.firstName} ${authUser?.lastName}`)}
        /> */}
        <div className="">
          <h3 className="font-semibold">{authUser?.name}</h3>
        </div>
      </div>
      <nav className={`flex flex-col gap-5 justify-between h-1/4 pl-5`}>
        <div
          className={`flex gap-3 text-white  ${
            authUser?.roleName === "admin" ||
            authUser?.roleName === "department_staff"
              ? "hidden"
              : "flex"
          }`}
        >
          {<House size={24} />}
          <a
            href={"/dashboard"}
            className="block font-medium hover:text-blue-500"
          >
            {"Home"}
          </a>
        </div>
        <div
          className={`gap-3 text-white ${getMenuVisibility(
            authUser?.roleName,
            "manage_users"
          )}`}
        >
          {<Users />}
          <a
            href={"/manage-users"}
            className="block font-medium hover:text-blue-500"
          >
            {"Manage Users"}
          </a>
        </div>
        <div
          className={`gap-3 text-white  ${getMenuVisibility(
            authUser?.roleName,
            "manage_department"
          )}`}
        >
          {<BellElectric />}
          <a
            href={"/manage-dept"}
            className="block font-medium hover:text-blue-500"
          >
            {"Manage Departments"}
          </a>
        </div>
        <div
          className={`gap-3 text-white ${getMenuVisibility(
            authUser?.roleName,
            "manage_clearance"
          )}`}
        >
          {<LibraryBig />}
          <a
            href={"/approve"}
            className={`block font-medium hover:text-blue-500`}
          >
            {"Clearance Issues"}
          </a>
        </div>
        <div className="flex gap-3 text-white" onClick={logOut}>
          {<LogOut />}
          <a href={"/login"} className="block font-medium hover:text-blue-500">
            {"Log Out"}
          </a>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
