import React from "react";
import { useState, useMemo, useEffect } from "react";
import ListTable from "../utils/Table";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Action from "../../actions/Masters/subadmin";
import { bindActionCreators } from "redux";

const SubAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.layout.profile);
  const [form, setForm] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const { subadmin_create, subadmin_update } = bindActionCreators(
    Action,
    dispatch
  );
  const [save, setSave] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [content, setContent] = useState();
  const subadmins = useSelector((state) => state?.masters?.subadmins);
  const tempTableData = {
    tableTitle: "Sub Admin",
    deleteRecord: Action.subadmin_delete,
    updateRecord: Action.subadmin_status_update,
    disableDelete : true,
    deleteAccess: "true",
    onDeleteText: "Are you sure want to delete?",
    onUpdateText: "Are you Sure?",
    tableHead: [
      {
        id: "name",
        label: "Sub Admin",
        // link: "/Coupon/PromocodeHistory",
        color: "var(--gradientColor2)",
      },
      {
        id: "email",
        label: "Email",
      },
      {
        id: "status",
        label: "Status",
      },

      {
        id: "edit",
        label: "Update",
        isNewForm: true,
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
        options: ["Active", "Inactive"],
      },
    ],
  };
  useEffect(() => {
    dispatch(Action.all_subadmin_list());
  }, [save]);
  const [tableData, setTableData] = useState({ ...tempTableData });
  const [formStructure, setFormStructure] = useState([
    {
      title: "Details",
      fields: [
        {
          type: "inputBox",
          name: "name",
          title: "Name",
          placeholder: "Type Sub Admin Name",
          required: true,
          // regex: /^[a-zA-Z0-9\.s]+$/,
        },
        {
          id: "3",
          type: "inputBox",
          title: "Email ID",
          variant: "email",
          placeholder: "Enter Email ID Name",
          isEmail: true,
          name: "email",
          required: true,
        },
        // {
        //   id: "4",
        //   type: "mobile",
        //   title: "Mobile Number",
        //   // maxLength: 12,
        //   placeholder: "Enter Mobile Number",
        //   name: "mobile_number",
        //   isMobile: true,
        //   required: true,
        // },
      ],
    },
    {
      title: "Access",
      fields: [
        {
          type: "headind_ad",
          title: "Dashboard",
          margin: "25px",
          size: "3",
        },
        {
          type: "toggle",
          // title: "Audio Language",
          name: "content_value_0",
          default: "No Access",
          size: "9",
          //   required: true,
          noHeading: true,
          options: [
            { value: "All Access", color: "success" },
            { value: "Only View", color: "danger" },
            { value: "No Access", color: "danger" },
          ],
        },
        {
          type: "headind_ad",
          title: "Analytics",
          margin: "25px",
          size: "3",
        },
        {
          type: "toggle",
          // title: "Audio Language",
          name: "content_value_1",
          default: "No Access",
          size: "9",
          //   required: true,
          noHeading: true,
          options: [
            { value: "All Access", color: "success" },
            { value: "Only View", color: "danger" },
            { value: "No Access", color: "danger" },
          ],
        },
        {
          type: "headind_ad",
          title: "Movies",
          margin: "25px",
          size: "3",
        },
        {
          type: "toggle",
          // title: "Audio Language",
          name: "content_value_2",
          default: "No Access",
          size: "9",
          //   required: true,
          noHeading: true,
          options: [
            { value: "All Access", color: "success" },
            { value: "Only View", color: "danger" },
            { value: "No Access", color: "danger" },
          ],
        },
        {
          type: "headind_ad",
          title: "Live Stream",
          margin: "25px",
          size: "3",
        },
        {
          type: "toggle",
          // title: "Audio Language",
          name: "content_value_3",
          default: "No Access",
          size: "9",
          //   required: true,
          noHeading: true,
          options: [
            { value: "All Access", color: "success" },
            { value: "Only View", color: "danger" },
            { value: "No Access", color: "danger" },
          ],
        },
        {
          type: "headind_ad",
          title: "Series",
          margin: "25px",
          size: "3",
        },
        {
          type: "toggle",
          // title: "Audio Language",
          name: "content_value_4",
          default: "No Access",
          size: "9",
          //   required: true,
          noHeading: true,
          options: [
            { value: "All Access", color: "success" },
            { value: "Only View", color: "danger" },
            { value: "No Access", color: "danger" },
          ],
        },
        {
          type: "headind_ad",
          title: "Season",
          margin: "25px",
          size: "3",
        },
        {
          type: "toggle",
          // title: "Audio Language",
          name: "content_value_5",
          default: "No Access",
          size: "9",
          //   required: true,
          noHeading: true,
          options: [
            { value: "All Access", color: "success" },
            { value: "Only View", color: "danger" },
            { value: "No Access", color: "danger" },
          ],
        },
        {
          type: "headind_ad",
          title: "Episode",
          margin: "25px",
          size: "3",
        },
        {
          type: "toggle",
          // title: "Audio Language",
          name: "content_value_6",
          default: "No Access",
          size: "9",
          //   required: true,
          noHeading: true,
          options: [
            { value: "All Access", color: "success" },
            { value: "Only View", color: "danger" },
            { value: "No Access", color: "danger" },
          ],
        },
        {
          type: "headind_ad",
          title: "Coming Soon",
          margin: "25px",
          size: "3",
        },
        {
          type: "toggle",
          // title: "Audio Language",
          name: "content_value_7",
          default: "No Access",
          size: "9",
          //   required: true,
          noHeading: true,
          options: [
            { value: "All Access", color: "success" },
            { value: "Only View", color: "danger" },
            { value: "No Access", color: "danger" },
          ],
        },
        {
          type: "headind_ad",
          title: "Content Owner",
          margin: "25px",
          size: "3",
        },
        {
          type: "toggle",
          // title: "Audio Language",
          name: "content_value_8",
          default: "No Access",
          size: "9",
          //   required: true,
          noHeading: true,
          options: [
            { value: "All Access", color: "success" },
            { value: "Only View", color: "danger" },
            { value: "No Access", color: "danger" },
          ],
        },
        {
          type: "headind_ad",
          title: "Acruired Content",
          margin: "25px",
          size: "3",
        },
        {
          type: "toggle",
          // title: "Audio Language",
          name: "content_value_9",
          default: "No Access",
          size: "9",
          //   required: true,
          noHeading: true,
          options: [
            { value: "All Access", color: "success" },
            { value: "Only View", color: "danger" },
            { value: "No Access", color: "danger" },
          ],
        },
        {
          type: "headind_ad",
          title: "Content Leaving Soon",
          margin: "25px",
          size: "3",
        },
        {
          type: "toggle",
          // title: "Audio Language",
          name: "content_value_10",
          default: "No Access",
          size: "9",
          //   required: true,
          noHeading: true,
          options: [
            { value: "All Access", color: "success" },
            { value: "Only View", color: "danger" },
            { value: "No Access", color: "danger" },
          ],
        },
        {
          type: "headind_ad",
          title: "Slider",
          margin: "25px",
          size: "3",
        },
        {
          type: "toggle",
          // title: "Audio Language",
          name: "content_value_11",
          default: "No Access",
          size: "9",
          //   required: true,
          noHeading: true,
          options: [
            { value: "All Access", color: "success" },
            { value: "Only View", color: "danger" },
            { value: "No Access", color: "danger" },
          ],
        },
        {
          type: "headind_ad",
          title: "Ad Master",
          margin: "25px",
          size: "3",
        },
        {
          type: "toggle",
          // title: "Audio Language",
          name: "content_value_12",
          default: "No Access",
          size: "9",
          //   required: true,
          noHeading: true,
          options: [
            { value: "All Access", color: "success" },
            { value: "Only View", color: "danger" },
            { value: "No Access", color: "danger" },
          ],
        },
        {
          type: "headind_ad",
          title: "Promotions",
          margin: "25px",
          size: "3",
        },
        {
          type: "toggle",
          // title: "Audio Language",
          name: "content_value_13",
          default: "No Access",
          size: "9",
          //   required: true,
          noHeading: true,
          options: [
            { value: "All Access", color: "success" },
            { value: "Only View", color: "danger" },
            { value: "No Access", color: "danger" },
          ],
        },
        {
          type: "headind_ad",
          title: "Top Ten Video",
          margin: "25px",
          size: "3",
        },
        {
          type: "toggle",
          // title: "Audio Language",
          name: "content_value_14",
          default: "No Access",
          size: "9",
          //   required: true,
          noHeading: true,
          options: [
            { value: "All Access", color: "success" },
            { value: "Only View", color: "danger" },
            { value: "No Access", color: "danger" },
          ],
        },
        {
          type: "headind_ad",
          title: "Customers",
          margin: "25px",
          size: "3",
        },
        {
          type: "toggle",
          // title: "Audio Language",
          name: "content_value_15",
          default: "No Access",
          size: "9",
          //   required: true,
          noHeading: true,
          options: [
            { value: "All Access", color: "success" },
            { value: "Only View", color: "danger" },
            { value: "No Access", color: "danger" },
          ],
        },
        {
          type: "headind_ad",
          title: "Complaints",
          margin: "25px",
          size: "3",
        },
        {
          type: "toggle",
          // title: "Audio Language",
          name: "content_value_16",
          default: "No Access",
          size: "9",
          //   required: true,
          noHeading: true,
          options: [
            { value: "All Access", color: "success" },
            { value: "Only View", color: "danger" },
            { value: "No Access", color: "danger" },
          ],
        },
        {
          type: "headind_ad",
          title: "Promocode",
          margin: "25px",
          size: "3",
        },
        {
          type: "toggle",
          // title: "Audio Language",
          name: "content_value_17",
          default: "No Access",
          size: "9",
          //   required: true,
          noHeading: true,
          options: [
            { value: "All Access", color: "success" },
            { value: "Only View", color: "danger" },
            { value: "No Access", color: "danger" },
          ],
        },
        {
          type: "headind_ad",
          title: "Transactions",
          margin: "25px",
          size: "3",
        },
        {
          type: "toggle",
          // title: "Audio Language",
          name: "content_value_18",
          default: "No Access",
          size: "9",
          //   required: true,
          noHeading: true,
          options: [
            { value: "All Access", color: "success" },
            { value: "Only View", color: "danger" },
            { value: "No Access", color: "danger" },
          ],
        },
        {
          type: "headind_ad",
          title: "Subscriptions",
          margin: "25px",
          size: "3",
        },
        {
          type: "toggle",
          // title: "Audio Language",
          name: "content_value_19",
          default: "No Access",
          size: "9",
          //   required: true,
          noHeading: true,
          options: [
            { value: "All Access", color: "success" },
            { value: "Only View", color: "danger" },
            { value: "No Access", color: "danger" },
          ],
        },
        {
          type: "headind_ad",
          title: "Control Panel",
          margin: "25px",
          size: "3",
        },
        {
          type: "toggle",
          // title: "Audio Language",
          name: "content_value_20",
          default: "No Access",
          size: "9",
          //   required: true,
          noHeading: true,
          options: [
            { value: "All Access", color: "success" },
            { value: "Only View", color: "danger" },
            { value: "No Access", color: "danger" },
          ],
        },
        {
          type: "headind_ad",
          title: "Setting",
          margin: "25px",
          size: "3",
        },
        {
          type: "toggle",
          // title: "Audio Language",
          name: "content_value_21",
          default: "No Access",
          size: "9",
          //   required: true,
          noHeading: true,
          options: [
            { value: "All Access", color: "success" },
            { value: "Only View", color: "danger" },
            { value: "No Access", color: "danger" },
          ],
        },
      ],
    },
  ]);
  useMemo(() => {
    if (subadmins?.data) {
      const temp = tableData;
      const main_content = [];
      subadmins?.data.map((ele) => {
        const content_file = {};
        ele?.rights &&
          ele?.rights?.map((value, index) => {
            content_file["content_value_" + index] = value?.content_value;
          });
        main_content.push(content_file);
      });
      temp.tableBody = subadmins?.data?.map((ele, index) => ({
        ...ele,
        ...main_content[index],
      }));
      setTableData({ ...temp });
    }
  }, [subadmins]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedForm = {
      ...form,
      content_0: "Dashboard",
      content_1: "Analytics",
      content_2: "Movies",
      content_3: "Live Stream",
      content_4: "Series",
      content_5: "Season",
      content_6: "Episode",
      content_7: "Coming Soon",
      content_8: "Content Owner",
      content_9: "Acruired Content",
      content_10: "Content Leaving Soon",
      content_11: "Slider",
      content_12: "Ad Master",
      content_13: "Promotions",
      content_14: "Top Ten Video",
      content_15: "Customers",
      content_16: "Complaints",
      content_17: "Promocode",
      content_18: "Transactions",
      content_19: "Subscriptions",
      content_20: "Control Panel",
      content_21: "Setting",
    };
    setForm(updatedForm);
    console.log(updatedForm, "New Form Chech");
    if (isEdit) {
      const resData = await subadmin_update(updatedForm);
      if (resData?.status === 200) {
        setForm({});
        setSave(!save);
        setDrawer(false);
      } else {
        setForm(form);
      }
    } else {
      const resData = await subadmin_create(updatedForm);
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

  return (
    <ListTable
      tableData={tableData}
      key={"ListTable"}
      setForm={setForm}
      setTableData={setTableData}
      setIsEdit={setIsEdit}
      save={save}
      setSave={setSave}
      isDrawerForm={true}
      openDrawer={drawer}
      setOpenDrawer={setDrawer}
      formStructure={formStructure}
      handleSubmit={handleSubmit}
      form={form}
      canEdit={true}
      isEdit={isEdit}
      formTitle={isEdit ? "Edit Sub Admin" : "Add Sub Admin"}
    />
  );
};

export default SubAdmin;
