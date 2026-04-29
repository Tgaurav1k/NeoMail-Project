import React from "react";
import { IoMdArrowBack, IoMdMore } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { BiArchive } from "react-icons/bi";
import {
  MdDeleteOutline,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineAddTask,
  MdOutlineDriveFileMove,
  MdOutlineMarkEmailRead,
  MdOutlineReport,
  MdOutlineWatchLater,
} from "react-icons/md";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";

function Mail() {
  const navigate = useNavigate();

  // select mail to open it
  const { selectedEmail, user } = useSelector((store) => store.app);

  // to get delete email message id
 const params = useParams();
 
 // Determine if this is a sent or received email
 const isSentEmail = selectedEmail?.userId?._id === user?._id;
 const senderName = isSentEmail 
   ? user?.fullname || "Me" 
   : selectedEmail?.userId?.fullname || "Unknown";
 const senderEmail = isSentEmail 
   ? user?.email 
   : selectedEmail?.userId?.email || selectedEmail?.to;
 
 // Format date
 const formatDate = (dateString) => {
   if (!dateString) return "";
   const date = new Date(dateString);
   const now = new Date();
   const diffTime = Math.abs(now - date);
   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
   
   if (diffDays === 0) return "Today";
   if (diffDays === 1) return "Yesterday";
   if (diffDays < 7) return `${diffDays} days ago`;
   return date.toLocaleDateString();
 }



  // delete mail
  const deleteHandler = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/v1/email/${params.id}`,
        { withCredentials: true }
      );
      toast.success(res.data.message || "delete successful");
      navigate("/inbox");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-1 min-w-0 bg-white rounded-none sm:rounded-xl mx-0 sm:mx-3 md:mx-5">
      <div className="flex items-center justify-between px-2 sm:px-4 py-2">
        <div className="flex items-center gap-1 sm:gap-2 text-gray-700 overflow-x-auto">
          <button
            onClick={() => navigate("/inbox")}
            className="p-2 rounded-full hover:bg-gray-200 shrink-0"
          >
            <IoMdArrowBack size="20px" />
          </button>
          <div className="hidden sm:block p-2 rounded-full hover:bg-gray-200">
            <BiArchive size="20px" />
          </div>
          <div className="hidden sm:block p-2 rounded-full hover:bg-gray-200">
            <MdOutlineReport size="20px" />
          </div>
          <button
            onClick={deleteHandler}
            className="p-2 rounded-full hover:bg-gray-200 shrink-0"
          >
            <MdDeleteOutline size="20px" />
          </button>
          <div className="hidden md:block p-2 rounded-full hover:bg-gray-200">
            <MdOutlineMarkEmailRead size="20px" />
          </div>
          <div className="hidden md:block p-2 rounded-full hover:bg-gray-200">
            <MdOutlineWatchLater size="20px" />
          </div>
          <div className="hidden md:block p-2 rounded-full hover:bg-gray-200">
            <MdOutlineAddTask size="20px" />
          </div>
          <div className="hidden md:block p-2 rounded-full hover:bg-gray-200">
            <MdOutlineDriveFileMove size="20px" />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 shrink-0">
            <IoMdMore size="20px" />
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <span>1 to 50</span>
          <MdKeyboardArrowLeft size="24px" />
          <MdKeyboardArrowRight size="24px" />
        </div>
      </div>
      <div className="h-[calc(100vh-8rem)] sm:h-[calc(100vh-9rem)] overflow-y-auto p-3 sm:p-4">
        <div className="flex justify-between bg-white items-start gap-2">
          <div className="flex items-start sm:items-center gap-2 flex-wrap min-w-0">
            <h1 className="text-lg sm:text-xl font-medium break-words">{selectedEmail?.subject || "No Subject"}</h1>
            <span className={`text-xs sm:text-sm rounded-md px-2 py-0.5 ${
              isSentEmail
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-200 text-gray-700"
            }`}>
              {isSentEmail ? "Sent" : "Inbox"}
            </span>
          </div>
          <div className="shrink-0 text-gray-400 text-xs sm:text-sm">{formatDate(selectedEmail?.createdAt)}</div>
        </div>
        <div className="flex-none py-4 text-gray-500 text-sm border-b border-gray-200">
          {isSentEmail ? (
            <>
              <h1 className="font-medium">To: {selectedEmail?.to}</h1>
              <span className="text-gray-400">from me</span>
            </>
          ) : (
            <>
              <h1 className="font-medium">From: {senderName}</h1>
              <span className="text-gray-400">{senderEmail}</span>
              <p className="mt-1">To: me</p>
            </>
          )}
        </div>
        <div className="my-10">
          <p className="whitespace-pre-wrap">{selectedEmail?.message}</p>
        </div>
      </div>
    </div>
  );
}

export default Mail;
