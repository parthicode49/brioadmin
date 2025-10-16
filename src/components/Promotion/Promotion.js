import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as Action from "../../actions/promotion";
import { bindActionCreators } from "redux";
import { only_series_name } from "../../actions/WebSeries/series";
import { all_movie_name_list } from "../../actions/Movie/movie";
import { useEffect } from "react";
import { useState } from "react";
import ListTable from "../utils/Table";
import Export from "../utils/Export";
import { useMemo } from "react";
import dayjs from "dayjs";
const Promotion = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.layout.profile);
  const series = useSelector((state) => state?.webseries?.series_name);
  const movie = useSelector((state) => state?.movies?.movie_name);
  const { quick_promotion_create, quick_promotion_update } = bindActionCreators(
    Action,
    dispatch
  );
  const Promotion_list = useSelector((state) => state?.promotion?.promotion);
  const [form, setForm] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [save, setSave] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [tableData, setTableData] = useState({
    tableTitle: "Promotions",
    deleteRecord: Action.quick_promotion_delete,
    updateRecord: Action.promotion_status_update,
    // deleteAccess: rights?.["Slider Banner"]?.["delete"] == "true",
    customisedStatusUpdateMessage: true,
    onDeleteText: "Are you sure want to delete Promotion?",
    onActiveText: "Are you Sure want to Activate Promotion?",
    onInactiveText: "Are you Sure want to Inactivate Promotion?",
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
        id: "thumbnail",
        label: "Image",
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
        label: "Expiring on",
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
        // access: rights?.["Slider Banner"]?.["edit"] == "true",
        isNewForm: true,
      },
    ],
    tableBody: [],
    filterColumn: [
      {
        id: "2",
        title: "Video Type",
        name: "content_type",
        options: ["Movie", "Series"],
      },
    ],
  });
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
      dispatch(Action.all_quick_promotion_list(data));
    }
  }, [user?.id, save]);
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
          title: "Start Date",
          min: new Date().toISOString().split("T")[0],
          name: "start_date",
          default: new Date().toISOString().split("T")[0],
          required: true,
          placeholder: "Select Start Date",
          // size: "3",
        },
        {
          type: "date",
          variant: "date",
          title: "End Date",
          min: new Date().toISOString().split("T")[0],
          name: "end_date",
          default: new Date().toISOString().split("T")[0],
          required: true,
          placeholder: "Select End Date",
          // size: "3",
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
          image_size : "980 * 1300 PX",
          accept: "image/*",
          size: 6,
          required: true,
        },
        {
          type: "image",
          name: "thumbnail",
          title: "Landscape",
           description: "Image size",
          image_size : "1920 * 1080 PX",
          accept: "image/*",
          size: 6,
          required: true,
        },
      ],
    },
  ]);
  useMemo(() => {
    if (Promotion_list?.data) {
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
      temp.tableBody = Promotion_list?.data?.map((ele) => ({
        ...ele,
         status:
          status(ele.end_date , ele?.status),
        expired_on:
          new Date(ele?.end_date) > new Date() ? (
            <p style={{ color: "var(--themeFontColor)" }}>{dayjs(ele?.end_date).format("DD-MM-YYYY")}</p>
          ) : (
            <p style={{ color: "red" }}>Expired</p>
          ),
      }));

      setTableData({ ...temp });
    }
  }, [Promotion_list]);

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
    if (movie?.data) {
      setFormStructure((prevFormStructure) =>
        prevFormStructure.map((section) => {
          if (section.title === "Details") {
            const updatedFields = section.fields.map((field, index) => {
              if (index === 1) {
                return {
                  ...field,
                  options: movie?.data?.map((ele) => ({
                    label: ele?.title,
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
                  options: series?.data?.map((ele) => ({
                    label: ele?.title,
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
  }, [series]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    Object.keys(form)?.map((key) => data.append(key, form?.[key]));
    data.append("user", user?.id);
    if (isEdit) {
      const resData = await quick_promotion_update(data);
      if (resData?.status === 200) {
        setForm({});
        setSave(!save);
        setDrawer(false);
      } else {
        setForm(form);
      }
    } else {
      const resData = await quick_promotion_create(data);
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
      {" "}
      <ListTable
        tableData={tableData}
        key={"ListTable"}
        setForm={setForm}
        setTableData={setTableData}
        setIsEdit={setIsEdit}
        view="view_all"
        save={save}
        setSave={setSave}
        isDrawerForm={true}
        openDrawer={drawer}
        setOpenDrawer={setDrawer}
        formStructure={formStructure}
        handleSubmit={handleSubmit}
        form={form}
        isEdit={isEdit}
        formTitle={isEdit ? "Edit Promotion" : "Add Promotion"}
        exportButton={
          <Export
            fileName={"Promotion"}
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

export default Promotion;
