import { Link } from 'react-router-dom';
import LoginButton from '../login';
import LogoutButton from './logout';
import { useAuth0 } from '@auth0/auth0-react';


function Navbar() {
  const {user,isAuthenticated} = useAuth0()

  console.log(user)
  return (
    <div className="navbar bg-black shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-5xl font-bold text-red-800">
          JJ CART
        </Link>
        
        
          {/* <input className='w-96 ' type="text" placeholder='search...' /> */}
          {/*<LoginButton />*/}
          {/* <LogoutButton/> */}

        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-blue-600 hover:text-gray-900">
              HOME
            </Link>
          </li>
          <li>
            <Link to="/cart" className="text-blue-600 hover:text-gray-900">
              CART
            </Link>
            </li>
            <li>
            <Link to="/profile" className="text-blue-600 hover:text-gray-900">
            PROFILE
            </Link>
            {/* {
            <img 
            onClick={() =>window.location.href='/profile'}
            className=' w-10' src={user?.picture} alt='img'/>:''
            } */}

          </li>
          
        </ul>
        {isAuthenticated? <div>
          <img className='w-7 h-7 rounded-full' onClick={()=>window.location.href='/profile'}
            src={user?.picture} alt="pic" />
        </div>:<LoginButton/>}
     
      </div>
    </div>
  );
}

  
export default Navbar;
