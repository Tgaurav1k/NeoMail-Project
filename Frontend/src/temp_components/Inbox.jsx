import React from "react";
import Sidebar from "./Sidebar";
import {
  MdCropSquare,
  MdInbox,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { FaCaretDown, FaUserFriends } from "react-icons/fa";
import { IoMdMore, IoMdRefresh } from "react-icons/io";
import { GoTag } from "react-icons/go";



const mailType = [
  {
    icon: <MdInbox size="20px" />,
    text: "Primary",
  },
  {
    icon: <GoTag size="20px" />,
    text: "Promotions",
  },
  {
    icon: <FaUserFriends size="20px" />,
    text: "Social",
  },
];

import { useState } from "react";
import Emails from "./Emails";

function Inbox() {
  const [selected, setSelected] = useState(0);
  return (
    <div className="flex-1 bg-white rounded-xl mx-5">
      <div className="flex items-center justify-between  px-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <MdCropSquare size="20px" />
            <FaCaretDown size="24px" />
          </div>
          <div
            className="p-2 rounded-full
        hovor:bg-gray-200 cursor-pointer "
          >
            <IoMdRefresh size="20px" />
          </div>
          <div
            className="p-2 rounded-full
        hovor:bg-gray-200 cursor-pointer "
          >
            {" "}
            <IoMdMore size="20px" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span>1 to 50</span>
          <MdKeyboardArrowLeft size="24px" />
          <MdKeyboardArrowRight size="24px" />
        </div>
      </div>
      <div className="h-90vh overflow-y-auto">
        <div className="flex items-center gap-1">
          {mailType.map((item, index) => (
            <button
              key={index}
              className={`flex items-center gap-5 p-4 w-52 hover:bg-gray-100 my-2 ${
                selected === index
                  ? "border-b-4 border-b-blue-600 text-blue-600"
                  : ""
              }`}
              onClick={ ()=>setSelected(index)}
            >
              {item.icon}
              <span>{item.text}</span>
            </button>
          ))}
        </div>
      <Emails />
      </div>
    </div>
  );
}

export default Inbox;
