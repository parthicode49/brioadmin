import React from "react";
import { useState, useMemo, useEffect } from "react";
import { Country, State } from "country-state-city";
import Form from "../utils/Form";
import { all_distributor_list, distributor_update } from "../../actions/distributor";
import { advertiser_update, all_advertiser_list } from "../../actions/Advertiser/advertiser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  add_bank_account,
  bank_detail_list,
  get_bank_detail,
} from "../../actions/bankdetails";
import { Alert, Snackbar } from "@mui/material";

import MultiStepForm from "../utils/MultiStepForm";
import { all_producer_list, producer_update } from "../../actions/producer";
export default function Profile() {
  const user = useSelector((state) => state.layout.profile);

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const country_list = {};
  Country.getAllCountries().map(
    (value) => (country_list[JSON.stringify(value?.name)] = value?.isoCode)
  );

  const role = useSelector((state) => state.layout.role);

  const producers = useSelector((state) => state.producer.producers?.data?.[0]);
  const distributors = useSelector((state) => state.distributors.distributors?.data);
	const advertisers = useSelector((state) => state.advertisers.advertisers?.data);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({});
  const [formAD, setFormAD] = useState({}); 
  const getAccountDetailList = useSelector(
    (state) => state?.bankDetails?.bankdetaillist
  );

  const message = useSelector((state) => state.layout.message);

  useEffect(() => {
    if (role == "Advertiser") setFormAD({ ...advertisers });
    else if (role == "Producer") setForm({ ...producers ,  ...getAccountDetailList?.data[0], re_acc_number: getAccountDetailList?.data[0]?.acc_number });
    
    else if (role == "Distributor") setForm({ ...distributors ,...getAccountDetailList?.data[0], re_acc_number: getAccountDetailList?.data[0]?.acc_number });

    else setForm({ ...user });

  }, [advertisers, distributors,producers,getAccountDetailList, user ,role]);
  // const aboutus=useSelector((state)=>state.setting?.aboutus)
  // useMemo(()=>{
  // 	setForm({...aboutus})
  // },[aboutus])

  useEffect(() => {
    const data = new FormData();
    data.append("user", user?.id);
    dispatch(bank_detail_list(data));
    if(role == "Producer"){

      dispatch(all_producer_list({user:user?.id}))
    } else if(role == "Distributor"){

      dispatch(all_distributor_list(data))
    } else if(role =="Advertiser" ){

      dispatch(all_advertiser_list(data))
    }
  }, [user ,role]);
  const getAccountDetails = useSelector(
    (state) => state?.bankDetails?.bankdetails
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
  const formTitle = [
    "Personal Details",
    "Bank Details",
    // role != "Distributor" && "Advertisement Details",
  ].filter((e) => e);

  // useEffect(() => {
  //   if (getAccountDetailList !== undefined)
  //     setForm({
  //       ...form,
  //       ...getAccountDetailList?.data[0],
  //       re_acc_number: getAccountDetailList?.data[0]?.acc_number,
  //     });
  // }, [getAccountDetailList]);
  const [formStructure, setFormStructure] = useState([
    [
      {
        id: "1",
        type: "inputBox",
        title: "Company Name",
        name: "company_name",
        required: true,
        disabled: true,
      },
      {
        id: "2",
        type: "inputBox",
        title: role == "Advertiser" ? "Advertisers Name" : "Distributor Name",
        name: "name",
        required: true,
        disabled: true,
      },
      {
        id: "3",
        type: "inputBox",
        title: "Email ID",
        variant: "email",
        disabled: true,

        name: "email",
        required: true,
      },
      {
        id: "4",
        type: "phone",
        title: "Mobile Number",
        maxLength: 12,
        name: "mobileNumber",

        required: true,
      },
      {
        id: "5",
        type: "inputBox",
        name: "GST",
        title: "GST No",
        required: true,
        disabled: true,
      },

      {
        id: "6",
        type: "inputBox",
        title: "Address",
        name: "address",
      },
      // {
      //   id: "2",
      //   type: "inputBox",
      //   title: "Pay per view price (Paisa)",
      //   name: "commission",
      //   //   options: ["10", "20", "30", "40", "50", "60", "70", "80", "90"],
      //   required: true,
      //   disabled: true,
      // },

      {
        id: "7",
        type: "hr",
      },
      {
        id: "8",
        type: "headind_ad",
        title: "Contact Person Details ",
      },
      {
        id: "9",
        type: "hr2",
      },

      {
        id: "10",
        type: "inputBox",
        title: "Contact Person Name",
        name: "contact_person_name",
        required: true,
      },
      {
        id: "11",
        type: "phone2",
        title: "Contact Person Number",
        maxLength: 12,
        name: "contact_person_number",
        required: true,
      },
      {
        id: "12",
        type: "inputBox",
        title: "Contact Person Email",
        variant: "email",
        name: "contact_person_email",
        // required: true,
        display :"none"
      },
      {
        id: "13",
        type: "image",
        title: "Company Registration Certificate",
        name: "company_register_certificate",
        accept: ".pdf",
      },
      {
        id: "14",
        type: "image",
        title: "Company Logo",
        name: "company_logo",
      },
      {
        id: "15",
        type: "image",
        title: "Contract Agreement",
        name: "contract_agreement",
        accept: ".pdf",
      },

      {
        id: "16",
        type: "button",
        title: "Update",
      },
    ],
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
        maxLength:"15"
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
        maxLength:"15"
        // display:"none"
      },
      {
        id: "10",
        type: "button",
        title: "Submit",
        // display:"none"
      },
    ],
  ]);
  const [formStructureAD, setFormStructureAD] = useState([
    {
      id: "1",
      type: "inputBox",
      title: "Company Name",
      name: "company_name",
      required: true,
      disabled: true,
    },
    {
      id: "2",
      type: "inputBox",
      title: role == "Advertiser" ? "Advertisers Name" : "Distributor Name",
      name: "name",
      required: true,
      disabled: true,
    },
    {
      id: "3",
      type: "inputBox",
      title: "Email ID",
      variant: "email",
      disabled: true,

      name: "email",
      required: true,
    },
    {
      id: "4",
      type: "phone",
      title: "Mobile Number",
      maxLength: 12,
      name: "mobileNumber",

      required: true,
    },
    {
      id: "5",
      type: "inputBox",
      name: "GST",
      title: "GST No",
      required: true,
      disabled: true,
    },

    {
      id: "6",
      type: "inputBox",
      title: "Address",
      name: "address",
    },
    // {
    //   id: "2",
    //   type: "inputBox",
    //   title: "Pay per view price (Paisa)",
    //   name: "commission",
    //   //   options: ["10", "20", "30", "40", "50", "60", "70", "80", "90"],
    //   required: true,
    //   disabled: true,
    // },

    {
      id: "7",
      type: "hr",
    },
    {
      id: "8",
      type: "headind_ad",
      title: "Contact Person Details ",
    },
    {
      id: "9",
      type: "hr2",
    },

    {
      id: "10",
      type: "inputBox",
      title: "Contact Person Name",
      name: "contact_person_name",
      required: true,
    },
    {
      id: "11",
      type: "phone2",
      title: "Contact Person Number",
      maxLength: 12,
      name: "contact_person_number",
      required: true,
    },
    

    {
      id: "12",
      type: "image",
      title: "Company Registration Certificate",
      name: "company_register_certificate",
      accept: ".pdf",
    },
    {
      id: "13",
      type: "image",
      title: "Company Logo",
      name: "company_logo",
    },
    {
      id: "14",
      type: "image",
      title: "Contract Agreement",
      name: "contract_agreement",
      accept: ".pdf",
    },

    {
      id: "15",
      type: "button",
      title: "Update",
    },
  ]);

  useMemo(() => {
   if(role === "Producer"){
      const temp = formStructure;
      temp[0][0]["title"] = "Production Company Name";
      temp[0][1]["title"] = "Producer Name";
      temp[0][5]["display"] = "none"
      temp[0][10]["display"] = "none"
      temp[0][11]["display"] = "block"

      temp[0][12]["display"] = "none"
      temp[0][14]["display"] = "none"

      setFormStructure([...temp]);
    } else {
      const temp = formStructure;
      temp[0][6]["display"] = "block";
      temp[0][11]["display"] = "none"
      setFormStructure([...temp]);
    }
  }, [role]);
  useMemo(() => {
    if (getAccountDetails !== undefined) {
      setForm({
        ...form,
        bank_name: getAccountDetails?.data?.BANK,
        branch_name: getAccountDetails?.data?.BRANCH,
        bank_address: getAccountDetails?.data?.ADDRESS,
        micr_no: getAccountDetails?.data?.MICR,
      });
    } else {
      setForm({
        ...form,
        bank_name: "",
        branch_name: "",
        bank_address: "",
        micr_no: "",
      });
    }
  }, [getAccountDetails]);

  useMemo(() => {
    if (form?.ifsc_code !== undefined) {
      const temp = formStructure;
      temp[1][1]["handleClick"] = newHAndleSubmit;
      setFormStructure([...temp]);
    }
  }, [form?.ifsc_code]);
  useMemo(() => {
    if (getAccountDetails?.data == []) {
      const temp = formStructure;
      temp[1][2]["display"] = "none";
      temp[1][3]["display"] = "none";
      temp[1][4]["display"] = "none";
      temp[1][5]["display"] = "none";
      temp[1][6]["display"] = "none";
      temp[1][7]["display"] = "none";
      temp[1][8]["display"] = "none";
      temp[1][9]["display"] = "none";
      setFormStructure([...temp]);
    }
  }, [form, getAccountDetails]);
  useMemo(() => {
    if (show && form?.acc_number !== "") {
      const temp = formStructure;
      temp[1][2]["display"] = "block";
      temp[1][3]["display"] = "block";
      temp[1][4]["display"] = "block";
      temp[1][5]["display"] = "block";
      temp[1][6]["display"] = "block";
      temp[1][7]["display"] = "block";
      temp[1][8]["display"] = "block";
      temp[1][9]["display"] = "block";
      setFormStructure([...temp]);
    }
  }, [show]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    const dataAd = new FormData();
    Object.keys(form)?.map((key) => data.append(key, form?.[key]));
    Object.keys(formAD)?.map((key) => dataAd.append(key, formAD?.[key]));
    data.append("user", user?.id);
    data.append("bank_id" ,getAccountDetails?.data == [] ? "null" : getAccountDetailList?.data[0]?.id )
    dataAd.append("user", user?.id);

    if (role == "Advertiser") {
      dispatch(advertiser_update(dataAd));
      setTimeout(() => {
        navigate("/Dashboard");
      }, 1000);
    }
    if ( role != "Advertiser" && form?.acc_number == form?.re_acc_number) {
      if (role == "Producer") {
        dispatch(producer_update(data));
        dispatch(add_bank_account(data));
        setTimeout(() => {
          navigate("/Dashboard");
        }, 1000);
      } else if (role == "Distributor") {
        dispatch(distributor_update(data));
        dispatch(add_bank_account(data));
        setTimeout(() => {
          navigate("/Dashboard");
        }, 1000);
      }
    } else {
      setOpen1(true);
    }
  };
  useMemo(() => {
    if (message?.statuscode == 200) {
      const data = new FormData();
    data.append("user", user?.id);
    if(role == "Producer"){
      dispatch(bank_detail_list(data));
      dispatch(all_producer_list({user:user?.id}))
    }else if(role == "Distributor"){
      dispatch(all_distributor_list(data))
      dispatch(bank_detail_list(data));

    } else if(role == "Advertiser" ){
      dispatch(all_advertiser_list(data))
    }
    }
  }, [message,role]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  return (
    <>
      { role != "Advertiser" &&
      <MultiStepForm
        formStructure={formStructure}
        handleSubmit={handleSubmit}
        formTitle={formTitle}
        key={"Form"}
        setForm={setForm}
        form={form}
      />}
       { role == "Advertiser" &&
      <Form
        formStructure={formStructureAD}
        handleSubmit={handleSubmit}
        formTitle={"Profile"}
        key={"Form"}
        setForm={setFormAD}
        form={formAD}
      />}
      { role != "Advertiser" &&<Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert severity="info" variant="filled" color="success">
          {getAccountDetails?.data}
        </Alert>
      </Snackbar>}
     {  role != "Advertiser" &&<Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open1}
        autoHideDuration={3000}
        onClose={handleClose1}
      >
        <Alert severity="info" variant="filled" color="success">
          Account Number Dose Not Match
        </Alert>
      </Snackbar>}
    </>
  );
}
