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
  }, []);

  const [tableData, setTableData] = useState({
    tableTitle: "User Log Details",
    disableDelete: true,
    tableHead: [
      {
        id: "module_name",
        label: "Module",
        // subText:"mobileNumber"
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
      // {
      // 	id: "locations"  ,
      // 	label: "Location",
      // },
    ],
    tableBody: [],
    // filterColumn:[
    // 	{
    // 		id: "1",
    // 	title: "User",
    // 	name: "user_name",
    // 	options: ["User 1", "User 1","User 1"],
    // 	},

    // ],
    // isDateRangeFilter:"date"
  });
  useMemo(() => {
    if (logdetails?.statuscode == 200) {
      const temp = tableData;
      temp.tableBody = logdetails?.data.map((ele) => ({
        ...ele,
        activity: ele?.status,
      }));

      // temp.filterColumn[0]["options"]=[...new Set(logs?.data?.map((ele)=>ele?.firstName))]
      setTableData({ ...temp });
    }
  }, [logdetails]);


  


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
