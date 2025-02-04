import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useAuth from "../../Hooks/useAuth";
import CheckoutForm from "../payment/ChecoutForm";
import { useParams } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Checkout = () => {
  const { biodataId } = useParams();
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center mt-10">
      <div className="bg-white shadow-lg rounded-lg border p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Request Contact Information
        </h2>
        <div className="space-y-4">
          {/* Biodata ID Field */}
          <div>
            <label
              htmlFor="biodataId"
              className="block text-gray-700 font-medium"
            >
              Biodata ID
            </label>
            <input
              type="text"
              id="biodataId"
              value={biodataId} 
              readOnly
              className="mt-1 w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-600"
            />
          </div>

          {/* User Email Field */}
          <div>
            <label
              htmlFor="userEmail"
              className="block text-gray-700 font-medium"
            >
              Your Email
            </label>
            <input
              type="email"
              id="userEmail"
              value={user?.email || ""}
              readOnly
              className="mt-1 w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-600"
            />
          </div>

          {/* Stripe Card Number Field */}
          <div>
            {/* Wrap CheckoutForm with Elements */}
            <Elements stripe={stripePromise}>
              <CheckoutForm biodataId={biodataId}   />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
