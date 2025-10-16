import React from "react";
import { useState, useMemo, useEffect } from "react";
import ListTable from "../../utils/Table";
import Export from "../../utils/Export";
import {
  customer_delete,
  customer_update,
  all_customer_list,
} from "../../../actions/customer";
import { all_subscription_list } from "../../../actions/subscription";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import notification_icon from "../../../images/notification_icon.png";
import {
  all_payment_provider_list,
  payment_provider_update,
} from "../../../actions/Masters/paymentGateway";
import { Button } from "@mui/material";
import PopupForm from "../../utils/PopupForm";

export default function PaymentGateWay() {
  const dispatch = useDispatch();
  const rights = useSelector((state) => state.layout.rights);
  const user = useSelector((state) => state.layout.profile);

  const [openPopUp, setOpenPopUp] = useState(false);
  const [tableData, setTableData] = useState({
    tableTitle: "Patment Gateway",
    // deleteRecord: customer_delete,
    disableDelete: true,

    // updateRecord: customer_update,
    // deleteAccess: rights?.["Customers"]?.["delete"],
    onDeleteText: "Are you sure want to delete this customer?",
    customisedStatusUpdateMessage: true,
    onActiveText: "Are you sure you want to activate this customer?",
    onInactiveText: [
      "Are you sure you want to inactivate this customer? ",
      "The customer will no longer be logged into the system once you inactivate it.",
    ],
    tableHead: [
      {
        id: "payment_provider",
        label: "Payment Gateway",
        // link: "/Customer/CustomerDetail/CustomerDetail",
        color: "var(--gradientColor2)",
      },
      // {
      //   id: "payment_key",
      //   label: "Payment Gateway Key",
      //   // subText: "email",
      // },
      {
        id: "payment_provider_image",
        label: "Image",
        isImage: true,
      },
      {
        id: "is_available_for_web",
        label: "Is Active For Web ?",
        isSpecial: true,
        align: "left",
      },
      {
        id: "is_available_for_app",
        label: "Is Active For App ?",
        isSpecial: true,
        align: "left",
      },
      {
        id: "update",
        label: "Update",
        isSpecial: true,
        align: "left",
      },
      // {
      //   id: "userLocation",
      //   label: "Location",
      // },
      // {
      //   id: "created_at",
      //   label: "Registered On",
      // },
      // {
      //   id: "notification",
      //   label: "Notification",
      //   isSpecial: true,
      //   align: "center",
      // },
      // {
      //   id: "status",
      //   label: "Status",
      // },
    ],
    tableBody: [],
    filterColumn: [],
    // isDateRangeFilter: "created_at",
  });

  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({});
  const PaymentGateWay = useSelector((state) => state.masters.payment_gayeway);
  // console.log(PaymentGateWay, "paymentGateWay");
  const message = useSelector((state) => state.layout.message);

  useEffect(() => {
    dispatch(all_payment_provider_list());
  }, []);

  const handleWeb = (value) => {
    if (value == "yes") {
      dispatch(payment_provider_update());
    }
  };
  const handleEdit = (ele) => {
    setOpenPopUp(true);
    // console.log("Checking", ele);
    setForm(ele);
  };
  useMemo(() => {
    if (PaymentGateWay?.statuscode == 200) {
      const temp = tableData;
      temp.tableBody = PaymentGateWay?.data?.map((ele) => ({
        ...ele,
        update: (
          <Button
            onClick={() => handleEdit(ele)}
            style={{
              background: "rgba(235, 97, 6, 0.1)",
              color: "#e34e2c",
              padding: "5px 13px",
              borderRadius: "4px",
            }}
          >
            {" "}
            Update{" "}
          </Button>
        ),
        is_available_for_app: (
          <span
            style={
              ele?.is_available_for_app == "Yes"
                ? {
                    background: "rgba(0, 182, 155, 0.1)",
                    color: "var(--successColor)",
                    padding: "5px 13px",
                    borderRadius: "4px",
                  }
                : {
                    background: "rgba(238, 54, 140, 0.1)",
                    color: "var(--dangerColor)",
                    padding: "5px 13px",
                    borderRadius: "4px",
                  }
            }
          >
            {" "}
            {ele?.is_available_for_app}{" "}
          </span>
        ),
        is_available_for_web: (
          <span
            style={
              ele?.is_available_for_web == "Yes"
                ? {
                    background: "rgba(0, 182, 155, 0.1)",
                    color: "var(--successColor)",
                    padding: "5px 13px",
                    borderRadius: "4px",
                  }
                : {
                    background: "rgba(238, 54, 140, 0.1)",
                    color: "var(--dangerColor)",
                    padding: "5px 13px",
                    borderRadius: "4px",
                  }
            }
          >
            {" "}
            {ele?.is_available_for_web}{" "}
          </span>
        ),

        //   subscription: ele?.subscription?.plan_name||"Free",
        //   mobile: ele?.mobileNumber !== null ? ele?.mobileNumber : " - ",
        //   socialType1:
        //     ele?.socialType == "Google"
        //       ? "Gmail"
        //       : ele?.socialType == "AppleID"
        //       ? "AppleID"
        //       : ele?.socialType == null
        //       ? "Mobile"
        //       : "WhatsApp",
        // notification: <Link to='/Notifications/CreateNotifications/' state={{customer: ele?.id,send :"nofitication"}}><img src={notification_icon} alt="Notifications" height={"25px"} style={{marginRight:"5px"}} /></Link>
      }));
      setTableData({ ...temp });
    }
  }, [PaymentGateWay]);

  const [formStructure, setFormStructure] = useState([
    {
      id: "1",
      type: "inputBox",
      title: "Payment Provider",
      name: "payment_provider",
      required: true,
      disabled: true,
      size: "12",
    },
    {
      id: "2",
      type: "lockedInput",
      title: "Payment Key",
      name: "payment_key",
      required: true,
      size: "12",
    },
    {
      id: "3",
      type: "lockedInput",
      title: "Payment Secret Key",
      name: "secret_key",
      required: true,
      size: "12",
    },
    {
      id: "4",
      type: "lockedInput",
      title: "Merchant Id",
      name: "merchant_id",
      required: true,
      size: "12",
    },
    {
      id: "5",
      type: "lockedInput",
      title: "Upi Id",
      name: "upi_id",
      required: true,
      size: "12",
    },
    {
      id: "6",
      type: "toggle",
      title: "Is Active For App ?",
      name: "is_available_for_app",
      // default: "Yes",
      size: "6",

      options: [
        { value: "Yes", color: "success" },
        { value: "No", color: "danger" },
      ],
    },
    {
      id: "7",
      type: "toggle",
      title: "Is Active? For Web?",
      name: "is_available_for_web",
      // default: "Yes",
      size: "6",

      options: [
        { value: "Yes", color: "success" },
        { value: "No", color: "danger" },
      ],
    },
    {
      id: "12",
      type: "image",
      title: "Upload Product Image",
      name: "payment_provider_image",
      // subtitle: "(Resolution : 512px x 512px) *",
      // subsubtitle: "Max File Size 1MB",
      // subsubsubtitle: "Support only JPG,PNG,JPEG",
      size: "12",
      required: true,
    },

    {
      id: "8",
      type: "button",
      title: "Submit",
    },
  ]);

  useMemo(() => {
    if (form?.payment_provider == "") {
      const temp = formStructure;
      temp[1]["display"] = "none";
      temp[2]["display"] = "none";
      temp[3]["display"] = "block";
      temp[4]["display"] = "block";
      setFormStructure([...temp]);
    } else if (
      form?.payment_provider == "Razor Pay" ||
      form?.payment_provider == "EaseBuzz" ||
      form?.payment_provider == "Cash Free"
    ) {
      const temp = formStructure;
      temp[1]["display"] = "block";
      temp[2]["display"] = "block";
      temp[3]["display"] = "none";
      temp[4]["display"] = "none";
      setFormStructure([...temp]);
    } else if (
      form?.payment_provider == "One UPI" ||
      form?.payment_provider == "GPAY" ||
      form?.payment_provider == "OnePay"
    ) {
      const temp = formStructure;
      temp[1]["display"] = "none";
      temp[2]["display"] = "none";
      temp[3]["display"] = "none";
      temp[4]["display"] = "block";
      setFormStructure([...temp]);
    }  else if (
      form?.payment_provider == "Phone Pay" 

    ) {
      const temp = formStructure;
      temp[1]["display"] = "none";
      temp[2]["display"] = "block";
      temp[3]["display"] = "block";
      temp[4]["display"] = "none";
      setFormStructure([...temp]);
    }
  }, [form]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    Object.keys(form)?.map((key) => data.append(key, form?.[key]));
    data.append("user", user?.id);

    dispatch(payment_provider_update(data));
    setForm({});
    setOpenPopUp(false);
  };
  // useMemo(() => {
  //   const temp = formStructure;
  //   temp[0][9].handlePopUp = handleCastAdd;
  //   setFormStructure([...temp]);
  // }, []);
  useMemo(() => {
    if (message?.statuscode == 200) {
      dispatch(all_payment_provider_list());
    }
  }, [message]);

  return (
    <>
      <Export
        fileName={"Payment Gate Way"}
        access={rights?.["Customers"]?.["export_excel"] == "true"}
        exportData={tableData?.exportData || tableData?.tableBody}
        headings={tableData.tableHead?.map((value) => value.label)}
      />
      <PopupForm
        open={openPopUp}
        setOpen={setOpenPopUp}
        // content={content}
        formStructure={formStructure}
        handleSubmit={handleSubmit}
        formTitle={"Payment Gateway"}
        key={"Form"}
        setForm={setForm}
        form={form}
        // tableData={tableData}
        // setTableData={setTableData}
        // isEdit={isEdit}
        // setIsEdit={setIsEdit}
      />

      <ListTable
        tableData={tableData}
        key={"ListTable"}
        setForm={setForm}
        setTableData={setTableData}
        setIsEdit={setIsEdit}
      />
    </>
  );
}
