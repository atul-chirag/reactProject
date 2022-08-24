import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Headers from './Header';
import Table from 'react-bootstrap/Table';
import { FaEdit, FaTrash } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

export default function Worker() {
  const [data, setData] = useState("");
  const [updateItem, setUpdateItem] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [eav_set, setEav] = useState("");
  const [elv_set, setElv] = useState("");


  // Model Properties 
  const [show, setShow] = useState(false);
  const handleClose     = () => setShow(false);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const user = JSON.parse(localStorage.getItem('user_info'));
    const payload = { token: user.token }

    let getData = await fetch("https://dev.cap-tek.com:9005/api/operator/list",
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers:
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      });
      getData = await getData.json();
    setData(getData.data)
  }

  async function handleShow(id)
  { 
    const user = JSON.parse(localStorage.getItem('user_info'));

    const payload = { id: id.id,token: user.token }

    let updateResult = await fetch("https://dev.cap-tek.com:9005/api/operator/list",
    {
      method : "POST",
      body   : JSON.stringify(payload),
      headers: { "Content-Type": "application/json", "Accept": "application/json"}
    });
    updateResult = await updateResult.json();
    setUpdateItem(updateResult.data[0])
    setName(updateResult.data[0].name);
    setEmail(updateResult.data[0].email);
    setEav(updateResult.data[0].eav_set);
    setElv(updateResult.data[0].elv_set);
    setShow(true);
  }
  async function handleUpdate(updateValue) 
  {
    const user    = JSON.parse(localStorage.getItem('user_info'));
    const current = new Date();
    const date    = `${current.getDate()}-${current.getMonth()+1}-${current.getFullYear()}`;
    const payload = { ...updateValue, date,name, email,eav_set, elv_set, action:"update", token: user.token }
   
    let update = await fetch("https://dev.cap-tek.com:9005/api/update/worker",
    {
      method : "POST",
      body   : JSON.stringify(payload),
      headers: { "Content-Type": "application/json", "Accept": "application/json"}
    });
    update = await update.json();
    setUpdateItem("");
    if(update.msg === 'success')
    { 
      setShow(false)
      alert("data has been updated successfully");
    }else if (update.msg !== 'success')
    {
      alert(update.msg);
      // setShow(false)
    }
  }

  async function handleDelete(deleteID)
  {
    const user    = JSON.parse(localStorage.getItem('user_info'));
    const payload = {id:deleteID.id,status:"paperbasket", token: user.token }
   
    let update = await fetch("https://dev.cap-tek.com:9005/api/user/status",
    {
      method : "POST",
      body   : JSON.stringify(payload),
      headers: { "Content-Type": "application/json", "Accept": "application/json"}
    });
    update = await update.json();
    setUpdateItem("");
    if(update.msg === 'success')
    { 
      setShow(false)
      alert("data has been updated successfully");
    }else if (update.msg !== 'success')
    {
      alert(update.msg);
      // setShow(false)
    }
  }
  return (
    <div>
      <div className="container-fluid">
        <h4 style={{ backgroundColor: "#F1F1F1" }}>Machinery
          <span className="float-right">
            <Link to="/newworkers" className="btn btn-orange sm">Add Worker</Link>
          </span>
        </h4>
      </div>
      <Table striped bordered hover size="sm">
        <thead >
          <tr>
            <th>Exposure Date</th>
            <th>Worker Name</th>
            <th>Email</th>
            <th>EAV</th>
            <th>ELV</th>
            <th>Eav Set</th>
            <th>Elv Set</th>
            <th>Report</th>
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
                  <td>{item.email}</td>
                  <td><a target="_blank" to="/workers" style={{'color':'orange'}}>{item.eav}</a></td>
                  <td><a target="_blank" to="/workers" style={{'color':'orange'}}>{item.elv}</a></td>
                  <td>{item.eav_set}</td>
                  <td>{item.elv_set}</td>
                  <td><a target="_blank" to="/workers" style={{'color':'orange'}}>Report</a></td>
                  <td>
                    <span className="mx-2" onClick={() => { handleShow(item) }} style={{'color':'orange'}}><FaEdit /> </span>
                    <Modal show={show} onHide={handleClose} key= {i}>
                      <Modal.Header closeButton>
                        <Modal.Title >Edit Worker</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div className="row g-1">
                          <label htmlFor=""><b>Name<span className='text-danger'>*</span></b></label>
                          <input type="text" className="form-control" aria-label="Name"
                          defaultValue={updateItem.name}
                          onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="col">
                          <label htmlFor=""><b>Email<span className='text-danger'>*</span></b></label>
                          <input type="text" className="form-control"  aria-label="email"
                            defaultValue={updateItem.email}
                           onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="col">
                          <label htmlFor=""><b>Eav Set<span className='text-danger'>*</span></b></label>
                          <input type="text" className="form-control"  aria-label="eav set"
                           defaultValue={updateItem.eav_set}
                          onChange={(e) => setEav(e.target.value)}  />
                        </div>
                        <div className="col">
                          <label htmlFor=""><b>Elv Set<span className='text-danger'>*</span></b></label>
                          <input type="text" className="form-control"  aria-label="elv set"
                           defaultValue={updateItem.elv_set}
                          onChange={(e) => setElv(e.target.value)}  />
                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                        <Button variant="primary" style={{backgroundColor: "#FD6600"}} onClick={()=>{handleUpdate(updateItem)}}>Save</Button>
                      </Modal.Footer>
                    </Modal>
                    <span className="my-2" onClick={() => handleDelete(item)}><FaTrash /></span>
                  </td>
                </tr>
              )
              :<Spinner animation="border" /> 
          }
        </tbody>
      </Table>

    </div>
  )
}
