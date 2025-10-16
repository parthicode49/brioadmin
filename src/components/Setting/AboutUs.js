import React from "react";
import { useState, useMemo, useEffect } from "react";

import Form from "../utils/Form";
import { about_us, about_us_update } from "../../actions/Setting/about_us";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function AboutUs() {
  const user = useSelector((state) => state.layout.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  useEffect(() => {
    dispatch(about_us());
  }, []);
  const aboutus = useSelector((state) => state.setting?.aboutus?.data[0]);

  useMemo(() => {
    setForm({ ...aboutus });
  }, [aboutus]);

  const formStructure = [
    {
      id: "5",
      type: "inputBox",
      title: "Email ID",
      variant: "email",
      name: "email",
      required: true,
    },
    {
      id: "4",
      type: "mobile",
      title: "Mobile Number",
    //   maxLength: 12,
      name: "mobileNumber",
      // required: true,
    },
    {
      id: "5",
      type: "inputBox",
      title: "App Version",
      name: "app_version",
      // required: true,
    },
    {
      id: "5",
      type: "inputBox",
      title: "Ownership",
      name: "ownership",
      // required: true,
    },
    {
      id: "5",
      type: "inputBox",
      title: "Developed By",
      name: "developed_by",
      // required: true,
    },
    {
      id: "5",
      type: "inputBox",
      title: "Website URL",
      name: "website_link",
      // required: true,
    },
    {
      id: "1",
      type: "description",
      name: "description",
      title: "",
      limit: "2000",
    },

    {
      id: "2",
      type: "inputBox",
      title: "Facebook URL",
      name: "facebook_url",
    },
    {
      id: "2",
      type: "inputBox",
      title: "Linkedln URL",
      name: "linkedln_url",
    },
    {
      id: "2",
      type: "inputBox",
      title: "Youtube URL",
      name: "youtube_url",
    },
    {
      id: "2",
      type: "inputBox",
      title: "Instagram URL",
      name: "instagram_url",
    },

    {
      id: "8",
      type: "button",
      title: "Update",
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();

    Object.keys(form).map((key) => data.append(key, form?.[key]));

    data.append("id", aboutus?.id);
    data.append("user", user?.id);
    dispatch(about_us_update(data));
    navigate("/Dashboard");
  };

  return (
    <>
      <Form
        formStructure={formStructure}
        handleSubmit={handleSubmit}
        formTitle={"About Us"}
        key={"Form"}
        setForm={setForm}
        form={form}
      />
    </>
  );
}
