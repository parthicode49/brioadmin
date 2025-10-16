import React from "react";
import { useState, useEffect, useMemo } from "react";
import { content_leaving_soon } from "../../actions/contentLeaving";
import ListTable from "../utils/Table";
import EnlargedView from "../utils/EnlargedView";
import image from "./../../images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import Export from "./../utils/Export";
import dayjs from "dayjs";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { IconButton } from "@mui/material";
import * as Action from "../../actions/contentLeaving"
import { Edit } from "@mui/icons-material";
import DynamicFormModal from "../utils/NewFormStructure/DynamicFormModal";
import { bindActionCreators } from "redux";

export default function ContentLeaving() {
  const dispatch = useDispatch();
  const rights = useSelector((state) => state?.layout?.rights);
  const [open, setOpen] = useState(false);
  const [isModalOpen , setIsModalOpen] = useState(false)
  const [formNoti , setFormNoti ] = useState({})
  const [editingIndex, setEditingIndex] = useState(null);
  const [content, setContent] = useState();
  const [save , setSave] = useState(false)
  const [isEdit , setIsEdit] = useState(false)
  const {content_expire_date_update} = bindActionCreators(Action , dispatch)
  dayjs.extend(isSameOrAfter);
  //   const handleOpen = () => setOpen(true);
  //     const handleWhatsAppClick = (mobile) => {
  //     const message = encodeURIComponent("Hi"); // Encode message for URL
  //     const url = `https://web.whatsapp.com/send?phone=${mobile}&text=${message}`;
  //     window.open(url); // Open WhatsApp in a new tab
  //   };
  const [tableData, setTableData] = useState({
    tableTitle: "Content Leaving Soon",
    disableDelete: true,
    // updateRecord: complaint_status_update,
    // openModal: handleOpen,
    // onUpdateText: "Has the complaint been resolved?",
    tableHead: [
      {
        id: "title",
        label: "Name",
        // link: "/movie/moviedetail",
        color: "var(--gradientColor2)",
        // subText: "movie_subcategory"
      },
      {
        id: "thumbnail",
        label: "Image",
        isImage: true,
      },
      {
        id: "content_type",
        label: "Content Type",
      },
      {
        id: "ownership",
        label: "Ownership",
        subText: "distributor",
      },
      ,
      {
        id: "category_name",
        label: "Category",
        subText: "sub_category_list",
      },
      {
        id: "isDateChange",
        label: "Date",
        isSpecial: true,
        align: "left",
        // isDate: true,
      },
      {
        id: "status",
        label: "Status",
        isButtonDisplay: true,
      },
    ],
    tableBody: [],
    filterColumn: [
      {
        id: "2",
        title: "Content Type",
        name: "content_type",
        options: ["Movie", "Series", "Song"],
      },
      {
        id: "2",
        title: "Status",
        name: "status",
        options: ["Expiring Soon", "Expired"],
      },
    ],
    isDateRangeFilter: "created_at",
  });

  const content_leaving = useSelector(
    (state) => state.contentLeaving?.content_leaving_soon
  );
  console.log(content_leaving, "dsfdsfdsfdsffsd");
  useEffect(() => {
    dispatch(content_leaving_soon());
  }, [save]);

    const [formStructureNoti, setFormStructureNoti] = useState(
      [
       {
          type: "date",
          variant: "date",
          title: "Expire Date",
         min: new Date().toISOString().split("T")[0], // today's date in "YYYY-MM-DD"
          name: "expiry_date",
          default: new Date().toISOString().split("T")[0],
          required: true,
          placeholder: "Select Expire Date",
          // size: "3",
        },
      ].filter((e) => e)
    );

  //  useMemo(() => {
  //   if (content_leaving) {
  //     const today = dayjs().startOf('day');

  //     const status = (expire_date) => {
  //   const today = dayjs().startOf('day');
  //   const expDate = dayjs(expire_date).startOf('day');

  //   if (expDate.isBefore(today)) {
  //     return 'Expired';
  //   } else if (expDate.diff(today, 'day') <= 3) {
  //     return 'Expiring Soon';
  //   } else {
  //     return status_def;
  //   }
  // };

  //     // Tag each item with content_type
  //     const movies = (content_leaving.movie || []).map(item => ({
  //       ...item,
  //       content_type: 'Movie'
  //     }));

  //     const series = (content_leaving.series || []).map(item => ({
  //       ...item,
  //       content_type: 'Series'
  //     }));

  //     const songs = (content_leaving.song || []).map(item => ({
  //       ...item,
  //       content_type: 'Song'
  //     }));

  //     // Combine all
  //     const allData = [...movies, ...series, ...songs];

  //     const future = [];
  //     const expired = [];

  //     allData?.forEach(item => {
  //       const expDate = dayjs(item.expiry_date);
  //       if (expDate.isValid()) {
  //         if (expDate.isSameOrAfter(today)) {
  //           future.push({ ...item, _parsedDate: expDate });
  //         } else {
  //           expired.push({ ...item, _parsedDate: expDate });
  //         }
  //       }
  //     });

  //     // Sort
  //     future.sort((a, b) => a._parsedDate - b._parsedDate);
  //     expired.sort((a, b) => a._parsedDate - b._parsedDate);

  //     // Remove helper field
  //     const sortedData = [...future, ...expired].map(({ _parsedDate, ...rest }) => rest);

  //     // Set final data
  //     setTableData(prev => ({
  //       ...prev,
  //       tableBody: sortedData,

  //     }));
  //   }
  // }, [content_leaving]);
  const iconButtonStyles = {
    color: "rgba(26, 160, 83,1)",
    backgroundColor: "var(--themeColor)",
    "&:hover": {
      backgroundColor: "var(--themeColorLighterShade)",
    },
  };
    const handleForm = (data) => {
      // console.log(data ,"newData12345")
    setEditingIndex(null);
    setIsModalOpen(true);
    setIsEdit(false);
    setFormNoti({
      id: data?.id,
      content_type: data?.content_type,
      expiry_date: data?.expiry_date,
    });
  };
  useMemo(() => {
    if (content_leaving) {
      const today = dayjs().startOf("day");

      const getStatus = (expire_date, status_def) => {
        const expDate = dayjs(expire_date).startOf("day");

        if (expDate.isBefore(today)) {
          return "Expired";
        } else if (expDate.diff(today, "day") <= 3) {
          return "Expiring Soon";
        } else {
          return status_def || expDate.format("DD-MM-YYYY"); // fallback
        }
      };

      const movies = (content_leaving.movie || []).map((item) => ({
        ...item,
        content_type: "Movie",
      }));

      const series = (content_leaving.series || []).map((item) => ({
        ...item,
        content_type: "Series",
      }));

      const songs = (content_leaving.song || []).map((item) => ({
        ...item,
        content_type: "Song",
      }));

      const allData = [...movies, ...series, ...songs];

      const future = [];
      const expired = [];

      allData.forEach((item) => {
        const expDate = dayjs(item.expiry_date);
        if (expDate.isValid()) {
          const enrichedItem = {
            ...item,
            _parsedDate: expDate,
          };

          if (expDate.isSameOrAfter(today)) {
            future.push(enrichedItem);
          } else {
            expired.push(enrichedItem);
          }
        }
      });

      future.sort((a, b) => a._parsedDate - b._parsedDate);
      expired.sort((a, b) => a._parsedDate - b._parsedDate);

      const sortedData = [...future, ...expired].map(
        ({ _parsedDate, ...rest }) => ({
          ...rest,
          status: getStatus(rest.expiry_date, rest.status),
          isDateChange: (
            <div style={{display:"flex" , alignItems : "center" ,gap:"10px"}}>
            <p style={{color:"var(--themeFontColor)"}}>{ dayjs(rest?.expiry_date).format("DD-MM-YYYY")}</p> 
            <IconButton
              onClick={() => handleForm(rest)}
              sx={iconButtonStyles}
            >
              <Edit />
            </IconButton>
            </div>
          ),
        })
      );

      setTableData((prev) => ({
        ...prev,
        tableBody: sortedData,
      }));
    }
  }, [content_leaving]);
    const handleSubmit1 = async () => {
    // console.log("dddddddddddddddddddd", formNoti);
    // const data = new FormData();
    // Object.keys(formNoti)?.map((key) => data.append(key, formNoti?.[key]));
    const resData = await content_expire_date_update(formNoti);
    console.log(resData, "neweweweweweew");
    if (resData?.status === 200) {
      setIsModalOpen(false);
      setSave(!save);
      setFormNoti({});
    } else {
      setFormNoti(formNoti);
      // setIsModalOpen(true)
    }
  };

  return (
    <>
      <EnlargedView open={open} setOpen={setOpen} content={content} />

      <DynamicFormModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setFormNoti({});
          setIsEdit(false);
        }}
        formStructure={formStructureNoti}
        onSubmit={handleSubmit1}
        formData={formNoti}
        setFormData={setFormNoti}
        title={"Change Date"}
        initialData={editingIndex !== null ? tableData[editingIndex] : {}}
        save={save}
        setSave={setSave}
      />
      <ListTable
        tableData={tableData}
        key={"ListTable"}
        setTableData={setTableData}
        setContent={setContent}
      />
    </>
  );
}
