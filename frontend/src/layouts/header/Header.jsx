import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBox, faAddressBook, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { CiUser } from "react-icons/ci";
import { PiShoppingCartSimpleThin, PiUserCircleThin } from "react-icons/pi";
import { RiShieldUserLine } from "react-icons/ri";
import { MdSpaceDashboard, MdOutlineStorefront } from "react-icons/md";
import { FaShop } from "react-icons/fa6";
import { TfiPackage } from "react-icons/tfi";
import { useDispatch, useSelector } from 'react-redux';
import { Login } from "../../components"
import { logoutuser } from '../../features/user/userThunks';
import { adminLogout } from '../../features/admin/adminThunks';
import { sellerlogout } from '../../features/seller/sellerThunks';

const header = () => {

  const dispatch = useDispatch()

  const { loading, message, error, isAuthenticated, user } = useSelector((state) => state.user)
  const { adminLoading, adminMessage, adminError, isAdminAuthenticated, admin } = useSelector((state) => state.admin)
  const { sellerLoading, sellerMessage, sellerError, isSellerAuthenticated, seller } = useSelector((state) => state.seller)

  const [showDropDown, setShowDropDown] = useState(false)
  const [showAdminDropDown, setShowAdminDropDown] = useState(false)
  const [showSellerDropDown, setShowSellerDropDown] = useState(false)
  const [popLogin, setPopLogin] = useState(false)

  
  const handleMouseHover = (isHovering) => {
    setShowDropDown(isHovering)
  }

  const handleAdminMouseHover = (isHovering) => {
    setShowAdminDropDown(isHovering)
  }

  const handleSellerMouseHover = (isHovering) => {
    setShowSellerDropDown(isHovering)
  }

  const openLogin = () => {
    setShowDropDown(false)
    setPopLogin(true)
  }


  const logout = () => {
    setShowDropDown(false)
    dispatch(logoutuser())
  }

  const adminlogout = () => {
    setShowAdminDropDown(false)
    dispatch(adminLogout())
  }

  const sellerLogout = () => {
    setShowSellerDropDown(false)
    dispatch(sellerlogout())
  }
  
  return (
    <>
    <Login trigger={popLogin} setTrigger={setPopLogin}/>
      <div className='flex-center w-full h-auto px-[5rem] py-[1.5rem]'>
        <div className='flex justify-between w-full'>
          <div className='flex-center'>
            <Link to="/" className='font-extrabold text-mediumGray text-[22px]'>
              <img className='w-[90px]' src="/genie-logo.svg" alt="" />
            </Link>
          </div>
          <div className='max-w-[450px] w-full rounded-[2px]'>
            <div className={`${popLogin ? 'z-[-1]' : 'z-0'} bg-transparent relative flex-center w-full rounded-[2px]`}>
              <input className='w-full pl-[3rem] pr-[1rem] py-[0.4rem] text-[14px] bg-[#ebebeb] border-transparent border-[2px] rounded-[2px] focus:outline-none focus:border-lightGray3 focus:border-[2px] focus:bg-white transition-colors duration-150' type="text" placeholder='Make a wish'/>
              <FontAwesomeIcon className='absolute left-[1rem] text-[#777]' icon={faMagnifyingGlass} />
            </div>
          </div>
          <div className='flex items-center gap-[3rem] font-medium text-[14px]'>
            {isAdminAuthenticated && (
              <div className={`relative ${popLogin ? 'z-[-1]' : 'z-0'} flex-center h-full`} onMouseEnter={() => handleAdminMouseHover(true)} onMouseLeave={() => handleAdminMouseHover(false)}>
                <div className='flex-center gap-[0.5rem]'>
                  <RiShieldUserLine className='text-[18px]' />
                  <p>Admin</p>
                </div>
                <div className='absolute top-0 h-[61px] w-full'>
                </div>
                  {showAdminDropDown && (
                    <div className={`bg-white absolute top-[61px] right-[-100px] w-[250px] shadow-[0_1px_10px_rgba(0,0,0,0.08)] border-[1px] border-[#f5f5f6] p-[1rem] rounded-[2px]`}>
                      <div className='flex flex-col gap-[1rem] font-normal items-start'>
                        <div className='border-b-[1px] border-lightGray3 w-full pb-[0.7rem]'>
                          <h2 className='font-bold text-[20px] text-darkGray2'>Hi,</h2>
                          <h2 className='truncate font-bold text-[25px] text-mediumGray3'>{admin[0].fullname.split(' ')[0]}</h2>
                        </div>
                        <div className='flex flex-col font-normal gap-[0.4rem] w-full border-b-[1px] border-lightGray3 pb-[1rem] mb-[0.3rem]'>
                          <Link onClick={() => {setShowAdminDropDown(false)}} className='text-mediumGray2 hover:text-primary hover:font-semibold flex items-center gap-[0.5rem]' to="/admin/dashboard"><MdSpaceDashboard />Dashboard</Link>
                          <Link onClick={() => {setShowAdminDropDown(false)}} className='text-mediumGray2 hover:text-primary hover:font-semibold flex items-center gap-[0.5rem]' to="/admin/dashboard/users"><PiUserCircleThin />Manage Users</Link>
                          <Link onClick={() => {setShowAdminDropDown(false)}} className='text-mediumGray2 hover:text-primary hover:font-semibold flex items-center gap-[0.5rem]' to="/admin/dashboard/sellers"><FaShop />Manage Sellers</Link>
                          <Link onClick={() => {setShowAdminDropDown(false)}} className='text-mediumGray2 hover:text-primary hover:font-semibold flex items-center gap-[0.5rem]' to="/admin/dashboard/orders"><TfiPackage />Manage Orders</Link>
                        </div>
                        <button className='btn-fill w-full'
                          onClick={adminlogout}
                          >
                          Logout
                        </button>
                      </div>
                    </div>
                    )}
                  </div>
                  )}    
            {isSellerAuthenticated && (
              <div className={`relative ${popLogin ? 'z-[-1]' : 'z-0'} flex-center h-full`} onMouseEnter={() => handleSellerMouseHover(true)} onMouseLeave={() => handleSellerMouseHover(false)}>
                <div className='flex-center gap-[0.5rem]'>
                  <MdOutlineStorefront className='text-[18px]' />
                  <p>Seller</p>
                </div>
                <div className='absolute top-0 h-[61px] w-full'>
                </div>
                  {showSellerDropDown && (
                    <div className={`bg-white absolute top-[61px] right-[-100px] w-[250px] shadow-[0_1px_10px_rgba(0,0,0,0.08)] border-[1px] border-[#f5f5f6] p-[1rem] rounded-[2px]`}>
                      <div className='flex flex-col gap-[1rem] font-normal items-start'>
                        <div className='border-b-[1px] border-lightGray3 w-full pb-[0.7rem]'>
                          <h2 className='font-bold text-[20px] text-darkGray2'>Hi,</h2>
                          <h2 className='truncate font-bold text-[25px] text-mediumGray3'>{seller[0].full_name.split(' ')[0]}</h2>
                        </div>
                        <div className='flex flex-col font-normal gap-[0.4rem] w-full border-b-[1px] border-lightGray3 pb-[1rem] mb-[0.3rem]'>
                          <Link onClick={() => {setShowAdminDropDown(false)}} className='text-mediumGray2 hover:text-primary hover:font-semibold flex items-center gap-[0.5rem]' to="/seller/dashboard"><MdSpaceDashboard />Dashboard</Link>
                          <Link onClick={() => {setShowAdminDropDown(false)}} className='text-mediumGray2 hover:text-primary hover:font-semibold flex items-center gap-[0.5rem]' to="/seller/dashboard/products"><TfiPackage />Manage Products</Link>
                        </div>
                        <button className='btn-fill w-full'
                          onClick={sellerLogout}
                          >
                          Logout
                        </button>
                      </div>
                    </div>
                    )}
                  </div>
                  )} 
              <div className={`relative ${popLogin ? 'z-[-1]' : 'z-0'} flex-center h-full`} onMouseEnter={() => handleMouseHover(true)} onMouseLeave={() => handleMouseHover(false)}>
                <div className='flex-center gap-[0.5rem]'>
                  <CiUser className='text-[18px]' />
                  <p>{isAuthenticated ? "Profile" : "Login"}</p>
                </div>
                <div className='absolute top-0 h-[61px] w-full'>
                </div>
                {showDropDown && (
                  isAuthenticated ? (
                    <div className={`bg-white absolute top-[61px] right-[-100px] w-[250px] shadow-[0_1px_10px_rgba(0,0,0,0.08)] border-[1px] border-[#f5f5f6] p-[1rem] rounded-[2px]`}>
                      <div className='flex flex-col gap-[1rem] font-normal items-start'>
                        <div className='border-b-[1px] border-lightGray3 w-full pb-[0.7rem]'>
                          <h2 className='font-bold text-[20px] text-darkGray2'>Hi,</h2>
                          <h2 className='truncate font-bold text-[25px] text-mediumGray3'>{user[0].fullname.split(' ')[0]}</h2>
                        </div>
                        <div className='flex flex-col font-normal gap-[0.4rem] w-full border-b-[1px] border-lightGray3 pb-[1rem] mb-[0.3rem]'>
                          <Link onClick={() => {setShowDropDown(false)}} className='text-mediumGray2 hover:text-primary hover:font-semibold flex items-center gap-[0.5rem]' to="/account"><FontAwesomeIcon icon={faUser} />Account</Link>
                          <Link onClick={() => {setShowDropDown(false)}} className='text-mediumGray2 hover:text-primary hover:font-semibold flex items-center gap-[0.5rem]' to="/orders"><FontAwesomeIcon icon={faBox} />Orders</Link>
                          <Link onClick={() => {setShowDropDown(false)}} className='text-mediumGray2 hover:text-primary hover:font-semibold flex items-center gap-[0.5rem]' to="/contactus"><FontAwesomeIcon icon={faAddressBook} />Contact Us</Link>
                        </div>
                        <button className='btn-fill w-full'
                          onClick={logout}
                          >
                          Logout
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className={` bg-white absolute top-[61px] right-[-90px] w-[222px] shadow-[0_1px_10px_rgba(0,0,0,0.08)] border-[1px] border-[#f5f5f6] p-[1rem] rounded-[2px]`}>
                      <div className='flex flex-col gap-[1rem] font-normal items-start'>
                        <div>
                          <h2 className='font-bold text-[25px]'>Hello</h2>
                          <p className='text-mediumGray text-[13px]'>Login to access your account</p>
                        </div>
                        <button className='btn w-full'
                          onClick={openLogin}
                          >
                          Login/Signup
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>
            
            <Link className='flex-center gap-[0.5rem]' to="/cart"><PiShoppingCartSimpleThin className='text-[19px]' />Cart</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default header