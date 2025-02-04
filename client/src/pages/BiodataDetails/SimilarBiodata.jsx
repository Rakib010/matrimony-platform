/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const SimilarBiodata = ({ biodataType }) => {
  const axiosPublic = useAxiosPublic();

  const {
    data: similarData = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["similarBiodata", biodataType],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/biodata-similar?gender=${biodataType}`
      );
      return res.data;
    },
  });
 // console.log(biodataType);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {similarData.map((item, index) => (
        <div
          key={index}
          className="bg-slate-50 shadow-lg rounded-lg p-6 border w-64 transition-transform transform hover:scale-105"
        >
          <img
            src={item.profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold text-center text-gray-800 mb-2">
            {item.name || "Unnamed User"}
          </h3>
          <p className="text-sm text-center text-gray-600 mb-1">
            {item.biodataType}
          </p>
          <p className="text-sm text-center text-gray-600">Age: {item.age}</p>
        </div>
      ))}
    </div>
  );
};

export default SimilarBiodata;
