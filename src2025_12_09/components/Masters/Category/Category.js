import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListTable from "../../utils/Table";
import { useLocation, useNavigate } from "react-router-dom";
import ViewChangeForm from "../../utils/ViewChangeForm";
import { TableData } from "./TableData";
import Export from "../../utils/Export";
// import { all_series_list, only_series_name } from "../../../actions/WebSeries/series";
// import {all_season_list, season_delete, season_update} from "../../../actions/WebSeries/season"
// import {
//   all_category_list,
//   category_delete,
//   category_status_update,
//   category_update,
// } from "../../../actions/Masters/category";
import * as Action from "../../../actions/Masters/category";
import { Button } from "@mui/material";
import DynamicFormModal from "../../utils/NewFormStructure/DynamicFormModal";
import AddIcon from "@mui/icons-material/Add";
import { bindActionCreators } from "redux";
import { useAccessControl } from "../../utils/useAccessControl";

const Category = () => {
  const { canEdit } = useAccessControl("Control Panel");
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const location = useLocation();
  const role = useSelector((state) => state.layout.role);
  const rights = useSelector((state) => state.layout.rights);
  const { category_create, category_update } = bindActionCreators(
    Action,
    dispatch
  );

  const tempTableData = {
    ...TableData(),
    deleteRecord: Action.category_delete,
    updateRecord: Action.category_status_update,
    onDeleteText: "Are you sure want to delete the Category?",
    customisedStatusUpdateMessage: true,
    onActiveText:
      "Videos will be visible to all users when you activate this category, are you sure want to change it ?",
    onInactiveText: [
      "Videos are associated with this category, are you still want to change it.?",
    ],
  };
  const [tableData, setTableData] = useState({ ...tempTableData });
  const categories = useSelector((state) => state?.masters?.categories);
  console.log(categories, "Hii Parth");
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [save, setSave] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const user = useSelector((state) => state?.layout?.profile);
  console.log(user, "chechkkkf");
  const seasons = useSelector((state) => state.webseries.seasons);
  const series = useSelector((state) => state?.webseries?.series_name);

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
      dispatch(Action.all_category_list(data));
    }
  }, [user?.id, save]);
  useEffect(() => {
    if (location?.state?.formUpload) {
      const data = new FormData();
      data.append("id", user?.id);
      data.append("user", user?.id);
      //  if(movies?.statuscode!=200)
      dispatch(Action.all_category_list(data));
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
      const resData = await category_update(data);
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
      const resData = await category_create(data);
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
        id: "1",
        type: "inputBox",
        // maxLength: 2,
        title: "Sequence",
        name: "sequence",
        placeholder: "Enter Sequence name",
        regex: /^[0-9\s\&]+$/,
        // isCaps:true,
        display: "none",
        required: true,
      },
      {
        type: "file",
        name: "category_image",
        title: "Category",
        description: "Image size",
        image_size: "512 * 512 PX",
        accept: "image/*",
        size: 6,
      },
    ].filter((e) => e)
  );
  useEffect(() => {
    if (isEdit) {
      const temp = formStructure;
      temp[1]["display"] = "block";
      setFormStructure([...temp]);
    } else {
      const temp = formStructure;
      temp[1]["display"] = "none";
      setFormStructure([...temp]);
    }
  }, [isEdit]);
  return (
    <div>
      {/* <div style={{textAlign:"right"}}>
         <Button
          startIcon={<AddIcon sx={{ color: '#fff !important' }} />}
          variant="contained"
          color="success"
          sx={{
            textTransform: 'capitalize',
            borderRadius: '10px',
            mt: '10px',
            p: '10px 30px',
            fontSize: '14px',
            color: '#fff !important',
          }}
          style={{ background: "linear-gradient(225deg,  var(--gradientColor1) 0%, var(--gradientColor2) 91.25%)" }}
          className="mr-10px"
          onClick={() => navigate("/movie_testing/create_movie_testing/" )}
        >
          Add
        </Button>
        </div> */}
      {/* <div style={{ width: "100%", textAlign: "right" }}>
        <Button
          variant="contained"
          sx={{
            background: "var(--gradientColor2)",
            color: "#fff",
            // padding: "0.5rem 1rem",
            fontSize: "14px",
            fontWeight: "400",
            textAlign: "right",
            mb: 2,
            "&:hover": {
              backgroundColor: "var(--gradientColor2)",
            },
          }}
          onClick={() => {
            setEditingIndex(null);
            setIsModalOpen(true);
            setIsEdit(false);
          }}
        >
          <AddIcon sx={{ marginRight: "5px" }} /> Add
        </Button>
      </div>
      <DynamicFormModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setForm({});
          setIsEdit(false);
        }}
        formStructure={castCrewFormStructure}
        onSubmit={handleSubmit1}
        formData={form}
        setFormData={setForm}
        title={isEdit ? "Edit Category" : "Add Category"}
        initialData={editingIndex !== null ? tableData[editingIndex] : {}}
      /> */}

      {/* <ViewChangeForm
        create_new={"/masters/category/createcategory"}
        access={true}
        view="create_new"
        export_excel={
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
      /> */}

      <ListTable
        tableData={tableData}
        key={"ListTable"}
        form={form}
        setForm={setForm}
        setTableData={setTableData}
        isEdit={isEdit}
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
        canEdit={canEdit}
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
