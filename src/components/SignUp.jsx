import { useState } from "react";


export default function Login() {
    const [tags, setTags] = useState([]);
    const [input, setInput] = useState("");
    const handleKeyDown = (e) => {
        if(input.trim() === "") return
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
                    {tags.map((tag, index) => (
                        <div key={index} className="inline bg-blue-500 text-white rounded-sm" style={{marginLeft: "5px", padding: "3px"}}>
                            {tag}
                            <span onClick={() => removeTag(index)}>
                                &times;
                            </span>
                        </div>
                    ))}
                    
                </div>
                <div style={{padding: "5px 16px"}}>
                    <button style={{padding: "3px 6px"}} className="bg-blue-800 rounded-sm text-white text-lg cursor-pointer" type="submit">Create account</button>
                </div>
            </form>
        </div>
    </>
  )
}
