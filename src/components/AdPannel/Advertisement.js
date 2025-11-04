import React, { useEffect, useState } from "react";
import ListTable from "../utils/Table";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as Action from "../../actions/Advertiser/advertisement";
import { bindActionCreators } from "redux";
import Export from "../utils/Export";
import DynamicFormModal from "../utils/NewFormStructure/DynamicFormModal";
import StripePayment from "../Advertisement/Stripe/StripePayment";
import { useNavigate } from "react-router-dom";
import EnlargedView from "../utils/EnlargedView";

const Advertisement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [save, setSave] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [isModalOpenSub, setIsModalOpenSub] = useState(false);
  const [adPrice, setAdPrice] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSub, setFormSub] = useState({});
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const {
    advertisement_create,
    advertisement_update,
    advertisement_charge_list,
    advertisement_payment_create,
  } = bindActionCreators(Action, dispatch);

  const user = useSelector((state) => state.layout.profile);
  const adv_list = useSelector((state) => state?.advertisement?.ad_list_adv);
  useEffect(() => {
    const dailyAdPrice = async () => {
      const resData = await advertisement_charge_list();
      console.log(resData, "resData123654");
      if (resData?.data) {
        setAdPrice(resData?.data?.ad_charge);
      }
    };
    dailyAdPrice();
  }, []);
  console.log(adPrice, "adPrice44444");
  useEffect(() => {
    if (user?.id) {
      dispatch(
        Action.advertisement_list_advertiser({ advertiser_id: user?.id })
      );
    }
  }, [user, save]);
  const handleFormSub = (id, product_name) => {
    console.log("New Code ");
    setEditingIndex(null);
    setIsModalOpenSub(true);
    setIsEdit(false);
    setFormSub({
      id: id,
      ad_name: product_name,
    });
  };
  const newPaymentGateway = (data) => {
    console.log("Redirecting to payment...", data);
    navigate("/stripe-payment", {
      state: {
        price: Number(data?.payable_amount),
        currency_code: "USD",
        email: user?.email,
        ad_name: data?.product_name,
        required_view: data?.views_required,
        ad_id: data?.id,
      },
    });
  };
  useEffect(() => {
    if (adv_list?.data) {
      const temp = tableData;

      temp.tableBody = adv_list?.data?.map((ele) => ({
        ...ele,
        edit: ele?.approval_status === "Approved",
        top_up: (
          <div>
            <button
              style={{
                padding: "5px 15px",
                color: "rgb(238, 127, 37)",
                background: "transparent",
                border: "1px solid rgb(238, 127, 37)",
                borderRadius: "5px",
              }}
              onClick={() =>
                ele?.approval_status === "Approved"
                  ? ele?.payment_status === "Paid" ? handleFormSub(ele?.id, ele?.product_name) : (setOpen(true), setContent("First Pay For Advertisement before adding Top Up"))
                  : (setOpen(true), setContent("Advertisement should be Approved before adding extra views"))
              }
            >
              Top Up
            </button>
          </div>
        ),
        payment: (
          <div>
            {ele?.payment_status === "Paid" ? (
              <button
                disabled
                style={{
                  padding: "10px 24px",
                  color: "#10b981",
                  background: "#ecfdf5",
                  border: "1px solid #10b981",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "not-allowed",
                  opacity: "0.9",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Paid
              </button>
            ) : (
              <button
                style={{
                  padding: "10px 24px",
                  color: "#ff6b00",
                  background: "transparent",
                  border: "1px solid #ff6b00",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "550",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onClick={() =>
                  ele?.approval_status === "Approved"
                    ? newPaymentGateway(ele)
                    : (setOpen(true),
                      setContent(
                        "Payment Cannot be done until your Advertisement is Approved"
                      ))
                }
                onMouseEnter={(e) => {
                  e.target.style.background = "#ff6b00";
                  e.target.style.color = "white";
                  e.target.style.transform = "translateY(-1px)";
                  e.target.style.boxShadow =
                    "0 4px 12px rgba(255, 107, 0, 0.25)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#ff6b00";
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }}
              >
                Pay Now & Activate Ad
              </button>
            )}
          </div>
        ),
      }));

      setTableData({ ...temp });
    }
  }, [adv_list]);

  const [tableData, setTableData] = useState({
    tableTitle: "Advertisement",
    deleteRecord: Action.advertisement_delete,
    updateRecord: Action.advertisement_update,
    deleteAccess: "true",
    disableDelete: true,
    customisedStatusUpdateMessage: true,
    onDeleteText: "Are you sure want to delete Advertisement?",
    onActiveText: "Are you Sure want to Activate Advertisement?",
    onInactiveText: "Are you Sure want to Inactivate Advertisement?",
    tableHead: [
      {
        id: "product_name",
        label: "Product Name",
      },
      {
        id: "no_of_views",
        label: "No Of Views",
      },
      {
        id: "remaining_view",
        label: "Remaining View",
      },
      {
        id: "views_required",
        label: "Required Views",
      },
      {
        id: "payable_amount",
        label: "Payable Amount",
      },
      {
        id: "payment",
        label: "Payment",
        isSpecial: true,
        align: "left",
      },
      {
        id: "top_up",
        label: "Top Up",
        isSpecial: true,
        align: "left",
      },
      {
        id: "created_at",
        label: "Created At",
      },
      {
        id: "status",
        label: "Status",
        // isButtonDisplay: true,
      },
      {
        id: "approval_status",
        label: "Approval Status",
        isButtonDisplay: true,
      },
      {
        id: "edit",
        label: "Update",
        // access: rights?.["Slider Banner"]?.["edit"] == "true",
        isNewForm: true,
      },
    ],
    tableBody: [],
    filterColumn: [
      {
        id: "2",
        title: "Approval Status",
        name: "approval_status",
        options: ["Approved", "Pending", "Rejected"],
      },
    ],
  });
  const [formStructure, setFormStructure] = useState([
    {
      title: "Details",
      fields: [
        {
          type: "inputBox",
          name: "product_name",
          title: "Product Name",
          placeholder: "Enter Product Name",
          required: true,
        },
        {
          type: "inputBox",
          name: "payable_amount",
          title: "Payable Amount",
          regex: /^[0-9\s]+$/,
          placeholder: "Enter Amount ($)",
          symbol : "$",
          required: true,
        },
        {
          type: "inputBox",
          name: "views_required",
          title: "Views Required",
          regex: /^[0-9\s]+$/,
          placeholder: "Enter No Of Views",
          required: true,
          disabled: true,
        },
        {
          type: "inputBox",
          name: "reject_reason",
          title: "Reject Reason",
          // regex: /^[0-9\s]+$/,
          placeholder: "Enter Amount",
          display: "none",
          required: true,
        },
      ],
    },
    {
      title: "Media",
      fields: [
        {
          type: "inputBox",
          name: "advertise_url",
          title: "Advertise Link",
          placeholder: "Paste Advertise Link",
          required: true,
          size: "12",
          displayText : "Please upload all video links, trailer links, posters, and thumbnails to the Google Drive / Dropbox folder and share the drive link once done."
        },
        {
          type: "inputBox",
          name: "website_url",
          title: "Redirection Url",
          placeholder: "Paste Link",
          // required: true,
          size: "12",
          displayText : "If you wish for customers to easily view your site, you can include your website link (not required)."
        },
      ],
    },
  ]);

  useEffect(() => {
    if (form?.payable_amount) {
      const amount = Number(form?.payable_amount) / parseFloat(adPrice);
      setForm({ ...form, views_required: amount });
    }
  }, [form?.payable_amount]);
  useEffect(() => {
    if (formSub?.payable_amount) {
      const amount = Number(formSub?.payable_amount) / parseFloat(adPrice);
      setFormSub({ ...formSub, views_required: amount });
    }
  }, [formSub?.payable_amount]);

  const [formStructureSub, setFormStructureSub] = useState(
    [
      {
        type: "inputBox",
        name: "payable_amount",
        title: "Payable Amount",
        regex: /^[0-9\s]+$/,
         placeholder: "  Enter Amount ($)",
          symbol : "$",
        required: true,
      },
      {
        type: "inputBox",
        name: "views_required",
        title: "Views Required",
        regex: /^[0-9\s]+$/,
        placeholder: "Enter No Of Views",
        required: true,
        disabled: true,
      },
    ].filter((e) => e)
  );

  useEffect(() => {
    if (isEdit && form?.approval_status === "Rejected") {
      setFormStructure((prevFormStructure) =>
        prevFormStructure.map((section) => {
          if (section.title === "Details") {
            const updatedFields = section.fields.map((field, index) => {
              if (index === 3) {
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
  }, [form?.approval_status]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    Object.keys(form)?.map((key) => data.append(key, form?.[key]));
    data.append("advertiser", user?.id);
    if (isEdit) {
      data.append("approval_status", "Pending");
      data.append("reject_reason", "");
      const resData = await advertisement_update(data);
      if (resData?.status === 200) {
        setForm({});
        setSave(!save);
        setDrawer(false);
      } else {
        setForm(form);
      }
    } else {
      const resData = await advertisement_create(data);
      if (resData?.status === 200) {
        // setForm({});
        setForm({});
        setSave(!save);
        setDrawer(false);
      } else {
        setForm(form);
      }
    }
  };

  const handleSubmit2 = async () => {
    console.log(formSub, "formSub123");
    navigate("/stripe-payment", {
      state: {
        price: Number(formSub?.payable_amount),
        currency_code: "USD",
        email: user?.email,
        ad_name: formSub?.ad_name,
        required_view: formSub?.views_required,
        ad_id: formSub?.id,
      },
    });
    // const resData = await advertisement_payment_create(formSub);
    // if (resData?.status === 200) {
    //   setSave(!save);
    //   setFormSub({});
    //   setIsModalOpenSub(false);
    // }
  };

  return (
    <div>
      {" "}
      <EnlargedView open={open} setOpen={setOpen} content={content} />
      <DynamicFormModal
        open={isModalOpenSub}
        onClose={() => {
          setIsModalOpenSub(false);
          setFormSub({});
          setIsEdit(false);
        }}
        formStructure={formStructureSub}
        onSubmit={handleSubmit2}
        formData={formSub}
        setFormData={setFormSub}
        title={"Ad Top Up"}
        initialData={editingIndex !== null ? tableData[editingIndex] : {}}
        save={save}
        setSave={setSave}
      />
      <ListTable
        tableData={tableData}
        key={"ListTable"}
        setForm={setForm}
        setTableData={setTableData}
        setIsEdit={setIsEdit}
        view="view_all"
        save={save}
        setSave={setSave}
        isDrawerForm={true}
        openDrawer={drawer}
        setOpenDrawer={setDrawer}
        formStructure={formStructure}
        handleSubmit={handleSubmit}
        form={form}
        isEdit={isEdit}
        formTitle={isEdit ? "Edit Advertisement" : "Add Advertisement"}
        exportButton={
          <Export
            fileName={"Advertisement"}
            isClubed={true}
            access={"true"}
            exportData={tableData?.exportData || tableData?.tableBody}
            headings={tableData.tableHead?.map((value) => value.label)}
            // api = {"export_episode_list"}
            // api_data = {episodes?.filter_condition}
          />
        }
      />
    </div>
  );
};

export default Advertisement;
