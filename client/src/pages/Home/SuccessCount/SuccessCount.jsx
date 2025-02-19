import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaUsers, FaMale, FaFemale, FaHeart } from "react-icons/fa"; // Import icons

const SuccessCount = () => {
  const axiosSecure = useAxiosSecure();
  const [counterData, setCounterData] = useState({
    totalBiodata: 0,
    maleBiodata: 0,
    femaleBiodata: 0,
    marriageComplete: 0,
  });

  //counter data
  useEffect(() => {
    axiosSecure.get("/success-counter").then((res) => {
      setCounterData(res.data);
    });
  }, [axiosSecure]);

  return (
    <section className="bg-white mt-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">
          Connecting Lives and Counting Success
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Total Biodata Card */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex justify-center items-center text-5xl text-indigo-600 mb-4">
              <FaUsers />
            </div>
            <h3 className="text-xl font-semibold text-gray-700">
              Total Biodata
            </h3>
            <p className="text-3xl font-bold text-gray-800">
              {counterData.totalBiodata}
            </p>
          </div>

          {/* Male Biodata Card */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex justify-center items-center text-5xl text-blue-600 mb-4">
              <FaMale />
            </div>
            <h3 className="text-xl font-semibold text-gray-700">
              Male Biodata
            </h3>
            <p className="text-3xl font-bold text-gray-800">
              {counterData.maleBiodata}
            </p>
          </div>

          {/* Female Biodata Card */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex justify-center items-center text-5xl text-pink-600 mb-4">
              <FaFemale />
            </div>
            <h3 className="text-xl font-semibold text-gray-700">
              Female Biodata
            </h3>
            <p className="text-3xl font-bold text-gray-800">
              {counterData.femaleBiodata}
            </p>
          </div>

          {/* Completed Marriages Card */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex justify-center items-center text-5xl text-green-600 mb-4">
              <FaHeart />
            </div>
            <h3 className="text-xl font-semibold text-gray-700">
              Completed Marriages
            </h3>
            <p className="text-3xl font-bold text-gray-800">
              {counterData.marriageComplete}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessCount;
