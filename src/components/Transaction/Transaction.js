import React from "react";
import { useState, useEffect, useMemo } from "react";

import { Link, useLocation } from "react-router-dom";
import styles from "./../../styles/PageTitle.module.css";
import ListTable from "../utils/Table";
import {
  all_transaction_list,
} from "./../../actions/transaction";
import { useDispatch, useSelector } from "react-redux";
import Export from "./../utils/Export";
import { all_subscription_list } from "../../actions/subscription";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import notification_icon from "../../images/notification_icon.png";
import DynamicFormModal from "../utils/NewFormStructure/DynamicFormModal";
import * as NotifiAction from "../../actions/notification";
import { bindActionCreators } from "redux";
import { useAccessControl } from "../utils/useAccessControl";
export default function Transaction() {
  const { canEdit } = useAccessControl("Transactions");
  const dispatch = useDispatch();
  const location = useLocation();
  const [isEdit, setIsEdit] = useState(false);
  const [callbackFun, setCallbackFun] = useState(() => () => {});
  const { notification_create } = bindActionCreators(NotifiAction, dispatch);
  const [save, setSave] = useState(false);
  const [formNoti, setFormNoti] = useState({});
  const rights = useSelector((state) => state.layout.rights);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [save, setSave] = useState(false);
  const [form, setForm] = useState({});
  const subscriptions = useSelector(
    (state) => state.subscriptions.subscriptions
  );
  const [tableData, setTableData] = useState({
    tableTitle: "All Transactions",
    disableDelete: true,
    column_sum: {
      name: "payment_amount",
      title: "Total Amount ($)",
    },
    tableHead: [
      // {
      // 	id: "name",
      // 	label: "Name",
      // 	link: "/Customer/CustomerDetail/CustomerDetail",
      // 	color: "var(--gradientColor2)"
      // },
      {
        id: "date",
        label: "Payment Date",
        subText: "time",
      },
      {
        id: "user_name",
        label: "Customer Info",
        isSpecial: true,
        align: "left",
        // subText: ""
      },
      {
        id: "plan1",
        label: "Plan",
        isSpecial: true,
        align: "left",
      },
      {
        id: "payment_amount",
        label: "Amount",
        isSpecial: true,
        align: "left",
      },
      {
        id: "payment_id",
        label: "Payment ID",
        subText: "gateway",
      },

      {
        id: "deviceId",
        label: "Device Type",
        subText: "deviceType",
      },
      {
        id: "location",
        label: "Location",
      },
     canEdit&& {
        id: "whatsapp",
        label: "WhatsApp",
        isSpecial: true,
        align: "left",
      },
     canEdit&& {
        id: "notification",
        label: "Notification",
        isSpecial: true,
        align: "center",
      },
      // {
      //   id: "status",
      //   label: "Status",
      //   isButtonDisplay: true,
      // },
    ].filter(Boolean),
    tableBody: [],
    filterColumn: [
      {
        id: "1",
        title: "Plan",
        name: "plan",
        options: ["TVOD", "SVOD"],
        default: location?.state,
      },
      {
        id: "1",
        name: "transaction_type",
        title: "Transaction Type",
        options: ["Advertisement", "SVOD", "Rent"],
      },
    ],
    isDateRangeFilter: "created_at",
  });

  useMemo(() => {
    if (subscriptions?.data) {
      //   const tempArray = ["Free"];
      const temp = tableData;

      temp.filterColumn[0]["options"] = subscriptions?.data?.map(
        (ele) => ele?.plan_name
      );
      setTableData({ ...temp });
    }
  }, [subscriptions]);
  const handleWhatsAppClick = (mobile) => {
    const message = encodeURIComponent("Hi"); // Encode message for URL
    const url = `https://web.whatsapp.com/send?phone=${mobile}&text=${message}`;
    window.open(url); // Open WhatsApp in a new tab
  };
  const transactions = useSelector((state) => state.transactions.transactions);
  useEffect(() => {
    // dispatch(all_transaction_list())
    dispatch(all_subscription_list());
  }, []);
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
  const getTime = (time) => {
    const dateTime = new Date(time); // Correctly parse the date
    return dateTime.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    });
  };
  const getDate = (date) => {
    const dateTime = new Date(date); // Parse the date
    const day = String(dateTime.getDate()).padStart(2, "0");
    const month = String(dateTime.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = dateTime.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useMemo(() => {
    if (transactions?.data) {
      const temp = tableData;
      temp.tableBody = transactions?.data?.map((ele) => ({
        ...ele,
        id: ele?.user,
        payment_status: ele?.status,
        name: ele?.user?.firstName + " " + ele?.user?.lastName,
        deviceId:
          ele?.transaction_type === "Advertisement"
            ? "Advertiser Panel"
            : ele?.deviceId
            ? ele?.deviceId
            : " - ",
        location: ele?.location ? ele?.location : " - ",
        payment_amount: (
          <div style={{color: "var(--themeFontColor)"}}>
            {ele?.usd_payment_amount ? (
              <>
                <p>
                  {ele?.currency_symbol +
                    " " +
                    parseFloat(ele?.payment_amount).toFixed(2)}
                </p>
                <p>{"$ " + parseFloat(ele?.usd_payment_amount).toFixed(2)}</p>{" "}
              </>
            ) : (
              <p>
                {ele?.currency_symbol +
                  " " +
                  parseFloat(ele?.payment_amount).toFixed(2)}
              </p>
            )}
          </div>
        ),
        // payment_amount: parseFloat(ele?.payment_amount).toFixed(2),
        time: getTime(ele?.created_at),
        date: getDate(ele?.created_at),
        user_name: ele?.user ? (
          <Link
            to="/customer/detail"
            state={{ id: ele?.user }}
            style={{ color: "var(--themeFontColor)" }}
          >
            {ele?.mobile_no ? ele?.mobile_no : ele?.email}
          </Link>
        ) : ele?.transaction_type === "Advertisement" ? (
          <span style={{ color: "var(--themeFontColor)" }}>
            <p>{ele?.advertiser?.name} </p>
            <p>{ele?.advertiser?.email} </p>
            <p>{ele?.advertiser?.mobile_number} </p>
          </span>
        ) : (
          <s style={{ color: "var(--themeFontColor)" }}>
            {ele?.mobile_no ? ele?.mobile_no : ele?.email}
          </s>
        ),
        plan1:
          ele?.transaction_type === "Advertisement" ? (
            <>
              <p style={{ color: "var(--themeFontColor)" }}>
                {ele?.transaction_type}
              </p>
              <p style={{ color: "var(--themeFontColor)" }}>
                {"( " + "Views" + " - " + ele?.added_view + " )"}
              </p>
            </>
          ) : ele?.transaction_type == "SVOD" ? (
            <p style={{ color: "var(--themeFontColor)" }}>
              {ele?.plan?.plan_name}
            </p>
          ) : (
            <>
              <p style={{ color: "var(--themeFontColor)" }}>
                {"Rent"}
              </p>
              <span style={{ color: "#dd5107" }}>
                (
                {ele?.content_type == "Series"
                  ? ele?.series?.title
                  : ele?.movie?.title}
                )
              </span>
            </>
          ),
        plan: ele?.plan?.plan_name,
        whatsapp: ele?.user ? (
          <WhatsAppIcon
            style={{ color: "green", height: "50px" }}
            onClick={() => handleWhatsAppClick(ele?.mobile_no)}
          />
        ) : (
          <p style={{ color: "var(--themeFontColor)" }}>-</p>
        ),
        notification: ele?.user ? (
          // <Link
          //   to="/Notifications/CreateNotifications/"
          //   state={{ customer: ele?.user_id, send: "nofitication" }}
          // >
          <img
            src={notification_icon}
            alt="Notifications"
            height={"25px"}
            onClick={() => handleForm(ele?.user)}
            style={{ marginRight: "5px", cursor: "pointer" }}
          />
        ) : (
          // </Link>
          <p style={{ color: "var(--themeFontColor)" }}>-</p>
        ),
      }));
      setTableData({ ...temp });
    }
  }, [transactions]);
  const handleSubmit1 = async () => {
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
  const sendMultiNotification = (id, fun) => {
    handleFormMulti(id, fun);
    // console.log(id , "vdjndjdjdjdjd")
    // setSave(!save)
    // fun([])
  };
  return (
    <>
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
      <ListTable
        tableData={tableData}
        key={"ListTable"}
        setTableData={setTableData}
        isMultiNotificationSend={true}
        sendMultiNotification={sendMultiNotification}
        canEdit={canEdit}
        setForm={setForm}
        setIsEdit={setIsEdit}
        isLoadingData={true}
        loadApi={all_transaction_list}
        totalCount={transactions?.transaction_count}
        total_transaction_amount={transactions?.total_transaction_amount}
      />
    </>
  );
}
