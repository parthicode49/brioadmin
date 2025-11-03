import React, { useEffect, useState } from "react";
import ListTable from "../utils/Table";
import { useDispatch, useSelector } from "react-redux";
import * as Action from "../../actions/Advertiser/advertisement";
import { bindActionCreators } from "redux";

const AdHistory = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.layout.profile);
  const { advertisement_payment_list_admin } = bindActionCreators(
    Action,
    dispatch
  );

  const [adHistory, setAdHistory] = useState([]);
  useEffect(() => {
    const dataHistory = async () => {
      const resData = await advertisement_payment_list_admin({});
      if(resData?.status == 200){
        setAdHistory(resData?.data?.data)
      }
      console.log(resData, "Reererer");
    };

    dataHistory();
  }, [user]);
  useEffect(() => {
    if (adHistory) {
      const temp = tableData;

      temp.tableBody = adHistory || []
      setTableData({ ...temp });
    }
  }, [adHistory]);

  const [tableData, setTableData] = useState({
    tableTitle: "Payment History",
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
        id: "paid_amount",
        label: "Payable Amount",
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
    />
  );
};

export default AdHistory;
