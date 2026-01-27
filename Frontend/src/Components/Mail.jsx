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
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-1 bg-white rounded-xl mx-5">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-2 text-gray-700">
          <div
            onClick={() => navigate("/")}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <IoMdArrowBack size="20px" />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200">
            <BiArchive size="20px" />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200">
            <MdOutlineReport size="20px" />
          </div>
          <div
            onClick={deleteHandler}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <MdDeleteOutline size="20px" />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200">
            <MdOutlineMarkEmailRead size="20px" />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200">
            <IoMdArrowBack size="20px" />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200">
            <MdOutlineWatchLater size="20px" />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200">
            <MdOutlineAddTask size="20px" />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200">
            <MdOutlineDriveFileMove size="20px" />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200">
            <IoMdMore size="20px" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span>1 to 50</span>
          <MdKeyboardArrowLeft size="24px" />
          <MdKeyboardArrowRight size="24px" />
        </div>
      </div>
      <div className="h-[90vh] overflow-y-auto p-4">
        <div className="flex justify-between bg-white items-center gap-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-medium ">{selectedEmail?.subject || "No Subject"}</h1>
            <span className={`text-sm rounded-md px-2 py-0.5 mt-1 ${
              isSentEmail 
                ? "bg-blue-100 text-blue-700" 
                : "bg-gray-200 text-gray-700"
            }`}>
              {isSentEmail ? "Sent" : "Inbox"}
            </span>
          </div>
          <div className="flex-none text-gray-400">{formatDate(selectedEmail?.createdAt)}</div>
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
