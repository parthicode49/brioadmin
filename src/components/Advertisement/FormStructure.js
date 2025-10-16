import React from "react";

export const FormStructure = (isEdit) => {
  return [
    {
      id: "1",
      type: "inputBox",
      title: "Title",
      name: "title",
      maxLength: 30,
      regex: /^[a-zA-Z0-9\s\&]+$/,
      required: true,
    },

    {
      id: "2",
      type: "inputBox",
      title: "Plan",
      disabled :true,
      name: "advertisement_plan",
      required: true,
    },
    {
      id: "3",
      type: "toggle",
      title: "Admin's Approval",
      name: "status",
      required: true,
      size: "6",

      options: [
        { value: "Approved", color: "success" },
        { value: "Rejected", color: "danger" },
      ],
    },
    {
      id: "4",
      type: "toggle",
      title: "Patment Status",
      name: "payment_status",
      // default: "Inactive",
      size: "6",
      display: "none",
      options: [
        { value: "Pending", color: "danger" },
        { value: "Done", color: "success" },
      ],
    },
    {
      id: "5",
      type: "inputBox",
      variant: "date",
      title: "Publish Date",
      min: new Date().toISOString().split("T")[0],
      name: "start_date",
      default: " ",
      // display: "none",
      required: true,
    },
    {
      id: "6",
      type: "inputBox",
      title: "Reject Reason",
      name: "reject_message",
      required: true,
      display: "none",
    },
    {
      id: "7",
      type: "description",
      title: "Description",
      name: "description",
      required: true,
    },
    {
      id: "8",
      type: "image",
      title: "Upload Product Image",
      name: "advertisement_photo",
      subtitle: "(Resolution : 512px x 512px) *",
      subsubtitle: "Max File Size 1MB",
      subsubsubtitle: "Support only JPG,PNG,JPEG",
      size: "4",
      required: true,
    },
    {
      id: "9",
      type: "button",
      title: isEdit ? "Edit" : "Create",
    },
  ];
};
