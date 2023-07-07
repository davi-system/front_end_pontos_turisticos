import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './views/Home';
import Add from './views/Add';
import View from './views/View';

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
        path: "/View",
        element: <View />
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