import React, { useEffect } from "react";
import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import styles from "./../../styles/PageTitle.module.css";
import * as Action from "../../actions/customer";
import ListTable from "./../utils/Table";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
export default function PostDetail() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user_post_list } = bindActionCreators(Action, dispatch);
  const [tableData, setTableData] = useState({
    tableTitle: "Post Details",
    disableDelete: true,
    tableHead: [
      {
        id: "post_name",
        label: "Post Name",
        link:"/PendingPost/PendingPost/PostDetails",
        align: "left",
        color: "var(--gradientColor2)",
      },
      {
        id: "post_type",
        label: "Type",
      },
      {
        id: "created_at",
        label: "Created On",
      },

      // {
      //   id: "device_name",
      //   label: "Device Name",
      // },
      {
        id: "status",
        label: "status",
        isButtonDisplay: true
      },
    ],
    tableBody: [],
  });

  useEffect(() => {
    if(location?.state?.flag == "user_post"){

      (async () => {
        const formData = new FormData();
        formData.append('id',location?.state?.id)
        const resData =await user_post_list(formData);
        const temp = tableData;
        temp.tableBody = resData?.post_information || [];
        setTableData({ ...temp });
        console.log("res",resData)
      })();
    }
  }, [location?.state]);

  const [form, setForm] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  useMemo(() => {
    const temp = tableData;
    temp.tableBody = location.state?.data || [];
    setTableData({ ...temp });
  }, [location.state?.data]);
  return (
    <>
      <ListTable
        tableData={tableData}
        key={"ListTable"}
        setForm={setForm}
        setTableData={setTableData}
        setIsEdit={setIsEdit}
      />
    </>
  );
}
