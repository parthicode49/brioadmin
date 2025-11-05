import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListTable from "../utils/Table";
import { useLocation, useNavigate } from "react-router-dom";
// import {
//   all_sliderbanner_list,
//   sliderbanner_delete,
//   sliderbanner_update,
// } from "../../actions/sliderbanner";
import * as Action from "../../actions/comingSoon";
import Export from "../utils/Export";
import { bindActionCreators } from "redux";
import { all_subcategory_list } from "../../actions/Masters/subcategory";
import { all_category_list } from "../../actions/Masters/category";
import { all_language_list } from "../../actions/Masters/language";
import Hls from "hls.js";
import { all_cast_list } from "../../actions/Masters/cast";
import { useAccessControl } from "../utils/useAccessControl";

const ComingSoon = () => {
  const { canView, canEdit, isReadOnly } = useAccessControl("Coming Soon");
  console.log(canView, canEdit, isReadOnly, "vvvvvvvvv")
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.layout.profile);
  const rights = useSelector((state) => state.layout.rights);
  const { coming_soon_create, coming_soon_update } = bindActionCreators(
    Action,
    dispatch
  );
  const [form, setForm] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [save, setSave] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const comingsoon = useSelector((state) => state.comingsoon?.coming_soon);
  const [tableData, setTableData] = useState({
    tableTitle: "Coming Soon",
    deleteRecord: Action.coming_soon_delete,
    updateRecord: Action.coming_soon_status_update,
    deleteAccess: rights?.["Slider Banner"]?.["delete"] == "true",
    customisedStatusUpdateMessage: true,
    onDeleteText: "Are you sure want to delete Coming Soon ?",
    onActiveText: "Are you Sure want to Activate Coming Soon ?",
    onInactiveText: "Are you Sure want to Inactivate Coming Soon ?",
    tableHead: [

      {
        id: "title",
        label: "Name",
        // link: "/Movie/MovieDetails",
        color: "var(--gradientColor2)",
        // subText: "movie_subcategory"
      },
      {
        id: "thumbnail",
        label: "Image",
        isImage: true,
      },
      {
        id: "category_name",
        label: "Category",
        subText: "sub_category_name",
      },
      // ,
      // role !== "Distributor" &&   {
      //   id: 'uploaded_by',
      //   label: 'Uploaded By',

      // },
      // ,
      {
        id: "content_type",
        label: "Type",
      },
      {
        id:"publish_date",
        label:"Release Date",
        subText : "publish_time"
      }
      ,

      // {
      //   id: "language_name",
      //   label: "Language",
      // },
      // {
      //   id: 'ott_platform',
      //   label: 'Ott name',
      // },
      // {
      //   id: 'content_advisory',
      //   label: 'Content Type',
      // },
      // role === "Distributor" &&    {
      //   id: 'rental_price',
      //   label: 'TVOD Amount',
      //   // isSpecial: true,
      // 	// align: "left"
      // },
      // ,
      {
        id: "sequence",
        label: "Sequence",
      },
      {
        id: "movieViews",
        label: "Views",
      },

      // {
      //   id: 'movieLikes',
      //   label: 'Likes',
      // },
      // ,
      // {
      //   id: 'dislikes',
      //   label: 'Dislikes',
      // },
      // {
      //   id: 'total_downloads',
      //   label: 'Downloads',
      // },

      // role != "Distributor" &&
      {
        id: "status",
        label: "Status",
        // isButtonDisplay: true
      },
      {
        id: "edit",
        label: "Update",
        access: rights?.["Distributor"]?.["edit"] == "true",
        isNewForm: true,
      },
    ],
    tableBody: [],
    filterColumn: [
      //   {
      //     id: "2",
      //     title: "Video Type",
      //     name: "videoType",
      //     options: ["Movie", "Series"],
      //   },
      //   {
      //     id: "2",
      //     title: "Slider Type",
      //     name: "slider_type",
      //     options: ["Image", "Video"],
      //   },
    ],
  });

  const categories = useSelector((state) => state.masters.categories);
  const subcategories = useSelector((state) => state.masters.subcategories);
  const language = useSelector((state) => state.masters.languages);
  const casts = useSelector((state) => state.masters.casts);
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
  const tableColumns = [
    { title: "Cast Name", field: "cast" },
    { title: "Character", field: "character_name" },
  ];

  // const genre = useSelector((state) => state.masters.genre);
  // const language = useSelector((state) => state.masters.languages);

  // console.log(location,"locationns")
  useEffect(() => {
    if (user?.id) {
      dispatch(all_subcategory_list());
      dispatch(all_category_list());
      dispatch(all_language_list());
      dispatch(all_cast_list());
    }
  }, [user?.id]);
  useEffect(() => {
    if (user?.id) {
      const data = new FormData();
      data.append("id", user?.id);
      data.append("user", user?.id);
      dispatch(Action.all_coming_soon_list_admin(data));
    }
  }, [user?.id, save]);
  useMemo(() => {
    if (comingsoon?.data) {
      const temp = tableData;
      temp.tableBody =
        comingsoon?.data?.map((ele) => ({
          ...ele,
          sub_category_name: ele?.subcategory_name?.join(" , "),
        })) || [];

      setTableData({ ...temp });
      setForm({ ...form });
    }
  }, [comingsoon]);

  const [formStructure, setFormStructure] = useState([
    //    {
    //   title: "Ownership",
    //   fields: [
    //     {
    //       type: "select",
    //       name: "ownership",
    //       title: "Song Ownership",
    //       placeholder: "Select Ownership here",

    //       options: [
    //         { value: "In House", label: "In House" },
    //         { value: "Content Owner", label: "Content Owner" },
    //       ],
    //       required: true,
    //     },

    //     {
    //       type: "select",
    //       name: "distributor",
    //       title: "Select Content Owner",
    //       placeholder: "Select Content Owner here",
    //       display: "none",
    //       options: [],
    //       required: true,
    //     },
    //   ],
    // },
    {
      title: "Details",
      fields: [
        {
          type: "select",
          name: "category",
          title: "Category",
          placeholder: "Select Content Category here",
          options: [],
          required: true,
        },
        {
          type: "select_multiple",
          name: "subcategory",
          title: "Subcategory",
          placeholder: "Select Content Subcategory here",
          maxSelections: "3",
          options: [],
          required: true,
        },
        {
          type: "select",
          name: "content_type",
          title: "Content Type",
          placeholder: "Select Content Type here",
          //   maxSelections: "3",
          options: [
            { value: "Movie", label: "Movie" },
            // { value: "Song", label: "Song" },
            { value: "Series", label: "Series" },
          ],
          required: true,
        },
        {
          type: "inputBox",
          name: "title",
          title: "Title",
          placeholder: "Type Movie Title here",
          required: true,
        },

        {
          type: "select",
          name: "language",
          title: "Select Language",
          placeholder: "Select Content Language here",
          size: "3",
          options: [
            { value: "In House", label: "In House" },
            { value: "Distributor", label: "Distributor" },
          ],
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
          title: "Description",
          placeholder: "Type Description here",
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
          title: "Content Link",
          placeholder: "Paste Content Link (.M3U8) here",
          required: true,
          size: "9",
        },
        {
          type: "duration",
          name: "durations",
          title: "Duration",
          placeholder: "Type Content Duration",
          size: "3",
          placeholder: "Type here",
          required: true,
          disabled: true,
        },
        {
          type: "image",
          name: "poster",
          title: "Portrait",
          description: "Image size",
          image_size: "980 * 1300 PX",
          accept: "image/*",
          size: 6,
          required: true,
        },
        {
          type: "image",
          name: "thumbnail",
          title: "Landscape",
          description: "Image size",
          image_size: "1920 * 1080 PX",
          accept: "image/*",
          size: 6,
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
    // useEffect(() => {
    //   if (form?.ownership === "Content Owner") {
    //     setFormStructure((prevFormStructure) =>
    //       prevFormStructure.map((section) => {
    //         if (section.title === "Ownership") {
    //           const updatedFields = section.fields.map((field, index) => {
    //             if (index === 1) {
    //               return { ...field, display: "block" };
    //             }
               
    //             return field;
    //           });
    //           return { ...section, fields: updatedFields };
    //         }
    //         return section;
    //       })
    //     );
    //   } else {
    //     setFormStructure((prevFormStructure) =>
    //       prevFormStructure?.map((section) => {
    //         if (section.title === "Ownership") {
    //           const updatedFields = section.fields.map((field, index) => {
    //             if (index === 1) {
    //               return { ...field, display: "none" };
    //             }
    //             if (index == 3) {
    //               return { ...field, display: "none" };
    //             }
    //             return field;
    //           });
    //           return { ...section, fields: updatedFields };
    //         }
    //         return section;
    //       })
    //     );
    //   }
    // }, [form?.ownership]);
    // useEffect(() => {
    //   if (distributors?.data) {
    //     setFormStructure((prevFormStructure) =>
    //       prevFormStructure.map((section) => {
    //         if (section.title === "Ownership") {
    //           const updatedFields = section.fields.map((field, index) => {
    //             if (index === 1) {
    //               return {
    //                 ...field,
    //                 options: distributors?.data?.map((ele) => ({
    //                   label: ele?.distributor_name,
    //                   value: ele?.id,
    //                 })),
    //               };
    //             }
    //             return field;
    //           });
    //           return { ...section, fields: updatedFields };
    //         }
    //         return section;
    //       })
    //     );
    //   }
    // }, [distributors]);
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

          if (index === 1 && subcategories) {
            const options = form?.category
              ? subcategories.data
                  .filter((s) => s.category_id === form.category)
                  .map((s) => ({
                    label: s.subcategory_name,
                    value: s.id,
                  }))
              : subcategories.data.map((s) => ({
                  label: s.subcategory_name,
                  value: s.id,
                }));
            return { ...field, options };
          }

          if (index === 4 && language) {
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
  }, [categories, language, subcategories, form?.category]);
  // useMemo(()=>{
  //   if(series?.statuscode == 200){
  //     // const temp = formStructure
  //     // temp[1][11]["options"] = OttName?.data?.map((ele)=>ele?.ott_name)
  //     const tempFilter = tableData;
  //         tempFilter["filterColumn"][0]["options"] = series?.data?.map(
  //           (ele) => ele?.series_name
  //         );

  //         setTableData({ ...tempFilter });
  //     // setFormStructure([...temp])
  //   }
  // },[series])
  // console.log("tableData",tableData)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    Object.keys(form)?.map(
      (key) => key !== "cast" && data.append(key, form?.[key])
    );
    data.append("user", user?.id);
    data.append("cast", JSON.stringify(form?.cast));
    if (isEdit) {
      const resData = await coming_soon_update(data);
      if (resData?.status === 200) {
        setForm({});
        setSave(!save);
        setDrawer(false);
      } else {
        setForm(form);
      }
    } else {
      const resData = await coming_soon_create(data);
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
  return (
    <div>
      <video ref={videoRef} controls style={{ display: "none" }} />
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
        form={form}
        isEdit={isEdit}
        formTitle={isEdit ? "Edit Coming Soon" : "Add Coming Soon"}
        exportButton={
          <Export
            fileName={"Coming Soon"}
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

export default ComingSoon;
