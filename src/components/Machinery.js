import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Headers from './Header';
import Table from 'react-bootstrap/Table';
import { FaEdit, FaTrash } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Machinery() {
  const [data, setData] = useState("");
  const [name, setName] = useState("");
  const [serial_number, setSerialNumber] = useState("");
  const [vibration_magnitude, setVibrationMagnitude] = useState("");




  // Model Properties 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const user = JSON.parse(localStorage.getItem('user_info'));
    const payload = { token: user.token }

    let result = await fetch("https://dev.cap-tek.com:9005/api/machine/list",
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

  async function handleUpdate(item) {
    // const user = JSON.parse(localStorage.getItem('user_info'));
    // const payload = { ...item,token: user.token }
    // let result = await fetch("https://dev.cap-tek.com:9005/api/machine/update",
    // {
    //   method :"POST",
    //   body:JSON.stringify(payload),
    //   headers:
    //   {
    //     "Content-Type":"application/json",
    //     "Accept":"application/josn"
    //   }
    // })
    //   result = await result.json();
    //   setShow(false)

      // if(result.msg === 'success')
      // { 
      //   setShow(false)
      //   alert("data has been updated successfully");
      // }else if (result.msg !== 'success')
      // {
      //   alert("Oops! something went wrong");
      // }
  }
  return (
    <div>
      <Headers />
      <div className="container-fluid">
        <h4 style={{ backgroundColor: "#F1F1F1" }}>Machinery
          <span className="float-right">
            <Link to="/newmachine" className="btn btn-orange sm">Add New Machine</Link>
          </span>
        </h4>
      </div>
      <Table striped bordered hover size="sm">
        <thead >
          <tr>
            <th>Calibration Date</th>
            <th>Name</th>
            <th>Serial Number</th>
            <th>Vibration Magnitude</th>
            <th>QR Code</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            data.length > 0 ?
              data.map((item, i) =>
                <tr key={i}>
                  <td>{item.date}</td>
                  <td>{item.name}</td>
                  <td>{item.serial_number}</td>
                  <td>{item.vibration_magnitude}</td>
                  <td><a target="_blank" href={item.qr_code}>Code</a></td>
                  <td>
                    <span className="mx-2" onClick={() => { handleShow() }}><FaEdit /> </span>
                    <Modal show={show} onHide={handleClose} key= {i}>
                      <Modal.Header closeButton>
                        <Modal.Title >Edit Machinery</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div className="row g-1">
                          <label htmlFor="">Name*</label>
                          <input type="text" className="form-control" placeholder="Name*" aria-label="Name"
                          defaultValue={item.name}
                          onChange={(e) => setName(e.target.value)} />
                        </div>
                        <br />
                        <div className="col">
                          <label htmlFor="">Serial Number*</label>
                          <input type="text" className="form-control" placeholder="Serial Number*" aria-label="Serial Number"
                            defaultValue={item.serial_number}
                           onChange={(e) => setSerialNumber(e.target.value)} />
                        </div>
                        <br />
                        <div className="col">
                          <label htmlFor="">Vibration Magnitude*</label>
                          <input type="text" className="form-control" placeholder="Vibration Magnitude*" aria-label="Vibration Magnitude"
                           defaultValue={item.vibration_magnitude}
                          onChange={(e) => setVibrationMagnitude(e.target.value)}  />
                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                        <Button variant="primary" style={{backgroundColor: "#FD6600"}} onClick={()=>{handleUpdate(item)}}>Save</Button>
                      </Modal.Footer>
                    </Modal>
                    <span className="my-2" onClick={() => handleClose()}><FaTrash /> </span>
                  </td>
                </tr>
              )
              : <p>Loading...</p>
          }
        </tbody>
      </Table>

    </div>
  )
}
