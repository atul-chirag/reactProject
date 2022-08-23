import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
export default function Profile() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [country, setCountry] = useState("");
    const [data, setData] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const Navigate = useNavigate();


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

        let result = await fetch("https://dev.cap-tek.com:9005/api/profile/detail",
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

        setData(result.data[0]);
        setName(result.data[0].name);
        setEmail(result.data[0].email);
        setPhone(result.data[0].phone);
        setAddress(result.data[0].address);
        setCity(result.data[0].city);
        setState(result.data[0].state);
        setZipcode(result.data[0].zipcode);
        setCountry(result.data[0].country);
    }

    async function updateProfile() {
        const user = JSON.parse(localStorage.getItem('user_info'));
        let payload = { name, email, phone, address, state, city, zipcode, country, token: user.token };
        let result = await fetch("https://dev.cap-tek.com:9005/api/profile/update", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });
        result = await result.json();
        if (result.msg === 'success') {
            Navigate("/profile");
            alert('Profile has been update')
        } else {
            alert('Opps! something went wrong ')
        }
    }

    async function handleResetPassword()
    {   
        const user = JSON.parse(localStorage.getItem('user_info'));
        const payload  = {email,password: oldPassword ,new_password: newPassword,token:user.token}
        let result = await fetch("https://dev.cap-tek.com:9005/api/password/update", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });
        result = await result.json();
        if (result.msg === 'success') {
            setShow(false);
        } else {
            setShow(false);
        }
    }

    return (
        <div>
            <Header />
            <Card>
                <Card.Body>
                    <div className='col-sm-4 offset-sm-4'>
                        <h1>Profile</h1>
                    </div>
                    <div className='col-sm-4 offset-sm-4'>
                        <div className="row g-3">
                            <div className="col">
                                <input type="text" className="form-control" defaultValue={data.name} placeholder="Name" aria-label="Name"
                                    onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" defaultValue={data.email} disabled placeholder="Email" aria-label="Email" />
                            </div>
                        </div>
                        <br />
                        <div className="row g-3">
                            <div className="col">
                                <input type="text" className="form-control" defaultValue={data.phone} placeholder="Phone" aria-label="Phone"
                                    onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" defaultValue={data.address} placeholder="Address" aria-label="Address"
                                    onChange={(e) => setAddress(e.target.value)} />
                            </div>
                        </div>
                        <br />
                        <div className="row g-3">
                            <div className="col">
                                <input type="text" className="form-control" defaultValue={data.city} placeholder="City" aria-label="City"
                                    onChange={(e) => setCity(e.target.value)} />
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" defaultValue={data.state} placeholder="State" aria-label="State"
                                    onChange={(e) => setState(e.target.value)} />
                            </div>
                        </div>
                        <br />
                        <div className="row g-3">
                            <div className="col">
                                <input type="text" className="form-control" defaultValue={data.zipcode} placeholder="ZipCode" aria-label="ZipCode"
                                    onChange={(e) => setZipcode(e.target.value)} />
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" defaultValue={data.country} placeholder="Country" aria-label="Country"
                                    onChange={(e) => setCountry(e.target.value)} />
                            </div>
                        </div>
                        <br />
                        <div className="row g-3">
                            <div className="col">
                                <button className='btn btn-secondary mx-6' onClick={() => Navigate('/list')}>Back</button>
                                <button className='btn btn-primary  mx-2' onClick={updateProfile}>Update</button>
                                <span className='mx-2' onClick={() => { handleShow() }}>Reset Password</span>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Set/Reset Password </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div className="row g-1">
                                            <input type="password" className="form-control"  placeholder="Old Password" aria-label="Old Password"
                                            onChange={(e) => setOldPassword(e.target.value)} />
                                        </div>
                                        <br/>
                                        <div className="col">
                                            <input type="password" className="form-control" placeholder="New Password" aria-label="New Password"
                                                onChange={(e) => setNewPassword(e.target.value)} />
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                                        <Button variant="primary"   onClick={handleResetPassword}>Change</Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}