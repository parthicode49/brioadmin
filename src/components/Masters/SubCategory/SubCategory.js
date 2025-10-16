import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListTable from "../../utils/Table";
import { useLocation, useNavigate } from "react-router-dom";
import * as Action from "../../../actions/Masters/subcategory";
import { all_category_list } from "../../../actions/Masters/category";
import Export from "../../utils/Export";
import { bindActionCreators } from "redux";

const SubCategory = () => {
  const [form, setForm] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  // console.log(location, "locationns");
  const { subcategory_create, subcategory_update } = bindActionCreators(
    Action,
    dispatch
  );
  const navigate = useNavigate();
  const role = useSelector((state) => state.layout.role);
  const rights = useSelector((state) => state.layout.rights);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [save, setSave] = useState(false);
  const [tableData, setTableData] = useState({
    tableTitle: "Sub Categories",
    deleteRecord: Action.subcategory_delete,
    updateRecord: Action.subcategory_status_update,
    deleteAccess: rights?.["Masters"]?.["delete"] == "true",
    onDeleteText: "Are you sure want to delete?",
    onUpdateText:
      "Videos are associated with this category, are you still want to change it.?",
    tableHead: [
      {
        id: "category",
        label: "Category Name",
      },
      // {
      //   id: "subcategory_image",
      //   label: "Image",
      //   isImage: true,
      // },
      // {
      //   id: "sequence",
      //   label: "Sequence",
      // },
      {
        id: "subcategory_name",
        label: "Sub Category",
      },
      {
        id: "content_type",
        label: "Content Type",
      },
      {
        id: "count",
        label: "Count",
      },
      {
        id: "sequence",
        label: "Sequence",
        // align: "center",
        // isEditable: true, // Add this flag
        // apiAction: Action.subcategory_sequence_update, // Add your API action here
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
    tableBody: [],
    filterColumn: [
            {
        id: "1",
        title: "select content type",
        name: "content_type",
        options: ["Movie", "Series"],
      },
      {
        id: "1",
        title: "Select Category",
        name: "category",
        options: ["Portrait", "Landscape"],
      },

    ],
  });
  const user = useSelector((state) => state.layout.profile);
  const subcategories = useSelector((state) => state.masters.subcategories);
  const categories = useSelector((state) => state.masters.categories);
  // const categories = useSelector((state) => state.masters.categories);
  // const subcategories = useSelector((state) => state.masters.subcategories);
  // const genre = useSelector((state) => state.masters.genre);
  // const language = useSelector((state) => state.masters.languages);

  useEffect(() => {
    if (user?.id) {
      const data = new FormData();
      data.append("id", user?.id);
      data.append("user", user?.id);
      //  if(movies?.statuscode!=200)
      dispatch(Action.all_subcategory_list(data));
      dispatch(all_category_list(data));
    }
  }, [user?.id, save]);
  useMemo(() => {
    if (subcategories) {
      const temp = tableData;
      temp.tableBody = subcategories?.data;
      setTableData({ ...temp });
    }
  }, [subcategories]);

  const handleSubmit1 = async (event) => {
    // event.preventDefault();
    const data = new FormData();

    Object.keys(form)?.map((key) => data.append(key, form?.[key]));
    data.append("user", user?.id);
    console.log("sdfdfsdfdfsd");

    if (isEdit) {
      const resData = await subcategory_update(data);
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
      const resData = await subcategory_create(data);
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
        type: "select",
        name: "category_id",
        title: "Select Category",
        placeholder: "Select Category name",
        options: [],
        // regex: /^[a-zA-Z\s\&]+$/,
        required: true,
      },
      {
        type: "select",
        name: "content_type",
        title: "Content Type",
        placeholder: "Select Content Type",
        options: [{label : "Movie" , value : "Movie"} , {label : "Series" , value : "Series"}],
        // regex: /^[a-zA-Z\s\&]+$/,
        required: true,
      },
      {
        id: "1",
        type: "inputBox",
        // maxLength: 2,
        title: "Sub Category",
        name: "subcategory_name",
        placeholder: "Enter Sub Category name",
        // regex: /^[0-9\s\&]+$/,
        // isCaps:true,
        required: true,
      },
      {
        id: "2",
        type: "inputBox",
        // maxLength: 2,
        title: "Sequence",
        name: "sequence",
        placeholder: "Enter Sequence here",
        regex: /^[0-9\s\&]+$/,
        // isCaps:true,
        required: true,
        display : "none"
      },
      {
        id: "5",
        type: "toggle",
        title: "Movie Image View",
        name: "movie_image_view",
        default: "Vertical",
        display : "none",
        size: "12",
        options: [
          { value: "Vertical", color: "success" },
          { value: "Horizontal", color: "danger" },
        ],
      },
      {
        id: "6",
        type: "toggle",
        title: "Series Image View",
        name: "series_image_view",
        default: "Horizontal",
        display : "none",
        size: "12",
        options: [
          { value: "Vertical", color: "success" },
          { value: "Horizontal", color: "danger" },
        ],
      },
      // {
      //   type: "file",
      //   name: "subcategory_image",
      //   title: "SubCategory Image",
      //   description: "Upload a (Resolution : 512px x 512px) (JPG, PNG)",
      //   accept: "image/*",
      //   // size: 6,
      //   required: true,
      // },
    ].filter((e) => e)
  );

  useMemo(() => {
    if(form?.content_type == "Movie"){
      const temp = formStructure
      temp[4]["display"] = "block"
      temp[5]["display"] = "none"
       setFormStructure([...temp]);
    }else if(form?.content_type == "Series"){
       const temp = formStructure
      temp[5]["display"] = "block"
      temp[4]["display"] = "none"
       setFormStructure([...temp]);
    }
  },[form?.content_type])

  useMemo(() => {
    if (categories) {
      // const temp = formStructure
      // temp[1][11]["options"] = OttName?.data?.map((ele)=>ele?.ott_name)
      const tempFilter = tableData;
      tempFilter["filterColumn"][1]["options"] = categories?.data?.map(
        (ele) => ele?.category_name
      );
      const temp = formStructure;
      temp[0]["options"] = categories?.data?.map((category) => ({
        label: category?.category_name,
        value: category?.id,
      }));

      setFormStructure([...temp]);
      setTableData({ ...tempFilter });
      // setFormStructure([...temp])
    }
  }, [categories]);
    useEffect(() => {
      if (isEdit) {
        const temp = formStructure;
        temp[3]["display"] = "block";
        temp[1]["disabled"] = true;
        setFormStructure([...temp]);
      } else {
        const temp = formStructure;
        temp[3]["display"] = "none";
        temp[1]["disabled"] = false;

        setFormStructure([...temp]);
      }
    }, [isEdit])

  console.log("tableData", tableData);
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
      {/* <ViewChangeForm
        create_new={"/Masters/SubCategory/CreateSubCategory/"}
        access={true}
        view="create_new"
        export_excel={
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
      /> */}

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
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isPopUpNewTable={true}
        formStructure={formStructure}
        formTitle={isEdit ? "Edit Sub Category" : "Add Sub Category"}
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
    </div>
  );
};

export default SubCategory;
