import { useActionState, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useLayoutEffect } from "react";

export default function Login() {
    const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(false);
  const handleSubmit = async (prevState, formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    const checkData = formData.get("checkbox")
    setUsername(username);
    setPassword(password);
    if(checkData === "on") setCheck(true)
    else setCheck(false)
    const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/login-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, password, rememberMe: check}),
    });
    const data = await response.json();
    return data;
  };
  const [state, formAction, pending] = useActionState(handleSubmit, null);
  if (state?.success) {
    setTimeout(() => {
        localStorage.setItem("user-token", JSON.stringify({token: state?.token}))
      navigate("/profile");
    }, 2000);
  }
  useLayoutEffect(() => {
    const storage = localStorage.getItem("user-token")
    if(storage) navigate("/profile")
  }, [])
  return (
    <>
    <Navbar />
      <div className="h-screen flex items-center justify-center">
        <form
            action={formAction}
          style={{ padding: "16px" }} 
          className="border-2 border-blue-800 rounded-md w-[30rem]"
        >
            <div style={{padding: "3px 5px"}}>
                {state && !state?.success ? <>
                    <p className="bg-red-300 text-red-700 text-center rounded-sm">{state.message}</p>
                </> :<></>}
            </div>
          <div style={{ padding: "5px 16px" }}>
            <label htmlFor="username" className="block text-lg font-semibold">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="w-full border-2 border-blue-800 outline-none rounded-sm text-lg"
              style={{ padding: "5px" }}
              placeholder="Enter username"
              defaultValue={username}
            />
          </div>
          <div style={{ padding: "5px 16px" }}>
            <label htmlFor="password" className="block text-lg font-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full border-2 border-blue-800 outline-none rounded-sm text-lg"
              style={{ padding: "5px" }}
              placeholder="Enter password"
              defaultValue={password}
            />
          </div>
          <div style={{ padding: "5px 16px" }}>
            <input type="checkbox" name="checkbox" id="checkbox" defaultChecked={check}/>
            <label style={{marginLeft: "5px"}} htmlFor="checkbox">Remember me.</label>
          </div>
          <div style={{ padding: "5px 16px" }}>
            <button style={{padding: "3px 6px"}} className="bg-blue-800 rounded-sm text-white text-lg cursor-pointer" type="submit" disabled={pending}>
                {
                    pending ? "Submitting" : "Login"
                }
            </button>
          </div>
            <p style={{ padding: "5px 16px" }}>Dont't have an account? <Link style={{textDecoration: "underline"}} to="/signup">Sign up here</Link></p>
        </form>
      </div>
    </>
  );
}
