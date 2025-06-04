import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

export default function ShopPage() {
    const location = useLocation();
  const query = new URLSearchParams(location.search);
    const v = query.get("v")
    let subDomain
      const hostname = window.location.hostname;
      const parts = hostname.split('.');
      subDomain =  parts[0];
      console.log(v)
    const [data, setData] = useState({})
  if (!subDomain) return <>
        <Navbar />
    <div className="flex items-center justify-center h-screen">
        <p className="text-xl">No page found! <span className="text-red-600">404</span></p>
    </div>;
  </>
    useEffect(() => {
        try {
            const authenticatePage = async () => {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/authenticate-subdomain`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({v})
                })
                const data = await response.json() 
                setData(data)
                console.log(data)
            }
            authenticatePage()
        } catch (error) {
            console.log(error)
        }
    }, [])
    // if(!data?.success) {
    //     return <>
    //         <Navbar userData={data} />
    //         <div className="flex items-center justify-center h-screen">
    //             <p className="text-xl">You are unauthorized for this page!</p>
    //         </div>;
    //     </>
    // }
  return (
    <>
        {
            subDomain ? <div className="text-xl font-bold">
            <Navbar />
                This is <span className="text-blue-600">{subDomain.split("-").join(" ")}</span> shop
            </div> : <>
                <Navbar />
                <h1>Home</h1>
            </>
        }
    </>
  );
}
