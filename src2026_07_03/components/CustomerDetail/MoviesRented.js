import React from "react";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styles from "./../../styles/PageTitle.module.css";
import ListTable from "../utils/Table";
export default function MoviesRented() {
  const location = useLocation();
  const [tableData, setTableData] = useState({
    tableTitle: "Rented Content",
    disableDelete: true,
    tableHead: [
      {
        id: "name",
        label: "Content Name",
        isSpecial: true,
        align: "left",
      },
      {
        id: "content_type",
        label: "Content Type",
      },

      {
        id: "payment_id",
        label: "Payment",
        subText: "payment_method",
      },
      {
        id: "created_at",
        label: "Last Watched on",
        isDate : true
      },
      // {
      //   id: "profile_name",
      //   label: "Watched By",
      // },
      {
        id: "deviceId",
        label: "Device Name",
        subText: "deviceType",
      },
      {
        id: "location",
        label: "Location",
      },
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
                id: ele?.movie,
              }}
            >
              {ele?.movie_name}
            </Link>
          ) : (
            <Link
              to={"/series/detail"}
              style={{ color: "var(--gradientColor2)" }}
              state={{
                id: ele?.series,
              }}
            >
              {ele?.series_name}
            </Link>
          ),
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
