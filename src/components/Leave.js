import React, { useState, useEffect } from 'react';
import Headers from './Header';
import Table from 'react-bootstrap/Table';
import { FcPlus } from "react-icons/fc";
// import Collapse from 'react-bootstrap/Collapse';
import Spinner from 'react-bootstrap/Spinner';

export default function Leave() {
  const [data, setData] = useState({});
  // const [open, setOpen] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const user = JSON.parse(localStorage.getItem('user_info'));
    const quickDate = {"start_date":"2022-07-25","end_date":"2022-08-23"}
    const payload = { ...quickDate,token: user.token }

    let result = await fetch("https://dev.cap-tek.com:9005/api/leave/listing",
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers:
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      });
    result = await result.json();
    setData(result.data)
  }

  function submit()
  {
    console.log('object')
  }
  
  return (
    <div>
      <div className="container-fluid">
        <h4 style={{ backgroundColor: "#F1F1F1" }}>Leave
        </h4>
      </div>
      <Table striped bordered hover size="sm">
        <thead >
          <tr>
            <th></th>
            <th>Worker Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {
            data.length > 0 ?
              data.map((item, i) =>
                <tr>
                  {
                    item.inner_data.length > 0?
                    item.inner_data.map((inner_data)=>
                    <td><span onClick={submit}><FcPlus/></span></td>
                    )
                    :null
                  }
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                </tr>
              )
              : <Spinner animation="border" />
          }
        </tbody>
      </Table>
    </div>
  )
}
