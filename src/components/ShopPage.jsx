import { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function ShopPage({subDomain}) {
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
                    credentials: 'include',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    }
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
    <div className="text-xl font-bold">
        <Navbar />
      This is <span className="text-blue-600">{subDomain.split("-").join(" ")}</span> shop
    </div>
  );
}
