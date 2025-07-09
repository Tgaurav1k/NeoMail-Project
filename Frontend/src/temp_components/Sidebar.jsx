import React from "react";
import { IoMdMore, IoMdStar } from "react-icons/io";
import { LuPencil, LuInbox, LuSend } from "react-icons/lu";
import { MdOutlineWatchLater, MdDrafts } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setOpen } from "../redux/appSlice";

const sideBarItems = [
  {
    icon: <LuInbox size="20px" />,
    text: "Inbox",
  },
  {
    icon: <IoMdStar size="20px" />,
    text: "Starred",
  },
  {
    icon: <MdOutlineWatchLater size="20px" />,
    text: "Snoozed",
  },
  {
    icon: <LuSend size="20px" />,
    text: "Sent",
  },
  {
    icon: <MdDrafts size="20px" />,
    text: "Drafts",
  },
  {
    icon: <IoMdMore size="20px" />,
    text: "More",
  },
];

function Sidebar() {
  const dispatch = useDispatch();
  return (
    <div className="w-[250px] min-h-screen bg-white border-r border-gray-300">
      <div className="p-4">
        <button
          onClick={() => dispatch(setOpen(true))}
          className="flex items-center gap-2 bg-[#C2E7FF] text-black font-medium p-3 rounded-xl hover:shadow-md transition"
        >
          <LuPencil size={20} />
          <span>Compose</span>
        </button>

        {/* Sidebar*/}
        <div className="mt-6 text-gray-700">
          {sideBarItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 pl-4 py-2 rounded-r-full hover:bg-gray-200 cursor-pointer transition"
            >
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
