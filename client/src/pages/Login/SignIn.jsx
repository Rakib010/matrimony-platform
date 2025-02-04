import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";

const SignIn = () => {
  const { userSignIn, handleGoogleLogin } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /* form submit */
  const onSubmit = (data) => {
    userSignIn(data.email, data.password)
      .then((res) => {
        // console.log(res.user);
        toast.success("User Login");
        navigate("/");
      })
      .catch((err) => {
        // console.log(err.message);
      });
  };

  const handleGoogle = () => {
    handleGoogleLogin()
      .then((res) => {
        const userInfo = {
          email: res.user?.email,
          name: res.user?.displayName,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          navigate("/");
        });
      })
      .catch((err) => {
        //console.log(err.message);
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4 bg-gradient-to-r from-pink-100 via-pink-50 to-white">
      <div className="bg-white shadow-2xl rounded-lg max-w-md w-full p-8 border border-pink-200">
        {/* Header */}
        <h2 className="text-3xl font-semibold text-center text-pink-600 mb-6">
          Welcome Back!
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Please log in to continue your search for a perfect match.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: true })}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            {errors.password?.type === "required" && (
              <span className="text-red-600 text-sm mt-1 block">
                Password is required
              </span>
            )}
          </div>

          {/* Sign-In Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Sign In
          </button>
        </form>

        {/* Google Login Button */}
        <div className="flex items-center justify-center mt-4">
          <button
            onClick={handleGoogle}
            className="btn btn-outline flex items-center gap-2"
          >
            <FcGoogle size={20} /> Login with Google
          </button>
        </div>

        {/* Sign-Up Link */}
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-pink-500 hover:underline font-semibold"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
