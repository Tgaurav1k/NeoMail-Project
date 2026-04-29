import React, { useEffect, useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import { CiCircleQuestion } from "react-icons/ci";
import { IoIosSettings } from "react-icons/io";
import { TbGridDots } from "react-icons/tb";
import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setSearchText, toggleSidebar } from '../redux/appSlice';

import axios from 'axios';
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [text, setText] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const { user } = useSelector(store => store.app);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/v1/user/logout`, { withCredentials: true });
            toast.success(res.data.message);
            dispatch(setAuthUser(null));
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        dispatch(setSearchText(text));
    }, [text]);

    return (
        <div className='flex items-center justify-between px-2 sm:px-3 h-14 sm:h-16 gap-2'>
            {/* Left: hamburger + logo */}
            <div className='flex items-center gap-1 sm:gap-2 shrink-0'>
                <button
                    onClick={() => dispatch(toggleSidebar())}
                    className='p-2 sm:p-3 hover:bg-gray-200 rounded-full cursor-pointer'
                    aria-label="Toggle sidebar"
                >
                    <RxHamburgerMenu />
                </button>
                <img className='w-7 sm:w-8' src="https://cdn.prod.website-files.com/637f48edfbc9b4ce91c37e03/679a57dbdcafe48d7559beaa_83642ca3-1b07-4308-94e8-7b8c0de4d48a.png" alt="logo" />
                <h1 className='text-lg sm:text-2xl text-gray-500 font-medium hidden sm:block'>NeoMail</h1>
            </div>

            {user && (
                <>
                    {/* Search bar — visible inline on md+, toggle on mobile */}
                    <div className={`flex-1 max-w-2xl ${showSearch ? 'block absolute inset-x-2 top-2 z-30 bg-white shadow-md rounded-full p-1' : 'hidden md:block'}`}>
                        <div className='flex items-center bg-[#EAF1FB] px-2 py-2 sm:py-3 rounded-full'>
                            <IoIosSearch size={'22px'} className='text-gray-700 shrink-0' />
                            <input
                                type="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder='Search Mail'
                                className='rounded-full w-full bg-transparent outline-none px-2 text-sm sm:text-base'
                                autoFocus={showSearch}
                            />
                            {showSearch && (
                                <button
                                    onClick={() => { setShowSearch(false); setText(""); }}
                                    className='text-gray-500 px-2'
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Right: action icons */}
                    <div className='flex items-center gap-1 sm:gap-2 shrink-0'>
                        {/* Mobile-only search trigger */}
                        <button
                            onClick={() => setShowSearch(true)}
                            className='md:hidden p-2 rounded-full hover:bg-gray-200'
                            aria-label="Search"
                        >
                            <IoIosSearch size={'22px'} />
                        </button>
                        {/* Desktop-only icons */}
                        <div className='hidden md:flex items-center gap-2'>
                            <div className='p-2 rounded-full hover:bg-gray-200 cursor-pointer'>
                                <CiCircleQuestion size={'24px'} />
                            </div>
                            <div className='p-2 rounded-full hover:bg-gray-200 cursor-pointer'>
                                <IoIosSettings size={'24px'} />
                            </div>
                            <div className='p-2 rounded-full hover:bg-gray-200 cursor-pointer'>
                                <TbGridDots size={'24px'} />
                            </div>
                        </div>
                        <button
                            onClick={logoutHandler}
                            className='bg-blue-300 hover:bg-blue-400 transition rounded-md font-semibold cursor-pointer text-xs sm:text-sm px-2 sm:px-3 py-1'
                        >
                            Logout
                        </button>
                        <Avatar src={user.profilePhoto} size="36" round={true} />
                    </div>
                </>
            )}
        </div>
    )
}

export default Navbar
