import React from "react";

const ProfileInitials = ({ name, className }) => {
  return (
    <div
      className={`w-[4rem] h-[4rem] bg-slate-400 flex items-center justify-center rounded-full ${className}`}
    >
      <h1 className="text-center text-[2rem] text-slate-700 min-w-4 font-semibold">
        {name}
      </h1>
    </div>
  );
};

export default ProfileInitials;
