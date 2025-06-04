import React from 'react'
import Navbar from './Navbar'
import { useLayoutEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'

export default function Profile() {
    const [userData, setUserData] = useState({})
    const [token, setToken] = useState(false)
    const navigate = useNavigate()
    useLayoutEffect(() => {
        const storage = JSON.parse(localStorage.getItem("user-token"))
        setToken(storage?.token)
        if(!storage) navigate("/login")
    }, [])
    useEffect(() => {
        const fetchUserData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/get-single-user`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json"
                },
                credentials: 'include',
            })
            const data = await response.json()
            setUserData(data)
            if(!data?.success) {
                localStorage.removeItem("user-token")
            } else {
                localStorage.setItem("user-token", JSON.stringify({token}))
            }
        } catch (error) {
            console.error(error)
        }
        }

        fetchUserData()
    }, [token])
    if(!userData?.success) return <>
        <Navbar />
        <h1 style={{padding: "10px"}}>You are not authorized for this page!</h1>
        <Link style={{padding: "10px"}} to="/login" className='underline'>Please login here.</Link>
    </>
  return (
    <>
        <Navbar userData={userData} />
        <div className='h-screen flex items-center justify-center'>
            <div>
                <div>
                    <p className='text-lg font-semibold'>Name</p>
                    <p>{userData?.data?.username}</p>
                </div>
                <br />
                <div>
                    <p className='text-lg font-semibold'>Shops</p>
                    <p>{userData && userData?.data?.shops.join(", ")}</p>
                </div>
            </div>
        </div>
    </>
  )
}
