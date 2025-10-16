import React from "react";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styles from "./../../styles/PageTitle.module.css";
import ListTable from "../utils/Table";
export default function WatchedList() {
  const location = useLocation();
  const [tableData, setTableData] = useState({
    tableTitle: "Watch List",
    disableDelete: true,
    tableHead: [
      {
        id: "name",
        label: "Content Name",
        isSpecial: true,
        align: "left",
      },
            {
        id: "image",
        label: "Image",
        isImage : true
      },
      {
        id: "content_type",
        label: "Content Type",
      },
      {
        id: "category",
        label: "Category",
      },


    
      // {
      //   id: "duration",
      //   label: "Duration",
   
      // },
      // {
      //   id: "profile_name",
      //   label: "Watched By",
      // },
      // {
      //   id: "deviceId",
      //   label: "Device Name",
      //   subText: "deviceType",
      // },
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
    if (location?.state?.data) {
      const temp = tableData;
      temp.tableBody = location?.state?.data?.map((ele) => ({
        ...ele,
        name:
          ele?.content_type == "Movie" ? (
            <Link
              to={"/movie/detail"}
              style={{ color: "var(--gradientColor2)" }}
              state={{
                id: ele?.id,
              }}
            >
             <p> {ele?.title}</p>
              ({ele?.duration})
            </Link>
          ) :  ele?.content_type == "Song" ? (
            <Link
              to={"/song/detail"}
              style={{ color: "var(--gradientColor2)" }}
              state={{
                id: ele?.id,
              }}
            >
              <p> {ele?.title}</p>
              ({ele?.duration})

            </Link>
          ) : (
            <Link
              to={"/series/detail"}
              style={{ color: "var(--gradientColor2)" }}
              state={{
                id: ele?.id,
              }}
            >
             <p> {ele?.title}</p>
              (Episode : {ele?.episode_count})

            </Link>
          ) ,
      }));
      setTableData({ ...temp });
    }
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
