import React from "react";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import styles from "./../../styles/PageTitle.module.css";
import ListTable from "../utils/Table";
import { useLocation } from "react-router-dom";
export default function SongWatched() {
  const location = useLocation();
  const [tableData, setTableData] = useState({
    tableTitle: "Song Watched",
    disableDelete: true,
    tableHead: [
      {
        id: "name",
        label: "Name",
      },
      // {
      //   id: "watch_hours",
      //   label: "Watchhours",
      // },
      // {
      //   id: "last_watch_on",
      //   label: "Last Watched on",
      // },
      {
        id: "created_at",
        label: "Watched On",
        isDate : true
      },
      {
        id: "watch_hours",
        label: "Watching Time",
      },
      {
        id: "device_used",
        label: "Device Name",
      },
      // {
      //   id: "location",
      //   label: "Location",
      // },
    ],
    tableBody: [],
  });
  const [form, setForm] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  useMemo(() => {
    const temp = tableData;
    temp.tableBody =
      location?.state?.data?.map((val) => ({
        ...val,
        name: (
          <Link
            to={"/song/detail"}
            style={{ color: "var(--gradientColor2)" }}
            state={{
              id: val?.song,
            }}
          >
            {val?.song_name}
          </Link>
        ),
      })) || [];
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
