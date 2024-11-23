import { SquareMenu } from "lucide-react";
import React from "react";
import ProfileInitials from "./ProfileInitials";
import { getInitials } from "../utils/helperFunctions";

const Header = ({ header_name, name }) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-[8.4375rem]">
      <div className="flex gap-3 items-center">
        <p className={"p-3 bg-blue-400 rounded"}>
          <SquareMenu className={"block text-white"} />
        </p>
        <h1 className="text-xl md:text-2xl font-bold text-blue-600 mb-2 md:mb-0">
          {header_name}
        </h1>
      </div>
      {/* <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors">
      Print
    </button> */}
      <ProfileInitials name={getInitials(name)} />
    </div>
  );
};

export default Header;
