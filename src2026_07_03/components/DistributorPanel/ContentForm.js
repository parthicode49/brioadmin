import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListTable from "../utils/Table";
import { useLocation, useNavigate } from "react-router-dom";
import * as Action from "../../actions/distributorPanel/distributorContentForm";
import Export from "../utils/Export";
import { bindActionCreators } from "redux";
import { all_category_list } from "../../actions/Masters/category";
import EnlargedView from "../utils/EnlargedView";

const ContentForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.layout.profile);
  const rights = useSelector((state) => state.layout.rights);
  const categories = useSelector((state) => state.masters.categories);
  const { distributor_content_submission_create, distributor_content_update } =
    bindActionCreators(Action, dispatch);
  const [form, setForm] = useState({});
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const handleOpen = () => setOpen(true);
  const [isEdit, setIsEdit] = useState(false);
  const [save, setSave] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const content_form_list = useSelector(
    (state) => state?.distributorPanel?.content_form_list
  );
  const [tableData, setTableData] = useState({
    tableTitle: "Content Form",
    // deleteRecord: Action.sliderbanner_delete,
    // updateRecord: Action.slide_banner_status_update,
    openModal: handleOpen,
    disableDelete: true,
    deleteAccess: rights?.["Slider Banner"]?.["delete"] == "true",
    customisedStatusUpdateMessage: true,
    onDeleteText: "Are you sure want to delete Slider Banner?",
    onActiveText: "Are you Sure want to Activate Slider Banner?",
    onInactiveText: "Are you Sure want to Inactivate Slider Banner?",
    tableHead: [
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
        label: "Created At",
      },
      {
        id: "description1",
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
        id: "link1",
        label: "Link",
        isSpecial: true,
        align: "left",
        // isButtonDisplay: true,
      },
      {
        id: "remarks1",
        label: "Remarks",
        isSpecial: true,
        align: "left",
        // isButtonDisplay: true,
      },
      {
        id: "status",
        label: "Status",
        isButtonDisplay: true,
      },
      {
        id: "edit",
        label: "Update",
        access: rights?.["Slider Banner"]?.["edit"] == "true",
        isNewForm: true,
      },
    ],
    tableBody: [],
    filterColumn: [
      {
        id: "2",
        title: "Video Type",
        name: "content_type",
        options: ["Movie", "Series" , "Song"],
      },
      // {
      //   id: "2",
      //   title: "Slider Type",
      //   name: "slider_type",
      //   options: ["Image", "Video"],
      // },
    ],
  });

  // const categories = useSelector((state) => state.masters.categories);
  // const subcategories = useSelector((state) => state.masters.subcategories);
  // const genre = useSelector((state) => state.masters.genre);
  // const language = useSelector((state) => state.masters.languages);

  // console.log(location,"locationns")
  useEffect(() => {
    if (user?.id) {
      // const data = new FormData();
      // data.append("id", user?.id);
      // data.append("user", user?.id);
      // //  if(movies?.statuscode!=200)
      // dispatch(only_series_name(data));
      // // dispatch(all_season_list(data))
      // dispatch(all_movie_name_list(data));
      dispatch(all_category_list());
    }
  }, [user?.id]);
  useEffect(() => {
    if (user?.id) {
      const data = new FormData();
      data.append("id", user?.id);
      data.append("user", user?.id);
      dispatch(
        Action.all_distributor_content_submission_list({
          distributor_id: user?.id,
        })
      );
    }
  }, [user?.id, save]);
  useEffect(() => {
    if (drawer && !isEdit) {
      setOpen(true);
      setContent(
        "Please upload your content to Google Drive or any other cloud storage service. Once uploaded, share the accessible link in the designated field of this form at the time of submission.   For any query, you can contact us at +91 ************"
      );
    }
  }, [drawer]);
  const remarkPopupOpne = (remarks) =>{
    setOpen(true)
    setContent(remarks)
  }
  useMemo(() => {
    if (content_form_list?.data) {
      const temp = tableData;
      temp.tableBody = content_form_list?.data?.map((ele) => ({
        ...ele,
        description1: (
          <>
            <div style={{ color: "var(--themeFontColor)" }} />
            <p style={{ color: "var(--themeFontColor)" }}>
              {ele?.description}
            </p>{" "}
          </>
        ),
        edit: ele?.status == "Approved" ,
        link1: (
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
        remarks1: (ele?.remarks && ele?.status == "Rejected") ?(
          <button
            style={{
              padding: "5px 15px",
              color: "rgb(238, 127, 37)",
              background: "transparent",
              border: "1px solid rgb(238, 127, 37)",
              borderRadius: "5px",
            }}
            onClick={() => remarkPopupOpne(ele?.remarks)}
            
           
          >
           Remark
          </button>
        ) : <p style={{color : "var(--themeFontColor)"}}>-</p>,
        // edit: ele?.status === "Pending",
      }));

      setTableData({ ...temp });
    }
  }, [content_form_list]);

  const [formStructure, setFormStructure] = useState([
    {
      title: "Details",
      fields: [
        {
          type: "select",
          name: "content_type",
          title: "Select Content Type",
          placeholder: "Select Content Type here",
          options: [
            { value: "Movie", label: "Movie" },
            { value: "Series", label: "Series" },
            { value: "Song", label: "Song" },
          ],
          required: true,
        },

        {
          type: "select",
          name: "category",
          title: "Select Category",
          placeholder: "Select Category here",
          options: [
            { value: "Movie", label: "Movie" },
            { value: "Series", label: "Series" },
            { value: "Song", label: "Song" },
          ],
          required: true,
        },
        {
          type: "inputBox",
          name: "title",
          title: "Content Title",
          placeholder: "Type Content Title here",
          required: true,
        },
        {
          type: "inputBox",
          name: "drive_link",
          title: "Google Drive Link",
          placeholder: "Type Your Drive Link here",
          required: true,
        },
        {
          type: "inputBox",
          title: "Content Description",
          placeholder: "Type Content Description here",
          name: "description",
          required: true,
          size: "12",
          isLimit: "Description",
          showLimit: true,
          maxLength: "1000",
          row: "4",
          multiline: true,
        },
      ],
    },
  ]);
  useEffect(() => {
    if (categories?.data) {
      setFormStructure((prevFormStructure) =>
        prevFormStructure.map((section) => {
          if (section.title === "Details") {
            const updatedFields = section.fields.map((field, index) => {
              if (index === 1) {
                return {
                  ...field,
                  options: categories?.data?.map((ele) => ({
                    label: ele?.category_name,
                    value: ele?.id,
                  })),
                };
              }
              return field;
            });
            return { ...section, fields: updatedFields };
          }
          return section;
        })
      );
    }
  }, [categories]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isEdit) {
      const resData = await distributor_content_update({
        ...form,
        distributor_id: user?.id,
        status : "Pending",
        description1 : "",
        link1 : "",
        remarks1 : ""
      });
      if (resData?.status === 200) {
        setForm({});
        setSave(!save);
        setDrawer(false);
      } else {
        setForm(form);
      }
    } else {
      const resData = await distributor_content_submission_create({
        ...form,
        distributor_id: user?.id,
        status : "Pending",
                description1 : "",
        link1 : "",
        remarks1 : ""
      });
      if (resData?.status === 200) {
        setForm({});
        setSave(!save);
        setDrawer(false);
      } else {
        setForm(form);
      }
    }
  };
  return (
    <div>
      <EnlargedView open={open} setOpen={setOpen} content={content} />
      <ListTable
        tableData={tableData}
        key={"ListTable"}
        setForm={setForm}
        setTableData={setTableData}
        setIsEdit={setIsEdit}
        view="view_all"
        create_new={"/SliderBanner/EditSliderBanner/"}
        save={save}
        setSave={setSave}
        isDrawerForm={true}
        openDrawer={drawer}
        setOpenDrawer={setDrawer}
        formStructure={formStructure}
        handleSubmit={handleSubmit}
        setContent={setContent}
        form={form}
        isEdit={isEdit}
        formTitle={isEdit ? "Edit Content Form" : "Add Content Form"}
        exportButton={
          <Export
            fileName={"Content Form"}
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

export default ContentForm;
