import React, { useEffect, useMemo, useRef, useState } from "react";
import { all_language_list } from "../../actions/Masters/language";
import { useDispatch, useSelector } from "react-redux";
import ListTable from "../utils/Table";
import Export from "../utils/Export";
import { all_cast_list } from "../../actions/Masters/cast";
import Hls from "hls.js";
import * as Action from "../../actions/song";
import { bindActionCreators } from "redux";
import { all_distributor_list } from "../../actions/distributor";
import { all_song_category_list_admin } from "../../actions/Masters/songcategory";
import { useNavigate } from "react-router-dom";
import notification_icon from "../../images/notification_icon.png";
import InfoIcone from "../../images/info.png";
import DynamicFormModal from "../utils/NewFormStructure/DynamicFormModal";
import * as NotiAction from "../../actions/notification"
const Song = () => {
  const role = useSelector((state) => state.layout.role);
  const [form, setForm] = useState({});
  const [isEdit, setIsEdit] = useState(false);
    const [formNoti, setFormNoti] = useState({});
  const [drawer, setDrawer] = useState(false);
  const [save, setSave] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
      const [editingIndex, setEditingIndex] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { song_create, song_update } = bindActionCreators(Action, dispatch);
  const {notification_create} = bindActionCreators(NotiAction , dispatch )
  const [tableData, setTableData] = useState({
    tableTitle: "Songs",
    deleteRecord: Action.song_delete,
    disableDelete: role !== "Distributor" ? false : true,

    onDeleteText: [
      "Are you sure want to delete this Song ?",
      "The Customer Will not be able to see this Song once you delete it.",
    ],
    customisedStatusUpdateMessage: true,
    onActiveText: "Are you sure want to Activate the Song ?",
    onInactiveText: [
      "Are you sure want to Inactivate the Song ?",
      "The Customer Will not be able to see this Song once you Inactivate it.",
    ],
    updateRecord: Action.song_status_update,
    tableHead: [
      {
        id: "thumbnail",
        label: "Image",
        isFirstImage: true,
      },
      {
        id: "title",
        label: "Name",
        // link: "/Movie/MovieDetails",
        color: "var(--gradientColor2)",
        // subText: "movie_subcategory"
      },
      {
        id: "ownership",
        label: "Ownership",
        subText: "distributor_name",
      },
      {
        id: "category_name",
        label: "Category",
        subText: "sub_category_list",
      },
      role !== "Distributor" && {
        id: "movie_access1",
        label: "Access",
        isSpecial: true,
        align: "left",
      },
      {
        id: "total_usage",
        label: "Total Usage",
      },
      {
        id: "sequence",
        label: "Sequence",
      },
      {
        id: "song_view",
        label: "Views",
      },
      {
        id: "status",
        label: "Status",
        // isButtonDisplay: true
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
        isNewForm: true,
      },
    ],
    tableBody: [],
    filterColumn: [
      {
        id: "1",
        title: "Access Type",
        name: "content_access",
        options: ["FREE", "SVOD"],
      },

      {
        id: "3",
        title: "Category",
        name: "category",
        options: ["Action", "Comedy", "Drama", "Horror"],
      },
      {
        id: "3",
        title: "Ownership",
        name: "ownership",
        options: ["In House", "Content Owner"],
      },
      {
        id: "6",
        title: "Status",
        name: "status",
        options: ["Active", "Inactive"],
      },
    ],
  });
  const user = useSelector((state) => state.layout.profile);
  const song = useSelector((state) => state?.song?.song_list);
  const categories = useSelector((state) => state?.masters?.song_category);
  const casts = useSelector((state) => state.masters.casts);
  const language = useSelector((state) => state.masters.languages);
  const distributors = useSelector((state) => state.distributors.distributors);
  const [castCrewFormStructure, setCastCrewFormStructure] = useState([
    {
      type: "select",
      name: "cast",
      title: "Cast",
      placeholder: "Select Cast",
      options: [],
      required: true,
    },
    {
      type: "inputBox",
      name: "character_name",
      title: "Character Name",
      placeholder: "Enter Character name",
      required: true,
    },
  ]);
  // Define table columns
  const tableColumns = [
    { title: "Cast Name", field: "cast" },
    { title: "Character", field: "character_name" },
  ];

  const [formStructure, setFormStructure] = useState([
    {
      title: "Ownership",
      fields: [
        {
          type: "select",
          name: "ownership",
          title: "Song Ownership",
          placeholder: "Select Ownership here",

          options: [
            { value: "In House", label: "In House" },
            { value: "Content Owner", label: "Content Owner" },
          ],
          required: true,
        },

        {
          type: "select",
          name: "distributor",
          title: "Select Content Owner",
          placeholder: "Select Content Owner here",
          display: "none",
          options: [],
          required: true,
        },
        {
          type: "select",
          name: "content_access",
          title: "Select Song Access",
          placeholder: "Select Song Access here",
          options: [
            { value: "FREE", label: "FREE" },
            { value: "SVOD", label: "SVOD" },
          ],
          required: true,
        },
        {
          type: "inputBox",
          name: "distributor_commission",
          title: "Pay Per View (In Rupee)",
          display: "none",
          regex: /^(\d{0,1})(\.{0,1})(\d{0,2})$/,
          // maxLength: "2",
          placeholder: "Type here distribitor commission",
          required: true,
        },
      ],
    },
    {
      title: "Details",
      fields: [
        {
          type: "select",
          name: "category",
          title: "Song Category",
          placeholder: "Select Song Category here",
          options: [],
          required: true,
        },
        {
          type: "inputBox",
          name: "title",
          title: "Title",
          placeholder: "Type Song Title here",
          required: true,
        },

        {
          type: "select",
          name: "language",
          title: "Select Language",
          placeholder: "Select Language here",
          size: "3",
          options: [],
          required: true,
        },
        {
          type: "date",
          variant: "date",
          title: "Publish Date",
          min: new Date().toISOString().split("T")[0],
          name: "publish_date",
          default: new Date().toISOString().split("T")[0],
          required: true,
          placeholder: "Select Date",
          size: "3",
        },
        {
          type: "time",
          variant: "time",
          title: "Publish Time",
          default: new Date().toISOString().split("T")[1],
          name: "publish_time",
          placeholder: "Select Time",
          required: true,
          size: "3",
        },
        {
          type: "date",
          title: "Expiry Time",
          default: new Date().toISOString().split("T")[0],
          name: "expiry_date",
          placeholder: "Select Date",
          required: true,
          size: "3",
        },
        {
          type: "toggle",
          title: "Song Display In",
          name: "available_for_platform",
          default: "All",
          size: "4",
          options: [
            { value: "All", color: "success" },
            { value: "Web", color: "danger" },
            { value: "Android", color: "danger" },
            { value: "IOS", color: "danger" },
          ],
        },
                {
          type: "select",
          name: "song_type",
          title: "Select Song Type",
          placeholder: "Select Type",
          size: "4",
          options: [
            { label: "Exclusive", value: "Exclusive" },
            { label: "Non-Exclusive", value: "Non-Exclusive" },
          ],
          required: true,
        },
         {
          type: "inputBox",
          name: "sequence",
          title: "Sequence",
          display: "none",
          regex: /^[0-9\.]+$/,
          // maxLength: "2",
          size: "4",
          placeholder: "Type Sequence",
          required: true,
        },
        {
          type: "table",
          castCrewFormStructure: castCrewFormStructure,
          tableColumns: tableColumns,
          name: "resume123",
          formTitle: isEdit ? "Edit Cast" : "Add Cast",
          title: "Resume/CV",
          description: "PDF, DOC, DOCX (Max 5MB)",
          accept: ".pdf,.doc,.docx",
          size: 6,
          // required: true,
        },
        {
          type: "inputBox",
          title: "Song Description",
          placeholder: "Type Song Description here",
          name: "description",
          required: true,
          size: "12",
          isLimit: "Description",
          showLimit: true,
          maxLength: "500",
          row: "4",
          multiline: true,
        },
      ],
    },
    {
      title: "Media",
      fields: [
        {
          type: "inputBox",
          name: "content_link",
          title: "Song Link",
          placeholder: "Paste Song Link (.M3U8) here",
          required: true,
          size: "9",
        },
        {
          type: "duration",
          name: "durations",
          title: "Song Duration",
          placeholder: "Type Song Duration",
          size: "3",
          placeholder: "Type here",
          required: true,
          disabled: true,
        },
        {
          type: "image",
          name: "poster",
          title: "Song Portrait",
          description: "Image size",
          image_size: "980 * 1300 PX",
          accept: "image/*",
          size: 4,
          required: true,
        },
        {
          type: "image",
          name: "thumbnail",
          title: "Song Landscape",
          description: "Image size",
          image_size: "1920 * 1080 PX",
          accept: "image/*",
          size: 4,
          required: true,
        },
      ],
    },
  ]);

  useMemo(() => {
    if (casts) {
      const temp = castCrewFormStructure;
      temp[0]["options"] = casts?.data?.map((ele) => ({
        label: ele?.cast_name,
        value: ele?.cast_name,
      }));
      setCastCrewFormStructure([...temp]);
    }
  }, [casts]);

  const videoRef = useRef(null);

  useEffect(() => {
    if (!form?.content_link) return; // Exit if no movie URL is provided

    const video = videoRef.current;
    const hls = new Hls();

    if (Hls.isSupported()) {
      hls.loadSource(form.content_link);
      hls.attachMedia(video);

      hls.on(Hls.Events.LEVEL_LOADED, (event, data) => {
        const durationInSeconds = data.details.totalduration;
        // console.log("HLS duration loaded");
        setMovieDuration(durationInSeconds);
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = form.content_link;

      const handleLoadedMetadata = () => {
        const durationInSeconds = video.duration;
        // console.log("Native HLS duration loaded");
        setMovieDuration(durationInSeconds);
      };

      video.addEventListener("loadedmetadata", handleLoadedMetadata);

      // Clean up event listener
      return () => {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
    }

    // Clean up HLS instance
    return () => {
      if (hls) hls.destroy();
    };
  }, [form?.content_link]);

  const setMovieDuration = (durationInSeconds) => {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = Math.floor(durationInSeconds % 60);

    const hDisplay = hours > 9 ? hours : "0" + hours;
    const mDisplay = minutes > 9 ? minutes : "0" + minutes;
    const sDisplay = seconds > 9 ? seconds : "0" + seconds;

    setForm((prevForm) => ({
      ...prevForm,
      durations: `${hDisplay}:${mDisplay}:${sDisplay}`,
    }));
  };

  useEffect(() => {
    if (form?.ownership === "Content Owner") {
      setFormStructure((prevFormStructure) =>
        prevFormStructure.map((section) => {
          if (section.title === "Ownership") {
            const updatedFields = section.fields.map((field, index) => {
              if (index === 1) {
                return { ...field, display: "block" };
              }
              if (index == 3) {
                if (form?.content_access === "SVOD") {
                  return { ...field, display: "block" };
                } else {
                  return { ...field, display: "none" };
                }
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
          if (section.title === "Ownership") {
            const updatedFields = section.fields.map((field, index) => {
              if (index === 1) {
                return { ...field, display: "none" };
              }
              if (index == 3) {
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
  }, [form?.ownership]);
  useEffect(() => {
    if (distributors?.data) {
      setFormStructure((prevFormStructure) =>
        prevFormStructure.map((section) => {
          if (section.title === "Ownership") {
            const updatedFields = section.fields.map((field, index) => {
              if (index === 1) {
                return {
                  ...field,
                  options: distributors?.data?.map((ele) => ({
                    label: ele?.distributor_name,
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
  }, [distributors]);

  useEffect(() => {
    setFormStructure((prevFormStructure) =>
      prevFormStructure?.map((section) => {
        if (section.title !== "Details") return section;

        const updatedFields = section.fields.map((field, index) => {
          if (index === 0 && categories) {
            return {
              ...field,
              options: categories.data.map((c) => ({
                label: c.category_name,
                value: c.id,
              })),
            };
          }
          if (index === 2 && language) {
            return {
              ...field,
              options: language.data.map((l) => ({
                label: l.language_name,
                value: l.id,
              })),
            };
          }
          return field;
        });

        return { ...section, fields: updatedFields };
      })
    );
    if (categories?.data) {
      const tempFilter = tableData;
      tempFilter["filterColumn"][1]["options"] = categories?.data?.map(
        (ele) => ele?.category_name
      );

      setTableData({ ...tempFilter });
    }
  }, [categories, language]);

  useEffect(() => {
    if (form?.ownership === "Content Owner") {
      setFormStructure((prevFormStructure) =>
        prevFormStructure.map((section) => {
          if (section.title === "Ownership") {
            const updatedFields = section.fields.map((field, index) => {
              if (index == 3) {
                if (form?.content_access === "SVOD") {
                  return { ...field, display: "block" };
                } else {
                  return { ...field, display: "none" };
                }
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
        prevFormStructure.map((section) => {
          if (section.title === "Ownership") {
            const updatedFields = section.fields.map((field, index) => {
              if (index == 3) {
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
  }, [form?.content_access]);

  // console.log(form, "Sdfsdfdsfdsfsffd");
  useEffect(() => {
    if (user?.id) {
      const data = new FormData();
      data.append("id", user?.id);
      data.append("user", user?.id);
      dispatch(all_song_category_list_admin());
      dispatch(all_cast_list());
      dispatch(all_language_list());
      dispatch(all_distributor_list());
    }
  }, [user?.id]);
    const handleForm = (id, image) => {
    setEditingIndex(null);
    setIsModalOpen(true);
    // setIsEdit(false);
    setFormNoti({
      user_type: "Customer",
      receiver_type: "All",
      notification_image: image,
    });
  };
  useMemo(() => {
    if (song?.data) {
      const temp = tableData;
      temp.tableBody = song?.data?.map((value, index) => ({
        ...value,
        // uploaded_by: value?.created_by?.firstName,
        // movie_suggestion:value?.movie_suggestion?.movie_name,
        // movie_producer:value?.movie_producer?.name,
        // movie_distributor: value?.movie_distributor?.name,
        // company_name: value?.movie_distributor?.company_name,
        distributor_name:
          value?.ownership == "Content Owner" ? value?.distributor_name : null,
        movie_access1:
          value?.content_access === "FREE" ? (
            <span style={{ color: "var(--successColor)" }}>
              {value?.content_access}
            </span>
          ) : value?.content_access === "TVOD" ? (
            <span style={{ color: "var(--dangerColor)" }}>
              {value?.content_access}
            </span>
          ) : (
            <span style={{ color: "var(--warningColor)" }}>
              {value?.content_access}
            </span>
          ),
                  notification: (
          // <Link
          //   to="/Notifications/CreateNotifications/"
          //   state={{ customer: ele?.id, send: "nofitication" }}
          // >
          <img
            src={notification_icon}
            alt="Notifications"
            height={"25px"}
            onClick={() => handleForm(value?.id, value?.thumbnail)}
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
            onClick={() => navigate("detail", { state: { id: value?.id } })}
          />
        ),
        // sub_category_list: value?.subcategory_name.join(" , "),
        // rental_price: parseFloat(value?.rental_price).toFixed(2),
        released_status:
          new Date(value?.release_date) > new Date()
            ? "Upcoming"
            : value?.release_date,
      }));
      setTableData({ ...temp });
      setForm({ ...form });
    }
  }, [song]);
    useEffect(() => {
      if (isEdit) {
        setFormStructure((prevFormStructure) =>
          prevFormStructure.map((section) => {
            if (section.title === "Details") {
              const updatedFields = section.fields.map((field, index) => {
                if (index === 8) {
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
          prevFormStructure.map((section) => {
            if (section.title === "Details") {
              const updatedFields = section.fields.map((field, index) => {
                if (index === 8) {
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
  // useMemo(() => {
  //   if (categories?.data) {
  //     const tempFilter = tableData;
  //     tempFilter["filterColumn"][1]["options"] = categories?.data?.map(
  //       (ele) => ele?.category_name
  //     );

  //     setTableData({ ...tempFilter });
  //     // setFormStructure([...temp])
  //   }
  // }, [categories]);
  // console.log(tableData, "xcxzxzxzxzxz");
  // useMemo(() => {
  //   if (subcategories?.data) {
  //     const tempFilter = tableData;
  //     tempFilter["filterColumn"][2]["options"] = subcategories?.data;

  //     setTableData({ ...tempFilter });
  //     // setFormStructure([...temp])
  //   }
  // }, [subcategories]);

  // console.log("dfdsfdfdsfdfdffffdsff", form1);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    Object.keys(form)?.map(
      (key) => key !== "cast" && data.append(key, form?.[key])
    );
    data.append("cast", JSON.stringify(form?.cast));
    data.append("user", user?.id);
    if (isEdit) {
      const resData = await song_update(data);
      if (resData?.status === 200) {
        setForm({});
        setSave(!save);
        setDrawer(false);
      } else {
        setForm(form);
      }
    } else {
      const resData = await song_create(data);
      if (resData?.status === 200) {
        // setForm({});
        setForm({});
        setSave(!save);
        setDrawer(false);
      } else {
        setForm(form);
      }
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
      // setSave(!save);
      setFormNoti({});
      // callbackFun([]);
      // navigate("/masters/category/", { state: { formUpload: true } });
    } else {
      setFormNoti(formNoti);
      // setIsModalOpen(true)
    }
  };
  // console.log(form , "newForm DAtaa1234")
  return (
    <div>
      <video ref={videoRef} controls style={{ display: "none" }} />

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
        view="view_all"
        isLoadingData={true}
        loadApi={Action.all_song_list_admin}
        totalCount={song?.song_count}
        save={save}
        setSave={setSave}
        isDrawerForm={true}
        openDrawer={drawer}
        setOpenDrawer={setDrawer}
        formStructure={formStructure}
        handleSubmit={handleSubmit}
        form={form}
        isEdit={isEdit}
        formTitle={isEdit ? "Edit Song" : "Add Song"}
        exportButton={
          <Export
            fileName={"Song"}
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

export default Song;
