import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const EditUserModal = ({ user, setUser }) => {
    // Use Form
    const { register, handleSubmit, formState: { errors } } = useForm();
    // Set Sectors Object
    const [sectorsObj, setSectorsObj] = useState(null);
    // Set Edit User Loading
    const [editUserLoading, setEditUserLoading] = useState(false);

    // Get Sectors From Database
    useEffect(() => {
        fetch('https://task-1-server-iota.vercel.app/sectors')
            .then(res => res.json())
            .then(data => setSectorsObj(data))
    }, []);

    // Handle Edit User Of Database
    const handleEditUser = data => {
        console.log(data);
        // Set Edit User Loading
        setEditUserLoading(true);
        // Get User Id
        const userId = localStorage.getItem('userId');
        // Edit User Of Database
        fetch(`https://task-1-server-iota.vercel.app/user/${userId}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(userData => {
                console.log(userData);
                // Set Edit User Loading
                setEditUserLoading(false);
                if (userData?.modifiedCount > 0) {
                    // Set User
                    setUser(data);
                    // Toast Success
                    toast.success('User Edited Successfully');
                }
            })
            .catch(error => {
                console.error(error);
                // Set Edit User Loading
                setEditUserLoading(false);
                // Toast Unsuccess
                toast.error('Edit Operation Was Unsuccessfull');
            })
    };

    return (
        <div>
            {/* Put This Part Before </body> Tag */}
            <input type="checkbox" id="editUserModal" className="modal-toggle" />
            {/* Modal */}
            <div className="modal">
                {/* Modal Box */}
                <div className="modal-box">
                    {/* Modal Close Button */}
                    <label htmlFor="editUserModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    {/* Form */}
                    <form onSubmit={handleSubmit(handleEditUser)}>
                        {/* Name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="Name" className="input input-bordered" {...register('name', { required: "Name field mustn't be empty" })} defaultValue={user?.name} />
                            {/* Name Error */}
                            {errors?.name && <span className='text-xs text-error mt-1'>{errors?.name?.message}</span>}
                        </div>
                        {/* Sector */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Sector</span>
                            </label>
                            <select className="select select-bordered w-full" {...register('sector')} defaultValue={user?.sector}>
                                <option disabled selected>{user?.sector}</option>
                                {
                                    sectorsObj?.sectors.map((sector, i) => <option key={i}>{sector}</option>)
                                }
                            </select>
                        </div>
                        {/* Agree To The Terms */}
                        <div className="form-control mt-2">
                            <label className="label flex justify-start">
                                <input type="radio" name="radio-7" className="radio radio-info" {...register('terms', { required: "Please agree to the terms" })} />
                                <span className="label-text font-semibold ml-3">Agree To The Terms</span>
                            </label>
                            {/* Agree To Terms Error */}
                            {errors?.terms && <span className='text-xs text-error mt-1'>{errors?.terms?.message}</span>}
                        </div>
                        {/* Edit Button */}
                        <div className="modal-action">
                            {
                                editUserLoading ? <button className="btn loading text-lg font-normal">Submiting</button>
                                    : <button htmlFor="editUserModal" className="btn text-lg font-normal">Submit</button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditUserModal;