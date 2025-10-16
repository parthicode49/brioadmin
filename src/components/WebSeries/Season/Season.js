import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListTable from "../../utils/Table";
import { useLocation, useNavigate } from "react-router-dom";
import ViewChangeForm from "../../utils/ViewChangeForm";
import {
  all_series_list,
  only_series_name,
} from "../../../actions/WebSeries/series";
// import {all_season_list, season_delete, season_update} from "../../../actions/WebSeries/season"
import Export from "../../utils/Export";
import * as Action from "../../../actions/WebSeries/season";
import { bindActionCreators } from "redux";
import Hls from "hls.js";

const Season = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [form, setForm] = useState({});
  const [save, setSave] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const role = useSelector((state) => state.layout.role);
  const rights = useSelector((state) => state.layout.rights);
  const user = useSelector((state) => state.layout.profile);
  const seasons = useSelector((state) => state.webseries.seasons);
  const series = useSelector((state) => state?.webseries?.series_name);
  const { season_create, season_update } = bindActionCreators(Action, dispatch);

  const [tableData, setTableData] = useState({
    tableTitle: "Seasons",
    deleteRecord: Action.season_delete,
    updateRecord: Action.season_status_update,
    onDeleteText: "Are you sure to delete?",
    deleteAccess: rights?.["Web Series"]?.["delete"] == "true",
    onUpdateText: "Are you Sure?",
    tableHead: [
            {
        id: "thumbnail",
        label: "Image",
        isFirstImage: true,
      },
      {
        id: "series_name",
        numeric: false,
        disablePadding: true,
        label: "Show",
      },
      {
        id: "season_title",
        label: "Season",
      },

      {
        id: "season_number",
        label: "Season Number",
      },
      {
        id: "status",
        label: "Status",
      },

      {
        id: "edit",
        label: "Update",
        access: rights?.["Web Series"]?.["edit"] == "true",
        isNewForm: true,
      },
    ],
    tableBody: [],
    filterColumn: [
      {
        id: "1",
        title: "Series",
        name: "series_name",
        options: ["FREE", "TVOD", "SVOD"],
      },

      // {
      //   id: "1",
      //   title: "Device Type",
      //   name: "deviceType",
      //   options: ["IOS", "Android"],
      // },
    ],
    // isDateRangeFilter: "created_at",
  });

  // const categories = useSelector((state) => state.masters.categories);
  // const subcategories = useSelector((state) => state.masters.subcategories);
  // const genre = useSelector((state) => state.masters.genre);
  // const language = useSelector((state) => state.masters.languages);

  // console.log(location,"locationns")
  useEffect(() => {
    if (user?.id) {
      dispatch(only_series_name({ flag: "All" }));
    }
  }, [user?.id]);
  // useEffect(() => {
  //   if (location?.state?.formUpload) {
  //     const data = new FormData();
  //     data.append("id", user?.id);
  //     data.append("user", user?.id);
  //     //  if(movies?.statuscode!=200)
  //     dispatch(Action.all_season_list(data));
  //     navigate(location.pathname, { replace: true, state: null });
  //   }
  // }, [location]);
  useMemo(() => {
    if (seasons?.data) {
      const temp = tableData;
      temp.tableBody = seasons?.data;
      setTableData({ ...temp });
    }
  }, [seasons]);
  useMemo(() => {
    if (series?.data) {
      // const temp = formStructure
      // temp[1][11]["options"] = OttName?.data?.map((ele)=>ele?.ott_name)
      const tempFilter = tableData;
      tempFilter["filterColumn"][0]["options"] = series?.data?.map(
        (ele) => ele?.title
      );

      setTableData({ ...tempFilter });
      // setFormStructure([...temp])
    }
  }, [series]);

  const [formStructure, setFormStructure] = useState([
    {
      title: "Details",
      fields: [
        {
          type: "select",
          name: "series",
          title: "Series Series",
          placeholder: "Select Series here",

          options: [
            { value: "In House", label: "In House" },
            { value: "Distributor", label: "Distributor" },
          ],
          required: true,
        },

        {
          type: "inputBox",
          name: "season_title",
          title: "Season Title",
          // regex: /^[0-9\.]+$/,
          // maxLength: "2",
          placeholder: "Type season title here",
          required: true,
        },
        {
          type: "select",
          name: "season_number",
          title: "Select Season Number",
          placeholder: "Select Season Number here",
          options: [
            { value: 1, label: 1 },
            { value: 2, label: 2 },
            { value: 3, label: 3 },
            { value: 4, label: 4 },
            { value: 5, label: 5 },
            { value: 6, label: 6 },
            { value: 7, label: 7 },
            { value: 8, label: 8 },
            { value: 9, label: 9 },
            // { value: "10", label: "10" },
          ],
          required: true,
        },
      ],
    },
    {
      title: "Media",
      fields: [
        {
          type: "inputBox",
          name: "content_trailer_link",
          title: "Season Trailer Link",
          placeholder: "Paste Season Trailer Link (.M3U8) here",
          // required: true,
          size: "9",
        },
        {
          type: "duration",
          name: "trailer_durations",
          title: "Season Trailer Duration",
          placeholder: "Type Season Trailer Duration",
          size: "3",
          placeholder: "Type here",
          // required: true,
          disabled: true,
        },
        {
          type: "image",
          name: "poster",
          title: "Season Portrait",
          description: "Image size",
          image_size : "980 * 1300 PX",
          accept: "image/*",
          size: 6,
          required: true,
        },
        {
          type: "image",
          name: "thumbnail",
          title: "Season Landscape",
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
  ]);
  // console.log("tableData",tableData)
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

  useEffect(() => {
    if (series?.data) {
      setFormStructure((prevFormStructure) =>
        prevFormStructure.map((section) => {
          if (section.title === "Details") {
            const updatedFields = section.fields.map((field, index) => {
              if (index === 0) {
                return {
                  ...field,
                  options: series?.data
                    ?.map(
                      (ele) =>
                        ele?.status === "Active" && {
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    Object.keys(form)?.map((key) =>
      // key !== "cast" &&
      // key !== "subtitle_file" &&
      // key !== "audio_file" &&
      data.append(key, form?.[key])
    );
    // data.append("cast", JSON.stringify(form?.cast));
    // data.append("subtitle_file", JSON.stringify(form?.subtitle_file));
    // data.append("audio_file", JSON.stringify(form?.audio_file));
    // form.audio_file.forEach((item, index) => {
    //   data.append(`audio_file_${index}`, item.audio_file);
    //   data.append(`audio_language_${index}`, item.language);
    //   data.append(`audio_language_id_${index}`, item.language_id);
    // });

    data.append("user", user?.id);
    if (isEdit) {
      const resData = await season_update(data);
      if (resData?.status === 200) {
        setForm({});
        setSave(!save);
        setDrawer(false);
      } else {
        setForm(form);
      }
    } else {
      const resData = await season_create(data);
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
      <video ref={videoTriRef} controls style={{ display: "none" }} />
      <ListTable
        tableData={tableData}
        key={"ListTable"}
        setForm={setForm}
        setTableData={setTableData}
        setIsEdit={setIsEdit}
        view="view_all"
        create_new={"/Season/EditSeason/"}
        save={save}
        setSave={setSave}
        isLoadingData={true}
        loadApi={Action.all_season_list}
        totalCount={seasons?.season_count}
        isDrawerForm={true}
        openDrawer={drawer}
        setOpenDrawer={setDrawer}
        formStructure={formStructure}
        handleSubmit={handleSubmit}
        form={form}
        isEdit={isEdit}
        formTitle={isEdit ? "Edit Season" : "Add Season"}
        exportButton={
          <Export
            fileName={"Season"}
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

export default Season;
