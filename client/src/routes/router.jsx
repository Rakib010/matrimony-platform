import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home/Home";
import SignUp from "../pages/SignUp/SignUp";
import SignIn from "../pages/Login/SignIn";
import Biodatas from "../pages/Biodatas/Biodatas";
import BiodataDetails from "../pages/BiodataDetails/BiodataDetails";
import Dashboard from "../layouts/Dashboard";
import ViewBiodata from "../pages/Dashboard/User/ViewBiodata";
import Addbiodata from "../pages/Dashboard/User/Addbiodata";
import FavoritesBioData from "../pages/Dashboard/User/FavoritesBioData ";
import ContactRequests from "../pages/Dashboard/User/ContactRequests";
import Checkout from "../pages/Checkout/Checkout";
import AdminDashboard from "../pages/Dashboard/Admin/AdminDashboard";
import ManageUser from "../pages/Dashboard/Admin/ManageUser";
import PrivateRoute from "./PrivateRoute";
import ApprovedPremium from "../pages/Dashboard/Admin/ApprovedPremium";
import ApprovedContactRequest from "../pages/Dashboard/Admin/ApprovedContactRequest";
import GotMarried from "../pages/Dashboard/User/GotMarried";
import AdminRoute from "./AdminRoute";
import AboutUs from "../components/About/AboutUs";
import ContactUs from "../components/Contact/ContactUs";
import UserHome from "../pages/Dashboard/User/Userhome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/biodatas",
        element: <Biodatas />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/biodataDetails/:id",
        element: (
          <PrivateRoute>
            <BiodataDetails />
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          // Fetch single biodata
          const biodataRes = await fetch(
            `${import.meta.env.VITE_API_URL}/biodata/${params.id}`
          );
          const biodata = await biodataRes.json();

          /* // Fetch similar data based on biodata type
          const similarDataRes = await fetch(
            `${import.meta.env.VITE_API_URL}/biodata/similar/?gender=${
              biodata.biodataType
            }`
          );
          const similarData = await similarDataRes.json(); */
          return { biodata /* similarData */ };
        },
      },
      {
        path: "/checkout/:biodataId",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <UserHome />,
      },
      {
        path: "view-biodata",
        element: (
          <PrivateRoute>
            <ViewBiodata />
          </PrivateRoute>
        ),
      },
      {
        path: "edit-biodata",
        element: (
          <PrivateRoute>
            <Addbiodata />
          </PrivateRoute>
        ),
      },
      {
        path: "my-contact-requests",
        element: (
          <PrivateRoute>
            <ContactRequests />
          </PrivateRoute>
        ),
      },
      {
        path: "favorites-biodata",
        element: (
          <PrivateRoute>
            <FavoritesBioData />
          </PrivateRoute>
        ),
      },
      {
        path: "user-dashboard",
        element: <GotMarried />,
      },
      /* admin */
      {
        path: "admin-dashboard",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUser />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "approved-premium",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ApprovedPremium />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "approved-contact-request",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ApprovedContactRequest />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
