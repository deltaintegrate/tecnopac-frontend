import React, { useState } from 'react'
import {useNavigate } from "react-router-dom";
import './User/User.css';
import Loader from './common/Loader';
const CreateUser = () => {
    const navigate = useNavigate();
    const createUserApi = "http://localhost:3005/user"
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({
        name: "",
        role: 1,
        status: 1,
        socialProfiles: "",
        promote_status: true,
        rating: "",
        login_at: ""
    })

    const handelInput = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        console.log(name, value)
        setUser({ ...user, [name]: value });
    }

    const handelSubmit = async (event) => {
        event.preventDefault();
        console.log(user)
        try {
            setIsLoading(true);
            const response = await fetch(createUserApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                console.log('Form submitted successfully!');
                setUser({
                  name: "", 
                  role: 1,
                  status: 1,
                  socialProfiles: "",
                  promote_status: true,
                  rating: "",
                  login_at: ""
                })
                navigate('/show-user');
            } else {
                console.error('Form submission failed!');
            }

        } catch (error) {
            setError(null);
        } finally{
            setIsLoading(false);
        }
    }

    return (
        <div className='user-form'>
            <div className='heading'>
            {isLoading && <Loader />}
            {error && <p>Error: {error}</p>}
                <p>User Form</p>
            </div>
            <form onSubmit={handelSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={user.name} onChange={handelInput} />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="email" className="form-label">Role</label>
                    <input type="email" className="form-control" id="email" name="email" value={user.role} onChange={handelInput} />
                </div>
                <div className="mb-3">
                    <label htmlFor="pwd" className="form-label">Status</label>
                    <input type="text" className="form-control" id="phone" name="phone" value={user.status} onChange={handelInput} />
                </div>
                <div className="mb-3">
                    <label htmlFor="pwd" className="form-label">Status</label>
                    <input type="text" className="form-control" id="phone" name="phone" value={user.status} onChange={handelInput} />
                </div>
                <button type="submit" className="btn btn-primary submit-btn">Submit</button>
            </form>
        </div>
    )
}

export default CreateUser