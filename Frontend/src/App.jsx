import "./App.css";
import "./index.css";

import {
  RouterProvider,
  createBrowserRouter,
  Outlet,
  Navigate,
  useNavigate,
} from "react-router-dom";

import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

// ✅ Using temp_components folder
import Navbar from "./temp_components/Navbar";
import Sidebar from "./temp_components/Sidebar";
import Inbox from "./temp_components/Inbox";
import Mail from "./temp_components/Mail";
import SendEmail from "./temp_components/SendEmail";
import Login from "./temp_components/Login";
import SignUp from "./temp_components/SignUp";

const Layout = () => {
  const { user } = useSelector((state) => state.app);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  if (!user) return null; // Don't show layout while redirecting

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
      {user && (
        <div className="absolute w-[30%] bottom-0 right-20 z-10">
          <SendEmail />
        </div>
      )}
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Inbox />,
      },
      {
        path: "/mail/:id",
        element: <Mail />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

function App() {
  return (
    <div className="bg-[#F6F8FC] h-screen">
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
