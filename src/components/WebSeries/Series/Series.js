import React, { useEffect, useMemo, useState } from "react";

import { all_subcategory_list } from "../../../actions/Masters/subcategory";
import { all_category_list } from "../../../actions/Masters/category";
import { all_cast_list } from "../../../actions/Masters/cast";
import { all_language_list } from "../../../actions/Masters/language";
import { useDispatch, useSelector } from "react-redux";
import ListTable from "../../utils/Table";
import { TableData } from "./TableData";
import { useLocation, useNavigate } from "react-router-dom";
import Export from "../../utils/Export";
import * as Action from "../../../actions/WebSeries/series";
import * as NotiAction from "../../../actions/notification";
import { bindActionCreators } from "redux";
import { all_distributor_list } from "../../../actions/distributor";
import { all_subscription_list } from "../../../actions/subscription";
import { all_country_list } from "../../../actions/Masters/country";
import { all_content_advisory_list } from "../../../actions/Masters/contentadvisory";
import notification_icon from "../../../images/notification_icon.png";
import InfoIcone from "../../../images/info.png";
import DynamicFormModal from "../../utils/NewFormStructure/DynamicFormModal";
const Series = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const role = useSelector((state) => state.layout.role);
  const user = useSelector((state) => state.layout.profile);
  const series = useSelector((state) => state?.webseries?.series);
  const categories = useSelector((state) => state.masters.categories);
  const subcategories = useSelector((state) => state.masters.subcategories);
  const language = useSelector((state) => state.masters.languages);
  const distributors = useSelector((state) => state.distributors.distributors);
  const Advisory = useSelector((state) => state.masters.advisory);
  const [usedCountries, setUsedCountries] = useState([]);
  const casts = useSelector((state) => state.masters.casts);
  const [save, setSave] = useState(false);
  const [form, setForm] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [formNoti, setFormNoti] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const { series_create, series_update } = bindActionCreators(Action, dispatch);
  const { notification_create } = bindActionCreators(NotiAction, dispatch);

  const tempTableData = {
    ...TableData(),
    deleteRecord: Action.series_delete,
    disableDelete: role !== "Distributor" ? false : true,

    onDeleteText: [
      "Are you sure want to delete this Series ?",
      "The Customer Will not be able to see this Series once you delete it.",
    ],
    customisedStatusUpdateMessage: true,
    onActiveText: "Are you sure want to Activate the Series ?",
    onInactiveText: [
      "Are you sure want to Inactivate the Series ?",
      "The Customer Will not be able to see this Series once you Inactivate it.",
    ],
    updateRecord: Action.series_status_update,
  };
  const [tableData, setTableData] = useState({ ...tempTableData });

  // useEffect(() => {
  //   if (user?.id) {
  //     const data = new FormData();
  //     data.append("id", user?.id);
  //     data.append("user", user?.id);
  //     dispatch(Action.all_series_list(data));
  //   }
  // }, [user?.id, save]);

  useEffect(() => {
    //  if(movies?.statuscode!=200)
    // dispatch(all_advertisement_list(data));
    //   if(subcategories?.statuscode!=200)
    dispatch(all_subcategory_list());
    //   if(countries?.statuscode!=200)
    //   dispatch(all_country_list());
    //   if(categories?.statuscode!=200)
    dispatch(all_category_list());
    //   if(casts?.statuscode!=200)
    dispatch(all_cast_list());
    //   if(genre?.statuscode!=200)
    //   if(Advisory?.statuscode!=200)
    dispatch(all_content_advisory_list());
    //   if(language?.statuscode!=200)
    dispatch(all_language_list());
    // if(distributors?.statuscode!=200)
    dispatch(all_distributor_list());
    dispatch(all_country_list());
    dispatch(all_subscription_list());
    //   if(OttName?.statuscode!=200)
    //   dispatch(all_ott_name_list());
  }, []);
  // useMemo(() => {
  //   if (location?.state?.formUpload) {
  //     const data = new FormData();
  //     data.append("id", user?.id);
  //     data.append("user", user?.id);
  //     //  if(movies?.statuscode!=200)
  //     dispatch(Action.all_series_list(data));
  //   }
  // }, [location]);
  const tableColumns = [
    { title: "Character", field: "character_name" },
    { title: "Cast", field: "cast_name" },
    { title: "Type", field: "cast_type" },
    { title: "image", field: "cast_image" },
  ];
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
  ]);
  const countries = useSelector((state) => state?.masters?.countries);

  const tableColumnsForCountry = [
    { title: "Country Name", field: "country" },
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
  const [castCrewFormStructure, setCastCrewFormStructure] = useState([
    {
      type: "select",
      name: "cast_type",
      title: "Cast Type",
      placeholder: "Cast Type",
      options: [
        { label: "Actor", value: "Actor" },
        { label: "Actress", value: "Actress" },
        { label: "Director", value: "Director" },
        { label: "Producer", value: "Producer" },
      ],
      required: true,
    },
    {
      type: "inputBox",
      name: "cast_name",
      title: "Cast Name",
      placeholder: "Enter Cast name",
      required: true,
    },
    {
      type: "inputBox",
      name: "character_name",
      title: "Character Name",
      placeholder: "Enter Character name",
      required: true,
    },
    {
      type: "file",
      name: "cast_image",
      title: "Cast Image",
      description: "Upload a (Resolution : 512px x 512px) (JPG, PNG)",
      accept: "image/*",
      // size: 6,
      required: true,
    },
  ]);
  const [formStructure, setFormStructure] = useState([
    {
      title: "Ownership",
      fields: [
        {
          type: "select",
          name: "ownership",
          title: "Series Ownership",
          placeholder: "Select Series",

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
          title: "Select Series Access",
          placeholder: "Select Series Access",
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
          placeholder: "Type distribitor commission",
          required: true,
        },
        {
          type: "inputBox",
          name: "distributor_tvod_commission",
          title: "Rent Commission (In Percentage)",
          display: "none",
          regex: /^[0-9\.]+$/,
          maxLength: "2",
          placeholder: "Type distribitor commission",
          required: true,
        },
        {
          type: "select",
          name: "available_for_plan",
          title: "Select Plan",
          display: "none",
          placeholder: "Select Series Plan",
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
          title: "Series Category",
          placeholder: "Select Series Category",
          options: [],
          required: true,
        },
        {
          type: "select_multiple",
          name: "subcategory",
          title: "Series Subcategory",
          placeholder: "Select Series Subcategory",
          maxSelections: "3",
          options: [],
          required: true,
        },
        {
          type: "inputBox",
          name: "title",
          title: "Title",
          placeholder: "Type Series Title",
          required: true,
        },

        {
          type: "select",
          name: "language",
          title: "Select Language",
          placeholder: "Select Language",
          // size: "3",
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
          title: "Series Display In",
          name: "available_for_platform",
          default: "All",
          size: "3",
          options: [
            { value: "All", color: "success" },
            { value: "Web", color: "danger" },
            { value: "Android", color: "danger" },
            { value: "IOS", color: "danger" },
          ],
        },
        {
          type: "toggle",
          title: "First Episode Free",
          name: "first_episode_free",
          default: "Yes",
          size: "3",
          options: [
            { value: "Yes", color: "success" },
            { value: "No", color: "danger" },
          ],
        },
        {
          type: "select",
          name: "series_type",
          title: "Select Series Type",
          placeholder: "Select Type",
          size: "3",
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
          size: "3",
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
          title: "Series Description",
          placeholder: "Type Series Description",
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
        // {
        //   type: "inputBox",
        //   name: "content_link",
        //   title: "Movie Link",
        //   placeholder: "Paste Movie Link (.M3U8) here",
        //   required: true,
        //   size: "9",
        // },
        // {
        //   type: "duration",
        //   name: "durations",
        //   title: "Movie Duration",
        //   placeholder: "Type Movie Duration",
        //   size: "3",
        //   placeholder: "Type here",
        //   required: true,
        //   disabled: true,
        // },
        // {
        //   type: "inputBox",
        //   name: "content_trailer_link",
        //   title: "Movie Trailer Link",
        //   placeholder: "Paste Movie Trailer Link (.M3U8) here",
        //   required: true,
        //   size: "9",
        // },
        // {
        //   type: "duration",
        //   name: "trailer_durations",
        //   title: "Movie Trailer Duration",
        //   placeholder: "Type Movie Trailer Duration",
        //   size: "3",
        //   placeholder: "Type here",
        //   required: true,
        //   disabled: true,
        // },
        // {
        //   type: "duration",
        //   name: "free_preview_durations",
        //   title: "Free Preview Duration",
        //   placeholder: "Type Free Preview Duration",
        //   size: "4",
        //   placeholder: "Type here",
        //   required: true,
        // },
        {
          type: "image",
          name: "poster",
          title: "Series Portrait",
          description: "Image size",
          image_size: "980 * 1300 PX",
          accept: "image/*",
          size: 6,
          required: true,
        },
        {
          type: "image",
          name: "thumbnail",
          title: "Series Landscape",
          description: "Image size",
          image_size: "1920 * 1080 PX",
          accept: "image/*",
          size: 6,
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
    // {
    //   title: "Rent",
    //   fields: [
    //     {
    //       id: "10",
    //       type: "inputBox",
    //       title: `Rental Price`,
    //       placeholder: "Type Movie Rental Price here",
    //       name: "rental_price",
    //       regex: /^[0-9\.]+$/,
    //       maxLength: "3",
    //       required: true,
    //     },
    //     {
    //       id: "10",
    //       type: "inputBox",
    //       title: `Available Days`,
    //       placeholder: "Type Movie Available Days here",
    //       name: "tvod_available_days ",
    //       regex: /^[0-9\.]+$/,
    //       maxLength: "2",
    //       required: true,
    //     },
    //   ],
    // },
  ]);
  // useMemo(() => {
  //   if (casts) {
  //     const temp = castCrewFormStructure;
  //     temp[0]["options"] = casts?.data?.map((ele) => ({
  //       label: ele?.cast_name,
  //       value: ele?.cast_name,
  //     }));
  //     setCastCrewFormStructure([...temp]);
  //   }
  // }, [casts]);

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
        prevFormStructure.map((section) => {
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
      prevFormStructure.map((section) => {
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
                  .filter((s) => s.category_id === form.category && s?.content_type == "Series")
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
  }, [categories, language, subcategories, Advisory, form?.category]);
  const subscriptions = useSelector(
    (state) => state?.subscriptions?.subscriptions
  );
  useEffect(() => {
    if (isEdit) {
      setFormStructure((prevFormStructure) =>
        prevFormStructure.map((section) => {
          if (section.title === "Details") {
            const updatedFields = section.fields.map((field, index) => {
              if (index === 9) {
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
              if (index === 9) {
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
    if (isEdit) {
      setFormStructure((prevFormStructure) =>
        prevFormStructure.map((section) => {
          if (section.title === "Details") {
            const updatedFields = section.fields.map((field, index) => {
              if (index === 9) {
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
              if (index === 9) {
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
    setFormStructure((prevFormStructure) => {
      const hasRentSection = prevFormStructure.some(
        (section) => section.title === "Rent"
      );

      // If TVOD, and Rent section doesn't exist -> add it
      if (form?.content_access === "TVOD" && !hasRentSection) {
        return [
          ...prevFormStructure,
          {
            title: "Rent",
            fields: [
              {
                id: "10",
                type: "inputBox",
                title: `Available Days`,
                placeholder: "Type Series Available Days",
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
        return prevFormStructure.filter((section) => section.title !== "Rent");
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
    if (series?.data) {
      const temp = tableData;
      temp.tableBody = series?.data?.map((value) => ({
        ...value,
        sub_category_name: value?.subcategory_name?.join(" , "),
        distributor_name:
          value?.ownership == "Content Owner" ? value?.distributor_name : null,
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
          <img
            src={notification_icon}
            alt="Notifications"
            height={"25px"}
            onClick={() => handleForm(value?.id, value?.thumbnail)}
            style={{ marginRight: "5px", cursor: "pointer" }}
          />
        ),
        // language: ele?.language?.language_name,
        // genre: ele?.genre?.map((value) => value?.genre_title),
        // series_distributor: ele?.series_distributor?.name,
        // series_subcategory: ele?.series_subcategory?.subcategory_name,
        // language : ele?.language?.language_name
        // uploaded_by: ele?.created_by?.firstName,
        // series_category : ele?.series_category?.category_name,
        // company_name: ele?.series_distributor?.company_name,
      }));
      // temp.filterColumn[3]["options"] = [
      //   ...new Set(series?.data?.map((value) => value?.created_by?.firstName + "")),
      // ];
      setTableData({ ...temp });
    }
  }, [series]);
  useMemo(() => {
    if (categories?.data) {
      // const temp = formStructure
      // temp[1][11]["options"] = OttName?.data?.map((ele)=>ele?.ott_name)
      const tempFilter = tableData;
      tempFilter["filterColumn"][1]["options"] = categories?.data?.map(
        (ele) => ele?.category_name
      );

      setTableData({ ...tempFilter });
      // setFormStructure([...temp])
    }
  }, [categories]);
  useMemo(() => {
    if (subcategories?.data) {
      // const temp = formStructure
      // temp[1][11]["options"] = OttName?.data?.map((ele)=>ele?.ott_name)
      const tempFilter = tableData;
      tempFilter["filterColumn"][2]["options"] = subcategories?.data;

      setTableData({ ...tempFilter });
      // setFormStructure([...temp])
    }
  }, [subcategories]);
  useMemo(() => {
    if (language?.data) {
      // const temp = formStructure
      // temp[1][11]["options"] = OttName?.data?.map((ele)=>ele?.ott_name)
      const tempFilter = tableData;
      tempFilter["filterColumn"][0]["options"] = language?.data?.map(
        (ele) => ele?.language_name
      );

      setTableData({ ...tempFilter });
      // setFormStructure([...temp])
    }
  }, [language]);
  // console.log("tableData",tableData)
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    Object.keys(form)?.map(
      (key) =>
        key !== "cast" &&
        key !== "subtitle_file" &&
        key !== "countrys" &&
        key !== "audio_file" &&
        data.append(key, form?.[key])
    );
    // data.append("cast", JSON.stringify(form?.cast));
    data.append("countrys", JSON.stringify(form?.countrys));
        form.cast?.forEach((member, index) => {
      data.append(`cast[${index}][cast_type]`, member.cast_type);
      data.append(`cast[${index}][cast_name]`, member.cast_name);
      data.append(`cast[${index}][character_name]`, member.character_name);
      data.append(`cast[${index}][id]`, member.id || "");

      // ✅ Append file separately
      if (member.cast_image instanceof File) {
        data.append(`cast[${index}][cast_image]`, member.cast_image);
      }
    });
    // data.append("subtitle_file", JSON.stringify(form?.subtitle_file));
    // data.append("audio_file", JSON.stringify(form?.audio_file));
    // form.audio_file.forEach((item, index) => {
    //   data.append(`audio_file_${index}`, item.audio_file);
    //   data.append(`audio_language_${index}`, item.language);
    //   data.append(`audio_language_id_${index}`, item.language_id);
    // });

    data.append("user", user?.id);
    if (isEdit) {
      const resData = await series_update(data);
      if (resData?.status === 200) {
        setForm({});
        setSave(!save);
        setDrawer(false);
      } else {
        setForm(form);
      }
    } else {
      const resData = await series_create(data);
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
  return (
    <div>
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
        loadApi={Action.all_series_list}
        totalCount={series?.series_count}
        save={save}
        setSave={setSave}
        isDrawerForm={true}
        openDrawer={drawer}
        setOpenDrawer={setDrawer}
        formStructure={formStructure}
        handleSubmit={handleSubmit}
        setUsedCountries={setUsedCountries}
        form={form}
        isEdit={isEdit}
        formTitle={isEdit ? "Edit Series" : "Add Series"}
        exportButton={
          <Export
            fileName={"Series"}
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

export default Series;
