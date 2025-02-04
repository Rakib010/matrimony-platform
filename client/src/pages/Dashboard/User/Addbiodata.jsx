import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const divisions = [
  "Dhaka",
  "Chattagra",
  "Rangpur",
  "Barisal",
  "Khulna",
  "Mymensingh",
  "Sylhet",
];

const heights = Array.from({ length: 40 }, (_, i) => `${140 + i} cm`);
const weights = Array.from({ length: 60 }, (_, i) => `${40 + i} kg`);

const Addbiodata = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Data:", data);

    try {
      await axiosSecure.post("/add-biodata", data);
      reset();
      toast.success("Data Added Successfully!");
    } catch (err) {
      console.log(err);
      toast(err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <Helmet>
        <title>Add Biodata | Dashboard</title>
      </Helmet>

      <h1 className="text-3xl font-bold mb-6 text-center">
        Add or Edit Biodata
      </h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block font-medium">Biodata Type</label>
          <select
            className="w-full border p-2 rounded"
            {...register("biodataType", {
              required: "Please select a biodata type.",
            })}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.biodataType && (
            <p className="text-red-500 text-sm">{errors.biodataType.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            {...register("name", { required: "Name is required." })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Profile Image</label>
          <input
            type="url"
            className="w-full border p-2 rounded"
            {...register("profileImage", {
              required: "Profile image link is required.",
            })}
          />
          {errors.profileImage && (
            <p className="text-red-500 text-sm">
              {errors.profileImage.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium">Age</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            {...register("age", { required: "Date of birth is required." })}
          />
          {errors.age && (
            <p className="text-red-500 text-sm">{errors.age.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Height</label>
          <select
            className="w-full border p-2 rounded"
            {...register("height", { required: "Height is required." })}
          >
            <option value="">Select</option>
            {heights.map((h, i) => (
              <option key={i} value={h}>
                {h}
              </option>
            ))}
          </select>
          {errors.height && (
            <p className="text-red-500 text-sm">{errors.height.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Weight</label>
          <select
            className="w-full border p-2 rounded"
            {...register("weight", { required: "Weight is required." })}
          >
            <option value="">Select</option>
            {weights.map((w, i) => (
              <option key={i} value={w}>
                {w}
              </option>
            ))}
          </select>
          {errors.weight && (
            <p className="text-red-500 text-sm">{errors.weight.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Occupation</label>
          <select
            className="w-full border p-2 rounded"
            {...register("occupation", { required: "Occupation is required." })}
          >
            <option value="">Select</option>
            <option value="Student">Student</option>
            <option value="Employee">Employee</option>
            <option value="Business">Business</option>
            <option value="HouseWife">HouseWife</option>
          </select>
          {errors.occupation && (
            <p className="text-red-500 text-sm">{errors.occupation.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Race</label>
          <select
            className="w-full border p-2 rounded"
            {...register("race", { required: "Race is required." })}
          >
            <option value="">Select</option>
            <option value="Fair">Fair</option>
            <option value="Light">Light</option>
            <option value="Medium">Medium</option>
            <option value="Dark">Dark</option>
          </select>
          {errors.race && (
            <p className="text-red-500 text-sm">{errors.race.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Father's Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            {...register("fatherName", {
              required: "Father's name is required.",
            })}
          />
          {errors.fatherName && (
            <p className="text-red-500 text-sm">{errors.fatherName.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Mother's Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            {...register("motherName", {
              required: "Mother's name is required.",
            })}
          />
          {errors.motherName && (
            <p className="text-red-500 text-sm">{errors.motherName.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Permanent Division</label>
          <select
            className="w-full border p-2 rounded"
            {...register("permanentDivision", {
              required: "Permanent division is required.",
            })}
          >
            <option value="">Select</option>
            {divisions.map((d, i) => (
              <option key={i} value={d}>
                {d}
              </option>
            ))}
          </select>
          {errors.permanentDivision && (
            <p className="text-red-500 text-sm">
              {errors.permanentDivision.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium">Present Division</label>
          <select
            className="w-full border p-2 rounded"
            {...register("presentDivision", {
              required: "Present division is required.",
            })}
          >
            <option value="">Select</option>
            {divisions.map((d, i) => (
              <option key={i} value={d}>
                {d}
              </option>
            ))}
          </select>
          {errors.presentDivision && (
            <p className="text-red-500 text-sm">
              {errors.presentDivision.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium">Expected Partner Age</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            {...register("partnerAge", {
              required: "Expected partner age is required.",
            })}
          />
          {errors.partnerAge && (
            <p className="text-red-500 text-sm">{errors.partnerAge.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Expected Partner Height</label>
          <select
            className="w-full border p-2 rounded"
            {...register("expectedPartnerHeight", {
              required: "Expected partner height is required.",
            })}
          >
            <option value="">Select</option>
            {heights.map((h, i) => (
              <option key={i} value={h}>
                {h}
              </option>
            ))}
          </select>
          {errors.expectedPartnerHeight && (
            <p className="text-red-500 text-sm">
              {errors.expectedPartnerHeight.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium">Expected Partner Weight</label>
          <select
            className="w-full border p-2 rounded"
            {...register("expectedPartnerWeight", {
              required: "Expected partner weight is required.",
            })}
          >
            <option value="">Select</option>
            {weights.map((w, i) => (
              <option key={i} value={w}>
                {w}
              </option>
            ))}
          </select>
          {errors.expectedPartnerWeight && (
            <p className="text-red-500 text-sm">
              {errors.expectedPartnerWeight.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium">Contact Email</label>
          <input
            type="email"
            className="w-full border p-2 rounded bg-gray-100"
            readOnly
            value={user?.email}
            {...register("email")}
          />
        </div>

        <div>
          <label className="block font-medium">Mobile Number</label>
          <input
            type="tel"
            className="w-full border p-2 rounded"
            {...register("mobile", { required: "Mobile number is required." })}
          />
          {errors.mobile && (
            <p className="text-red-500 text-sm">{errors.mobile.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-pink-500 text-white font-medium py-2 rounded hover:bg-pink-600"
        >
          Save and Publish Now
        </button>
      </form>
    </div>
  );
};

export default Addbiodata;
