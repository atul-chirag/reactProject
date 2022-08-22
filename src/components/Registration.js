import '../App.css';
import Headers from './Header';
import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
export default function Registration() {

  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [access, setAccess]     = useState("");
  const Navigate                = useNavigate();
  
  useEffect(()=>{
    if(localStorage.getItem('user_info'))
    {
      Navigate("/list");
    }
  },[]);
  async function signUp()
  { 
     let payload = {name,password,email,access};
     let result  =  await fetch("https://dev.cap-tek.com:9005/api/contact/create",{
        method :"POST",
        body: JSON.stringify(payload),
        headers:{
          "Content-Type": "application/json",
          "Accept":"application/json"
        }
     });
    result = await result.json();
    localStorage.setItem('user_info',JSON.stringify(result.data[0]));
    Navigate("/list");
  }

  return (
    <>
    <Headers/>
      <div className='col-sm-5 offset-sm-3'>
        <h1 className='App'>Register Here</h1>
        <div className='col-sm-5 offset-sm-4'>
          <input type="text" 
                placeholder='enter your name' 
                value={name} 
                className='form-control' 
                onChange={(e) => setName(e.target.value)} /><br />
        </div>
        <div className='col-sm-5 offset-sm-4'>
          <input type="text" 
                placeholder='enter your email' 
                value={email} 
                className='form-control' 
                onChange={(e) => setEmail(e.target.value)} /><br />
        </div>
        <div className='col-sm-5 offset-sm-4'>
          <input type="password" 
                placeholder='enter your password' 
                value={password} 
                className='form-control' 
                onChange={(e) => setPassword(e.target.value)} /><br />
        </div>
        <div className='col-sm-5 offset-sm-4'>
          <input type="text" 
                placeholder='enter your access' 
                value={access} 
                className='form-control' 
                onChange={(e) => setAccess(e.target.value)} /><br />
        </div>
        <div className='col-sm-5 offset-sm-4'>
          <button className='btn btn-primary' onClick={signUp}>Submit</button>
        </div>
      </div>
    </>
  )
}
