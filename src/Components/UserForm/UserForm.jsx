import axios from 'axios';
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { useAuth } from '../Auth/AuthContext';
import UseFormTable from './UseFormTable';

const UserForm = () => {
    const [data, setData] = useState([])
    const { logout } = useAuth();

    // submit userDetails
    const handleSubmit = (e) => {
        e.preventDefault();
        if (/^[a-zA-Z0-9]+$/.test(e.target.username.value) && /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(e.target.mobile.value)) {
            axios.post(`https://secure-lowlands-09933.herokuapp.com/api/userDetails`, {
                username: e.target.username.value,
                mobile: e.target.mobile.value,
                email: e.target.email.value,
                address: e.target.address.value
            })
                .then((res) => {
                    e.target.reset();

                    swal({ title: "User added successfully!", icon: "success" });
                })
                .catch(err => swal({ title: "username or mobile number or email already exist !", icon: "warning" }));


        }

        else {
            if (!/^[a-zA-Z0-9]+$/.test(e.target.username.value)) {
                swal({ title: "UserName should No spaces or Only alphanumeric characters", icon: "warning" });
            }
            if (!/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(e.target.mobile.value)) {
                swal({
                    title: "Mobile-Number Should be Only 10 numbers",
                    icon: "warning"
                });
            }
        }
    }

    // get userDetails
    useEffect(() => {
        axios.get(`https://secure-lowlands-09933.herokuapp.com/api/userDetails`).then((res) => {
            setData(res.data);
        })
    }, [data]);

    // delet user data

    const handleDeletUser = (id) => {
        swal({
            title: "Are you sure for Delet?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(`https://secure-lowlands-09933.herokuapp.com/api/userDetails/${id}`).then((res) => {
                        const message = res.data.message;
                        swal({ title: `${message}`, icon: "success" });
                    })
                }
            });
    }

    return (
        <>
            <div className='w-full h-14 flex justify-end items-center bg-red-500'>
                <div className='mx-10 my-1'><button className='border hover:bg-white text-white hover:text-black py-1 px-3 rounded' onClick={logout}>LogOut</button></div>
            </div>
            <div className='flex m-5'>
                <div className='w-3/5 mx-auto flex justify-center items-start'>
                    <form className='m-5 ' onSubmit={e => handleSubmit(e)}>
                        <h1 className='text-center text-xl font-bold my-5'>Add User Details</h1>
                        <input className='input' type="text" name="username" placeholder='Username' required /> <br />
                        <input className='input' type="number" name="mobile" maxLength={10} id="" placeholder='Mobile Number' required /> <br />
                        <input className='input' type="email" name="email" id="" placeholder='Email' required /> <br />
                        <input className='input' type="text" name="address" placeholder='address' required /> <br />
                        <input className='text-white py-2 px-4 bg-red-500 rounded ml-20 mt-5 cursor-pointer hover:bg-red-600' type="submit" value="Submit" />
                    </form>
                </div>
                <table className="border-collapse border border-slate-500 w-full m-5 ">
                    <thead>
                        <tr className='bg-green-500'>
                            <th className="border border-slate-600 ">UserName</th>
                            <th className="border border-slate-600 ">Mobile Number</th>
                            <th className="border border-slate-600 ">Email</th>
                            <th className="border border-slate-600 ">Address</th>
                            <th className="border border-slate-600 ">Action</th>
                        </tr>
                    </thead>
                    <tbody className='bg-gray-100'>
                        {
                            data.map(res =>
                                <UseFormTable
                                    key={res._id}
                                    data={res}
                                    handleDeletUser={handleDeletUser}
                                ></UseFormTable>
                            )
                        }
                    </tbody>
                </table>
            </div>

        </>
    );
};

export default UserForm;