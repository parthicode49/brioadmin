import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListTable from "../utils/Table";
import { useLocation, useNavigate } from "react-router-dom";
import ViewChangeForm from "../utils/ViewChangeForm";

import Export from "../utils/Export";
// import { all_distributor_list } from "../../actions/distributor";
import * as Action from "../../actions/distributor";
import NewForm from "../utils/NewFormStructure/NewForm";
import { Button } from "@mui/material";
import { bindActionCreators } from "redux";
import * as NotifiAction from "../../actions/notification";
import notification_icon from "../../images/notification_icon.png"
import DynamicFormModal from "../utils/NewFormStructure/DynamicFormModal";
import InfoIcone from "../../images/info.png";
const Distributor = () => {
  const navigate = useNavigate();
  const role = useSelector((state) => state.layout.role);
  const rights = useSelector((state) => state.layout.rights);
  const user = useSelector((state) => state.layout.profile);
  const [save, setSave] = useState(false);
  const [form, setForm] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const [drawer, setDrawer] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [callbackFun, setCallbackFun] = useState(() => () => {});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { distributor_create, distributor_update } = bindActionCreators(
    Action,
    dispatch
  );
  const { notification_create } = bindActionCreators(NotifiAction, dispatch);
  const [formNoti, setFormNoti] = useState({});
  const [tableData, setTableData] = useState({
    tableTitle: "Content Owner",
    deleteRecord: Action.distributor_delete,
    updateRecord: Action.distributor_status_update,
    deleteAccess: rights?.["Masters"]?.["delete"] == "true",
    onDeleteText:
      "If You Delete the Content Owner all the Movie and Series of that Content Owner will also deleted",
    onUpdateText: "Are you Sure?",
    tableHead: [
      {
        id: "distributor_name",
        label: "Content Owner Name",
        link: "/Distributors/DistributerProducts",
        color: "var(--gradientColor2)",
      },
      // {
      //   id: "company_logo",
      //   label: "Logo",
      //   isImage: true,
      // },
      {
        id: "company_name",
        label: "Company Name",
      },

      {
        id: "email",
        label: "Contact Info",
        subText: "mobile_number",
      },
      {
        id: "created_at",
        label: "Registration Date",
      },
      {
        id: "status",
        label: "Status",
      },
            {
        id: "info",
        label: "View",
        isSpecial: true,
        align: "left",
      },
      
      {
        id: "notification",
        label: "Notification",
          isSpecial: true,
        align: "center",
      },

      {
        id: "edit",
        label: "Update",
        access: rights?.["Content Owner"]?.["edit"] == "true",
        isNewForm: true,
      },
    ],
    tableBody: [],
    // isDateRangeFilter: "created_at",
  });
    const handleForm = (id) => {
    setEditingIndex(null);
    setIsModalOpen(true);
    setIsEdit(false);
    setFormNoti({
      user_list: id,
      user_type: "Content Owner",
      receiver_type: "Single",
    });
  };
    const handleFormMulti = (id, fun) => {
    setIsModalOpen(true);
    setFormNoti({
      user_list: id,
      user_type: "Content Owner",
      receiver_type: "Multiple",
    });
    setIsEdit(false);
    setCallbackFun(() => fun);
  };
  const [formStructureNoti, setFormStructureNoti] = useState(
    [
      {
        type: "inputBox",
        title: "Title ",
        name: "title",
        placeholder: "Enter Title here",
        required: true,
      },
      {
        type: "inputBox",
        title: "Description",
        name: "description",
        multiline: true,
        placeholder: "Enter Description here",
        showLimit: true,
        maxLength: "100",
        row: "4",
        required: true,
      },
      {
        type: "file",
        name: "notification_image",
        title: "Notification Image",
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
      dispatch(Action.all_distributor_list(data));
    }
  }, [user?.id, save]);
  useEffect(() => {
    if (location?.state?.formUpload) {
      const data = new FormData();
      data.append("id", user?.id);
      data.append("user", user?.id);
      //  if(movies?.statuscode!=200)
      dispatch(Action.all_distributor_list(data));
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location]);
  const distributors = useSelector((state) => state.distributors.distributors);
  const [formStructure, setFormStructure] = useState([
    {
      title: "Details",
      fields: [
        {
          id: "1",
          type: "inputBox",
          title: "Company Name",
          name: "company_name",
          placeholder: "Enter Company Name",
          required: true,
        },
        {
          id: "2",
          type: "inputBox",
          title: "Content Owner Name",
          name: "distributor_name",
          placeholder: "Enter Content Owner Name",
          required: true,
        },
        {
          id: "3",
          type: "inputBox",
          title: "Email ID",
          variant: "email",
          placeholder: "Enter Email ID Name",
          isEmail: true,
          name: "email",
          required: true,
        },
        {
          id: "4",
          type: "mobile",
          title: "Mobile Number",
          // maxLength: 12,
          placeholder: "Enter Mobile Number",
          name: "mobile_number",
          isMobile: true,
          required: true,
        },
        // {
        //   id: "5",
        //   type: "inputBox",
        //   name: "gst_number",
        //   title: "GST No",
        //   placeholder: "Enter Company GST Number",
        //   required: true,
        //   isGst: true,
        // },
        // {
        //   id: "6",
        //   type: "inputBox",
        //   name: "pan_number",
        //   title: "Pan Cart Number",
        //   placeholder: "Enter Pan Cart Number",
        //   required: true,
        //   maxLength:"10",
        //   isPancard: true,
        // },
        // {
        //   id: "7",
        //   type: "inputBox",
        //   name: "aadhar_number",
        //   title: "Aadhar Cart No",
        //   placeholder: "Enter Aadhar Cart Number",
        //   regex: /^[0-9\.]+$/,
        //   maxLength: "12",
        //   required: true,
        // },
        {
          id: "8",
          type: "inputBox",
          title: "Login Password",
          name: "password",
          placeholder: "Enter Login Password",
          required: true,
          display : "nome"
        },
        // {
        //   id: "9",
        //   type: "mobile",
        //   // options : ["parth" ,"gohel"],
        //   title: "Alternative Number",
        //   placeholder: "Type your Mobile no. here",
        //   name: "alternative_number",
        //   required: true,
        //   isMobile: true,
        //   // disabled: isEdit,
        // },
      ],
    },
    // {
    //   title: "Media",
    //   fields: [
    //     {
    //       id: "8",
    //       type: "image",
    //       title: "Company Registration Certificate",
    //       name: "company_registration_certificate",
    //       description: "PDF, DOC, DOCX (Max 5MB)",
    //       accept: ".pdf,.doc,.docx",
    //       size: 4,
    //     },
    //     {
    //       id: "9",
    //       type: "image",
    //       title: "Company Logo",
    //       name: "company_logo",
    //       description: "Upload a Company Logo (JPG, PNG)",
    //       accept: "image/*",
    //       image_size : "512px x 512px",
    //       required: true,
    //       display: "block",
    //       size: 4,
    //     },
    //     {
    //       id: "10",
    //       type: "image",
    //       title: "Contract Agreement",
    //       name: "contract_agreement",
    //       description: "PDF, DOC, DOCX (Max 5MB)",
    //       accept: ".pdf,.doc,.docx",
    //       size: 4,
    //     },
    //   ],
    // },
  ]);
  useMemo(() => {
    if (distributors) {
      const temp = tableData;
      temp.tableBody = distributors?.data?.map((ele) => ({
        ...ele,
        notification: (
          // <Link
          //   to="/Notifications/CreateNotifications/"
          //   state={{ customer: ele?.id, send: "nofitication" }}
          // >
          <img
            src={notification_icon}
            alt="Notifications"
            height={"25px"}
            onClick={() => handleForm(ele?.id)}
            style={{ marginRight: "5px", cursor: "pointer" }}
          />
          // </Link>
        ),
                info: (
          <img
            src={InfoIcone}
            width="20px"
            height="20px"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("detail", { state: { id: ele?.id } })}
          />
        ),
      }));
      setTableData({ ...temp });
    }
  }, [distributors]);
    useEffect(() => {
      if (isEdit) {
        setFormStructure((prevFormStructure) =>
          prevFormStructure.map((section) => {
            if (section.title === "Details") {
              const updatedFields = section.fields.map((field, index) => {
                if (index === 7) {
                  return { ...field, display: "block" };
                }
                return field;
              });
              return { ...section, fields: updatedFields };
            }
            return section;
          })
        );
      } else {
        setFormStructure((prevFormStructure) =>
          prevFormStructure?.map((section) => {
            if (section.title === "Details") {
              const updatedFields = section.fields.map((field, index) => {
                if (index === 7) {
                  return { ...field, display: "none" };
                }
              
                return field;
              });
              return { ...section, fields: updatedFields };
            }
            return section;
          })
        );
      }
    }, [isEdit]);
    console.log(formStructure , isEdit , "new Coer")
  const handleSubmit = async (event) => {
    event.preventDefault();
    // const data = new FormData();
    // Object.keys(form)?.map((key) => data.append(key, form?.[key]));
    // data.append("user", user?.id);
    if (isEdit) {
      const resData = await distributor_update(form);
      if (resData?.status === 200) {
        setForm({});
        setSave(!save);
        setDrawer(false);
      } else {
        setForm(form);
      }
    } else {
      const resData = await distributor_create(form);
      if (resData?.status === 200) {
        // setForm({});
        setForm({});
        setSave(!save);
        setDrawer(false);
      } else {
        setForm(form);
      }
      //
      // dispatch(language_create(data));
    }
  };
  const handleSubmit1 = async () => {
    console.log("dddddddddddddddddddd", formNoti);
    const data = new FormData();
    Object.keys(formNoti)?.map((key) => data.append(key, formNoti?.[key]));
    const resData = await notification_create(data);
    console.log(resData, "neweweweweweew");
    if (resData?.status === 200) {
      setIsModalOpen(false);
      setFormNoti({});
      callbackFun([]);
      // navigate("/masters/category/", { state: { formUpload: true } });
    } else {
      setFormNoti(formNoti);
      // setIsModalOpen(true)
    }
  };
  const sendMultiNotification = (id, fun) => {
    handleFormMulti(id, fun);
    // console.log(id , "vdjndjdjdjdjd")
    // setSave(!save)
    // fun([])
  };
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
        create_new={"/distributor/createdistributor/"}
        access={true}
        view="create_new"
        export_excel={
          <Export
            fileName={"Distributor"}
            isClubed={true}
            access={"true"}
            exportData={tableData?.exportData || tableData?.tableBody}
            headings={tableData.tableHead?.map((value) => value.label)}
            // api = {"export_episode_list"}
            // api_data = {episodes?.filter_condition}
          />
        }
      /> */}
      {/* <Button onClick={() => setDrawer(!drawer)}>Create</Button>
      <NewForm
        open={drawer}
        setOpen={setDrawer}
        formStructure={formStructure}
        handleSubmit={handleSubmit}
        form={form}
        setForm={setForm}
        formTitle = {"Add Movie"}
      /> */}
      <DynamicFormModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setFormNoti({});
          setIsEdit(false);
        }}
        formStructure={formStructureNoti}
        onSubmit={handleSubmit1}
        formData={formNoti}
        setFormData={setFormNoti}
        title={"Notification"}
        initialData={editingIndex !== null ? tableData[editingIndex] : {}}
        save={save}
        setSave={setSave}
      />
      <ListTable
        tableData={tableData}
        key={"ListTable"}
        setForm={setForm}
        setTableData={setTableData}
        setIsEdit={setIsEdit}
        save={save}
        setSave={setSave}
         isMultiNotificationSend={true}
        sendMultiNotification={sendMultiNotification}
        view="view_all"
        create_new={"/distributor/editdistributor/"}
        isDrawerForm={true}
        openDrawer={drawer}
        setOpenDrawer={setDrawer}
        formStructure={formStructure}
        handleSubmit={handleSubmit}
        form={form}
        formTitle={isEdit ? "Edit Content Owner" : "Add Content Owner"}
        exportButton={
          <Export
            fileName={"Content Owner"}
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

export default Distributor;
