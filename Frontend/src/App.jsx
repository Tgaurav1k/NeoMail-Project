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

import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Inbox from "./Components/Inbox";
import Mail from "./Components/Mail";
import Body from "./Components/Body";
import SendEmail from "./Components/SendEmail";
import Login from "./Components/Login";
import SignUp from "./Components/Signup";
import Landing from "./Components/Landing";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

const Layout = () => {
  const { user } = useSelector((state) => state.app);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  if (!user) return null; // don't show layout while redirecting

  return (
    <>
      <Navbar />
      <div className="flex relative">
        <Sidebar />
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
      {user && (
        <div className="fixed bottom-0 right-0 sm:right-4 md:right-20 left-0 sm:left-auto z-20">
          <SendEmail />
        </div>
      )}
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/inbox",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Inbox />,
      },
    ],
  },
  {
    path: "/mail/:id",
    element: <Layout />,
    children: [
      {
        path: "",
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
    <div className="bg-[#F6F8FC] min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
