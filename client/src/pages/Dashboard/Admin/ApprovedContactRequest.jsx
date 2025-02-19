import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/spinner/LoadingSpinner";

const ApprovedContactRequest = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all contact requests
  const {
    data: contactRequests = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["contactRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contact-requests");
      return res.data;
    },
  });

  // Handle approve contact request
  const handleApprove = async (id) => {
    await axiosSecure.patch(`/approve-contact-request/${id}`);
    toast.success("Contact request approved successfully!");
    refetch();
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
        Approved Contact Requests
      </h2>
      {contactRequests.length === 0 ? (
        <p className="text-gray-600 text-lg text-center">
          No contact requests available.
        </p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full table-auto border-collapse border rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left font-semibold text-sm uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left font-semibold text-sm uppercase">
                  Biodata ID
                </th>
                <th className="px-6 py-3 text-center font-semibold text-sm uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {contactRequests.map((request, index) => (
                <tr
                  key={request._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-50 transition-colors`}
                >
                  <td className="px-6 py-4 text-gray-800">{request.email}</td>
                  <td className="px-6 py-4 text-gray-800">
                    {request.biodataId}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleApprove(request._id)}
                      className={`px-4 py-2 rounded-md font-medium transition-all ${
                        request.contactRequest === "approved"
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-green-500 text-white hover:bg-green-600"
                      }`}
                      disabled={request.contactRequest === "approved"}
                    >
                      {request.contactRequest === "approved"
                        ? "Approved"
                        : "Approve"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ApprovedContactRequest;
