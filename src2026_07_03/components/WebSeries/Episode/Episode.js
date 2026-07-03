import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListTable from "../../utils/Table";
import { TableData } from "./TableData";
import { useLocation, useNavigate } from "react-router-dom";
import ViewChangeForm from "../../utils/ViewChangeForm";
import { only_series_name } from "../../../actions/WebSeries/series";
import { only_season_id_name } from "../../../actions/WebSeries/season";
// import { all_episode_list, all_episode_list_admin_loadless, episode_delete, episode_update } from "../../../actions/WebSeries/episode";
import * as Action from "../../../actions/WebSeries/episode";
import Export from "../../utils/Export";
import { bindActionCreators } from "redux";
import Hls from "hls.js";
import { Alert, Snackbar } from "@mui/material";
import dayjs from "dayjs";
import durationPlugin from "dayjs/plugin/duration";
import InfoIcone from "../../../images/info.png";
import { useAccessControl } from "../../utils/useAccessControl";
const Episode = () => {
  const { canEdit} = useAccessControl("Episode");
  const navigate = useNavigate();

  function getSecondsFromTime(time) {
    if (!time || typeof time !== "string") return 0;
    const [h = 0, m = 0, s = 0] = time.split(":").map(Number);
    return h * 3600 + m * 60 + s;
  }

  const role = useSelector((state) => state.layout.role);
  const tempTableData = {
    ...TableData(),
    deleteRecord: Action.episode_delete,

    disableDelete: role !== "Distributor" ? false : true,

    onDeleteText: [
      "Are you sure want to delete this Episode ?",
      "The Customer Will not be able to see this Episode once you delete it.",
    ],
    customisedStatusUpdateMessage: true,
    onActiveText: "Are you sure want to Activate the Episode ?",
    onInactiveText: [
      "Are you sure want to Inactivate the Episode ?",
      "The Customer Will not be able to see this Episode once you Inactivate it.",
    ],
    updateRecord: Action.episode_status_update,
  };
  const user = useSelector((state) => state.layout.profile);
  const series = useSelector((state) => state?.webseries?.series_name);
  const seasons = useSelector((state) => state?.webseries?.only_season_name);
  const episodes = useSelector((state) => state?.webseries?.episodes);
  const [openAdError, setOpenAdError] = useState(false);
  const [content, setPopupContent] = useState("");
  const [tableData, setTableData] = useState({ ...tempTableData });
  const [form, setForm] = useState({});
  const [save, setSave] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const { episode_create, episode_update } = bindActionCreators(
    Action,
    dispatch
  );
  // useEffect(()=>{
  //   if (user?.id) {
  //     const data = new FormData();
  //     data.append("id", user?.id);
  //     data.append("user", user?.id);
  //     dispatch(Action.all_episode_list(data))
  //   }
  // },[user?.id, save])
  useEffect(() => {
    if (user?.id) {
      const data = new FormData();
      data.append("id", user?.id);
      data.append("user", user?.id);
      //  if(movies?.statuscode!=200)
      dispatch(only_series_name({ flag: "All" }));
      dispatch(only_season_id_name(data));
    }
  }, [user?.id]);
  // useMemo(()=>{
  //   if(location?.state?.formUpload){
  //     const data = new FormData();
  //     data.append("id", user?.id);
  //     data.append("user", user?.id);
  //     //  if(movies?.statuscode!=200)
  //     // dispatch(all_episode_list(data));
  //   }
  // },[location])
  useMemo(() => {
    if (episodes) {
      const temp = tableData;
      temp.tableBody =
        episodes?.data?.map((value) => ({
          ...value,
          episode_Num: "Episode " + value?.episode_number,
          info: (
            <img
              src={InfoIcone}
              width="20px"
              height="20px"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("detail", { state: { id: value?.id } })}
            />
          ),
        })) || [];
      setTableData({ ...temp });
    }
  }, [episodes]);
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
  useMemo(() => {
    if (seasons?.data) {
      // const temp = formStructure
      // temp[1][11]["options"] = OttName?.data?.map((ele)=>ele?.ott_name)
      const tempFilter = tableData;
      tempFilter["filterColumn"][1]["options"] = seasons?.data;

      setTableData({ ...tempFilter });
      // setFormStructure([...temp])
    }
  }, [seasons]);
  const [formStructure, setFormStructure] = useState([
    {
      title: "Details",
      fields: [
        {
          type: "select",
          name: "series",
          title: "Series",
          placeholder: "Select Series here",

          options: [
            { value: "In House", label: "In House" },
            { value: "Distributor", label: "Distributor" },
          ],
          required: true,
        },
        {
          type: "select",
          name: "season",
          title: "Season",
          placeholder: "Select Season here",

          options: [
            { value: "In House", label: "In House" },
            { value: "Distributor", label: "Distributor" },
          ],
          required: true,
        },
        {
          type: "select",
          name: "episode_number",
          title: "Select Episode Number",
          placeholder: "Select Episode Number here",
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
        {
          type: "inputBox",
          name: "title",
          title: "Episode Title",
          // regex: /^[0-9\.]+$/,
          // maxLength: "2",
          placeholder: "Type Title here",
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
          placeholder: "Type Sequence here",
          required: true,
        },
        {
          type: "inputBox",
          title: "Episode Description",
          placeholder: "Type Episode Description here",
          name: "episode_description",
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
          title: "Episode Link",
          placeholder: "Paste Episode Link (.M3U8) here",
          required: true,
          size: "9",
        },
        {
          type: "duration",
          name: "durations",
          title: "Episode Duration",
          placeholder: "Type Episode Duration",
          size: "3",
          // placeholder: "Type here",
          required: true,
          disabled: true,
        },
        {
          type: "duration",
          name: "skip_start",
          title: "Intro Skip Start Duration",
          // placeholder: "Type Intro Skip Duration here",
          size: "4",
          placeholder: "Type here",
          // required: true,
          // disabled: true,
        },
        {
          type: "duration",
          name: "skip_end",
          title: "Intro Skip End Duration",
          // placeholder: "Type Episode Duration",
          size: "4",
          placeholder: "Type here",
          // required: true,
          // disabled: true,
        },
        {
          type: "duration",
          name: "next_episode_duration",
          title: "Next Episode Duration",
          // placeholder: "Type Episode Duration",
          size: "4",
          placeholder: "Type here",
          // required: true,
          // disabled: true,
        },
        // {
        //   type: "image",
        //   name: "poster",
        //   title: "Episode Portrait",
        //   description: "Image size",
        //   image_size: "980 * 1300 PX",
        //   accept: "image/*",
        //   size: 6,
        //   required: true,
        // },
        {
          type: "inputBox",
          name: "asset_id",
          title: "Episode Asset ID",
          placeholder: "Paste Episode Asset ID",
          required: true,
          size: "6",
        },
        {
          type: "image",
          name: "thumbnail",
          title: "Episode Landscape",
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

  useEffect(() => {
    if (seasons?.data && form?.series) {
      setFormStructure((prevFormStructure) =>
        prevFormStructure.map((section) => {
          if (section.title === "Details") {
            const updatedFields = section.fields.map((field, index) => {
              if (index === 1) {
                return {
                  ...field,
                  options: seasons?.data
                    ?.map(
                      (ele) =>
                        ele?.status === "Active" &&
                        ele?.series == form?.series && {
                          label:
                            ele?.season_number +
                            "{ " +
                            ele?.season_title +
                            " }",
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
  }, [form?.series, seasons]);
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
        setEpisodeDuration(durationInSeconds);
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = form.content_link;

      const handleLoadedMetadata = () => {
        const durationInSeconds = video.duration;
        // console.log("Native HLS duration loaded");
        setEpisodeDuration(durationInSeconds);
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
  useEffect(() => {
    const duration = getSecondsFromTime(form?.durations);
    const skipStart = getSecondsFromTime(form.skip_start);
    const skipEnd = getSecondsFromTime(form.skip_end);
    const endTime = getSecondsFromTime(form.next_episode_duration);

    let updatedForm = { ...form };
    let error = "";

    if (form.skip_start && skipStart > duration) {
      updatedForm.skip_start = "";
      error = "Skip Start exceeds video duration.";
    }

    if (form.skip_end && skipEnd > duration) {
      updatedForm.skip_end = "";
      error = "Skip End exceeds video duration.";
    } else if (form.skip_start && skipEnd <= skipStart) {
      updatedForm.skip_end = "";
      error = "Skip End must be greater than Skip Start.";
    }

    if (form.next_episode_duration && endTime > duration) {
      updatedForm.next_episode_duration = "";
      error = "End Time exceeds video duration.";
    }

    if (error) {
      setPopupContent(error);
      setOpenAdError(true);
      setForm(updatedForm);
    }
  }, [
    form.skip_start,
    form.skip_end,
    form.next_episode_duration,
    form.durations,
  ]);

  const setEpisodeDuration = (durationInSeconds) => {
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    Object.keys(form)?.map((key) => data.append(key, form?.[key]));
    data.append("user", user?.id);
    if (isEdit) {
      const resData = await episode_update(data);
      if (resData?.status === 200) {
        setForm({});
        setSave(!save);
        setDrawer(false);
      } else {
        setForm(form);
      }
    } else {
      const resData = await episode_create(data);
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
  const handleClose = () => {
    setOpenAdError(false);
  };
  return (
    <div>
      <video ref={videoRef} controls style={{ display: "none" }} />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openAdError}
        autoHideDuration={1500}
        onClose={handleClose}
      >
        <Alert severity="info" variant="filled" color="success">
          {content}
        </Alert>
      </Snackbar>
      <ListTable
        tableData={tableData}
        key={"ListTable"}
        setForm={setForm}
        setTableData={setTableData}
        setIsEdit={setIsEdit}
        view="view_all"
        isLoadingData={true}
        loadApi={Action.all_episode_list}
        // totalCount={episodes?.episode_count}
        totalCount={episodes?.episode_count}
        save={save}
        setSave={setSave}
        isDrawerForm={true}
        canEdit={canEdit}
        openDrawer={drawer}
        setOpenDrawer={setDrawer}
        formStructure={formStructure}
        handleSubmit={handleSubmit}
        form={form}
        isEdit={isEdit}
        formTitle={isEdit ? "Edit Episode" : "Add Episode"}
        exportButton={
          <Export
            fileName={"Episode"}
            access={"true"}
            isClubed={true}
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

export default Episode;
