import React,{useState} from 'react';
// import '../Styles/Auth.css'
const Auth = () => {

    const[isLogin,setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [message,setMessage] = useState("");

    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]: e.target.value});
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
    

    try{
        const res = await fetch(`http://localhost:3000${endpoint}`,{
            method: "POST",
            headers: {"content-type":"application/json"},
            body: JSON.stringify(formData),
        });

        const data =  await res.json();

        if(!res.ok){
            setMessage(data.message || "Something went wrong!")
        }
        else{
            setMessage(isLogin ? "Login Succesfully" : "Sign up Succesfully");
            if(isLogin){
                localStorage.setItem("token",data.token);
                console.log("User Info:",data.user)
            }
        }
    }
    catch (err){
        console.error(err);
        setMessage("Error connecting to server");
    }
}
  return (
    <div className='min-h-screen flex tems-center justify-center bg-gradient-to-br  from-indigo-500 to-purple-600 px-4'  >
        <div className=" mt-2 mb-2 container bg-white rounded-xl shadow-xl p-10 w-full max-w-md">
            <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>{isLogin ? "Log in into your account":"create a new account "}</h2>

            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <input 
                    type='text'
                    name='username'
                    value={formData.username}
                    onChange={handleChange}
                    placeholder='username'
                    className='w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400'
                    />
                )}
                <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='E-mail'
                className='w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400'
                />

                <input
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='Password'
                className='w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400'
                />

                <button type='submit' className='w-full border rounded-4xl bg-indigo-600 hover:bg-indigo-700 text-white py-2 transition text-xl'>
                {isLogin? "Log in":"Sign up"}
                </button>

            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
                {isLogin? "Don't have an account ?": "Already  have an account ?"}
                <button onClick={()=> setIsLogin(!isLogin)} className="ml-1 text-indigo-600 hover:underline font-medium">
                    {isLogin?"Sign up":"Login"}
                </button>
            </p>
        </div>


      
    </div>
  );
}

export default Auth
