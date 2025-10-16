import React from "react"
import { useSelector } from "react-redux"

export const TableData= () => {
  const rights=useSelector((state) => state.layout.rights)
  return{
    tableTitle:"Avatars",
    deleteAccess:rights?.["Masters"]?.["delete"]=="true",
    onDeleteText:"Are you Sure?",
    tableHead:[
        {
            id: 'avatarName',
            label: 'Title',
          },
          {
            id: 'avatarImage',
            label: 'Image',
            isImage:true
          },
          {
            id: 'edit',
            label: 'Update',
            access:rights?.["Masters"]?.["edit"]=="true"
          },
    ],
    tableBody:[
       
    ]}}