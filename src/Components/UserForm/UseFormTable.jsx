import React from 'react';

const UseFormTable = ({ data, handleDeletUser }) => {
    const { _id, username, mobile, email, address } = data;
    return (
        <>
            <tr>
                <td className="pl-3 border border-slate-700 ">{username}</td>
                <td className="pl-3 border border-slate-700 ">{mobile}</td>
                <td className="pl-3 border border-slate-700 ">{email}</td>
                <td className="pl-3 border border-slate-700 ">{address}</td>
                <td className="pl-3 border border-slate-700 "><button onClick={() => handleDeletUser(_id)} className='text-red-500 text-center ml-2'><i title='DELET' className="fas fa-trash-alt" ></i></button></td>
            </tr>
        </>
    );
};

export default UseFormTable;