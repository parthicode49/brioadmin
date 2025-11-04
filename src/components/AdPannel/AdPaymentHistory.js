import React, { useEffect, useState } from "react";
import ListTable from "../utils/Table";
import { useDispatch, useSelector } from "react-redux";
import * as Action from "../../actions/Advertiser/advertisement";
import { bindActionCreators } from "redux";

const AdPaymentHistory = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.layout.profile);
  const { advertisement_payment_list_advertiser } = bindActionCreators(
    Action,
    dispatch
  );

  const [adHistory, setAdHistory] = useState([]);
  useEffect(() => {
    const dataHistory = async () => {
      const resData = await advertisement_payment_list_advertiser({
        advertiser_id: user?.id,
      });
      if (resData?.status == 200) {
        setAdHistory(resData?.data?.data);
      }
    };
    if (user?.id) {
      dataHistory();
    }
  }, [user]);
  useEffect(() => {
    if (adHistory) {
      const temp = tableData;

      temp.tableBody = adHistory?.map((ele)=>({
        ...ele,
        paid_amount : "$ " +  ele?.paid_amount
      })) || [];
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
      },
      {
        id: "added_view",
        label: "Views",
      },

      {
        id: "paid_amount",
        label: "Paid Amount ($)",
      },
    ],
    tableBody: [],
    filterColumn: [
      // {
      //   id: "1",
      //   title: "Complaint Type",
      //   name: "complaint_type",
      //   options: [
      //     "Player is Not Working",
      //     "Payment Done But Movie Is Not Working",
      //     "Content is Not Appropriate",
      //     "Other issue",
      //   ],
      // },
      // {
      //   id: "2",
      //   title: "Status",
      //   name: "status",
      //   options: ["Open", "Close"],
      // },
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

export default AdPaymentHistory;
