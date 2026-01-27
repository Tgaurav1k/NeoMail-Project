import React from 'react'
import { MdCropSquare } from 'react-icons/md'
import { MdOutlineStarBorder } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedEmail } from '../redux/appSlice';


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
        <div onClick={openMail} className='flex items-center justify-between border-b border-gray-200 px-4 py-3 text-sm hover:cursor-pointer hover:shadow-md'>
            <div className='flex items-center gap-3 flex-1'>
                <div className='text-gray-400'>
                    <MdCropSquare size={'20px'} />
                </div>
                <div className='text-gray-400'>
                    <MdOutlineStarBorder size={'20px'} />
                </div>
                <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-2'>
                        <h1 className='font-semibold truncate'>{email?.subject || "No Subject"}</h1>
                        {isSentEmail && (
                            <span className='text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded'>Sent</span>
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