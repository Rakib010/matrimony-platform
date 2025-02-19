import { useState, useEffect } from "react";
import Modal from "react-modal";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import LoadingSpinner from "../../../components/spinner/LoadingSpinner";
import { toast } from "react-hot-toast";

const ViewBiodata = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    data: biodata = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/boidata/${user?.email}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (user?.email) {
      refetch();
    }
  }, [user, refetch]);

  // handle premium button
  const handlePremiumRequest = async () => {
    setLoading(true);
    try {
      await axiosSecure.post(`/request-premium`, { email: user?.email });
      toast.success("making premium request");
    } catch (error) {
      toast.error("Error making premium request:", error);
    } finally {
      setLoading(false);
      setModalOpen(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto p-6 bg-white border rounded-lg space-y-6">
        {/* Profile Image */}
        <div className="flex justify-center">
          <img
            className="w-40 h-40 object-cover rounded-full shadow-lg"
            src={biodata.profileImage || "default-image-url"}
            alt={biodata.name || "Profile"}
          />
        </div>

        {/* Name and Title */}
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            {biodata.name || "Name Unavailable"}
          </h2>
          <p className="text-gray-500">
            {biodata.biodataType || "Type Unavailable"}
          </p>
        </div>

        {/* Biodata Details */}
        <div className="bg-gray-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Personal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <strong>Date of Birth:</strong> {biodata.dateOfBirth || "N/A"}
            </div>
            <div>
              <strong>Age:</strong> {biodata.age || "N/A"}
            </div>
            <div>
              <strong>Height:</strong> {biodata.height || "N/A"}
            </div>
            <div>
              <strong>Weight:</strong> {biodata.weight || "N/A"}
            </div>
            <div>
              <strong>Occupation:</strong> {biodata.occupation || "N/A"}
            </div>
            <div>
              <strong>Race:</strong> {biodata.race || "N/A"}
            </div>
          </div>
        </div>

        {/* Family Details */}
        <div className="bg-gray-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Family Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <strong>Father's Name:</strong> {biodata.fatherName || "N/A"}
            </div>
            <div>
              <strong>Mother's Name:</strong> {biodata.motherName || "N/A"}
            </div>
          </div>
        </div>

        {/* Location Details */}
        <div className="bg-gray-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Location</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <strong>Permanent Division:</strong>{" "}
              {biodata.permanentDivision || "N/A"}
            </div>
            <div>
              <strong>Present Division:</strong>{" "}
              {biodata.presentDivision || "N/A"}
            </div>
          </div>
        </div>

        {/* Partner Preferences */}
        <div className="bg-gray-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Partner Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <strong>Expected Age:</strong> {biodata.partnerAge || "N/A"}
            </div>
            <div>
              <strong>Expected Height:</strong>{" "}
              {biodata.expectedPartnerHeight || "N/A"}
            </div>
            <div>
              <strong>Expected Weight:</strong>{" "}
              {biodata.expectedPartnerWeight || "N/A"}
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="bg-gray-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Contact Details</h3>
          <div>
            <strong>Email:</strong> {biodata.email || "N/A"}
          </div>
          <div>
            <strong>Mobile Number:</strong> {biodata.mobile || "N/A"}
          </div>
        </div>

        {/* Make Premium Button */}
        <div className="text-center mt-6">
          {biodata.premiumRequested === "approved" ? (
            <button className="bg-green-500 text-white py-2 px-6 rounded shadow-lg hover:bg-green-600">
              Premium
            </button>
          ) : (
            <button
              className="bg-pink-500 text-white py-2 px-6 rounded shadow-lg hover:bg-pink-600"
              onClick={() => setModalOpen(true)}
            >
              Make Biodata Premium
            </button>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Make Biodata Premium"
        className="bg-white p-6 rounded-lg max-w-sm mx-auto border shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Are you sure you want to make your biodata premium?
        </h2>
        <div className="flex justify-around mt-6">
          <button
            className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
            onClick={handlePremiumRequest}
            disabled={loading}
          >
            {loading ? "Sending..." : "Yes"}
          </button>
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            onClick={() => setModalOpen(false)}
          >
            No
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ViewBiodata;
