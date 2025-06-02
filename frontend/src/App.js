import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import 'react-toastify/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
