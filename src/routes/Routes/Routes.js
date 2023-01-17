import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import UserForm from '../../pages/UserForm/UserForm';
import UserData from '../../pages/UserData/UserData';
import DisplayError from '../../pages/Shared/DisplayError/DisplayError';

const router = createBrowserRouter([
    {
        path: '/',
        element: <UserForm></UserForm>,
        loader: () => fetch('https://task-1-server-iota.vercel.app/sectors')
    },
    {
        path: '/userdata',
        element: <UserData></UserData>

    },
    {
        path: '*',
        element: <DisplayError></DisplayError>
    }
]);

export default router;