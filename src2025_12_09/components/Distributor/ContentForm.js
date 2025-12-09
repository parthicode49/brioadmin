import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListTable from "../utils/Table";
import { useLocation, useNavigate } from "react-router-dom";
import Export from "../utils/Export";
// import { all_series_list, only_series_name } from "../../../actions/WebSeries/series";
// import {all_season_list, season_delete, season_update} from "../../../actions/WebSeries/season"
// import {
//   all_category_list,
//   category_delete,
//   category_status_update,
//   category_update,
// } from "../../../actions/Masters/category";
import * as Action from "../../actions/distributor";
import { Button } from "@mui/material";
import DynamicFormModal from "../utils/NewFormStructure/DynamicFormModal";
import AddIcon from "@mui/icons-material/Add";
import { bindActionCreators } from "redux";
import EnlargedView from "../utils/EnlargedView";

const ContentForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const handleOpen = () => setOpen(true);
  const role = useSelector((state) => state.layout.role);
  const rights = useSelector((state) => state.layout.rights);
  const { distributor_content_submission_update } = bindActionCreators(
    Action,
    dispatch
  );

  const [tableData, setTableData] = useState({
    tableTitle: "Acruired Content",
    // deleteRecord: Action.sliderbanner_delete,
    // updateRecord: Action.slide_banner_status_update,
    disableDelete: true,
    deleteAccess: rights?.["Slider Banner"]?.["delete"] == "true",
    customisedStatusUpdateMessage: true,
    openModal: handleOpen,
    onDeleteText: "Are you sure want to delete Slider Banner?",
    onActiveText: "Are you Sure want to Activate Slider Banner?",
    onInactiveText: "Are you Sure want to Inactivate Slider Banner?",
    tableHead: [
      {
        id: "distributor_name",
        label: "Name",
        subText : "company_name"
      },
      {
        id: "content_type",
        label: "Video Type",
      },
      {
        id: "title",
        label: "Title",
      },
      {
        id: "category_name",
        label: "Category",
      },

      {
        id: "created_at",
        label: "Received on",
        isDate: true,
      },
      {
        id: "description",
        label: "Description",
        isModal: true,
        // default:"VIEW"
        default: (
          <>
            <button
              style={{
                padding: "5px 15px",
                color: "rgb(238, 127, 37)",
                background: "transparent",
                border: "1px solid rgb(238, 127, 37)",
                borderRadius: "5px",
              }}
            >
              VIEW
            </button>
          </>
        ),
      },
      {
        id: "link",
        label: "Link",
        isSpecial: true,
        align: "left",
        // isButtonDisplay: true,
      },
      {
        id: "status1",
        label: "Status",
        isSpecial: true,
        align: "left",
        // isButtonDisplay: true,
      },
      //   {
      //     id: "edit",
      //     label: "Update",
      //     access: rights?.["Slider Banner"]?.["edit"] == "true",
      //     isNewForm: true,
      //   },
    ],
    tableBody: [],
    filterColumn: [
      {
        id: "2",
        title: "Video Type",
        name: "content_type",
        options: ["Movie", "Series"],
      },
      {
        id: "2",
        title: "Status",
        name: "status",
        options: ["Pending", "Approved", "Rejected"],
      },
    ],
    isDateRangeFilter: "created_at",
  });
  const distributors_form_list = useSelector(
    (state) => state?.distributors?.distributors_form_list
  );
  console.log(distributors_form_list, "Hii Parth");
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
      dispatch(Action.all_distributor_content_submission_list_admin(data));
    }
  }, [user?.id, save]);
  const handleForm = (status, id) => {
    setEditingIndex(null);
    setIsModalOpen(true);
    setIsEdit(false);
    setForm({ status: status, id: id });
  };
  useMemo(() => {
    if (distributors_form_list) {
      const temp = tableData;
      temp.tableBody = distributors_form_list?.data?.map((ele) => ({
        ...ele,
        status1: (
          <span
            style={{
              cursor: "pointer",
              fontWeight: "500",
            }}
            variant="contained"
            className={
              ele.status === "Pending"
                ? "PendingBadge"
                : ele?.status === "Approved"
                ? "successBadge"
                : "dangerBadge"
            }
            onClick={() => handleForm(ele?.status, ele?.id)}
          >
            {ele?.status}
          </span>
        ),
        description: (
          <>
            <div style={{ color: "var(--themeFontColor)" }} />
            <p style={{ color: "var(--themeFontColor)" }}>
              {ele?.description}
            </p>{" "}
          </>
        ),
        link: (
          <a
            style={{
              padding: "5px 15px",
              color: "rgb(238, 127, 37)",
              background: "transparent",
              border: "1px solid rgb(238, 127, 37)",
              borderRadius: "5px",
            }}
            href={ele?.drive_link}
            target="_blank"
          >
            Drive Link
          </a>
        ),
      }));
      setTableData({ ...temp });
      // setForm({ ...form, sequence: Number(tableData.tableBody[tableData.tableBody.length - 1]?.["sequence"]) + 1 })
    }
  }, [distributors_form_list]);

  const handleSubmit1 = async (event) => {
    console.log(form, "sdasdsadsad");
    // event.preventDefault();
    const resData = await distributor_content_submission_update(form);
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
  };

  const [formStructure, setFormStructure] = useState(
    [
      {
        type: "select",
        name: "status",
        title: "Select Status",
        placeholder: "Select Status here",
        options: [
          { value: "Pending", label: "Pending" },
          { value: "Approved", label: "Approve" },
          { value: "Rejected", label: "Reject" },
        ],
        required: true,
      },
      //   {
      //     type: "inputBox",
      //     title: "Content Description",
      //     placeholder: "Type Content Description here",
      //     name: "description",
      //     required: true,
      //     size: "12",
      //     isLimit: "Description",
      //     showLimit: true,
      //     maxLength: "1000",
      //     row: "4",
      //     multiline: true,
      //   },
      {
        type: "inputBox",
        // maxLength: 2,
        title: "Remarks",
        name: "remarks",
        multiline: true,
        placeholder: "Enter remarks name",
        showLimit: true,
        maxLength: "100",
        row: "4",
        // regex: /^[0-9\s\&]+$/,
        display: "none",
        //   isCaps:true,
        required: true,
      },
    ].filter((e) => e)
  );
  useMemo(() => {
    console.log(form?.status, "ssssssssssssssssssssssssss");
    if (form?.status === "Rejected" && isModalOpen) {
      const temp = formStructure;
      temp[1]["display"] = "block";
      setFormStructure([...temp]);
    } else {
      const temp = formStructure;
      temp[1]["display"] = "none";
      setFormStructure([...temp]);
    }
  }, [form?.status, isModalOpen]);

  return (
    <div>
      <EnlargedView open={open} setOpen={setOpen} content={content} />
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
      </div> */}
      <DynamicFormModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setForm({});
          setIsEdit(false);
        }}
        formStructure={formStructure}
        onSubmit={handleSubmit1}
        formData={form}
        setFormData={setForm}
        title={isEdit ? "Edit Status" : "Add Status"}
        initialData={editingIndex !== null ? tableData[editingIndex] : {}}
        save={save}
        setSave={setSave}
      />

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
        setIsEdit={setIsEdit}
        view="view_all"
        create_new={"/masters/category/editcategory"}
        save={save}
        setSave={setSave}
        setContent={setContent}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        // isPopUpNewTable={true}
        // formStructure={castCrewFormStructure}

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

export default ContentForm;
