import React from "react";
import AddIcon from "@mui/icons-material/Add";
export const FormStructure = (isEdit) => {
  const currentDate = new Date();
const previousDate = new Date(currentDate);
previousDate.setDate(currentDate.getDate() - 1);
  return [
    [
      {
        id: "1",
        type: "select",
        title: "Select Language",
        name: "language",
        options: ["Movie", "Web Series"],
        required: true,
      },
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
        name: "movie_id",
        title: "Select Movie",
        options: ["Movie", "Web Series"],
        // required: true,
      },

      // {
      //   id: "4",
      //   type: "inputBox",
      //   variant: "date",
      //   title: "Publish Date",
      //   min: new Date().toISOString().split("T")[0],
      //   name: "release_date",
      //   default: new Date().toISOString().split("T")[0],

      //   required: true,
      // },
      {
        id: "15",
        type: "inputBox",
        title: "Duration",
        name: "duration",
        disabled: true,
        required: true,
        dispaly: "none",
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
    // [
    //   {
    //     id: "23",
    //     type: "button",
    //     title: <AddIcon sx={{ color: "#fff !important" }} />,

    //     align: "left",
    //     forceShow: true,
    //   },
    //   {
    //     id: "21",
    //     type: "select",
    //     title: "Select Advertise",
    //     size: "2",
    //     name: "advertise0",
    //     options: ["Advertise 1", "Advertise 2"],
    //   },
    //   {
    //     id: "24",
    //     type: "inputBox",
    //     size: "1",
    //     title: "Ad Duration",
    //     name: "duration0",
    //     disabled: true,
    //   },
    //   {
    //     id: "24",
    //     type: "duration",
    //     // regex:/^([0]?[0-3]):([0-5]?[0-9]):([0-5]?[0-9])+$/,
    //     // default:"00:00:00",
    //     // maxLength:"8",
    //     // variant:"time",
    //     // min:"00:00",
    //     // max:"03:00",
    //     size: "1",
    //     title: "set Duration",
    //     name: "time0",
    //     color: "red",
    //   },

    //   {
    //     id: "24",
    //     type: "inputBox",
    //     size: "1.5",
    //     title: "Company Name",
    //     name: "company_name0",
    //     disabled: true,
    //   },
    //   // {
    //   //     id: "24",
    //   //     type: "inputBox",
    //   //     size: "1.5",
    //   //     title: "View Required",
    //   //     name: "views_required0",
    //   //     disabled: true
    //   // },
    //   {
    //     id: "24",
    //     type: "inputBox",
    //     size: "1",
    //     title: "Avbl. views",
    //     name: "available_views0",
    //     disabled: true,
    //   },
    //   {
    //     id: "4",
    //     type: "inputBox",
    //     variant: "date",
    //     title: "Publish Date",
    //     min: new Date().toISOString().split("T")[0],
    //     name: "release_date",
    //     default: new Date().toISOString().split("T")[0],
    //     size: "2",
    //     required: true,
    //   },
    //   {
    //     id: "21",
    //     type: "select",
    //     title: "Select Advertise",
    //     size: "2",
    //     name: "advertise22",
    //     options: ["Advertise 1", "Advertise 2"],
    //   },
    //   {
    //     id: "21",
    //     type: "select",
    //     title: "Select Advertise",
    //     size: "2",
    //     name: "advertise223",
    //     options: ["Advertise 1", "Advertise 2"],
    //   },
    //   {
    //     id: "21",
    //     type: "select",
    //     title: "Select Advertise",
    //     size: "2",
    //     name: "advertise56",
    //     options: ["Advertise 1", "Advertise 2"],
    //   },
    // ],
  ];
};
export const FormStructure1 = (isEdit) => {
  return [
    {
      id: "1",
      type: "button",
      title: <AddIcon sx={{ color: "#fff !important" }} />,
      align: "left",
      forceShow: true,
    },
    {
      id: "2",
      type: "select",
      title: "Select Advertise",
      size: "3",
      name: "advertise0",
      options: ["Advertise 1", "Advertise 2"],
    },
    {
      id: "3",
      type: "inputBox",
      size: "1.5",
      title: "Ad Duration",
      name: "duration0",
      disabled: true,
    },
    {
      id: "4",
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
      id: "5",
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
      id: "6",
      type: "inputBox",
      size: "1.5",
      title: "Avbl. views",
      name: "available_views0",
      disabled: true,
    },
    {
      id: "7",
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
      id: "8",
      type: "select",
      title: "Select Location",
      size: "4",
      name: "location0",
      options: ["All", "City"],

  },
  {
    id: "9",
    type: "select",
    title: "Select State",
    size: "4",
    name: "state0",
    options: ["Advertise 1", "Advertise 2"],
    visibility:"hidden"

  

},
{
  id: "10",
  type: "select",
  title: "Select City",
  size: "3.5",
  name: "city0",
  options: ["Advertise 1", "Advertise 2"],
  visibility:"hidden"


},
{
  id:"11",
type:"hr"
},

    {
      id: "12",
      type: "button",
      title: "Delete All Ad",

      align: "left",
      forceShow: true,
    },
    {
      id: "13",
      type: "button",
      size: "12",
      title: isEdit ? "Edit" : "Create",
    },
  ];
};
