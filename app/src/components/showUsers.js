import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function Show(props) {

    const [users, setUsers] = useState({});

    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {
        const resp = await axios.get(`https://gorest.co.in/public/v2/users`,
            {
                headers: {
                    Authorization: `Bearer ${props.MY_TOKEN}`
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
        setUsers(resp.data);
    };

    const setLocalUserData = (data) => {
        let { id, name, email, gender } = data;
        localStorage.setItem('id', id);
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('gender', gender);
    }

    const deleteUser = (id) => {
        axios.delete(`https://gorest.co.in/public/v2/users/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${props.MY_TOKEN}`
                }
            })
            .then(() => {
                getUser();
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    };

    return (
        <div>
            <h1>Users</h1>
            <Link to="/add" className="">Add User</Link>
            <table className="">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Name</th>
                        <th style={{ width: '30%' }}>Email</th>
                        <th style={{ width: '30%' }}>Gender</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.length > 0 && users.map(user =>
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.gender}</td>
                            <td>
                                <Link to="/update" className="" onClick={() => setLocalUserData(user)}>Edit</Link>
                                <button onClick={() => deleteUser(user.id)} className="" disabled={user.isDeleting}>
                                    {user.isDeleting
                                        ? <span className="spinner"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!users &&
                        <tr>
                            <td colSpan="4" className="">
                                <div className="spinner"></div>
                            </td>
                        </tr>
                    }
                    {users && !users.length &&
                        <tr>
                            <td colSpan="4" className="">
                                <div className="">No Users To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}
