//import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from './navbar.tsx/logout';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    
    isAuthenticated && (
      <div>
        <img className='pl-0.5 w-10 h-10 rounded-full'src={user?.picture} alt="No Pic" />
        <h2 className='pl-0.5 font-semibold text-lg text-gray-900'>{user?.name}</h2>
        <p className='pl-0.5 font-medium text-sm text-gray-600'>{user?.email}</p>
        <div className="pl-0.5 mb-5">
        <LogoutButton />
        </div>
        <button
        onClick={
          isAuthenticated
            ? () => (window.location.href = '/portal')
            : () => (window.location.href = '/home')
        }
        className="float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-10 px-10 rounded shadow-xs"
      >
        Portal
      </button>
      <button onClick={ () => (window.location.href = '/Dashboard')
      }
          className="float-left bg-blue-500 hover:bg-blue-700 text-white font-bold py-10 px-10 rounded shadow-xs">
        Dashboard</button>


      </div>
    )
  );
};

export default Profile;