import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import AddUser from '../Pages/AddUser/AddUser';
import AllUsers from '../Pages/AllUsers/AllUsers';

import Home from '../Pages/Home/Home/Home';
import Login from '../Pages/Login/Login';
import SignUp from '../Pages/SignUp/SignUp';
import UpdateUser from '../Pages/UpdateUser/UpdateUser';
import UserDetails from '../Pages/userDetails/UserDetails';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: 'login',
        element: <Login></Login>,
      },
      {
        path: 'signup',
        element: <SignUp></SignUp>,
      },
      {
        path: 'addUser',
        element: <AddUser></AddUser>,
      },
      {
        path: 'allUser',
        element: <AllUsers></AllUsers>,
      },
      {
        path: 'userDetails/:id',
        element: <UserDetails></UserDetails>,
        loader: ({ params }) =>
          fetch(
            `https://user-management-server-bay.vercel.app/user/${params.id}`
          ),
      },
      {
        path: 'updateUser/:id',
        element: <UpdateUser></UpdateUser>,
        loader: ({ params }) =>
          fetch(
            `https://user-management-server-bay.vercel.app/user/${params.id}`
          ),
      },
    ],
  },
]);
