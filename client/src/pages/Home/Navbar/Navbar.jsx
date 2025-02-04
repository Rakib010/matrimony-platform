import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import useAuth from "./../../../Hooks/useAuth";

const Navbar = () => {
  const { user, userLogOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = () => {
      setIsMenuOpen(false);
      setIsUserDropdownOpen(false);
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <nav className="px-6 py-4 text-gray-800 bg-white shadow-lg rounded-b-lg w-full relative">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-gray-800">Find Partner</span>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-8 text-gray-800 font-medium">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/biodatas">Biodatas</Link>
          </li>
          {user && (
            <li>
              <Link to="/dashboard" className="hover:underline">
                Dashboard
              </Link>
            </li>
          )}
          <li>
            <Link to="/about" className="hover:underline">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:underline">
              Contact Us
            </Link>
          </li>
          <li>
            {user ? (
              <div
                className="relative cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsUserDropdownOpen(!isUserDropdownOpen);
                }}
              >
                <img
                  src={user?.photoURL || "default-avatar.png"}
                  alt="profile"
                  className="w-8 h-8 rounded-full"
                />
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                    <p className="px-4 py-2 text-sm text-gray-700">
                      {user?.displayName}
                    </p>
                    <button
                      onClick={userLogOut}
                      className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/signin">
                <button className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">
                  Login
                </button>
              </Link>
            )}
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
          className="md:hidden text-gray-800 focus:outline-none"
        >
          <MdMenu className="text-xl" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="mt-4 space-y-3 p-4 rounded bg-white text-gray-800">
          <li>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/biodatas" onClick={() => setIsMenuOpen(false)}>
              Biodatas
            </Link>
          </li>
          {user && (
            <li>
              <Link
                to="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="hover:underline"
              >
                Dashboard
              </Link>
            </li>
          )}
          <li>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
              Contact Us
            </Link>
          </li>
          <li>
            {user ? (
              <div
                className="relative cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsUserDropdownOpen(!isUserDropdownOpen);
                }}
              >
                <div className="flex items-center space-x-2">
                  <img
                    src={user?.photoURL || "default-avatar.png"}
                    alt="profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{user?.displayName}</span>
                </div>
                {isUserDropdownOpen && (
                  <div className="mt-2 p-2 bg-white rounded-lg shadow-lg">
                    <button
                      onClick={userLogOut}
                      className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/signin" onClick={() => setIsMenuOpen(false)}>
                <button className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">
                  Login
                </button>
              </Link>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
