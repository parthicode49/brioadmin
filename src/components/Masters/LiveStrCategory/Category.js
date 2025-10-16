import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListTable from "../../utils/Table";
import { useLocation, useNavigate } from "react-router-dom";
import ViewChangeForm from "../../utils/ViewChangeForm";
import { TableData } from "./TableData";
import Export from "../../utils/Export";
import * as Action from "../../../actions/Masters/livestremcategory";
import { bindActionCreators } from "redux";

const Category = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const location = useLocation();
  const role = useSelector((state) => state.layout.role);
  const rights = useSelector((state) => state.layout.rights);
  const { create_live_stream_category, update_live_stream_category } = bindActionCreators(
    Action,
    dispatch
  );

  const tempTableData = {
    ...TableData(),
    deleteRecord: Action.delete_live_stream_category,
    updateRecord: Action.update_live_stream_category_status,
    onDeleteText: "Are you sure want to delete the Category?",
    customisedStatusUpdateMessage: true,
    onActiveText:
      "Videos will be visible to all users when you activate this category, are you sure want to change it ?",
    onInactiveText: [
      "Videos are associated with this category, are you still want to change it.?",
    ],
  };
  const [tableData, setTableData] = useState({ ...tempTableData });
  const categories = useSelector((state) => state?.masters?.live_stream_category);
  console.log(categories, "Hii Parth");
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [save, setSave] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const user = useSelector((state) => state?.layout?.profile);

  // const categories = useSelector((state) => state.masters.categories);
  // const subcategories = useSelector((state) => state.masters.subcategories);
  // const genre = useSelector((state) => state.masters.genre);
  // const language = useSelector((state) => state.masters.languages);

  console.log(location, "locationns");
  useEffect(() => {
    if (user?.id) {
      const data = new FormData();
      data.append("id", user?.id);
      data.append("user", user?.id);
      //  if(movies?.statuscode!=200)
      dispatch(Action.live_stream_category_list(data));
    }
  }, [user?.id, save]);
  useEffect(() => {
    if (location?.state?.formUpload) {
      const data = new FormData();
      data.append("id", user?.id);
      data.append("user", user?.id);
      //  if(movies?.statuscode!=200)
      dispatch(Action.live_stream_category_list(data));
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location]);

  useMemo(() => {
    if (categories) {
      const temp = tableData;
      temp.tableBody = categories?.data;
      setTableData({ ...temp });
      // setForm({ ...form, sequence: Number(tableData.tableBody[tableData.tableBody.length - 1]?.["sequence"]) + 1 })
    }
  }, [categories]);

  const handleSubmit1 = async (event) => {
    // event.preventDefault();
      const data = new FormData();

    Object.keys(form)?.map((key) => data.append(key, form?.[key]));
    data.append("user", user?.id);
    if (isEdit) {
      const resData = await update_live_stream_category(data);
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
      const resData = await create_live_stream_category(data);
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

  const [formStructure, setFormStructure] = useState(
    [
      {
        type: "inputBox",
        name: "category_name",
        title: "Category Name",
        placeholder: "Enter Category name",
        regex: /^[a-zA-Z\s\&]+$/,
        required: true,
      },
      {
        type: "file",
        name: "image",
        title: "Category",
        description: "Image size",
        image_size: "512 * 512 PX",
        accept: "image/*",
        size: 6,
      },
    ].filter((e) => e)
  );
  return (
    <div>
      <ListTable
        tableData={tableData}
        key={"ListTable"}
        form={form}
        setForm={setForm}
        setTableData={setTableData}
        setIsEdit={setIsEdit}
        view="view_all"
        create_new={"/masters/category/editcategory"}
        save={save}
        setSave={setSave}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isPopUpNewTable={true}
        formStructure={formStructure}
        formTitle={isEdit ? "Edit Category" : "Add Category"}
        onSubmit={handleSubmit1}
        initialData={editingIndex !== null ? tableData[editingIndex] : {}}
        exportButton={
          <Export
            fileName={"Category"}
            isClubed={true}
            access={"true"}
            exportData={tableData?.exportData || tableData?.tableBody}
            headings={tableData.tableHead?.map((value) => value.label)}
            // api = {"export_episode_list"}
            // api_data = {episodes?.filter_condition}
          />
        }
        // setForm = {se}
        // setIsEdit(true)
      />
    </div>
  );
};

export default Category;
