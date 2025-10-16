import React from "react";
import { useState, useEffect, useMemo } from "react";
import {
  all_complaint_list,
  complaint_status_update,
} from "../../actions/complaint";
import ListTable from "../utils/Table";
import EnlargedView from "../utils/EnlargedView";
import image from "./../../images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import Export from "./../utils/Export";
import dayjs from "dayjs";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { complaint_type_list_admin } from "../../actions/Masters/complaintType";
export default function Complaint() {
  const dispatch = useDispatch();
  const rights = useSelector((state) => state?.layout?.rights);
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const handleOpen = () => setOpen(true);
  const handleWhatsAppClick = (mobile) => {
    const message = encodeURIComponent("Hi"); // Encode message for URL
    const url = `https://web.whatsapp.com/send?phone=${mobile}&text=${message}`;
    window.open(url); // Open WhatsApp in a new tab
  };
  const [tableData, setTableData] = useState({
    tableTitle: "Complaints",
    disableDelete: true,
    updateRecord: complaint_status_update,
    openModal: handleOpen,
    onUpdateText: "Has the complaint been resolved?",
    tableHead: [
      {
        id: "created_at",
        label: "Date",
        // isDate: true,
      },
      {
        id: "mobile_number",
        label: "Mobile No",
        // subText: "mobileNumber",
      },
      {
        id: "user",
        label: "Email id",
      },
      {
        id: "select_type",
        label: "Complaint Type",
      },

      {
        id: "deviceType",
        label: "Device Used",
      },
      {
        id: "description",
        label: "Description",
        isModal: true,
        // default:"VIEW"
        default: (
          <>
            <button
              style={{
                padding: "5px 15px",
                color: "rgb(238, 127, 37)",
                background: "transparent",
                border: "1px solid rgb(238, 127, 37)",
                borderRadius: "5px",
              }}
            >
              VIEW
            </button>
          </>
        ),
      },
      {
        id: "complaint_screenshot",
        label: "Image",
        isImage: true,
        isModal: true,
      },
      // {
      //   id: "created_at",
      //   label: "Raised On",
      //   isSpecial: true,
      //    align: "left",
      // },
      {
        id: "whatsapp",
        label: "WhatsApp",
        isSpecial: true,
        align: "left",
      },
      {
        id: "status",
        label: "Status",
        keywords: ["Open", "Close"],
        nonEditableState: "Close",
      },
    ],
    tableBody: [],
    filterColumn: [
      {
        id: "1",
        title: "Complaint Type",
        name: "complaint_type",
        options: [
          "Player is Not Working",
          "Payment Done But Movie Is Not Working",
          "Content is Not Appropriate",
          "Other issue",
        ],
      },
      {
        id: "2",
        title: "Status",
        name: "status",
        options: ["Open", "Close"],
      },
    ],
    isDateRangeFilter: "created_at",
  });

  const complaints = useSelector((state) => state.complaints.complaints);
  const complaint_type = useSelector((state) => state?.masters?.complaint_type);
  console.log(complaints, "dsfdsfdsfdsffsd");
  useEffect(() => {
    dispatch(complaint_type_list_admin());
  }, []);
  useMemo(() => {
    if (complaints?.data) {
      const temp = tableData;
      temp.tableBody = complaints?.data?.map((ele) => ({
        ...ele,
        user: ele?.email,
        device: ele?.device_type,
        created_at: (
          <>
            <p style={{ color: "var(--themeFontColor)" }}>
              {dayjs(ele?.created_at).format("DD-MM-YYYY")}
            </p>
            <span style={{ color: "red" }}>
              {" "}
              {ele?.closed_on && dayjs(ele?.closed_on).format("DD-MM-YYYY")}
            </span>
          </>
        ),
        whatsapp: (
          <WhatsAppIcon
            style={{ color: "green", height: "50px" }}
            onClick={() => handleWhatsAppClick(ele?.mobile_number)}
          />
        ),
        description: (
          <>
            <div
              dangerouslySetInnerHTML={{ __html: ele?.description }}
              style={{ color: "var(--themeFontColor)" }}
            />
            <p style={{ color: "var(--themeFontColor)" }}>
              {temp?.tableHead?.default}
            </p>{" "}
          </>
        ),
      }));
      setTableData({ ...temp });
    }
  }, [complaints]);
  useMemo(() => {
    if (complaint_type?.data) {
      const tempFilter = tableData;
      tempFilter["filterColumn"][0]["options"] = complaint_type?.data?.map(
        (ele) => ele?.complaint_type
      );

      setTableData({ ...tempFilter });
      // setFormStructure([...temp])
    }
  }, [complaint_type]);
  return (
    <>
      <EnlargedView open={open} setOpen={setOpen} content={content} />


      <ListTable
        tableData={tableData}
        key={"ListTable"}
        setTableData={setTableData}
        setContent={setContent}
        isLoadingData={true}
        loadApi={all_complaint_list}
        totalCount={complaints?.complaint_count}
      />
    </>
  );
}
