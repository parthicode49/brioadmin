import React, { useEffect, useMemo, useState } from "react";
import MultiStepForm from "../utils/MultiStepForm";
import { FormStructure, FormStructure1 } from "./FormStructure";
// import { all_language_list } from "../../../actions/Masters/language";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import RemoveIcon from "@mui/icons-material/Remove";
import Alert from "@mui/material/Alert";
import { TableData } from "./TableData";
import ViewChange from "../utils/ViewChange";
import { useLocation, useNavigate } from "react-router-dom";
import { all_genre_list } from "../../actions/Masters/genre";
import { all_language_list } from "../../actions/Masters/language";
import Popup from "../utils/Popup";
import ListTable from "../utils/Table";
import Reload from "../utils/Reload";
import { all_advertisement_list } from "../../actions/Advertiser/advertisement";
import { all_movie_list } from "../../actions/Movie/movie";
import {
  set_advertise,
  set_advertise_delete,
  set_advertise_list,
  set_update_advertise,
} from "../../actions/setadvertisement";
import Form from "../utils/Form";
import { all_season_list } from "../../actions/WebSeries/season";
import { all_series_list } from "../../actions/WebSeries/series";
import { all_episode_list } from "../../actions/WebSeries/episode";
import { Country, State, City } from "country-state-city";

const SetSeriesAdvertisement = () => {
  const tempFormStruct = FormStructure();
  const tempUpdateFormStruct = FormStructure1();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState(
    (location?.state?.form && JSON.parse(location?.state?.form)) || {}
  );
  const [view, setView] = useState(location?.state?.view || "view_all");
  const [adPosition, setAdPosition] = useState();

  const [openAdError, setOpenAdError] = useState(false);
  const user = useSelector((state) => state?.layout?.profile);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [content, setPopupContent] = useState("");
  const [result, setResult] = useState(undefined);
  const [adID, setAdID] = useState("");

  const path = location?.pathname.split("/")[2];
  const rights = useSelector((state) => state.layout.rights);
  const role = useSelector((state) => state.layout.role);
  const seasons = useSelector((state) => state.webseries.seasons);
  const series = useSelector((state) => state.webseries.series);
  const episodes = useSelector((state) => state.webseries.episodes);

  useMemo(() => {
    if (isEdit) {
      setView("create_new");
    } else {
      setView("view_all");
      setForm({});
    }
  }, [isEdit]);

  const tempTableData = {
    ...TableData(),
    // tableTitle: "Set Ad",
    // disableDelete: true,
    updateRecord: set_update_advertise,
    deleteRecord: set_advertise_delete,
  };
  const [tableData, setTableData] = useState({ ...tempTableData });
  const producerformdata = useSelector(
    (state) => state.producer.producerformdata
  );
  const advertisements = useSelector(
    (state) => state.advertisers.advertisements
  );
  const language = useSelector((state) => state.masters.languages);
  const [formStructure, setFormStructure] = useState([...tempFormStruct]);
  const [updateFormStructure, setUpdateFormStructure] = useState([
    ...tempUpdateFormStruct,
  ]);

  const setAdData = useSelector((state) => state?.setad?.setad);

  useEffect(() => {
    if(user?.id){const data = new FormData();
    data.append("user", user?.id);
    data.append("video_type", "Series");

    dispatch(set_advertise_list(data));}
  }, [user?.id]);
  const [formTitle, setFormTitle] = useState(
    ["Detail", "Set Series Advertisement"].filter((e) => e)
  );
  const formTitle1 = "Set Series Advertisement";

  useMemo(() => {
    setTableData({ ...tempTableData });
  }, [rights]);
  useEffect(() => {
    // setForm((location?.state?.form && JSON.parse(location?.state?.form)) || {});
    const newDataForm =
      location?.state?.form && JSON.parse(location?.state?.form);
    setForm(newDataForm || { email: user?.email });

    setView(path != "SetSeriesAdvertisement" ? "create_new" : "view_all");

    setIsEdit(path == "EditSetSeriesAdvertisement");
  }, [location]);
  useEffect(() => {
    if (user?.id) {
      const data = new FormData();
      data.append("id", user?.id);
      dispatch(all_genre_list());
      dispatch(all_episode_list(data));
      dispatch(all_series_list(data));
      dispatch(all_language_list());
      dispatch(all_advertisement_list(data));
      dispatch(all_season_list(data));
    }
  }, [user]);

  useMemo(() => {
    if (setAdData?.statuscode == 200) {
      const temp = tableData;

      const seriesAdvertise = [];
      setAdData?.data?.map((value) => {
        const advertise = {};
        value?.data &&
          value?.data?.map((ele, index) => {
            advertise["advertise" + index] = ele?.advertise?.product_name;
            advertise["time" + index] = ele?.time;
            advertise["duration" + index] = ele?.advertise?.duration;
            advertise["company_name" + index] =
              ele?.advertise?.advertiser?.company_name;
            advertise["views_required" + index] =
              ele?.advertise?.views_required;
            advertise["available_views" + index] =
              ele?.advertise?.views_required - ele?.advertise?.no_of_views;
            advertise["release_date" + index] = ele?.release_date;
            advertise["location" + index] = ele?.location;
            advertise["state" + index] = ele?.state;
            advertise["city" + index] = ele?.city;
          });
        seriesAdvertise.push(advertise);
      });
      temp.tableBody = setAdData?.data?.map((ele, index) => ({
        ...ele,
        id: index,
        ...seriesAdvertise[index],
        series: ele?.series,
        episode: ele?.data[0]?.episode_name,
        ad_id_1: ele?.data[0]?.id,
        ad_id_2: ele?.data[1]?.id,
        ad_id_3: ele?.data[2]?.id,
        ad_id_4: ele?.data[3]?.id,
        ad_id_5: ele?.data[4]?.id,
        findad: [
          ele?.data[0]?.advertise?.product_name,
          ele?.data[1]?.advertise?.product_name,
          ele?.data[2]?.advertise?.product_name,
          ele?.data[3]?.advertise?.product_name,
          ele?.data[4]?.advertise?.product_name,
        ],
        produce_name_1: ele?.data[0]?.advertise?.product_name,
        produce_name_2: ele?.data[1]?.advertise?.product_name,
        produce_name_3: ele?.data[2]?.advertise?.product_name,
        produce_name_4: ele?.data[3]?.advertise?.product_name,
        produce_name_5: ele?.data[4]?.advertise?.product_name,
        ad_time_1: ele?.data[0]?.advertise?.duration,
        ad_time_2: ele?.data[1]?.advertise?.duration,
        ad_time_3: ele?.data[2]?.advertise?.duration,
        ad_time_4: ele?.data[3]?.advertise?.duration,
        ad_time_5: ele?.data[4]?.advertise?.duration,
        play_time_1: ele?.data[0]?.time,
        play_time_2: ele?.data[1]?.time,
        play_time_3: ele?.data[2]?.time,
        play_time_4: ele?.data[3]?.time,
        play_time_5: ele?.data[4]?.time,
        location0: ele?.data[0]?.location,
        location1: ele?.data[1]?.location,
        location2: ele?.data[2]?.location,
        location3: ele?.data[3]?.location,
        location4: ele?.data[4]?.location,
        state0: ele?.data[0]?.state,
        state1: ele?.data[1]?.state,
        state2: ele?.data[2]?.state,
        state3: ele?.data[3]?.state,
        state4: ele?.data[4]?.state,
        city0: ele?.data[0]?.city,
        city1: ele?.data[1]?.city,
        city2: ele?.data[2]?.city,
        city3: ele?.data[3]?.city,
        city4: ele?.data[4]?.city,
      }));
    }
  }, [setAdData]);
  const handleClick = () => {
    if (formStructure[1].length < 55) {
      const temp = formStructure;
      const index = temp[1].length - 3;
      const randomName = formStructure[1].length / 11;
      temp[1].push(
        {
          id: "21",
          type: "select",
          size: "3",
          title: "Select Advertise",
          name: "advertise" + randomName,
          options: temp[1][1]["options"],
        },
        {
          id: "24",
          type: "inputBox",
          size: "1.5",
          title: "Ad Duration",
          name: "duration" + randomName,
          disabled: true,
        },
        {
          id: "24",
          type: "duration",

          size: "2",
          title: "Set Duration",
          name: "time" + randomName,
        },

        {
          id: "24",
          type: "inputBox",
          size: "2",
          title: "Company Name",
          name: "company_name" + randomName,
          disabled: true,
        },
        // {
        //   id: "24",
        //   type: "inputBox",
        //   size: "1.5",
        //   title: "View Required",
        //   name: "views_required" + randomName,
        //   disabled: true,
        // },
        {
          id: "24",
          type: "inputBox",
          size: "1.5",
          title: "Avbl. views",
          name: "available_views" + randomName,
          disabled: true,
        },
        {
          id: "4",
          type: "inputBox",
          variant: "date",
          title: "Publish Date",
          min: new Date().toISOString().split("T")[0],
          name: "release_date" + randomName,
          default: " ",
          size: "1.5",
          required: true,
        },
        {
          id: "21",
          type: "select",
          title: "Select Location",
          size: "4",
          name: "location" + randomName,
          options: ["All", "City"],
          required: true,
        },
        {
          id: "21",
          type: "select",
          title: "Select State",
          size: "4",
          name: "state" + randomName,
          options: ["Advertise 1", "Advertise 2"],
          // display:"none"
          visibility: "hidden",
          required: false,
        },
        {
          id: "21",
          type: "select",
          title: "Select City",
          size: "3.5",
          name: "city" + randomName,
          options: ["Advertise 1", "Advertise 2"],
          visibility: "hidden",
          required: false,
        },
        {
          id: "23",
          type: "button",
          title: <RemoveIcon sx={{ color: "#fff !important" }} />,

          align: "right",
          size: ".5",
          padding: "2px 2px",
          position: randomName,
          forceShow: true,
          handleClick: (e) => {
            setOpen(true);
            setAdPosition(randomName);

            setPopupContent(
              "Do you want to remove this advertisement from this movie?"
            );
          },
        },
        {
          type: "hr",
        }
      );

      setFormStructure([...temp]);
    } else {
      setOpenAdError(true);
      setPopupContent("You can add max 5 advertisement in a movie");
    }
  };

  const handleUpdateClick = () => {
    if (updateFormStructure.length - 2 < 55) {
      const temp = updateFormStructure;
      const index = temp.length - 3;
      const randomName = (updateFormStructure.length - 2) / 11;
      temp.splice(
        temp.length - 2,
        0,
        {
          id: "21",
          type: "select",
          size: "3",
          title: "Select Advertise",
          name: "advertise" + randomName,
          options: temp[1]["options"],
        },
        {
          id: "24",
          type: "inputBox",
          size: "1.5",
          title: "Ad Duration",
          name: "duration" + randomName,
          disabled: true,
        },
        {
          id: "24",
          type: "duration",

          size: "2",
          title: "Set Duration",
          name: "time" + randomName,
        },

        {
          id: "24",
          type: "inputBox",
          size: "2",
          title: "Company Name",
          name: "company_name" + randomName,
          disabled: true,
        },

        {
          id: "24",
          type: "inputBox",
          size: "1.5",
          title: "Avbl. views",
          name: "available_views" + randomName,
          disabled: true,
        },
        {
          id: "4",
          type: "inputBox",
          variant: "date",
          title: "Publish Date",
          min: new Date().toISOString().split("T")[0],
          name: "release_date" + randomName,
          default: " ",
          size: "1.5",
          required: true,
        },
        {
          id: "21",
          type: "select",
          title: "Select Location",
          size: "4",
          name: "location" + randomName,
          options: ["All", "City"],
        },
        {
          id: "21",
          type: "select",
          title: "Select State",
          size: "4",
          name: "state" + randomName,
          options: ["Advertise 1", "Advertise 2"],
          visibility: "hidden",
        },
        {
          id: "21",
          type: "select",
          title: "Select City",
          size: "3.5",
          name: "city" + randomName,
          options: ["Advertise 1", "Advertise 2"],
          visibility: "hidden",
        },
        {
          id: "23",
          type: "button",
          title: <RemoveIcon sx={{ color: "#fff !important" }} />,

          align: "right",
          size: ".5",
          padding: "2px 2px",
          position: randomName,
          forceShow: true,
          handleClick: (e) => {
            setOpen(true);
            setAdPosition(randomName);
            setAdID(form["ad_id_" + (randomName + 1)]);
            setPopupContent(
              "Do you want to remove this advertisement from this movie?"
            );
          },
        },
        {
          type: "hr",
        }
      );
      setUpdateFormStructure([...temp]);
    } else {
      setOpenAdError(true);
      setPopupContent("You can add max 5 advertisement in a movie");
    }
  };
  const handleAllAdDelete = () => {
    const newJson = JSON.parse(location?.state?.form);
    dispatch(
      set_advertise_delete({
        id: "",
        video_type: "Series",
        all_delete: "All",
        series: newJson["series"],
        episode: newJson["episode"],
      })
    );
    // navigate("/SetAdvertisement/SetAdvertisement", {
    //   state: { view: "view_all" },
    // });
    setTimeout(() => {
      const data = new FormData();
      data.append("email", user?.email);
      data.append("user", user?.id);
      data.append("video_type", "Series");

      dispatch(set_advertise_list(data));
      navigate("/SetSeriesAdvertisement/SetSeriesAdvertisement", {
        state: { view: "view_all" },
      });
      setView("view_all");
    }, 900);

    // setView("view_all");
  };

  // useMemo(() => {
  //   if (isEdit) {
  //     setView("create_new");
  //     if (form?.data?.length > formStructure?.[1].length / 7)
  //       form?.data?.map(
  //         (ele) =>
  //           form?.data.length > formStructure?.[1].length / 7 &&
  //           handleClick()
  //       );
  //   } else {
  //     setView("view_all");
  //     setForm({});
  //   }
  //   const temp = formStructure;
  //   tempFormStruct.map((arr, i) =>
  //     arr.map(
  //       (ele, j) =>
  //         !["select", "select_multiple"].includes(ele.type) &&
  //         (temp[i][j] = ele)
  //     )
  //   );

  //   temp[1][0]["handleClick"] = handleClick;

  //   setFormStructure([...temp]);
  // }, [isEdit, role, location]);
  useMemo(() => {
    if (isEdit) {
      setView("create_new");
      if (form?.data?.length > (updateFormStructure?.length - 2) / 11)
        form?.data?.map(
          (ele) =>
            form?.data.length > (updateFormStructure?.length - 2) / 11 &&
            handleUpdateClick()
        );
      const temp = updateFormStructure;
      // updateFormStructure.map(
      //   (ele, i) =>
      //     ["select"].includes(ele.type) &&
      //     ((temp[i]["type"] = "inputBox"), (temp[i]["disabled"] = true))
      // );
      // setUpdateFormStructure([...temp]);
    } else {
      setView("view_all");
      setForm({});
    }
    const temp = updateFormStructure;
    // const temp = formStructure;
    // tempUpdateFormStruct.map((ele, i) =>

    //       !["select", "select_multiple"].includes(ele.type) &&
    //       (temp[i] = ele)

    // );

    temp[0]["handleClick"] = handleUpdateClick;
    temp[11]["handleClick"] = handleAllAdDelete;

    // setFormStructure([...temp]);
    setUpdateFormStructure([...temp]);
  }, [isEdit, role, location]);
  useMemo(() => {
    if (!isEdit) {
      if (form?.location0 == "City") {
        const temp = formStructure;
        temp[1][8]["visibility"] = "visible";
        temp[1][9]["visibility"] = "visible";
        temp[1][8]["required"] = true;
        temp[1][9]["required"] = true;
        temp[1][8]["options"] = State.getStatesOfCountry("IN").map(
          (ele) => ele?.name
        );
        setFormStructure([...temp]);
      } else {
        const temp = formStructure;
        temp[1][8]["visibility"] = "hidden";
        temp[1][9]["visibility"] = "hidden";
        temp[1][8]["required"] = false;
        temp[1][9]["required"] = false;
        setFormStructure([...temp]);
      }
    } else {
      if (form?.location0 == "City") {
        const temp = updateFormStructure;
        temp[8]["visibility"] = "visible";
        temp[9]["visibility"] = "visible";
        temp[8]["required"] = true;
        temp[9]["required"] = true;
        temp[8]["options"] = State.getStatesOfCountry("IN").map(
          (ele) => ele?.name
        );
        setUpdateFormStructure([...temp]);
      } else {
        const temp = updateFormStructure;
        temp[8]["visibility"] = "hidden";
        temp[9]["visibility"] = "hidden";
        temp[8]["required"] = false;
        temp[9]["required"] = false;
        setUpdateFormStructure([...temp]);
      }
    }
  }, [form?.location0]);
  useMemo(() => {
    if (!isEdit) {
      if (form?.state0 !== undefined) {
        const temp = formStructure;
        const StateName = State.getStatesOfCountry("IN")
          .map((ele) => ele?.name == form?.state0 && ele?.isoCode)
          .filter((e) => e)
          .toString();

        temp[1][9]["options"] = City.getCitiesOfState("IN", StateName).map(
          (ele) => ele?.name
        );
        setFormStructure([...temp]);
      }
    } else {
      if (form?.state0 !== undefined) {
        const temp = updateFormStructure;
        const StateName = State.getStatesOfCountry("IN")
          .map((ele) => ele?.name == form?.state0 && ele?.isoCode)
          .filter((e) => e)
          .toString();

        temp[9]["options"] = City.getCitiesOfState("IN", StateName).map(
          (ele) => ele?.name
        );
        setUpdateFormStructure([...temp]);
      }
    }
  }, [form?.state0, State]);

  useMemo(() => {
    if (!isEdit) {
      if (form?.location1 == "City" && !isEdit) {
        const temp = formStructure;

        temp[1][18]["visibility"] = "visible";
        temp[1][19]["visibility"] = "visible";
        temp[1][18]["required"] = true;
        temp[1][19]["required"] = true;
        temp[1][18]["options"] = State.getStatesOfCountry("IN").map(
          (ele) => ele?.name
        );
        setFormStructure([...temp]);
      } else if (form?.location1 == "All") {
        const temp = formStructure;

        temp[1][18]["visibility"] = "hidden";
        temp[1][19]["visibility"] = "hidden";

        temp[1][18]["required"] = false;
        temp[1][19]["required"] = false;
        setFormStructure([...temp]);
      } else if (form?.location1 == "") {
        const temp = formStructure;
        const upTemp = updateFormStructure;
        temp[1][18]["visibility"] = "hidden";
        temp[1][19]["visibility"] = "hidden";
        temp[1][18]["required"] = false;
        temp[1][19]["required"] = false;
        setFormStructure([...temp]);
        setUpdateFormStructure([...upTemp]);
      }
    } else {
      if (form?.location1 == "City") {
        const temp = updateFormStructure;

        temp[18]["visibility"] = "visible";
        temp[19]["visibility"] = "visible";

        temp[18]["required"] = true;
        temp[19]["required"] = true;
        temp[18]["options"] = State.getStatesOfCountry("IN").map(
          (ele) => ele?.name
        );
        setUpdateFormStructure([...temp]);
      } else if (form?.location1 == "All") {
        const temp = updateFormStructure;

        temp[18]["visibility"] = "hidden";
        temp[19]["visibility"] = "hidden";

        temp[18]["required"] = false;
        temp[19]["required"] = false;
        setUpdateFormStructure([...temp]);
      } else if (form?.location1 == "") {
        const temp = formStructure;

        temp[18]["visibility"] = "hidden";
        temp[19]["visibility"] = "hidden";
        temp[18]["required"] = false;
        temp[19]["required"] = false;
        setUpdateFormStructure([...temp]);
      }
    }
  }, [form?.location1]);

  useMemo(() => {
    if (!isEdit) {
      if (form?.state1 !== undefined) {
        const temp = formStructure;

        const StateName = State.getStatesOfCountry("IN")
          .map((ele) => ele?.name == form?.state1 && ele?.isoCode)
          .filter((e) => e)
          .toString();

        temp[1][19]["options"] = City.getCitiesOfState("IN", StateName).map(
          (ele) => ele?.name
        );
        setFormStructure([...temp]);
      }
    } else {
      if (form?.state1 !== undefined) {
        const temp = updateFormStructure;

        const StateName = State.getStatesOfCountry("IN")
          .map((ele) => ele?.name == form?.state1 && ele?.isoCode)
          .filter((e) => e)
          .toString();

        temp[19]["options"] = City.getCitiesOfState("IN", StateName).map(
          (ele) => ele?.name
        );
        setUpdateFormStructure([...temp]);
      }
    }
  }, [form?.state1, State]);

  useMemo(() => {
    if (!isEdit) {
      if (form?.location2 == "City") {
        const temp = formStructure;
        temp[1][29]["visibility"] = "visible";
        temp[1][30]["visibility"] = "visible";
        temp[1][29]["required"] = true;
        temp[1][30]["required"] = true;
        temp[1][29]["options"] = State.getStatesOfCountry("IN").map(
          (ele) => ele?.name
        );
        setFormStructure([...temp]);
      } else if (form?.location2 == "All") {
        const temp = formStructure;
        temp[1][30]["visibility"] = "hidden";
        temp[1][29]["visibility"] = "hidden";
        temp[1][30]["required"] = false;
        temp[1][29]["required"] = false;
        setFormStructure([...temp]);
      } else if (form?.location2 == "") {
        const temp = formStructure;
        temp[1][30]["visibility"] = "hidden";
        temp[1][29]["visibility"] = "hidden";
        temp[1][30]["required"] = false;
        temp[1][29]["required"] = false;
        setFormStructure([...temp]);
      }
    } else {
      if (form?.location2 == "City") {
        const temp = updateFormStructure;
        temp[29]["visibility"] = "visible";
        temp[30]["visibility"] = "visible";
        temp[29]["required"] = true;
        temp[30]["required"] = true;
        temp[29]["options"] = State.getStatesOfCountry("IN").map(
          (ele) => ele?.name
        );
        setUpdateFormStructure([...temp]);
      } else if (form?.location2 == "All") {
        const temp = updateFormStructure;
        temp[30]["visibility"] = "hidden";
        temp[29]["visibility"] = "hidden";
        temp[30]["required"] = false;
        temp[29]["required"] = false;
        setUpdateFormStructure([...temp]);
      } else if (form?.location2 == "") {
        const temp = updateFormStructure;
        temp[30]["visibility"] = "hidden";
        temp[29]["visibility"] = "hidden";
        temp[30]["required"] = false;
        temp[29]["required"] = false;
        setUpdateFormStructure([...temp]);
      }
    }
  }, [form?.location2]);
  useMemo(() => {
    if (!isEdit) {
      if (form?.state2 !== undefined) {
        const temp = formStructure;
        const StateName = State.getStatesOfCountry("IN")
          .map((ele) => ele?.name == form?.state2 && ele?.isoCode)
          .filter((e) => e)
          .toString();

        temp[1][30]["options"] = City.getCitiesOfState("IN", StateName).map(
          (ele) => ele?.name
        );
        setFormStructure([...temp]);
      }
    } else {
      if (form?.state2 !== undefined) {
        const temp = updateFormStructure;
        const StateName = State.getStatesOfCountry("IN")
          .map((ele) => ele?.name == form?.state2 && ele?.isoCode)
          .filter((e) => e)
          .toString();

        temp[30]["options"] = City.getCitiesOfState("IN", StateName).map(
          (ele) => ele?.name
        );
        setUpdateFormStructure([...temp]);
      }
    }
  }, [form?.state2, State]);
  useMemo(() => {
    if (!isEdit) {
      if (form?.location3 == "City") {
        const temp = formStructure;
        temp[1][40]["visibility"] = "visible";
        temp[1][41]["visibility"] = "visible";
        temp[1][40]["required"] = true;
        temp[1][41]["required"] = true;
        temp[1][40]["options"] = State.getStatesOfCountry("IN").map(
          (ele) => ele?.name
        );
        setFormStructure([...temp]);
      } else if (form?.location3 == "All") {
        const temp = formStructure;
        temp[1][40]["visibility"] = "hidden";
        temp[1][41]["visibility"] = "hidden";
        temp[1][40]["required"] = false;
        temp[1][41]["required"] = false;
        setFormStructure([...temp]);
      } else if (form?.location3 == "") {
        const temp = formStructure;
        temp[1][40]["visibility"] = "hidden";
        temp[1][41]["visibility"] = "hidden";
        temp[1][40]["required"] = false;
        temp[1][41]["required"] = false;
        setFormStructure([...temp]);
      }
    } else {
      if (form?.location3 == "City") {
        const temp = updateFormStructure;
        temp[40]["visibility"] = "visible";
        temp[41]["visibility"] = "visible";
        temp[40]["required"] = true;
        temp[41]["required"] = true;
        temp[40]["options"] = State.getStatesOfCountry("IN").map(
          (ele) => ele?.name
        );
        setUpdateFormStructure([...temp]);
      } else if (form?.location3 == "All") {
        const temp = updateFormStructure;
        temp[40]["visibility"] = "hidden";
        temp[41]["visibility"] = "hidden";
        temp[40]["required"] = false;
        temp[41]["required"] = false;
        setUpdateFormStructure([...temp]);
      } else if (form?.location3 == "") {
        const temp = updateFormStructure;
        temp[40]["visibility"] = "hidden";
        temp[41]["visibility"] = "hidden";
        temp[40]["required"] = false;
        temp[41]["required"] = false;
        setUpdateFormStructure([...temp]);
      }
    }
  }, [form?.location3]);
  useMemo(() => {
    if (!isEdit) {
      if (form?.state3 !== undefined) {
        const temp = formStructure;
        const StateName = State.getStatesOfCountry("IN")
          .map((ele) => ele?.name == form?.state3 && ele?.isoCode)
          .filter((e) => e)
          .toString();

        temp[1][41]["options"] = City.getCitiesOfState("IN", StateName).map(
          (ele) => ele?.name
        );
        setFormStructure([...temp]);
      }
    } else {
      if (form?.state3 !== undefined) {
        const temp = updateFormStructure;
        const StateName = State.getStatesOfCountry("IN")
          .map((ele) => ele?.name == form?.state3 && ele?.isoCode)
          .filter((e) => e)
          .toString();

        temp[41]["options"] = City.getCitiesOfState("IN", StateName).map(
          (ele) => ele?.name
        );
        setUpdateFormStructure([...temp]);
      }
    }
  }, [form?.state3, State]);
  useMemo(() => {
    if (!isEdit) {
      if (form?.location4 == "City") {
        const temp = formStructure;
        temp[1][51]["visibility"] = "visible";
        temp[1][52]["visibility"] = "visible";
        temp[1][51]["required"] = true;
        temp[1][52]["required"] = true;
        temp[1][51]["options"] = State.getStatesOfCountry("IN").map(
          (ele) => ele?.name
        );
        setFormStructure([...temp]);
      } else if (form?.location4 == "All") {
        const temp = formStructure;
        temp[1][51]["visibility"] = "hidden";
        temp[1][52]["visibility"] = "hidden";
        temp[1][51]["required"] = false;
        temp[1][52]["required"] = false;
        setFormStructure([...temp]);
      } else if (form?.location4 == "") {
        const temp = formStructure;
        temp[1][51]["visibility"] = "hidden";
        temp[1][52]["visibility"] = "hidden";
        temp[1][51]["required"] = false;
        temp[1][52]["required"] = false;
        setFormStructure([...temp]);
      }
    } else {
      if (form?.location4 == "City") {
        const temp = updateFormStructure;
        temp[51]["visibility"] = "visible";
        temp[52]["visibility"] = "visible";
        temp[51]["required"] = true;
        temp[52]["required"] = true;
        temp[51]["options"] = State.getStatesOfCountry("IN").map(
          (ele) => ele?.name
        );
        setUpdateFormStructure([...temp]);
      } else if (form?.location4 == "All") {
        const temp = updateFormStructure;
        temp[51]["visibility"] = "hidden";
        temp[52]["visibility"] = "hidden";
        temp[51]["required"] = false;
        temp[52]["required"] = false;
        setUpdateFormStructure([...temp]);
      } else if (form?.location4 == "") {
        const temp = updateFormStructure;
        temp[51]["visibility"] = "hidden";
        temp[52]["visibility"] = "hidden";
        temp[51]["required"] = false;
        temp[52]["required"] = false;
        setUpdateFormStructure([...temp]);
      }
    }
  }, [form?.location4]);
  useMemo(() => {
    if (!isEdit) {
      if (form?.state4 !== undefined) {
        const temp = formStructure;
        const StateName = State.getStatesOfCountry("IN")
          .map((ele) => ele?.name == form?.state4 && ele?.isoCode)
          .filter((e) => e)
          .toString();

        temp[1][52]["options"] = City.getCitiesOfState("IN", StateName).map(
          (ele) => ele?.name
        );
        setFormStructure([...temp]);
      }
    } else {
      if (form?.state4 !== undefined) {
        const temp = updateFormStructure;
        const StateName = State.getStatesOfCountry("IN")
          .map((ele) => ele?.name == form?.state4 && ele?.isoCode)
          .filter((e) => e)
          .toString();

        temp[52]["options"] = City.getCitiesOfState("IN", StateName).map(
          (ele) => ele?.name
        );
        setUpdateFormStructure([...temp]);
      }
    }
  }, [form?.state4, State]);
  const genre = useSelector((state) => state.masters.genre);
  const message = useSelector((state) => state.layout.message);

  useMemo(() => {
    if (advertisements?.statuscode == 200) {
      const temp = formStructure;
      const tempUpdate = updateFormStructure;
      const currentDate = new Date();
      temp[1][1]["options"] = advertisements?.data
        ?.map(
          (advertisement) =>
            advertisement?.status == "Active" &&
            advertisement?.payment_status !== "Pending" &&
            advertisement?.product_name
        )
        .filter((e) => e);

      tempUpdate[1]["options"] = advertisements?.data
        ?.map(
          (advertisement) =>
            advertisement?.status == "Active" &&
            advertisement?.payment_status !== "Pending" &&
            advertisement?.product_name
        )
        .filter((e) => e);
      const tempFilter = tableData;
      tempFilter["filterColumn"][1]["options"] = advertisements?.data
        ?.map(
          (advertisement) =>
            advertisement?.status == "Active" &&
            advertisement?.payment_status !== "Pending" &&
            advertisement?.product_name
        )
        .filter((e) => e);

      setTableData({ ...tempFilter });
      setFormStructure([...temp]);
      setUpdateFormStructure([...tempUpdate]);

    }
  }, [advertisements]);

  // useMemo(() => {
  //   if (language?.statuscode == 200) {
  //     const temp = formStructure;
  //     temp[0][0]["options"] = language?.data.map(
  //       (language) => language?.language_name
  //     );

  //     setFormStructure([...temp]);
  //   }
  // }, [language]);
  useMemo(() => {
    if (series?.statuscode == 200) {
      const temp = formStructure;
      temp[0][0]["options"] = series?.data?.map((series) => series?.series_name);

      setFormStructure([...temp]);
      const tempFilter = tableData;
      tempFilter["filterColumn"][0]["options"] = series?.data?.map(
        (series) => series?.series_name
        );
        setTableData({ ...tempFilter });
    }

  }, [series]);
  useMemo(() => {
    if (seasons?.statuscode == 200) {
      const temp = formStructure;
      temp[0][1]["options"] = seasons?.data
        ?.map(
          (season) => season?.series_name == form?.series_id && season?.season
        )
        .filter((e) => e);

      setFormStructure([...temp]);
    }
  }, [seasons, form?.series_id]);
  useMemo(() => {
    if (episodes?.statuscode == 200) {
      const temp = formStructure;
      temp[0][2]["options"] = episodes?.data
        ?.map(
          (episode) =>
            episode?.series_name?.series_name == form?.series_id &&
            episode?.season_name == form?.season &&
            episode?.episode_title
        )
        .filter((e) => e);

      setFormStructure([...temp]);
    }
    // const tempFilter = tableData;
    // tempFilter["filterColumn"][1]["options"] =episodes?.data?.map((episode) => episode?.episode_title);

    // setTableData({ ...tempFilter });
  }, [episodes, form?.series_id, form?.season]);
  useMemo(() => {
    setForm({
      ...form,
      duration: episodes?.data
        ?.map(
          (episodes) =>
            episodes?.episode_title == form?.episode_id &&
            episodes?.episode_duration
        )
        .filter((e) => e),
    });
  }, [form?.episode_id]);
  useEffect(() => {
    if (form?.duration != null || undefined) {
      setFormTitle(
        ["Detail", `Set Series Advertisement (${form?.duration})`].filter(
          (e) => e
        )
      );
    }
  }, [form?.duration]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();

    const advertise = [];
    if (isEdit) {
      for (var i = 0; i < (updateFormStructure?.length - 1) / 7; i++) {
        advertise.push({
          advertise: advertisements?.data
            ?.map(
              (advertisement) =>
                advertisement?.product_name == form?.["advertise" + i] &&
                advertisement?.id
            )
            .filter((e) => e)[0],
          time: form?.["time" + i],
          id: form?.["ad_id_" + (i + 1)],
          release_date: form?.["release_date" + i],
          location: form?.["location" + i],
          state: form?.["state" + i] == null ? "null" : form?.["state" + i],
          city: form?.["city" + i] == null ? "null" : form?.["city" + i],
        });
      }
    } else {
      for (var i = 0; i < formStructure[1].length / 11; i++) {
        advertise.push({
          advertise: advertisements?.data
            ?.map(
              (advertisement) =>
                advertisement?.product_name == form?.["advertise" + i] &&
                advertisement?.id
            )
            .filter((e) => e)[0],
          time: form?.["time" + i],
          release_date: form?.["release_date" + i],
          location: form?.["location" + i],
          state: form?.["state" + i] == null ? "null" : form?.["state" + i],
          city: form?.["city" + i] == null ? "null" : form?.["city" + i],
        });
      }
    }
    const temp_form = form;
    temp_form["tempseries_id"] = form?.series_id;
    temp_form["tempepisode_id"] = form?.episode_id;

    temp_form["video_type"] = "Series";

    //  temp_form["movie"] = movies?.data
    //     .map(
    //       (option) => form?.["movie"]?.includes(option.movie_name) && option.id
    //     )
    //     .filter((e) => e);
    temp_form["episode_id"] = episodes?.data
      ?.map(
        (option) =>
          form?.["episode_id"]?.includes(option.episode_title) && option.id
      )
      .filter((e) => e);
    temp_form["series_id"] = series?.data
      ?.map(
        (option) =>
          form?.["series_id"]?.includes(option.series_name) && option.id
      )
      .filter((e) => e);

    temp_form["advertise"] = JSON.stringify(advertise);
    setForm({
      ...temp_form,
    });

    Object.keys(form)?.map((key) => data.append(key, form?.[key]));
    data.append("email", user?.email);
    if (isEdit) {
      dispatch(set_update_advertise(data));
    } else {
      dispatch(set_advertise(data));
    }
  };
  useMemo(() => {
    if (message?.statuscode == 200) {
      const temp = tableData;
      if (isEdit) {
        temp.tableBody?.map(
          (value, index) =>
            value.id == form.id && (temp.tableBody[index] = { ...form })
        );
      } else {
        temp.tableBody[temp.tableBody.length] = {
          id: temp.tableBody.length,
          ...form,
          edit: temp.tableBody.length,
        };
      }
      setTableData({ ...temp });

      setIsEdit(false);
      setTimeout(() => {
        const data = new FormData();
        data.append("user", user?.id);
        data.append("video_type", "Series");

        dispatch(set_advertise_list(data));
        navigate("/SetSeriesAdvertisement/SetSeriesAdvertisement", {
          state: { view: "view_all" },
        });
        setView("view_all");
      }, 900);
    } else {
      const tempForm = form;
      tempForm["genre"] = form?.["tempgenre"];
      tempForm["language"] = form?.["templanguage"];

      setForm({ ...tempForm });
    }
  }, [message]);

  useMemo(() => {
    if (result) {
      const temp = formStructure;
      const upTemp = updateFormStructure;
      if (adPosition != undefined) {
        if (!isEdit) {
          temp[1]?.map((value, index) => {
            if (value.position == adPosition) {
              const tempForm = form;
              tempForm["advertise" + value.position] = "";
              tempForm["duration" + value.position] = "";
              tempForm["time" + value.position] = "";
              tempForm["company_name" + value.position] = "";
              tempForm["views_required" + value.position] = "";
              tempForm["available_views" + value.position] = "";
              setForm({ ...tempForm });
              temp[1].splice(index - 10, 11);
            }
          });
        } else {
          upTemp?.map((value, index) => {
            if (value.position == adPosition) {
              const tempForm = form;
              tempForm["advertise" + value.position] = "";
              tempForm["duration" + value.position] = "";
              tempForm["time" + value.position] = "";
              tempForm["company_name" + value.position] = "";
              tempForm["views_required" + value.position] = "";
              tempForm["available_views" + value.position] = "";
              setForm({ ...tempForm });
              upTemp.splice(index - 10, 11);
            }
          });
        }
        setFormStructure([...temp]);
        setUpdateFormStructure([...upTemp]);
        setAdPosition(undefined);
        dispatch(
          set_advertise_delete({
            id: adID,
            video_type: "Series",
            all_delete: "",
            series: "",
            episode: "",
          })
        );
      }
    }
    setResult(undefined);
  }, [result, isEdit]);

  useMemo(() => {
    if (form?.advertise0 != undefined) {
      const temp = advertisements?.data
        ?.map(
          (advertisement) =>
            advertisement?.product_name == form?.advertise0 && advertisement
        )
        .filter((e) => e)[0];

      setForm({
        ...form,
        duration0: temp?.duration,
        company_name0: temp?.advertiser?.company_name,
        views_required0: temp?.views_required,
        available_views0: temp?.views_required - temp?.no_of_views,
      });
    } else {
      setForm({
        ...form,
        duration0: "",
        time0: "",
        company_name0: "",
        views_required0: "",
        available_views0: "",
      });
    }
  }, [form?.advertise0]);
  useMemo(() => {
    if (form?.advertise1 != undefined) {
      const temp = advertisements?.data
        ?.map(
          (advertisement) =>
            advertisement?.product_name == form?.advertise1 && advertisement
        )
        .filter((e) => e)[0];

      setForm({
        ...form,
        duration1: temp?.duration,
        company_name1: temp?.advertiser?.company_name,
        views_required1: temp?.views_required,
        available_views1: temp?.views_required - temp?.no_of_views,
      });
    }
  }, [form?.advertise1]);
  useMemo(() => {
    if (form?.advertise2 != undefined) {
      const temp = advertisements?.data
        ?.map(
          (advertisement) =>
            advertisement?.product_name == form?.advertise2 && advertisement
        )
        .filter((e) => e)[0];

      setForm({
        ...form,
        duration2: temp?.duration,
        company_name2: temp?.advertiser?.company_name,
        views_required2: temp?.views_required,
        available_views2: temp?.views_required - temp?.no_of_views,
      });
    }
  }, [form?.advertise2]);
  useMemo(() => {
    if (form?.advertise3 != undefined) {
      const temp = advertisements?.data
        ?.map(
          (advertisement) =>
            advertisement?.product_name == form?.advertise3 && advertisement
        )
        .filter((e) => e)[0];

      setForm({
        ...form,
        duration3: temp?.duration,
        company_name3: temp?.advertiser?.company_name,
        views_required3: temp?.views_required,
        available_views3: temp?.views_required - temp?.no_of_views,
      });
    }
  }, [form?.advertise3]);
  useMemo(() => {
    if (form?.advertise4 != undefined) {
      const temp = advertisements?.data
        ?.map(
          (advertisement) =>
            advertisement?.product_name == form?.advertise4 && advertisement
        )
        .filter((e) => e)[0];

      setForm({
        ...form,
        duration4: temp?.duration,
        company_name4: temp?.advertiser?.company_name,
        views_required4: temp?.views_required,
        available_views4: temp?.views_required - temp?.no_of_views,
      });
    }
  }, [form?.advertise4]);

  const handleClose = () => {
    setOpenAdError(false);
  };
  useMemo(() => {
    const times = [
      form?.time0,
      form?.time1,
      form?.time2,
      form?.time3,
      form?.time4,
    ];
    var temp = [
      form?.time0,
      form?.time1,
      form?.time2,
      form?.time3,
      form?.time4,
    ];
    for (var j = temp.length - 1; j >= 0; j--)
      for (var i = temp.length - 1; i >= 0; i--) {
        if (j > i && temp[j] == temp[i]) {
          temp[j] = undefined;
        }
      }

    if (JSON.stringify(times) != JSON.stringify(temp)) {
      setOpenAdError(true);
      setPopupContent(
        "You have already added the advertisement for the same duration"
      );
    }
    setForm({
      ...form,
      time0: temp[0],
      time1: temp[1],
      time2: temp[2],
      time3: temp[3],
      time4: temp[4],
    });
  }, [form?.time0, form?.time1, form?.time2, form?.time3, form?.time4]);

  useEffect(() => {
    const temp = formStructure;
    temp[1][0]["handleClick"] = handleClick;
    setFormStructure([...temp]);
  }, []);
  useEffect(() => {
    const temp = updateFormStructure;
    temp[0]["handleClick"] = handleUpdateClick;
    // temp[7]["handleClick"] = handleAllAdDelete;
    setUpdateFormStructure([...temp]);
  }, []);

  return (
    <>
      <Popup
        open={open}
        setOpen={setOpen}
        content={content}
        setResult={setResult}
      />
      {role !== "Advertiser" && (
        <ViewChange
          setForm={setForm}
          setView={setView}
          setIsEdit={setIsEdit}
          view={view}
          isEdit={isEdit}
          create_new={"/SetSeriesAdvertisement/CreateSetSeriesAdvertisement/"}
          view_all={"/SetSeriesAdvertisement/SetSeriesAdvertisement/"}
          form={form}
          reload={<Reload isClubed={true} />}
          access={rights?.["Set Series Advertisement"]?.["create"] == "true"}
        />
      )}
      {!isEdit
        ? view == "create_new" && (
            <MultiStepForm
              formStructure={formStructure}
              handleSubmit={handleSubmit}
              formTitle={formTitle}
              key={"Form"}
              setForm={setForm}
              form={form}
              tableData={tableData}
              setTableData={setTableData}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
            />
          )
        : view == "create_new" && (
            <Form
              formStructure={updateFormStructure}
              handleSubmit={handleSubmit}
              formTitle={formTitle1}
              key={"Form"}
              setForm={setForm}
              form={form}
              tableData={tableData}
              setTableData={setTableData}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
            />
          )}
      {view == "view_all" && (
        <ListTable
          tableData={tableData}
          key={"ListTable"}
          setForm={setForm}
          setTableData={setTableData}
          setIsEdit={setIsEdit}
          create_new={"/SetSeriesAdvertisement/EditSetSeriesAdvertisement"}
        />
      )}

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
    </>
  );
};

export default SetSeriesAdvertisement;
