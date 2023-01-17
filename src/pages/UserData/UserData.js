import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';
import EditUserModal from '../EditUserModal/EditUsermodal';

const UserData = () => {
    // Use Title
    useTitle('User Data');
    // Set User
    const [user, setUser] = useState(null);

    // Get User Id
    const userId = localStorage.getItem('userId');
    // Get User From Database
    useEffect(() => {
        if (userId) {
            fetch(`http://localhost:5000/user/${userId}`)
                .then(res => res.json())
                .then(data => setUser(data))
        }
    }, [userId]);

    return (
        <div className='p-6 max-w-md mx-auto my-12'>
            {/* User Data Title */}
            <h2 className='text-2xl text-center'>User Data</h2>
            {/* User Data */}
            <div className='mt-6'>
                {/* Name */}
                <h2 className='text-xl'>Name: <b>{user?.name}</b></h2>
                {/* Sector */}
                <p className='my-3'>Sector: <b>{user?.sector}</b></p>
                {/* Agree To Terms */}
                <p>Agree To Terms: <b>{user?.terms === 'on' && 'Agreed'}</b></p>
                {/* Save Button */}
                <div className="form-control mt-6">
                    <label htmlFor="editUserModal" className="btn border-none bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-lg font-normal">Edit</label>
                    <EditUserModal user={user} setUser={setUser}></EditUserModal>
                </div>
                {/* New Form Link */}
                <div className='text-center mt-3'>
                    <span>Want to submit new form?</span>
                    <Link to='/' className='text-blue-500 link link-hover ml-1'>Form</Link>
                </div>
            </div>
        </div>
    );
};

export default UserData;