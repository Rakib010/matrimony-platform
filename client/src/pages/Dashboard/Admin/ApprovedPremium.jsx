import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/spinner/LoadingSpinner";
import toast from "react-hot-toast";

const ApprovedPremium = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch premium requests
  const {
    data: premiumRequests = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["premiumRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/request-premium");
      return res.data;
    },
  });

  // Approve premium request
  const handleApprovePremium = async (id) => {
    try {
      await axiosSecure.patch(`/approve-premium/${id}`);
      toast.success("Turned into Premium Member");
      refetch();
    } catch (error) {
      toast.error("Failed to approve request.");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4">
      <h2 className="text-2xl text-center font-semibold mb-4">
        Premium Approval Requests
      </h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Biodata Id</th>
              <th className="border border-gray-300 px-4 py-2">Make Premium</th>
            </tr>
          </thead>
          <tbody>
            {premiumRequests.map((request) => (
              <tr key={request._id}>
                <td className="border border-gray-300 px-4 py-2">
                  {request.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {request.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {request.biodataId}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-gray-200 text-black px-3 py-1 rounded"
                    onClick={() => handleApprovePremium(request._id)}
                    disabled={request.premiumRequested === "approved"}
                  >
                    {request.premiumRequested === "approved"
                      ? "Approved"
                      : "Approve"}
                  </button>
                </td>
              </tr>
            ))}
            {premiumRequests.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-4">
                  No premium requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovedPremium;
