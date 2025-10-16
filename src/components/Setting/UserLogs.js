import React from "react";
import { useState, useEffect, useMemo } from "react";
import ListTable from "../utils/Table";
import { user_log_list } from "../../actions/Setting/user_logs";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Export from "../utils/Export";
export default function UserLogs() {
  const dispatch = useDispatch();
  const location = useLocation()
  const [tableData, setTableData] = useState({
    tableTitle: "User Logs",
    disableDelete: true,
    tableHead: [
      // {
      // 	id: "user_name",
      // 	label: "User Name",

      // },
      {
        id: "name",
        label: "Email",

        link: "/Settings/UserLogs/UserLogsDetails",
        state :"name",
        subText:"email",
        color: "var(--gradientColor2)",
      },
      {
        id: "mobileNumber",
        label: "Mobile Name",
      },

      {
        id: "user_role",
        label: "Role",
      },
      {
        id: "locations",
        label: "Location",
      },
    ],
    tableBody: [
      {
        id: 0,
        name: "name",
      },
    ],
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

  useEffect(() => {
    dispatch(user_log_list());
  }, [location]);

  const logs = useSelector((state) => state?.setting?.logs);

  useMemo(() => {
    if (logs?.statuscode == 200) {
      const temp = tableData;
      temp.tableBody = logs?.data.map((ele) => ({
        ...ele,
        name:
          ele?.lastName !== null
            ? ele?.firstName + " " + ele?.lastName
            : ele?.firstName,
        locations: ele.userLocation === null ? "-" : ele.userLocation,
      }));

      // temp.filterColumn[0]["options"]=[...new Set(logs?.data?.map((ele)=>ele?.firstName))]
      setTableData({ ...temp });
    }
  }, [logs]);

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
