import { useActionState, useState } from "react";
import { validateForm } from "../../helper";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useLayoutEffect } from "react";

export default function Login() {
    const navigate = useNavigate();
    const [tags, setTags] = useState([]);
    const [input, setInput] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        usernameError: "",
        passwordError: ""
    })
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && input.trim() !== "") {
            e.preventDefault();
            if (!tags.includes(input.trim())) {
                setTags([...tags, input.trim()]);
            }
            setInput("");
        }
    };

    const removeTag = (indexToRemove) => {
        setTags(tags.filter((_, i) => i !== indexToRemove));
    };
    const handleSubmit = async (prevState, formData) => {
        const username = formData.get("username")
        const password = formData.get("password")
        const tags = formData.getAll("tags")
        setUsername(username)
        setPassword(password)
        const invalidInput = validateForm({
            username: username,
            password: password,
        });

        if (Object.keys(invalidInput).length > 0) {
            setErrors({...invalidInput, usernameError: invalidInput.username, passwordError: invalidInput.password})
            return;
        }
        const response = await fetch(`${import.meta.env.VITE_API_URL}/add-user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password, shops: tags })
        })
        const data = await response.json()
        console.log(data)
        return data
    }
    const [state, formAction, pending] = useActionState(handleSubmit, null);
    if(state?.success) {
        setTimeout(() => {
            navigate("/login")
        }, 2000)
    }
    useLayoutEffect(() => {
        const storage = localStorage.getItem("user-token")
        if(storage) navigate("/profile")
    }, [])
  return (
    <>
    <Navbar />
        <div className="h-screen flex items-center justify-center">
            <form action={formAction} style={{padding: "16px"}} className="border-2 border-blue-800 rounded-md w-[30rem]">
                <div style={{padding: "3px 5px"}}>
                    {state?.success ? <>
                        <p className="bg-green-300 text-green-700 rounded-sm">{state.message}</p>
                    </> :<></>}
                </div>
                <label htmlFor="username" className='block text-lg font-semibold'>Username</label>
                <input type="text" name="username" id="username" defaultValue={username} className="w-full border-2 border-blue-800 outline-none rounded-sm text-lg" style={{padding: "5px"}} placeholder='Enter password'/>
                <label htmlFor="password" className='block text-lg font-semibold'>Password</label>
                <input type="password" name="password" id="password" defaultValue={password} className="w-full border-2 border-blue-800 outline-none rounded-sm text-lg" style={{padding: "5px"}} placeholder='Enter shop'/>
                 <label htmlFor="shoprNames" className='block text-lg font-semibold'>Shop names</label>
                    <input 
                        type="text" 
                        name="shoprnames" 
                        id="shoprNames" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full border-2 border-blue-800 outline-none rounded-sm text-lg" style={{padding: "5px"}} 
                        placeholder='Enter username'
                    />
                    <div className="" style={{marginTop: "5px"}}></div>
                    <div className="w-full flex items-center justify-start flex-wrap">
                        {tags.map((tag, index) => (
                            <div key={index} className="inline bg-blue-500 text-white rounded-sm" style={{marginLeft: "5px", padding: "3px", marginTop: "5px"}}>
                                {tag}
                                <input type="hidden" name="tags" value={tag} />
                                <span onClick={() => removeTag(index)}>
                                    &times;
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="" style={{marginTop: "5px"}}></div>
                <button style={{padding: "3px 6px"}} className="bg-blue-800 rounded-sm text-white text-lg cursor-pointer" type="submit" disabled={pending}>
                    {
                        pending ? "Submitting" : "Create account"
                    }
                </button>
                    <div className="" style={{marginTop: "5px"}}></div>
                    {
                        state && state?.alreadyExistingShops?.length > 0 ? <>
                            <p style={{padding: "2px 5px"}} className="rounded-sm bg-red-300 text-red-600">{state?.alreadyExistingShops.join(", ")} shops taken!</p>
                        </> : <></>
                    }
                    <div className="" style={{marginTop: "5px"}}></div>
                    {
                        errors && errors?.usernameError? <>
                            <p style={{padding: "2px 5px"}} className="rounded-sm bg-red-300 text-red-600">
                                {errors?.usernameError}
                            </p>
                        </> : <></>
                    }
                    <div className="" style={{marginTop: "5px"}}></div>
                    {
                        errors && errors.passwordError ? <>
                            <p style={{padding: "2px 5px"}} className="rounded-sm bg-red-300 text-red-600">
                                {errors.passwordError}
                            </p>
                        </> : <></>
                    }
                    <p style={{ padding: "5px 16px" }}>Have an account? <Link style={{textDecoration: "underline"}} to="/login">Login here</Link></p>
            </form>
        </div>
    </>
  )
}
