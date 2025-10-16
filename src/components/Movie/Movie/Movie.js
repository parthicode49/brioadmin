import React, { useEffect, useMemo, useRef, useState } from "react";
// import {
//   all_movie_list_admin_loadless,
//   movie_delete,
//   movie_update,
// } from "../../../actions/Movie/movie";
import { all_subcategory_list } from "../../../actions/Masters/subcategory";
import { all_category_list } from "../../../actions/Masters/category";
import { all_genre_list } from "../../../actions/Masters/genre";
import { all_language_list } from "../../../actions/Masters/language";
import { useDispatch, useSelector } from "react-redux";
import ListTable from "../../utils/Table";
import { TableData } from "./TableData";
import { useNavigate } from "react-router-dom";
import Export from "../../utils/Export";
import { all_cast_list } from "../../../actions/Masters/cast";
import Hls from "hls.js";
import * as Action from "../../../actions/Movie/movie";
import * as NotiAction from "../../../actions/notification";
import { bindActionCreators } from "redux";
import { all_distributor_list } from "../../../actions/distributor";
import { all_country_list } from "../../../actions/Masters/country";
import { all_subscription_list } from "../../../actions/subscription";
import { all_content_advisory_list } from "../../../actions/Masters/contentadvisory";
import InfoIcone from "../../../images/info.png";
import notification_icon from "../../../images/notification_icon.png";
import DynamicFormModal from "../../utils/NewFormStructure/DynamicFormModal";
const Movie = () => {
  const navigate = useNavigate();
  const role = useSelector((state) => state.layout.role);
  const [form, setForm] = useState({});
  const [formNoti, setFormNoti] = useState({});
  const [form1, setForm1] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [save, setSave] = useState(false);
  const dispatch = useDispatch();
  const { movie_create, movie_update } = bindActionCreators(Action, dispatch);
  const { notification_create } = bindActionCreators(NotiAction, dispatch);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableData1, setTableData1] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const tempTableData = {
    ...TableData(),
    deleteRecord: Action.movie_delete,
    disableDelete: role !== "Distributor" ? false : true,

    onDeleteText: [
      "Are you sure want to delete this video ?",
      "The Customer Will not be able to see this video once you delete it.",
    ],
    customisedStatusUpdateMessage: true,
    onActiveText: "Are you sure want to Activate the video ?",
    onInactiveText: [
      "Are you sure want to Inactivate the video ?",
      "The Customer Will not be able to see this video once you Inactivate it.",
    ],
    updateRecord: Action.movie_status_update,
  };
  const user = useSelector((state) => state.layout.profile);
  const movies = useSelector((state) => state?.movies?.movies);
  const categories = useSelector((state) => state.masters.categories);
  const subcategories = useSelector((state) => state.masters.subcategories);
  const genre = useSelector((state) => state.masters.genre);
  const casts = useSelector((state) => state.masters.casts);
  const language = useSelector((state) => state.masters.languages);
  const distributors = useSelector((state) => state.distributors.distributors);
  const Advisory = useSelector((state) => state.masters.advisory);
  const subscriptions = useSelector(
    (state) => state?.subscriptions?.subscriptions
  );
  const [usedCountries, setUsedCountries] = useState([]);
  const [tableData, setTableData] = useState({ ...tempTableData });

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
  const [subTitleFormStructure, setSubTitleFormStructure] = useState([
    {
      type: "select",
      name: "language",
      title: "Language",
      placeholder: "Select language",
      options: [],
      required: true,
    },
    {
      type: "file",
      name: "subtitle_file",
      title: "Subtitle File",
      description: "Upload a Subtitle File (.vtt , .srt)",
      accept: ".srt,.vtt",
      size: 12,
      required: true,
    },
  ]);
  const [audioFormStructure, setAudioFormStructure] = useState([
    {
      type: "select",
      name: "language",
      title: "Language",
      placeholder: "Select language",
      options: [],
      required: true,
    },
    {
      type: "file",
      name: "audio_file",
      title: "Audio File",
      description: "Upload a Audio File (.mp3 )",
      accept: ".mp3",
      size: 12,
      required: true,
    },
  ]);
  // Define table columns
  const tableColumns = [
    { title: "Cast Name", field: "cast" },
    { title: "Character", field: "character_name" },
  ];

  const tableColumnSubtitle = [
    { title: "Language", field: "language" },
    { title: "File", field: "subtitle_file" },
  ];
  const tableColumnAudio = [
    { title: "Language", field: "language" },
    { title: "File", field: "audio_file" },
  ];

  const handleSubmit1 = async () => {
    console.log("dddddddddddddddddddd", formNoti);
    const data = new FormData();
    Object.keys(formNoti)?.map((key) => data.append(key, formNoti?.[key]));
    const resData = await notification_create(data);
    console.log(resData, "neweweweweweew");
    if (resData?.status === 200) {
      setIsModalOpen(false);
      setSave(!save);
      setFormNoti({});
      // callbackFun([]);
      // navigate("/masters/category/", { state: { formUpload: true } });
    } else {
      setFormNoti(formNoti);
      // setIsModalOpen(true)
    }
  };

  // Handle edit
  const handleEdit = (index, row) => {
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  // Handle delete
  const handleDelete = (index) => {
    const newData = tableData1.filter((_, i) => i !== index);
    setTableData1(newData);
  };
  // console.log(form, "dfdsfdsfsdffds");
  const options = [
    { value: "1", label: "PArth" },
    { value: "2", label: "PArth2" },
    { value: "3", label: "PArth3" },
  ];
  const [formStructure, setFormStructure] = useState([
    {
      title: "Ownership",
      fields: [
        {
          type: "select",
          name: "ownership",
          title: "Movie Ownership",
          placeholder: "Select Ownership",
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
          placeholder: "Select Content Owner",
          display: "none",
          options: [],
          required: true,
        },
        {
          type: "select",
          name: "content_access",
          title: "Select Movie Access",
          placeholder: "Select Movie Access",
          options: [
            { value: "FREE", label: "FREE" },
            { value: "SVOD", label: "SVOD" },
            { value: "TVOD", label: "TVOD" },
          ],
          required: true,
        },
        {
          type: "inputBox",
          name: "distributor_commission",
          title: "Pay Per View (In Rupee)",
          display: "none",
          regex: /^(\d{0,1})(\.{0,1})(\d{0,2})$/,
          placeholder: "Type Content Owner commission",
          required: true,
        },
        {
          type: "inputBox",
          name: "distributor_tvod_commission",
          title: "Rent Commission (In Percentage)",
          display: "none",
          regex: /^[0-9\.]+$/,
          maxLength: "2",
          placeholder: "Type Content Owner commission",
          required: true,
        },
        {
          type: "select",
          name: "available_for_plan",
          title: "Select Plan",
          display: "none",
          placeholder: "Select Movie Plan",
          options: [],
          // required: true,
        },
      ],
    },
    {
      title: "Details",
      fields: [
        {
          type: "select",
          name: "category",
          title: "Movie Category",
          placeholder: "Select Movie Category",
          options: [],
          required: true,
        },
        {
          type: "select_multiple",
          name: "subcategory",
          title: "Movie Subcategory",
          placeholder: "Select Movie Subcategory",
          maxSelections: "3",
          options: [],
          required: true,
        },
        {
          type: "inputBox",
          name: "title",
          title: "Title",
          placeholder: "Type Movie Title",
          required: true,
        },

        {
          type: "select",
          name: "language",
          title: "Select Language",
          placeholder: "Select Language",
          size: "3",
          options: [],
          required: true,
        },
        {
          type: "select",
          name: "content_advisory",
          title: "Select Content Advisory",
          placeholder: "Select Content Advisory",
          size: "3",
          options: [],
          required: true,
        },

        // {
        //   type: "date",
        //   variant: "date",
        //   title: "Publish Date",
        //   min: new Date().toISOString().split("T")[0],
        //   name: "publish_date",
        //   default: new Date().toISOString().split("T")[0],
        //   required: true,
        //   placeholder: "Select Date",
        //   size: "3",
        // },
        // {
        //   type: "time",
        //   variant: "time",
        //   title: "Publish Time",
        //   default: new Date().toISOString().split("T")[1],
        //   name: "publish_time",
        //   placeholder: "Select Time",
        //   required: true,
        //   size: "3",
        // },

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
          title: "Movie Display In",
          name: "available_for_platform",
          default: "All",
          // required: true,
          size: "3",
          options: [
            { value: "All", color: "success" },
            { value: "Web", color: "danger" },
            { value: "Android", color: "danger" },
            { value: "IOS", color: "danger" },
          ],
        },
        {
          type: "select",
          name: "movie_type",
          title: "Select Movie Type",
          placeholder: "Select Type",
          // size: "3",
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
          // size: "3",
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
          title: "Movie Description",
          placeholder: "Type Movie Description",
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
          title: "Movie Link",
          placeholder: "Paste Movie Link (.M3U8)",
          required: true,
          size: "9",
        },
        {
          type: "duration",
          name: "durations",
          title: "Movie Duration",
          placeholder: "Type Movie Duration",
          size: "3",
          placeholder: "Type Duration",
          required: true,
          disabled: true,
        },
        {
          type: "inputBox",
          name: "content_trailer_link",
          title: "Movie Trailer Link",
          placeholder: "Paste Movie Trailer Link (.M3U8)",
          // required: true,
          size: "9",
        },
        {
          type: "duration",
          name: "trailer_durations",
          title: "Movie Trailer Duration",
          placeholder: "Type Movie Trailer Duration",
          size: "3",
          placeholder: "Type Movie Trailer Duration",
          // required: true,
          disabled: true,
        },
        // {
        //   type: "duration",
        //   name: "free_preview_durations",
        //   title: "Free Preview Duration",
        //   placeholder: "Type Free Preview Duration",
        //   size: "4",
        //   placeholder: "Type Free Preview Duration",
        //   required: true,
        // },
         {
          type: "inputBox",
          name: "asset_id",
          title: "Movie Asset ID",
          placeholder: "Paste Movie Asset ID",
          required: true,
          size: "4",
        },
        {
          type: "image",
          name: "poster",
          title: "Movie Portrait",
          description: "Image size",
          image_size: "980 * 1300 PX",
          accept: "image/*",
          size: 4,
          required: true,
        },
        {
          type: "image",
          name: "thumbnail",
          title: "Movie Landscape",
          description: "Image size",
          image_size: "1920 * 1080 PX",
          accept: "image/*",
          size: 4,
          required: true,
        },
        // {
        //   type: "subtitle_table",
        //   subTitleFormStructure: subTitleFormStructure,
        //   tableColumns: tableColumnSubtitle,
        //   name: "resume123",
        //   formTitle: isEdit ? "Edit Subtitle" : "Add Subtitle",
        //   title: "Resume/CV",
        //   description: "PDF, DOC, DOCX (Max 5MB)",
        //   accept: ".pdf,.doc,.docx",
        //   size: 6,
        //   // required: true,
        // },
        // {
        //   type: "audio_table",
        //   audioFormStructure: audioFormStructure,
        //   tableColumns: tableColumnAudio,
        //   name: "resume123",
        //   formTitle: isEdit ? "Edit Audio" : "Add Audio",
        //   title: "Resume/CV",
        //   description: "PDF, DOC, DOCX (Max 5MB)",
        //   accept: ".pdf,.doc,.docx",
        //   size: 6,
        //   // required: true,
        // },
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
  useMemo(() => {
    if (language?.data) {
      const temp = subTitleFormStructure;
      temp[0]["options"] = language?.data?.map((ele) => ({
        label: ele?.language_name,
        value: ele?.language_name,
      }));
      setSubTitleFormStructure([...temp]);
    }
  }, [language]);
  useMemo(() => {
    if (language?.data) {
      const temp = audioFormStructure;
      temp[0]["options"] = language?.data?.map((ele) => ({
        label: ele?.language_name,
        value: ele?.language_name,
      }));
      setAudioFormStructure([...temp]);
    }
  }, [language]);

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
  const [countryFormStructure, setCountryFormStructure] = useState([
    {
      type: "select",
      name: "country",
      title: "Country",
      placeholder: "Select Country",
      options: [],
      required: true,
    },
    {
      type: "inputBox",
      name: "price",
      title: "price",
      placeholder: "Enter price",
      required: true,
      regex: /^[0-9\.]+$/,
      maxLength: "4",
    },
    // {
    //   type: "inputBox",
    //   name: "discount_price",
    //   title: "Discount Price",
    //   placeholder: "Enter Discount Price",
    //   required: true,
    //   regex: /^[0-9\.]+$/,
    //   maxLength: "3",
    // },
  ]);
  const countries = useSelector((state) => state?.masters?.countries);

  const tableColumnsForCountry = [
    { title: "Country Name", field: "country" },
    // { title: "Discount Price", field: "discount_price" },
    { title: "Price", field: "price" },
    // { title: "Final Price", field: "discount_price" },
  ];
  useMemo(() => {
    if (countries?.data) {
      const temp = [...countryFormStructure];
      temp[0]["options"] = countries?.data
        .filter((ele) => !usedCountries.includes(ele?.id))
        .map((ele) => ({
          label: ele.country_name,
          value: ele.country_name,
        }));
      setCountryFormStructure(temp);
    }
  }, [countries, usedCountries]);
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
  const videoTriRef = useRef(null);

  useEffect(() => {
    if (!form?.content_trailer_link) return; // Exit if no movie URL is provided

    const video = videoTriRef.current;
    const hls = new Hls();

    if (Hls.isSupported()) {
      hls.loadSource(form.content_trailer_link);
      hls.attachMedia(video);

      hls.on(Hls.Events.LEVEL_LOADED, (event, data) => {
        const durationInSeconds = data.details.totalduration;
        // console.log("HLS duration loaded");
        setMovieTirDuration(durationInSeconds);
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = form.content_trailer_link;

      const handleLoadedMetadata = () => {
        const durationInSeconds = video.duration;
        // console.log("Native HLS duration loaded");
        setMovieTirDuration(durationInSeconds);
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
  }, [form?.content_trailer_link]);

  const setMovieTirDuration = (durationInSeconds) => {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = Math.floor(durationInSeconds % 60);

    const hDisplay = hours > 9 ? hours : "0" + hours;
    const mDisplay = minutes > 9 ? minutes : "0" + minutes;
    const sDisplay = seconds > 9 ? seconds : "0" + seconds;

    setForm((prevForm) => ({
      ...prevForm,
      trailer_durations: `${hDisplay}:${mDisplay}:${sDisplay}`,
    }));
  };
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
              if (index == 4) {
                if (form?.content_access === "TVOD") {
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
              if (index == 4) {
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
    if (subscriptions?.data) {
      setFormStructure((prevFormStructure) =>
        prevFormStructure.map((section) => {
          if (section.title === "Ownership") {
            const updatedFields = section.fields.map((field, index) => {
              if (index === 5) {
                return {
                  ...field,
                  options: subscriptions?.data?.map((ele) => ({
                    label: ele?.plan_name,
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
  }, [subscriptions]);
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
                  .filter((s) => s.category_id === form.category && s?.content_type == "Movie" )
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

          if (index === 3 && language) {
            return {
              ...field,
              options: language.data.map((l) => ({
                label: l.language_name,
                value: l.id,
              })),
            };
          }
          if (index === 4 && Advisory) {
            return {
              ...field,
              options: Advisory.data.map((l) => ({
                label: l.content_advisory,
                value: l.id,
              })),
            };
          }

          return field;
        });

        return { ...section, fields: updatedFields };
      })
    );
  }, [categories, language, Advisory, subcategories, form?.category]);

  useEffect(() => {
    setFormStructure((prevFormStructure) => {
      const hasRentSection = prevFormStructure?.some(
        (section) => section.title === "Country Wise Price"
      );

      // If TVOD, and Rent section doesn't exist -> add it
      if (form?.content_access === "TVOD" && !hasRentSection) {
        return [
          ...prevFormStructure,
          {
            title: "Country Wise Price",
            fields: [
              {
                id: "10",
                type: "inputBox",
                title: `Available Days`,
                placeholder: "Type Movie Available Days",
                name: "tvod_available_days",
                regex: /^[0-9\.]+$/,
                maxLength: "2",
                required: true,
              },
              {
                type: "country_table",
                countryFormStructure: countryFormStructure,
                tableColumns: tableColumnsForCountry,
                name: "countrys",
                formTitle: isEdit ? "Edit Country" : "Add Country",
                title: "Resume/CV",
                description: "PDF, DOC, DOCX (Max 5MB)",
                accept: ".pdf,.doc,.docx",
                size: 6,
                required: true,
              },
            ],
          },
        ];
      }

      // If not TVOD, and Rent section exists -> remove it
      if (form?.content_access !== "TVOD" && hasRentSection) {
        return prevFormStructure.filter(
          (section) => section.title !== "Country Wise Price"
        );
      }

      return prevFormStructure; // no change needed
    });

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
              if (index == 4) {
                if (form?.content_access === "TVOD") {
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
              if (index == 4) {
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

    if (form?.content_access === "SVOD") {
      setFormStructure((prevFormStructure) =>
        prevFormStructure.map((section) => {
          if (section.title === "Ownership") {
            const updatedFields = section.fields.map((field, index) => {
              if (index === 5) {
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
          if (section.title === "Ownership") {
            const updatedFields = section.fields.map((field, index) => {
              if (index === 5) {
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
  // console.log(form, "Sdfsdfdsfdsfsffd");
  useEffect(() => {
    if (user?.id) {
      const data = new FormData();
      data.append("id", user?.id);
      data.append("user", user?.id);
      dispatch(all_subcategory_list());
      dispatch(all_category_list());
      dispatch(all_cast_list());
      dispatch(all_language_list());
      dispatch(all_distributor_list());
      dispatch(all_country_list());
      dispatch(all_subscription_list());
      dispatch(all_content_advisory_list());
    }
  }, [user?.id]);
  useMemo(() => {
    if (movies?.data) {
      const temp = tableData;
      temp.tableBody = movies?.data?.map((value, index) => ({
        ...value,
        uploaded_by: value?.created_by?.firstName,
        // movie_suggestion:value?.movie_suggestion?.movie_name,
        // movie_producer:value?.movie_producer?.name,
        // movie_distributor: value?.movie_distributor?.name,
        // company_name: value?.movie_distributor?.company_name,
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
        sub_category_list: value?.subcategory_name.join(" , "),
        distributor_name:
          value?.ownership == "Content Owner" ? value?.distributor_name : null,
        rental_price: parseFloat(value?.rental_price).toFixed(2),
        info: (
          <img
            src={InfoIcone}
            width="20px"
            height="20px"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("detail", { state: { id: value?.id } })}
          />
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
        released_status:
          new Date(value?.release_date) > new Date()
            ? "Upcoming"
            : value?.release_date,
      }));
      setTableData({ ...temp });
      setForm({ ...form });
    }
  }, [movies]);
  useMemo(() => {
    if (categories?.data) {
      const tempFilter = tableData;
      tempFilter["filterColumn"][1]["options"] = categories?.data?.map(
        (ele) => ele?.category_name
      );

      setTableData({ ...tempFilter });
      // setFormStructure([...temp])
    }
  }, [categories]);
  console.log(tableData, "xcxzxzxzxzxz");
  useMemo(() => {
    if (subcategories?.data) {
      const tempFilter = tableData;
      tempFilter["filterColumn"][2]["options"] = subcategories?.data;

      setTableData({ ...tempFilter });
      // setFormStructure([...temp])
    }
  }, [subcategories]);

  // console.log("dfdsfdfdsfdfdffffdsff", form1);
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(form, "New Folemm");
    const data = new FormData();
    Object.keys(form)?.map(
      (key) =>
        key !== "cast" &&
        key !== "countrys" &&
        key !== "subtitle_file" &&
        key !== "audio_file" &&
        data.append(key, form?.[key])
    );
    data.append("cast", JSON.stringify(form?.cast));
    data.append("countrys", JSON.stringify(form?.countrys));
    data.append("user", user?.id);
    if (isEdit) {
      const resData = await movie_update(data);
      if (resData?.status === 200) {
        setForm({});
        setSave(!save);
        setDrawer(false);
      } else {
        setForm(form);
      }
    } else {
      const resData = await movie_create(data);
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
  // console.log(form , "newForm DAtaa1234")
  return (
    <div>
      <video ref={videoRef} controls style={{ display: "none" }} />
      <video ref={videoTriRef} controls style={{ display: "none" }} />
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
        loadApi={Action.all_movie_list}
        totalCount={movies?.movie_count}
        save={save}
        setSave={setSave}
        // isCountry={true}
        setUsedCountries={setUsedCountries}
        isDrawerForm={true}
        openDrawer={drawer}
        setOpenDrawer={setDrawer}
        formStructure={formStructure}
        handleSubmit={handleSubmit}
        form={form}
        isEdit={isEdit}
        formTitle={isEdit ? "Edit Movie" : "Add Movie"}
        exportButton={
          <Export
            fileName={"Movie"}
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

export default Movie;
