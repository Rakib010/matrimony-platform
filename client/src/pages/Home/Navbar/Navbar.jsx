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
    <nav className="fixed top-0 left-0 w-full z-50 bg-pink-400 shadow-lg">
      <div className="w-11/12 mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-white">Find Partner</span>
          </div>

          {/* Desktop Links */}
          <ul className="hidden md:flex space-x-8 text-white font-medium items-center">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/biodatas">Biodatas</Link>
            </li>
            {user && (
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            )}
            <li>
              <Link to="/about">About Us</Link>
            </li>
            {user && (
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
            )}
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
                    className="w-8 h-8 rounded-full border-2 border-white"
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
                  <button className="px-4 py-2 rounded bg-secondary text-white hover:bg-secondary-dark">
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
            className="md:hidden text-white focus:outline-none"
          >
            <MdMenu className="text-2xl" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <ul className="mt-4 space-y-4 p-4 bg-primary text-white rounded-b-lg">
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
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                  Dashboard
                </Link>
              </li>
            )}
            <li>
              <Link to="/about" onClick={() => setIsMenuOpen(false)}>
                About Us
              </Link>
            </li>
            {user && (
              <li>
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                  Contact Us
                </Link>
              </li>
            )}
            <li>
              {user ? (
                <div className="pt-4 border-t border-white/20">
                  <div className="flex items-center space-x-3">
                    <img
                      src={user?.photoURL || "default-avatar.png"}
                      alt="profile"
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                    <span>{user?.displayName}</span>
                  </div>
                  <button
                    onClick={userLogOut}
                    className="w-full mt-4 px-4 py-2 text-left rounded bg-secondary hover:bg-secondary-dark"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/signin" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full px-4 py-2 rounded bg-secondary text-white hover:bg-secondary-dark">
                    Login
                  </button>
                </Link>
              )}
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
