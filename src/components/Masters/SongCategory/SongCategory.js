import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListTable from "../../utils/Table";
import { useLocation, useNavigate } from "react-router-dom";
import * as Action from "../../../actions/Masters/songcategory";
import Export from "../../utils/Export";
import { bindActionCreators } from "redux";

const SongCategory = () => {
  const [form, setForm] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  // console.log(location, "locationns");
  const { song_category_create, song_category_update } = bindActionCreators(
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
    tableTitle: "Song Categories",
    deleteRecord: Action.song_category_delete,
    updateRecord: Action.song_category_status_update,
    deleteAccess: rights?.["Masters"]?.["delete"] == "true",
    onDeleteText: "Are you sure want to delete?",
    onUpdateText:
      "Songs are associated with this category, are you still want to change it.?",
    tableHead: [
      {
        id: "category_name",
        label: "Sub Category",
      },
      {
        id: "category_image",
        label: "Image",
        isImage: true,
      },
      // {
      //   id: "sequence",
      //   label: "Sequence",
      // },

      {
        id: "count",
        label: "Count",
      },
      {
        id: "sequence",
        label: "Sequence",
        align: "center",
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
      // {
      //   id: "1",
      //   title: "Select Category",
      //   name: "category",
      //   options: ["Portrait", "Landscape"],
      // },
    ],
  });
  const user = useSelector((state) => state.layout.profile);
  const song_category = useSelector((state) => state.masters.song_category);
  const [formStructure, setFormStructure] = useState(
    [
      {
        id: "1",
        type: "inputBox",
        // maxLength: 2,
        title: "Song Category",
        name: "category_name",
        placeholder: "Enter Song Category name",
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
        display: "none",
      },
      {
        id: "5",
        type: "toggle",
        title: "Image View",
        name: "image_view",
        default: "Vertical",
        size: "12",
        options: [
          { value: "Vertical", color: "success" },
          { value: "Horizontal", color: "danger" },
        ],
      },
      // {
      //   id: "6",
      //   type: "toggle",
      //   title: "Series Image View",
      //   name: "series_image_view",
      //   default: "Horizontal",
      //   size: "6",
      //   options: [
      //     { value: "Vertical", color: "success" },
      //     { value: "Horizontal", color: "danger" },
      //   ],
      // },
      {
        type: "file",
        name: "category_image",
        title: "Song Category Image",
        description: "Upload a (Resolution : 512px x 512px) (JPG, PNG)",
        accept: "image/*",
        // size: 6,
        // required: true,
      },
    ].filter((e) => e)
  );

  useEffect(() => {
    if (user?.id) {
      const data = new FormData();
      data.append("id", user?.id);
      data.append("user", user?.id);
      //  if(movies?.statuscode!=200)
      dispatch(Action.all_song_category_list_admin(data));
    }
  }, [user?.id, save]);
  useMemo(() => {
    if (song_category) {
      const temp = tableData;
      temp.tableBody = song_category?.data;
      setTableData({ ...temp });
    }
  }, [song_category]);

  useEffect(() => {
    if (isEdit) {
      const temp = formStructure;
      temp[1]["display"] = "black";
      setFormStructure([...temp]);
    } else {
      const temp = formStructure;
      temp[1]["display"] = "none";
      setFormStructure([...temp]);
    }
  }, [isEdit]);

  const handleSubmit1 = async (event) => {
    // event.preventDefault();
    const data = new FormData();

    Object.keys(form)?.map((key) => data.append(key, form?.[key]));
    data.append("user", user?.id);
    console.log("sdfdfsdfdfsd");

    if (isEdit) {
      const resData = await song_category_update(data);
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
      const resData = await song_category_create(data);
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
        formTitle={isEdit ? "Edit Song Category" : "Add Song Category"}
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

export default SongCategory;
