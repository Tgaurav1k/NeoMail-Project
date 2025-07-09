import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

function Body() {
  const {user} = useSelector(store =>store.app);
  const navigate = useNavigate();
  useEffect(()=>{
    if(!user){
      navigate("/login");
    }
  },[])
  return (
       <div className='flex'>
        <Sidebar  />
        <Outlet />
      </div>
  )
}

export default Body
