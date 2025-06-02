import React, { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';


const Home = () => {

    const [loggedInUser, setLoggedInUser] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    const handelLogOut = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInuser');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    }

  return (
    <div>
      <h1>{loggedInUser}</h1>
      <button onClick={handelLogOut}>LogOut</button>
    </div>
  )
}

export default Home
