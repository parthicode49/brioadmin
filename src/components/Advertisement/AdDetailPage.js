import React, { useEffect, useState } from "react";
import ListTable from "../utils/Table";
import { useDispatch, useSelector } from "react-redux";
import * as Action from "../../actions/Advertiser/advertisement";
import { bindActionCreators } from "redux";
import { all_advertiser_list } from "../../actions/Advertiser/advertiser";
import { useAccessControl } from "../utils/useAccessControl";
import { useLocation } from "react-router-dom";

const AdDetailPage = () => {
  const location = useLocation()
  console.log(location , "location44444")
  const { canEdit } = useAccessControl("Ad Master");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.layout.profile);
  const { advertisement_view_data } = bindActionCreators(Action, dispatch);
  const [adHistory, setAdHistory] = useState([]);
  useEffect(() => {
    const adData = async () => {
      const resData = await advertisement_view_data({ advertisment_id:location?.state?.id });
      if (resData?.status === 200) {
        setAdHistory(resData?.data?.data);
      }

    };
    if (location?.state?.id) {
      adData();
    }
  }, [location?.state?.id]);

  useEffect(() => {
    if (adHistory) {
      const temp = tableData;

      temp.tableBody =
        adHistory?.map((ele) => ({
          ...ele,
          user: <p style={{ color: "var(--themeFontColor)" }}>
            <p>{ele?.user_name}</p>
            <p>{ele?.email}</p>
            <p>{ele?.mobile_number}</p>
          </p>,
          content : ele?.movie ? "Movie" : "Episode",
          content_name : ele?.movie ? ele?.movie_title : ele?.episode_title 
        })) || [];
      setTableData({ ...temp });
    }
  }, [adHistory]);

  const [tableData, setTableData] = useState({
    tableTitle: "Ad History",
    disableDelete: true,
    // updateRecord: complaint_status_update,
    // openModal: handleOpen,
    // onUpdateText: "Has the complaint been resolved?",
    tableHead: [
      {
        id: "created_at",
        label: "Date",
        // isDate: true,
      },
      {
        id: "user",
        label: "User",
        isSpecial: true,
        align: "left",
      },
      {
        id: "content",
        label: "Content Type",
        // subText: "mobileNumber",
      },
      {
        id: "content_name",
        label: "Content Name",
      },
    ],
    tableBody: [],
    filterColumn: [
    ],
    // isDateRangeFilter: "created_at",
  });

  return (
    <ListTable
      tableData={tableData}
      key={"ListTable"}
      setTableData={setTableData}
      canEdit={canEdit}
    />
  );
};

export default AdDetailPage;
