import React from 'react';
import * as Icons from 'react-icons/vsc';
import { NavLink, useLocation } from 'react-router-dom';

const SidebarLinks = ({ link, iconName }) => {
    const Icon = Icons[iconName];
    const location = useLocation();

    const matchRoute = (route) => {
        return route === location.pathname;
    };

    return (
        <NavLink to={link.path} className={`relative lg:px-8 px-2 lg:py-2 py-6 lg:font-medium text-xs  ${matchRoute(link.path) ? "bg-yellow-800" : "bg-opacity-0"}`}>
            <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}></span>
            <div className='flex items-center gap-x-2'>
                <Icon className="lg:text-lg text-xs"/>
                <span className='text-white'>{link.name}</span>
            </div>
        </NavLink>
    );
};

export default SidebarLinks;
