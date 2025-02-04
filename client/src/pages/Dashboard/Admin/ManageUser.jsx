/* eslint-disable react/prop-types */
import { FaUserShield, FaCrown } from "react-icons/fa";
import { toast } from "react-hot-toast";
import useAxiosSecure from "./../../../Hooks/useAxiosSecure";
import LoadingSpinner from "./../../../components/spinner/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  /*  const [users, setUser] = useState(""); */

  // Fetch users with React Query
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${search}`);
      return res.data;
    },
  });
  /*  useEffect(() => {
    fetchUser();
  }, [search]);

  const fetchUser = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/users?search=${search}`
    );
    setUser(data);
  }; */

  /*  if (loading) return <LoadingSpinner />; */

  // Handle make admin
  const handleMakeAdmin = async (user) => {
    try {
      await axiosSecure.patch(`/users/make-admin/${user._id}`);
      refetch();
      toast.success(`${user.name} is now an admin!`);
    } catch (error) {
      toast.error("Failed to promote user.");
    }
  };

  // Handle approve premium
  const handleApprovePremium = async (user) => {
    try {
      await axiosSecure.patch(`/users/make-premium/${user._id}`);
      refetch();
      toast.success(`${user.name} is now a premium member!`);
    } catch (error) {
      toast.error("Failed to approve premium request.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 rounded-lg">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Manage Users
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search by username"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <button
          onClick={refetch}
          className="ml-2 px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-all"
        >
          Search
        </button>
      </div>

      {/* Display Loading Spinner */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2">Username</th>
                <th className="py-2">Email</th>
                <th className="py-2">Make Admin</th>
                <th className="py-2">Premium Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user?._id} className="border-b">
                  <td className="py-3 px-4 text-left align-middle">
                    {user?.name || "No Name"}
                  </td>
                  <td className="py-3 px-4 text-left align-middle">
                    {user?.email}
                  </td>
                  <td className="py-3 px-4 text-center align-middle">
                    {user.role === "admin" ? (
                      <span className="text-green-500 flex items-center justify-center gap-1">
                        <FaUserShield /> Admin
                      </span>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all flex items-center gap-1"
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center align-middle">
                    {user.premium === true ? (
                      <span className="text-yellow-500 flex items-center justify-center gap-1">
                        <FaCrown /> Premium
                      </span>
                    ) : (
                      <button
                        onClick={() => handleApprovePremium(user)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-all flex items-center gap-1"
                      >
                        Approve Premium
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500 py-4">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUser;
