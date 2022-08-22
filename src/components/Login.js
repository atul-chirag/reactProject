import '../App.css';
import React, { useState, useEffect } from 'react';
import Headers from './Header';

import { useNavigate } from 'react-router-dom';
export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('user_info')) {
      Navigate("/list");
    }
  }, []);

  async function login() {
    let payload = { email, password };
    let result = await fetch("https://dev.cap-tek.com:9005/api/user/token", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    });
    result = await result.json();

    if (result.msg) {
      setError(result.msg);
    }
    else {
      localStorage.setItem('user_info', JSON.stringify(result.data[0]));
      Navigate("/list");
    }
  }

  return (
    <>
      <Headers />   
      <div className='login_form col-sm-5 offset-sm-3'>
        <h1 className='App'>Login Page</h1>
        {
          error.length > 0 ? error.map((value,i) =>
            <div className='col-sm-4 offset-sm-4 my-2' key={i}><span className='text-danger'>{value}</span></div>
          ) : null
        }
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
          <button className='btn btn-primary' type='submit' onClick={login}>Login</button>
        </div>
      </div>
    </>
  )
}