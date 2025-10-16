import React from "react";
import Form from "../utils/Form";
import { distributor_create } from "../../actions/distributor";
import { useMemo } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { advertiser_create } from "../../actions/Advertiser/advertiser";
import {MESSAGE} from "../../constants/actionTypes.js"
import "./Authentication.css";
import styles from "./Authentication.module.css";

import { useNavigate } from "react-router-dom";
 const RegisterForm = () => {
  const [form, setForm] = useState({role_user:"Distributor"});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [formTitle ,setFormTitle] =  useState("Register as Distributor")

  const message = useSelector((state) => state.layout.message);

  const [formStructure, setFormStructure] = useState([
    {
      type: "Image",
    },
    {
      type: "titleLine",
      title: "Register As?",
      textAlign: "right",
      size: "2",
    },
    {
      id: "20",
      type: "toggle",
      // title: "Register as a",
      name: "role_user",
      default: "Distributor",
      size: "4",
      options: [
        { value: "Distributor", color: "success" },
        { value: "Advertisers", color: "success" },
      ],
    },
    {
      id: "5",
      type: "inputBox",
      title: "Company Name",
      name: "company_name",
      required: true,
    },
    {
      id: "5",
      type: "inputBox",
      title: "Distributor Name",
      name: "name",
      required: true,
    },
    {
      id: "5",
      type: "inputBox",
      title: "Email ID",
      variant: "email",
      size:"3",
      name: "email",
      required: true,
    },
    {
      id: "4",
      type: "phone",
      title: "Mobile Number",
      maxLength: 12,
      name: "mobileNumber",
      size:"3",
      required: true,
    },
    {
      id: "1",
      type: "inputBox",
      name: "GST",
      title: "GST No",
      size:"3",
      // required: true
    },

    {
      id: "2",
      type: "inputBox",
      title: "Address",
      name: "address",
      required: true,
      size:"3",
    },
   
    {
      id: "4",
      type: "inputBox",
      title: "Alternate Person Name",
      name: "contact_person_name",
      // required: true,
      size:"4"
    },
    {
      id: "4",
      type: "phone",
      title: "Alternate Person Number",
      maxLength: 12,
      name: "contact_person_number",
      // required: true/,
      size:"4"
    },
    {
      id: "2",
      type: "image",
      title: "Company Logo",
      required: true,
      name: "company_logo",
      size:"4"
    },
    // {
    //   id: "10",
    //   type: "undefined",
    //   size: "3",
    // },

    {
      id: "8",
      type: "button",
      title: "Create",
      // disabled: false,
    },
    {
      id: "9",
      type: "BackBtn",
      align: "center",
    },
  ]);

  useMemo(() => {
    const temp = formStructure;
    if (form?.countryCode == "+91" || form?.countryCode == undefined) {
      temp[6]["title"] = "GST No";
    } else temp[6]["title"] = "Registration No";

    setFormStructure([...temp]);
  }, [form?.countryCode]);
  useMemo(()=>{
    const temp = formStructure
    if(form?.role_user == "Advertisers"){
      temp[4]["title"] = "Advertiser Name"
      // setFormTitle("Register as an Advertiser")
      setFormStructure([...temp])
    }else{
      temp[4]["title"] = "Distributor Name"
      // setFormTitle("Register as Distributor")
      setFormStructure([...temp])
    }
    setForm({role_user:form?.role_user})
  },[form?.role_user])

  const handleSubmit = (event) => {
    event.preventDefault();

    const tempForm = form;
    const temp = formStructure;

    // temp[15]["disabled"] = true
    // setTimeout(() => {
    //   temp[15]["disabled"] = false
    // }, 3000)
    tempForm["username"] = form?.mobileNumber.slice(
      form?.countryCode?.length - 1
    );
    tempForm["tempmobileNumber"] = form?.mobileNumber;
    tempForm["mobileNumber"] = form?.mobileNumber.slice(
      form?.countryCode?.length - 1
    );
    setForm({ ...tempForm });

    const data = new FormData();
    Object.keys(form).map((key) => data.append(key, form?.[key]));
    // data.append("user", user?.id);
    // formStructure.map((element) => {
    //   if (element.type == "image" && form?.[element.name] && typeof (form?.[element.name]) != "string") {
    //     const temp = form;
    //     temp["temp" + element.name] = form?.[element.name];
    //     temp[element.name] = URL.createObjectURL(form?.[element.name]);

    //     setForm({
    //       ...temp,
    //     });
    //   }
    // });
      if(form?.role_user !== undefined){
        if (form?.role_user == "Advertisers") {
          dispatch(advertiser_create(data));
        } else {
          dispatch(distributor_create(data));
        }
      }
    
  };
  useMemo(() => {
    if (message?.statuscode == 200) {
      dispatch({type:MESSAGE,payload:null})
      setTimeout(() => {
        navigate("/Authentication/SignIn");
      }, 900);
    }
  }, [message]);

  return (
    <div style={{ padding: "2% 20%" }} className={styles.SingInForm}>
      <Form
        formStructure={formStructure}
        handleSubmit={handleSubmit}
        // formTitle={formTitle}
        key={"Form"}
        form={form}
        setForm={setForm}

        // isEdit={isEdit}
        // setIsEdit={setIsEdit}
      />
    </div>
  );
};

export default RegisterForm;
