import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/spinner/LoadingSpinner";
import { FaTrash } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";

const FavoritesBioData = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // favorite
  const {
    data: favorites,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["favoritesData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites/${user?.email}`);
      return res.data;
    },
  });

  // Handle delete favorite
  const handleDelete = async (id) => {
    const res = await axiosSecure.delete(`/favorite/${id}`);
    if (res?.data?.deletedCount > 0) {
      refetch();
      toast.success("Your file has been deleted");
    } else {
      toast.error("Failed to delete the item. Try again.");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4">
      <h2 className="text-2xl text-center font-semibold mb-6">
        My Favorites Biodata
      </h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Biodata Id</th>
              <th className="border border-gray-300 px-4 py-2">
                Permanent Address
              </th>
              <th className="border border-gray-300 px-4 py-2">Occupation</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {favorites?.map((favorite) => (
              <tr key={favorite._id}>
                <td className="border border-gray-300 px-4 py-2">
                  {favorite.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {favorite.biodataId}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {favorite.permanentDivision}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {favorite.occupation}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded text-center"
                    onClick={() => handleDelete(favorite._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {favorites?.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  No favorite biodata found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FavoritesBioData;
