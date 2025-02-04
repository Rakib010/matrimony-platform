/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const BiodataCard = ({ biodata }) => {
  const {
    _id,
    biodataType,
    biodataId,
    profileImage,
    presentDivision,
    age,
    occupation,
    name,
  } = biodata || {};
  //console.log(biodata)

  return (
    <div className="w-full max-w-xs mx-auto bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-6 flex flex-col h-full">
      {/* Profile Image Section */}
      <div className="w-full h-48 bg-gray-200 rounded-t-lg overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={profileImage}
          alt={`${biodataType}'s profile`}
        />
      </div>

      {/* Biodata Information */}
      <div className="flex-grow p-4 space-y-3">
        <h2 className="text-lg font-semibold text-gray-800">
          {name} - {biodataType}
        </h2>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Division:</span> {presentDivision}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Age:</span> {age}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Occupation:</span> {occupation}
        </p>
      </div>

      {/* View Profile Button */}
      <div className="p-4 bg-gray-100 rounded-b-lg text-center">
        <Link to={`/biodataDetails/${_id}`}>
          <button className="w-full text-gray-700 bg-transparent border-2 border-gray-500 py-2 rounded-md hover:bg-gray-200 transition duration-300">
            View Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BiodataCard;
