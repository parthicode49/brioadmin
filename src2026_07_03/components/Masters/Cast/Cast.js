import React from "react";
import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/PageTitle.module.css";
import ListTable from "../../utils/Table";
import Form from "../../utils/Form";
import ViewChange from "../../utils/ViewChange";
// import {
//   cast_create,
//   cast_delete,
//   cast_update,
//   all_cast_list,
// } from "../../../actions/Masters/cast";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import Import from "../../utils/Import";
import { useLocation, useNavigate } from "react-router-dom";
import Export from "../../utils/Export";
import Reload from "../../utils/Reload";
import ViewChangeForm from "../../utils/ViewChangeForm";
import * as Action from "../../../actions/Masters/cast";
import { bindActionCreators } from "redux";
import { useAccessControl } from "../../utils/useAccessControl";
export default function Cast() {
  const { canEdit } = useAccessControl("Control Panel");
  const user = useSelector((state) => state.layout.profile);
  const dispatch = useDispatch();
  const rights = useSelector((state) => state.layout.rights);
  const location = useLocation();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [save, setSave] = useState(false);
  const { cast_create, cast_update } = bindActionCreators(Action, dispatch);

  const [form, setForm] = useState(
    (location?.state?.form && JSON.parse(location?.state?.form)) || {}
  );
  const [view, setView] = useState(location?.state?.view || "view_all");
  useMemo(() => {
    if (isEdit) {
      setView("create_new");
    } else {
      setView("view_all");
      setForm({});
    }
  }, [isEdit]);
  const path = location?.pathname.split("/")[3];
  useEffect(() => {
    setView(path != "Cast" ? "create_new" : "view_all");
    setForm((location?.state?.form && JSON.parse(location?.state?.form)) || {});
    setIsEdit(path == "EditCast");
  }, [location]);
  const tempTableData = {
    tableTitle: "Casts",
    deleteRecord: Action.cast_delete,
    updateRecord: Action.cast_status_update,
    onDeleteText: "Are you sure to delete?",
    deleteAccess: rights?.["Masters"]?.["delete"] == "true",
    onUpdateText: "Are you Sure?",
    tableHead: [
      {
        id: "cast_name",
        numeric: false,
        disablePadding: true,
        label: "Cast",
      },
      {
        id: "cast_image",
        label: "Image",
        isImage: true,
      },
      {
        id: "cast_type",
        label: "Cast Type",
        isButtonDisplay: true,
      },
      {
        id: "edit",
        label: "Update",
        access: rights?.["Masters"]?.["edit"] == "true",
        isNewPopUpForm : true

      },
    ],
    tableBody: [],
    filterColumn: [
      {
        id: "1",
        title: "Select Cast Type",
        name: "cast_type",
        options: ["Actor", "Actress", "Director", "Producer"],
      },
    ],
  };
  const [tableData, setTableData] = useState({ ...tempTableData });
  useMemo(() => {
    setTableData({ ...tempTableData });
  }, [rights]);
  const casts = useSelector((state) => state.masters.casts);
  useEffect(() => {
    if (user?.id) {
      const data = new FormData();
      data.append("id", user?.id);
      data.append("user", user?.id);
      //  if(movies?.statuscode!=200)
      dispatch(Action.all_cast_list(data));
    }
  }, [user?.id , save]);
  useEffect(() => {
    if (location?.state?.formUpload) {
      const data = new FormData();
      data.append("id", user?.id);
      data.append("user", user?.id);
      //  if(movies?.statuscode!=200)
      dispatch(Action.all_cast_list(data));
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location]);
  useMemo(() => {
    if (casts) {
      const temp = tableData;
      temp.tableBody = casts?.data;
      setTableData({ ...temp });
    }
  }, [casts]);

  const formStructure = [
    {
      type: "inputBox",
      name: "cast_name",
      title: "Cast Name",
      placeholder: "Enter Cast name",
      regex: /^[a-zA-Z\s\&]+$/,
      required: true,
    },
    {
      id: "2",
      type: "select",
      title: "Cast Type",
      name: "cast_type",
      placeholder: "Select Cast Type",
      options: [
        { label: "Actor", value: "Actor" },
        { label: "Actress", value: "Actress" },
        { label: "Director", value: "Director" },
        { label: "Producer", value: "Producer" },
      ],
      required: true,
    },
          {
        type: "file",
        name: "cast_image",
        title: "Cast Image",
        description: "Upload a (Resolution : 512px x 512px) (JPG, PNG)",
        accept: "image/*",
        // size: 6,
        required: true,
      },
  ].filter((e) => e);

  const handleSubmit1 = async (event) => {
        const data = new FormData();
    Object.keys(form)?.map((key) => data.append(key, form?.[key]));
    data.append("user", user?.id);
    // event.preventDefault();
    if (isEdit) {
      const resData = await cast_update(data);
      console.log(resData, "neweweweweweew");
      if (resData?.status === 200) {
        setIsModalOpen(false);
        setSave(!save);
        setForm({});
        // navigate("/masters/category/", { state: { formUpload: true } });
      } else {
        setForm(form);
        // setIsModalOpen(true)
      }
    } else {
      const resData = await cast_create(data);
      if (resData?.status === 200) {
        setForm({});
        setIsModalOpen(false);
        setSave(!save);
        // navigate("/masters/category/", { state: { formUpload: true } });
      } else {
        setForm(form);
        // setIsModalOpen(true)
      }
    }
  };
  return (
    <>
      {/* <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert severity="info" variant="filled" color="success">
          {cast_msg?.message}
        </Alert>
      </Snackbar>
      <ViewChangeForm
        create_new={"/masters/cast/createcast/"}
        access={true}
        view="create_new"
        export_excel={
          <Export
            fileName={"Cast"}
            isClubed={true}
            access={"true"}
            exportData={tableData?.exportData || tableData?.tableBody}
            headings={tableData.tableHead?.map((value) => value.label)}
            // api = {"export_episode_list"}
            // api_data = {episodes?.filter_condition}
          />
        }
      /> */}

      <ListTable
        tableData={tableData}
        key={"ListTable"}
        form={form}
        setForm={setForm}
        setTableData={setTableData}
        setIsEdit={setIsEdit}
        view="view_all"
        create_new={"/masters/cast/editcast/"}
        save={save}
        setSave={setSave}
        canEdit={canEdit}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isPopUpNewTable={true}
        formStructure={formStructure}
        formTitle={isEdit ? "Edit Cast" : "Add Cast"}
        onSubmit={handleSubmit1}
        initialData={editingIndex !== null ? tableData[editingIndex] : {}}
        exportButton={
          <Export
            fileName={"Cast"}
            isClubed={true}
            access={"true"}
            exportData={tableData?.exportData || tableData?.tableBody}
            headings={tableData.tableHead?.map((value) => value.label)}
            // api = {"export_episode_list"}
            // api_data = {episodes?.filter_condition}
          />
        }
      />
    </>
  );
}
