import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useLoaderData } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';

const UserForm = () => {
    // Use Title
    useTitle('Form');
    // Use Form
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    // Get Sectors From Database
    const sectorsObj = useLoaderData();
    // Set Save User Loading
    const [saveUserLoading, setSaveUserLoading] = useState(false);

    // Handle Save User To Database
    const handleSaveUser = data => {
        console.log(data);
        // Set Save User Loading
        setSaveUserLoading(true);
        // Post Data To Database
        fetch('https://task-1-server-iota.vercel.app/user', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(userData => {
                console.log(userData);
                // Set Save User Loading
                setSaveUserLoading(false);
                if (userData?.acknowledged) {
                    // Set User Id
                    localStorage.setItem('userId', userData?.insertedId);
                    // Toast Success
                    toast.success(`User ${data?.name} Saved Successfully`);
                    // Reset
                    reset();
                }
            })
            .catch(error => {
                console.error(error);
                // Set Save User Loading
                setSaveUserLoading(false);
                // Toast Unsuccess
                toast.error(`Save User ${data?.name} Operation Was Unsuccessfull`);
            })
    };

    return (
        <div className='p-6 max-w-md mx-auto my-12'>
            {/* Save User Title */}
            <h2 className='text-2xl text-center'>Save User</h2>
            {/* Form */}
            <form onSubmit={handleSubmit(handleSaveUser)}>
                {/* Name */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" placeholder="Name" className="input input-bordered" {...register('name', { required: "Name field mustn't be empty" })} />
                    {/* Name Error */}
                    {errors?.name && <span className='text-xs text-error mt-1'>{errors?.name?.message}</span>}
                </div>
                {/* Sector */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Sector</span>
                    </label>
                    <select className="select select-bordered w-full" {...register('sector')}>
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
                {/* Save Button */}
                <div className="form-control mt-6">
                    {
                        saveUserLoading ? <button className="btn loading text-lg font-normal">Saving</button>
                            : <button className="btn border-none bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-lg font-normal">Save</button>
                    }
                </div>
                {/* User Data Link */}
                <div className='text-center mt-3'>
                    <span>Want to see your submitted data?</span>
                    <Link to='/userdata' className='text-blue-500 link link-hover ml-1'>Visit</Link>
                </div>
            </form>
        </div>
    );
};

export default UserForm;