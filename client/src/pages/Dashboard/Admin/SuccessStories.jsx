import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/spinner/LoadingSpinner";
import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Modal } from "../../../components/Modal/Modal";

const SuccessStories = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedStory, setSelectedStory] = useState(null);

  // success stories
  const { data: successStories = [], isLoading } = useQuery({
    queryKey: ["successStories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/success-Stories");
      return res.data ;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        Success Stories
      </h1>

      {/* Success Stories Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b">
                Male Biodata ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b">
                Female Biodata ID
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600 border-b">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {successStories.map((story) => (
              <tr key={story._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b text-gray-700">
                  {story.selfBiodataId}
                </td>
                <td className="px-6 py-4 border-b text-gray-700">
                  {story.partnerBiodataId}
                </td>
                <td className="px-6 py-4 border-b text-center">
                  <button
                    className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition"
                    onClick={() => setSelectedStory(story)}
                  >
                    View Story
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Viewing Success Story */}
      {selectedStory && (
        <Modal title="Success Story" onClose={() => setSelectedStory(null)}>
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Male Biodata ID: {selectedStory.selfBiodataId}
            </h2>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Female Biodata ID: {selectedStory.partnerBiodataId}
            </h2>
            <p className="text-gray-700">{selectedStory.successStory}</p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SuccessStories;
