import React from "react";
import { useState, useMemo, useEffect } from "react";
import ListTable from "../utils/Table";
import { coupon_details } from "../../actions/coupon";

import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function CouponHistory() {
  const dispatch = useDispatch();
  const location = useLocation();

  const [tableData, setTableData] = useState({
    tableTitle: "Coupon History",
	    disableDelete: true,
    tableHead: [
      {
        id: "user_code",
        label: "Promocode",
      },
    //   {
    //     id: "select_type",
    //     label: "Coupon Type",
    //   },
      {
        id: "user",
        label: " Mobile No or Email Id",
      },

      {
        id: "created_at",
        label: "Used On",
      },
    ],
    tableBody: [],
    filterColumn: [

    ],
  });
  const [form, setForm] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const coupons = useSelector((state) => state.merchandise.couponhistory);
  console.log(location , "new CIOCICIC")
  useMemo(() => {
    if (location.state?.id) {

      dispatch(coupon_details({promocode :location.state?.id}));
    }
  }, [location.state?.id]);

  useMemo(() => {
    if (coupons?.data) {
      const temp = tableData;
      temp.tableBody = coupons?.data?.map((ele) => ({
        ...ele,
        plan: ele?.plan?.plan_name,
        movie: ele?.movie?.movie_name,
        user: ele?.mobile_number ? ele?.mobile_number : ele?.email,
      }));
      setTableData({ ...temp });
    } else {
      const temp = tableData;
      temp.tableBody = [];
      setTableData({ ...temp });
    }
  }, [coupons]);

  return (
    <>
      <ListTable
        tableData={tableData}
        key={"ListTable"}
        setForm={setForm}
        setTableData={setTableData}
        setIsEdit={setIsEdit}
      />
    </>
  );
}
