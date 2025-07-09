import React, { useEffect, useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import { CiCircleQuestion } from "react-icons/ci";
import { IoIosSettings } from "react-icons/io";
import { TbGridDots } from "react-icons/tb";
import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setSearchText } from '../redux/appSlice';



import axios from 'axios';
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    // for search box 
    const [text, setText] = useState("");
    // for user 
    const { user } = useSelector(store => store.app);

    // dispatch wapis back 
    const dispatch = useDispatch();

    // navigate move to home 
    const navigate = useNavigate();

    // logout action 
    const logoutHandler = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/v1/user/logout',{withCredentials:true});
            console.log(res);
            toast.success(res.data.message);
            dispatch(setAuthUser(null));
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    }


    // use effect for search
    useEffect(() => {
        dispatch(setSearchText(text));
    }, [text]);


    return (
        <div className='flex items-center justify-between mx-3 h-16'>
            <div className='flex items-center gap-10'>
                <div className='flex items-center gap-2'>
                    <div className='p-3 hover:bg-gray-200 rounded-full cursor-pointer'>
                        <RxHamburgerMenu />
                    </div>
                    <img className='w-8' src="https://cdn.prod.website-files.com/637f48edfbc9b4ce91c37e03/679a57dbdcafe48d7559beaa_83642ca3-1b07-4308-94e8-7b8c0de4d48a.png" alt="logo" />
                    <h1 className='text-2xl text-gray-500 font-medium'>NeoMail</h1>
                </div>
            </div>
            {
                user && (
                    <>
                        <div className='w-[60%] pl-6'>
                            <div className='flex items-center bg-[#EAF1FB] px-2 py-3 rounded-full'>
                                <IoIosSearch size={'24px'} className='text-gray-700' />
                                <input
                                    type="text"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder='Search Mail'
                                    className='rounded-full w-full bg-transparent outline-none px-1'
                                />
                            </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <div className='p-2 rounded-full hover:bg-gray-200 cursor-pointer'>
                                <CiCircleQuestion size={'24px'} />
                            </div>
                            <div className='p-2 rounded-full hover:bg-gray-200 cursor-pointer'>
                                <IoIosSettings size={'24px'} />
                            </div>
                            <div className='p-2 rounded-full hover:bg-gray-200 cursor-pointer'>
                                <TbGridDots size={'24px'} />
                            </div>
                            <button onClick={logoutHandler} className='bg-blue-300 rounded-md font-bold cursor-pointer p-1 m-1'>Logout</button>
                            <Avatar src={user.profilePhoto} size="40" round={true} />
                        </div>
                    </>
                )
            }

        </div>
    )
}

export default Navbar