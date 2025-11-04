import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import ListTable from "../utils/Table";
import Export from "../utils/Export";
import { all_country_list } from "../../actions/Masters/country";
import { useSelector } from "react-redux";
import * as Action from "../../actions/subscription";
import { bindActionCreators } from "redux";

const Subscriptions = () => {
  const dispatch = useDispatch();
  const [save, setSave] = useState(false);
  const [form, setForm] = useState({
    content_value_0: "Yes",
    content_value_1: "1",
    content_value_2: "Medium",
    content_value_3: "Yes",
    content_0: "Watch All Content (Movies, Series)",
    content_1: "Max Logged in Device",
    content_2: "Max Video Quality",
    content_3: "Ad free Movies , Series &  Video",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [usedCountries, setUsedCountries] = useState([]);
  const { subscription_create, subscription_update } = bindActionCreators(
    Action,
    dispatch
  );
  const [tableData, setTableData] = useState({
    tableTitle: "Subscriptions",
    // deleteRecord: Action.season_delete,
    updateRecord: Action.subscription_status_update,
    onDeleteText: "Are you sure to delete?",
    disableDelete: true,
    // deleteAccess: rights?.["Web Series"]?.["delete"] == "true",
    onUpdateText: "Are you Sure?",
    tableHead: [
      {
        id: "plan_name",
        numeric: false,
        disablePadding: true,
        label: "Plan Name",
      },
      {
        id: "no_of_days",
        label: "Days",
      },
      {
        id: "subscriber_count",
        label: "Total Subscriptions",
      },
      {
        id: "us_price",
        label: "Actual Price",
      },
      {
        id: "us_discount_price",
        label: "Discount Price",
      },
      {
        id: "status",
        label: "Status",
      },

      {
        id: "edit",
        label: "Update",
        // access: rights?.["Web Series"]?.["edit"] == "true",
        isNewForm: true,
      },
    ],
    tableBody: [],
    filterColumn: [],
    // isDateRangeFilter: "created_at",
  });
  const [countryFormStructure, setCountryFormStructure] = useState([
    {
      type: "select",
      name: "country",
      title: "Country",
      placeholder: "Select Country",
      options: [],
      required: true,
    },
    {
      type: "inputBox",
      name: "price",
      title: "price",
      placeholder: "Enter price here",
      required: true,
      regex: /^[0-9\.]+$/,
      maxLength: "4",
    },
    {
      type: "inputBox",
      name: "discount_price",
      title: "Discount Price",
      placeholder: "Enter Discount Price here",
      required: true,
      regex: /^[0-9\.]+$/,
      maxLength: "3",
    },
  ]);
  const countries = useSelector((state) => state?.masters?.countries);
  const subscriptions = useSelector(
    (state) => state?.subscriptions?.subscriptions
  );
  useEffect(() => {
    dispatch(all_country_list());
  }, []);
  useEffect(() => {
    dispatch(Action.all_subscription_list());
  }, [save]);

  const handleAddEntry = (formData) => {
    setUsedCountries((prev) => [...prev, formData.country]); // assuming formData.country holds country name like 'USA'
    // do whatever else you do to store the entry
  };
  console.log(form, "hey sub Form");
  const tableColumns = [
    { title: "Country Name", field: "country" },
    { title: "Discount Price", field: "discount_price" },
    { title: "Price", field: "price" },
    // { title: "Final Price", field: "discount_price" },
  ];
  const [formStructure, setFormStructure] = useState([
    {
      title: "Details",
      fields: [
        {
          type: "inputBox",
          name: "plan_name",
          title: "Plan Name",
          // regex: /^[0-9\.]+$/,
          maxLength: "15",
          showLimit : true,
          placeholder: "Type Plan Name here",
          required: true,
        },
        {
          type: "inputBox",
          name: "no_of_days",
          title: "No Of Days",
          regex: /^[0-9\.]+$/,
          maxLength: "3",
          placeholder: "Type No Of Days here",
          required: true,
        },
      ],
    },
    {
      title: "Country Wise Price",
      fields: [
        {
          type: "country_table",
          countryFormStructure: countryFormStructure,
          tableColumns: tableColumns,
          name: "countrys",
          formTitle: isEdit ? "Edit Country" : "Add Country",
          title: "Resume/CV",
          description: "PDF, DOC, DOCX (Max 5MB)",
          accept: ".pdf,.doc,.docx",
          size: 6,
          required: true,
        },
      ],
    },
    {
      title: "Content",
      fields: [
        {
          type: "headind_ad",
          title: "Watch All Content (Movies, Series)",
          margin: "25px",
          size: "3",
        },
        {
          type: "toggle",
          // title: "Audio Language",
          name: "content_value_0",
          default: "Yes",
          size: "9",
          // required: true,
          noHeading: true,

          options: [
            { value: "Yes", color: "success" },
            { value: "No", color: "danger" },
          ],
        },
        {
          type: "headind_ad",
          title: "Max Logged in Device",
          margin: "25px",
          size: "3",
        },
        {
          type: "toggle",
          // title: "Audio Language",
          name: "content_value_1",
          default: "1",
          size: "9",
          noHeading: true,

          // required: true,

          options: [
            { value: "1", color: "success" },
            { value: "2", color: "success" },
            { value: "3", color: "success" },
            { value: "4", color: "success" },
          ],
        },
        {
          type: "headind_ad",
          title: "Max Video Quality",
          margin: "25px",
          size: "3",
        },
        {
          type: "toggle",
          // title: "Audio Language",
          name: "content_value_2",
          default: "Medium",
          noHeading: true,

          size: "9",
          // required: true,
          options: [
            { value: "Low", color: "success" },
            { value: "Medium", color: "success" },
            { value: "High", color: "success" },
          ],
        },
        {
          type: "headind_ad",
          title: "Ad free Movies , Series &  Video",
          margin: "25px",
          size: "3",
        },
        {
          type: "toggle",
          // title: "Audio Language",
          name: "content_value_3",
          default: "Yes",
          noHeading: true,
          // required: true,
          size: "9",
          options: [
            { value: "Yes", color: "success" },
            { value: "No", color: "danger" },
          ],
        },
      ],
    },
  ]);
  // useMemo(() => {
  //   if (countries?.data) {
  //     const temp = countryFormStructure;
  //     temp[0]["options"] = countries?.data?.map((ele) => ({
  //       label: ele?.country_name,
  //       value: ele?.country_name,
  //     }));
  //     setCountryFormStructure([...temp]);
  //   }
  // }, [countries]);

  useEffect(() => {
    setForm({
      ...form,
      content_0: "Watch All Content (Movies, Series)",
      content_1: "Max Logged in Device",
      content_2: "Max Video Quality",
      content_3: "Ad free Movies , Series &  Video",
    });
  }, [isEdit, drawer]);

  useMemo(() => {
    if (countries?.data) {
      const temp = [...countryFormStructure];
      temp[0]["options"] = countries?.data
        .filter((ele) => !usedCountries.includes(ele?.id))
        .map((ele) => ({
          label: ele.country_name,
          value: ele.country_name,
        }));
      setCountryFormStructure(temp);
    }
  }, [countries, usedCountries]);
  useMemo(() => {
    if (subscriptions?.data) {
      const temp = tableData;
      const main_content = [];
      subscriptions?.data.map((ele) => {
        const content_file = {};
        ele?.subscriptioncontent_set &&
          ele?.subscriptioncontent_set?.map((value, index) => {
            content_file["content_value_" + index] = value?.content_value;
          });
        main_content.push(content_file);
      });
      temp.tableBody = subscriptions?.data?.map((value, index) => ({
        ...value,
        ...main_content[index],
        us_price : "$ " +  parseFloat(value?.us_price).toFixed(2),
        us_discount_price : "$ " +  parseFloat(value?.us_discount_price).toFixed(2),
      }));
      setTableData({ ...temp });
      setForm({ ...form });
    }
  }, [subscriptions]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isEdit) {
      const resData = await subscription_update(form);
      if (resData?.status === 200) {
        setForm({});
        setSave(!save);
        setDrawer(false);
      } else {
        setForm(form);
      }
    } else {
      const resData = await subscription_create(form);
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

  console.log(form, usedCountries, "dfxdkjsfgdfklj");
  return (
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
      // isCountry={true}
      setUsedCountries={setUsedCountries}
      isEdit={isEdit}
      formTitle={isEdit ? "Edit Subsciption" : "Add Subsciption"}
      exportButton={
        <Export
          fileName={"Subsciption"}
          isClubed={true}
          access={"true"}
          exportData={tableData?.exportData || tableData?.tableBody}
          headings={tableData.tableHead?.map((value) => value.label)}
          // api = {"export_episode_list"}
          // api_data = {episodes?.filter_condition}
        />
      }
    />
  );
};

export default Subscriptions;
