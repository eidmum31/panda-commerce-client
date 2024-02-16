import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";
import Home from "../Home/Home";
import CheckOut from "../CheckOut/CheckOut";
import Login from "../Login/Login";
import Register from "../Register/Register";

  //setting router
  const router = createBrowserRouter([
    {                                               
      path: "/",                                          //making common layout 
                                                          // for both home and checkout
      element: <HomeLayout></HomeLayout>,
      children:[
        {
            path:'/',
            element:<Home></Home>                        // route for home page
        }
        ,
        {
            path:'/checkout',
            element:<CheckOut></CheckOut>               //  route for checkout page
        }
      ]
    },
    {
      path:'/login',
      element:<Login></Login>
    }
    ,
    {
      path:'/register',
      element:<Register></Register>
    }
  ]);
  export default router;