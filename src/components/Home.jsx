import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link, useLocation } from "react-router-dom";

export default function ShopPage() {
    const location = useLocation();
  const query = new URLSearchParams(location.search);
    const v = query.get("v")
    let subDomain
      const hostname = window.location.hostname;
      const parts = hostname.split('.');
      subDomain =  parts[0];
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
  if (!subDomain) return <>
        <Navbar />
    <div className="flex items-center justify-center h-screen">
        <p className="text-xl">No page found! <span className="text-red-600">404</span></p>
    </div>;
  </>
    useEffect(() => {
        try {
            const authenticatePage = async () => {
                setLoading(true)
                const response = await fetch(`${import.meta.env.VITE_API_URL}/authenticate-subdomain`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({v})
                })
                const data = await response.json() 
                setData(data)
                setLoading(false)
            }
            if(subDomain !== "localhost" && v) authenticatePage()
        } catch (error) {
            console.log(error)
        }
    }, [])
    if(Object.keys(data).length > 0 && !data?.success && !loading) {
        return <>
            <div style={{padding: "5px 10px"}} className="flex items-center justify-between bg-blue-800 text-white text-xl">
                <div>Logo</div>
                <p>{data?.data?.username}</p>
            </div>
            <div className="flex items-center justify-center h-screen flex-col">
                <p className="text-xl">You are unauthorized for this page!</p>
                <Link to="https://user-authentication-frontend-hazel.vercel.app/login" className="underline">Please login here.</Link>
            </div>;
        </>
    }
  return (
    <>
        {
            subDomain !== "localhost" && subDomain !== "user-authentication-frontend-hazel" ? <div className="text-xl font-bold">
            <div style={{padding: "5px 10px"}} className="flex items-center justify-between bg-blue-800 text-white text-xl">
                <div>Logo</div>
                <p>{data?.data?.username}</p>
            </div>
            {
                loading ? <>
                    <div className="h-screen flex items-center justify-center">
                        <p>Loading ...</p>
                    </div>
                </> : <>
                    <p>This is <span className="text-blue-600">{subDomain.split("-").join(" ")}</span> shop</p>
                </>
            }
            </div> : <>
                <Navbar userData={data} />
                <h1>Home</h1>
            </>
        }
    </>
  );
}
