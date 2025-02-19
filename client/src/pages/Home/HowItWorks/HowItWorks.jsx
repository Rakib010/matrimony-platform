import { FaUsers, FaSearch, FaRegHandshake } from "react-icons/fa";
import photo from "../../../assets/HowItWorks.avif";
import { motion } from "framer-motion";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-50 via-white to-pink-50 p-8 mt-20 rounded-lg">
      <h1 className="text-3xl font-bold text-center text-pink-600 mb-4">
        How It Works
      </h1>
      <p className="text-center text-gray-600 mb-12">
        A quick guide on how to get started
      </p>
      <div className="relative flex flex-col md:flex-row justify-center items-center">
        {/* Left Side */}
        <div className="space-y-8 mb-8 md:mb-0 w-full md:w-1/3">
          <motion.div
            className="bg-white shadow-lg rounded-lg p-6 text-center flex flex-col items-center transform hover:scale-105 transition duration-300"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <FaUsers className="text-pink-500 text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-pink-600">
              Create Your Profile
            </h3>
            <p className="text-gray-500">
              Sign up and complete your profile to showcase your preferences and
              interests.
            </p>
          </motion.div>

          <motion.div
            className="bg-white shadow-lg rounded-lg p-6 text-center flex flex-col items-center transform hover:scale-105 transition duration-300"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <FaSearch className="text-pink-500 text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-pink-600">
              Browse Matches
            </h3>
            <p className="text-gray-500">
              Explore profiles and find potential matches based on shared
              interests.
            </p>
          </motion.div>
        </div>

        {/* Center Image */}
        <motion.div
          className="mx-8 mb-8 md:mb-0 w-full md:w-1/3"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={photo}
            alt="How it works illustration"
            className="rounded-xl shadow-xl max-w-full transform hover:scale-105 transition duration-300"
          />
        </motion.div>

        {/* Right Side */}
        <div className="space-y-8 w-full md:w-1/3">
          <motion.div
            className="bg-white shadow-lg rounded-lg p-6 text-center flex flex-col items-center transform hover:scale-105 transition duration-300"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <FaRegHandshake className="text-pink-500 text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-pink-600">
              Start Chatting
            </h3>
            <p className="text-gray-500">
              Once you find someone you're interested in, reach out and start
              chatting!
            </p>
          </motion.div>

          <motion.div
            className="bg-white shadow-lg rounded-lg p-6 text-center flex flex-col items-center transform hover:scale-105 transition duration-300"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <FaRegHandshake className="text-pink-500 text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-pink-600">
              Getting Married
            </h3>
            <p className="text-gray-500">
              Make it official and celebrate your journey of finding the perfect
              match!
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
