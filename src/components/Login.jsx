

export default function Login() {
  return (
    <>
        <div className="h-screen flex items-center justify-center">
            <form method="post" style={{padding: "16px"}} className="border-2 border-blue-800 rounded-md">
                <div style={{padding: "5px 16px"}}>
                    <label htmlFor="username" className='block text-lg font-semibold'>Username</label>
                    <input type="text" name="username" id="username" className="w-full border-2 border-blue-800 outline-none rounded-sm text-lg" style={{padding: "5px"}} placeholder='Enter username'/>
                </div>
                <div style={{padding: "5px 16px"}}>
                    <label htmlFor="password" className='block text-lg font-semibold'>Password</label>
                    <input type="password" name="password" id="password" className="w-full border-2 border-blue-800 outline-none rounded-sm text-lg" style={{padding: "5px"}} placeholder='Enter username'/>
                    
                </div>
                <div style={{padding: "5px 16px"}}>
                    <button style={{padding: "3px 6px"}} className="bg-blue-800 rounded-sm text-white text-lg cursor-pointer" type="submit">Login</button>
                </div>
            </form>
        </div>
    </>
  )
}
