import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListTable from "../utils/Table";
import { useLocation, useNavigate } from "react-router-dom";
import * as Action from "../../actions/notification";
import { all_category_list } from "../../actions/Masters/category";
import Export from "../utils/Export";
import { bindActionCreators } from "redux";
import EnlargedView from "../utils/EnlargedView";
import { IMAGE } from "../../api";

const Notification = () => {
  const [form, setForm] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  // console.log(location, "locationns");
  const { notification_create } = bindActionCreators(Action, dispatch);
  const navigate = useNavigate();
  const role = useSelector((state) => state.layout.role);
  const rights = useSelector((state) => state.layout.rights);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [save, setSave] = useState(false);
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const handleOpen = () => setOpen(true);
  const [tableData, setTableData] = useState({
    tableTitle: "Notification",
    openModal: handleOpen,
    // deleteRecord: Action.subcategory_delete,
    disableDelete: true,
    tableHead: [

      {
        id: "title",
        label: "Title",
      },
      {
        id: "created_at",
        label: "Date",
        isDate: true,
      },
            {
        id: "image_noti",
        label: "Image",
        isSpecial: true,
        align: "left",
      },

      {
        id: "user_type",
        label: "User Type",
      },
      {
        id: "description",
        label: "Description",
        isModal: true,
        // readNotification : true,
        // n_id:"noti_id",
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
        id: "customers",
        label: "Receiver",
        isModal: true,
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

        // default: (
        //   <>
        //     <button
        //       style={{
        //         padding: "5px 15px",
        //         color: "rgb(238, 127, 37)",
        //         background: "transparent",
        //         border: "1px solid rgb(238, 127, 37)",
        //         borderRadius: "5px",
        //       }}
        //     >
        //       VIEW
        //     </button>
        //   </>
        // ),
      },
    ],
    tableBody: [],
    filterColumn: [],
  });
  const user = useSelector((state) => state.layout.profile);
  const notifications = useSelector(
    (state) => state?.merchandise?.notifications
  );
  // const categories = useSelector((state) => state.masters.categories);
  // const subcategories = useSelector((state) => state.masters.subcategories);
  // const genre = useSelector((state) => state.masters.genre);
  // const language = useSelector((state) => state.masters.languages);

  useEffect(() => {
    if (user?.id) {
      const data = new FormData();
      data.append("id", user?.id);
      data.append("user", user?.id);
      dispatch(Action.all_notification_list(data));
    }
  }, [user?.id, save]);

  useMemo(() => {
    if (notifications) {
      const temp = tableData;
      temp.tableBody = notifications?.data?.map((ele) => ({
        ...ele,
        description: (
          <>
            <div style={{ color: "var(--themeFontColor)" }}>
              {ele?.description}
            </div>
            <p style={{ color: "var(--themeFontColor)" }}>
              {temp?.tableHead?.default}
            </p>{" "}
          </>
        ),
        image_noti : (
          ele?.image ? <img src={IMAGE + ele?.image}/> : <p style={{ color: "var(--themeFontColor)" }} >-</p>
        ),
        customers: (
          <>
            <p style={{ color: "var(--themeFontColor)" }}>
              {ele?.user_data?.join()}
            </p>
            <p style={{ color: "var(--themeFontColor)" }}>
              {temp?.tableHead?.default}
            </p>
          </>
        ),
      }));
      setTableData({ ...temp });
    }
  }, [notifications]);

  const handleSubmit1 = async (event) => {
    // event.preventDefault();
    const data = new FormData();

    Object.keys(form)?.map((key) => data.append(key, form?.[key]));
    data.append("user", user?.id);
    console.log("sdfdfsdfdfsd");

    const resData = await notification_create(data);
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

  useEffect(() => {
    if (isModalOpen) {
      setForm({ ...form, receiver_type: "All" });
    }
  }, [isModalOpen]);
  const [formStructure, setFormStructure] = useState(
    [
      {
        type: "select",
        title: "User Type",
        name: "user_type",
        placeholder: "Select User TYpe here",
        options: [
          { value: "Customer", label: "Customer" },
          { value: "Content Owner", label: "Content Owner" },
          { value: "Advertiser", label: "Advertiser" },
        ],
        required: true,
      },
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
      <EnlargedView open={open} setOpen={setOpen} content={content} />
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
        setContent={setContent}
        setIsModalOpen={setIsModalOpen}
        isPopUpNewTable={true}
        formStructure={formStructure}
        formTitle={"Notification"}
        onSubmit={handleSubmit1}
        initialData={editingIndex !== null ? tableData[editingIndex] : {}}
        // exportButton={
        //   <Export
        //     fileName={"Notification"}
        //     isClubed={true}
        //     access={"true"}
        //     exportData={tableData?.exportData || tableData?.tableBody}
        //     headings={tableData.tableHead?.map((value) => value.label)}
        //     // api = {"export_episode_list"}
        //     // api_data = {episodes?.filter_condition}
        //   />
        // }
      />
    </div>
  );
};

export default Notification;
