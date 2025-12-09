import React from "react";
import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./../../styles/PageTitle.module.css";
import ListTable from "../utils/Table";
import Form from "../utils/Form";
import ViewChange from "../utils/ViewChange";
import {
  advertisement_create,
  advertisement_delete,
  advertisement_update,
  all_advertisement_list,
} from "../../actions/Advertiser/advertisement";
import { all_movie_list } from "../../actions/Movie/movie";
import { all_advertiser_list } from "../../actions/Advertiser/advertiser";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { ADVERTISEMENTS } from "./../../constants/actionTypes";
import Reload from "../utils/Reload";
import { useCallback } from "react";
import useRazorpay from "react-razorpay";
import logo from "../../images/logo.png";
import { advertise_transaction_create } from "../../actions/Advertiser/advertisementpayment";
import { all_advertise_form_list } from "../../actions/adForm";
export default function Advertisement() {
  const role = useSelector((state) => state.layout.role);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.layout.profile);
  const location = useLocation();
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const [form, setForm] = useState(
    (location?.state?.form && JSON.parse(location?.state?.form)) || {}
  );
  const [view, setView] = useState(location?.state?.view || "view_all");

  const [isEdit, setIsEdit] = useState(false);
  const rights = useSelector((state) => state.layout.rights);
  // const [Razorpay] = useRazorpay();

  const Razorpay = useRazorpay();

  const handlePayment = useCallback(
    async (Amount, Name, user_id, advertise_id, pay_type, product_name) => {
      // const order = await createOrder(params);
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
          // console.log(
          //   Amount,
          //   Name,
          //   user_id,
          //   advertise_id,
          //   pay_type,
          //   product_name,
          //   response,
          //   paymentId,
          //   "neenenene"
          // );
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
          // console.log("Status:", response.statusCode);
          // console.log("Headers:", JSON.stringify(response.headers));
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
        // console.log("Payment Details:", data);
        // Now you can use the data as needed
      })
      .catch((error) => {
        console.error("Error fetching payment details:", error);
      });
  }

  useMemo(() => {
    if (isEdit) {
      setView("create_new");
    } else {
      setView("view_all");
      setForm({});
    }
  }, [isEdit]);

  const path = location?.pathname.split("/")[2];
  useEffect(() => {
    setView(path != "Advertisement" ? "create_new" : "view_all");
    setForm((location?.state?.form && JSON.parse(location?.state?.form)) || {});
    setIsEdit(path == "EditAdvertisement");
  }, [location]);
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
  const [formStructure, setFormStructure] = useState([
    {
      id: "2",
      type: "select",
      title: "Company Name",
      name: "company_name",
      options: [],
      required: true,
    },

    {
      id: "2",
      type: "select",
      title: "Advertiser Name",
      name: "advertiser",
      options: [],
      required: true,
    },
    {
      id: "3",
      type: "select",
      title: "Product Name",
      name: "product_name",
      options: [],
      // maxLength: 30,
      // regex: /^[a-zA-Z0-9\s\&]+$/,
      required: true,
    },

    {
      id: "4",
      type: "inputBox",
      title: "Add Advertisement Video URL (.mp4)",
      endsWith: ".mp4",
      errorText: "File extension should be .mp4 only",
      name: "advertise_url",
      required: true,
    },
    {
      id: "15",
      type: "inputBox",
      title: "Duration",
      name: "duration",
      disabled: true,
    },
    {
      id: "5",
      type: "select",
      title: "Subscription Type",
      name: "subscription_type",
      options: ["Recharge Based", "Pay Per View"],
      required: true,
      disabled: true,

    },
    {
      id: "5",
      type: "select_multiple",
      title: "Select Movies you want to display Ads",
      name: "movies",
      options: ["Bhola", "Phatan", "Kashmir Files"],
    },

    {
      id: "7",
      type: "inputBox",
      title: "Commission",
      name: "tvod_amount",
      disabled: true,
      required: true,
    },

    // {
    //   id: "5",
    //   type: "inputBox",
    //   title: "Recharge amount",
    //   name: "recharge_amount",
    //   // variant: "number",
    //   // maxLength: "6",
    //   disabled: true,
    //   // max: "999000",
    //   // min: "0.00",
    //   // step: ".01",
    //   display: "none",
    // },
    {
      id: "7",
      type: "inputBox",
      variant: "number",
      title: "No of Views Required",
      name: "views_required",
      // maxLength: "6",
      disabled: true,
      required: true,
    },

    {
      id: "5",
      type: "inputBox",
      title: "Payable amount",
      name: "recharge_amount",
      // variant: "number",
      // max: "999000",
      // min: "0.00",
      disabled: true,
      required: true,
    },

    {
      id: "5",
      type: "image",
      title: "Upload Product Image",
      name: "thumbnail",
      subtitle: "(Resolution : 512px x 512px) *",
      subsubtitle: "Max File Size 1MB",
      subsubsubtitle: "Support only JPG,PNG,JPEG",
      size: "6",
      required: true,
    },
    {
      id: "20",
      type: "toggle",
      title: "Status",
      name: "status",
      default: "Active",
      display: "none",
      size: "6",
      options: [
        { value: "Active", color: "success" },
        { value: "Inactive", color: "danger" },
      ],
    },

    {
      id: "9",
      type: "button",
      title: isEdit ? "Edit" : "Create",
    },
  ]);

  // useMemo(() => {
  //   const temp = formStructure;
  //   if (form?.subscription_type == "Recharge Based") {
  //     temp[8]["display"] = "block";
  //     temp[9]["disabled"] = true;
  //     temp[10]["display"] = "none";
  //   } else if (form?.subscription_type == "Pay Per View") {
  //     temp[8]["display"] = "none";
  //     temp[10]["display"] = "block";
  //     temp[9]["disabled"] = false;

  //     temp[10]["disabled"] = true;
  //   }

  //   setFormStructure([...temp]);
  // }, [form?.subscription_type]);
  const advertisements = useSelector(
    (state) => state.advertisers.advertisements
  );
  const advertisers = useSelector((state) => state.advertisers.advertisers);
  const movies = useSelector((state) => state.movies.movies);


  useEffect(() => {
    if(user?.id){const data = new FormData();
    data.append("user", user?.id);
    data.append("id", user?.id);
    dispatch({ type: ADVERTISEMENTS, payload: undefined });
    dispatch(all_advertise_form_list(data));
    dispatch(all_movie_list(data));
    dispatch(all_advertiser_list(data));
    dispatch(all_advertisement_list(data))
  }
  }, [location, user?.id]);
  const adForm = useSelector((state) => state?.adForm?.adForm);
  useMemo(() => {
    if (advertisers?.statuscode == 200) {
      const temp = formStructure;
      temp[0]["options"] = advertisers?.data?.map((ele) => ele?.company_name);
      temp[1]["options"] = advertisers?.data?.map((ele) => ele?.name);
      setFormStructure([...temp]);
    }
  }, [advertisers]);
  useMemo(() => {
    if (adForm?.statuscode == 200) {
      const temp = formStructure;
      temp[2]["options"] = adForm?.data?.map((ele) => ele?.status == "Approved" && ele?.product_name).filter((e)=>e);
      setFormStructure([...temp]);
    }
  }, [adForm]);



  useMemo(() => {
    const temp = formStructure;
    temp[1]["options"] = advertisers?.data
      ?.map((ele) => ele?.company_name == form?.company_name && ele?.name)
      .filter((e) => e);
      const adDara = advertisements?.data?.map((ele) => ele?.payment_status =="Paid" && ele?.product_name).filter((e)=>e)
      temp[2]["options"]  =adForm?.data?.map((ele)=>  adDara?.includes(ele?.product_name) ? "":(ele?.advertiser?.company_name == form?.company_name && ele?.status == "Approved") && ele?.product_name).filter((e)=>e)
    setFormStructure([...temp]);
    setForm({
      ...form,
      advertiser: temp[1]["options"]?.includes(form?.company_name)
        ? form?.advertiser
        : temp[1]["options"]?.[0],
    });
  }, [form?.company_name]);
  useMemo(() => {
    const matchingData = adForm?.data.find(ele => ele?.product_name === form?.product_name);
    if(matchingData){

      setForm({
        ...form,
        tvod_amount: matchingData.tvod_amount,
      subscription_type: matchingData.subscription_type,
      views_required: matchingData.views_required,
      recharge_amount : matchingData.recharge_amount,
      });
    }
  }, [form?.product_name , adForm]);
  useMemo(() => {
    if (isEdit) {
      const temp = formStructure;
      temp[11]["display"] = "block";
      setFormStructure([...temp]);
    } else {
      const temp = formStructure;
      temp[11]["display"] = "none";
      setFormStructure([...temp]);
    }
  }, [isEdit]);
  // useMemo(()=>{
  //   if(form?.)
  // },[])
  // useMemo(() => {
  //   const temp = form;
  //   temp["views_required"] = Math.round(
  //     form?.recharge_amount / (form?.tvod_amount / 100)
  //   );
  //   setForm({ ...temp });
  // }, [form?.recharge_amount]);

  // useMemo(() => {
  //   const temp = form;
  //   temp["recharge_amount"] = Math.round(
  //     form?.views_required * (form?.tvod_amount / 100)
  //   );
  //   setForm({ ...temp });
  // }, [form?.views_required]);
 


  useMemo(() => {
    if (advertisements?.statuscode == 200) {
      const temp = tableData;
      temp.tableBody = advertisements?.data?.map((ele) => ({
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
  useMemo(() => {
    const temp = formStructure;
    role != "Advertiser"
      ? (temp[6]["options"] =
          (movies?.statuscode == 200 &&
            movies?.data?.map((movie) => movie?.movie_name).filter((e) => e)) ||
          [])
      : (temp[4]["options"] =
          (movies?.statuscode == 200 &&
            movies?.data?.map((movie) => movie?.movie_name).filter((e) => e)) ||
          []);
    setFormStructure([...temp]);
  }, [movies]);

  const formTitle = isEdit ? "Edit Advertisement" : "Create Advertisement";

  const message = useSelector((state) => state.layout.message);

  const handleSubmit = (event) => {
    event.preventDefault();
    const tempForm = form;
    tempForm["tempadvertiser"] = form?.["advertiser"];
    tempForm["advertiser"] = advertisers?.data
      ?.map((option) => form?.["advertiser"]?.includes(option.name) && option.id)
      .filter((e) => e);
    tempForm["uploaded_by"] = user?.id;
    tempForm["movies"] = movies?.data
      ?.map(
        (option) => form?.["movies"]?.includes(option.movie_name) && option.id
      )
      .filter((e) => e);

    setForm({
      ...tempForm,
    });
    const data = new FormData();
    Object.keys(form)?.map((key) => data.append(key, form?.[key]));
    data.append("user", user?.id);
    formStructure?.map((element) => {
      if (
        element.type == "image" &&
        form?.[element.name] &&
        typeof form?.[element.name] != "string"
      ) {
        const temp = form;
        temp["temp" + element.name] = form?.[element.name];
        temp[element.name] = URL.createObjectURL(form?.[element.name]);

        setForm({
          ...temp,
        });
      }
    });

    if (isEdit) {
      dispatch(advertisement_update(data));
    } else {
      dispatch(advertisement_create(data));
    }
    setFlag(true);
  };

  useMemo(() => {
    if (message?.statuscode == 200 && flag) {
      const temp = tableData;
      if (isEdit) {
        temp.tableBody?.map(
          (value, index) =>
            value.id == form.id && (temp.tableBody[index] = { ...form })
        );
      } else {
        temp.tableBody[temp.tableBody.length] = {
          id: temp.tableBody.length,
          ...form,
          edit: temp.tableBody.length,
        };
      }
      setTableData({ ...temp });
      setIsEdit(false);
      setForm({});
      setFlag(false);
      setTimeout(() => {
        const data = new FormData();
        data.append("id", user?.id);
        dispatch(all_advertisement_list(data));
        navigate("/Advertisers/Advertisement/", {
          state: { view: "view_all" },
        });


        setView("view_all");
      }, 1000);
    } else {
      const tempForm = form;
      tempForm["advertiser"] = form?.["tempadvertiser"];
      tempForm["thumbnail"] = form?.["tempthumbnail"];
      setForm({ ...tempForm });
    }
  }, [message]);

  const videoEl = useRef(null);
  const handleLoadedMetadata = () => {
    const video = videoEl.current;
    var d = Number(video.duration);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);
    var hDisplay = (h > 9 ? h : "0" + h) + ":";
    var mDisplay = (m > 9 ? m : "0" + m) + ":";
    var sDisplay = s > 9 ? s : "0" + s;

    setForm({ ...form, duration: hDisplay + mDisplay + sDisplay });
  };

  return (
    <>
      <video
        style={{ display: "none" }}
        id="myvid"
        src={form?.advertise_url}
        ref={videoEl}
        type="video/mp4"
        onLoadedMetadata={handleLoadedMetadata}
      ></video>
    { role !=="Advertiser" && <ViewChange
        setForm={setForm}
        setView={setView}
        setIsEdit={setIsEdit}
        view={view}
        access={rights?.["Advertisement"]?.["create"] == "true"}
        isEdit={isEdit}
        create_new={"/Advertisers/CreateAdvertisement"}
        view_all={"/Advertisers/Advertisement"}
        reload={<Reload isClubed={true} />}
        form={form}
      />}
      {view == "create_new" && (
        <Form
          formStructure={formStructure}
          formTitle={formTitle}
          key={"Form"}
          handleSubmit={handleSubmit}
          setForm={setForm}
          form={form}
          tableData={tableData}
          setTableData={setTableData}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
      )}
      {view == "view_all" && (
        <ListTable
          tableData={tableData}
          key={"ListTable"}
          setForm={setForm}
          setTableData={setTableData}
          setIsEdit={setIsEdit}
          create_new={"/Advertisers/EditAdvertisement"}
        />
      )}
    </>
  );
}
