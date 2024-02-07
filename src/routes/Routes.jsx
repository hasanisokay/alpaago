
import {
    createBrowserRouter,  
} from "react-router-dom";
import Main from "../Layout/MainLayout";
import ErrorPage from "../components/ErrorPage";
import Login from "../components/Login";
import SignUp from "../components/Signup";
import Home from "../components/Home";
import MainLayout from "../Layout/MainLayout";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
            path: "/",
            element: <Home></Home>
        },
        {
          path: "login",
          element: <Login></Login>
        },
        {
          path: "signup",
          element: <SignUp></SignUp>
        },
      ]
    },
  ]);
const Routes = () => {
    return (
        <div>
            
        </div>
    );
};

export default Routes;