import React from "react";
import { useState, useMemo, useEffect } from "react";
import ListTable from "../../../utils/Table";
import { Link } from "react-router-dom";

export default function ProducerTransaction({ movies }) {
  const [tableData, setTableData] = useState({
    tableTitle: "Transations",
    disableDelete: true,
    tableHead: [
      {
        id: "movie_name",
        label: "Name",
        link: "/Movie/MovieDetails",
        color: "var(--gradientColor2)",
        width: "auto",
        // subText:"company_name"
      },
      // {
      //   id: "movie_poster",
      //   label: "Image",
      //   isImage: true,
      // },
      // {
      //   id: "movie_subcategory",
      //   label: "Sub Category",
      // },
      // ,
      // {
      //   id: "uploaded_by",
      //   label: "Uploaded By",
      // },
      ,
      {
        id: "rental_price",
        label: "TVOD Price",
      },
      {
        id: "admin_share",
        label: "Admin Share (%)",
      },
      ,
      {
        id: "distributor_share",
        label: "Distributor Share (%)",
      },

      {
        id: "producer_share",
        label: "Producer Share (%)",
      },
    ],
    tableBody: movies || [],
  });

  const [form, setForm] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  useMemo(() => {
    if (movies != undefined) {
      const temp = tableData;
      temp.tableBody = movies?.Data?.map((value, index) => ({
        ...value,
        movie_name: (
          <Link
            state={{ id: value.id, isPayment: true }}
            style={{ color: "var(--gradientColor2)" }}
            to="/Movie/MovieDetails"
          >
            {value?.movie_name}
          </Link>
        ),
      
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
      />
    </>
  );
}
