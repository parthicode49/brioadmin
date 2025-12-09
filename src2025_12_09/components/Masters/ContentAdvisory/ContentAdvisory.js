import React from "react";
import { useState, useMemo, useEffect } from "react";
import ListTable from "../../utils/Table";
import ViewChange from "../../utils/ViewChange";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Export from "../../utils/Export";
import * as Action from "../../../actions/Masters/contentadvisory";
import { bindActionCreators } from "redux";
import { useAccessControl } from "../../utils/useAccessControl";

export default function ContentAdvisory() {
  const { canEdit } = useAccessControl("Control Panel");
  const user = useSelector((state) => state.layout.profile);
  const dispatch = useDispatch();
  const rights = useSelector((state) => state.layout.rights);
  const location = useLocation();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const { content_advisory_create, content_advisory_update } =
    bindActionCreators(Action, dispatch);
  const [form, setForm] = useState(
    (location?.state?.form && JSON.parse(location?.state?.form)) || {}
  );
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [save, setSave] = useState(false);
  const tempTableData = {
    tableTitle: "Content Advisory",
    deleteRecord: Action.content_advisory_delete,
    updateRecord: Action.content_advisory_status_update,
    onDeleteText: "Are you sure to delete?",
    deleteAccess: rights?.["Masters"]?.["delete"] == "true",
    onUpdateText: "Are you Sure?",
    tableHead: [
      {
        id: "content_advisory",
        label: "Content Type",
      },
      {
        id: "status",
        label: "Status",
        // isButtonDisplay: true,
      },
      {
        id: "edit",
        label: "Update",
        access: rights?.["Masters"]?.["edit"] == "true",
        isNewPopUpForm: true,
      },
    ],
    tableBody: [
      {
        id: 0,
        cast: "Movie",
        image: "Landscape",
        cast_type: "Active",
        edit: 0,
      },
    ],
    filterColumn: [],
  };
  const [tableData, setTableData] = useState({ ...tempTableData });
  useMemo(() => {
    setTableData({ ...tempTableData });
  }, [rights]);
  const formStructure = [
    {
      id: "1",
      type: "inputBox",
      title: "Content Type",
      name: "content_advisory",
      required: true,
    },

    {
      id: "2",
      type: "button",
      title: isEdit ? "Edit" : "Create",
    },
  ];

  const Advisory = useSelector((state) => state.masters.advisory);
  useEffect(() => {
    dispatch(Action.all_content_advisory_list());
  }, [save]);
  useMemo(() => {
    if (Advisory?.data) {
      const temp = tableData;
      temp.tableBody = Advisory?.data;
      setTableData({ ...temp });
    }
  }, [Advisory]);

  const handleSubmit1 = async (event) => {
    // event.preventDefault();
    if (isEdit) {
      const resData = await content_advisory_update(form);
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
      const resData = await content_advisory_create(form);
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
      <ListTable
        tableData={tableData}
        key={"ListTable"}
        form={form}
        setForm={setForm}
        setTableData={setTableData}
        setIsEdit={setIsEdit}
        view="view_all"
        create_new={"/Masters/SubCategory/EditSubCategory/"}
        save={save}
        setSave={setSave}
        canEdit={canEdit}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isPopUpNewTable={true}
        formStructure={formStructure}
        formTitle={isEdit ? "Edit Content Type" : "Create Content Type"}
        onSubmit={handleSubmit1}
        initialData={editingIndex !== null ? tableData[editingIndex] : {}}
        exportButton={
          <Export
            fileName={"Sub Category"}
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
