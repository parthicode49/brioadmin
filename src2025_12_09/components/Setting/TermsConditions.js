import React from "react";
import { useState, useMemo, useEffect } from "react";

import Form from "../utils/Form";
import {
  terms_and_conditions,
  terms_and_conditions_update,
} from "../../actions/Setting/terms_conditions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAccessControl } from "../utils/useAccessControl";
export default function TermsConditions() {
  const { canEdit } = useAccessControl("Setting");
  const user = useSelector((state) => state.layout.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  useEffect(() => {
    dispatch(terms_and_conditions());
  }, []);
  const termsconditions = useSelector(
    (state) => state.setting?.termsconditions?.data[0]
  );
  useMemo(() => {
    setForm({ ...termsconditions });
  }, [termsconditions]);

  const formStructure = [
    {
      id: "1",
      type: "description",
      name: "description",
      title: "",
      limit: "2000",
	  disabled : canEdit
    },

    canEdit && {
      id: "8",
      type: "button",
      title: "Update",
    },
  ].filter(Boolean);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();

    Object.keys(form).map((key) => data.append(key, form?.[key]));

    data.append("user", user?.id);
    dispatch(terms_and_conditions_update(data));
    navigate("/Dashboard");
  };

  return (
    <>
      <Form
        formStructure={formStructure}
        handleSubmit={handleSubmit}
        formTitle={"Terms & Conditions"}
        key={"Form"}
        setForm={setForm}
        form={form}
      />
    </>
  );
}
