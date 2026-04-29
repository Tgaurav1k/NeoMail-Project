import React from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { MdCropSquare } from 'react-icons/md'
import { MdOutlineStarBorder } from "react-icons/md";
import { BsPinFill, BsPin } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedEmail, upsertEmail } from '../redux/appSlice';


const Email = ({email}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.app);

    // Determine if this is a sent or received email
    const isSentEmail = email?.userId?._id === user?._id;
    const senderName = isSentEmail
        ? "Me"
        : email?.userId?.fullname || email?.userId?.email || "Unknown";
    const senderEmail = isSentEmail
        ? user?.email
        : email?.userId?.email || email?.to;

    const openMail = () => {
        dispatch(setSelectedEmail(email));
        navigate(`/mail/${email._id}`);
    }

    const togglePin = async (e) => {
        e.stopPropagation();
        try {
            const res = await axios.patch(
                `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/v1/email/${email._id}/pin`,
                {},
                { withCredentials: true }
            );
            if (res.data.success) {
                dispatch(upsertEmail(res.data.email));
                toast.success(res.data.email.isPinned ? "Pinned" : "Unpinned");
            }
        } catch (err) {
            toast.error("Could not update pin");
        }
    };
    
    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return "Yesterday";
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString();
    }
    
    return (
        <div
            onClick={openMail}
            className={`flex items-center justify-between border-b border-gray-200 px-4 py-3 text-sm hover:cursor-pointer hover:shadow-md transition ${
                email?.isPinned ? "bg-amber-50/60 border-l-4 border-l-amber-400" : ""
            }`}
        >
            <div className='flex items-center gap-3 flex-1'>
                <div className='text-gray-400'>
                    <MdCropSquare size={'20px'} />
                </div>
                <button
                    onClick={togglePin}
                    title={email?.isPinned ? "Unpin" : "Pin"}
                    className={`p-1 rounded hover:bg-gray-200 transition ${
                        email?.isPinned ? "text-amber-500" : "text-gray-400 hover:text-amber-500"
                    }`}
                >
                    {email?.isPinned ? <BsPinFill size={16} /> : <BsPin size={16} />}
                </button>
                <div className='text-gray-400'>
                    <MdOutlineStarBorder size={'20px'} />
                </div>
                <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-2'>
                        <h1 className='font-semibold truncate'>{email?.subject || "No Subject"}</h1>
                        {isSentEmail && (
                            <span className='text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded'>Sent</span>
                        )}
                        {email?.isPinned && (
                            <span className='text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-medium'>Pinned</span>
                        )}
                    </div>
                    <p className='text-xs text-gray-500 truncate'>
                        {isSentEmail ? `To: ${email?.to}` : `From: ${senderName} (${senderEmail})`}
                    </p>
                </div>
            </div>
            <div className='flex-1 ml-4 min-w-0' >
                <p className='truncate text-gray-600'>{email?.message}</p>
            </div>
            <div className='flex-none text-gray-500 text-xs ml-4'>
                <p>{formatDate(email?.createdAt)}</p>
            </div>
        </div>
    )
}

export default Email