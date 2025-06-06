// import React, { useState } from 'react'
// // import { Form } from 'react-router-dom'
// import { ToastContainer } from 'react-toastify'
// import { Link, useNavigate } from 'react-router-dom';
// import { handleError, handleSuccess } from '../util';
// import 'react-toastify/dist/ReactToastify.css';


// const Login = () => {

//     const [loginInfo, setloginInfo] = useState({
//         email: '',
//         password: ''
//     })

//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const {name, value} = e.target;
//         console.log(name, value);

//         const copyloginInfo = {...loginInfo }; 
//         copyloginInfo[name] = value;
//         setloginInfo(copyloginInfo);
//     }
//     console.log('loginInfo -> ' , loginInfo);

//     const handleLogin = async (e) => {
//         //to help do not page render
//         e.preventDefault();

//         const {email, password} = loginInfo;

//         if(!email || !password){
//             return handleError('email and password are required')
//         }
//         try{
//             const url = `https://new-loginfb-api.vercel.app/auth/login`;
//             const response = await fetch(url, {
//                 method: "POST",
//                 headers:{
//                     'content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(loginInfo)
//             });
//             const result = await response.json();

//             // const  {success, message, errors} = result;
//             // if(success){
//             //     handleSuccess(message);
//             //     setTimeout(() => {
//             //         navigate('/login');                    
//             //     },1000)
//             // }
//             // else if(errors){
//             //     const details = errors?.details[0].message;
//             //     handleError(details);
//             // }

//             const { success, message, jwtToken, name, errors } = result;

// if (success) {
//     handleSuccess(message);
//     localStorage.setItem('token', jwtToken);
//     localStorage.setItem('loggedInUser', name);

//     setTimeout(() => {
//         navigate('/home');                    
//     }, 1000);
// }
// else if (errors && errors.length > 0) {
//     // Handle array of error strings
//     const errorMessage = errors[0]; // Get first error
//     handleError(errorMessage);
// } else {
//     // Fallback to generic message
//     handleError(message || 'Registration failed');
// }

//             console.log(result);

//         }catch(err){
//             handleError(err);
//         }
//     }


//   return (
//     <div className='container'>
//         <h1>Login</h1>

//         <form onSubmit={handleLogin}>

//             <div>
//                 <label htmlFor='email'>Email</label>
//                 <input
//                 onChange={handleChange}
//                 type='email'
//                 name='email'
//                 autoFocus
//                 placeholder='Enter your email....'
//                 value={loginInfo.email}
//                 >
//                 </input>
//             </div>

//             <div>
//                 <label htmlFor='password'>Password</label>
//                 <input
//                 onChange={handleChange}
//                 type='password'
//                 name='password'
//                 autoFocus
//                 placeholder='Enter your Password....'
//                 value={loginInfo.password}
//                 >
//                 </input>
//             </div>

//             <button>Login</button>
//             <span>Don't have an account ?
//                 <Link to="/signup" >Signup</Link>
//             </span>

//         </form>

//       <ToastContainer />

//     </div>
  
//   )
// }

// export default Login

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../util';

function Login() {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('email and password are required')
        }
        try {
            const url = `https://new-loginfb-api.vercel.app/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/home')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }

    return (
        <div className='container'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={loginInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={loginInfo.password}
                    />
                </div>
                <button type='submit'>Login</button>
                <span>Does't have an account ?
                    <Link to="/signup">Signup</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Login
