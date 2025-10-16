import React from "react";
import { useState, useMemo, useEffect } from "react";
import ListTable from "../../../utils/Table";
import Export from "../../../utils/Export";

export default function AdvertisementReports({ movies }) {
  const [tableData, setTableData] = useState({
    tableTitle: "Advertisements",
    disableDelete: true,
    tableHead: [
      {
        id: "movie_name",
        label: "Ad name",
        width: "auto",
      },
      {
        id: "movie_thumbnail",
        label: "Payable Amount",
        isImage: true,
      },
      {
        id: "movie_subcategory",
        label: "Ad views",
      },
      ,
      {
        id: "uploaded_by",
        label: "Movie Name",
      },
      ,
      {
        id: "movie_access",
        label: "Location",
      },
      ,
      {
        id: "movie_language",
        label: "Status",
      },
    ],
    tableBody: movies || [],
    filterColumn: [
      {
        id: "1",
        title: "Ad name",
        name: "movie_access",
        options: ["FREE", "TVOD", "SVOD"],
      },
    ],
  });

  const [form, setForm] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  useMemo(() => {
    if (movies != undefined) {
      const temp = tableData;
      temp.tableBody = movies?.data.map((value, index) => ({
        ...value,
        movie_genre: value.movie_genre.map((genre) => genre.genre_title),
        movie_cast: value.movie_cast.map((cast) => cast.cast_name),
        uploaded_by:
          value?.created_by?.firstName + " " + value?.created_by?.lastName,
        movie_distributor: value?.movie_distributor?.distributor_name,
        company_name: value?.movie_distributor?.company_name,
      }));

      setTableData({ ...temp });
      // setTableData({...tableData,tableBody:movies})
    }
  }, [movies]);

  return (
    <>
      <ListTable
        tableData={tableData}
        key={"ListTable"}
        setForm={setForm}
        setTableData={setTableData}
        setIsEdit={setIsEdit}
        exportButton={
          <Export
            fileName={"Report"}
            exportData={tableData?.exportData || tableData?.tableBody}
            headings={tableData.tableHead.map((value) => value.label)}
          />
        }
      />
    </>
  );
}
