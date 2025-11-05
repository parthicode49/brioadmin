import React from "react";
import { useState, useEffect } from "react";

import Form from "../utils/Form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Action from "../../actions/Advertiser/advertisement";
import { bindActionCreators } from "redux";
import { useAccessControl } from "../utils/useAccessControl";
export default function AdPrice() {
  const { canEdit } = useAccessControl("Setting");
  const user = useSelector((state) => state.layout.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const { advertisement_charge_list, advertisement_charge_update } =
    bindActionCreators(Action, dispatch);

  useEffect(() => {
    const dailyAdPrice = async () => {
      const resData = await advertisement_charge_list();
      console.log(resData, "resData123654");
      if (resData?.data) {
        setForm(resData?.data);
      }
    };
    dailyAdPrice();
  }, []);

  const formStructure = [
    {
      type: "inputBox",
      name: "ad_charge",
      title: "Charge For 1 View",
      regex: /^[0-9\.]+$/,
      maxLength: "6",
      placeholder: "Type Price For 1 View",
      required: true,
    },

    canEdit &&{
      id: "8",
      type: "button",
      title: "Update",
    },
  ].filter(Boolean);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const resData = await advertisement_charge_update(form);
    if (resData?.status === 200) {
      navigate("/Dashboard");
    }
  };

  return (
    <>
      <Form
        formStructure={formStructure}
        handleSubmit={handleSubmit}
        formTitle={"Advertisement Per View Price"}
        key={"Form"}
        setForm={setForm}
        form={form}
      />
    </>
  );
}
