import { Link } from "react-router-dom";
import {
  FiEdit,
  FiEye,
  FiHeart,
  FiUser,
  FiLogOut,
  FiHome,
  FiInfo,
  FiMail,
  FiMenu,
} from "react-icons/fi";
import useAuth from "../../Hooks/useAuth";
import useAdmin from "../../Hooks/userAdmin";
import { useState } from "react";

const Sidebar = () => {
  const { userLogOut, user } = useAuth();
  const [isAdmin] = useAdmin();
  const [isOpen, setIsOpen] = useState(false); 

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Sidebar Toggle Button for Small Devices */}
      <div className="lg:hidden p-4 bg-gradient-to-r from-purple-500 to-pink-500">
        <button onClick={toggleSidebar} className="text-2xl">
          <FiMenu />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`lg:w-72 bg-white shadow-lg border-r ${
          isOpen ? "block" : "hidden"
        } lg:block`}
      >
        <div className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 ">
          <div className="flex gap-4 items-center">
            <img
              className="w-10 h-10 rounded-full"
              src={user?.photoURL}
              alt=""
            />
            <h1 className="text-xl font-bold">{user?.displayName}</h1>
          </div>
        </div>
        <ul className="mt-6 space-y-2 px-4">
          {isAdmin ? (
            <>
              <li>
                <Link
                  to="/dashboard/admin-dashboard"
                  className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  <FiEdit className="text-lg" />
                  <span>Admin Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/manage-users"
                  className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  <FiEye className="text-lg" />
                  <span>Manage Users</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/approved-premium"
                  className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  <FiUser className="text-lg" />
                  <span>Approved Premium</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/approved-contact-request"
                  className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  <FiHeart className="text-lg" />
                  <span>Approved Contact Request</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={userLogOut}
                  className="flex items-center gap-3 py-3 px-4 rounded-lg bg-red-500 text-white hover:bg-red-600 transition w-full"
                >
                  <FiLogOut className="text-lg" />
                  <span>Logout</span>
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/dashboard/user-dashboard"
                  className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  <FiEye className="text-lg" />
                  <span>User Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/edit-biodata"
                  className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  <FiEdit className="text-lg" />
                  <span>Add or Edit Biodata</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard/view-biodata"
                  className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  <FiEye className="text-lg" />
                  <span>View Biodata</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/my-contact-requests"
                  className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  <FiUser className="text-lg" />
                  <span>My Contact Requests</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/favorites-biodata"
                  className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  <FiHeart className="text-lg" />
                  <span>Favourites Biodata</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={userLogOut}
                  className="flex items-center gap-3 py-3 px-4 rounded-lg bg-red-500 text-white hover:bg-red-600 transition w-full"
                >
                  <FiLogOut className="text-lg" />
                  <span>Logout</span>
                </button>
              </li>
            </>
          )}
        </ul>
        {/* Shared nav link */}
        <div className="mt-8 border-t px-4 pt-6 space-y-2">
          <h2 className="text-sm text-gray-500 uppercase tracking-wider mb-3">
            Explore
          </h2>
          <ul>
            <li>
              <Link
                to="/"
                className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
              >
                <FiHome className="text-lg" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
              >
                <FiInfo className="text-lg" />
                <span>About Us</span>
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
              >
                <FiMail className="text-lg" />
                <span>Contact Us</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
