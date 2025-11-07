// PaymentSuccess.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import "./payment-success.css";
import * as Action from "../../../actions/Advertiser/payment";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { MESSAGE } from "../../../constants/actionTypes";
import * as BiaAction from "../../../actions/Advertiser/advertisement";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [metadata, setMetadata] = useState(null);
  const [countdown, setCountdown] = useState(5);
  const { get_payment_metadata } = bindActionCreators(
    Action,
    dispatch
  );
  const { advertisement_payment_create } = bindActionCreators(
    BiaAction,
    dispatch
  );

  const adName = searchParams.get("ad_name");
  const views = searchParams.get("views");
  const amount = searchParams.get("amount");
  const ad_id = searchParams.get("id");
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/advertisement"); // Redirect to advertisement tab
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      const stripe = await stripePromise;
      const searchParams = new URLSearchParams(location.search);
      const clientSecret = searchParams.get("payment_intent_client_secret");

      if (!clientSecret) return;

      const { paymentIntent } = await stripe.retrievePaymentIntent(
        clientSecret
      );
      console.log(paymentIntent, clientSecret,"paymentIntent1113");
      if (paymentIntent) {
        const resData = await get_payment_metadata({
          payment_intent: paymentIntent.id,
        });
        if (resData?.status == 200) {
          setMetadata(resData?.data?.metadata);
          createTransaction(paymentIntent, resData?.data?.metadata);
        } else {
          //   dispatch({
          //     type: MESSAGE,
          //     payload: {
          //       message: resData?.response?.data?.message || resData?.message,
          //       error: true,
          //     },
          //   });
        }
      }
      //   setPaymentInfo(paymentIntent);
    };

    fetchPaymentIntent();
  }, []);

  const createTransaction = async (paymentIntentFn, metadatafn) => {
    let userObj = {
      id: metadatafn?.ad_id,
      payable_amount: metadatafn?.price,
      flag: metadatafn?.flag,
      views_required: metadatafn?.required_view,
      payment_id: paymentIntentFn?.id,
    };
    if (paymentIntentFn && metadatafn) {
      const resData = await advertisement_payment_create(userObj);
      if (resData?.status == 200) {
        // dispatch({ type: MESSAGE, payload: { message: resData?.data?.message || resData?.message, error: false } })
      } else {
        dispatch({
          type: MESSAGE,
          payload: {
            message: resData?.response?.data?.message || resData?.message,
            error: true,
          },
        });
      }
    }

    console.log("Calling once", userObj);
  };

  return (
    <div className="success-page-wrapper">
      <div className="success-card-main">
        <div className="success-icon-wrapper">
          <div className="checkmark-container">
            <svg className="checkmark-icon" viewBox="0 0 52 52">
              <path d="M14 27l7 7 16-16" />
            </svg>
          </div>
        </div>

        <h1 className="success-title-main">Payment Successful!</h1>
        <p className="success-subtitle-main">
          Your ad has been activated and will start displaying soon
        </p>

        <div className="success-details-container">
          <div className="success-detail-card">
            <div className="success-detail-icon">
              <svg viewBox="0 0 24 24" strokeWidth="2">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="success-detail-content">
              <span className="success-detail-label">Product Name</span>
              <span className="success-detail-value">{adName}</span>
            </div>
          </div>

          <div className="success-detail-card">
            <div className="success-detail-icon">
              <svg viewBox="0 0 24 24" strokeWidth="2">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <div className="success-detail-content">
              <span className="success-detail-label">Required Views</span>
              <span className="success-detail-value">
                {Number(views).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="success-detail-card">
            <div className="success-detail-icon">
              <svg viewBox="0 0 24 24" strokeWidth="2">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="success-detail-content">
              <span className="success-detail-label">Payable Amount</span>
              <span className="success-detail-value">${amount}</span>
            </div>
          </div>
        </div>

        <div className="success-info-alert">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p>
            A confirmation email has been sent to your registered email address.
            Your ad will start displaying within 24 hours.
          </p>
        </div>

        <div className="success-actions-container">
          <button
            className="success-btn-primary"
            onClick={() => navigate("/advertisement")}
          >
            View My Ads
          </button>
          <button
            className="success-btn-secondary"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </button>
        </div>

        <p className="redirect-info-text">
          Redirecting to your advertisements in {countdown} seconds...
        </p>
      </div>
    </div>
  );
}
