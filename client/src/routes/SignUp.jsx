import React from 'react'
import { Route, Routes } from "react-router-dom";
import Login from '../components/user/Login';
import Register from '../components/user/Register';

const SignUp = () => {
  return (
    <div>

       <Routes>
       <Route path="/login" element={<Login />} />
       <Route path="/register" element={<Register />} />

        </Routes> 
    </div>
  )
}

export default SignUp