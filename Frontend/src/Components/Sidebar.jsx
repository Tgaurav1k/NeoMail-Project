import React from "react";
import { IoMdMore, IoMdStar } from "react-icons/io";
import { LuPencil, LuInbox, LuSend } from "react-icons/lu";
import { MdOutlineWatchLater, MdDrafts } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { setOpen, setSidebarOpen } from "../redux/appSlice";

const sideBarItems = [
  { icon: <LuInbox size="20px" />, text: "Inbox" },
  { icon: <IoMdStar size="20px" />, text: "Starred" },
  { icon: <MdOutlineWatchLater size="20px" />, text: "Snoozed" },
  { icon: <LuSend size="20px" />, text: "Sent" },
  { icon: <MdDrafts size="20px" />, text: "Drafts" },
  { icon: <IoMdMore size="20px" />, text: "More" },
];

function Sidebar() {
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector((store) => store.app);

  const closeSidebar = () => dispatch(setSidebarOpen(false));

  return (
    <>
      {/* Backdrop — mobile only when open */}
      {sidebarOpen && (
        <div
          onClick={closeSidebar}
          className="md:hidden fixed inset-0 bg-black/40 z-30"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          bg-white border-r border-gray-300 shrink-0
          md:static md:translate-x-0 md:w-[250px] md:min-h-screen md:block
          fixed top-0 left-0 h-full w-[260px] z-40
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="p-4">
          {/* Mobile close button */}
          <div className="flex justify-end md:hidden mb-2">
            <button
              onClick={closeSidebar}
              className="p-2 rounded-full hover:bg-gray-200"
              aria-label="Close sidebar"
            >
              <RxCross2 size={20} />
            </button>
          </div>

          <button
            onClick={() => {
              dispatch(setOpen(true));
              closeSidebar();
            }}
            className="flex items-center gap-2 bg-[#C2E7FF] text-black font-medium p-3 rounded-xl hover:shadow-md transition"
          >
            <LuPencil size={20} />
            <span>Compose</span>
          </button>

          <div className="mt-6 text-gray-700">
            {sideBarItems.map((item, index) => (
              <div
                key={index}
                onClick={closeSidebar}
                className="flex items-center gap-3 pl-4 py-2 rounded-r-full hover:bg-gray-200 cursor-pointer transition"
              >
                {item.icon}
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
