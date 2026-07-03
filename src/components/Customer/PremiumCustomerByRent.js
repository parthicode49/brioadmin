import React, { useMemo, useState } from "react";
import ListTable from "../utils/Table";

const DUMMY_BY_RENT = {
  data: [
    { user: { id: 101, mobileNumber: "+15550100001", firstName: "Oliver", lastName: "Stone" }, tvod_count: 2, total_transaction_amount: "14.99" },
    { user: { id: 102, mobileNumber: "+15550100002", firstName: "Sophia", lastName: "Green" }, tvod_count: 1, total_transaction_amount: "3.99" },
    { user: { id: 103, mobileNumber: "+15550100003", firstName: "Mason", lastName: "Hall" }, tvod_count: 5, total_transaction_amount: "79.95" },
    { user: { id: 104, mobileNumber: "+15550100004", firstName: "Emma", lastName: "Lee" }, tvod_count: 3, total_transaction_amount: "24.97" },
    { user: { id: 105, mobileNumber: "+15550100005", firstName: "Lucas", lastName: "Walker" }, tvod_count: 4, total_transaction_amount: "39.96" },
    { user: { id: 106, mobileNumber: "+15550100006", firstName: "Ava", lastName: "Young" }, tvod_count: 2, total_transaction_amount: "9.98" },
    { user: { id: 107, mobileNumber: "+15550100007", firstName: "Ethan", lastName: "King" }, tvod_count: 1, total_transaction_amount: "2.99" },
    { user: { id: 108, mobileNumber: "+15550100008", firstName: "Isabella", lastName: "Wright" }, tvod_count: 6, total_transaction_amount: "119.94" },
    { user: { id: 109, mobileNumber: "+15550100009", firstName: "Logan", lastName: "Scott" }, tvod_count: 2, total_transaction_amount: "7.98" },
    { user: { id: 110, mobileNumber: "+15550100010", firstName: "Amelia", lastName: "Torres" }, tvod_count: 3, total_transaction_amount: "11.97" },
    { user: { id: 111, mobileNumber: "+15550100011", firstName: "Noah", lastName: "Nguyen" }, tvod_count: 2, total_transaction_amount: "5.98" },
    { user: { id: 112, mobileNumber: "+15550100012", firstName: "Mila", lastName: "Rivera" }, tvod_count: 4, total_transaction_amount: "19.96" },
    { user: { id: 113, mobileNumber: "+15550100013", firstName: "Aiden", lastName: "Cook" }, tvod_count: 1, total_transaction_amount: "1.99" },
    { user: { id: 114, mobileNumber: "+15550100014", firstName: "Harper", lastName: "Bell" }, tvod_count: 3, total_transaction_amount: "8.97" },
    { user: { id: 115, mobileNumber: "+15550100015", firstName: "James", lastName: "Murphy" }, tvod_count: 2, total_transaction_amount: "6.99" },
  ],
};

const mapToRows = (arr) =>
  (arr || []).map((value) => {
    const amountNumber = parseFloat(value?.total_transaction_amount) || 0;
    return {
      ...value,
      mobileNumber: value?.user?.mobileNumber,
      id: value.user.id,
      amountNumber,
      total_transaction_amount: "$" + " " + amountNumber.toFixed(2),
    };
  });

const PremiumCustomerByRent = ({ data_by_rent }) => {
  let initialBody = mapToRows(data_by_rent?.data ?? DUMMY_BY_RENT.data);
  if (initialBody.length > 0) {
    initialBody = initialBody.sort((a, b) => b.amountNumber - a.amountNumber);
    const avg = initialBody.reduce((s, r) => s + r.amountNumber, 0) / initialBody.length;
    initialBody = initialBody.map((r) => ({ ...r, isPremium: r.amountNumber > avg }));
  }
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
    ],
    tableBody: initialBody,
  });

  const [form, setForm] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  useMemo(() => {
    if (data_by_rent != undefined) {
      const temp = tableData;
      let rows = mapToRows(data_by_rent?.data);
      if (rows.length > 0) {
        rows = rows.sort((a, b) => b.amountNumber - a.amountNumber);
        const avg = rows.reduce((s, r) => s + r.amountNumber, 0) / rows.length;
        rows = rows.map((r) => ({ ...r, isPremium: r.amountNumber > avg }));
      }
      temp.tableBody = rows;

      setTableData({ ...temp });
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
