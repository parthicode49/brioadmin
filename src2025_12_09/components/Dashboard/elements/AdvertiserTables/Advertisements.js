import React from "react";
import { useState, useMemo, useEffect } from "react";
import ListTable from "../../../utils/Table";

import {
  advertisement_delete,
  advertisement_update,
  all_advertisement_list,
} from "../../../../actions/Advertiser/advertisement";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { ADVERTISEMENTS } from "./../../../../constants/actionTypes";
import { useCallback } from "react";
import useRazorpay from "react-razorpay";
import logo from "../../../../images/logo.png";
import { advertise_transaction_create } from "../../../../actions/Advertiser/advertisementpayment";


export default function Advertisement() {
  const role = useSelector((state) => state.layout.role);
  const Razorpay = useRazorpay();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.layout.profile);
  const location = useLocation();
  const [form, setForm] = useState(
    (location?.state?.form && JSON.parse(location?.state?.form)) || {}
  );


  const [isEdit, setIsEdit] = useState(false);
  const rights = useSelector((state) => state.layout.rights);
  


  

 



  const tempTableData = {
    tableTitle: "Advertisements",
    deleteRecord: advertisement_delete,
    updateRecord: advertisement_update,
    deleteAccess: rights?.["Advertisement"]?.["delete"] == "true",
    onDeleteText: "Are you sure want to delete?",
    onUpdateText: "Are you Sure?",
    tableHead: [
      // {
      // 	id: "company_name",
      // 	label: "Company",
      // 	width:"auto"
      // },

      {
        id: "product_name",
        label: "Product",
      },
      role !== "Advertiser" &&    {
        id: "advertiser",
        label: "Company Info",
        subText: "company_name",
      },
      // {
      // 	id: "email",
      // 	label: "Contact Info",
      // 	subText:"mobileNumber"
      // },
      {
        id: "no_of_views",
        label: "Total Seen",
      },
      {
        id: "views_required",
        label: "Required Views",
      },

      {
        id: "available_views",
        label: "Available Views",
      },
      {
        id: "recharge_amount",
        label: "Payment Amount",
      },
      role !== "Advertiser"  &&   {
        id: "uploaded_by",
        label: "Uploaded By",
      },

      role !== "Advertiser" && {
        id: "payment_status",
        label: "Payment Status",
      },

      {
        id: "status",
        label: "Status",
        isButtonDisplay: true,
      },
      role === "Advertiser" && {
        id: "pay_now",
        label: "Payment Status",
        align: "left",
        isSpecial: true,
        // default:"VIEW"
        // default: <><button style={{ padding: "5px 15px", color: "rgb(238, 127, 37)", background: "transparent", border: "1px solid rgb(238, 127, 37)", borderRadius: "5px" }}>Pay Now</button></>
      },
      role !== "Advertiser" && {
        id: "edit",
        label: "Update",
        access: rights?.["Advertisement"]?.["edit"] == "true",
      },
    ],
    tableBody: [],
    filterColumn: [
      {
        id: "1",
        title: "Payment Status",
        name: "payment_status",
        options: ["Pending" , "Paid"],
      },
    ],
  };
  const [tableData, setTableData] = useState({ ...tempTableData });
  useMemo(() => {
    setTableData({ ...tempTableData });
  }, [rights]);
 

  const advertisements = useSelector(
    (state) => state.advertisers.advertisements
  );
 

  useEffect(() => {
    if(user?.id){const data = new FormData();
    data.append("user", user?.id);
    data.append("id", user?.id);
    dispatch({ type: ADVERTISEMENTS, payload: undefined });
    
    dispatch(all_advertisement_list(data))
  }
  }, [location, user?.id]);




  const handlePayment = useCallback(
    async (Amount, Name, user_id, advertise_id, pay_type, product_name) => {
      // const order = await createOrder(params);
      // console.log(data,data1,"emaivdsfjn")
      const options = {
        key: "rzp_test_8m3Fho730KwaLV",
        amount: Amount * 100,
        currency: "INR",
        name: Name,
        description: "Test Transaction",
        image: { logo },
        // order_id: "12345HBNHG",
        handler: (response) => {
          var paymentId = response.razorpay_payment_id;
          console.log(
            Amount,
            Name,
            user_id,
            advertise_id,
            pay_type,
            product_name,
            response,
            paymentId,
            "neenenene"
          );
          setTimeout(() => {
            const data = new FormData();
            data.append("uploaded_by", user_id);
            data.append("advertise", advertise_id);
            data.append("payment_id", paymentId);
            data.append("subscription_type", pay_type);
            data.append("recharge_amount", Amount);
            data.append("product_name", product_name);
            paymentId !== ("" || null)
              ? data.append("status", "Success")
              : data.append("status", "Fail");

            dispatch(advertise_transaction_create(data));
            // Call a function to fetch additional details
            fetchPaymentDetails(paymentId);
          }, 500);
        },
        prefill: {
          name: "Piyush Garg",
          email: "youremail@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzpay = new Razorpay(options);
      rzpay.open();
      rzpay.on(
        "payment.failed",
        function (response) {
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
          console.log("Status:", response.statusCode);
          console.log("Headers:", JSON.stringify(response.headers));
          // console.log("Response:", body);
        },
        ""[Razorpay]
      );
    }
  );

  function fetchPaymentDetails(paymentId) {
    // Make a request to Razorpay API to fetch payment details
    fetch(`https://api.razorpay.com/v1/payments/${paymentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic FZUA11NsmlVrsfwKZvIVywkc", // Replace with your Razorpay API key
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data containing payment details
        console.log("Payment Details:", data);
        // Now you can use the data as needed
      })
      .catch((error) => {
        console.error("Error fetching payment details:", error);
      });
  }

 
 


 


  useMemo(() => {
    if (advertisements?.statuscode == 200) {
      const temp = tableData;
      temp.tableBody = advertisements?.data.map((ele) => ({
        ...ele,
        advertiser: ele?.advertiser?.name,
        email: ele?.advertiser?.email,
        mobileNumber: ele?.advertiser?.mobileNumber,
        company_name: ele?.advertiser?.company_name,
        available_views: ele?.views_required - ele?.no_of_views,
        uploaded_by: ele?.uploaded_by?.firstName,
        pay_now:
          ele?.payment_status !== "Paid" ? (
            <button
              style={{
                padding: "5px 15px",
                color: "rgb(238, 127, 37)",
                background: "transparent",
                border: "1px solid rgb(238, 127, 37)",
                borderRadius: "5px",
              }}
              onClick={() =>
                handlePayment(
                  ele?.recharge_amount,
                  ele?.advertiser?.name,
                  ele?.advertiser?.user,
                  ele?.id,
                  ele?.subscription_type,
                  ele?.product_name
                )
              }
            >
              Pay Now
            </button>
          ) : (
            <button
              style={{
                padding: "5px 15px",
                color: "var(--successColor)",
                background: "transparent",
                border: "1px solid  var(--successColor)",
                borderRadius: "5px",
              }}
              disabled
            >
              Paid
            </button>
          ),
          // seen_views: 
      }));
      setTableData({ ...temp });
    }
  }, [advertisements]);


 
  
 



 

  return (
    <>
   
    
        <ListTable
          tableData={tableData}
          key={"ListTable"}
          setForm={setForm}
          setTableData={setTableData}
          setIsEdit={setIsEdit}
          create_new={"/Advertisers/EditAdvertisement"}
        />
   
    </>
  );
}
