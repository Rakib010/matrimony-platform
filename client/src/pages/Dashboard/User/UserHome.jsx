import useAuth from "../../../Hooks/useAuth";

const UserHome = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg border">
      <div className="flex flex-col items-center">
        {/* User Image */}
        <img
          className="w-24 h-24 rounded-full border-4 border-purple-500 shadow-md"
          src={user?.photoURL || "https://via.placeholder.com/100"}
          alt="User Profile"
        />

        {/* User Name */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          {user?.displayName || "User Name"}
        </h2>

        {/* User Details */}
        <div className="mt-4 space-y-2 text-gray-600">
          <p>
            <strong>Email:</strong> {user?.email || "Not Provided"}
          </p>
          <p>
            <strong>Phone:</strong> {user?.phoneNumber || "Not Provided"}
          </p>
          <p>
            <strong>Address:</strong> {user?.address || "Not Provided"}
          </p>
        </div>

        {/* Additional Info */}
        <button className="mt-5 px-4 py-2 bg-pink-500 text-white rounded-lg shadow-md transition">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default UserHome;
