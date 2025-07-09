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

import Navbar from "./tempcomponents/Navbar";
import Sidebar from "./tempcomponents/Sidebar";
import Inbox from "./tempcomponents/Inbox";
import Mail from "./tempcomponents/Mail";
// import Body from "./temp_components/Body";
import SendEmail from "./temp_components/sendEmail";
import Login from "./tempcomponents/Login";
import SignUp from "./tempcomponents/SignUp";
import { Toaster } from "react-hot-toast";
import { useEffect } from React;
const Layout = () => {
  const { user } = useSelector((state) => state.app);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  if (!user) return null; // don't show layout while redirecting

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Outlet /> {/* Nested pages like Inbox and Mail */}
      </div>
      {user && (
        <div className="absolute w-30% bottom-0 right-20 z-10">
          <SendEmail />
        </div>
      )}
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // ✅ Includes Navbar + Sidebar
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
