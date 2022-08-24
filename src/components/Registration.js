import '../App.css';
import Headers from './Header';
import Form from 'react-bootstrap/Form';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Registration() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [access, setAccess] = useState("");
  const [error, setError] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('user_info')) {
      Navigate("/list");
    }
  }, []);
  async function signUp() {
    let payload = { name, password, email, access };
    let result = await fetch("https://dev.cap-tek.com:9005/api/contact/create", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    });
    result = await result.json();
    if (!result.msg) 
    {
      localStorage.setItem('user_info', JSON.stringify(result.data[0]));
      Navigate("/machinery");
    }
    else if (result.msg) {
      setError(result.msg);
    }
  }

  return (
    <>
      <div className='col-sm-5 offset-sm-3'>
        <h1 className='App'>Register Here</h1>
        {
          error.length > 0 ? error.map((value, i) =>
            <div className='col-sm-4 offset-sm-4 my-2' key={i}><span className='text-danger'>{value}</span></div>
          ) : null
        }
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
          <Form.Select onChange={(e) => setAccess(e.target.value)}>
            <option>Select Access</option>
            <option value="line_operator">Line Operator</option>
            <option value="line_manager">Line Manager</option>
            <option value="operator">Operator</option>
            <option value="supervisor">Supervisor</option>
          </Form.Select>
        </div>
        <div className='col-sm-5 offset-sm-4 my-3'>
          <button className='btn btn-primary' onClick={signUp}  style={{backgroundColor: "#FD6600"}} type="submit">Submit</button>
        </div>
      </div>
    </>
  )
}
