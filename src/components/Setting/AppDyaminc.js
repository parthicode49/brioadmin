import React from "react";
import { useState, useMemo, useEffect } from "react";

import Form from "../utils/Form";
import {
  app_dyanmic_setting_update,
  admin_app_dynamic_setting
} from "../../actions/Setting/app_dyamic_setting";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAccessControl } from "../utils/useAccessControl";
export default function AppDyaminc() {
  const { canEdit } = useAccessControl("Setting");
  const user = useSelector((state) => state.layout.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  useEffect(() => {
    dispatch(admin_app_dynamic_setting());
  }, []);
  const app_dyanmic = useSelector(
    (state) => state.setting?.app_dyanmic?.data
  );
  useMemo(() => {
    setForm({ ...app_dyanmic });
  }, [app_dyanmic]);

  const formStructure = [
    {
      id: "1",
      type: "description",
      name: "release_note",
      title: "",
      limit: "2000",
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

    dispatch(app_dyanmic_setting_update(data));
    navigate("/Dashboard");
  };

  return (
    <>
      <Form
        formStructure={formStructure}
        handleSubmit={handleSubmit}
        formTitle={"Release Note"}
        key={"Form"}
        setForm={setForm}
        form={form}
      />
    </>
  );
}
