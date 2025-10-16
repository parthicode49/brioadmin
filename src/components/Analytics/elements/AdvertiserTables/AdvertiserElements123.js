import React from "react";
import { useState, useMemo, useEffect } from "react";
import ListTable from "../../../utils/Table";
import Form from "../../../utils/Form";
import ViewChange from "../../../utils/ViewChange";
import {
  advertisement_create,
  advertisement_delete,
  advertisement_update,
  all_advertisement_list,
} from "../../../../actions/Advertiser/advertisement";

import { all_movie_list } from "../../../../actions/Movie/movie";
import {
  advertiser_transaction_history,
  all_advertiser_list,
} from "../../../../actions/Advertiser/advertiser";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Export from "../../../utils/Export";
import useRazorpay from "react-razorpay";
import { useCallback } from "react";
import logo from "./../../../../images/logo.png";
import AdvertisementHistory from "./AdvertisementHistory";
// import AdvertisementReports from "./AdvertisementReports";
export default function Advertisement() {
  const role = useSelector((state) => state.layout.role);
  const advertiser = useSelector((state) => state.layout.advertiser);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.layout.profile);
  const location = useLocation();
  const [form, setForm] = useState(
    (location?.state?.form && JSON.parse(location?.state?.form)) || {}
  );
  const [view, setView] = useState(location?.state?.view || "view_all");

  const [paymentId, setPatmentId] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const rights = useSelector((state) => state.layout.rights);
  useMemo(() => {
    if (isEdit) {
      setView("create_new");
    } else {
      setView("view_all");
      setForm({
        advertiser: advertiser?.name,
        company_name: advertiser?.company_name,
        tvod_amount: advertiser?.commission,
      });
    }
  }, [isEdit]);
  const path = location?.pathname.split("/")[2];

  useEffect(() => {
    setView(path != "AdvertiserElements"  ? "create_new" : "view_all");

    setForm(
      (location?.state?.form && JSON.parse(location?.state?.form)) || {
        advertiser: advertiser?.name,
        company_name: advertiser?.company_name,
        tvod_amount: advertiser?.commission,
      }
    );
    setIsEdit(path == "EditAdvertiserElements");
  }, [location]);

  const [tableData, setTableData] = useState({
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
      // {
      // 	id: "advertiser",
      // 	label: "Company Info",
      // 	subText:"company_name"
      // },
      {
        id: "views_required",
        label: "Required Views",
      },
      {
        id: "no_of_views",
        label: "Ad views",
      },
      {
        id: "available_views",
        label: "Available Views",
      },
      {
        id: "recharge_amount",
        label: "Payable Amount",
      },
      {
        id: "advertise_in_movie",
        label: "Movies",
      },
      {
        id: "uploaded_by",
        label: "Uploaded By",
      },

      {
        id: "status",
        label: "Status",
      },
      {
        id: "edit",
        label: "Update",
        access: rights?.["Advertisement"]?.["edit"] == "true",
      },
    ],
    tableBody: [
    ],

    // filterColumn: [
    //   {
    //     id: "1",
    //     title: "Ad name",
    //     name: "product_name",
    //     options: ["FREE", "TVOD", "SVOD"],
    //   },
    // ],
  });

  const [formStructure, setFormStructure] = useState([
    {
      id: "3",
      type: "inputBox",
      title: "Product Name",
      name: "product_name",
      maxLength: 30,
      regex: /^[a-zA-Z0-9\s\&]+$/,
      required: true,
    },

    {
      id: "4",
      type: "inputBox",
      title: "Add Advertisement Video URL (.mp4)",
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
    {
      id: "5",
      type: "inputBox",
      title: "Recharge amount",
      name: "recharge_amount",
      variant: "number",
      max: "999000",
      min: "0.00",
      step: ".01",
      display: "none",
    },
    {
      id: "7",
      type: "inputBox",
      variant: "number",
      title: "No of Views Required",
      name: "views_required",
      required: true,
    },

    {
      id: "5",
      type: "inputBox",
      title: "Payable amount",
      name: "recharge_amount",
      variant: "number",
      max: "999000",
      min: "0.00",
      step: ".01",
    },

    {
      id: "5",
      type: "image",
      title: "Upload Product Image",
      name: "thumbnail",
      subtitle: "(Resolution : 512px x 512px) *",
      subsubtitle: "Max File Size 1MB",
      subsubsubtitle: "Support only JPG,PNG,JPEG",
    },

    {
      id: "9",
      type: "button",
      title: isEdit ? "Edit" : "Create",
    },
  ]);

  const advertisements = useSelector(
    (state) => state.advertisers.advertisements
  );
  const advertisers = useSelector((state) => state.advertisers.advertisers);
  const movies = useSelector((state) => state.movies.movies);
  useEffect(() => {
    const data = new FormData();
    // data.append("id", 161);
    data.append("id", user?.id);

    dispatch(all_movie_list(data));
  }, []);

  useMemo(() => {
    const temp = formStructure;
    if (form?.subscription_type == "Recharge Based") {
      temp[6]["display"] = "block";
      temp[6]["required"] = true;
      temp[8]["display"] = "none";
      temp[8]["required"] = false;
    } else if (form?.subscription_type == "Pay Per View") {
      temp[6]["display"] = "none";
      temp[6]["required"] = false;
      temp[8]["display"] = "block";
      temp[8]["required"] = true;
    }

    setFormStructure([...temp]);
  }, [form?.subscription_type]);

  useMemo(() => {
    const temp = form;

    temp["views_required"] = Math.round(
      form?.recharge_amount / form?.tvod_amount
    );
    setForm({ ...temp });
  }, [form?.recharge_amount]);
  useMemo(() => {
    const temp = form;

    temp["recharge_amount"] = Math.round(
      form?.views_required * form?.tvod_amount
    );
    setForm({ ...temp });
  }, [form?.views_required]);
  useEffect(() => {
  	const data = new FormData()
			data.append("user",user?.id)
			dispatch(all_advertiser_list(data));
  }, []);
  useEffect(() => {
    const data = new FormData();
    data.append("id", user?.id);
    dispatch(all_advertisement_list(data));
  }, []);

  useMemo(() => {
    if (advertisements?.statuscode == 200) {
      const temp = tableData;
      temp.tableBody = advertisements?.data.map((ele) => ({
        ...ele,
        advertiser: ele?.advertiser?.name,
        company_name: ele?.advertiser?.company_name,
        available_views: ele?.views_required - ele?.no_of_views,
        uploaded_by: ele?.uploaded_by?.firstName,
      }));
      //   temp.filterColumn[0]["options"] = [
      //     ...new Set(advertisements?.data.map((ele) => ele?.product_name)),
      //   ];
      setTableData({ ...temp });
    }
  }, [advertisements]);
  useMemo(() => {
    const temp = formStructure;
    temp[4]["options"] =
      (movies?.statuscode == 200 &&
        movies?.data.map((movie) => movie?.movie_name).filter((e) => e)) ||
      [];
    setFormStructure([...temp]);
  }, [movies]);
  const formTitle = isEdit ? "Edit Advertisement" : "Create Advertisement";

  const message = useSelector((state) => state.layout.message);

  const handleSubmit = (event, res) => {
    event.preventDefault();
    const tempForm = form;
    console.log(res);

    tempForm["tempadvertiser"] = form?.["advertiser"];
    tempForm["advertiser"] = advertisers?.data
      .map((option) => form?.["advertiser"]?.includes(option.name) && option.id)
      .filter((e) => e);
    tempForm["uploaded_by"] = user?.id;
    tempForm["movies"] = movies?.data
      .map(
        (option) => form?.["movies"]?.includes(option.movie_name) && option.id
      )
      .filter((e) => e);

    setForm({
      ...tempForm,
    });
    const data = new FormData();
    Object.keys(form).map((key) => data.append(key, form?.[key]));
    data.append("payment_id", res.razorpay_payment_id);

    formStructure.map((element) => {
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
  };

  useMemo(() => {
    if (message?.statuscode == 200) {
      const temp = tableData;
      if (isEdit) {
        temp.tableBody.map(
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
      setTimeout(() => {
        const data = new FormData();
        Object.keys(form).map((key) => data.append(key, paymentId));
        // data.append("id", location.state?.id || user?.id);
        dispatch(all_advertisement_list(data));
      }, 1000);
      setView("view_all");
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
    var hDisplay = h > 9 ? h : "0" + h + ":";
    var mDisplay = m > 9 ? m : "0" + m + ":";
    var sDisplay = s > 9 ? s : "0" + s;

    setForm({ ...form, duration: hDisplay + mDisplay + sDisplay });
  };

  const Razorpay = useRazorpay();

  const handlePayment = useCallback((event) => {
    console.log(form?.recharge_amount);
    // console.log()
    event.preventDefault();
    const options: RazorpayOptions = {
      key: "rzp_test_EwvhLv13OfHRkE",
      amount: Number(form?.recharge_amount) * 100,
      currency: "INR",
      name: advertiser?.name,
      description: "Test Transaction",
      image: { logo },
      //   order_id: order.id,
      handler: (res) => {
        handleSubmit(event, res);
        // const paymentIds = res.razorpay_payment_id
        // setPatmentId(paymentIds)
        setTimeout(() => {
          const data = new FormData();
          data.append("patmenyId", paymentId);
          console.log(data);
          dispatch(advertisement_create(data));
        }, 500);
      },
      prefill: {
        name: advertiser?.name,
        email: advertiser?.email,
        contact: advertiser?.mobileNumber,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    // useEffect(()=>{
    // 	const data=new FormData()
    // 	data.append('paymentId',paymentId)
    // 	dispatch(advertisement_create(data));
    // 	console.log(data)
    // },[paymentId])

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
      ""[(Razorpay, form?.recharge_amount, advertiser)]
    );
  });
  // const [tableData2, setTableData2] = useState({
  //   tableTitle: "Transaction History",
  //   // deleteRecord: advertisement_delete,
  //   // updateRecord: advertisement_update,
  //   // deleteAccess: rights?.["Advertisement"]?.["delete"] == "true",
  //   // onDeleteText: "Are you sure want to delete?",
  //   // onUpdateText: "Are you Sure?",
  //   tableHead: [
  //     // {
  //     // 	id: "company_name",
  //     // 	label: "Company",
  //     // 	width:"auto"
  //     // },
  //     {
  //       id: "product_name",
  //       label: "Product Name",
  //     },
  //     {
  //       id: "payment_id",
  //       label: "Payment ID",
  //     },
  //     // {
  //     // 	id: "advertiser",
  //     // 	label: "Company Info",
  //     // 	subText:"company_name"
  //     // },
  //     {
  //       id: "recharge_amount",
  //       label: "Recharge Amount",
  //     },
  //     {
  //       id: "tvod_amount",
  //       label: "Amount",
  //     },
  //     {
  //       id: "status",
  //       label: "Status",
  //     },
  //     {
  //       id: "name",
  //       label: "Create By",
  //     },
  //     {
  //       id: "created_at",
  //       label: "Date",
  //     },
  //     //   {
  //     //     id: "uploaded_by",
  //     //     label: "Uploaded By",
  //     //   },

  //     //   {
  //     //     id: "status",
  //     //     label: "Status",
  //     //   },
  //     //   {
  //     //     id: "edit",
  //     //     label: "Update",
  //     //     access: rights?.["Advertisement"]?.["edit"] == "true",
  //     //   },
  //   ],
  //   tableBody: [
  //     {
  //       id: 0,
  //       company_name: "Movie",
  //       advertiser_name: "Landscape",
  //       // product_name: "2",
  //       // views: "Active",
  //       start_date: "Active",
  //       end_date: "Active",
  //       product_status: "Active",
  //       status: "Active",
  //     },
  //   ],

  //   filterColumn: [
  //     //   {
  //     //     id: "1",
  //     //     title: "Ad name",
  //     //     name: "product_name",
  //     //     options: ["FREE", "TVOD", "SVOD"],
  //     //   },
  //   ],
  // });
  // const advertisements2 = useSelector(
  //   (state) => state.advertisers.advertisements
  // );
  // console.log(advertisements2);
  // //   const advertisers2= useSelector((state) => state.advertisers.advertisers);
  // //   const movies = useSelector((state) => state.movies.movies);
  // useEffect(() => {
  //   const data = new FormData();
  //   // data.append("id", 161);
  //   data.append("id", user?.id);

  //   dispatch(all_movie_list(data));
  // }, []);
  // useMemo(() => {
  //   if (advertisements2?.statuscode == 200) {
  //     const temp123 = tableData2;
  //     temp123.tableBody = advertisements?.transaction_history.map((ele) => ({
  //       ...ele,
  //       name:
  //         ele?.lastName !== null
  //           ? ele?.firstName + " " + ele?.lastName
  //           : ele?.firstName,
  //       // advertiser: ele?.advertiser?.name,
  //       // company_name: ele?.advertiser?.company_name,
  //       // available_views: ele?.views_required - ele?.no_of_views,
  //       // uploaded_by: ele?.uploaded_by?.firstName,
  //     }));
  //     //   temp.filterColumn[0]["options"] = [
  //     //     ...new Set(advertisements?.data.map((ele) => ele?.product_name)),
  //     //   ];
  //     setTableData2({ ...temp123 });
  //   }
  // }, [advertisements2]);

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
    
    
        <ViewChange
          setForm={setForm}
          setView={setView}
          setIsEdit={setIsEdit}
          view={view}
          access={rights?.["Advertisement"]?.["create"] == "true"}
          isEdit={isEdit}
          create_new={"/AdvertiserElements/CreateAdvertiserElements"}
          view_all={"/AdvertiserElements/AdvertiserElements"}
          form={form}
          export_excel={
            <Export
              fileName={"Movies"}
              access={rights?.["Movie"]?.["export_excel"] == "true"}
              isClubed={true}
              exportData={tableData?.exportData || tableData?.tableBody}
              headings={tableData.tableHead.map((value) => value.label)}
            />
          }
        />
    
      {view == "create_new" && (
        <Form
          formStructure={formStructure}
          formTitle={formTitle}
          key={"Form"}
          handleSubmit={handlePayment}
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
          create_new={"/AdvertiserElements/EditAdvertiserElements"}
          // addButton={
          //   <ViewChange
          //     setForm={setForm}
          //     setView={setView}
          //     setIsEdit={setIsEdit}
          //     view={view}
          //     access={rights?.["Advertisement"]?.["create"] == "true"}
          //     isEdit={isEdit}
          //   />
          // }
          // exportButton={
          //   <Export
          //     fileName={"Report"}
          //     exportData={tableData?.exportData || tableData?.tableBody}
          //     headings={tableData.tableHead.map((value) => value.label)}
          //   />
          // }
        />
      )}
      {/* {view == "view_all" && (
        <ListTable
          tableData={tableData2}
          //   key={"ListTable"}
          //   setForm={setForm}
          setTableData={setTableData2}
          //   setIsEdit={setIsEdit}
          //   addButton={
          //     <ViewChange
          //       setForm={setForm}
          //       setView={setView}
          //       setIsEdit={setIsEdit}
          //       view={view}
          //       access={rights?.["Advertisement"]?.["create"] == "true"}
          //       isEdit={isEdit}
          //     />
          //   }
          exportButton={
            <Export
              fileName={"Report"}
              exportData={tableData?.exportData || tableData?.tableBody}
              headings={tableData.tableHead.map((value) => value.label)}
            />
          }
        />
      )} */}
      {/* <button onClick={handlePayment}>Click</button> */}

      {/* {view == "view_all" && <AdvertisementReports/>} */}
      <AdvertisementHistory/>
    </>
  );
}
