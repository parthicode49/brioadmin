import React from "react";
import { useState, useMemo, useEffect } from "react";
import ListTable from "../../utils/Table";
import { movie_watch_user_list } from "../../../actions/Movie/movie";
import { episode_watch_user_list } from "../../../actions/WebSeries/episode";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function ValueAddedCustomer({ path, id }) {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.layout.role);

  const alertOpen = () => {
    setOpen(true);
  };
  const [tableData, setTableData] = useState({
    tableTitle: "Customers who have seen",
    disableDelete: true,
    tableHead: [
      role !== "Distributor" && {
        id: "name",
        label: "Customer Info",
        // link: "/Customer/CustomerDetail/CustomerDetail",
        isSpecial: true,
        align: "left",
        // color: "var(--gradientColor2)",
        width: "auto",
      },
      // role =="Distributor"&&   {
      //   id:"watch_by",
      //   label:"Name"
      // },
      {
        id: "created_at",
        label: "Date",
        isDate: true,
      },
      {
        id: "watch_hours",
        label: "Watch Hours",
      },
      {
        id: "device_used",
        label: "Device",
      },
      // {
      // 	id: "mobileNumber",
      // 	label: "Mobile No",
      // },

      // {
      //   id: "location",
      //   label: "Location",
      // },

      // {
      //   id: "current_watching_time",
      //   label: "Last Watched On",
      // },
    ],
    tableBody: [],
  });
  const [form, setForm] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);

  const customers = useSelector((state) => state.movies.movie_watch_user);
  const master = useSelector((state) => state.movies);
  useEffect(() => {
    // const data = new FormData();
    // data.append("id", id);
    dispatch(movie_watch_user_list({ id: id }));
  }, []);
  useMemo(() => {
    if (customers?.data) {
      const temp = tableData;
      temp.tableBody = customers?.data?.map((ele) => ({
        ...ele,
        name: (
          <Link
            to={"/customer/detail"}
            state={{ id: ele?.user }}
            style={{ color: "var(--gradientColor2)" }}
          >
            {" "}
            {ele?.mobile_number ? ele?.mobile_number : ele?.email}{" "}
          </Link>
        ),
      }));
      setTableData({ ...temp });
    }
  }, [customers]);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <ListTable
        tableData={tableData}
        key={"ListTable"}
        setForm={setForm}
        setTableData={setTableData}
        setIsEdit={setIsEdit}
      />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert severity="info" variant="filled" color="success">
          User Deleted
        </Alert>
      </Snackbar>
    </>
  );
}
