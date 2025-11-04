import React, { useEffect, useState } from "react";
import ListTable from "../utils/Table";
import { useDispatch, useSelector } from "react-redux";
import * as Action from "../../actions/Advertiser/advertisement";
import { bindActionCreators } from "redux";
import { all_advertiser_list } from "../../actions/Advertiser/advertiser";

const AdHistory = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.layout.profile);
  const { advertisement_payment_list_admin } = bindActionCreators(
    Action,
    dispatch
  );

  useEffect(() => {
    dispatch(all_advertiser_list());
  }, []);

  const advertisers_list = useSelector(
    (state) => state?.advertisers?.advertisers
  );

  console.log(advertisers_list, "advertisers_list4444");

  const [adHistory, setAdHistory] = useState([]);
  useEffect(() => {
    const dataHistory = async () => {
      const resData = await advertisement_payment_list_admin({});
      if (resData?.status == 200) {
        setAdHistory(resData?.data?.data);
      }
      console.log(resData, "Reererer");
    };

    dataHistory();
  }, [user]);
  useEffect(() => {
    if (adHistory) {
      const temp = tableData;

      temp.tableBody =
        adHistory?.map((ele) => ({
          ...ele,
          paid_amount1: "$ " + ele?.paid_amount,
        })) || [];
      setTableData({ ...temp });
    }
  }, [adHistory]);

  const [tableData, setTableData] = useState({
    tableTitle: "Payment History",
    disableDelete: true,
    column_sum: {
      name: "paid_amount",
      title: "Total Amount ($)",
    },
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
        id: "product_name",
        label: "Product Name",
        // subText: "mobileNumber",
      },
      {
        id: "payment_id",
        label: "Payment ID",
        // subText: "mobileNumber",
      },
      {
        id: "advertiser_name",
        label: "Advertiser Name",
      },
      {
        id: "added_view",
        label: "Views",
      },

      {
        id: "paid_amount1",
        label: "Paid Amount ($)",
      },
    ],
    tableBody: [],
    filterColumn: [
      {
        id: "1",
        title: "Advertiser Name",
        name: "advertiser_name",
        options: [],
      },
    ],
    // isDateRangeFilter: "created_at",
  });

  useEffect(() => {
    if (advertisers_list?.data?.length > 0) {
      const tempFilter = tableData;
      tempFilter["filterColumn"][0]["options"] = advertisers_list?.data?.map(
        (ele) => ele?.name
      );

      setTableData({ ...tempFilter });
    }
  }, [advertisers_list?.data]);
  return (
    <ListTable
      tableData={tableData}
      key={"ListTable"}
      setTableData={setTableData}
    />
  );
};

export default AdHistory;
