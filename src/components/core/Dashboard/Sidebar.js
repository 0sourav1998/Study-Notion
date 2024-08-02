import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";
import SidebarLinks from "./SidebarLinks";
import ConfirmationModal from "../../common/ConfirmationModal";


const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal,setConfirmationModal] = useState(null)
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);
  if (authLoading || profileLoading) {
    return <div>Loading...</div>;
  }
  return <div>
    <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
        <div className="flex flex-col">
            {
                sidebarLinks.map((link)=>{
                    if(link.type && user?.accountType !== link.type) return null ;
                    return(
                        <SidebarLinks key={link.id} link={link} iconName={link.icon}/>
                    )
                })
            }

        </div>
        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700"></div>
        <div className="flex flex-col">
            <SidebarLinks link={{name : "Settings" , path : "dashboard/settings"}} iconName="VscSettingsGear"/>
            <button onClick={()=> setConfirmationModal({
                text1 : "Are You Sure ?" ,
                text2 : "You Will be logged out from your Acoount" ,
                btn1Text : "Logout" ,
                btn2Text : "Cancel" ,
                btn1Handle :() =>dispatch(logout(navigate)) ,
                btn2handle : () =>setConfirmationModal(null)

            })}
            className="px-8 py-2 text-sm font-medium text-richblack-300"
            >

                <div className="flex items-center gap-x-2">
                    <VscSignOut className="text-lg"/>
                    <span>Logout</span>
                </div>

            </button>
        </div>
        {
            confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
        }
    </div>



  </div>;
};

export default Sidebar;
