import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-gray-500 to-gray-600 text-white py-10 mt-10">
      <div className="w-11/12 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-8">
          {/* Left Section */}
          <div className="text-center md:text-left mb-8 md:mb-0 w-full md:w-1/3">
            <h3 className="text-3xl font-bold  mb-2">Find Partner</h3>
            <p className="text-lg ">
              Your journey to finding love starts here! Discover meaningful
              connections.
            </p>
          </div>

          {/* Middle Links */}
          <div className="flex flex-col md:flex-row justify-evenly space-y-4 md:space-y-0 md:space-x-8 w-full md:w-1/3">
            <div className="text-center md:text-left">
              <h4 className="font-semibold text-xl mb-2">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link className="hover:text-pink-300">Home</Link>
                </li>
                <li>
                  <Link className="hover:text-pink-300">About Us</Link>
                </li>
                <li>
                  <Link className="hover:text-pink-300">Contact</Link>
                </li>
                <li>
                  <Link className="hover:text-pink-300">Privacy Policy</Link>
                </li>
              </ul>
            </div>

            <div className="text-center md:text-left">
              <h4 className="font-semibold text-xl mb-2">Support</h4>
              <ul className="space-y-2">
                <li>
                  <Link className="hover:text-pink-300">FAQ</Link>
                </li>
                <li>
                  <Link className="hover:text-pink-300">Help Center</Link>
                </li>
                <li>
                  <Link className="hover:text-pink-300">Terms of Service</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Section */}
          <div className="text-center md:text-left w-full md:w-1/3 mb-8 md:mb-0">
            <h4 className="text-xl ml-36 font-semibold mb-4">Follow Us</h4>
            <div className="flex justify-center space-x-6">
              <Link to="#facebook">
                <FaFacebookF size={24} />
              </Link>
              <Link to="#twitter">
                <FaTwitter size={24} />
              </Link>
              <Link to="#instagram">
                <FaInstagram size={24} />
              </Link>
              <Link to="#linkedin">
                <FaLinkedinIn size={24} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center">
          <p className="text-sm mt-4">
            &copy; 2025 LoveFind, All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
