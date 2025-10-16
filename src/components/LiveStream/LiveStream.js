import React, { useEffect, useState } from "react";
import ListTable from "../utils/Table";
import * as Action from "../../actions/livestream";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import Export from "../utils/Export";
import { live_stream_category_list } from "../../actions/Masters/livestremcategory";

const LiveStream = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [save, setSave] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const user = useSelector((state) => state.layout.profile);
  const categories = useSelector(
    (state) => state?.masters?.live_stream_category
  );
  const livestream = useSelector((state) => state?.live_stream?.live_stream);
  const { create_live_stream, update_live_stream } = bindActionCreators(
    Action,
    dispatch
  );

  useEffect(() => {
    dispatch(Action.live_stream_list_admin());
  }, [save]);

  useEffect(() => {
    dispatch(live_stream_category_list());
  }, []);

  const [tableData, setTableData] = useState({
    tableTitle: "Live Stream",
    deleteRecord: Action.delete_live_stream,
    updateRecord: Action.live_stream_status_update,
    deleteAccess: "true",
    customisedStatusUpdateMessage: true,
    onDeleteText: "Are you sure want to delete Live Stream?",
    onActiveText: "Are you Sure want to Activate Live Stream?",
    onInactiveText: "Are you Sure want to Inactivate Live Stream?",
    tableHead: [
      {
        id: "channel_name",
        label: "Title",
      },
      {
        id: "stream_type",
        label: "Type",
      },

      {
        id: "thumbnail",
        label: "Web View",
        isImage: true,
      },
      {
        id: "publish_date",
        label: "Publish Time",
        subText: "publish_time",
        // isImage: true,
      },

      {
        id: "category_name",
        label: "category",
        align: "center",
      },

      {
        id: "status",
        label: "Status",
        // isButtonDisplay: true,
      },
      {
        id: "edit",
        label: "Update",
        access: "true",
        isNewForm: true,
      },
    ],
    tableBody: [],
    filterColumn: [
      //   {
      //     id: "2",
      //     title: "Slider Type",
      //     name: "content_type",
      //     options: ["Movie", "Series"],
      //   },
    ],
  });

  const [formStructure, setFormStructure] = useState([
    {
      title: "Details",
      fields: [
        {
          type: "select",
          name: "category",
          title: "Select Category",
          placeholder: "Select Category here",
          options: [],
          required: true,
        },
        {
          type: "select",
          name: "stream_type",
          title: "Select Stream Type",
          placeholder: "Select Stream Type here",
          options: [
            { value: "FREE", label: "FREE" },
            { value: "TVOD", label: "TVOD" },
            { value: "SVOD", label: "SVOD" },
          ],
          required: true,
        },
        {
          type: "inputBox",
          name: "amount",
          title: "Amount",
          display: "none",
          regex: /^[0-9\.]+$/,
          placeholder: "Enter Amount",
          required: true,
        },
        {
          type: "inputBox",
          name: "channel_name",
          title: "Channel Name",
          //   regex: /^[0-9\.]+$/,
          placeholder: "Enter Channel Name",
          required: true,
        },

        {
          type: "date",
          variant: "date",
          title: "Publish Date",
          min: new Date().toISOString().split("T")[0],
          name: "publish_date",
          default: new Date().toISOString().split("T")[0],
          required: true,
          placeholder: "Select Date",
          size: "3",
        },
        {
          type: "time",
          variant: "time",
          title: "Publish Time",
          default: new Date().toISOString().split("T")[1],
          name: "publish_time",
          placeholder: "Select Time",
          required: true,
          size: "3",
        },
        {
          type: "inputBox",
          title: "Description",
          placeholder: "Type Description",
          name: "description",
          required: true,
          size: "12",
          isLimit: "Description",
          showLimit: true,
          maxLength: "500",
          row: "4",
          multiline: true,
        },
      ],
    },
    {
      title: "Media",
      fields: [
        {
          type: "inputBox",
          name: "channel_live_url",
          title: "Channel Link",
          placeholder: "Paste Channel Link",
          required: true,
          size: "9",
        },
        {
          type: "image",
          name: "poster",
          title: "Portrait",
          description: "Image size",
          image_size: "980 * 1300 PX",
          accept: "image/*",
          size: 6,
          required: true,
        },
        {
          type: "image",
          name: "thumbnail",
          title: "Landscape",
          description: "Image size",
          image_size: "1920 * 1080 PX",
          accept: "image/*",
          size: 6,
          required: true,
        },
      ],
    },
  ]);

  useEffect(() => {
    if (categories?.data) {
      setFormStructure((prevFormStructure) =>
        prevFormStructure.map((section) => {
          if (section.title === "Details") {
            const updatedFields = section.fields.map((field, index) => {
              if (index === 0) {
                return {
                  ...field,
                  options: categories?.data?.map((ele) => ({
                    label: ele?.category_name,
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
  }, [categories]);

  useEffect(() => {
    if (livestream?.data) {
      const temp = tableData;
      temp.tableBody = livestream?.data || [];
      setTableData({ ...temp });
    }
  }, [livestream]);

  useEffect(() => {
    if (form?.stream_type === "TVOD") {
      setFormStructure((prevFormStructure) =>
        prevFormStructure.map((section) => {
          if (section.title === "Details") {
            const updatedFields = section.fields.map((field, index) => {
              if (index === 2) {
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
              if (index === 2) {
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
  }, [form?.stream_type]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    Object.keys(form)?.map((key) => data.append(key, form?.[key]));
    data.append("user", user?.id);
    if (isEdit) {
      const resData = await update_live_stream(data);
      if (resData?.status === 200) {
        setForm({});
        setSave(!save);
        setDrawer(false);
      } else {
        setForm(form);
      }
    } else {
      const resData = await create_live_stream(data);
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
    <div>
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
        formTitle={isEdit ? "Edit Live Stream" : "Add Live Stream"}
        exportButton={
          <Export
            fileName={"Live Stream"}
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

export default LiveStream;
