import React from "react";
import { useState, useMemo, useEffect } from "react";

import Form from "../utils/Form";
import * as Action from "../../actions/Setting/user_subscription";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { all_subscription_list } from "../../actions/subscription";
import { Alert, Snackbar } from "@mui/material";
export default function UserSubscription() {
  const user = useSelector((state) => state.layout.profile);
  const [openAdError, setOpenAdError] = useState(false);
  const [content, setPopupContent] = useState("");

  const dispatch = useDispatch();
  const { transaction_create, user_subscription_by_admin } = bindActionCreators(
    Action,
    dispatch
  );
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const subscriptions = useSelector(
    (state) => state?.subscriptions?.subscriptions
  );
  const [formStructure, setFormStructure] = useState([
    {
      id: "1",
      type: "select",
      title: "User Type",
      name: "user_type",
      // disabled: isEdit ? true : false,
      options: [
        "Email",
        // "TVOD",
        "Mobile Number",
      ],
      required: true,
    },

    {
      id: "2",
      type: "inputBox",
      title: "Email ID",
      variant: "email",
      name: "email",
      display: "none",
      // required: true,
    },
    {
      id: "3",
      type: "phone",
      title: "Mobile Number",
      maxLength: 12,
      name: "mobileNumber",
      display: "none",
      required: true,
    },
    {
      id: "4",
      type: "select_id",
      title: "Plan",
      name: "plan",
      options: [{}],
      required: true,
    },

    {
      id: "5",
      type: "button",
      title: "Submit",
    },
  ]);
  useEffect(() => {
    dispatch(all_subscription_list());
  }, []);
  useMemo(() => {
    if (subscriptions?.statuscode == 200) {
      const temp = formStructure;
      temp[3]["options"] = subscriptions?.data?.map((ele) => ({
        label: ele?.plan_name,
        value: ele?.id,
      }));
      setFormStructure([...temp]);
    }
  }, [subscriptions]);
  useMemo(() => {
    if (form?.user_type == "Email") {
      const temp = formStructure;
      temp[1]["display"] = "block";
      temp[2]["display"] = "none";
      setFormStructure([...temp]);
    } else if (form?.user_type == "Mobile Number") {
      const temp = formStructure;
      temp[1]["display"] = "none";
      temp[2]["display"] = "block";
      setFormStructure([...temp]);
    } else {
      const temp = formStructure;
      temp[1]["display"] = "none";
      temp[2]["display"] = "none";
      setFormStructure([...temp]);
    }
  }, [form?.user_type]);
  const handleSubmit = async (event) => {
    event.preventDefault();

    // data.append("id", aboutus?.id);
    // data.append("user", user?.id);
    // dispatch(about_us_update(data));
    // navigate("/Dashboard");
    const resData = await user_subscription_by_admin(form);
    if (resData?.statuscode == 200) {
      const recData = await transaction_create(resData?.data);
      setOpenAdError(true);
      setPopupContent(recData?.message);
      setForm({user_type:"" , email :"" , mobileNumber : "" , plan:""});
    } else {
      setOpenAdError(true);
      setPopupContent(resData?.message);
    }
  };
  const handleClose = () => {
    setOpenAdError(false);
  };
  return (
    <>
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
      <Form
        formStructure={formStructure}
        handleSubmit={handleSubmit}
        formTitle={"User Subsciption"}
        key={"Form"}
        setForm={setForm}
        form={form}
      />
    </>
  );
}
