import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { toast, ToastContainer } from "react-toastify"; // Import toast from react-toastify
import { FaCcPaypal } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";
import useAxiosSecurity from "../../hooks/useAxiosSecurity";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for react-toastify
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ price, cart }) => {
  const stripe = useStripe();
  const navigate = useNavigate()
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecurity();
  const [cardError, setCardError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (typeof price !== "number" || price < 1) {
      console.log("price is not a number");
      return;
    }
    axiosSecure.post("/create-payment-intent", { price }).then((res) => {
      console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    });
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (!stripe || !elements) {
      setIsLoading(false);
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      setIsLoading(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setIsLoading(false);
      // Display toast notification when there's an error
      toast.error(error.message);
      return;
    } else {
      setCardError("");
      console.log("[PaymentMethod]", paymentMethod);
    }

    if (!clientSecret) {
      setIsLoading(false);
      console.error("Error: Client secret is missing");
      // Handle the error, possibly by displaying a message to the user
      toast.error("Client secret is missing or invalid. Please try again.");
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "unknown",
          },
        },
      });

    setIsLoading(false);
    
    if (confirmError) {
      console.log(confirmError);
      // Check if the error type is "invalid_request_error" and there's payment method information
      if (
        confirmError.type === "invalid_request_error" &&
        confirmError.payment_method &&
        confirmError.payment_method.card &&
        confirmError.payment_method.card.country
      ) {
        // Get the country from the payment method object
        const cardCountry = confirmError.payment_method.card.country;
        // Display toast notification with the country information
        toast.error(
          `Only registered Indian businesses can accept international payments. The card belongs to ${cardCountry}.`
        );
      } else {
        // Display toast notification for other confirmation errors
        toast.error("Payment confirmation error. Please try again.");
      }
      return;
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      console.log(paymentIntent.id);
      // Display toast notification for successful payment
      toast.success(`Your transaction id is ${paymentIntent.id}`);
      const paymentInfo = {
        email: user.email,
        transitionId: paymentIntent.id,
        price,
        quantity: cart.length,
        status: "Order pending",
        itemName: cart.map((item) => item.name),
        cartItems: cart.map((item) => item._id),
        menuItems: cart.map((item) => item.menuItemId),
      };

      axiosSecure.post("/payments", paymentInfo).then((result) => {
        if (result.error) {
          // Handle error
          console.error(result.error.message);
          toast.error("Payment processing error. Please try again later.");
        } else {
          // Payment successful, navigate to orders page and show success alert
          console.log(result.paymentIntent);
          navigate('/orders');
          toast.success("Payment successful");
        }
      });
    }
  };


  return (
    <>
      <ToastContainer position="bottom-center" />
      <div className="flex flex-col sm:flex-row justify-start gap-8">
        <div className="md:w-1/2 w-full space-y-3">
          <h3 className="headtxt">Order Summary</h3>
          <div className="mx-2 mt-5 space-y-2">
            <p>Total Price: {price}</p>
            <p>Number of items: {cart.length}</p>
          </div>
        </div>
        <div className="md:w-1/3 w-full card shrink-0 p-4 bg-base-100 max-w-sm shadow-2xl space-y-2 rounded-lg md:h-[600px]">
          <h2 className="text-xl md:text-3xl text-white md:text-center">
            Process Your Payment
          </h2>
          <div className="flex flex-col justify-center  h-full mt-10">
            <h4 className="subtitle mb-[1px]">Credit / Debit card</h4>
            <form onSubmit={handleSubmit}>
              <div className="card-element-container">
                <CardElement className="card-element" />
              </div>
              <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className=" text-white rounded-md py-3 px-4 w-full hover:bg-maroon mt-4 transition duration-200 ease-in-out shadow-md hover:filter hover:contrast-115 focus:outline-none"
              >
                {isLoading ? "Processing..." : "Pay Now"}
              </button>
            </form>
            {cardError ? (
              <p className="font-oblique font-thin italic">{cardError}</p>
            ) : null}
            <div className="text-center">
              <hr className="my-4 border-t-2 border-gray-500" />
              <button
                type="submit"
                className="btn btn-sm bg-green mt-6 italic font-bold text-white hover:text-indigo-500"
              >
                <FaCcPaypal /> Pay with PayPal
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;
