/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { toast } from 'react-hot-toast';

const CheckoutForm = ({biodataId}) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price: 5 }).then((res) => {
      // console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (card === null) return;

    const { error: paymentMethodError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (paymentMethodError) {
      console.log("Payment method error", paymentMethodError);
      setError(paymentMethodError.message);
      return;
    }

  //  console.log("Payment method", paymentMethod);
    setError("");

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
     // console.log("Confirm error", confirmError);
      setError(confirmError.message);
    } else {
    // console.log("Payment intent", paymentIntent);
      setTransactionId(paymentIntent.id);
    }

    // Save payment data to backend
    const paymentData = {
      email: user.email,
      biodataId,
      transactionId: paymentIntent.id,
      price: 5,
      date: new Date(),
      contactRequest: "pending",
    };

    await axiosSecure.post("/payments", paymentData);
    toast.success("Payment successful! Request submitted.");
    card.clear();
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border border-gray-300 rounded-lg p-4">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": { color: "#aab7c4" },
                },
                invalid: { color: "#9e2146" },
              },
            }}
          />
        </div>
        <button
          type="submit"
          disabled={!stripe || !clientSecret}
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-all disabled:opacity-50"
        >
          Pay $5
        </button>
        {error && <p className="text-red-600 text-center">{error}</p>}
        {transactionId && (
          <p className="text-green-600 text-center">
            Payment Successful! Transaction ID: {transactionId}
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
