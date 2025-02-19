import useAxiosSecure from "./../../../Hooks/useAxiosSecure";
import { toast } from "react-hot-toast";

const GotMarried = () => {
  const axiosSecure = useAxiosSecure();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const selfBiodataId = form.selfBiodataId.value;
    const partnerBiodataId = form.partnerBiodataId.value;
    const coupleImage = form.coupleImage.value;
    const marriageDate = form.marriageDate.value;
    const successStory = form.successStory.value;

    const formData = {
      selfBiodataId,
      partnerBiodataId,
      coupleImage,
      marriageDate,
      successStory,
    };

    // console.log("Form Data Submitted: ", formData);

    axiosSecure
      .post("/success-story", formData)
      .then((res) => {
        // console.log(res.data);
        toast.success("Success story posted successfully!");
        form.reset();
      })
      .catch((error) => {
        toast.error("Failed to post success story. Please try again.");
      });
  };

  return (
    <div className="p-6 bg-white shadow-md border rounded-lg">
      <h1 className="text-2xl font-semibold mb-4 text-center">Success Story</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="selfBiodataId" className="block text-gray-700">
            Self Biodata ID
          </label>
          <input
            type="text"
            id="selfBiodataId"
            name="selfBiodataId"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="partnerBiodataId" className="block text-gray-700">
            Partner Biodata ID
          </label>
          <input
            type="text"
            id="partnerBiodataId"
            name="partnerBiodataId"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="coupleImage" className="block text-gray-700">
            Couple Image (URL)
          </label>
          <input
            type="text"
            id="coupleImage"
            name="coupleImage"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter image URL"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="marriageDate" className="block text-gray-700">
            Marriage Date
          </label>
          <input
            type="date"
            id="marriageDate"
            name="marriageDate"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="successStory" className="block text-gray-700">
            Success Story Review
          </label>
          <textarea
            id="successStory"
            name="successStory"
            rows="5"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Share your feelings about the website..."
            required
          ></textarea>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-pink-500 text-white px-5 py-3 rounded hover:bg-pink-600 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default GotMarried;
