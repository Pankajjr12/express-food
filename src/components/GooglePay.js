// GooglePay.js

import React from "react";
import GooglePayButton from "@google-pay/button-react";
import "../App.css"; // Import the CSS file

const GooglePay = () => {
  const paymentRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: "CARD",
        parameters: {
          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
          allowedCardNetworks: ["VISA", "MASTERCARD"],
        },
        tokenizationSpecification: {
          type: "PAYMENT_GATEWAY",
          parameters: {
            gateway: "your_gateway",
            gatewayMerchantId: "your_merchant_id",
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: "your_merchant_id",
      merchantName: "Your Merchant Name",
    },
    transactionInfo: {
      totalPriceStatus: "FINAL",
      totalPrice: "10.00",
      currencyCode: "USD",
    },
  };

  const onLoadPaymentData = (paymentData) => {
    console.log("Payment success", paymentData);
    // Process payment
  };

  return (
    <GooglePayButton
      environment="TEST" // Change to 'PRODUCTION' for production environment
      paymentRequest={paymentRequest}
      onLoadPaymentData={onLoadPaymentData}
      className="google-pay-button w-1" // Apply the custom class
    />
  );
};

export default GooglePay;
