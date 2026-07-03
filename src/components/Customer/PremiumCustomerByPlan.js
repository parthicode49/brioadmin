import React, { useMemo, useState } from "react";
import ListTable from "../utils/Table";

const DUMMY_BY_PLAN = {
  data: [
    { user: { id: 1, mobileNumber: "+15550000001", firstName: "John", lastName: "Doe" }, plan_count: 2, total_transaction_amount: "120.5" },
    { user: { id: 2, mobileNumber: "+15550000002", firstName: "Jane", lastName: "Smith" }, plan_count: 1, total_transaction_amount: "9.99" },
    { user: { id: 3, mobileNumber: "+15550000003", firstName: "Alice", lastName: "Johnson" }, plan_count: 4, total_transaction_amount: "340" },
    { user: { id: 4, mobileNumber: "+15550000004", firstName: "Bob", lastName: "Brown" }, plan_count: 3, total_transaction_amount: "75.2" },
    { user: { id: 5, mobileNumber: "+15550000005", firstName: "Carol", lastName: "Davis" }, plan_count: 5, total_transaction_amount: "499.99" },
    { user: { id: 6, mobileNumber: "+15550000006", firstName: "Eve", lastName: "Miller" }, plan_count: 2, total_transaction_amount: "45" },
    { user: { id: 7, mobileNumber: "+15550000007", firstName: "Frank", lastName: "Wilson" }, plan_count: 1, total_transaction_amount: "10" },
    { user: { id: 8, mobileNumber: "+15550000008", firstName: "Grace", lastName: "Moore" }, plan_count: 6, total_transaction_amount: "920.4" },
    { user: { id: 9, mobileNumber: "+15550000009", firstName: "Hank", lastName: "Taylor" }, plan_count: 2, total_transaction_amount: "60" },
    { user: { id: 10, mobileNumber: "+15550000010", firstName: "Ivy", lastName: "Anderson" }, plan_count: 3, total_transaction_amount: "150" },
    { user: { id: 11, mobileNumber: "+15550000011", firstName: "Jack", lastName: "Thomas" }, plan_count: 2, total_transaction_amount: "30.5" },
    { user: { id: 12, mobileNumber: "+15550000012", firstName: "Kara", lastName: "Jackson" }, plan_count: 4, total_transaction_amount: "220" },
    { user: { id: 13, mobileNumber: "+15550000013", firstName: "Liam", lastName: "White" }, plan_count: 1, total_transaction_amount: "5" },
    { user: { id: 14, mobileNumber: "+15550000014", firstName: "Mia", lastName: "Harris" }, plan_count: 3, total_transaction_amount: "88.8" },
    { user: { id: 15, mobileNumber: "+15550000015", firstName: "Noah", lastName: "Martin" }, plan_count: 2, total_transaction_amount: "49.99" },
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

const PremiumCustomerByPlan = ({ data_by_plan }) => {
  let initialBody = mapToRows(data_by_plan?.data ?? DUMMY_BY_PLAN.data);
  // sort descending by amount and mark premium customers (amount > average)
  if (initialBody.length > 0) {
    initialBody = initialBody.sort((a, b) => b.amountNumber - a.amountNumber);
    const avg = initialBody.reduce((s, r) => s + r.amountNumber, 0) / initialBody.length;
    initialBody = initialBody.map((r) => ({ ...r, isPremium: r.amountNumber > avg }));
  }
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
    ],
    tableBody: initialBody,
  });

  const [form, setForm] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  useMemo(() => {
    if (data_by_plan != undefined) {
      const temp = tableData;
      let rows = mapToRows(data_by_plan?.data);
      if (rows.length > 0) {
        rows = rows.sort((a, b) => b.amountNumber - a.amountNumber);
        const avg = rows.reduce((s, r) => s + r.amountNumber, 0) / rows.length;
        rows = rows.map((r) => ({ ...r, isPremium: r.amountNumber > avg }));
      }
      temp.tableBody = rows;
      setTableData({ ...temp });
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
