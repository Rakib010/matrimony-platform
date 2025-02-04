import { Link, useLoaderData, useParams } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import SimilarBiodata from "./SimilarBiodata";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const BiodataDetails = () => {
  const { biodata } = useLoaderData();
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isPremium, setIsPremium] = useState();

 const { data: biodatasData } = useQuery({
  queryKey: ["biodataData", id],
  queryFn: async () => {
    const res = await axiosSecure.get(`/contact-biodatasData/${id}`);
    setIsPremium(res.data.premiumRequested === "approved");
    return res.data;
  },
});


  // Handle adding biodata to favorites
  const handleAddToFavorites = async () => {
    const info = {
      biodataId: biodata.biodataId,
      email: user?.email,
    };

    try {
      const res = await axiosSecure.post("/biodata-favorites", info);
      if (res.data.insertedId) {
        toast.success("Biodata added to favorites!");
        setIsFavorite(true);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        {/* Biodata Details Section */}
        <div className="bg-white rounded-lg overflow-hidden border mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Section */}
            <div className="flex items-center justify-center bg-gray-100 p-8">
              <img
                src={biodata.profileImage}
                alt={`${biodata.name || "User"}'s profile`}
                className="w-80 h-80 rounded-lg object-cover border-4 border-gray-300 shadow-md"
              />
            </div>

            {/* Details Section */}
            <div className="p-8 space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {biodata.name || "User"}
              </h2>

              {/* Personal Details */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-blue-600">
                  Personal Details
                </h3>
                <p>
                  <strong>Date of Birth:</strong> {biodata.dateOfBirth || "N/A"}
                </p>
                <p>
                  <strong>Age:</strong> {biodata.age || "N/A"}
                </p>
                <p>
                  <strong>Height:</strong> {biodata.height || "N/A"}
                </p>
                <p>
                  <strong>Weight:</strong> {biodata.weight || "N/A"}
                </p>
                <p>
                  <strong>Occupation:</strong> {biodata.occupation || "N/A"}
                </p>
                <p>
                  <strong>Race:</strong> {biodata.race || "N/A"}
                </p>
              </div>

              {/* Family Details */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-blue-600">
                  Family Details
                </h3>
                <p>
                  <strong>Father's Name:</strong> {biodata.fatherName || "N/A"}
                </p>
                <p>
                  <strong>Mother's Name:</strong> {biodata.motherName || "N/A"}
                </p>
              </div>

              {/* Location Details */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-blue-600">
                  Location
                </h3>
                <p>
                  <strong>Permanent Division:</strong>{" "}
                  {biodata.permanentDivision || "N/A"}
                </p>
                <p>
                  <strong>Present Division:</strong>{" "}
                  {biodata.presentDivision || "N/A"}
                </p>
              </div>

              {/* Partner Preferences */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-blue-600">
                  Partner Preferences
                </h3>
                <p>
                  <strong>Expected Age:</strong> {biodata.partnerAge || "N/A"}
                </p>
                <p>
                  <strong>Expected Height:</strong>{" "}
                  {biodata.expectedPartnerHeight || "N/A"}
                </p>
                <p>
                  <strong>Expected Weight:</strong>{" "}
                  {biodata.expectedPartnerWeight || "N/A"}
                </p>
              </div>

              {/* Contact Information */}
              {isPremium || user?.email === biodata.email ? (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-blue-600 mb-3">
                    Contact Information
                  </h3>
                  <p>
                    <strong>Mobile:</strong> {biodata.mobile || "N/A"}
                  </p>
                  <p>
                    <strong>Email:</strong> {biodata.email || "N/A"}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-blue-600 mb-3">
                    Contact Information
                  </h3>
                  <Link to={`/checkout/${biodata.biodataId}`}>
                    <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-lg shadow-md">
                      Request Contact Information
                    </button>
                  </Link>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between items-center mt-8">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg shadow-md"
                  onClick={() => window.history.back()}
                >
                  Go Back
                </button>
                <button
                  className={`${
                    isFavorite
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600"
                  } text-white font-medium py-2 px-6 rounded-lg shadow-md`}
                  onClick={handleAddToFavorites}
                  disabled={isFavorite}
                >
                  {isFavorite ? "Added to Favorites" : "Add to Favorites"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Biodata Section */}
        <div className="">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 mt-20">
            Similar Biodata
          </h2>
          <SimilarBiodata biodataType={biodata.biodataType} />
        </div>
      </div>
    </div>
  );
};

export default BiodataDetails;
