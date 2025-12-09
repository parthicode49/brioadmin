import React from "react";
import AddIcon from "@mui/icons-material/Add";
export const FormStructure = (isEdit) => {
  return [
    [
      // {
      //   id: "1",
      //   type: "select",
      //   title: "Select Language",
      //   name: "language",
      //   options: ["Movie", "Web Series"],
      //   required: true,
      // },
      // {
      //   id: "2",
      //   type: "select",
      //   title: "Select Video Type",
      //   name: "video_type",
      //   options: ["Movie", "Web Series"],
      //   required: true,
      // },

      {
        id: "3",
        type: "select",
        name: "series_id",
        title: "Select Series",
        options: ["Movie", "Web Series"],
        required: true,
      },
      {
        id: "3",
        type: "select",
        name: "season",
        title: "Select Season",
        options: ["Movie", "Web Series"],
        required: true,
      },
      {
        id: "3",
        type: "select",
        name: "episode_id",
        title: "Select Episode",
        options: ["Movie", "Web Series"],
        required: true,
      },
   
    //   {
    //     id: "4",
    //     type: "inputBox",
    //     variant: "date",
    //     title: "Publish Date",
    //     min: new Date().toISOString().split('T')[0],
    //     name: "release_date",
    //     default:new Date().toISOString().split('T')[0],
       
    //     required: true
    // },
    {
      id: "15",
      type: "inputBox",
      title: "Duration",
      name: "duration",
      disabled: true,
      required: true,
      dispaly:"none",
  },
      
    ],
    [
      {
          id: "23",
          type: "button",
          title: <AddIcon sx={{ color: '#fff !important' }} />,

          align: "left",
          forceShow: true
      },
      {
          id: "21",
          type: "select",
          title: "Select Advertise",
          size: "3",
          name: "advertise0",
          options: ["Advertise 1", "Advertise 2"]

      },
      {
          id: "24",
          type: "inputBox",
          size: "1.5",
          title: "Ad Duration",
          name: "duration0",
          disabled: true
      },
      {
          id: "24",
          type: "duration",
          // regex:/^([0]?[0-3]):([0-5]?[0-9]):([0-5]?[0-9])+$/,
          // default:"00:00:00",
          // maxLength:"8",
          // variant:"time",
          // min:"00:00",
          // max:"03:00",
          size: "2",
          title: "set Duration",
          name: "time0",
          color:"red"
      },

      {
          id: "24",
          type: "inputBox",
          size: "2",
          title: "Company Name",
          name: "company_name0",
          disabled: true
      },
      // {
      //     id: "24",
      //     type: "inputBox",
      //     size: "1.5",
      //     title: "View Required",
      //     name: "views_required0",
      //     disabled: true
      // },
      {
          id: "24",
          type: "inputBox",
          size: "1.5",
          title: "Avbl. views",
          name: "available_views0",
          disabled: true,
      },
      
    {
      id: "4",
      type: "inputBox",
      variant: "date",
      title: "Publish Date",
      min: new Date().toISOString().split("T")[0],
      name: "release_date0",
      default: " ",
      size: "1.5",
      required: true,
    },
    {
      id: "21",
      type: "select",
      title: "Select Location",
      size: "4",
      name: "location0",
      options: ["All", "City"],

  },
  {
    id: "21",
    type: "select",
    title: "Select State",
    size: "4",
    name: "state0",
    options: ["Advertise 1", "Advertise 2"],
    visibility:"hidden"

  

},
{
  id: "21",
  type: "select",
  title: "Select City",
  size: "3.5",
  name: "city0",
  options: ["Advertise 1", "Advertise 2"],
  visibility:"hidden"


},
{
type:"hr"
}

  ],
  ];
};
export const FormStructure1 = (isEdit) => {
  return [
    {
      id: "23",
      type: "button",
      title: <AddIcon sx={{ color: "#fff !important" }} />,
      align: "left",
      forceShow: true,
    },
    {
      id: "21",
      type: "select",
      title: "Select Advertise",
      size: "3",
      name: "advertise0",
      options: ["Advertise 1", "Advertise 2"],
    },
    {
      id: "24",
      type: "inputBox",
      size: "1.5",
      title: "Ad Duration",
      name: "duration0",
      disabled: true,
    },
    {
      id: "24",
      type: "duration",
      // regex:/^([0]?[0-3]):([0-5]?[0-9]):([0-5]?[0-9])+$/,
      // default:"00:00:00",
      // maxLength:"8",
      // variant:"time",
      // min:"00:00",
      // max:"03:00",
      size: "2",
      title: "set Duration",
      name: "time0",
      color: "red",
    },

    {
      id: "24",
      type: "inputBox",
      size: "2",
      title: "Company Name",
      name: "company_name0",
      disabled: true,
    },
    // {
    //     id: "24",
    //     type: "inputBox",
    //     size: "1.5",
    //     title: "View Required",
    //     name: "views_required0",
    //     disabled: true
    // },
    {
      id: "24",
      type: "inputBox",
      size: "1.5",
      title: "Avbl. views",
      name: "available_views0",
      disabled: true,
    },
    {
      id: "4",
      type: "inputBox",
      variant: "date",
      title: "Publish Date",
      min: new Date().toISOString().split("T")[0],
      name: "release_date0",
      default:" ",
      size: "1.5",
      required: true,
    },
    {
      id: "21",
      type: "select",
      title: "Select Location",
      size: "4",
      name: "location0",
      options: ["All", "City"],

  },
  {
    id: "21",
    type: "select",
    title: "Select State",
    size: "4",
    name: "state0",
    options: ["Advertise 1", "Advertise 2"],
    visibility:"hidden"

  

},
{
  id: "21",
  type: "select",
  title: "Select City",
  size: "3.5",
  name: "city0",
  options: ["Advertise 1", "Advertise 2"],
  visibility:"hidden"


},
{
type:"hr"
},

    {
      id: "23",
      type: "button",
      title: "Delete All Ad",

      align: "left",
      forceShow: true,
    },
    {
      id: "5",
      type: "button",
      size: "12",
      title: isEdit ? "Edit" : "Create",
    },
  ];
}

