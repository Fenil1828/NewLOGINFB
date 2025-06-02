import React, { useState } from 'react'
// import { Form } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../util';



const Signup = () => {

    const [signupInfo, setsignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log(name, value);

        const copysignupInfo = {...signupInfo }; 
        copysignupInfo[name] = value;
        setsignupInfo(copysignupInfo);
    }
    console.log('loginInfo -> ' , signupInfo);

    const handleSignUp = async (e) => {
        //to help do not page render
        e.preventDefault();

        const {name, email, password} = signupInfo;

        if(!name || !email || !password){
            return handleError('name, email and password are required')
        }
        try{
            const url = "http://localhost:8080/auth/signup";
            const response = await fetch(url, {
                method: "POST",
                headers:{
                    'content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();

            // const  {success, message, errors} = result;
            // if(success){
            //     handleSuccess(message);
            //     setTimeout(() => {
            //         navigate('/login');                    
            //     },1000)
            // }
            // else if(errors){
            //     const details = errors?.details[0].message;
            //     handleError(details);
            // }

            const { success, message, errors } = result;

if (success) {
    handleSuccess(message);
    setTimeout(() => {
        navigate('/login');                    
    }, 1000);
}
else if (errors && errors.length > 0) {
    // Handle array of error strings
    const errorMessage = errors[0]; // Get first error
    handleError(errorMessage);
} else {
    // Fallback to generic message
    handleError(message || 'Registration failed');
}

            console.log(result);

        }catch(err){
            handleError(err);
        }
    }


  return (
    <div className='container'>
        <h1>Signup</h1>

        <form onSubmit={handleSignUp}>
            <div>
                <label htmlFor='name'>Name</label>
                <input
                onChange={handleChange}
                type='text'
                name='name'
                autoFocus
                placeholder='Enter your name...'
                value={signupInfo.name}
                >
                </input>
            </div>

            <div>
                <label htmlFor='email'>Email</label>
                <input
                onChange={handleChange}
                type='email'
                name='email'
                autoFocus
                placeholder='Enter your email....'
                value={signupInfo.email}
                >
                </input>
            </div>

            <div>
                <label htmlFor='password'>Password</label>
                <input
                onChange={handleChange}
                type='password'
                name='password'
                autoFocus
                placeholder='Enter your Password....'
                value={signupInfo.password}
                >
                </input>
            </div>

            <button>Signup</button>
            <span>Already have an account ?
                <Link to="/login" >Login</Link>
            </span>

        </form>
      
      <ToastContainer />

    </div>
  )
}

export default Signup
