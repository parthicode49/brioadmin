import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListTable from "../utils/Table";
import { useLocation, useNavigate } from "react-router-dom";
import ViewChangeForm from "../utils/ViewChangeForm";
import { only_series_name } from "../../actions/WebSeries/series";
// import {
//   all_sliderbanner_list,
//   sliderbanner_delete,
//   sliderbanner_update,
// } from "../../actions/sliderbanner";
import { all_movie_name_list } from "../../actions/Movie/movie";
import * as Action from "../../actions/sliderbanner";
import Export from "../utils/Export";
import dayjs from "dayjs";
import { bindActionCreators } from "redux";
import { useAccessControl } from "../utils/useAccessControl";

const SliderBanner = () => {
    const { canEdit } = useAccessControl("Slider");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.layout.profile);
  const series = useSelector((state) => state?.webseries?.series_name);
  const rights = useSelector((state) => state.layout.rights);
  const movie = useSelector((state) => state?.movies?.movie_name);
  const { sliderbanner_create, sliderbanner_update } = bindActionCreators(
    Action,
    dispatch
  );
  const [form, setForm] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [save, setSave] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const sliderbanners = useSelector(
    (state) => state.merchandise.slider_banners
  );
  const [tableData, setTableData] = useState({
    tableTitle: "Slider Banner",
    deleteRecord: Action.sliderbanner_delete,
    updateRecord: Action.slide_banner_status_update,
    deleteAccess: rights?.["Slider Banner"]?.["delete"] == "true",
    customisedStatusUpdateMessage: true,
    onDeleteText: "Are you sure want to delete Slider Banner?",
    onActiveText: "Are you Sure want to Activate Slider Banner?",
    onInactiveText: "Are you Sure want to Inactivate Slider Banner?",
    tableHead: [
      {
        id: "content_type",
        label: "Slider Type",
      },
      {
        id: "title",
        label: "Title",
      },

      {
        id: "thumbnail",
        label: "Web View",
        isImage: true,
      },
      // {
      //   id: "web_banner",
      //   label: "Web View",
      //   isImage: true,
      // },

      {
        id: "sequence",
        label: "Sequence",
        align: "center",
      },
      {
        id: "expired_on",
        label: "Expiring On",
        isSpecial: true,
        align: "left",
      },
      {
        id: "status",
        label: "Status",
        // isButtonDisplay: true,
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
        title: "Slider Type",
        name: "content_type",
        options: ["Movie", "Series"],
      },
    ],
  });

  // const categories = useSelector((state) => state.masters.categories);
  // const subcategories = useSelector((state) => state.masters.subcategories);
  // const genre = useSelector((state) => state.masters.genre);
  // const language = useSelector((state) => state.masters.languages);

  // console.log(location,"locationns")
  useEffect(() => {
    if (user?.id) {
      const data = new FormData();
      data.append("id", user?.id);
      data.append("user", user?.id);
      //  if(movies?.statuscode!=200)
      dispatch(only_series_name(data));
      // dispatch(all_season_list(data))
      dispatch(all_movie_name_list(data));
    }
  }, [user?.id]);
  useEffect(() => {
    if (user?.id) {
      const data = new FormData();
      data.append("id", user?.id);
      data.append("user", user?.id);
      dispatch(Action.all_sliderbanner_list(data));
    }
  }, [user?.id, save]);
  useMemo(() => {
    if (sliderbanners?.data) {
      const temp = tableData;
      const status = (expire_date , status) => {
        const today = dayjs().startOf("day");
        const expDate = dayjs(expire_date).startOf("day");

        if (expDate.isBefore(today)) {
          return "Expired";
        } else if (expDate.diff(today, "day") <= 3) {
          return "Expiring Soon";
        } else {
          return status;
        }
      };
      temp.tableBody = sliderbanners?.data?.map((ele) => ({
        ...ele,
        status:
          status(ele.expire_date , ele?.status),
        expired_on:
          new Date(ele?.expire_date) > new Date() ? (
            <p style={{ color: "var(--themeFontColor)" }}>
              {dayjs(ele?.expire_date).format("DD-MM-YYYY")}
            </p>
          ) : (
            <p style={{ color: "red" }}>Expired</p>
          ),
      }));

      setTableData({ ...temp });
      setForm({ ...form, set_sequence: tableData.tableBody.length + 1 });
    }
  }, [sliderbanners]);

  const [formStructure, setFormStructure] = useState([
    {
      title: "Details",
      fields: [
        {
          type: "select",
          name: "content_type",
          title: "Content Type",
          placeholder: "Select Content Type here",
          options: [
            { value: "Movie", label: "Movie" },
            { value: "Series", label: "Series" },
          ],
          required: true,
        },
        {
          type: "select",
          name: "movie",
          title: "Select Movie",
          placeholder: "Select Movie here",
          options: [
            { value: "Movie", label: "Movie" },
            { value: "Series", label: "Series" },
          ],
          display: "none",
          required: true,
        },
        {
          type: "select",
          name: "series",
          title: "Select series",
          placeholder: "Select series here",
          options: [
            { value: "Movie", label: "Movie" },
            { value: "Series", label: "Series" },
          ],
          display: "none",
          required: true,
        },
        {
          type: "date",
          variant: "date",
          title: "Expire Date",
          min: new Date().toISOString().split("T")[0],
          name: "expire_date",
          default: new Date().toISOString().split("T")[0],
          required: true,
          placeholder: "Select Expire Date",
          // size: "3",
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
      ],
    },
    {
      title: "Media",
      fields: [
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
  useEffect(() => {
    if (form?.content_type === "Movie") {
      setFormStructure((prevFormStructure) =>
        prevFormStructure.map((section) => {
          if (section.title === "Details") {
            const updatedFields = section.fields.map((field, index) => {
              if (index === 1) {
                return { ...field, display: "block" };
              }
              if (index === 2) {
                return { ...field, display: "none" };
              }
              return field;
            });
            return { ...section, fields: updatedFields };
          }
          return section;
        })
      );
    } else if (form?.content_type === "Series") {
      setFormStructure((prevFormStructure) =>
        prevFormStructure.map((section) => {
          if (section.title === "Details") {
            const updatedFields = section.fields.map((field, index) => {
              if (index === 1) {
                return { ...field, display: "none" };
              }
              if (index === 2) {
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
              if (index === 1 || index === 2) {
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
  }, [form?.content_type]);
  useEffect(() => {
    if (isEdit) {
      setFormStructure((prevFormStructure) =>
        prevFormStructure.map((section) => {
          if (section.title === "Details") {
            const updatedFields = section.fields.map((field, index) => {
              if (index === 4) {
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
              if (index === 4) {
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
    if (movie?.data) {
      setFormStructure((prevFormStructure) =>
        prevFormStructure.map((section) => {
          if (section.title === "Details") {
            const updatedFields = section.fields.map((field, index) => {
              if (index === 1) {
                return {
                  ...field,
                  options: movie?.data
                    ?.map(
                      (ele) =>
                        ele?.status == "Active" && {
                          label: ele?.title,
                          value: ele?.id,
                        }
                    )
                    .filter((e) => e),
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
  }, [movie]);
  useEffect(() => {
    if (series?.data) {
      setFormStructure((prevFormStructure) =>
        prevFormStructure.map((section) => {
          if (section.title === "Details") {
            const updatedFields = section.fields.map((field, index) => {
              if (index === 2) {
                return {
                  ...field,
                  options: series?.data
                    ?.map(
                      (ele) =>
                        ele?.status == "Active" && {
                          label: ele?.title,
                          value: ele?.id,
                        }
                    )
                    .filter((e) => e),
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
  }, [series]);
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
    Object.keys(form)?.map((key) => data.append(key, form?.[key]));
    data.append("user", user?.id);
    if (isEdit) {
      const resData = await sliderbanner_update(data);
      if (resData?.status === 200) {
        setForm({});
        setSave(!save);
        setDrawer(false);
      } else {
        setForm(form);
      }
    } else {
      const resData = await sliderbanner_create(data);
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
  return (
    <div>
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
        canEdit={canEdit}
        isEdit={isEdit}
        formTitle={isEdit ? "Edit Slider" : "Add Slider"}
        exportButton={
          <Export
            fileName={"Slider"}
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

export default SliderBanner;
