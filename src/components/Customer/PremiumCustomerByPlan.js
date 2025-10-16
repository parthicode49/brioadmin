import React, { useMemo, useState } from "react";
import ListTable from "../utils/Table";

const PremiumCustomerByPlan = ({ data_by_plan }) => {
  const [tableData, setTableData] = useState({
    tableTitle: "Premium Customer By Plan",
    disableDelete: true,
    tableHead: [
      {
        id: "mobileNumber",
        label: "user",
        link: "/Customer/CustomerDetail/CustomerDetail",
        color: "var(--gradientColor2)",
        width: "auto",
      },
      {
        id: "plan_count",
        label: "Totel Plan Count",
      },
      {
        id: "total_transaction_amount",
        label: "Amount",
      },
      ,
    ],
    tableBody: data_by_plan || [],
  });

  const [form, setForm] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  useMemo(() => {
    if (data_by_plan != undefined) {
      const temp = tableData;
      temp.tableBody = data_by_plan?.data?.map((value, index) => ({
        ...value,
        mobileNumber: value?.user?.mobileNumber,
        // name:  (value?.user?.firstName == null) && (value?.user?.lastName == null) ? "Mobile" : value?.user?.firstName + " " + value?.user?.lastName,
        id: value.user.id,
        total_transaction_amount:"₹"+" "+ parseFloat(value?.total_transaction_amount).toFixed(2),

      }));

      setTableData({ ...temp });
      // setTableData({...tableData,tableBody:movies})
    }
  }, [data_by_plan]);
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

export default PremiumCustomerByPlan;
