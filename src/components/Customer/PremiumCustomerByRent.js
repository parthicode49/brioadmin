import React, { useMemo, useState } from "react";
import ListTable from "../utils/Table";

const PremiumCustomerByRent = ({ data_by_rent }) => {
  const [tableData, setTableData] = useState({
    tableTitle: "Premium Customer By Rent",
    disableDelete: true,
    tableHead: [
      {
        id: "mobileNumber",
        label: "Mobile Number",
        link: "/Customer/CustomerDetail/CustomerDetail",
        color: "var(--gradientColor2)",
        width: "auto",
      },
      {
        id: "tvod_count",
        label: "Totel Rental Count",
      },
      {
        id: "total_transaction_amount",
        // isSpecial: true,
        label: "Amount",
      },
      ,
    ],
    tableBody: data_by_rent || [],
  });

  const [form, setForm] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  useMemo(() => {
    if (data_by_rent != undefined) {
      const temp = tableData;
      temp.tableBody = data_by_rent?.data?.map((value, index) => ({
        ...value,
        mobileNumber: value?.user?.mobileNumber,
        // name: value.user.firstName + " " + value.user.lastName,
        id: value.user.id,
        total_transaction_amount:"$"+" "+ parseFloat(value?.total_transaction_amount).toFixed(2),
      }));

      setTableData({ ...temp });
      // setTableData({...tableData,tableBody:movies})
    }
  }, [data_by_rent]);
  return (
    <ListTable
      tableData={tableData}
      key={"ListTable"}
      setForm={setForm}
      setTableData={setTableData}
      setIsEdit={setIsEdit}
    />
  );
};

export default PremiumCustomerByRent;
