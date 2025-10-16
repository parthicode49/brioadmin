import React from "react";
import { useState, useMemo, useEffect } from "react";
import ListTable from "../utils/Table";
import Export from "../utils/Export";
import {
  customer_delete,
  customer_update,
  all_customer_list,
  all_customer_list_admin_loadless,
  search_customer_admin,
} from "./../../actions/customer";
import { all_subscription_list } from "../../actions/subscription";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import notification_icon from "../../images/notification_icon.png";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import dayjs from "dayjs";
import * as Action from "../../actions/Setting/user_subscription";
import subscription_icon from "../../images/subscribe_icon.png";
import { Alert, IconButton, Snackbar } from "@mui/material";
import { bindActionCreators } from "redux";
import * as NotifiAction from "../../actions/notification";
import * as SubAction from "../../actions/Setting/user_subscription";
import InfoIcone from "../../images/info.png";
import DynamicFormModal from "../utils/NewFormStructure/DynamicFormModal";
import SubscribeSVG from "./SubscribeSVG";
import { Edit } from "@mui/icons-material";
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
export default function Customer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rights = useSelector((state) => state.layout.rights);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [openAdError, setOpenAdError] = useState(false);
  const [callbackFun, setCallbackFun] = useState(() => () => {});
  const { notification_create } = bindActionCreators(NotifiAction, dispatch);
  // const {user_subscription_by_admin} = bindActionCreators(SubAction , dispatch)
  const [content, setPopupContent] = useState("");
  const [callApi, setCallApi] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenSub, setIsModalOpenSub] = useState(false);
  const [save, setSave] = useState(false);
  const [tableData, setTableData] = useState({
    tableTitle: "Customers",
    deleteRecord: customer_delete,
    updateRecord: customer_update,
    deleteAccess: rights?.["Customers"]?.["delete"],
    onDeleteText: "Are you sure want to delete this customer?",
    customisedStatusUpdateMessage: true,
    onActiveText: "Are you sure you want to activate this customer?",
    onInactiveText: [
      "Are you sure you want to inactivate this customer? ",
      "The customer will no longer be logged into the system once you inactivate it.",
    ],
    tableHead: [
      // {
      //   id: "name",
      //   label: "Name",
      //   link: "/Customer/CustomerDetail/CustomerDetail",
      //   isSpecial: true,
      //   align: "center",
      //   color: "var(--gradientColor2)",
      // },
      {
        id: "user",
        label: "Customer Info",
        // subText: "email",
        isSpecial: true,
        align: "left",
      },
      {
        id: "plan_name",
        label: "Subscription",
      },
      {
        id: "created_at",
        label: "Date",
      },
      {
        id: "login_by",
        label: "Login By",
      },

      {
        id: "deviceType",
        label: "Device",
        subText: "deviceId",
      },
      {
        id: "subscription",
        label: "Subscription",
        isSpecial: true,
        align: "left",
      },

      {
        id: "whatsapp",
        label: "WhatsApp",
        isSpecial: true,
        align: "left",
      },
      {
        id: "info",
        label: "Info",
        isSpecial: true,
        align: "left",
      },
      {
        id: "notification",
        label: "Notification",
        isSpecial: true,
        align: "center",
      },
      // {
      //   id: "status",
      //   label: "Status",
      // },
    ],
    tableBody: [],
    filterColumn: [
      {
        id: "1",
        title: "Plan Type",
        name: "plan_name",
        options: ["FREE", "TVOD", "SVOD"],
      },
      {
        id: "1",
        title: "Login By",
        name: "login_by",
        options: ["Mobile", "Google"],
      },
      {
        id: "1",
        title: "Device Type",
        name: "deviceType",
        options: ["android", "Web", "ios"],
      },
    ],
    isDateRangeFilter: "created_at",
  });

  const { transaction_create, user_subscription_by_admin } = bindActionCreators(
    Action,
    dispatch
  );
  const [form, setForm] = useState({});
  const [formNoti, setFormNoti] = useState({});
  const [formSub, setFormSub] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [formStructure, setFormStructure] = useState([
    {
      id: "1",
      type: "select_id",
      title: "Select Plan",
      name: "plan",
      options: ["Portrait", "Landscape"],
      // symbol123:"yes",
      required: true,
    },

    {
      id: "8",
      type: "button",
      title: "Submit",
    },
  ]);
  const handleForm = (id) => {
    setEditingIndex(null);
    setIsModalOpen(true);
    setIsEdit(false);
    setFormNoti({
      user_list: id,
      user_type: "Customer",
      receiver_type: "Single",
    });
  };
  const handleFormSub = (id) => {
    setEditingIndex(null);
    setIsModalOpenSub(true);
    setIsEdit(false);
    setFormSub({
      user: id,
    });
  };
  const handleFormMulti = (id, fun) => {
    setIsModalOpen(true);
    setFormNoti({
      user_list: id,
      user_type: "Customer",
      receiver_type: "Multiple",
    });
    setIsEdit(false);
    setCallbackFun(() => fun);
  };
  const [formStructureNoti, setFormStructureNoti] = useState(
    [
      {
        type: "inputBox",
        title: "Title ",
        name: "title",
        placeholder: "Enter Title here",
        required: true,
      },
      {
        type: "inputBox",
        title: "Description",
        name: "description",
        multiline: true,
        placeholder: "Enter Description here",
        showLimit: true,
        maxLength: "100",
        row: "4",
        required: true,
      },
      {
        type: "file",
        name: "notification_image",
        title: "Notification Image",
        description: "Upload a (Resolution : 512px x 512px) (JPG, PNG)",
        accept: "image/*",
        // size: 6,
        // required: true,
      },
    ].filter((e) => e)
  );
  const [formStructureSub, setFormStructureSub] = useState(
    [
      {
        type: "select",
        title: "Plan Name",
        name: "plan",
        placeholder: "Select the Plan you want to assign",
        options: [],
        required: true,
      },
    ].filter((e) => e)
  );
  const customers = useSelector((state) => state?.customers?.customerLoading);
  const subscriptions = useSelector(
    (state) => state.subscriptions.subscriptions
  );

  useEffect(() => {
    dispatch(all_subscription_list());
    // dispatch(all_customer_list_admin_loadless({page_number:1,row_size:10}));
  }, []);
  const handleEdit = (ele) => {
    setOpenPopUp(true);
    // console.log("Checking", ele);
    setForm({ ...form, id: ele });
  };
  useMemo(() => {
    if (subscriptions?.data) {
      const temp = formStructureSub;
      temp[0]["options"] = subscriptions?.data?.map((ele) => ({
        label: ele?.plan_name,
        value: ele?.id,
      }));
      setFormStructureSub([...temp]);
    }
  }, [subscriptions]);
  const handleCopyText = (textToCopy) => {
    // console.log(textToCopy ,"fgf")
    // if (!textToCopy) {
    //   console.error('No text to copy');
    //   alert('No text to copy!');
    //   return;
    // }

    navigator.clipboard.writeText(textToCopy).then(
      () => {
        // console.log("Number copied to clipboard:", textToCopy);
        // alert(`${textToCopy} copied to clipboard!`);
      },
      (err) => {
        console.error("Failed to copy text:", err);
        alert("Failed to copy text. Please try again.");
      }
    );
  };
  const handleWhatsAppClick = (mobile) => {
    const message = encodeURIComponent("Hi"); // Encode message for URL
    const url = `https://web.whatsapp.com/send?phone=${mobile}&text=${message}`;
    window.open(url); // Open WhatsApp in a new tab
  };
  useMemo(() => {
    if (customers?.data) {
      const temp = tableData;
      temp.tableBody = customers?.data?.map((ele) => ({
        ...ele,
        // name: (ele?.firstName == null) && (ele?.lastName == null) ? "Mobile" :  ele?.firstName + " " + ele?.lastName,
        subscription: ele?.subscription?.plan_name || "Free",

        user: (
          <>
          <p
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
             color: "var(--gradientColor2)"
            }}
          >
            { ele?.mobile_number }
              {/* {ele?.socialType === "google" ? ele?.email : ele?.mobile_number}{" "} */}
            
          {ele?.mobile_number  &&  <span
              style={{
                color: "var(--gradientColor2)",
                width: "40%",
                paddingLeft: "10px",
                cursor: "pointer",
              }}
              onClick={() =>
                handleCopyText(
                  ele?.socialType === "google" ? ele?.email : ele?.mobile_number
                )
              }
            >
              <FileCopyIcon color="inherit" />{" "}
            </span>}
          </p>
          <p  style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
             color: "var(--gradientColor2)"
            }}>
              {ele?.email}  
            </p>
          </>
        ),
        login_by: ele?.socialType === "google" ? "Google" : "Mobile",
        whatsapp:
          ele?.socialType !== "google" ? (
            <WhatsAppIcon
              style={{ color: "green", height: "50px" }}
              onClick={() => handleWhatsAppClick(ele?.mobile_number)}
            />
          ) : (
            <p style={{ color: "var(--themeFontColor)" }}>-</p>
          ),
        info: (
          <img
            src={InfoIcone}
            width="20px"
            height="20px"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("detail", { state: { id: ele?.id } })}
          />
          // <svg
          //   fill="var(--warningColor)"
          //   width="20px"
          //   height="20px"
          //   viewBox="-192 -192 2304.00 2304.00"
          //   xmlns="http://www.w3.org/2000/svg"
          //   stroke="#000000"
          //   stroke-width="0.019200000000000002"
          //   transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)"
          //   style={{ cursor: "pointer" }}
          //   onClick={() => navigate("detail", { state: { id: ele?.id } })}
          // >
          //   <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          //   <g
          //     id="SVGRepo_tracerCarrier"
          //     stroke-linecap="round"
          //     stroke-linejoin="round"
          //     stroke="#CCCCCC"
          //     stroke-width="11.52"
          //   ></g>
          //   <g id="SVGRepo_iconCarrier">
          //     {" "}
          //     <path
          //       d="M960 0c530.193 0 960 429.807 960 960s-429.807 960-960 960S0 1490.193 0 960 429.807 0 960 0Zm0 101.053c-474.384 0-858.947 384.563-858.947 858.947S485.616 1818.947 960 1818.947 1818.947 1434.384 1818.947 960 1434.384 101.053 960 101.053Zm-42.074 626.795c-85.075 39.632-157.432 107.975-229.844 207.898-10.327 14.249-10.744 22.907-.135 30.565 7.458 5.384 11.792 3.662 22.656-7.928 1.453-1.562 1.453-1.562 2.94-3.174 9.391-10.17 16.956-18.8 33.115-37.565 53.392-62.005 79.472-87.526 120.003-110.867 35.075-20.198 65.9 9.485 60.03 47.471-1.647 10.664-4.483 18.534-11.791 35.432-2.907 6.722-4.133 9.646-5.496 13.23-13.173 34.63-24.269 63.518-47.519 123.85l-1.112 2.886c-7.03 18.242-7.03 18.242-14.053 36.48-30.45 79.138-48.927 127.666-67.991 178.988l-1.118 3.008a10180.575 10180.575 0 0 0-10.189 27.469c-21.844 59.238-34.337 97.729-43.838 138.668-1.484 6.37-1.484 6.37-2.988 12.845-5.353 23.158-8.218 38.081-9.82 53.42-2.77 26.522-.543 48.24 7.792 66.493 9.432 20.655 29.697 35.43 52.819 38.786 38.518 5.592 75.683 5.194 107.515-2.048 17.914-4.073 35.638-9.405 53.03-15.942 50.352-18.932 98.861-48.472 145.846-87.52 41.11-34.26 80.008-76 120.788-127.872 3.555-4.492 3.555-4.492 7.098-8.976 12.318-15.707 18.352-25.908 20.605-36.683 2.45-11.698-7.439-23.554-15.343-19.587-3.907 1.96-7.993 6.018-14.22 13.872-4.454 5.715-6.875 8.77-9.298 11.514-9.671 10.95-19.883 22.157-30.947 33.998-18.241 19.513-36.775 38.608-63.656 65.789-13.69 13.844-30.908 25.947-49.42 35.046-29.63 14.559-56.358-3.792-53.148-36.635 2.118-21.681 7.37-44.096 15.224-65.767 17.156-47.367 31.183-85.659 62.216-170.048 13.459-36.6 19.27-52.41 26.528-72.201 21.518-58.652 38.696-105.868 55.04-151.425 20.19-56.275 31.596-98.224 36.877-141.543 3.987-32.673-5.103-63.922-25.834-85.405-22.986-23.816-55.68-34.787-96.399-34.305-45.053.535-97.607 15.256-145.963 37.783Zm308.381-388.422c-80.963-31.5-178.114 22.616-194.382 108.33-11.795 62.124 11.412 115.76 58.78 138.225 93.898 44.531 206.587-26.823 206.592-130.826.005-57.855-24.705-97.718-70.99-115.729Z"
          //       fill-rule="evenodd"
          //     ></path>{" "}
          //   </g>
          // </svg>
        ),
        subscription: (
          // <WhatsAppIcon
          //   style={{ color: "green", height: "50px" }}
          //   onClick={() => handleWhatsAppClick(ele?.mobile_no)}
          // />
          <div>
        
               <IconButton
                onClick={() => handleFormSub(ele?.id)}
              // onClick={() => handleForm(rest)}
              // sx={iconButtonStyles}
            >
              < SubscriptionsIcon sx={{height:"30px"}} />
            </IconButton>
          </div>
          // <img
          //   onClick={() => handleFormSub(ele?.id)}
          //   style={{
          //     cursor: "pointer",
          //     height: 50,
          //     width: "1000px !important",
          //   }}
          //   src={subscription_icon}
          //   alt="Sub"
          //   // height={50}
          //   // width={"100%"}
          // />
        ),
        created_at: dayjs(ele?.created_at).format("DD-MM-YYYY"),
        // socialType1:
        //   ele?.socialType == "Google"
        //     ? "Gmail"
        //     : ele?.socialType == "AppleID"
        //     ? "AppleID"
        //     : ele?.socialType == null
        //     ? "Mobile"
        //     : "WhatsApp",
        notification: (
          // <Link
          //   to="/Notifications/CreateNotifications/"
          //   state={{ customer: ele?.id, send: "nofitication" }}
          // >
          <img
            src={notification_icon}
            alt="Notifications"
            height={"25px"}
            onClick={() => handleForm(ele?.id)}
            style={{ marginRight: "5px", cursor: "pointer" }}
          />
          // </Link>
        ),
      }));
      setTableData({ ...temp });
    }
  }, [customers]);

  useMemo(() => {
    if (subscriptions?.data) {
      const tempArray = ["Free"];
      const temp = tableData;
      subscriptions?.data?.map((ele) => tempArray.push(ele?.plan_name));
      temp.filterColumn[0]["options"] = tempArray;
      setTableData({ ...temp });
    }
  }, [subscriptions]);
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   // const data = new FormData();
  //   // Object.keys(form)?.map((key) => data.append(key, form?.[key]));
  //   // data.append("user", user?.id);

  //   const resData = await user_subscription_by_admin(form);
  //   if (resData?.statuscode == 200) {
  //     const recData = await transaction_create(resData?.data);
  //     setOpenAdError(true);
  //     setPopupContent(recData?.message);
  //     setForm({});
  //     if (recData?.statuscode == 200) {
  //       setCallApi(true);
  //       navigate("/Customer/Customer/", { replace: true });
  //       // const finalApi = await all_customer_list_admin_loadless({})
  //     }
  //   } else {
  //     setOpenAdError(true);
  //     setPopupContent(resData?.message);
  //   }
  //   setForm({});
  //   setOpenPopUp(false);
  // };
  // useMemo(() => {
  //   const temp = formStructure;
  //   temp[0][9].handlePopUp = handleCastAdd;
  //   setFormStructure([...temp]);
  // }, []);
  // useMemo(() => {
  //   if (message?.statuscode == 200) {
  //     dispatch(all_payment_provider_list());
  //   }
  // }, [message]);
  const handleClose = () => {
    setOpenAdError(false);
  };
  const handleSubmit1 = async () => {
    console.log("dddddddddddddddddddd", formNoti);
    const data = new FormData();
    Object.keys(formNoti)?.map((key) => data.append(key, formNoti?.[key]));
    const resData = await notification_create(data);
    console.log(resData, "neweweweweweew");
    if (resData?.status === 200) {
      setIsModalOpen(false);
      setSave(!save);
      setFormNoti({});
      callbackFun([]);
      // navigate("/masters/category/", { state: { formUpload: true } });
    } else {
      setFormNoti(formNoti);
      // setIsModalOpen(true)
    }
  };
  const handleSubmit2 = async () => {
    // console.log("dddddddddddddddddddd", formNoti);
    // const data = new FormData();
    // Object.keys(formNoti)?.map((key) => data.append(key, formNoti?.[key]));
    const resData = await user_subscription_by_admin(formSub);
    console.log(resData, "neweweweweweew");
    if (resData?.status === 200) {
      setIsModalOpenSub(false);

      setFormSub({});
      const NewData = await transaction_create(resData?.data?.data);
      if (NewData?.status === 200) {
        console.log(NewData, "newDaraaaa");
        setSave(!save);
        setCallApi(true);
        setTimeout(() => {
          setCallApi(false);
        }, 1000);
      }
      // callbackFun([]);
      // navigate("/masters/category/", { state: { formUpload: true } });
    } else {
      setFormNoti(formNoti);
      // setIsModalOpen(true)
    }
  };
  const sendMultiNotification = (id, fun) => {
    handleFormMulti(id, fun);
    // console.log(id , "vdjndjdjdjdjd")
    // setSave(!save)
    // fun([])
  };
  return (
    <>
      {/* <div style={{ marginBottom: "1rem" }}>
        <Export
          fileName={"Customers.xlsx"}
          access={rights?.["Customers"]?.["export_excel"] == "true"}
          exportData={tableData?.exportData || tableData?.tableBody}
          headings={tableData.tableHead?.map((value) => value.label)}
          isApi={true}
          api="export_customer_list"
          api_data={customers?.filter_condition}
        />
      </div> */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openAdError}
        autoHideDuration={1500}
        onClose={handleClose}
      >
        <Alert severity="info" variant="filled" color="success">
          {content}
        </Alert>
      </Snackbar>
      {/* <PopupForm
        open={openPopUp}
        setOpen={setOpenPopUp}
        // content={content}
        formStructure={formStructure}
        handleSubmit={handleSubmit}
        minWidth={true}
        formTitle={"Subscription"}
        key={"Form"}
        setForm={setForm}
        form={form}
        // tableData={tableData}
        // setTableData={setTableData}
        // isEdit={isEdit}
        // setIsEdit={setIsEdit}
      /> */}
      <DynamicFormModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setFormNoti({});
          setIsEdit(false);
        }}
        formStructure={formStructureNoti}
        onSubmit={handleSubmit1}
        formData={formNoti}
        setFormData={setFormNoti}
        title={"Notification"}
        initialData={editingIndex !== null ? tableData[editingIndex] : {}}
        save={save}
        setSave={setSave}
      />
      <DynamicFormModal
        open={isModalOpenSub}
        onClose={() => {
          setIsModalOpenSub(false);
          setFormSub({});
          setIsEdit(false);
        }}
        formStructure={formStructureSub}
        onSubmit={handleSubmit2}
        formData={formSub}
        setFormData={setFormSub}
        title={"Subscription"}
        initialData={editingIndex !== null ? tableData[editingIndex] : {}}
        save={save}
        setSave={setSave}
      />
      <ListTable
        tableData={tableData}
        key={"ListTable"}
        isMultiNotificationSend={true}
        sendMultiNotification={sendMultiNotification}
        setForm={setForm}
        setTableData={setTableData}
        setIsEdit={setIsEdit}
        isLoadingData={true}
        loadApi={all_customer_list_admin_loadless}
        searchApi={search_customer_admin}
        totalCount={customers?.customer_count}
        callApi={callApi}
        setCallApi={setCallApi}
        notShowDelete = {true}
        save={setSave}
      />
    </>
  );
}
