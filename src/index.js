import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter ,Routes , Route } from "react-router-dom";
import Login from './Login.js'
import Home from './Home.js'
import Register from './Register.js'
import AssPatientFound from './AssPatientFound.js'
import AssComferm from './AssComferm'
import AssRegister from './AssRegister'
import AssPps from './AssPps.js'
import SideEffect from './SideEffect.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login />} /> 
    <Route path="/login" element={<Login />} /> 
    <Route path="/register" element={<Register />} /> 
    <Route path="/home" element={<Home />} /> 
    <Route path="/asspatientfound" element={<AssPatientFound />} /> 
    <Route path="/asscomferm" element={<AssComferm />} /> 
    <Route path="/assregister" element={<AssRegister />} /> 
    <Route path="/asspps" element={<AssPps />} /> 
    <Route path="/sideeffect" element={<SideEffect />} /> 
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
