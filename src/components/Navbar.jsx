import React from 'react'
import { memo } from 'react'
import { useState } from 'react'
import { useLayoutEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar({userData}) {
    const [token, setToken] = useState("")
    const [show, setShow] = useState(false)
    const navigate = useNavigate()
    useLayoutEffect(() => {
        const storage = localStorage.getItem("user-token")
        setToken(storage)
    }, [])
    const handleLogout = async e => {
        localStorage.removeItem("user-token")
        navigate("/login")
    }
  return (
    <>
        <div style={{padding: "10px"}} className='flex text-white items-center justify-between bg-blue-800'>
            <div className='text-xl font-semibold'>Logo</div>
            <ul className='flex items-center justify-center gap-4'>
                {
                    token ? <>
                        <li className='relative'>
                            {/* <Link to="/profile">Profile</Link> */}
                            <p onClick={() => setShow(!show)}>Profile</p>
                            {
                                show ? <div style={{marginTop: "5px", padding: "5px"}} className='bg-slate-400 rounded-md absolute right-0 top-6 min-w-[10rem]'>
                                    <div>
                                        <p className='font-semibold underline'>Shops</p>
                                        {
                                            userData && userData?.data?.shops.map((value, index) => {
                                                return <Link target='_blank' style={{marginLeft: "3px"}} className='block' key={index} to={`http://${value.split(" ").join("-")}.${import.meta.env.VITE_HOSTNAME}`}>{value}</Link>
                                            })
                                        }
                                    </div>
                                    <p onClick={handleLogout} style={{padding: "5px", marginTop: "5px"}} className='bg-white text-black cursor-pointer'>Logout</p>
                                </div> : <></>
                            }
                        </li>
                    </> : <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/signup">Sign up</Link>
                        </li>
                    </>
                }
            </ul>
        </div>
    </>
  )
}

export default memo(Navbar)