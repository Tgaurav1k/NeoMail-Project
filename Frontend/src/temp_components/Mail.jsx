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
  const { selectedEmail } = useSelector((store) => store.app);

  // to get delete email message id
 const params = useParams();


   
  // delete mail
  const deleteHandler = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/api/v1/email/${params.id}`,
        {withCredentials:true}
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
            <h1 className="text-xl font-medium ">{selectedEmail?.subject}</h1>
            <span className="text-sm bg-gray-200 rounded-md px-2 py-0.5 mt-1">
              inbox
            </span>
          </div>
          <div className="flex-none text-gray-400">12 days ago</div>
        </div>
        <div className="flex-none py-4 text-gray-500 text-sm">
          <h1>{selectedEmail?.to}</h1>
          <span>to me</span>
        </div>
        <div className="my-10">
          <p>{selectedEmail?.message}</p>
        </div>
      </div>
    </div>
  );
}

export default Mail;
