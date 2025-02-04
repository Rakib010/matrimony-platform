import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import LoadingSpinner from "./../../../components/spinner/LoadingSpinner";
import { toast } from "react-hot-toast";

const ContactRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["contactRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/contact-requests-user/${user?.email}`
      );
      return res.data.data;
    },
  });

  // handle delete
  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/contact-requests/${id}`);
      toast.success("Delete successfully");
      refetch();
    } catch (error) {
      console.error("Failed to delete request", error);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p>Error loading data...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl text-center font-semibold mb-6">My Contact Requests</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Biodata Id</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Mobile No</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((request) => (
              <tr key={request._id} className="border-t">
                <td className="px-4 py-2">{request.name}</td>
                <td className="px-4 py-2">{request.biodataId}</td>
                <td className="px-4 py-2">{request.status}</td>
                <td className="px-4 py-2">
                  {request.status === "approved" ? request.mobile : "N/A"}
                </td>
                <td className="px-4 py-2">
                  {request.status === "approved" ? request.email : "N/A"}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(request._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactRequests;
