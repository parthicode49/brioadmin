import React from "react";
import { useSelector } from "react-redux";

export const TableData = () => {
  const rights = useSelector((state) => state.layout.rights);
  return {
    tableTitle: "Categories",
    onDeleteText: "Are you Sure?",
    deleteAccess: rights?.["Masters"]?.["delete"] == "true",
    tableHead: [
      {
        id: "category_name",
        label: "Category",
      },
      // {
      //   id: "category_image",
      //   label: "Image",
      //   isImage: true,
      // },
      {
        id: "sequence",
        label: "Sequence",
        align: "center",
      },
      {
        id: "status",
        label: "Status",
        
      },
      // {
      //   id: "isEditForm",
      //   label: "edit",
      //   isSpecial: true,
      //   align: "left",
      // },
      {
        id: "edit",
        label: "Update",
        access: rights?.["Masters"]?.["edit"] == "true",
        isNewPopUpForm : true
      },
    ],
    tableBody: [],
  };
};
