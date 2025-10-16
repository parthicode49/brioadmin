import React from "react";
import { useState, useMemo, useEffect } from "react";
import ListTable from "../../utils/Table";
import { useDispatch, useSelector } from "react-redux";
import * as Action from "../../../actions/Masters/country";
import Export from "../../utils/Export";
import { bindActionCreators } from "redux";

export default function Country() {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [save, setSave] = useState(false);
  const { country_create, country_update } = bindActionCreators(
    Action,
    dispatch
  );
  const user = useSelector((state) => state.layout.profile);
  const tempTableData = {
    tableTitle: "Countries",
	  deleteRecord: Action.country_delete,
		updateRecord: Action.country_status_update,
		deleteAccess: "true",
		onDeleteText: "Are you sure want to delete?",
		onUpdateText:
		  "Are you sure ?",
    tableHead: [
      {
        id: "country_name",
        label: "Country",
      },
      {
        id: "currency_symbol",
        label: "Currency Symbol",
      },
      {
        id: "status",
        label: "Status",
        // isButtonDisplay: true,
      },
      {
        id: "edit",
        label: "Update",
        // access: rights?.["Masters"]?.["edit"] == "true",
        isNewPopUpForm: true,
      },
    ],
    tableBody: [],
  };
  const [tableData, setTableData] = useState({ ...tempTableData });
  const countries = useSelector((state) => state.masters.countries);
  useEffect(() => {
    dispatch(Action.all_country_list());
  }, [save]);
  useMemo(() => {
    if (countries?.data) {
      const temp = tableData;
      temp.tableBody = countries?.data;
      setTableData({ ...temp });
    }
  }, [countries]);
  const [formStructure, setFormStructure] = useState(
    [
      {
        id: "1",
        type: "inputBox",
        // maxLength: 2,
        title: "Country Name",
        name: "country_name",
        placeholder: "Enter Country name here",
        // regex: /^[0-9\s\&]+$/,
        //
        required: true,
      },
      {
        id: "2",
        type: "inputBox",
        // maxLength: 2,
        title: "Currency Symbol",
        name: "currency_symbol",
        placeholder: "Enter currency_symbol here",
        // regex: /^[A-Z\s\&]+$/,
        // isCaps: true,
        required: true,
      },
    ].filter((e) => e)
  );
  const handleSubmit1 = async (event) => {
    if (isEdit) {
      const resData = await country_update(form);
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
      const resData = await country_create(form);
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
        save={save}
        setSave={setSave}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isPopUpNewTable={true}
        formStructure={formStructure}
        formTitle={isEdit ? "Edit Country" : "Add Country"}
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
