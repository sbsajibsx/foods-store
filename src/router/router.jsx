import { createBrowserRouter } from "react-router-dom";
import Main from "../layOut/Main";
import Error from "../pages/Error";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import AddFood from "../pages/AddFood";
import MyFoods from "../pages/MyFoods";
import MyOrders from "../pages/MyOrders";
import Gallery from "../pages/Gallery";
import AllFoods from "../pages/AllFoods";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <Error></Error>,
        children: [
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/add-food',
                element: <AddFood></AddFood>
            },
            {
                path: '/my-foods',
                element: <MyFoods></MyFoods>
            },
            {
                path: '/my-orders',
                element: <MyOrders></MyOrders>
            },
            {
                path: '/gallery',
                element: <Gallery></Gallery>
            },
            {
                path: '/foods',
                element: <AllFoods></AllFoods>
            }
        ]
    }
])

export default router;