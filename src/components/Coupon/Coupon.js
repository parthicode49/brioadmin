import React from "react";
import { useState, useMemo, useEffect } from "react";
import ListTable from "../utils/Table";
// import {
//   coupon_create,
//   coupon_delete,
//   coupon_update,
//   all_coupon_list,
//   movie_list_for_promocode,
//   series_list_for_promocode,
// } from "../../actions/coupon";
import { all_subscription_list } from "../../actions/subscription";
import { useDispatch, useSelector } from "react-redux";
import Export from "../utils/Export";
import { useLocation, useNavigate } from "react-router-dom";
import EnlargedView from "../utils/EnlargedView";
import dayjs from "dayjs";
import * as Action from "../../actions/coupon";
import { all_distributor_list } from "../../actions/distributor";
import InfoIcone from "../../images/info.png";
import { bindActionCreators } from "redux";
import Popup from "../utils/Popup";
export default function Coupon() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.layout.profile);
  const [form, setForm] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const { coupon_create, coupon_update, coupon_status_update } =
    bindActionCreators(Action, dispatch);
  const [openPopup, setOpenPopup] = useState(false);
  const [save, setSave] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [contentPopup, setContentPopup] = useState("");
  const [result, setResult] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const handleOpen = () => setOpen(true);
  const tempTableData = {
    tableTitle: "Promocode",
    deleteRecord: Action.coupon_delete,
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
      {
        id: "ownership",
        label: "Ownership",
        subText: "distributor_name",
      },

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
        id: "statuscus",
        label: "Status",
        isSpecial: true,
        align: "left",
      },
      {
        id: "info",
        label: "Info",
        isSpecial: true,
        align: "left",
      },
      {
        id: "edit",
        label: "Update",
        isNewForm: true,
        access: "true",
        ErrorMsg: "You can not edit PromoCode",
      },
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
        options: ["Active", "Inactive", "Pending", "Expired"],
      },
    ],
  };
  const [tableData, setTableData] = useState({ ...tempTableData });
  const [formStructure, setFormStructure] = useState([
    {
      title: "Ownership",
      fields: [
        {
          type: "select",
          name: "ownership",
          title: "Promocode Ownership",
          placeholder: "Select Promocode Ownership",
          options: [
            { value: "In House", label: "In House" },
            { value: "Content Owner", label: "Content Owner" },
          ],
          required: true,
        },
        {
          type: "select",
          name: "distributor",
          title: "Content Owner",
          placeholder: "Select Content Owner",
          display: "none",
          options: [],
          required: true,
        },
      ],
    },
    {
      title: "Details",
      fields: [
        {
          type: "inputBox",
          name: "promocode_title",
          title: "Promocode Title",
          placeholder: "Type Promocode Title",
          required: true,
          showLimit: true,
          maxLength: 30,
        },
        {
          type: "inputBox",
          name: "promocode",
          title: "Promocode",
          placeholder: "Type Code",
          regex: /^[a-zA-Z0-9\&]+$/,
          required: true,
          isCaps: true,
          showLimit: true,
          maxLength: 15,
        },
        {
          type: "select",
          name: "promocode_type",
          title: "Promocode Type",
          placeholder: "Select Promocode Type",
          options: [
            { value: "Plan", label: "Plan" },
            { value: "Movie", label: "Movie" },
            { value: "Series", label: "Series" },
          ],
          required: true,
        },
        {
          type: "select",
          name: "plan",
          title: "Plan",
          placeholder: "Select Plan",
          options: [
            { value: "Plan", label: "Plan" },
            { value: "Movie", label: "Movie" },
            { value: "Series", label: "Series" },
          ],
          display: "none",
          required: true,
        },
        // {
        //   type: "select",
        //   name: "movie",
        //   title: "Movie",
        //   placeholder: "Select Movie",
        //   display: "none",
        //   options: [
        //     { value: "Plan", label: "Plan" },
        //     { value: "Movie", label: "Movie" },
        //     { value: "Series", label: "Series" },
        //   ],
        //   required: true,
        // },
        // {
        //   type: "select",
        //   name: "series",
        //   title: "Series",
        //   placeholder: "Select Series",
        //   display: "none",
        //   options: [
        //     { value: "Plan", label: "Plan" },
        //     { value: "Movie", label: "Movie" },
        //     { value: "Series", label: "Series" },
        //   ],
        //   required: true,
        // },
        {
          type: "inputBox",
          name: "user_limit",
          title: "User Limit",
          placeholder: "Type User Limit",
          required: true,
          regex: /^[0-9\.]+$/,
          maxLength: "3",
        },
        {
          type: "date",
          variant: "date",
          title: "Expire Date",
          min: new Date().toISOString().split("T")[0],
          name: "expiry_date",
          default: new Date().toISOString().split("T")[0],
          required: true,
          placeholder: "Select Expire Date",
          // size: "3",
        },
      ],
    },
    {
      title: "Price",
      fields: [
        {
          type: "inputBox",
          name: "actual_amount",
          title: "Actual Amount",
          placeholder: "Enter Actual Amount",
          disabled: true,
          required: true,
          regex: /^[0-9\.]+$/,
          maxLength: "3",
        },
        {
          type: "select",
          name: "discount_type",
          title: "Discount Type",
          placeholder: "Select Discount Type",
          options: [
            { value: "Fixed", label: "Fixed" },
            { value: "Percentage", label: "Percentage" },
          ],
          required: true,
        },
        {
          type: "inputBox",
          name: "discount_amount",
          title: "Discount Amount",
          placeholder: "Enter Discount Amount",
          required: true,
          regex: /^[0-9\.]+$/,
          maxLength: "3",
        },
        {
          type: "inputBox",
          name: "payable",
          title: "Payable Price",
          placeholder: "Enter Payable Price",
          required: true,
          disabled: true,
          regex: /^[0-9\.]+$/,
          maxLength: "3",
        },
      ],
    },
  ]);

  const coupons = useSelector((state) => state.merchandise.coupons);
  const movie_list = useSelector((state) => state.merchandise.coupon_movie);
  const series_list = useSelector((state) => state.merchandise.coupon_series);
  const distributors = useSelector((state) => state.distributors.distributors);
  const subscriptions = useSelector(
    (state) => state.subscriptions.subscriptions
  );
  useEffect(() => {
    dispatch(Action.all_coupon_list());
  }, [save]);
  useEffect(() => {
    dispatch(Action.movie_list_for_promocode());
    dispatch(Action.series_list_for_promocode());
    dispatch(all_subscription_list());
    dispatch(all_distributor_list());
  }, [user?.id]);

  const formTitle = isEdit ? "Edit PROMOCODE" : "Create PROMOCODE";

  useEffect(() => {
    if (form?.ownership === "Content Owner") {
      setFormStructure((prevFormStructure) =>
        prevFormStructure.map((section) => {
          if (section.title === "Ownership") {
            const updatedFields = section.fields.map((field, index) => {
              if (index === 1) {
                return { ...field, display: "block" };
              }
              return field;
            });
            return { ...section, fields: updatedFields };
          }
          return section;
        })
      );
    } else {
      setFormStructure((prevFormStructure) =>
        prevFormStructure.map((section) => {
          if (section.title === "Ownership") {
            const updatedFields = section.fields.map((field, index) => {
              if (index === 1) {
                return { ...field, display: "none" };
              }
              return field;
            });
            return { ...section, fields: updatedFields };
          }
          return section;
        })
      );
    }
  }, [form?.ownership]);
  useEffect(() => {
    if (form?.promocode_type === "Plan") {
      setFormStructure((prevFormStructure) =>
        prevFormStructure.map((section) => {
          if (section.title === "Details") {
            const updatedFields = section.fields.map((field, index) => {
              if (index === 3) {
                return {
                  ...field,
                  display: "block",
                  title: "Plan",
                  placeholder: "Select Plan",
                  name: "plan",
                  options: subscriptions?.data?.map((ele) => ({
                    label: ele?.plan_name,
                    value: ele?.id,
                  })),
                };
              }
              return field;
            });
            return { ...section, fields: updatedFields };
          }
          return section;
        })
      );
    } else if (form?.promocode_type === "Movie") {
      setFormStructure((prevFormStructure) =>
        prevFormStructure.map((section) => {
          if (section.title === "Details") {
            const updatedFields = section.fields.map((field, index) => {
              if (index === 3) {
                return {
                  ...field,
                  display: "block",
                  title: "Movie",
                  placeholder: "Select Movie",
                  name: "movie",
                  options:
                    form?.ownership == "Content Owner"
                      ? movie_list?.data
                          ?.map(
                            (ele) =>
                              form?.ownership == ele?.ownership &&
                              form?.distributor == ele?.distributor && {
                                label: ele?.title,
                                value: ele?.id,
                              }
                          )
                          .filter((e) => e)
                      : movie_list?.data
                          ?.map(
                            (ele) =>
                              form?.ownership == ele?.ownership && {
                                label: ele?.title,
                                value: ele?.id,
                              }
                          )
                          .filter((e) => e),
                };
              }
              return field;
            });
            return { ...section, fields: updatedFields };
          }
          return section;
        })
      );
    } else if (form?.promocode_type === "Series") {
      setFormStructure((prevFormStructure) =>
        prevFormStructure.map((section) => {
          if (section.title === "Details") {
            const updatedFields = section.fields.map((field, index) => {
              if (index === 3) {
                return {
                  ...field,
                  display: "block",
                  title: "Series",
                  placeholder: "Select Series",
                  name: "series",
                  options:
                    form?.ownership == "Content Owner"
                      ? series_list?.data
                          ?.map(
                            (ele) =>
                              form?.ownership == ele?.ownership &&
                              form?.distributor == ele?.distributor && {
                                label: ele?.title,
                                value: ele?.id,
                              }
                          )
                          .filter((e) => e)
                      : series_list?.data
                          ?.map(
                            (ele) =>
                              form?.ownership == ele?.ownership && {
                                label: ele?.title,
                                value: ele?.id,
                              }
                          )
                          .filter((e) => e),
                };
              }
              return field;
            });
            return { ...section, fields: updatedFields };
          }
          return section;
        })
      );
    } else {
      setFormStructure((prevFormStructure) =>
        prevFormStructure.map((section) => {
          if (section.title === "Details") {
            const updatedFields = section.fields.map((field, index) => {
              if (index === 3) {
                return { ...field, display: "none" };
              }
              return field;
            });
            return { ...section, fields: updatedFields };
          }
          return section;
        })
      );
    }
  }, [
    form?.promocode_type,
    movie_list,
    form?.ownership,
    form?.distributor,
    series_list,
    subscriptions,
  ]);

  useEffect(() => {
    if (distributors?.data) {
      setFormStructure((prevFormStructure) =>
        prevFormStructure.map((section) => {
          if (section.title === "Ownership") {
            const updatedFields = section.fields.map((field, index) => {
              if (index === 1) {
                return {
                  ...field,
                  options: distributors?.data?.map((ele) => ({
                    label: ele?.distributor_name,
                    value: ele?.id,
                  })),
                };
              }
              return field;
            });
            return { ...section, fields: updatedFields };
          }
          return section;
        })
      );
    }
  }, [distributors]);
  console.log(form, "new Form Datr");
  //   useEffect(() => {
  //     if (movie_list?.data) {
  //       setFormStructure((prevFormStructure) =>
  //         prevFormStructure.map((section) => {
  //           if (section.title === "Details") {
  //             const updatedFields = section.fields.map((field, index) => {
  //               if (index === 4) {
  //                 return {
  //                   ...field,
  //                   options:
  //                     form?.ownership == "Content Owner"
  //                       ? movie_list?.data
  //                           ?.map(
  //                             (ele) =>
  //                               form?.ownership == ele?.ownership &&
  //                               form?.distributor == ele?.distributor && {
  //                                 label: ele?.title,
  //                                 value: ele?.id,
  //                               }
  //                           )
  //                           .filter((e) => e)
  //                       : movie_list?.data
  //                           ?.map(
  //                             (ele) =>
  //                               form?.ownership == ele?.ownership && {
  //                                 label: ele?.title,
  //                                 value: ele?.id,
  //                               }
  //                           )
  //                           .filter((e) => e),
  //                 };
  //               }
  //               return field;
  //             });
  //             return { ...section, fields: updatedFields };
  //           }
  //           return section;
  //         })
  //       );
  //     }
  //   }, [movie_list, form?.ownership, form?.distributor]);
  //   useEffect(() => {
  //     if (series_list?.data) {
  //       setFormStructure((prevFormStructure) =>
  //         prevFormStructure.map((section) => {
  //           if (section.title === "Details") {
  //             const updatedFields = section.fields.map((field, index) => {
  //               if (index === 5) {
  //                 return {
  //                   ...field,
  //                   options:
  //                     form?.ownership == "Content Owner"
  //                       ? series_list?.data
  //                           ?.map(
  //                             (ele) =>
  //                               form?.ownership == ele?.ownership &&
  //                               form?.distributor == ele?.distributor && {
  //                                 label: ele?.title,
  //                                 value: ele?.id,
  //                               }
  //                           )
  //                           .filter((e) => e)
  //                       : series_list?.data
  //                           ?.map(
  //                             (ele) =>
  //                               form?.ownership == ele?.ownership && {
  //                                 label: ele?.title,
  //                                 value: ele?.id,
  //                               }
  //                           )
  //                           .filter((e) => e),
  //                 };
  //               }
  //               return field;
  //             });
  //             return { ...section, fields: updatedFields };
  //           }
  //           return section;
  //         })
  //       );
  //     }
  //   }, [series_list, form?.ownership, form?.distributor]);
  //   useEffect(() => {
  //     if (subscriptions?.data) {
  //       setFormStructure((prevFormStructure) =>
  //         prevFormStructure.map((section) => {
  //           if (section.title === "Details") {
  //             const updatedFields = section.fields.map((field, index) => {
  //               if (index === 3) {
  //                 return {
  //                   ...field,
  //                   options: subscriptions?.data?.map((ele) => ({
  //                     label: ele?.plan_name,
  //                     value: ele?.id,
  //                   })),
  //                 };
  //               }
  //               return field;
  //             });
  //             return { ...section, fields: updatedFields };
  //           }
  //           return section;
  //         })
  //       );
  //     }
  //   }, [subscriptions]);
  const handleStatusChange = async (id, status) => {
    if (status == "Inactive") {
      setContentPopup("Are you sure want to Active the Promocode ?");
      setOpenPopup(true);
      setSelectedId(id);
      setSelectedStatus("Active");
    } else if (status == "Active") {
      setContentPopup("Are you sure want to Inactive the Promocode ?");
      setOpenPopup(true);
      setSelectedId(id);
      setSelectedStatus("Inactive");
    }
  };
  useEffect(() => {
    if (form?.plan) {
      const indiaCountry = subscriptions?.data?.find(
        (ele) => ele?.id == form?.plan
      );
      console.log(indiaCountry, "MMMMMMMMMMMMMMM123");

      const indiaData = indiaCountry?.countrys?.find(
        (ele) => ele?.country?.toLowerCase() === "india" && ele?.discount_price
      );

      setForm({ ...form, actual_amount: indiaData?.discount_price }); // <-- only set the price
    }
  }, [form?.plan]);
  useEffect(() => {
    if (form?.movie) {
      const indiaCountry = movie_list?.data?.find(
        (ele) => ele?.id == form?.movie
      );

      setForm({ ...form, actual_amount: indiaCountry?.price }); // <-- only set the price
    }
  }, [form?.movie]);
  useEffect(() => {
    if (form?.series) {
      const indiaCountry = series_list?.data?.find(
        (ele) => ele?.id == form?.series
      );

      setForm({ ...form, actual_amount: indiaCountry?.price }); // <-- only set the price
    }
  }, [form?.series]);
  useMemo(() => {
    if (coupons?.data) {
      const temp = tableData;
      temp.tableBody = coupons?.data?.map((ele) => ({
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
        statuscus: (
          <p
            onClick={() => handleStatusChange(ele?.id, ele?.status)}
            className={ele?.status + "Badge"}
            style={{ cursor: "pointer" }}
          >
            {ele?.status}
          </p>
        ),
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
  }, [coupons]);
  useEffect(() => {
    if (isEdit) {
      setFormStructure((prevFormStructure) =>
        prevFormStructure.map((section) => {
          if (section.title === "Ownership") {
            const updatedFields = section.fields.map((field, index) => {
              if (index == 0) {
                return {
                  ...field,
                  disabled: true,
                };
              }
              if (index == 1) {
                return {
                  ...field,
                  disabled: true,
                };
              }
              return field;
            });
            return { ...section, fields: updatedFields };
          }
          return section;
        })
      );
    } else {
      setFormStructure((prevFormStructure) =>
        prevFormStructure.map((section) => {
          if (section.title === "Ownership") {
            const updatedFields = section.fields.map((field, index) => {
              if (index == 0) {
                return {
                  ...field,
                  disabled: false,
                };
              }
              if (index == 1) {
                return {
                  ...field,
                  disabled: false,
                };
              }
              return field;
            });
            return { ...section, fields: updatedFields };
          }
          return section;
        })
      );
    }
  }, [isEdit]);

  useEffect(() => {
    if (form?.discount_type) {
      if (form?.discount_type == "Percentage") {
        setFormStructure((prevFormStructure) =>
          prevFormStructure.map((section) => {
            if (section.title === "Price") {
              const updatedFields = section.fields.map((field, index) => {
                if (index == 2) {
                  return {
                    ...field,
                    maxLength: "3",
                    title: "Discount Percentage",
                  };
                }
                return field;
              });
              return { ...section, fields: updatedFields };
            }
            return section;
          })
        );
      } else {
        setFormStructure((prevFormStructure) =>
          prevFormStructure.map((section) => {
            if (section.title === "Price") {
              const updatedFields = section.fields.map((field, index) => {
                if (index == 2) {
                  return {
                    ...field,
                    maxLength: "3",
                    title: "Discount Amount",
                  };
                }
                return field;
              });
              return { ...section, fields: updatedFields };
            }
            return section;
          })
        );
      }
    }
  }, [form?.discount_type]);

  // useEffect(() => {
  //   if (form?.discount_type && form?.discount_amount) {
  //     if (form?.discount_type == "Percentage") {
  //       console.log(form?.actual_amount -
  //             Number(form?.actual_amount) * Number(form?.discount_amount / 100) , "New Code check")
  //       setForm({
  //         ...form,
  //         payable: Math.round(
  //           form?.actual_amount -
  //             Number(form?.actual_amount) * Number(form?.discount_amount / 100)
  //         ),
  //       });
  //     } else {
  //       setForm({
  //         ...form,
  //         payable: Math.round(form?.actual_amount - form?.discount_amount),
  //       });
  //     }
  //   }
  // }, [form?.discount_type, form?.discount_amount]);
  useEffect(() => {
    if (
      form?.discount_type !== undefined &&
      form?.discount_amount !== undefined &&
      form?.actual_amount !== undefined
    ) {
      const actualAmount = Number(form?.actual_amount);
      const discount = Number(form?.discount_amount);

      if (form?.discount_type === "Percentage") {
        const discounted = actualAmount - actualAmount * (discount / 100);
        console.log(discounted, "New Code check");
        if (discounted === 0) {
          setForm((prevForm) => ({
            ...prevForm,
            payable: "0",
          }));
        } else {
          setForm((prevForm) => ({
            ...prevForm,
            payable: Math.round(discounted),
          }));
        }
      } else {
        if (actualAmount - discount === 0) {
          setForm((prevForm) => ({
            ...prevForm,
            payable: "0",
          }));
        } else {
          setForm((prevForm) => ({
            ...prevForm,
            payable: Math.round(actualAmount - discount),
          }));
        }
      }
    }
  }, [form?.discount_type, form?.discount_amount, form?.actual_amount]);

  useEffect(() => {
    const updateStatus = async () => {
      if (result && selectedId && selectedStatus) {
        const data = new FormData();
        data.append("id", selectedId);
        data.append("status", selectedStatus);
        const resData = await coupon_status_update(data);
        if (resData?.status === 200) {
          setResult(false); // reset
          setContentPopup("");
          setSelectedId(null);
          setSelectedStatus("");
          setContentPopup(false);
          setSave(!save);
        }
      }
    };

    updateStatus();
  }, [result, selectedId, selectedStatus]);

  useEffect(() => {
    if (form?.payable < 0) {
      setForm({ ...form, discount_amount: "", payable: "" });
    }
  }, [form?.payable]);

  const message = useSelector((state) => state.layout.message);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedForm = {
      ...form,
      status: "Pending",
      info: "",
      expired_on: "",
      statuscus: "",
      used_count_coupon: "",
      remaining_coupon: "",
      user_limit_coupon: "",
    };
    setForm(updatedForm); // Update local state if needed
    // setForm({ ...form, status: "Pending" });

    if (isEdit) {
      const resData = await coupon_update(updatedForm);
      if (resData?.status === 200) {
        setForm({});
        setSave(!save);
        setDrawer(false);
      } else {
        setForm(updatedForm);
      }
    } else {
      const resData = await coupon_create(updatedForm);
      if (resData?.status === 200) {
        setForm({});
        setSave(!save);
        setDrawer(false);
      } else {
        setForm(updatedForm);
      }
    }
  };
  const handleConfirmSubmit = async (event) => {
    event.preventDefault();
    const updatedForm = {
      ...form,
      status: "Active",
      info: "",
      expired_on: "",
      statuscus: "",
      used_count_coupon: "",
      remaining_coupon: "",
      user_limit_coupon: "",
    };
    setForm(updatedForm); // Update local state if needed
    if (isEdit) {
      try {
        console.log("Calling coupon_update");
        const resData = await coupon_update(updatedForm);
        console.log("coupon_update response:", resData);
        if (resData?.status === 200) {
          setForm({});
          setSave(!save);
          setDrawer(false);
        } else {
          setForm(updatedForm);
        }
      } catch (error) {
        console.error("coupon_update error:", error);
      }
    } else {
      const resData = await coupon_create(updatedForm);
      if (resData?.status === 200) {
        setForm({});
        setSave(!save);
        setDrawer(false);
      } else {
        setForm(updatedForm);
      }
    }
  };
  return (
    <>
      <EnlargedView open={open} setOpen={setOpen} content={content} />
      <Popup
        open={openPopup}
        setOpen={setOpenPopup}
        content={contentPopup}
        setResult={setResult}
      />
      <ListTable
        tableData={tableData}
        key={"ListTable"}
        setForm={setForm}
        setTableData={setTableData}
        setIsEdit={setIsEdit}
        create_new={"/Coupon/EditCoupon"}
        save={save}
        setSave={setSave}
        isDrawerForm={true}
        openDrawer={drawer}
        setOpenDrawer={setDrawer}
        formStructure={formStructure}
        handleSubmit={handleSubmit}
        handleConfirmSubmit={handleConfirmSubmit}
        form={form}
        isEdit={isEdit}
        formTitle={isEdit ? "Edit Promocode" : "Add Promocode"}
        isConfirmBtn={true}
        exportButton={
          <Export
            fileName={"Promocode"}
            isClubed={true}
            access={"true"}
            exportData={tableData?.exportData || tableData?.tableBody}
            headings={tableData.tableHead?.map((value) => value.label)}
            // api = {"export_episode_list"}
            // api_data = {episodes?.filter_condition}
          />
        }
      />
    </>
  );
}
