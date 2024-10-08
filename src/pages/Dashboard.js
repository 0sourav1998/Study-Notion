import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';

const Dashboard = () => {
    const {loading : authLoading} = useSelector(state=>state.auth);
    const {loading : profileLoading} = useSelector(state=>state.profile);

    if(authLoading || profileLoading){
        return (
            <div>Loading...</div>
        )
    }
  return (
    <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
      <Sidebar/>
      <div className='h-[calc(100vh-3.5rem)] flex-1 overflow-x-hidden'>
            <div className='mx-auto sm:w-11/12 w-full max-w-[1000px] md:py-10 py-5'>
                <Outlet/>
            </div>
      </div>
    </div>
  )
}

export default Dashboard
