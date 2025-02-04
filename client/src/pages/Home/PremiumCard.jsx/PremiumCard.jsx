import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/spinner/LoadingSpinner";
import { Link } from "react-router-dom";

const PremiumCard = () => {
  const axiosSecure = useAxiosSecure();
  const [sortOrder, setSortOrder] = useState("ascending");

  const {
    data: premiumCard = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["premiumCard", sortOrder],
    queryFn: async () => {
      const res = await axiosSecure.get(`/premium-card?sort=${sortOrder}`);
      return res.data;
    },
  });

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    refetch();
  };

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return <p className="text-red-500">Error loading premium cards.</p>;

  return (
    <div className="p-4 my-20 min-h-screen">
      <h1 className="text-center text-2xl font-bold">Premium Member</h1>
      <div className="flex justify-end mb-6">
        <label htmlFor="sortOrder" className="mr-2 font-semibold text-gray-800">
          Sort by Age:
        </label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={handleSortChange}
          className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(premiumCard) &&
          premiumCard.map((member) => (
            <div
              key={member._id}
              className="border rounded-lg p-6 shadow-lg bg-white hover:shadow-2xl transform transition-transform hover:-translate-y-2"
            >
              <div className="relative">
                <img
                  src={member.profileImage || "/default-profile.png"}
                  alt={member.name}
                  className="w-20 h-20 rounded-full mx-auto border-4 border-blue-400"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-blue-400 rounded-full opacity-0 hover:opacity-20 transition-opacity"></div>
              </div>

              <h3 className="text-center font-bold mt-4 text-gray-800">
                {member.name || "No Name"}
              </h3>
              <div className="mt-4">
                {/* Gender and Division */}
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Gender: {member.biodataType || "N/A"}</span>
                  <span>Age: {member.age || "N/A"}</span>
                </div>
                {/* Age and Occupation */}
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>Division: {member.permanentDivision || "N/A"}</span>
                  <span>Occupation: {member.occupation || "N/A"}</span>
                </div>
              </div>

              <Link to={`/biodataDetails/${member._id}`}>
                <button className="mt-6 w-full bg-gradient-to-r from-purple-400 to-blue-400 text-white py-2 rounded shadow hover:from-blue-400 hover:to-purple-400 transition-colors">
                  View Profile
                </button>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PremiumCard;
