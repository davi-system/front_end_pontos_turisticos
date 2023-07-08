import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './views/Home';
import Add from './views/Add';
import View from './views/View';
import Edit from './views/Edit';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/Add",
        element: <Add />
    },
    {
        path: "/View/:id",
        element: <View />
    },
    {
        path: "/Edit/:id",
        element: <Edit />
    }
]);

const App = () => {
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    )
}

export default App;