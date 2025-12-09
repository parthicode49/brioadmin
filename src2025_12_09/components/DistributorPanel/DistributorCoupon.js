import React, { useEffect, useMemo, useState } from "react";
import ListTable from "../utils/Table";
import Export from "../utils/Export";
import { useDispatch, useSelector } from "react-redux";
import { all_promocode_list_distributor } from "../../actions/distributorPanel/distributorContentForm";
import InfoIcone from "../../images/info.png";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
const DistributorCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.layout?.profile);
  const distributor_coupon = useSelector(
    (state) => state?.distributorPanel?.distributor_promocode
  );
  const [form, setForm] = useState({});
    useEffect(() => {
      if (user?.id) {
        dispatch(all_promocode_list_distributor({ distributor_id: user?.id }));
      }
    }, [user?.id]);
      const tempTableData = {
        tableTitle: "Promocode",
        disableDelete : true ,
        // deleteRecord: Action.coupon_delete,
        // updateRecord: coupon_update,
        deleteAccess: "true",
        onDeleteText: "Are you sure want to delete?",
        onUpdateText: "Are you Sure?",
        tableHead: [
          {
            id: "promocode",
            label: "Promo code",
            subText: "promocode_title",
            // link: "/Coupon/PromocodeHistory",
            color: "var(--gradientColor2)",
          },
          {
            id: "promocode_type",
            label: "Promo code Type",
            subText: "type_name",
          },
        //   {
        //     id: "ownership",
        //     label: "Ownership",
        //     subText: "distributor_name",
        //   },
    
          {
            id: "actual_amount1",
            label: "Actual Amount",
          },
          {
            id: "discount_amount1",
            label: "Discount",
            subText: "discount_type",
          },
          {
            id: "payable1",
            label: "Payable",
          },
          {
            id: "user_limit_coupon",
            label: "Limit",
            isSpecial: true,
            align: "left",
          },
          {
            id: "used_count_coupon",
            label: "Used",
            isSpecial: true,
            align: "left",
          },
          {
            id: "remaining_coupon",
            label: "Remaining",
            isSpecial: true,
            align: "left",
          },
          {
            id: "expired_on",
            label: "Validity",
            isSpecial: true,
            align: "left",
          },
          {
            id: "status",
            label: "Status",
            isButtonDisplay : true
            // isSpecial: true,
            // align: "left",
          },
        //   {
        //     id: "info",
        //     label: "Info",
        //     isSpecial: true,
        //     align: "left",
        //   },
        //   {
        //     id: "edit",
        //     label: "Update",
        //     isNewForm: true,
        //     access: "true",
        //     ErrorMsg: "You can not edit PromoCode",
        //   },
          // {
          // 	id: "promocode_image",
          // 	label: "",
          // 	isSpecial: true,
          // },
        ],
        tableBody: [],
        filterColumn: [
          {
            id: "1",
            title: "Status",
            name: "status",
            options: ["Active", "Inactive",  "Expired"],
          },
        ],
      };
      const [tableData, setTableData] = useState({ ...tempTableData });
        useMemo(() => {
    if (distributor_coupon?.data) {
      const temp = tableData;
      temp.tableBody = distributor_coupon?.data?.map((ele) => ({
        ...ele,
        // distributor : ele?.
        type_name:
          ele?.promocode_type === "Plan"
            ? ele?.plan_name
            : ele?.promocode_type === "Movie"
            ? ele?.movie_name
            : ele?.promocode_type === "Series"
            ? ele?.series_name
            : null,
        discount_amount1:
          ele?.discount_type === "Percentage"
            ? ele?.discount_amount + " %"
            : parseFloat(ele?.discount_amount).toFixed(2),
        used_count_coupon: (
          <span style={{ color: "red" }}>{ele?.used_count}</span>
        ),
        remaining_coupon: (
          <span style={{ color: "green" }}>
            {ele?.user_limit - ele?.used_count}
          </span>
        ),
        actual_amount1: parseFloat(ele?.actual_amount).toFixed(2),
        user_limit_coupon: (
          <span style={{ color: "#dc5f00" }}>{ele?.user_limit}</span>
        ),
        payable1: parseFloat(ele?.payable).toFixed(2),
        // statuscus : ele?.status == "Pending" ? <p style={{background : "rgba(0, 182, 155, 0.1);" , borderRadius:"4px" , color:"var(--successColor)" , padding:""}}>
        // statuscus: (
        //   <p
        //     onClick={() => handleStatusChange(ele?.id, ele?.status)}
        //     className={ele?.status + "Badge"}
        //     style={{ cursor: "pointer" }}
        //   >
        //     {ele?.status}
        //   </p>
        // ),
        info: (
          <img
            src={InfoIcone}
            width="20px"
            height="20px"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("detail", { state: { id: ele?.id } })}
          />
        ),
        // remaining_coupon:,
        edit: ele?.status !== "Pending",
        expired_on:
          new Date(ele?.expiry_date) > new Date() ? (
            <p style={{ color: "var(--themeFontColor)" }}>
              {dayjs(ele?.expiry_date).format("DD-MM-YYYY")}
            </p>
          ) : (
            <p style={{ color: "red" }}>Expired</p>
          ),
      }));

      setTableData({ ...temp });
      // setForm({ ...form, set_sequence: tableData.tableBody.length + 1 });
    }
  }, [distributor_coupon]);
  return (
     <ListTable
            tableData={tableData}
            key={"ListTable"}
            setForm={setForm}
            setTableData={setTableData}
            // setIsEdit={setIsEdit}
            create_new={"/Coupon/EditCoupon"}
          
        />
  )
};

export default DistributorCoupon;
