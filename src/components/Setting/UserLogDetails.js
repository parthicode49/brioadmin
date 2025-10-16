import React from "react";
import { useState, useEffect, useMemo } from "react";
import ListTable from "../utils/Table";
// import { user_log_list } from "../../actions/Setting/user_logs";
import { useDispatch, useSelector } from "react-redux";
import Export from "../utils/Export";
import { useLocation } from "react-router-dom";
import { user_log_detai } from "../../actions/Setting/user_logs";

export default function UserLogDetails() {
  const dispatch = useDispatch();
  const location = useLocation();
  const data = new FormData();
  const logdetails = useSelector((state) => state?.setting?.logsdis);
  useEffect(() => {
    data.append("id", location.state?.id);
    dispatch(user_log_detai(data));
  }, [location]);

  const [tableData, setTableData] = useState({
    tableTitle: "User Log Details",
    person_name: {
      title: "User Name",
      name:"hi"
    },
    disableDelete: true,
    tableHead: [
      {
        id: "module_name",
        label: "Module"
      },
      {
        id: "name",
        label: "Name",
      },
      {
        id: "status",
        label: "Activity",
        isButtonDisplay: true
      },
      {
        id: "date_time",
        label: "Time",
      },

    ],
    tableBody: [],

  });

  useMemo(() => {
    if (logdetails?.statuscode == 200) {
      const temp = tableData;

      temp.tableBody = logdetails?.data?.map((ele) => ({
        ...ele,
      }))
        setTableData({ ...temp });
    }
  }, [logdetails]);

  useMemo(()=>{
    const temp = tableData;

    temp["person_name"]["name"] = location?.state?.name
    setTableData({...temp})
  },[location])




  return (
    <>
      <Export
        fileName={"UserLogs"}
        exportData={tableData?.exportData || tableData?.tableBody}
        headings={tableData?.tableHead.map((value) => value?.label)}
      />
      <ListTable
        tableData={tableData}
        key={"ListTable"}
        setTableData={setTableData}
      />
    </>
  );
}
