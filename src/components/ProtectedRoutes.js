import '../App.css';
import React, {useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

export default function ProtectedRoutes(props) 
{

    const Navigate   = useNavigate();
    const {Components}  = props;
    useEffect(()=>{
        if(!localStorage.getItem('user_info'))
        {
            Navigate("/login");
        }
    },[]);

  return (
    <div>
        <Components/>
    </div>
  )
}