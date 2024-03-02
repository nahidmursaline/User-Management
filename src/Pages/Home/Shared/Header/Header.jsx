
import React, { useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../../../Assets/Logo/userManagementLogo-1.webp';
import { AuthContext } from '../../../provider/AuthProvider';


const Header = () => {

 
const {user,logOut} = useContext(AuthContext);

const handleLogOut = ()=> {
  logOut()
  .then(()=> {})
  .catch(error => console.log(error))
}






    const navItems = 
   
    <>
      <li><Link to='/'>Home</Link></li>
     <li><Link to='/allUser'>All User</Link></li>
     <li><Link  to='/addUser'>Add User</Link></li>
    

     
     {user?.email? <>
      
     
      <li><button onClick={handleLogOut} >Log Out</button></li>
     <li> <Link><span >{user?.displayName}</span></Link></li>
     
     </>:
    
    <li><Link to='/login'>Login</Link></li>}
     {
              user && <img className='ms-4 rounded-full' title= {user?.displayName}style={{"height" : "38px", "width" : "38px"}} src={user?.photoURL} alt="" />
            }
    
    </>
    


    return (
        <div>
              <div className="navbar fixed z-10 bg-opacity-30 bg-black text-white max-w-screen-xl">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              
             {navItems}
             
            </ul>
          </div>
          <Link to='/' className="w-[53px] h-[53px] mr-2 rounded-full "><img style={{ width:70}} src={logo} alt="" /></Link>
          <h5 className='text-3xl font-bold '>User Management</h5>
        </div>
          
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
           {navItems}
          </ul>
        </div>
       
      </div>
        </div>
    );
};

export default Header;