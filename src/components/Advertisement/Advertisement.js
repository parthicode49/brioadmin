import React, { useEffect, useState } from "react";
import ListTable from "../utils/Table";
import Export from "../utils/Export";
import { useDispatch, useSelector } from "react-redux";
import * as Action from "../../actions/Advertiser/advertisement";
import { bindActionCreators } from "redux";

const Advertisement = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({});
  const [drawer, setDrawer] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const user = useSelector((state) => state.layout.profile);
  const [advertisementList, setAdvertisementList] = useState([]);
  const [save, setSave] = useState(false);
  const { all_advertisement_list_admin, advertisement_update } =
    bindActionCreators(Action, dispatch);

  useEffect(() => {
    const adData = async () => {
      const resData = await all_advertisement_list_admin();
      if (resData?.data) {
        console.log(resData?.data, "resData------");
        setAdvertisementList(resData?.data);
      }
    };
    adData();
  }, [save]);

  console.log(advertisementList, "dfsfddsf");

  const [tableData, setTableData] = useState({
    tableTitle: "Advertisement",
    // deleteRecord: Action.top_ten_delete,
    updateRecord: Action.advertisement_status_update,
    customisedStatusUpdateMessage: true,
    disableDelete: true,
    onDeleteText: "Are you sure want to delete ?",
    onActiveText: "Are you Sure want to Activate Advertisement ?",
    onInactiveText: "Are you Sure want to Inactivate Advertisement ?",
    tableHead: [
      {
        id: "advertiser_name",
        label: "Advertiser",
        subText: "advertiser_company_name",
      },
      {
        id: "advertiser_mobile_number",
        label: "Contact",
        subText: "advertiser_email",
      },
      {
        id: "product_name",
        label: "Product Name",
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
        id: "created_at",
        label: "Created At",
        isDate: true,
      },
      {
        id: "edit",
        label: "Update",
        isNewForm: true,
      },
    ],
    tableBody: [],
    filterColumn: [
      {
        id: "2",
        title: "Approval Status",
        name: "approval_status",
        options: ["Pending", "Approved", "Rejected"],
      },
      {
        id: "3",
        title: "Status",
        name: "status",
        options: ["Active", "Inactive"],
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
          name: "views_required",
          title: "Views Required",
          regex: /^[0-9\s]+$/,
          placeholder: "Enter No Of Views",
          required: true,
          disabled: true,
        },
        {
          type: "inputBox",
          name: "payable_amount",
          title: "Payable Amount",
          regex: /^[0-9\s]+$/,
          placeholder: "Enter Amount",
          disabled: true,
          required: true,
        },
        {
          type: "toggle",
          title: "Approval Status",
          name: "approval_status",
          // required: true,
          size: "3",
          options: [
            { value: "Pending", color: "danger" },
            { value: "Approved", color: "success" },
            { value: "Rejected", color: "danger" },
          ],
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
        {
          type: "inputBox",
          name: "advertise_url_m3u8",
          title: "Advertise URL ( .m3u8 )",
          // regex: /^[0-9\s]+$/,
          placeholder: "Enter M3u8 URL",
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
        },
        {
          type: "inputBox",
          name: "website_url",
          title: "Redirection Url",
          placeholder: "Paste Link",
          // required: true,
          size: "12",
        },
      ],
    },
  ]);

  useEffect(() => {
    if (form?.approval_status == "Rejected") {
      setFormStructure((prevFormStructure) =>
        prevFormStructure.map((section) => {
          if (section.title === "Details") {
            const updatedFields = section.fields.map((field, index) => {
              if (index === 4) {
                return { ...field, display: "block" };
              }
              if (index === 5) {
                return { ...field, display: "none" };
              }
              return field;
            });
            return { ...section, fields: updatedFields };
          }
          return section;
        })
      );
    } else if (form?.approval_status == "Approved") {
      setFormStructure((prevFormStructure) =>
        prevFormStructure.map((section) => {
          if (section.title === "Details") {
            const updatedFields = section.fields.map((field, index) => {
              if (index === 4) {
                return { ...field, display: "none" };
              }
              if (index === 5) {
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
              if (index === 4) {
                return { ...field, display: "none" };
              }
              if (index === 5) {
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
    // data.append("advertiser", user?.id);
    const resData = await advertisement_update(data);
    if (resData?.status === 200) {
      // setForm({});
      setForm({});
      setSave(!save);
      setDrawer(false);
    } else {
      setForm(form);
    }
  };
  useEffect(() => {
    if (advertisementList?.length > 0) {
      const temp = tableData;
      temp.tableBody = advertisementList;
      setTableData({ ...temp });
      // setForm({ ...form, sequence: Number(tableData.tableBody[tableData.tableBody.length - 1]?.["sequence"]) + 1 })
    }
  }, [advertisementList]);

  return (
    <ListTable
      tableData={tableData}
      key={"ListTable"}
      form={form}
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
      hideAddBtn={true}
      isEdit={isEdit}
      formTitle={isEdit ? "Edit Advertisement" : "Add Advertisement"}
      exportButton={
        <Export
          fileName={"Category"}
          isClubed={true}
          access={"true"}
          exportData={tableData?.exportData || tableData?.tableBody}
          headings={tableData.tableHead?.map((value) => value.label)}
          // api = {"export_episode_list"}
          // api_data = {episodes?.filter_condition}
        />
      }
      // setForm = {se}
      // setIsEdit(true)
    />
  );
};

export default Advertisement;
