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
    <div className="flex-1 min-w-0 bg-white rounded-none sm:rounded-xl mx-0 sm:mx-3 md:mx-5">
      <div className="flex items-center justify-between px-2 sm:px-4 py-2">
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="hidden sm:flex items-center gap-1">
            <MdCropSquare size="20px" />
            <FaCaretDown size="24px" />
          </div>
          <button className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
            <IoMdRefresh size="20px" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
            <IoMdMore size="20px" />
          </button>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
          <span className="hidden sm:inline">1 to 50</span>
          <MdKeyboardArrowLeft size="20px" />
          <MdKeyboardArrowRight size="20px" />
        </div>
      </div>
      <div className="h-[calc(100vh-8rem)] sm:h-[calc(100vh-9rem)] overflow-y-auto">
        <div className="flex items-center gap-0 sm:gap-1 overflow-x-auto">
          {mailType.map((item, index) => (
            <button
              key={index}
              className={`flex items-center gap-2 sm:gap-5 px-3 sm:p-4 py-3 flex-1 sm:flex-none sm:w-52 hover:bg-gray-100 my-1 sm:my-2 text-sm sm:text-base whitespace-nowrap ${
                selected === index
                  ? "border-b-4 border-b-blue-600 text-blue-600"
                  : ""
              }`}
              onClick={() => setSelected(index)}
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
