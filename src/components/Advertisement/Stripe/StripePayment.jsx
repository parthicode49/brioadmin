import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import "./stripe_payment.css";
import { CircularProgress } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

export default function StripePayment() {
  const [clientSecret, setClientSecret] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const createCustomerAndPaymentIntent = async () => {
      try {
        const customerRes = await fetch("https://api.stripe.com/v1/customers", {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_STRIPE_SECRET_KEY}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            name: "Advertiser",
            email: location?.state?.email || "",
            "address[country]": "US",
          }),
        });

        const customerData = await customerRes.json();
        if (customerData.error) {
          console.error("Error creating customer:", customerData.error);
          return;
        }

        const paymentRes = await fetch(
          "https://api.stripe.com/v1/payment_intents",
          {
            method: "POST",
            headers: {
              'Authorization': `Bearer ${process.env.REACT_APP_STRIPE_SECRET_KEY}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              amount: Number(location?.state?.price) * 100,
              currency: location?.state?.currency_code?.toLowerCase() || "usd",
              description: `Payment for ${location?.state?.required_view} ad views`,
              customer: customerData.id,
              "automatic_payment_methods[enabled]": "true",
              "metadata[email]": location?.state?.email,
              "metadata[ad_name]": location?.state?.ad_name,
              "metadata[required_view]": location?.state?.required_view,
              "metadata[price]": location?.state?.price,
              "metadata[ad_id]": location?.state?.ad_id,
            }),
          }
        );

        const paymentData = await paymentRes.json();
        if (paymentData.error) {
          console.error("Error creating payment intent:", paymentData.error);
        } else {
          setClientSecret(paymentData.client_secret);
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };

    createCustomerAndPaymentIntent();
  }, [location?.state]);

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe",
      labels: "floating",
      variables: {
        colorPrimary: "#ff6b00",
        colorBackground: "#ffffff",
        colorText: "#333333",
        borderRadius: "6px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        fontSizeBase: "15px",
      },
    },
  };

  return (
    <div className="payment-page-wrapper">
      <div className="payment-container-main">
        <div className="payment-header">
          <h1>Complete Your Payment</h1>
        </div>

        <div className="payment-content-wrapper">
          {/* Order Summary */}
          <div className="order-summary-section">
            <h2>Order Summary</h2>

            <div className="ad-info-box">
              <div className="ad-info-row">
                <span className="info-label">Product Name</span>
                <span className="info-value">
                  {location?.state?.ad_name || "N/A"}
                </span>
              </div>
              <div className="ad-info-row">
                <span className="info-label">Required Views</span>
                <span className="info-value">
                  {location?.state?.required_view?.toLocaleString() || "0"}
                </span>
              </div>
              <div className="ad-info-row">
                <span className="info-label">Remaining Views</span>
                <span className="info-value">
                  {location?.state?.required_view?.toLocaleString() || "0"}
                </span>
              </div>
            </div>

            <div className="price-display-box">
              <p className="price-label-text">Payable Amount</p>
              <p className="price-amount-display">
                ${location?.state?.price || "0"}
              </p>
              <p className="price-subtext">One-time payment</p>
            </div>

            <div className="divider-line"></div>

            <div className="user-info-row">
              <span className="user-info-label">Email</span>
              <span className="user-info-value">{location?.state?.email}</span>
            </div>

            {location?.state?.user_code && (
              <>
                <div className="divider-line"></div>
                <div className="user-info-row">
                  <span className="user-info-label">User Code</span>
                  <span className="user-info-value">
                    {location?.state?.user_code}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Payment Form */}
          <div className="payment-form-section">
            <h3>Payment Method</h3>

            <div className="secure-payment-badge">
              <svg viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
              </svg>
              <p>
                Secure payment powered by Stripe. Your card information is
                encrypted and never stored on our servers.
              </p>
            </div>

            {clientSecret ? (
              <Elements stripe={stripePromise} options={options}>
                <CheckoutForm adDetails={location?.state} />
              </Elements>
            ) : (
              <div className="loading-spinner-container">
                <CircularProgress sx={{ color: "#ff6b00" }} />
              </div>
            )}

            <div className="security-footer">
              <div className="security-item">
                <svg viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                </svg>
                <span>256-bit SSL Secured</span>
              </div>
              <div className="security-item">
                <svg viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                </svg>
                <span>PCI DSS Compliant</span>
              </div>
              <div className="security-item">
                <svg viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                </svg>
                <span>Powered by Stripe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckoutForm({ adDetails }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setErrorMessage("");

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success?ad_name=${adDetails?.ad_name}&views=${adDetails?.required_view}&id=${adDetails?.ad_id}&amount=${adDetails?.price}`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="stripe-element-container">
        <PaymentElement />
      </div>

      {errorMessage && (
        <div className="error-message-box">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" />
            <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" />
          </svg>
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="pay-button-submit"
      >
        {loading ? (
          <>
            <CircularProgress size={20} sx={{ color: "white" }} />
            Processing Payment...
          </>
        ) : (
          <>
            Pay Now & Activate Ad
            <svg className="button-icon" viewBox="0 0 576 512">
              <path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
