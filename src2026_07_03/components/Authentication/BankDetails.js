import React from "react";
import { useState, useMemo, useEffect } from "react";
import { Country, State } from "country-state-city";
import Form from "../utils/Form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  add_bank_account,
  bank_detail_list,
  get_bank_detail,
} from "../../actions/bankdetails";
import { Alert, Snackbar } from "@mui/material";
import styles from "./Authentication.module.css";

export default function BankDetails() {
  const user = useSelector((state) => state.layout.profile);
  const role = useSelector((state) => state.layout.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  useEffect(() => {
    const data = new FormData();
    data.append("user", user?.id);
    dispatch(bank_detail_list(data));
  }, [user]);
  const [form, setForm] = useState({});
  const getAccountDetails = useSelector(
    (state) => state?.bankDetails?.bankdetails
  );
  const getAccountDetailList = useSelector(
    (state) => state?.bankDetails?.bankdetaillist
  );
  const message_create = useSelector((state) => state.bankDetails.create_msg);

  const [show, setShow] = useState(false);
  const newHAndleSubmit = () => {
    const data = new FormData();
    if (form?.ifsc_code !== undefined) {

      data.append("ifsc_code", form?.ifsc_code);
      dispatch(get_bank_detail(data));
      setShow(true);
    }
  };
  useEffect(() => {
    if (getAccountDetailList !== undefined)
      setForm({
        ...getAccountDetailList?.data[0],
        re_acc_number: getAccountDetailList?.data[0]?.acc_number,
      });
  }, [getAccountDetailList]);

  const [formStructure, setFormStructure] = useState(
	[
    {
      id: "1",
      type: "inputBox",
      title: "IFSC Code",
      name: "ifsc_code",
      size: "6",
      maxLength: "11",
      //   regex: /^[A-Z0-9]+$/,
      isCaps: true,
      required: true,
    },
    {
      id: "2",
      type: "button",
      title: "Verify",
      align: "left",
      noBg: true,
      size: "6",
      // padding: "2px 2px",
      forceShow: true,
      //   handleClick: (e) => {

      //   },
    },
    {
      id: "3",
      type: "inputBox",
      title: "Bank Name",
      name: "bank_name",
      size: "6",
      required: true,
      disabled: true,
      // display:"none"
    },
    {
      id: "4",
      type: "inputBox",
      title: "Branch Name",
      name: "branch_name",
      size: "6",
      required: true,
      disabled: true,
      // display:"none"
    },
    {
      id: "5",
      type: "inputBox",
      title: "Address",
      name: "bank_address",
      size: "6",
      required: true,
      disabled: true,
      // display:"none"
    },
    {
      id: "6",
      type: "inputBox",
      title: "MICR No",
      name: "micr_no",
      size: "6",
      required: true,
      disabled: true,
      // display:"none"
    },
    {
      id: "7",
      type: "inputBox",
      title: "Account Holder's Name",
      name: "acc_holder_name",
      size: "6",
      isCaps: true,
      required: true,
      // display:"none"
    },
    {
      id: "8",
      type: "inputBox",
      title: "Account Number",
      name: "acc_number",
      regex: /^[0-9]+$/,
      size: "6",
      required: true,
      // display:"none"
    },
    {
      id: "9",
      type: "inputBox",
      title: "Re-enter Account Number",
      name: "re_acc_number",
      regex: /^[0-9]+$/,
      size: "6",
      required: true,
      // display:"none"
    },
    {
      id: "10",
      type: "button",
      title: "Submit",
      // display:"none"
    },
  ]);

  useMemo(() => {
    if (getAccountDetails !== undefined) {
      setForm({
        ...form,
        bank_name: getAccountDetails?.data?.BANK,
        branch_name: getAccountDetails?.data?.BRANCH,
        bank_address: getAccountDetails?.data?.ADDRESS,
        micr_no: getAccountDetails?.data?.MICR,
      });
    }
    // else
    // {
    // 	setForm({
    // 		...form,bank_name:"",branch_name:"",bank_address:"",micr_no:""
    // 	})
    // }
  }, [getAccountDetails]);

  useMemo(() => {
    if (form?.ifsc_code !== undefined) {
      const temp = formStructure;
      temp[1]["handleClick"] = newHAndleSubmit;
      setFormStructure([...temp]);
    }
  }, [form?.ifsc_code]);
  useMemo(() => {
    if (getAccountDetails?.data == []) {
      const temp = formStructure;
      temp[2]["display"] = "none";
      temp[3]["display"] = "none";
      temp[4]["display"] = "none";
      temp[5]["display"] = "none";
      temp[6]["display"] = "none";
      temp[7]["display"] = "none";
      temp[8]["display"] = "none";
      temp[9]["display"] = "none";
      setFormStructure([...temp]);
    }
  }, [form, getAccountDetails]);
  useMemo(() => {
    if (show && form?.acc_number !== "") {
      const temp = formStructure;
      temp[2]["display"] = "block";
      temp[3]["display"] = "block";
      temp[4]["display"] = "block";
      temp[5]["display"] = "block";
      temp[6]["display"] = "block";
      temp[7]["display"] = "block";
      temp[8]["display"] = "block";
      temp[9]["display"] = "block";
      setFormStructure([...temp]);
    }
  }, [show]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    if (form?.acc_number == form?.re_acc_number) {
      Object.keys(form).map((key) => data.append(key, form?.[key]));
      data.append("user", user?.id);
      dispatch(add_bank_account(data));
      // navigate("/Dashboard");
    } else {
      setOpen1(true);
    }
  };
  useMemo(() => {
    if (message_create?.statuscode == 200) {
      setOpen(true);
      navigate("/Dashboard");
    }
  }, [message_create]);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  return (
    <>
      <div style={{ padding: "2% 20%" }} className={styles.SingInForm}>
        <Form
          formStructure={formStructure}
          handleSubmit={handleSubmit}
          formTitle={"Bank Details"}
          key={"Form"}
          setForm={setForm}
          form={form}
        />

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert severity="info" variant="filled" color="success">
            {getAccountDetails?.data}
          </Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open1}
          autoHideDuration={3000}
          onClose={handleClose1}
        >
          <Alert severity="info" variant="filled" color="success">
            Account Number Dose Not Match
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}
