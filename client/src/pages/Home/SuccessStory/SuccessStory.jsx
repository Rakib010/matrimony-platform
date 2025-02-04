import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaStar, FaRegStar } from "react-icons/fa";

const SuccessStory = () => {
  const axiosSecure = useAxiosSecure();
  const [stories, setStories] = useState([]);
  const [sortOrder, setSortOrder] = useState("ascending");

  // Fetch success stories
  useEffect(() => {
    axiosSecure
      .get("/success-Stories")
      .then((res) => {
        // Validate that res.data is an array
        const data = Array.isArray(res.data) ? res.data : [];
        const sortedStories = data.sort((a, b) => {
          const dateA = new Date(a.marriageDate);
          const dateB = new Date(b.marriageDate);
          return sortOrder === "ascending" ? dateA - dateB : dateB - dateA;
        });
        setStories(sortedStories);
      })
      .catch((error) => {
        console.error("Error fetching success stories:", error);
      });
  }, [axiosSecure, sortOrder]);

  // Handle sorting change
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <section className="bg-gray-100 rounded-lg border py-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Success Stories</h2>

        {/* Sorting Controls */}
        <div className="flex justify-end mb-6">
          <label
            htmlFor="sortOrder"
            className="mr-2 font-semibold text-gray-800"
          >
            Sort by marriage date:
          </label>
          <select
            id="sortOrder"
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        </div>

        {/* Success Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div
              key={story._id}
              className="bg-white shadow-lg rounded-lg p-6 border"
            >
              {/* Couple Image */}
              <img
                src={story.coupleImage || "/default-image.jpg"}
                alt="Couple"
                className="w-full h-40 object-cover rounded-md mb-4"
              />

              {/* Marriage Date */}
              <p className="text-gray-500 text-sm mb-2 font-semibold">
                Marriage Date:
                <span className="font-bold">
                  {" "}
                  {new Date(story.marriageDate).toDateString()}
                </span>
              </p>

              {/* Review Stars */}
              <div className="flex items-center mb-2">
                {/* Render filled stars */}
                {[...Array(5)].map((_, index) => (
                  <span key={index}>
                    {index < story.reviewStars ? (
                      <FaStar className="text-yellow-500" />
                    ) : (
                      <FaRegStar className="text-yellow-500" />
                    )}
                  </span>
                ))}
              </div>

              {/* Success Story Text (Trimmed) */}
              <p className="text-gray-600">
                {story.successStory.length > 150
                  ? `${story.successStory.slice(0, 150)}...`
                  : story.successStory}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStory;
