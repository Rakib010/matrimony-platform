/* eslint-disable react/prop-types */
const LeftSide = ({ filter, setFilter }) => {
  const handleFilterChange = (key, value) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
        Filter Your Match
      </h2>

      {/* Age Range Filter */}
      <div className="mb-6">
        <label className="block font-medium text-gray-600 mb-2">
          Age Range
        </label>
        <div className="flex items-center space-x-3">
          <input
            type="number"
            value={filter.minAge}
            onChange={(e) => handleFilterChange("minAge", e.target.value)}
            className="w-20 p-2 border rounded-md focus:ring-2 focus:ring-pink-500 focus:outline-none"
            placeholder="Min"
            min="18"
            max="50"
          />
          <span className="font-semibold text-gray-500">to</span>
          <input
            type="number"
            value={filter.maxAge}
            onChange={(e) => handleFilterChange("maxAge", e.target.value)}
            className="w-20 p-2 border rounded-md focus:ring-2 focus:ring-pink-500 focus:outline-none"
            placeholder="Max"
            min="18"
            max="50"
          />
        </div>
      </div>

      {/* Biodata Type Filter */}
      <div className="mb-6">
        <label className="block font-medium text-gray-600 mb-2">
          Looking For
        </label>
        <select
          onChange={(e) => handleFilterChange("type", e.target.value)}
          value={filter.type}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-pink-500 focus:outline-none"
        >
          <option value="">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      {/* Division Filter */}
      <div className="mb-6">
        <label className="block font-medium text-gray-600 mb-2">Division</label>
        <select
          onChange={(e) => handleFilterChange("division", e.target.value)}
          value={filter.division}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-pink-500 focus:outline-none"
        >
          <option value="">All Divisions</option>
          <option value="Dhaka">Dhaka</option>
          <option value="Chattagra">Chattagra</option>
          <option value="Rangpur">Rangpur</option>
          <option value="Barisal">Barisal</option>
          <option value="Khulna">Khulna</option>
          <option value="Mymensingh">Mymensingh</option>
          <option value="Sylhet">Sylhet</option>
        </select>
      </div>
    </div>
  );
};

export default LeftSide;
